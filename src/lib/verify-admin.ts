import { NextRequest } from "next/server";
import { supabaseAdmin } from "./supabase-admin";

export async function verifyAdmin(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  const user = await res.json();

  // First check: app_metadata role
  if (user.app_metadata?.role !== "admin") return null;

  // Second check: must exist in the admins table
  const { data } = await supabaseAdmin
    .from("admins")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!data) return null;

  return user as { id: string; email: string; app_metadata: Record<string, unknown> };
}
