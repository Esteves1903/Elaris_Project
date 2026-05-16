"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const sections = [
  {
    title: { en: "Who we are", pt: "Quem somos" },
    body: {
      en: "Helarys is a web agency based in Portugal. We build websites and digital tools for small and growing businesses. For any privacy-related questions, contact us at contact@helarys.com.",
      pt: "A Helarys é uma agência web sediada em Portugal. Criamos websites e ferramentas digitais para pequenos negócios em crescimento. Para questões relacionadas com privacidade, contacta-nos em contact@helarys.com.",
    },
  },
  {
    title: { en: "What data we collect", pt: "Que dados recolhemos" },
    body: {
      en: "When you submit our contact form, we collect your name, email address, business name (optional) and message. We do not collect any other personal data.",
      pt: "Quando submetes o nosso formulário de contacto, recolhemos o teu nome, endereço de email, nome do negócio (opcional) e mensagem. Não recolhemos quaisquer outros dados pessoais.",
    },
  },
  {
    title: { en: "How we use your data", pt: "Como usamos os teus dados" },
    body: {
      en: "Your data is used solely to respond to your enquiry and, if applicable, to manage your project with Helarys. We do not sell, share or use your data for marketing without your explicit consent.",
      pt: "Os teus dados são usados exclusivamente para responder ao teu pedido e, se aplicável, para gerir o teu projeto com a Helarys. Não vendemos, partilhamos nem usamos os teus dados para marketing sem o teu consentimento explícito.",
    },
  },
  {
    title: { en: "How long we keep it", pt: "Durante quanto tempo guardamos" },
    body: {
      en: "We keep your contact data for up to 24 months. After that period, or upon your request, your data is permanently deleted.",
      pt: "Guardamos os teus dados de contacto até 24 meses. Após esse período, ou mediante pedido teu, os dados são eliminados permanentemente.",
    },
  },
  {
    title: { en: "Your rights (GDPR)", pt: "Os teus direitos (RGPD)" },
    body: {
      en: "Under the GDPR, you have the right to access, correct or delete your personal data at any time. To exercise any of these rights, email us at contact@helarys.com and we will respond within 30 days.",
      pt: "Ao abrigo do RGPD, tens o direito de aceder, corrigir ou eliminar os teus dados pessoais a qualquer momento. Para exercer qualquer um destes direitos, envia-nos um email para contact@helarys.com e respondemos em 30 dias.",
    },
  },
  {
    title: { en: "Cookies", pt: "Cookies" },
    body: {
      en: "We may use basic analytics cookies (such as Google Analytics) to understand how visitors use the site. These cookies do not identify you personally. You can disable cookies in your browser settings at any time.",
      pt: "Podemos usar cookies de analytics básicos (como o Google Analytics) para perceber como os visitantes usam o site. Estes cookies não te identificam pessoalmente. Podes desativar os cookies nas definições do teu browser a qualquer momento.",
    },
  },
];

export default function PrivacyPage() {
  const { lang } = useLang();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-32 pt-32 text-white">
      <div className="pointer-events-none absolute -left-60 top-10 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {lang === "en" ? "Legal" : "Legal"}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {lang === "en" ? "Privacy " : "Política de "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {lang === "en" ? "Policy" : "Privacidade"}
            </span>
          </h1>
          <p className="text-sm text-zinc-500">
            {lang === "en" ? "Last updated: May 2026" : "Última atualização: Maio 2026"}
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div key={section.title.en} custom={i + 1} variants={fade} initial="hidden" animate="show">
              <h2 className="mb-3 text-lg font-semibold text-white">{section.title[lang]}</h2>
              <p className="text-sm leading-7 text-zinc-400">{section.body[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
