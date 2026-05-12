"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { signIn, getUserRole } from "@/lib/auth";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "Client login", pt: "Acesso de cliente" },
  h1a: { en: "Access your private", pt: "Acede ao teu" },
  h1b: { en: "project dashboard.", pt: "dashboard privado." },
  subtitle: { en: "This area is reserved for Helarys clients. Use the email and password provided after your project has been confirmed.", pt: "Esta área é reservada a clientes Helarys. Usa o email e a password fornecidos após a confirmação do teu projeto." },
  card1Title: { en: "Secure access", pt: "Acesso seguro" },
  card1Body: { en: "Login with the email and password provided by Helarys.", pt: "Entra com o email e a password fornecidos pela Helarys." },
  card2Title: { en: "Private dashboard", pt: "Dashboard privado" },
  card2Body: { en: "Track progress, updates and project information in one place.", pt: "Acompanha o progresso, atualizações e informação do projeto num só lugar." },
  formTitle: { en: "Sign in", pt: "Entrar" },
  formSubtitle: { en: "Enter the access details provided by the Helarys team.", pt: "Introduz os dados de acesso fornecidos pela equipa Helarys." },
  labelEmail: { en: "Email", pt: "Email" },
  labelPassword: { en: "Password", pt: "Password" },
  forgotPassword: { en: "Forgot password?", pt: "Esqueceste a password?" },
  signingIn: { en: "Signing in...", pt: "A entrar..." },
  signIn: { en: "Sign in", pt: "Entrar" },
  errInvalid: { en: "Invalid email or password.", pt: "Email ou password inválidos." },
  errNoAccess: { en: "Access not configured. Please contact the Helarys team.", pt: "Acesso não configurado. Por favor contacta a equipa Helarys." },
  footer: { en: "Login details are created and provided directly by Helarys. If you do not have access yet, please contact our team.", pt: "Os dados de acesso são criados e fornecidos diretamente pela Helarys. Se ainda não tens acesso, contacta a nossa equipa." },
  back: { en: "← Back to homepage", pt: "← Voltar à página inicial" },
};

export default function ClientLoginPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getUserRole().then((role) => {
      if (role === "admin") router.push("/admin");
      else if (role === "client") router.push("/client-area");
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await signIn(email, password);

    if (error) {
      setLoading(false);
      setErrorMessage(copy.errInvalid[lang]);
      return;
    }

    const role = await getUserRole();

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "client") {
      router.push("/client-area");
    } else {
      setLoading(false);
      setErrorMessage(copy.errNoAccess[lang]);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-60 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.eyebrow[lang]}
          </p>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.h1a[lang]}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {copy.h1b[lang]}
            </span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-300">
            {copy.subtitle[lang]}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-400/20">
              <Mail className="mb-4 h-5 w-5 text-cyan-400" />
              <h2 className="mb-2 font-semibold text-white">{copy.card1Title[lang]}</h2>
              <p className="text-sm leading-6 text-zinc-400">
                {copy.card1Body[lang]}
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-400/20">
              <LockKeyhole className="mb-4 h-5 w-5 text-cyan-400" />
              <h2 className="mb-2 font-semibold text-white">{copy.card2Title[lang]}</h2>
              <p className="text-sm leading-6 text-zinc-400">
                {copy.card2Body[lang]}
              </p>
            </SpotlightCard>
          </div>
        </motion.div>

        {/* Right — form card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-sm"
        >
          <div className="mb-8">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">{copy.formTitle[lang]}</h2>
            <p className="text-sm leading-6 text-zinc-400">
              {copy.formSubtitle[lang]}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                {copy.labelEmail[lang]}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                  {copy.labelPassword[lang]}
                </label>
                <Link href="/forgot-password" className="text-xs text-zinc-500 transition hover:text-cyan-300">
                  {copy.forgotPassword[lang]}
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 transition hover:text-zinc-300"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200 disabled:opacity-70"
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
                      className="block h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
                    />
                    {copy.signingIn[lang]}
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {copy.signIn[lang]}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
            <p className="text-xs leading-5 text-zinc-500">
              {copy.footer[lang]}
            </p>
          </div>

          <div className="mt-6">
            <Link href="/" className="text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
              {copy.back[lang]}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
