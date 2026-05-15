import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

async function getCaller(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return null;
  return { userId: user.id, role: user.app_metadata?.role as "admin" | "client" | null };
}

async function clientOwnsProject(userId: string, projectId: string) {
  const { data } = await supabaseAdmin
    .from("projects")
    .select("id, clients!inner(auth_user_id)")
    .eq("id", projectId)
    .eq("clients.auth_user_id", userId)
    .single();
  return !!data;
}

export async function GET(req: NextRequest) {
  const caller = await getCaller(req);
  if (!caller?.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId) return NextResponse.json({ error: "project_id required" }, { status: 400 });

  if (caller.role === "client" && !(await clientOwnsProject(caller.userId, projectId))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data ?? [] });
}

export async function POST(req: NextRequest) {
  const caller = await getCaller(req);
  if (!caller?.role) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { project_id, content } = await req.json();
  if (!project_id || !content?.trim()) {
    return NextResponse.json({ error: "project_id and content required" }, { status: 400 });
  }

  if (caller.role === "client" && !(await clientOwnsProject(caller.userId, project_id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({ project_id, content: content.trim(), sender_role: caller.role })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: data }, { status: 201 });
}
