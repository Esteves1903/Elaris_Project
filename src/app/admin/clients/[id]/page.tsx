import Link from "next/link";
import { notFound } from "next/navigation";

const clients = [
  {
    id: "silva-cafe",
    clientName: "João Silva",
    company: "Silva Café",
    companyAccessName: "silva-cafe",
    projectType: "Website Creation",
    servicePlan: "Standard website",
    websiteName: "Silva Café Website",
    websiteUrl: "https://silvacafe.com",
    websiteStatus: "In production",
    currentStage: "Design & Development",
    estimatedDelivery: "12 June 2026",
    nextStep: "Homepage first version in progress",
    lastUpdate: "05 May 2026",
    clientNeeds: [
      { item: "Company logo", status: "received" },
      { item: "Business opening hours", status: "received" },
      { item: "Final service descriptions", status: "missing" },
      { item: "Final images for the website", status: "missing" },
    ],
    latestUpdates: [
      {
        date: "05 May 2026",
        title: "Homepage design started",
        description:
          "We started working on the first visual version of the homepage.",
      },
      {
        date: "03 May 2026",
        title: "Website structure approved",
        description:
          "The main pages and content direction were reviewed and confirmed.",
      },
    ],
  },
  {
    id: "costa-studio",
    clientName: "Maria Costa",
    company: "Costa Studio",
    companyAccessName: "costa-studio",
    projectType: "Website Improvement",
    servicePlan: "Maintenance plan",
    websiteName: "Costa Studio Website",
    websiteUrl: "https://costastudio.com",
    websiteStatus: "Online",
    currentStage: "Launched",
    estimatedDelivery: "Delivered",
    nextStep: "Monthly maintenance check",
    lastUpdate: "02 May 2026",
    clientNeeds: [
      { item: "Updated service prices", status: "received" },
      { item: "New gallery images", status: "missing" },
    ],
    latestUpdates: [
      {
        date: "02 May 2026",
        title: "Website maintenance completed",
        description:
          "We reviewed the website and completed the latest maintenance check.",
      },
    ],
  },
  {
    id: "alves-barber",
    clientName: "Pedro Alves",
    company: "Alves Barber",
    companyAccessName: "alves-barber",
    projectType: "Website Creation",
    servicePlan: "Starter website",
    websiteName: "Alves Barber Website",
    websiteUrl: "",
    websiteStatus: "Waiting for client",
    currentStage: "Planning",
    estimatedDelivery: "To be confirmed",
    nextStep: "Waiting for final service descriptions",
    lastUpdate: "30 April 2026",
    clientNeeds: [
      { item: "Final service descriptions", status: "missing" },
      { item: "Business opening hours", status: "received" },
      { item: "Brand images", status: "missing" },
    ],
    latestUpdates: [
      {
        date: "30 April 2026",
        title: "Planning started",
        description:
          "The first project structure was created and is waiting for final client content.",
      },
    ],
  },
];

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminClientDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const client = clients.find((client) => client.id === id);

  if (!client) {
    notFound();
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

          <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
            {client.websiteStatus}
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
                type="button"
                className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Save changes
              </button>
            </div>

            <form className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Website name
                </label>
                <input
                  defaultValue={client.websiteName}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Website URL
                </label>
                <input
                  defaultValue={client.websiteUrl || "Not available yet"}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Website status
                </label>
                <select
                  defaultValue={client.websiteStatus}
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
                  defaultValue={client.currentStage}
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
                  defaultValue={client.estimatedDelivery}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Last update
                </label>
                <input
                  defaultValue={client.lastUpdate}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Next step
                </label>
                <textarea
                  defaultValue={client.nextStep}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
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
              {client.clientNeeds.map((need) => (
                <div
                  key={need.item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="text-sm font-medium text-white">
                    {need.item}
                  </span>

                  <select
                    defaultValue={need.status}
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
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
              >
                Add update
              </button>
            </div>

            <div className="grid gap-4">
              {client.latestUpdates.map((update) => (
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