import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/verify-admin";

export async function POST(req: NextRequest) {
  const user = await verifyAdmin(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    name, email, company, slug, password,
    type, plan, websiteName, websiteUrl,
    status, stage, estimatedDelivery, lastUpdate, nextStep,
  } = body;

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "client", name },
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  const { data: clientData, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({ name, email, company, slug, auth_user_id: authData.user.id, password_hash: password })
    .select()
    .single();

  if (clientError) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: clientError.message }, { status: 400 });
  }

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

  if (projectError) return NextResponse.json({ error: projectError.message }, { status: 400 });

  return NextResponse.json({ success: true, clientId: clientData.id });
}

export async function GET(req: NextRequest) {
  const user = await verifyAdmin(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("*, projects(*)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
