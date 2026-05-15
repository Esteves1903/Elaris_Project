import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/verify-admin";

export async function GET(req: NextRequest) {
  const user = await verifyAdmin(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*, lead_reviews(admin_name, reviewed_at)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const user = await verifyAdmin(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lead_id } = await req.json();
  if (!lead_id) return NextResponse.json({ error: "Missing lead_id" }, { status: 400 });

  const { data: adminRow, error: adminErr } = await supabaseAdmin
    .from("admins")
    .select("id, name")
    .eq("auth_user_id", user.id)
    .single();

  if (adminErr || !adminRow) return NextResponse.json({ error: "Admin not found" }, { status: 400 });

  const { error } = await supabaseAdmin.from("lead_reviews").upsert(
    { lead_id, admin_id: adminRow.id, admin_name: adminRow.name.split(" ")[0] },
    { onConflict: "lead_id,admin_id" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
