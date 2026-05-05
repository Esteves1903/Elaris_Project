"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminClients } from "@/lib/mock-admin-data";
import {
    clearMockAdminSession,
    hasMockAdminSession,
} from "@/lib/mock-admin-auth";

export default function AdminPage() {

    const router = useRouter();
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        const isLoggedIn = hasMockAdminSession();

        if (!isLoggedIn) {
            router.push("/client-login");
            return;
        }

        setIsCheckingSession(false);
    }, [router]);

    function handleLogout() {
        clearMockAdminSession();
        router.push("/client-login");
    }

    if (isCheckingSession) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
                <div className="text-center">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                        Admin dashboard
                    </p>

                    <p className="text-zinc-400">Checking admin access...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
            <section className="mx-auto mb-10 max-w-6xl">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                            Admin dashboard
                        </p>

                        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
                            Manage client projects.
                        </h1>

                        <p className="max-w-2xl text-base leading-7 text-zinc-300">
                            View clients, project stages, website status and the next steps
                            for each active Elaris project.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/client-area"
                            className="w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                        >
                            View client dashboard
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="mb-2 text-sm text-zinc-500">Total clients</p>
                    <p className="text-3xl font-bold">{adminClients.length}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="mb-2 text-sm text-zinc-500">In production</p>
                    <p className="text-3xl font-bold">
                        {
                            adminClients.filter(
                                (client) => client.websiteStatus === "In production",
                            ).length
                        }
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="mb-2 text-sm text-zinc-500">Waiting for client</p>
                    <p className="text-3xl font-bold">
                        {
                            adminClients.filter(
                                (client) => client.websiteStatus === "Waiting for client",
                            ).length
                        }
                    </p>
                </div>
            </section>

            <section className="mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                            Clients
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight">
                            Active client projects
                        </h2>
                    </div>

                    <Link
                        href="/admin/clients/new"
                        className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Add client
                    </Link>
                </div>

                <div className="grid gap-4">
                    {adminClients.map((client) => (
                        <div
                            key={client.id}
                            className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-[1fr_1fr_auto] lg:items-center"
                        >
                            <div>
                                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                                    {client.projectType}
                                </p>

                                <h3 className="text-xl font-bold text-white">
                                    {client.company}
                                </h3>

                                <p className="mt-2 text-sm text-zinc-400">
                                    Client: {client.clientName}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div>
                                    <p className="mb-1 text-xs text-zinc-500">Website status</p>
                                    <p className="text-sm font-medium text-white">
                                        {client.websiteStatus}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs text-zinc-500">Current stage</p>
                                    <p className="text-sm font-medium text-white">
                                        {client.currentStage}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs text-zinc-500">Next step</p>
                                    <p className="text-sm font-medium text-white">
                                        {client.nextStep}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs text-zinc-500">Last update</p>
                                    <p className="text-sm font-medium text-white">
                                        {client.lastUpdate}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={`/admin/clients/${client.id}`}
                                className="rounded-full border border-white/15 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                            >
                                View details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}