import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/verify-admin";

export async function POST(req: NextRequest) {
  const user = await verifyAdmin(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, company, password, type, stage, nextStep } = body;

  const slug = company
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
    app_metadata: { role: "client" },
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  const password_hash = await bcrypt.hash(password, 10);

  const { data: clientData, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({ name, email, company, slug, auth_user_id: authData.user.id, password_hash })
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
      type,
      plan: "",
      website_name: company,
      website_url: "",
      status: "In production",
      stage,
      estimated_delivery: "",
      last_update: "",
      next_step: nextStep ?? "",
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
