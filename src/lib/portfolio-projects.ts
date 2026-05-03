export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'cafe-restaurant' | 'barbershop' | 'sports-store';
  client: string;
  year: number;
  technologies: string[];
  images: string[];
  features: string[];
  liveUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Brewhaus Coffee & Restaurant',
    description: 'Modern cafe and restaurant website with online ordering and table reservations',
    category: 'cafe-restaurant',
    client: 'Brewhaus Co.',
    year: 2024,
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'TypeScript'],
    features: [
      'Online Menu System',
      'Reservation Management',
      'Order Tracking',
      'Payment Integration',
      'Photo Gallery',
      'Review System',
    ],
    // USAR O TEU FICHEIRO DE CAFÉ
    images: ['/fundocafe.jfif'], 
    liveUrl: 'https://example.com/brewhaus',
  },
  {
    id: '2',
    title: 'Football Store Pro', // Novo título
    description: 'Premium online store for football gear, kits and equipment with real-time stock management.',
    category: 'sports-store', // Nova categoria (podes mudar para 'cafe-restaurant' se não quiseres mexer nos tipos)
    client: 'Strikers Co.',
    year: 2024,
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'Framer Motion'],
    features: [
      'Product Filtering',
      'Shopping Cart',
      'Size Guide',
      'Safe Checkout',
      'Member Discounts',
      'Order Tracking',
    ],
    // AQUI: Coloca o nome do teu ficheiro de imagem de futebol que está na pasta public
    images: ['/fundobola.avif'], 
    liveUrl: 'https://example.com/football-store',
  },
  {
    id: '3',
    title: 'Prime Cuts Barbershop',
    description: 'Professional barbershop website with online booking, stylist portfolio and pricing',
    category: 'barbershop',
    client: 'Prime Cuts',
    year: 2024,
    technologies: ['Next.js', 'TypeScript', 'Booking System', 'Tailwind CSS', 'Payment'],
    features: [
      'Online Appointment Booking',
      'Stylist Profiles',
      'Service Gallery',
      'Before/After Gallery',
      'Pricing System',
      'Customer Reviews',
    ],
    // USAR O TEU FICHEIRO DE BARBEARIA (.avif)
    images: ['/fundobarber.avif'], 
    liveUrl: 'https://example.com/prime-cuts',
  },
  {
    id: '4',
    title: 'StyleMasters Barbershop',
    description: 'Complete barber shop solution with real-time availability and team management',
    category: 'barbershop',
    client: 'StyleMasters',
    year: 2024,
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS', 'Admin Panel'],
    features: [
      'Real-time Booking',
      'Team Management',
      'Service Portfolio',
      'Customer Database',
      'Analytics Dashboard',
      'Promotional Offers',
    ],
    // USAR AS FOTOS DOS BARBEIROS QUE BAIXASTE
    images: ['/Barbeiro1.jfif', '/barbeiro2.jfif'], 
    liveUrl: 'https://example.com/stylemasters',
  },
  {
    id: '5',
    title: 'Urban Grill Restaurant',
    description: 'Fine dining restaurant website with wine pairing recommendations and chef profiles',
    category: 'cafe-restaurant',
    client: 'Urban Grill',
    year: 2024,
    technologies: ['Next.js', 'React', 'CMS', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Chef Profiles',
      'Wine Pairing Guide',
      'Seasonal Menus',
      'Photo Gallery',
      'Reservation System',
      'Blog Section',
    ],
    images: ['/fundocafe.jfif'],
    liveUrl: 'https://example.com/urban-grill',
  },
  {
    id: '6',
    title: 'Barber Elite',
    description: 'Premium barbershop with mobile booking app and loyalty rewards program',
    category: 'barbershop',
    client: 'Barber Elite',
    year: 2024,
    technologies: ['Next.js', 'React Native', 'Firebase', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Mobile App',
      'Loyalty Rewards',
      'Appointment Reminders',
      'Service Gallery',
      'Team Scheduling',
      'Push Notifications',
    ],
    images: ['/fundobarber.avif', '/barbeiro3.jfif'],
    liveUrl: 'https://example.com/barber-elite',
  },


];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'cafe-restaurant', label: 'Cafe & Restaurant' },
  { id: 'barbershop', label: 'Barbershop' },
  { id: 'sports-store', label: 'Sports Store' }, // Adicionado aqui para o filtro
];

