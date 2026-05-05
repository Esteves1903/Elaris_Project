"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
    clearMockAdminSession,
    hasMockAdminSession,
} from "@/lib/mock-admin-auth";

type ClientNeed = {
    item: string;
    status: string;
};

type ClientUpdate = {
    date: string;
    title: string;
    description: string;
};

type AdminClient = {
    id: string;
    clientName: string;
    company: string;
    companyAccessName: string;
    projectType: string;
    servicePlan: string;
    websiteName: string;
    websiteUrl: string;
    websiteStatus: string;
    currentStage: string;
    estimatedDelivery: string;
    nextStep: string;
    lastUpdate: string;
    clientNeeds: ClientNeed[];
    latestUpdates: ClientUpdate[];
};

type AdminClientDetailsClientProps = {
    client: AdminClient;
};

export default function AdminClientDetailsClient({
    client,
}: AdminClientDetailsClientProps) {
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
    const [websiteName, setWebsiteName] = useState(client.websiteName);
    const [websiteUrl, setWebsiteUrl] = useState(client.websiteUrl);
    const [websiteStatus, setWebsiteStatus] = useState(client.websiteStatus);
    const [currentStage, setCurrentStage] = useState(client.currentStage);
    const [estimatedDelivery, setEstimatedDelivery] = useState(
        client.estimatedDelivery,
    );
    const [lastUpdate, setLastUpdate] = useState(client.lastUpdate);
    const [nextStep, setNextStep] = useState(client.nextStep);
    const [clientNeeds, setClientNeeds] = useState(client.clientNeeds);
    const [latestUpdates, setLatestUpdates] = useState(client.latestUpdates);
    const [isAddingUpdate, setIsAddingUpdate] = useState(false);
    const [newUpdateDate, setNewUpdateDate] = useState("");
    const [newUpdateTitle, setNewUpdateTitle] = useState("");
    const [newUpdateDescription, setNewUpdateDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSuccessMessage("Changes saved locally for this session.");
    }

    function updateClientNeedStatus(item: string, status: string) {
        setClientNeeds((currentNeeds) =>
            currentNeeds.map((need) =>
                need.item === item ? { ...need, status } : need,
            ),
        );
    }

    function handleAddUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!newUpdateDate || !newUpdateTitle || !newUpdateDescription) {
            setSuccessMessage("Please fill in all update fields.");
            return;
        }

        setLatestUpdates((currentUpdates) => [
            {
                date: newUpdateDate,
                title: newUpdateTitle,
                description: newUpdateDescription,
            },
            ...currentUpdates,
        ]);

        setNewUpdateDate("");
        setNewUpdateTitle("");
        setNewUpdateDescription("");
        setIsAddingUpdate(false);
        setSuccessMessage("Update added locally for this session.");
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
            <section className="mx-auto max-w-6xl">
                <Link
                    href="/admin"
                    className="mb-10 inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300"
                >
                    ← Back to admin
                </Link>

                <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                            Client details
                        </p>

                        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
                            {client.company}
                        </h1>

                        <p className="max-w-2xl text-base leading-7 text-zinc-300">
                            Manage project information, website status, client requirements
                            and recent updates for this client.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
                            {websiteStatus}
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                        >
                            Log out
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                        <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                            Client profile
                        </p>

                        <div className="grid gap-6">
                            <div>
                                <p className="mb-2 text-sm text-zinc-500">Client name</p>
                                <p className="font-medium text-white">{client.clientName}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-zinc-500">Company</p>
                                <p className="font-medium text-white">{client.company}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-zinc-500">
                                    Company access name
                                </p>
                                <p className="font-medium text-white">
                                    {client.companyAccessName}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-zinc-500">Project type</p>
                                <p className="font-medium text-white">{client.projectType}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-zinc-500">Service plan</p>
                                <p className="font-medium text-white">{client.servicePlan}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                                        Project details
                                    </p>

                                    <h2 className="text-2xl font-bold tracking-tight">
                                        Website information
                                    </h2>
                                </div>

                                <button
                                    type="submit"
                                    className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                                >
                                    Save changes
                                </button>
                            </div>

                            {successMessage && (
                                <p className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300">
                                    {successMessage}
                                </p>
                            )}

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Website name
                                    </label>
                                    <input
                                        value={websiteName}
                                        onChange={(event) => setWebsiteName(event.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Website URL
                                    </label>
                                    <input
                                        value={websiteUrl || "Not available yet"}
                                        onChange={(event) => setWebsiteUrl(event.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Website status
                                    </label>
                                    <select
                                        value={websiteStatus}
                                        onChange={(event) => setWebsiteStatus(event.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                                    >
                                        <option>In production</option>
                                        <option>Online</option>
                                        <option>Offline</option>
                                        <option>Waiting for client</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Current stage
                                    </label>
                                    <select
                                        value={currentStage}
                                        onChange={(event) => setCurrentStage(event.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
                                    >
                                        <option>Discovery</option>
                                        <option>Planning</option>
                                        <option>Design & Development</option>
                                        <option>Review</option>
                                        <option>Launch</option>
                                        <option>Launched</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Estimated delivery
                                    </label>
                                    <input
                                        value={estimatedDelivery}
                                        onChange={(event) =>
                                            setEstimatedDelivery(event.target.value)
                                        }
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Last update
                                    </label>
                                    <input
                                        value={lastUpdate}
                                        onChange={(event) => setLastUpdate(event.target.value)}
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Next step
                                    </label>
                                    <textarea
                                        value={nextStep}
                                        onChange={(event) => setNextStep(event.target.value)}
                                        rows={4}
                                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                            Needed from client
                        </p>

                        <h2 className="mb-8 text-2xl font-bold tracking-tight">
                            Client requirements
                        </h2>

                        <div className="grid gap-4">
                            {clientNeeds.map((need) => (
                                <div
                                    key={need.item}
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                                >
                                    <span className="text-sm font-medium text-white">
                                        {need.item}
                                    </span>

                                    <select
                                        value={need.status}
                                        onChange={(event) =>
                                            updateClientNeedStatus(need.item, event.target.value)
                                        }
                                        className="rounded-full border border-white/10 bg-[#111827] px-3 py-1 text-xs font-semibold text-white outline-none"
                                    >
                                        <option value="received">Received</option>
                                        <option value="missing">Missing</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                                    Latest updates
                                </p>

                                <h2 className="text-2xl font-bold tracking-tight">
                                    Project activity
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsAddingUpdate((currentValue) => !currentValue)}
                                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                            >
                                {isAddingUpdate ? "Cancel" : "Add update"}
                            </button>
                        </div>

                        {isAddingUpdate && (
                            <form
                                onSubmit={handleAddUpdate}
                                className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                            >
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Update date
                                    </label>

                                    <input
                                        value={newUpdateDate}
                                        onChange={(event) => setNewUpdateDate(event.target.value)}
                                        placeholder="06 May 2026"
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Update title
                                    </label>

                                    <input
                                        value={newUpdateTitle}
                                        onChange={(event) => setNewUpdateTitle(event.target.value)}
                                        placeholder="Homepage review completed"
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                                        Update description
                                    </label>

                                    <textarea
                                        value={newUpdateDescription}
                                        onChange={(event) => setNewUpdateDescription(event.target.value)}
                                        placeholder="Describe what changed or what was completed."
                                        rows={4}
                                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                                >
                                    Save update
                                </button>
                            </form>
                        )}

                        <div className="grid gap-4">
                            {latestUpdates.map((update) => (
                                <div
                                    key={update.title}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                                >
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                                        {update.date}
                                    </p>

                                    <h3 className="mb-2 font-semibold text-white">
                                        {update.title}
                                    </h3>

                                    <p className="text-sm leading-6 text-zinc-400">
                                        {update.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}