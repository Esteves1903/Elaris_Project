import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@supabase/supabase-js";

function getCallerSupabase(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } },
  );
}

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const callerSupabase = getCallerSupabase(req);
  const { data: { user } } = await callerSupabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { websiteName, websiteUrl, status, stage, estimatedDelivery, lastUpdate, nextStep } = body;

  const { error } = await supabaseAdmin
    .from("projects")
    .update({
      website_name: websiteName,
      website_url: websiteUrl,
      status,
      stage,
      estimated_delivery: estimatedDelivery,
      last_update: lastUpdate,
      next_step: nextStep,
    })
    .eq("client_id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
