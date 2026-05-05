export const adminClients = [
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

export function getAdminClientById(id: string) {
  return adminClients.find((client) => client.id === id);
}