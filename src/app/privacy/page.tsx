"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const sections = [
  {
    title: { en: "1. Who we are (Data Controller)", pt: "1. Quem somos (Responsável pelo Tratamento)" },
    body: {
      en: "Helarys is a web agency based in Portugal, responsible for the processing of your personal data collected through this website. For any privacy-related questions or requests, contact us at: contact@helarys.com.",
      pt: "A Helarys é uma agência web sediada em Portugal, responsável pelo tratamento dos teus dados pessoais recolhidos através deste website. Para questões ou pedidos relacionados com privacidade, contacta-nos em: contact@helarys.com.",
    },
  },
  {
    title: { en: "2. What data we collect and why", pt: "2. Que dados recolhemos e porquê" },
    body: {
      en: "When you submit our contact form, we collect your name, email address, business name (optional) and message. This data is collected for the sole purpose of responding to your enquiry and, if applicable, managing your project with Helarys. The legal basis for this processing is legitimate interest (Article 6(1)(f) GDPR) and, where a contract exists, contractual necessity (Article 6(1)(b) GDPR).",
      pt: "Quando submetes o nosso formulário de contacto, recolhemos o teu nome, endereço de email, nome do negócio (opcional) e mensagem. Estes dados são recolhidos exclusivamente para responder ao teu pedido e, se aplicável, para gerir o teu projeto com a Helarys. A base legal para este tratamento é o interesse legítimo (Artigo 6.º, n.º 1, alínea f) do RGPD) e, quando existe contrato, a necessidade contratual (Artigo 6.º, n.º 1, alínea b) do RGPD).",
    },
  },
  {
    title: { en: "3. How long we keep your data", pt: "3. Durante quanto tempo guardamos os teus dados" },
    body: {
      en: "Contact form data is retained for a maximum of 24 months from the date of submission, or for the duration of the project relationship. After this period, or upon your request, your data is permanently deleted.",
      pt: "Os dados do formulário de contacto são conservados por um máximo de 24 meses a partir da data de submissão, ou durante a relação de projeto. Após este período, ou mediante pedido teu, os dados são eliminados permanentemente.",
    },
  },
  {
    title: { en: "4. Who has access to your data", pt: "4. Quem tem acesso aos teus dados" },
    body: {
      en: "Your data is accessible only to members of the Helarys team directly involved in responding to your enquiry or managing your project. We do not sell, rent or share your data with third parties for marketing purposes.",
      pt: "Os teus dados são acessíveis apenas aos membros da equipa Helarys diretamente envolvidos em responder ao teu pedido ou gerir o teu projeto. Não vendemos, alugamos nem partilhamos os teus dados com terceiros para fins de marketing.",
    },
  },
  {
    title: { en: "5. Data transfers outside the EU", pt: "5. Transferências de dados para fora da UE" },
    body: {
      en: "We use the following third-party services that may store or process data on servers located outside the European Union, namely in the United States: Supabase (database and authentication) and Vercel (website hosting). These transfers are carried out under Standard Contractual Clauses (SCCs) approved by the European Commission, in accordance with Article 46 GDPR. Both providers have signed Data Processing Agreements (DPAs) with us. Please note that US law (including the CLOUD Act) may allow US authorities to access data stored on US servers under certain conditions.",
      pt: "Utilizamos os seguintes serviços de terceiros que podem armazenar ou processar dados em servidores localizados fora da União Europeia, nomeadamente nos Estados Unidos: Supabase (base de dados e autenticação) e Vercel (alojamento do website). Estas transferências são realizadas ao abrigo de Cláusulas Contratuais Padrão (CCPs) aprovadas pela Comissão Europeia, em conformidade com o Artigo 46.º do RGPD. Ambos os fornecedores assinaram Acordos de Tratamento de Dados (DPAs) connosco. Note que a lei americana (incluindo o CLOUD Act) pode permitir às autoridades americanas o acesso a dados armazenados em servidores americanos em determinadas condições.",
    },
  },
  {
    title: { en: "6. Cookies and analytics", pt: "6. Cookies e analytics" },
    body: {
      en: "This website may use basic analytics tools (such as Google Analytics) to understand how visitors use the site. These tools may place cookies on your device. Cookies do not identify you personally. You can disable cookies at any time through your browser settings. Where required by law, we will request your explicit consent before placing non-essential cookies.",
      pt: "Este website pode utilizar ferramentas de analytics básicas (como o Google Analytics) para compreender como os visitantes utilizam o site. Estas ferramentas podem colocar cookies no teu dispositivo. Os cookies não te identificam pessoalmente. Podes desativar os cookies a qualquer momento através das definições do teu browser. Quando exigido por lei, solicitaremos o teu consentimento explícito antes de colocar cookies não essenciais.",
    },
  },
  {
    title: { en: "7. Your rights under GDPR", pt: "7. Os teus direitos ao abrigo do RGPD" },
    body: {
      en: "Under the GDPR, you have the following rights regarding your personal data: right of access (Article 15), right to rectification (Article 16), right to erasure (Article 17), right to restriction of processing (Article 18), right to data portability (Article 20), and right to object (Article 21). To exercise any of these rights, contact us at contact@helarys.com. We will respond within 30 days.",
      pt: "Ao abrigo do RGPD, tens os seguintes direitos relativamente aos teus dados pessoais: direito de acesso (Artigo 15.º), direito de retificação (Artigo 16.º), direito ao apagamento (Artigo 17.º), direito à limitação do tratamento (Artigo 18.º), direito à portabilidade dos dados (Artigo 20.º) e direito de oposição (Artigo 21.º). Para exercer qualquer um destes direitos, contacta-nos em contact@helarys.com. Responderemos no prazo de 30 dias.",
    },
  },
  {
    title: { en: "8. Right to lodge a complaint — CNPD", pt: "8. Direito de reclamação — CNPD" },
    body: {
      en: "If you believe your data protection rights have been violated, you have the right to lodge a complaint with the CNPD (Comissão Nacional de Proteção de Dados), the Portuguese supervisory authority for data protection. Contact: Avenida D. Carlos I, 134, 1.º andar, 1200-651 Lisboa, Portugal. Website: www.cnpd.pt.",
      pt: "Se considerares que os teus direitos de proteção de dados foram violados, tens o direito de apresentar uma reclamação à CNPD (Comissão Nacional de Proteção de Dados), a autoridade de supervisão portuguesa em matéria de proteção de dados. Contacto: Avenida D. Carlos I, 134, 1.º andar, 1200-651 Lisboa, Portugal. Website: www.cnpd.pt.",
    },
  },
  {
    title: { en: "9. Data breach notification", pt: "9. Notificação de violação de dados" },
    body: {
      en: "In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the CNPD within 72 hours as required by Article 33 GDPR, and will inform affected individuals without undue delay where required under Article 34 GDPR.",
      pt: "Em caso de violação de dados pessoais que represente um risco para os teus direitos e liberdades, notificaremos a CNPD no prazo de 72 horas conforme exigido pelo Artigo 33.º do RGPD, e informaremos as pessoas afetadas sem demora injustificada quando exigido pelo Artigo 34.º do RGPD.",
    },
  },
  {
    title: { en: "10. Changes to this policy", pt: "10. Alterações a esta política" },
    body: {
      en: "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated date. We encourage you to review this page periodically.",
      pt: "Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com uma data atualizada. Encorajamos-te a rever esta página regularmente.",
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
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Legal</p>
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
            <motion.div
              key={section.title.en}
              custom={i + 1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="border-b border-white/[0.06] pb-10 last:border-0"
            >
              <h2 className="mb-3 text-base font-semibold text-white">{section.title[lang]}</h2>
              <p className="text-sm leading-7 text-zinc-400">{section.body[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
