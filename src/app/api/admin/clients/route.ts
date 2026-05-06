import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@supabase/supabase-js";

function getCallerSupabase(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

export async function POST(req: NextRequest) {
  // Verify caller is admin
  const callerSupabase = getCallerSupabase(req);
  const { data: { user } } = await callerSupabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    name, email, company, slug, password,
    type, plan, websiteName, websiteUrl,
    status, stage, estimatedDelivery, lastUpdate, nextStep,
  } = body;

  // Create Supabase Auth user for the client
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "client", name },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // Create client record
  const { data: clientData, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({ name, email, company, slug, auth_user_id: authData.user.id, password_hash: password })
    .select()
    .single();

  if (clientError) {
    // Roll back auth user
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: clientError.message }, { status: 400 });
  }

  // Create project record
  const { error: projectError } = await supabaseAdmin
    .from("projects")
    .insert({
      client_id: clientData.id,
      type, plan,
      website_name: websiteName,
      website_url: websiteUrl,
      status, stage,
      estimated_delivery: estimatedDelivery,
      last_update: lastUpdate,
      next_step: nextStep,
    });

  if (projectError) {
    return NextResponse.json({ error: projectError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, clientId: clientData.id });
}

export async function GET(req: NextRequest) {
  const callerSupabase = getCallerSupabase(req);
  const { data: { user } } = await callerSupabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("*, projects(*)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
