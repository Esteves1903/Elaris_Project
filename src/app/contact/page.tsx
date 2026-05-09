"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RevealCard from "@/components/ui/RevealCard";
import { supabase } from "@/lib/supabase";

type FormState = {
  name: string;
  email: string;
  business: string;
  type: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    business: "",
    type: "New website",
    message: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: sbError } = await supabase.from("leads").insert({
      name: form.name,
      email: form.email,
      business: form.business || null,
      type: form.type,
      message: form.message,
    });

    setLoading(false);

    if (sbError) {
      setError("Something went wrong. Please try again or email us directly.");
      return;
    }

    router.push("/thanks");
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]";

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <RevealCard className="flex flex-col gap-6">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              Get a quote
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Tell us about your project.
            </h1>
            <p className="mt-6 text-base leading-7 text-zinc-300">
              Send us a few details about your business and what you need. We will
              analyse the project and prepare a custom quote based on your goals,
              features and project complexity.
            </p>
          </div>

          <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div>
              <p className="text-sm font-semibold text-white">Email</p>
              <p className="mt-1 text-sm text-zinc-400">contact@elaris.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">What happens next?</p>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                We review your request, understand your needs and get back to you
                with the next steps within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Fast response", "No commitment", "Custom quote"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 text-xs font-medium text-cyan-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </RevealCard>

        <RevealCard delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium">
                    Business name
                  </label>
                  <input
                    type="text"
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Your business"
                    className={inputClass}
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium">
                    Project type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>New website</option>
                    <option>Improve existing website</option>
                    <option>Website maintenance</option>
                    <option>Client area / portal</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium">
                    What do you need?
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your goals, pages, features, integrations or anything important..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="relative mt-6 overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="block h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send request
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
          </form>
        </RevealCard>
      </section>
    </main>
  );
}
