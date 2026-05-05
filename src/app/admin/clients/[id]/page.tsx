import { notFound } from "next/navigation";
import { getAdminClientById } from "@/lib/mock-admin-data";
import AdminClientDetailsClient from "./AdminClientDetailsClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminClientDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const client = getAdminClientById(id);

  if (!client) {
    notFound();
  }

  return <AdminClientDetailsClient client={client} />;
}