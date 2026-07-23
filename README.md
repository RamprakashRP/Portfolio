# Ramprakash Raja - Personal Portfolio

Welcome to the open-source repository for my personal portfolio website! This site serves as a dynamic, interactive showcase of my professional experience, projects, and achievements.

## 🚀 Live Preview
**[View Live Site](https://portfolio-3qpv-m5ja1n8b9-ramprakashrp-projects.vercel.app/)** *(Update this link to your custom domain once connected)*

## 🎨 Design Philosophy
This portfolio is built with a strong emphasis on **premium aesthetics, smooth micro-animations, and a recruiter-friendly UX**. The UI leverages deep dark modes, glassmorphism overlays, smooth page transitions, and responsive masonry layouts to create a memorable browsing experience.

## ✨ Key Features
- **Dynamic Content:** All Experiences, Projects, and Achievements are fetched directly from a backend database (Supabase), meaning the site updates instantly without needing code redeployments.
- **Advanced Filtering & Sorting:** Users can seamlessly filter projects and achievements by tags, or sort them by "Newest", "Oldest", or a custom "RP Rank" (a proprietary ranking system for highlighting top-tier items).
- **Recruiter Optimized:**
  - One-click Resume download directly from the Navbar.
  - Custom `@media print` stylesheet that strips away dark mode and animations, rendering a clean, black-on-white PDF when recruiters try to print the page.
  - Graceful "Empty States" if no records match a filter.
- **Hardware-Bound Admin Panel:** The backend dashboard is secured using bleeding-edge **Passkey Authentication (WebAuthn)**. Only registered physical devices (using FaceID, TouchID, or Windows Hello) can access the content management system.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router, React 19)
- **Styling:** Tailwind CSS + Vanilla CSS (for custom keyframes/variables)
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Authentication:** WebAuthn (`@simplewebauthn`) + JWT (`jose`)
- **Deployment:** Vercel

## 📄 License
This project is for personal use. Feel free to draw inspiration from the design and architecture, but please refrain from direct copying of personal data, images, and branding assets.
