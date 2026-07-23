export interface ProjectInfo {
  goal: string;
  challenge: string;
  result: string;
}

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
  liveUrl?: string;
  client?: string;
  service?: string;
  info?: ProjectInfo;
  previewCover?: string;
  homeCover?: string;
  highlightCover?: string;
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
    rpRank: 4,
    media: [
      '/projects/neuroscript/1.png',
      '/projects/neuroscript/2.png',
      '/projects/neuroscript/3.png',
      '/projects/neuroscript/4.png'
    ],
    isHighlighted: true,
    liveUrl: 'https://neuro-script.vercel.app/',
    client: 'Personal Project',
    service: 'Fullstack Development',
    info: {
      goal: "The primary objective behind NeuroScript was to bridge the gap between digital convenience and physical authenticity by creating an application capable of transforming plain text into highly realistic, organic handwriting. Rather than simply applying static fonts, the goal was to build a sophisticated full-stack platform that actively mimics the natural imperfections of human writing. I wanted to give users the ability to generate authentic-looking handwritten documents, complete with exact physical paper dimensions (such as A4, Classmate Long, or Short) and multi-page PDF compilation, offering a seamless and personalized document creation experience.",
      challenge: "Developing NeuroScript presented several unique technical hurdles, primarily centered around achieving authentic, natural-looking text generation. Building a custom physics engine to handle dynamic kerning, character jitter, and line drift required precise algorithmic fine-tuning in Python to ensure the text flowed naturally without sacrificing readability. Additionally, architecting the application meant bridging a heavy image-processing backend (using FastAPI and Pillow) with a responsive, modern frontend (Next.js and Tailwind CSS). I also had to ensure efficient data management and document state persistence, utilizing Supabase for cloud storage integration while optimizing the rendering pipeline to handle large, multi-page outputs quickly.",
      result: "The final product is a powerful, highly performant web application that successfully produces lifelike handwriting indistinguishable from the real thing. NeuroScript delivers an intuitive and sleek user experience, allowing users to effortlessly paste text and instantly retrieve flawlessly formatted, handwritten PDFs tailored to specific paper types. By successfully integrating complex rendering algorithms with a modern React-based frontend and robust cloud storage, this project not only showcases my full-stack capabilities but also resulted in a highly practical, innovative tool for automated document personalization."
    }
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
    liveUrl: 'https://omnivault-core.vercel.app/',
    client: 'Personal Project',
    service: 'Web3 & AI',
    info: {
      goal: "The primary goal of OmniVault is to establish a secure, hybrid data governance framework that effectively solves the 'Trust–Scalability–Privacy' trilemma. By seamlessly integrating the immutability of Blockchain with the efficiency of encrypted Cloud storage, the project aims to create a robust ecosystem where users retain absolute control over their sensitive information. OmniVault is designed to empower individuals and organizations to securely share, verify, and manage data at scale, ensuring privacy remains uncompromising in an increasingly interconnected digital landscape.",
      challenge: "Developing OmniVault involved navigating highly complex architectural challenges, primarily around integrating disparate, cutting-edge technologies into a cohesive platform. Implementing Zero-Knowledge Proofs (zk-SNARKs) to allow verifiable data sharing without exposing the underlying content required rigorous cryptographic implementation and optimization. Furthermore, engineering the system to seamlessly bridge Web3 decentralized protocols (Ethereum, IPFS) with local AI classification models (TensorFlow.js) demanded meticulous performance tuning to maintain a responsive user experience while executing heavy, privacy-preserving computations on the client side.",
      result: "The result is a highly sophisticated, production-ready web application that successfully redefines secure data governance. OmniVault delivers an intuitive, premium interface where users can confidently interact with complex decentralized technologies without a steep learning curve. By successfully merging Next.js, AI, and Blockchain into a unified architecture, this project stands as a powerful demonstration of scalable privacy solutions, providing an innovative, real-world application that guarantees data integrity and confidentiality."
    }
  },
  {
    id: 'aura',
    name: 'Aura',
    imageType: 'dark',
    description: "Aura is a modern, feature-rich Progressive Web App (PWA) designed to provide a seamless, native-like experience directly on the web. Built with React, Vite, and Supabase, it leverages intelligent service workers to deliver robust offline capabilities, instant load times, and real-time data synchronization. Beyond its highly responsive frontend, Aura integrates specialized Python-based parsing engines to intelligently process and manage complex data—such as SMS logs and financial statements—providing users with a secure, automated, and lightning-fast platform for managing their information.",
    category: 'Fullstack',
    date: '2026',
    period: '2026',
    sortDate: new Date('2026-06-01').getTime(),
    tags: ['React', 'Vite', 'Supabase', 'Python', 'PWA'],
    rpRank: 2,
    media: [
      '/projects/aura/1.png',
      '/projects/aura/2.png',
      '/projects/aura/3.png',
      '/projects/aura/4.png'
    ],
    isHighlighted: true,
    liveUrl: 'https://aura-ay5k.onrender.com/',
    client: 'Personal Project',
    service: 'Fullstack Development & PWA',
    info: {
      goal: "The primary objective of this project was to architect and develop a high-performance Progressive Web App (PWA) that delivers a native, app-like experience directly through the browser. I set out to build an accessible, highly responsive platform that prioritizes speed and reliability, ensuring users could interact with the application seamlessly across any device. By leveraging modern web technologies like React and Vite alongside Supabase as a robust Backend-as-a-Service, the goal was to create a dynamic application capable of real-time data synchronization and instantaneous user feedback.",
      challenge: "One of the most significant technical hurdles was implementing a robust service worker architecture to support reliable offline functionality and intelligent caching strategies. Ensuring that users could continue to access and interact with the app during spotty network conditions required meticulous state management and data conflict resolution when re-syncing with the Supabase database. Additionally, configuring the Vite build pipeline to optimize asset delivery and achieve a flawless Lighthouse PWA score demanded deep dives into performance tuning, lazy loading, and bundle-size reduction while maintaining a rich, interactive user interface.",
      result: "The final deliverable is a blazing-fast, installable web application that bridges the gap between web and native mobile experiences. The app boasts near-instant load times, seamless offline support, and real-time data updates, resulting in an exceptionally smooth user journey. By successfully integrating complex PWA features with a scalable Supabase backend, the project not only met its performance benchmarks but also provides a premium, highly engaging interface that retains users and operates flawlessly across all screen sizes."
    }
  },
  {
    id: 'ecoscan',
    name: 'EcoScan: E-Waste Solutions',
    imageType: 'dark',
    description: "EcoScan is an AI-based web app that identifies electronic waste through image uploads. It provides smart recycling, reuse, or repair suggestions using Google's Gemini API. The system promotes eco-friendly disposal by calculating an item's environmental impact.",
    category: 'Fullstack',
    date: '2025',
    period: 'Jan 2025 - Mar 2025',
    sortDate: new Date('2025-01-01').getTime(),
    tags: ['React', 'Next.js', 'AI', 'Tailwind'],
    rpRank: 6,
    media: ['/projects/ecoscan/1.png', '/projects/ecoscan/2.png', '/projects/ecoscan/3.png', '/projects/ecoscan/4.png'],
    isHighlighted: true,
    liveUrl: '#',
    client: 'Personal Project',
    service: 'Environmental Safety & Development',
    info: {
      goal: "The goal of EcoScan is to create an AI-powered web application that helps users identify electronic waste through image recognition and provides personalized, eco-friendly recommendations for recycling, reuse, or repair—making e-waste management accessible and sustainable for everyone.",
      challenge: "The main challenge is the lack of accessible, user-friendly tools for identifying and managing e-waste. Existing systems are complex, centralized, and not designed for everyday users, making responsible disposal difficult and leading to environmental harm.",
      result: "EcoScan successfully identifies electronic waste from images and provides users with accurate, AI-generated recycling or reuse suggestions. It simplifies e-waste management for the public and promotes environmentally responsible behavior. The system delivers real-time, personalized recommendations with a user-friendly interface."
    }
  },
  {
    id: 'entracker',
    name: 'Entracker – Media Tracking System',
    imageType: 'dark',
    description: "Entracker is a full-stack media tracking system designed to help users manage their watchlist of TV series, movies, anime series, and anime movies. It uses AI (Perplexity API) to automatically fetch media details and stores standardized data in Google Sheets. The frontend features a modern React UI with glassmorphism design and dynamic form handling. Users can add or update entries, view suggestions, and filter media types. Entracker simplifies media tracking with automation, intelligent prompts, and a clean user experience.",
    period: 'Aug 2024 - Dec 2024',
    sortDate: new Date('2024-08-01').getTime(),
    tags: ['React', 'API Integration', 'Fullstack'],
    rpRank: 3,
    media: ['/projects/entracker/1.png', '/projects/entracker/2.png', '/projects/entracker/3.png', '/projects/entracker/4.png'],
    liveUrl: 'https://entracker.vercel.app/',
    client: 'Self',
    service: 'Web Design',
    info: {
      goal: "The goal of Entracker is to create a smart, full-stack media tracking system that simplifies how users manage and monitor their entertainment watchlists. By integrating AI (via Perplexity API) and Google Sheets, Entracker automates the process of fetching and organizing media details for TV series, movies, anime series, and anime movies. It aims to provide a seamless experience through a modern, responsive frontend and a robust backend, ensuring standardized data storage, intelligent suggestions, and easy updates—all tailored to enhance user convenience and tracking accuracy.",
      challenge: "Tracking media manually is time-consuming and inconsistent, especially when dealing with varied formats like TV series, movies, anime series, and anime movies. Existing tools lack automation, standardized data formats, and intelligent suggestions. Integrating AI to fetch structured media details and syncing with Google Sheets posed challenges in prompt engineering, response parsing, and maintaining consistent formats. On the frontend, building a responsive, editable UI with dynamic form behavior and seamless backend communication required careful handling of layout, state management, and user experience.",
      result: "Entracker successfully delivers a smart, automated media tracking experience tailored for users who follow TV series, movies, anime series, and anime movies. The system accurately fetches structured media details using AI, standardizes the data, and stores it in Google Sheets with minimal user input. The frontend provides a modern, responsive interface with dynamic forms, intelligent suggestions, and real-time updates. Users can easily add, edit, and view their media entries, making tracking seamless and efficient. Overall, Entracker achieves its goal of combining AI automation with a clean UI to simplify and enhance media management."
    }
  },
  {
    id: 'srm-gpa-calculator',
    name: 'SRM GPA Calculator Web App',
    imageType: 'dark',
    description: "SRM GPA Calculator is a web-based tool designed for SRM students to calculate SGPA and CGPA easily. It features a dynamic table with editable inputs and dropdowns for grades. Users can add or remove courses, and switch between SGPA and CGPA modes. The app includes real-time GPA calculation, reset, and edit options. Built with HTML, CSS, and JavaScript, it’s hosted on GitHub Pages for public access.",
    period: 'Mar 2024 - Jun 2024',
    sortDate: new Date('2024-03-01').getTime(),
    tags: ['HTML', 'CSS', 'JavaScript'],
    rpRank: 7,
    media: ['/projects/srm-gpa-calculator/1.png', '/projects/srm-gpa-calculator/2.png', '/projects/srm-gpa-calculator/3.png', '/projects/srm-gpa-calculator/4.png'],
    liveUrl: 'https://ramprakashrp.github.io/SRM-GPA-Calculator/',
    client: 'Self',
    service: 'Web Design',
    info: {
      goal: "The goal of this project is to develop a modern, responsive GPA calculator tailored for SRM students, enabling them to accurately compute both SGPA and CGPA through a clean and interactive web interface. The tool is designed to simplify the grade calculation process by offering dynamic course entry, real-time GPA computation, and editable inputs—all within a user-friendly layout. By addressing limitations in existing GPA tools, such as lack of editability and rigid input formats, this project aims to enhance usability, accuracy, and accessibility for students managing their academic performance.",
      challenge: "Most existing GPA calculators for SRM students lack flexibility and user control. They often do not allow users to edit inputs after submission, limit the number of courses, and have rigid interfaces that confuse users between SGPA and CGPA modes. Additionally, the user experience is often compromised by oversized tables and poor alignment, making the tools less intuitive. The challenge was to build a dynamic, editable, and responsive GPA calculator that overcomes these limitations while maintaining accuracy and ease of use.",
      result: "The SRM GPA Calculator successfully delivers a dynamic and user-friendly platform for students to calculate both SGPA and CGPA with ease. The app allows users to input course details in a structured table format, with automatic S.No generation and dropdowns for grade selection. Upon submission, the GPA is calculated accurately based on standard grade point mappings. The interface supports real-time feedback, and users can reset or edit their inputs to explore different scenarios. Compared to existing tools, this calculator offers enhanced flexibility, better usability, and a modern dark-themed UI, making it a practical solution for academic tracking."
    }
  },
  {
    id: 'sims-hospital',
    name: 'SIMS Hospital Managemnt System Internship',
    imageType: 'light',
    description: "The \"SIMS Website\" project, an internship by Ramprakash R, focused on developing a comprehensive Hospital Information System (HIS) to improve hospital efficiency. This included a responsive UI and a dashboard for seamless healthcare management, offering personalized dashboards for staff, patients, and doctors. The system streamlines operations like patient records, appointments, and room details, using various interactive components for efficient data handling",
    period: 'Jan 2024 - Mar 2024',
    sortDate: new Date('2024-01-01').getTime(),
    tags: ['UI/UX', 'Dashboard', 'Healthcare'],
    rpRank: 8,
    media: ['/projects/sims-hospital/1.png', '/projects/sims-hospital/2.png', '/projects/sims-hospital/3.png', '/projects/sims-hospital/4.png'],
    liveUrl: '#',
    client: 'SIMS Hospital',
    service: 'UI/UX, Full Stack Application',
    info: {
      goal: "To enhance the efficiency and effectiveness of SIMS hospital's operations. This was achieved by developing a responsive Hospital Information System (HIS) UI and a website dashboard. The system aimed to simplify healthcare management and streamline daily hospital activities. Ultimately, the project sought to improve the overall experience for both staff and patients.",
      challenge: "The development of the SIMS Hospital Information System presented challenges primarily in integrating a comprehensive user message system, crucial for communication, emergency alerts, and appointment reminders across doctors, patients, and staff. Furthermore, implementing reactive icons and other dynamic UI elements, such as those that respond to user interaction or system status, was a significant challenge to ensure a highly responsive and intuitive user experience.",
      result: "A responsive Hospital Information System (HIS) UI and dashboard for SIMS hospital. Built with HTML, CSS, and JavaScript, it simplifies healthcare management and daily operations. The system offers personalized dashboards for staff, patients, and doctors, enhancing communication, alerts, and appointment reminders. Key features include employee forms, patient records, room details, lab appointments, and administrative settings, all supported by interactive UI components"
    }
  },
  {
    id: 'rtf-to-json',
    name: 'RTF to JSON Converter',
    imageType: 'dark',
    description: "This project involved building an efficient RTF to JSON converter to transform unstructured medical documents into structured, machine-readable JSON. Key features included font, color, and table extraction, multithreaded processing, and robust logging. The tool ensures accurate data mapping while improving speed and scalability. It aims to support digital record management in the healthcare domain.",
    period: 'Oct 2023 - Dec 2023',
    sortDate: new Date('2023-10-01').getTime(),
    tags: ['Python', 'Data Parsing', 'Software'],
    rpRank: 5,
    media: ['/projects/rtf-to-json/1.png', '/projects/rtf-to-json/2.png', '/projects/rtf-to-json/3.png', '/projects/rtf-to-json/4.png'],
    liveUrl: '#',
    client: 'APT SKILLS',
    service: 'UI&UX Development, RTF to JSON Software',
    info: {
      goal: "The goal of the internship was to gain practical experience in software development by contributing to a real-time project focused on converting RTF medical documents into structured JSON format. It aimed to enhance technical skills in Python, multithreading, data extraction, and documentation, while understanding the software development lifecycle and collaborative project workflows in a professional setting.",
      challenge: "The primary challenge was accurately extracting and preserving complex formatting from RTF files, including fonts, colors, and tables, while converting them into clean, structured JSON. Ensuring consistency across diverse document structures, optimizing performance with multithreading, and handling exceptions reliably were key technical hurdles throughout the project.",
      result: "The project successfully delivered a reliable RTF to JSON conversion tool capable of handling complex formatting and large document sets with multithreaded efficiency. The final output ensured accurate data extraction, robust logging, and a user-friendly interface—laying the foundation for scalable integration in healthcare data systems."
    }
  },
  {
    id: 'employee-management',
    name: 'Employee Management System',
    imageType: 'dark',
    description: "A Dynamic Employee Management System was developed using Python and MySQL to streamline organizational processes and resource access. This system features employee tracking, secure access management, real-time updates, and automated operations to enhance efficiency and productivity. It enables managers to focus on strategic initiatives and demonstrates capability in creating effective business solutions.",
    period: 'Jun 2023 - Sep 2023',
    sortDate: new Date('2023-06-01').getTime(),
    tags: ['Python', 'MySQL', 'Database'],
    rpRank: 10,
    media: ['/projects/employee-management/1.jpg', '/projects/employee-management/2.jpg', '/projects/employee-management/3.jpg', '/projects/employee-management/4.jpg'],
    liveUrl: '#',
    client: 'SRM College',
    service: 'Secure Database, Role Wise Login',
    info: {
      goal: "The goal of the Employee Management System project was to develop a dynamic system using Python to streamline organization and resource access. This system aimed to enhance efficiency, security, and overall productivity through features like employee tracking, secure access management, real-time updates, and automated operations. Ultimately, it allows managers to focus on strategic initiatives.",
      challenge: "The development of the Employee Management System presented several significant challenges. A primary concern was maintaining a secure database to protect sensitive employee information. Another crucial hurdle involved managing login and passwords for over 1000 accounts, which required a robust and scalable authentication system. Additionally, implementing multi-threading was a key challenge to ensure the system's responsiveness and overall performance, especially given the large number of potential users.",
      result: "The project resulted in a Dynamic Employee Management System, built with Python and MySQL. It successfully streamlined organizational and resource access through features like employee tracking and secure management, ultimately boosting efficiency, security, and productivity. This outcome demonstrated the ability to deliver effective business solutions."
    }
  },
  {
    id: 'calorie-burn',
    name: 'Calorie Burn Prediction',
    imageType: 'light',
    description: "This project uses machine learning—especially the XGBoost algorithm—to predict how many calories a person burns during exercise. It takes inputs like age, gender, exercise type, and duration, and gives real-time predictions through a user-friendly web app.",
    period: 'Jan 2023 - May 2023',
    sortDate: new Date('2023-01-01').getTime(),
    tags: ['Machine Learning', 'Python', 'XGBoost'],
    rpRank: 9,
    media: ['/projects/calorie-burn/1.png', '/projects/calorie-burn/2.png', '/projects/calorie-burn/3.png', '/projects/calorie-burn/4.png'],
    liveUrl: '#',
    client: 'Personal Project',
    service: 'Machine Learning Understanding',
    info: {
      goal: "The goal is to build a personalized, accurate, and interactive system that predicts calorie burn based on user-specific and exercise-related data. It aims to replace traditional, generalized methods with a smarter, data-driven approach that adapts to individual differences and provides real-time feedback.",
      challenge: "Traditional calorie tracking methods like MET formulas or manual logs are often inaccurate and non-personalized. They don’t consider individual factors like age, weight, or exercise intensity. Most fitness apps also lack real-time prediction and interactive features. The challenge is to create a system that is accurate, user-friendly, and adaptable to different users and activities.",
      result: "The results of the Calorie Burn Prediction system demonstrate the effectiveness of machine learning in estimating energy expenditure during physical activities. Here's a breakdown of the key outcomes: 🔹 1. Prediction Accuracy The model was trained using the XGBoost algorithm, which outperformed other models like Random Forest, SVM, and Linear Regression. Evaluation metrics such as Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) showed high accuracy in predicting calorie burn. The model was tested on unseen data (20% of the dataset), confirming its ability to generalize well across different user profiles and activities. 🔹 2. Real-Time Feedback The system provides instant calorie burn estimates based on user inputs like age, gender, weight, height, exercise type, and duration. It dynamically adjusts predictions based on changes in activity intensity or user details, making it suitable for live workout tracking. 🔹 3. Personalization By incorporating user-specific data, the system tailors predictions to individual fitness levels and body metrics. This personalization improves the relevance and usefulness of the feedback compared to generic fitness apps. 🔹 4. Visualization Features The web app includes interactive graphs that show: Calories burned over time Comparison between predicted and actual values Feature importance (e.g., which factors most influence calorie burn) These visual tools help users understand their progress and make informed decisions about their fitness routines. 🔹 5. Model Comparison The project tested multiple models: XGBoost: Best performance in terms of accuracy and speed. Random Forest: Good accuracy, robust to overfitting. SVM: High precision but slower on large datasets. Linear Regression: Simple and interpretable, but less accurate for complex patterns. Visual comparisons (e.g., scatter plots and line graphs) were used to show how each model performed against actual calorie data. 🔹 6. User Experience The system was built using Streamlit, offering a clean and responsive interface. Users can easily input their data and receive predictions without needing technical knowledge. The app also stores prediction history, allowing users to track their fitness journey over time."
    }
  }
];
