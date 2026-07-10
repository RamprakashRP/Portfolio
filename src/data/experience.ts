export interface RoleData {
  position: string;
  duration: string;
  description: string;
  images?: string[];
}

export interface ExperienceData {
  company: string;
  logo: string;
  roles: RoleData[];
}

export const experiences: ExperienceData[] = [
  {
    company: 'Google',
    logo: '/google.png',
    roles: [
      {
        position: 'India Representative (Top 6 India AI Impact Summit 2026)',
        duration: 'Feb 2026 - Present',
        description: 'Achieved the "Top Candidate" status, securing a spot in the Top 0.0001% of ambassadors nationwide. Impact: Spoke about the Program\'s reach, How it helps youngsters, how it can be moved forward, etc.',
        images: [
          '/experience/google/top6/Ahh We Spoke.jpg',
          '/experience/google/top6/Cinematic.jpg',
          '/experience/google/top6/Master Click.jpg',
          '/experience/google/top6/Whole Team.jpg'
        ]
      },
      {
        position: 'India Representative (Top 5 Winning Candidate)',
        duration: 'Dec 2025 - May 2026',
        description: 'Achieved the "Winning Candidate" status, securing a spot in the Top 0.0001% of ambassadors nationwide. Awarded a fully sponsored mentorship trip to Dubai to attend the AI Film Festival.',
        images: [
          '/experience/google/top5/Top 5 Poster.jpg'
        ]
      },
      {
        position: 'Student Ambassador at Top Achievers Club (Top 0.001%)',
        duration: 'Nov 2025 - Dec 2025',
        description: 'Identified as a top-tier ambassador (Top 0.01% India) based on sustained performance, leadership, and technical advocacy. Successfully fostered a developer culture on campus.',
        images: [
          '/experience/google/top-achievers/Top Achievers Club.jpg'
        ]
      },
      {
        position: 'Google Student Ambassador',
        duration: 'Sep 2025 - Nov 2025',
        description: 'Selected as an exceptional student leader to represent Google on campus and drive initiatives around AI innovation and technology adoption. Led AI awareness and conducted workshops.',
        images: [
          '/experience/google/student-ambassador/Offer Mail.jpg',
          '/experience/google/student-ambassador/Welcome Kit.jpg'
        ]
      }
    ]
  },
  {
    company: 'Microsoft',
    logo: '/Microsoft Logo.png',
    roles: [
      {
        position: 'Beta Ambassador',
        duration: 'Mar 2025 - Present',
        description: 'Contributed to Microsoft campus initiatives, enhanced communication and leadership skills, and explored AI-related projects.',
        images: [
          '/experience/microsoft/beta-ambassador/Microsoft Beta Ambassador Certificate.pdf',
          '/experience/microsoft/beta-ambassador/Dean Appreciation.jpg',
          '/experience/microsoft/beta-ambassador/Welcome Kit.jpg'
        ]
      },
      {
        position: 'Microsoft Student Ambassador',
        duration: 'Jan 2025 - Mar 2025',
        description: 'Student Ambassadors are a global group of campus leaders who are eager to help fellow students, create robust tech communities and develop technical and career skills for the future.',
        images: [
          '/experience/microsoft/student-ambassador/Microsoft Alpha Ambassador Certificate.pdf',
          '/experience/microsoft/student-ambassador/SRM Appreciation.jpg'
        ]
      }
    ]
  },
  {
    company: 'NextGen Intelligence Club',
    logo: '/nic logo.avif',
    roles: [
      {
        position: 'President',
        duration: 'Jul 2025 - Present',
        description: 'Led a tech-focused student club, organized events and guided teams to foster innovation and community growth.',
        images: [
          '/experience/nextgen-intelligence-club/president/Reveal Poster.jpg'
        ]
      },
      {
        position: 'Joint Secretary',
        duration: 'Jun 2024 - Jul 2025',
        description: 'Assisted in managing club operations, coordinating events, and supporting the executive board in strategic planning.',
        images: [
          '/experience/nextgen-intelligence-club/joint-secretary/Recieving Certificate.jpg',
          '/experience/nextgen-intelligence-club/joint-secretary/Reveal 2.jpg',
          '/experience/nextgen-intelligence-club/joint-secretary/Reveal.jpg'
        ]
      }
    ]
  },
  {
    company: 'Shiftzzy',
    logo: '/Shiftzzy.png',
    roles: [
      {
        position: 'Student Ambassador',
        duration: 'Dec 2024 - Present',
        description: 'Promoted Shiftzzy’s study abroad tools like mentorship and roommate matching, while organizing outreach events.',
        images: [
          '/experience/shiftzzy/student-ambassador/Shiftzzy - Student Ambassidor - Offer Letter.pdf'
        ]
      }
    ]
  },
  {
    company: 'SRM Vadapalani Model United Nations',
    logo: '/SRMVMUN Logo.png',
    roles: [
      {
        position: 'Under Secretary General',
        duration: 'Jun 2024 - Present',
        description: 'Oversaw planning and logistics for MUN conferences, contributing leadership and coordination efforts.',
        images: [
          '/experience/srm-vadapalani-model-united-nations/under-secretary-general/Certificate.jpg',
          '/experience/srm-vadapalani-model-united-nations/under-secretary-general/Reveal Poster.jpg',
          '/experience/srm-vadapalani-model-united-nations/under-secretary-general/Wrap Up.jpg'
        ]
      },
      {
        position: 'Member',
        duration: 'Jun 2023 - Jun 2024',
        description: 'Participated in MUN conferences, developing diplomacy, negotiation, and public speaking skills.',
      }
    ]
  },
  {
    company: 'Ayaan Foundation',
    logo: '/Ayaan.avif',
    roles: [
      {
        position: 'Member',
        duration: 'May 2024 - Present',
        description: 'Engaged in educational and community development projects with a nonprofit foundation.',
      }
    ]
  },
  {
    company: 'Association of Computer Science Engineers',
    logo: '/ACE.png',
    roles: [
      {
        position: 'Committee Member',
        duration: 'Jun 2023 - Present',
        description: 'Organized computer science seminars, coding contests, and encouraged peer collaboration.',
      }
    ]
  },
  {
    company: 'SRM IST Vadapalani Campus',
    logo: '/SRM.png',
    roles: [
      {
        position: 'Student Coordinator',
        duration: 'Sep 2022 - Present',
        description: 'Facilitated communication between faculty and students, coordinated academic and extracurricular events.',
      }
    ]
  },
  {
    company: 'Design and Innovation Club',
    logo: '/DI.png',
    roles: [
      {
        position: 'Core Member',
        duration: 'Sep 2022 - Present',
        description: 'Contributed to innovation challenges, supported design thinking workshops, and mentored juniors.',
      }
    ]
  },
  {
    company: 'White Hat Hackers Club (WHHC)',
    logo: '/WHHC Logo.png',
    roles: [
      {
        position: 'Committee Member',
        duration: 'Jul 2023 - Present',
        description: 'Promoted cybersecurity awareness and coordinated hands-on training sessions for students.',
      }
    ]
  },
  {
    company: 'Life',
    logo: '/dummy-logo-default.png',
    roles: [
      {
        position: 'Common Man',
        duration: 'Aug 2004 - Present',
        description: 'Represents personal journey of growth, learning, and contributions across academic and tech communities.',
      }
    ]
  },
  {
    company: 'ShadowFox',
    logo: '/Shadow.png',
    roles: [
      {
        position: 'Artificial Intelligence & Machine Learning Intern',
        duration: 'Jan 2025 - Feb 2025',
        description: 'Worked remotely on machine learning projects, gained experience in building and testing AI models.',
        images: [
          '/experience/shadowfox/ai-ml-intern/ShadowFox - AIML Intern - Offer Letter.pdf',
          '/experience/shadowfox/ai-ml-intern/Certificate.jpg',
          '/experience/shadowfox/ai-ml-intern/ShadowFox - AIML Intern - Completion Certificate.pdf',
          '/experience/shadowfox/ai-ml-intern/Goodies.jpg'
        ]
      }
    ]
  },
  {
    company: 'SkillCraft Technology',
    logo: '/SkillCraft Logo.png',
    roles: [
      {
        position: 'Machine Learning Intern',
        duration: 'Dec 2024 - Jan 2025',
        description: 'Implemented ML concepts in practical projects, supported by collaborative tools and expert mentorship.',
        images: [
          '/experience/skillcraft-technology/ml-intern/Skillcraft - Machine Learning Intern - Offer Letter.pdf',
          '/experience/skillcraft-technology/ml-intern/Skillcraft - Machine Learning Intern - Completion Certificate.pdf',
          '/experience/skillcraft-technology/ml-intern/Skillcraft - Machine Learning Intern - LOR.pdf'
        ]
      }
    ]
  },
  {
    company: 'Prodigy InfoTech',
    logo: '/Prodigy.png',
    roles: [
      {
        position: 'Data Science Intern',
        duration: 'Dec 2024 - Jan 2025',
        description: 'Analyzed datasets, built models, and learned tools like Python and Excel in a remote internship setup.',
        images: [
          '/experience/prodigy-infotech/data-science-intern/Prodigy - Data Science Intern - Offer Letter.pdf',
          '/experience/prodigy-infotech/data-science-intern/Prodigy - Data Science Intern - Completion Certificate.pdf',
          '/experience/prodigy-infotech/data-science-intern/Prodigy - Data Science Intern - LOR.pdf'
        ]
      }
    ]
  },
  {
    company: 'APT SKILLS',
    logo: '/APT.png',
    roles: [
      {
        position: 'Information Technology Intern',
        duration: 'Jul 2024 - Sep 2024',
        description: 'Supported enterprise systems troubleshooting and contributed to software quality checks in a hybrid environment.',
        images: [
          '/experience/apt-skills/it-intern/APT Skills - RTF to JSON Intern - Offer Letter.pdf',
          '/experience/apt-skills/it-intern/APT Skills - RTF to JSON Intern - Completion Certificate.pdf'
        ]
      }
    ]
  },
  {
    company: 'SIMS Hospital (SRM Institutes For Medical Science)',
    logo: '/SIMS Logo (1).png',
    roles: [
      {
        position: 'Software Engineer Intern',
        duration: 'Jun 2023 - Jul 2023',
        description: 'Developed software solutions for medical workflows and assisted cross-functional teams in IT operations.',
        images: [
          '/experience/sims-hospital-srm-institutes-for-medical-science/sde-intern/SIMS - Full Stack Developer - Completion Certificate.pdf'
        ]
      }
    ]
  }
];
