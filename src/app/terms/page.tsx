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
    title: { en: "Services", pt: "Serviços" },
    body: {
      en: "Helarys provides website design, development and digital services as agreed upon in writing before each project begins. The scope, price and timeline are defined in the project proposal sent to the client.",
      pt: "A Helarys presta serviços de design, desenvolvimento web e soluções digitais conforme acordado por escrito antes do início de cada projeto. O âmbito, preço e prazo são definidos na proposta de projeto enviada ao cliente.",
    },
  },
  {
    title: { en: "Payment", pt: "Pagamento" },
    body: {
      en: "Payment is split in two: 50% is due before work begins, and the remaining 50% is due upon delivery. Work will not start until the initial payment is received. All prices are in euros and exclude VAT where applicable.",
      pt: "O pagamento é dividido em duas partes: 50% antes do início do trabalho e os restantes 50% na entrega. O trabalho não começa até o pagamento inicial ser recebido. Todos os preços são em euros e excluem IVA quando aplicável.",
    },
  },
  {
    title: { en: "Revisions", pt: "Revisões" },
    body: {
      en: "Each plan includes a set number of design revisions as specified in the proposal. Additional revisions beyond the included amount may be charged separately and will be agreed upon in advance.",
      pt: "Cada plano inclui um número definido de revisões de design conforme especificado na proposta. Revisões adicionais além das incluídas podem ser cobradas separadamente e serão acordadas previamente.",
    },
  },
  {
    title: { en: "Intellectual property", pt: "Propriedade intelectual" },
    body: {
      en: "Upon receipt of full payment, the client owns the final website and all its content. Helarys retains the right to display the project in its portfolio unless otherwise agreed in writing.",
      pt: "Após receção do pagamento total, o cliente é dono do website final e de todo o seu conteúdo. A Helarys reserva o direito de apresentar o projeto no seu portfólio, salvo acordo em contrário por escrito.",
    },
  },
  {
    title: { en: "Client responsibilities", pt: "Responsabilidades do cliente" },
    body: {
      en: "The client is responsible for providing all necessary content (text, images, logos) in a timely manner. Delays in providing content may affect the agreed delivery timeline.",
      pt: "O cliente é responsável por fornecer todo o conteúdo necessário (texto, imagens, logotipos) em tempo útil. Atrasos no fornecimento de conteúdo podem afetar o prazo de entrega acordado.",
    },
  },
  {
    title: { en: "Limitation of liability", pt: "Limitação de responsabilidade" },
    body: {
      en: "Helarys is not liable for any indirect or consequential damages arising from the use of the delivered website. Our total liability is limited to the amount paid for the project.",
      pt: "A Helarys não é responsável por quaisquer danos indiretos ou consequentes resultantes da utilização do website entregue. A nossa responsabilidade total é limitada ao valor pago pelo projeto.",
    },
  },
  {
    title: { en: "Governing law", pt: "Lei aplicável" },
    body: {
      en: "These terms are governed by Portuguese law. Any disputes shall be resolved in the courts of Portugal.",
      pt: "Estes termos são regidos pela lei portuguesa. Quaisquer litígios serão resolvidos nos tribunais de Portugal.",
    },
  },
];

export default function TermsPage() {
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
            {lang === "en" ? "Terms & " : "Termos e "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {lang === "en" ? "Conditions" : "Condições"}
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
