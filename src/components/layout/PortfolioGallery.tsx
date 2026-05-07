export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'cafe-restaurant' | 'barbershop';
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
    title: 'Restaurant',
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
    images: [
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop',
    ],
    liveUrl: 'https://example.com/brewhaus',
  },
  {
    id: '2',
    title: 'The Daily Blend Cafe',
    description: 'Specialty coffee shop website with loyalty program and mobile app integration',
    category: 'cafe-restaurant',
    client: 'The Daily Blend',
    year: 2024,
    technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Mobile App'],
    features: [
      'Loyalty Program',
      'Menu Customization',
      'Mobile Ordering',
      'Location Finder',
      'Event Calendar',
      'Staff Directory',
    ],
    images: [
      'https://images.unsplash.com/photo-1521017711867-fbc4887f3340?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1447933601403-0c6688e6eab8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=1200&h=800&fit=crop',
    ],
    liveUrl: 'https://example.com/daily-blend',
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
    images: [
      'https://images.unsplash.com/photo-1599458438107-6fad2dd5c1ea?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438110-d22f5eef8f0d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585747860715-cd4628902d4a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438113-b63e1eb8abc4?w=1200&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1599458438127-62f45f8de856?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438130-cac3b8e6b6b5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585747860715-cd4628902d4a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438135-60d1d648ff0f?w=1200&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1552566567-daf8550e01e5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop',
    ],
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
    images: [
      'https://images.unsplash.com/photo-1585747860715-cd4628902d4a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438127-62f45f8de856?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438110-d22f5eef8f0d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599458438113-b63e1eb8abc4?w=1200&h=800&fit=crop',
    ],
    liveUrl: 'https://example.com/barber-elite',
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'cafe-restaurant', label: 'Cafe & Restaurant' },
  { id: 'barbershop', label: 'Barbershop' },
];