import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminClientDetailsClient from "./AdminClientDetailsClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminClientDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("*, projects(*, project_updates(*))")
    .eq("id", id)
    .single();

  if (!client) notFound();

  return <AdminClientDetailsClient client={client} />;
}
