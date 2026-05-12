import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

async function verifyClient(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;

  // Use anon key (not service role) to verify the user's JWT
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  const user = await res.json();
  if (user.app_metadata?.role !== "client") return null;

  return user as { id: string; email: string };
}

export async function PATCH(req: NextRequest) {
  const user = await verifyClient(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { password } = await req.json();

  // Update the password via Supabase Auth (never store plaintext passwords in the DB)
  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
