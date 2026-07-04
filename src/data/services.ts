export interface ServiceData {
  title: string;
  iconName: string;
  description: string;
  images?: string[];
}

export const leftCards: ServiceData[] = [
  {
    title: 'Web Development',
    iconName: 'Monitor',
    description: 'We create responsive, user-friendly websites using cutting-edge technologies. From landing pages to full web applications, our designs focus on performance, scalability, and user engagement.',
    images: ['/services/webd1.avif']
  },
  {
    title: 'Content Writer',
    iconName: 'PenTool',
    description: 'We deliver compelling written content including blogs, articles, and marketing copy that resonates with your target audience.',
  },
  {
    title: 'Custom AI Workflows using N8N',
    iconName: 'Cpu',
    description: 'We build intelligent automation workflows using N8N, integrating APIs and logic nodes to streamline operations and increase efficiency.',
    images: ['/services/n8n1.avif', '/services/n8n2.avif']
  },
  {
    title: 'Social Media Management / Content Creation',
    iconName: 'Share2',
    description: 'We craft engaging digital content and manage your social media presence to elevate brand awareness and community interaction. From planning content calendars and writing posts to producing visuals and tracking performance, we ensure your online platforms stay fresh, relevant, and impactful.',
  }
];

export const rightCards: ServiceData[] = [
  {
    title: 'Data Analytics',
    iconName: 'BarChart3',
    description: 'Our analytics solutions uncover actionable insights using advanced tools and methodologies, helping businesses make informed decisions and optimize operations.',
  },
  {
    title: 'Event Planning',
    iconName: 'CalendarDays',
    description: 'From corporate events to private gatherings, we provide end-to-end planning, managing logistics, venues, entertainment, and catering with precision.',
    images: ['/services/event1.avif', '/services/event2.avif', '/services/event3.avif']
  },
  {
    title: 'UI/UX Design',
    iconName: 'Layout',
    description: 'We craft intuitive, aesthetically pleasing designs that prioritize usability and user satisfaction, enhancing engagement and conversion rates.',
  },
  {
    title: 'Ambassador Roles',
    iconName: 'Award',
    description: 'We take pride in representing brands and platforms, fostering community growth, organizing outreach, and promoting innovation.',
    images: ['/services/ambassador1.avif', '/services/ambassador2.avif']
  }
];
