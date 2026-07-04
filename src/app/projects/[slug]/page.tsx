import Link from 'next/link';
import Image from 'next/image';
import { Target, Puzzle, Trophy, ArrowUpRight } from 'lucide-react';
import { projectsList } from '@/data/projects';

// Mock data that would typically come from a CMS or database
const projectsData: Record<string, any> = {
  ecoscan: {
    title: 'EcoScan',
    description: "EcoScan is an AI-based web app that identifies electronic waste through image uploads. It provides smart recycling, reuse, or repair suggestions using Google's Gemini API. The system promotes eco-friendly disposal by calculating an item's environmental impact.",
    liveUrl: '#',
    client: 'Personal Project',
    service: 'Environmental Safety & Development',
    info: {
      goal: "The goal of EcoScan is to create an AI-powered web application that helps users identify electronic waste through image recognition and provides personalized, eco-friendly recommendations for recycling, reuse, or repair—making e-waste management accessible and sustainable for everyone.",
      challenge: "The main challenge is the lack of accessible, user-friendly tools for identifying and managing e-waste. Existing systems are complex, centralized, and not designed for everyday users, making responsible disposal difficult and leading to environmental harm.",
      result: "EcoScan successfully identifies electronic waste from images and provides users with accurate, AI-generated recycling or reuse suggestions. It simplifies e-waste management for the public and promotes environmentally responsible behavior. The system delivers real-time, personalized recommendations with a user-friendly interface."
    }
  },
  entracker: {
    title: 'Entracker – Media Tracking System',
    description: "Entracker is a full-stack media tracking system designed to help users manage their watchlist of TV series, movies, anime series, and anime movies. It uses AI (Perplexity API) to automatically fetch media details and stores standardized data in Google Sheets. The frontend features a modern React UI with glassmorphism design and dynamic form handling. Users can add or update entries, view suggestions, and filter media types. Entracker simplifies media tracking with automation, intelligent prompts, and a clean user experience.",
    liveUrl: '#',
    client: 'Self',
    service: 'Web Design',
    info: {
      goal: "The goal of Entracker is to create a smart, full-stack media tracking system that simplifies how users manage and monitor their entertainment watchlists. By integrating AI (via Perplexity API) and Google Sheets, Entracker automates the process of fetching and organizing media details for TV series, movies, anime series, and anime movies. It aims to provide a seamless experience through a modern, responsive frontend and a robust backend, ensuring standardized data storage, intelligent suggestions, and easy updates—all tailored to enhance user convenience and tracking accuracy.",
      challenge: "Tracking media manually is time-consuming and inconsistent, especially when dealing with varied formats like TV series, movies, anime series, and anime movies. Existing tools lack automation, standardized data formats, and intelligent suggestions. Integrating AI to fetch structured media details and syncing with Google Sheets posed challenges in prompt engineering, response parsing, and maintaining consistent formats. On the frontend, building a responsive, editable UI with dynamic form behavior and seamless backend communication required careful handling of layout, state management, and user experience.",
      result: "Entracker successfully delivers a smart, automated media tracking experience tailored for users who follow TV series, movies, anime series, and anime movies. The system accurately fetches structured media details using AI, standardizes the data, and stores it in Google Sheets with minimal user input. The frontend provides a modern, responsive interface with dynamic forms, intelligent suggestions, and real-time updates. Users can easily add, edit, and view their media entries, making tracking seamless and efficient. Overall, Entracker achieves its goal of combining AI automation with a clean UI to simplify and enhance media management."
    }
  },
  'srm-gpa-calculator': {
    title: 'SRM GPA Calculator Web App',
    description: "SRM GPA Calculator is a web-based tool designed for SRM students to calculate SGPA and CGPA easily. It features a dynamic table with editable inputs and dropdowns for grades. Users can add or remove courses, and switch between SGPA and CGPA modes. The app includes real-time GPA calculation, reset, and edit options. Built with HTML, CSS, and JavaScript, it’s hosted on GitHub Pages for public access.",
    liveUrl: '#',
    client: 'Self',
    service: 'Web Design',
    info: {
      goal: "The goal of this project is to develop a modern, responsive GPA calculator tailored for SRM students, enabling them to accurately compute both SGPA and CGPA through a clean and interactive web interface. The tool is designed to simplify the grade calculation process by offering dynamic course entry, real-time GPA computation, and editable inputs—all within a user-friendly layout. By addressing limitations in existing GPA tools, such as lack of editability and rigid input formats, this project aims to enhance usability, accuracy, and accessibility for students managing their academic performance.",
      challenge: "Most existing GPA calculators for SRM students lack flexibility and user control. They often do not allow users to edit inputs after submission, limit the number of courses, and have rigid interfaces that confuse users between SGPA and CGPA modes. Additionally, the user experience is often compromised by oversized tables and poor alignment, making the tools less intuitive. The challenge was to build a dynamic, editable, and responsive GPA calculator that overcomes these limitations while maintaining accuracy and ease of use.",
      result: "The SRM GPA Calculator successfully delivers a dynamic and user-friendly platform for students to calculate both SGPA and CGPA with ease. The app allows users to input course details in a structured table format, with automatic S.No generation and dropdowns for grade selection. Upon submission, the GPA is calculated accurately based on standard grade point mappings. The interface supports real-time feedback, and users can reset or edit their inputs to explore different scenarios. Compared to existing tools, this calculator offers enhanced flexibility, better usability, and a modern dark-themed UI, making it a practical solution for academic tracking."
    }
  },
  'sims-hospital': {
    title: 'SIMS Hospital Managemnt System Internship',
    description: "The \"SIMS Website\" project, an internship by Ramprakash R, focused on developing a comprehensive Hospital Information System (HIS) to improve hospital efficiency. This included a responsive UI and a dashboard for seamless healthcare management, offering personalized dashboards for staff, patients, and doctors. The system streamlines operations like patient records, appointments, and room details, using various interactive components for efficient data handling",
    liveUrl: '#',
    client: 'SIMS Hospital',
    service: 'UI/UX, Full Stack Application',
    info: {
      goal: "To enhance the efficiency and effectiveness of SIMS hospital's operations. This was achieved by developing a responsive Hospital Information System (HIS) UI and a website dashboard. The system aimed to simplify healthcare management and streamline daily hospital activities. Ultimately, the project sought to improve the overall experience for both staff and patients.",
      challenge: "The development of the SIMS Hospital Information System presented challenges primarily in integrating a comprehensive user message system, crucial for communication, emergency alerts, and appointment reminders across doctors, patients, and staff. Furthermore, implementing reactive icons and other dynamic UI elements, such as those that respond to user interaction or system status, was a significant challenge to ensure a highly responsive and intuitive user experience.",
      result: "A responsive Hospital Information System (HIS) UI and dashboard for SIMS hospital. Built with HTML, CSS, and JavaScript, it simplifies healthcare management and daily operations. The system offers personalized dashboards for staff, patients, and doctors, enhancing communication, alerts, and appointment reminders. Key features include employee forms, patient records, room details, lab appointments, and administrative settings, all supported by interactive UI components"
    }
  },
  'rtf-to-json': {
    title: 'RTF to JSON Converter',
    description: "This project involved building an efficient RTF to JSON converter to transform unstructured medical documents into structured, machine-readable JSON. Key features included font, color, and table extraction, multithreaded processing, and robust logging. The tool ensures accurate data mapping while improving speed and scalability. It aims to support digital record management in the healthcare domain.",
    liveUrl: '#',
    client: 'APT SKILLS',
    service: 'UI&UX Development, RTF to JSON Software',
    info: {
      goal: "The goal of the internship was to gain practical experience in software development by contributing to a real-time project focused on converting RTF medical documents into structured JSON format. It aimed to enhance technical skills in Python, multithreading, data extraction, and documentation, while understanding the software development lifecycle and collaborative project workflows in a professional setting.",
      challenge: "The primary challenge was accurately extracting and preserving complex formatting from RTF files, including fonts, colors, and tables, while converting them into clean, structured JSON. Ensuring consistency across diverse document structures, optimizing performance with multithreading, and handling exceptions reliably were key technical hurdles throughout the project.",
      result: "The project successfully delivered a reliable RTF to JSON conversion tool capable of handling complex formatting and large document sets with multithreaded efficiency. The final output ensured accurate data extraction, robust logging, and a user-friendly interface—laying the foundation for scalable integration in healthcare data systems."
    }
  },
  'employee-management': {
    title: 'Employee Management System',
    description: "A Dynamic Employee Management System was developed using Python and MySQL to streamline organizational processes and resource access. This system features employee tracking, secure access management, real-time updates, and automated operations to enhance efficiency and productivity. It enables managers to focus on strategic initiatives and demonstrates capability in creating effective business solutions.",
    liveUrl: '#',
    client: 'SRM College',
    service: 'Secure Database, Role Wise Login',
    info: {
      goal: "The goal of the Employee Management System project was to develop a dynamic system using Python to streamline organization and resource access. This system aimed to enhance efficiency, security, and overall productivity through features like employee tracking, secure access management, real-time updates, and automated operations. Ultimately, it allows managers to focus on strategic initiatives.",
      challenge: "The development of the Employee Management System presented several significant challenges. A primary concern was maintaining a secure database to protect sensitive employee information. Another crucial hurdle involved managing login and passwords for over 1000 accounts, which required a robust and scalable authentication system. Additionally, implementing multi-threading was a key challenge to ensure the system's responsiveness and overall performance, especially given the large number of potential users.",
      result: "The project resulted in a Dynamic Employee Management System, built with Python and MySQL. It successfully streamlined organizational and resource access through features like employee tracking and secure management, ultimately boosting efficiency, security, and productivity. This outcome demonstrated the ability to deliver effective business solutions."
    }
  },
  'calorie-burn': {
    title: 'Calorie Burn Prediction',
    description: "This project uses machine learning—especially the XGBoost algorithm—to predict how many calories a person burns during exercise. It takes inputs like age, gender, exercise type, and duration, and gives real-time predictions through a user-friendly web app.",
    liveUrl: '#',
    client: 'Personal Project',
    service: 'Machine Learning Understanding',
    info: {
      goal: "The goal is to build a personalized, accurate, and interactive system that predicts calorie burn based on user-specific and exercise-related data. It aims to replace traditional, generalized methods with a smarter, data-driven approach that adapts to individual differences and provides real-time feedback.",
      challenge: "Traditional calorie tracking methods like MET formulas or manual logs are often inaccurate and non-personalized. They don’t consider individual factors like age, weight, or exercise intensity. Most fitness apps also lack real-time prediction and interactive features. The challenge is to create a system that is accurate, user-friendly, and adaptable to different users and activities.",
      result: "The results of the Calorie Burn Prediction system demonstrate the effectiveness of machine learning in estimating energy expenditure during physical activities. Here's a breakdown of the key outcomes: 🔹 1. Prediction Accuracy The model was trained using the XGBoost algorithm, which outperformed other models like Random Forest, SVM, and Linear Regression. Evaluation metrics such as Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) showed high accuracy in predicting calorie burn. The model was tested on unseen data (20% of the dataset), confirming its ability to generalize well across different user profiles and activities. 🔹 2. Real-Time Feedback The system provides instant calorie burn estimates based on user inputs like age, gender, weight, height, exercise type, and duration. It dynamically adjusts predictions based on changes in activity intensity or user details, making it suitable for live workout tracking. 🔹 3. Personalization By incorporating user-specific data, the system tailors predictions to individual fitness levels and body metrics. This personalization improves the relevance and usefulness of the feedback compared to generic fitness apps. 🔹 4. Visualization Features The web app includes interactive graphs that show: Calories burned over time Comparison between predicted and actual values Feature importance (e.g., which factors most influence calorie burn) These visual tools help users understand their progress and make informed decisions about their fitness routines. 🔹 5. Model Comparison The project tested multiple models: XGBoost: Best performance in terms of accuracy and speed. Random Forest: Good accuracy, robust to overfitting. SVM: High precision but slower on large datasets. Linear Regression: Simple and interpretable, but less accurate for complex patterns. Visual comparisons (e.g., scatter plots and line graphs) were used to show how each model performed against actual calorie data. 🔹 6. User Experience The system was built using Streamlit, offering a clean and responsive interface. Users can easily input their data and receive predictions without needing technical knowledge. The app also stores prediction history, allowing users to track their fitness journey over time."
    }
  }
};

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Use ecoscan data as fallback/template if slug doesn't exist in mock data
  const projectInfo = projectsData[slug] || projectsData['ecoscan'];
  const projectListEntry = projectsList.find(p => p.id === slug);
  const media = projectListEntry?.media || [];

  // Filter out the current project and select the next 4 for the "Recent Works" section
  const relatedProjects = projectsList.filter(p => p.id !== slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-40 pb-20 flex flex-col items-center">
      
      {/* 1. Hero Section */}
      <section className="max-w-[1200px] w-full px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center mb-32">
        
        {/* Left: Website Info */}
        <div className="flex flex-col">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-8">
            {projectInfo.title}
          </h1>
          
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            {projectInfo.description}
          </p>
          
          <Link 
            href={projectInfo.liveUrl}
            className="w-fit px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold mb-16"
          >
            Live Site Preview
          </Link>

          {/* Client Info Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-neutral-500 font-medium">Client</span>
              <span className="text-sm text-neutral-300 font-semibold">{projectInfo.client}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs text-neutral-500 font-medium">Service Provided</span>
              <span className="text-sm text-neutral-300 font-semibold">{projectInfo.service}</span>
            </div>
          </div>
        </div>

        {/* Right: Main Image */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] bg-[#050505] rounded-[2rem] border border-white/5 p-4 md:p-8 flex items-center justify-center shadow-2xl relative overflow-hidden group">
            
            {/* The actual project image placeholder */}
            <div className="w-full h-full bg-[#111] rounded-xl border border-white/10 flex items-center justify-center relative z-10 overflow-hidden">
               {media.length > 0 ? (
                 <Image src={media[0]} alt={projectInfo.title} fill className="object-cover" />
               ) : (
                 <span className="text-sm font-bold text-neutral-600 tracking-widest uppercase">Project Image</span>
               )}
               {/* Optional gradient/glow for aesthetics */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/20 blur-[60px] pointer-events-none" />
            </div>

            {/* Background ambient glow behind the inner container */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 z-0" />
          </div>
        </div>

      </section>

      {/* 2. Info Section */}
      <section className="max-w-[1000px] w-full flex flex-col gap-16 mb-32 bg-[#09090a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* The Goal */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-neutral-400" />
              <h3 className="text-2xl font-bold">The Goal:</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-400">
              1
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
            {projectInfo.info?.goal}
          </p>
          <div className="w-full aspect-[2000/1414] bg-[#080808] border border-white/5 rounded-[2rem] mt-4 flex items-center justify-center overflow-hidden relative shadow-inner">
            {media.length > 1 ? (
              <Image src={media[1]} alt="Goal Image" fill className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-neutral-700 tracking-widest uppercase">Goal Image</span>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* The Challenge */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Puzzle className="w-6 h-6 text-neutral-400" />
              <h3 className="text-2xl font-bold">The Challenge:</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-400">
              2
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
            {projectInfo.info?.challenge}
          </p>
          <div className="w-full aspect-[2000/1414] bg-[#080808] border border-white/5 rounded-[2rem] mt-4 flex items-center justify-center overflow-hidden relative shadow-inner">
            {media.length > 2 ? (
              <Image src={media[2]} alt="Challenge Image" fill className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-neutral-700 tracking-widest uppercase">Challenge Image</span>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* The Result */}
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-neutral-400" />
              <h3 className="text-2xl font-bold">The Result</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-400">
              3
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
            {projectInfo.info?.result}
          </p>
          <div className="w-full aspect-[2000/1414] bg-[#080808] border border-white/5 rounded-[2rem] mt-4 flex items-center justify-center overflow-hidden relative shadow-inner">
            {media.length > 3 ? (
              <Image src={media[3]} alt="Result Image" fill className="object-cover" />
            ) : (
              <span className="text-sm font-bold text-neutral-700 tracking-widest uppercase">Result Collage</span>
            )}
          </div>
        </div>

      </section>

      {/* 3. Recent Projects / More Work */}
      <section className="max-w-[1200px] w-full px-6 flex flex-col mb-32 border-t border-white/5 pt-20">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-medium tracking-tight">Recent Projects</h2>
          <Link 
            href="/projects"
            className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white hover:text-black transition-colors"
          >
            See All Projects
          </Link>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedProjects.map((rp) => (
            <Link 
              key={rp.id} 
              href={`/projects/${rp.id}`}
              className="group block relative"
            >
              <div className="w-full relative flex flex-col bg-[#050505] border border-white/5 rounded-3xl p-4 overflow-hidden transition-colors hover:border-white/10 hover:bg-[#080808]">
                {/* Image Placeholder */}
                <div className={`w-full aspect-[4/3] rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden relative ${rp.imageType === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                  {rp.media && rp.media.length > 0 ? (
                    <Image src={rp.media[0]} alt="Project" fill className="object-cover" />
                  ) : (
                    <span className={`text-xs font-semibold tracking-wider ${rp.imageType === 'dark' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                      Project Image
                    </span>
                  )}
                  
                  {/* Arrow Icon embedded on image */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </main>
  );
}
