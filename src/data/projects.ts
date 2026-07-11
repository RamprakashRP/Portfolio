export interface Project {
  id: string;
  name: string;
  imageType: 'dark' | 'light';
  description?: string;
  category?: string;
  date?: string;
  period?: string;
  sortDate?: number; // timestamp for sorting
  tags?: string[];
  rpRank?: number; // 1-10 ranking
  media?: string[];
  isHighlighted?: boolean;
}

export const projectsList: Project[] = [
  {
    id: 'neuroscript',
    name: 'NeuroScript: Digital to Organic Handwriting',
    imageType: 'dark',
    description: 'A sophisticated full-stack application that transforms digital text into highly realistic, organic handwriting. It features multi-page PDF compilation, exact physical paper dimensions (A4, Classmate Long, Short), cloud storage integration, and a custom physics engine for natural character jitter, dynamic kerning, and line drift.',
    category: 'Fullstack',
    date: '2026',
    period: 'Jan 2026 - Present',
    sortDate: new Date('2026-01-01').getTime(),
    tags: ['Next.js', 'React', 'FastAPI', 'Python', 'Supabase', 'Tailwind CSS', 'Pillow'],
    rpRank: 1,
    media: [
      '/projects/neuroscript/1.png', 
      '/projects/neuroscript/2.png', 
      '/projects/neuroscript/3.png', 
      '/projects/neuroscript/4.png'
    ],
    isHighlighted: true,
  },
  {
    id: 'omnivault',
    name: 'OmniVault: Secure Data Governance',
    imageType: 'dark',
    description: "A hybrid framework integrating Blockchain and encrypted Cloud storage to solve the 'Trust–Scalability–Privacy' trilemma. It utilizes Zero-Knowledge Proofs and local AI classification to ensure verifiable data sharing without revealing sensitive content.",
    category: 'Web3 & AI',
    date: '2026',
    period: 'Jan 2026 - May 2026',
    sortDate: new Date('2026-01-01').getTime(),
    tags: ['Next.js', 'Ethereum', 'IPFS', 'TensorFlow.js', 'zk-SNARKs', 'Solidity'],
    rpRank: 1,
    media: [
      '/projects/omnivault/1.png', 
      '/projects/omnivault/2.png', 
      '/projects/omnivault/3.png', 
      '/projects/omnivault/4.png'
    ],
    isHighlighted: true,
  },
  {
    id: 'ecoscan',
    name: 'EcoScan: E-Waste Solutions',
    imageType: 'dark',
    description: 'A platform to track and manage electronic waste recycling efforts efficiently.',
    category: 'Fullstack',
    date: '2025',
    period: 'Jan 2025 - Mar 2025',
    sortDate: new Date('2025-01-01').getTime(),
    tags: ['React', 'Next.js', 'AI', 'Tailwind'],
    rpRank: 10,
    media: ['/projects/ecoscan/1.png', '/projects/ecoscan/2.png', '/projects/ecoscan/3.png', '/projects/ecoscan/4.png'],
    isHighlighted: true,
  },
  {
    id: 'entracker',
    name: 'Entracker – Media Tracking System',
    imageType: 'dark',
    description: 'A full-stack media tracking system for TV series, movies, and anime.',
    period: 'Aug 2024 - Dec 2024',
    sortDate: new Date('2024-08-01').getTime(),
    tags: ['React', 'API Integration', 'Fullstack'],
    rpRank: 9,
    media: ['/projects/entracker/1.jpg', '/projects/entracker/2.jpg', '/projects/entracker/3.jpg', '/projects/entracker/4.jpg'],
  },
  {
    id: 'srm-gpa-calculator',
    name: 'SRM GPA Calculator Web App',
    imageType: 'dark',
    description: 'A web-based tool for SRM students to easily calculate SGPA and CGPA.',
    period: 'Mar 2024 - Jun 2024',
    sortDate: new Date('2024-03-01').getTime(),
    tags: ['HTML', 'CSS', 'JavaScript'],
    rpRank: 7,
    media: ['/projects/srm-gpa-calculator/1.png', '/projects/srm-gpa-calculator/2.png', '/projects/srm-gpa-calculator/3.png', '/projects/srm-gpa-calculator/4.png'],
  },
  {
    id: 'sims-hospital',
    name: 'SIMS Hospital Management',
    imageType: 'light',
    description: 'A comprehensive Hospital Information System UI and dashboard.',
    period: 'Jan 2024 - Mar 2024',
    sortDate: new Date('2024-01-01').getTime(),
    tags: ['UI/UX', 'Dashboard', 'Healthcare'],
    rpRank: 8,
    media: ['/projects/sims-hospital/1.png', '/projects/sims-hospital/2.png', '/projects/sims-hospital/3.png', '/projects/sims-hospital/4.png'],
  },
  {
    id: 'rtf-to-json',
    name: 'RTF to JSON Converter',
    imageType: 'dark',
    description: 'A multithreaded software tool to convert unstructured medical documents to JSON.',
    period: 'Oct 2023 - Dec 2023',
    sortDate: new Date('2023-10-01').getTime(),
    tags: ['Python', 'Data Parsing', 'Software'],
    rpRank: 8,
    media: ['/projects/rtf-to-json/1.png', '/projects/rtf-to-json/2.png', '/projects/rtf-to-json/3.png', '/projects/rtf-to-json/4.png'],
  },
  {
    id: 'employee-management',
    name: 'Employee Management System',
    imageType: 'dark',
    description: 'A dynamic system built with Python and MySQL to streamline organizational processes.',
    period: 'Jun 2023 - Sep 2023',
    sortDate: new Date('2023-06-01').getTime(),
    tags: ['Python', 'MySQL', 'Database'],
    rpRank: 7,
    media: ['/projects/employee-management/1.jpg', '/projects/employee-management/2.jpg', '/projects/employee-management/3.jpg', '/projects/employee-management/4.jpg'],
  },
  {
    id: 'calorie-burn',
    name: 'Calorie Burn Prediction',
    imageType: 'light',
    description: 'A machine learning project using XGBoost to accurately predict calorie burn.',
    period: 'Jan 2023 - May 2023',
    sortDate: new Date('2023-01-01').getTime(),
    tags: ['Machine Learning', 'Python', 'XGBoost'],
    rpRank: 9,
    media: ['/projects/calorie-burn/1.png', '/projects/calorie-burn/2.png', '/projects/calorie-burn/3.png', '/projects/calorie-burn/4.png'],
  }
];
