import Link from "next/link";

export default function AdminPage() {
  const clients = [
    {
      id: "silva-cafe",
      clientName: "João Silva",
      company: "Silva Café",
      projectType: "Website Creation",
      websiteStatus: "In production",
      currentStage: "Design & Development",
      nextStep: "Homepage first version in progress",
      lastUpdate: "05 May 2026",
    },
    {
      id: "costa-studio",
      clientName: "Maria Costa",
      company: "Costa Studio",
      projectType: "Website Improvement",
      websiteStatus: "Online",
      currentStage: "Launched",
      nextStep: "Monthly maintenance check",
      lastUpdate: "02 May 2026",
    },
    {
      id: "alves-barber",
      clientName: "Pedro Alves",
      company: "Alves Barber",
      projectType: "Website Creation",
      websiteStatus: "Waiting for client",
      currentStage: "Planning",
      nextStep: "Waiting for final service descriptions",
      lastUpdate: "30 April 2026",
    },
  ];

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

          <Link
            href="/client-area"
            className="w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
          >
            View client dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="mb-2 text-sm text-zinc-500">Total clients</p>
          <p className="text-3xl font-bold">{clients.length}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="mb-2 text-sm text-zinc-500">In production</p>
          <p className="text-3xl font-bold">
            {
              clients.filter(
                (client) => client.websiteStatus === "In production",
              ).length
            }
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="mb-2 text-sm text-zinc-500">Waiting for client</p>
          <p className="text-3xl font-bold">
            {
              clients.filter(
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

          <button
            type="button"
            className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Add client
          </button>
        </div>

        <div className="grid gap-4">
          {clients.map((client) => (
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