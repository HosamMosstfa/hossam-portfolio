export const PERSONAL_INFO = {
  name: "Hossam Mostafa Farghaly",
  avatar: "/profile.jpg",
  email: "hossammostafa6520@gmail.com",
  linkedin: "https://linkedin.com/in/hosammostfa",
  github: "https://github.com/HosamMosstfa",
  regions: {
    ksa: {
      id: "ksa",
      label: "Dammam, KSA",
      location: "Dammam, Saudi Arabia",
      phone: "+966 59 745 1024",
      whatsapp: "966597451024",
      availability: "Available for opportunities in Saudi Arabia",
    },
    egypt: {
      id: "egypt",
      label: "Cairo, Egypt",
      location: "Cairo, Egypt",
      phone: "+20 10 6568 6252",
      whatsapp: "201065686252",
      availability: "Available for opportunities in Egypt & Remote",
    },
  },
};

export const ROLE_PERSPECTIVES = {
  fullstack: {
    id: "fullstack",
    label: "Full Stack .NET",
    title: "Full Stack .NET Developer",
    tagline:
      "Building end-to-end web systems with ASP.NET Core, SQL Server, Angular, and React.",
    summary:
      "Full Stack .NET Developer skilled in ASP.NET Core, C#, Entity Framework Core, and SQL Server, with front-end expertise in Angular, TypeScript, React.js, Next.js, and Supabase. Graduate of the government-sponsored ITI Full Stack .NET Scholarship (2025) and winner of 3rd place at Google DevFest (Assiut) for SMARTPOOL AI monitoring dashboard.",
    coreFocus: [
      "ASP.NET Core",
      ".NET 8",
      "EF Core",
      "SQL Server",
      "Angular",
      "React.js",
      "Next.js",
      "Supabase",
    ],
  },
  backend: {
    id: "backend",
    label: "Back-End .NET",
    title: "Back-End .NET Developer",
    tagline:
      "Architecting secure APIs, relational data layers, and scalable .NET 8 services.",
    summary:
      "Back-End .NET Developer focused on ASP.NET Core, C#, Entity Framework Core, LINQ, and SQL Server, specializing in secure authentication (PBKDF2 / Middleware / RLS), Clean Architecture, efficient data access, and RESTful API integration.",
    coreFocus: [
      "C#",
      "ASP.NET Core",
      ".NET 8",
      "Entity Framework Core",
      "LINQ",
      "SQL Server",
      "PostgreSQL",
      "Clean Architecture",
    ],
  },
  frontend: {
    id: "frontend",
    label: "Front-End",
    title: "Front-End Developer",
    tagline:
      "Crafting fast, responsive single-page applications with Angular, React, and TypeScript.",
    summary:
      "Front-End Developer experienced in Angular, TypeScript, RxJS, React.js, and Next.js, building responsive, accessible user interfaces with TailwindCSS, Bootstrap, bilingual RTL/LTR support, and modern REST API state management.",
    coreFocus: [
      "Angular",
      "TypeScript",
      "RxJS",
      "React.js",
      "Next.js 14",
      "TailwindCSS",
      "Bootstrap 5",
      "RTL / UI-UX",
    ],
  },
};

export const PROJECTS = [
  {
    id: "smartpool",
    title: "SMARTPOOL — AI-Based Swimming Pool Monitoring Dashboard",
    category: "Full Stack & AI",
    period: "Oct 2023 – Jun 2024",
    sortDate: "2024-06",
    priority: 1,
    badge: "3rd Place · Google DevFest Assiut",
    featured: true,
    hasVisualPreview: true,
    screenshots: [
      {
        label: "AI Detection",
        src: "/projects/smartpool-ai-detection.jpg",
        caption:
          "Real-time Computer Vision inference detecting drowning posture (Bounding Box)",
      },
      {
        label: "Admin Dashboard",
        src: "/projects/smartpool-dashboard.png",
        caption:
          "Facility analytics, live revenue/reservations metrics & incident logs",
      },
      {
        label: "RBAC Users",
        src: "/projects/smartpool-users.png",
        caption:
          "Role-based access control managing Admins, Lifeguards & Clients",
      },
      {
        label: "Auth Portal",
        src: "/projects/smartpool-login.png",
        caption:
          "Middleware-protected authentication portal for facility staff",
      },
    ],
    description:
      "Award-winning AI safety dashboard that won 3rd Place at Google DevFest (Assiut). Detects drowning incidents and abnormal swimmer behavior in real time via computer vision and triggers instant role-based alerts for lifeguards and facility admins.",
    highlights: [
      "Won 3rd Place at the Google DevFest Competition (Assiut) among competing graduation engineering teams.",
      "Engineered real-time swimmer telemetry, zone status monitoring, and instant emergency alert dispatching.",
      "Built role-based access control (RBAC) with middleware authentication and scalable MongoDB incident logging.",
    ],
    techStack: [
      "Next.js 14",
      "React.js",
      "MongoDB",
      "Deep Learning",
      "Middleware Auth",
    ],
    githubUrl: "https://github.com/HosamMosstfa/projectgraduation",
    liveUrl: "",
    architecture: {
      frontend:
        "Next.js 14 (App Router) & React.js live monitoring dashboard with zone telemetry and alert queues.",
      backend:
        "Middleware authentication layer enforcing role-based lifeguard/admin permissions and alert triggers.",
      database:
        "MongoDB collections storing swimmer tracking sessions, user roles, and time-stamped incident logs.",
      aiLayer:
        "Deep learning computer-vision inference pipeline detecting drowning patterns and submersion anomalies.",
    },
  },
  {
    id: "digital-notes",
    title: "Digital Notes Manager",
    category: "Back-End & .NET",
    period: "Oct 2025",
    sortDate: "2025-10",
    priority: 2,
    badge: ".NET 8 Desktop App",
    featured: true,
    hasVisualPreview: false,
    description:
      "High-performance .NET 8 desktop application featuring encrypted user authentication, custom rich-text editing with JSON/HTML export, and real-time background reminders.",
    highlights: [
      "Architected secure authentication using PBKDF2 password hashing.",
      "Optimized SQL Server queries with Entity Framework Core, LINQ, and Async/Await.",
      "Implemented a background reminder service with real-time desktop notifications.",
    ],
    techStack: [
      "C#",
      ".NET 8",
      "Windows Forms",
      "EF Core",
      "SQL Server",
      "LINQ",
      "PBKDF2",
    ],
    githubUrl: "https://github.com/HosamMosstfa/DigitalNotesManager",
    liveUrl: "",
    architecture: {
      frontend:
        "Windows Forms UI with a custom rich-text editor supporting structured JSON and HTML export.",
      backend:
        "C# .NET 8 asynchronous service layer with background worker timers for scheduled reminders.",
      database:
        "SQL Server accessed via Entity Framework Core and compiled LINQ queries.",
      security:
        "Salted PBKDF2 cryptographic password hashing for local and multi-user account protection.",
    },
  },
  {
    id: "dar-alnakheel",
    title: "Dar Al-Nakheel — Calligraphy E-Commerce Studio",
    category: "Full Stack & AI",
    period: "2026",
    sortDate: "2026-02",
    priority: 3,
    badge: "Live App · React + Supabase",
    featured: true,
    hasVisualPreview: false,
    description:
      "Bilingual (Arabic/English) e-commerce and calligraphy studio web app for Dar Al-Nakheel Fine Press & Arabic Calligraphy: live Arabic typography preview, limited-edition catalog, custom commission requests, cart with printable tax invoice, and customer/admin dashboards.",
    highlights: [
      "Built an interactive specimen lab that previews vocalized Arabic text live with automatic diacritic rubrication and switchable Naskh, Kufi, and Diwani styles.",
      "Implemented the collector cart with discount codes, automatic free shipping, 15% VAT, and a printable simplified tax invoice.",
      "Developed customer and admin studios for order tracking, draft saving, and catalog and order management, backed by Supabase Auth and PostgreSQL with Row Level Security.",
      "Delivered full RTL/LTR bilingual support with Arabic/English switching and a dark mode.",
    ],
    techStack: [
      "React.js",
      "Vite",
      "Tailwind CSS v4",
      "Supabase",
      "PostgreSQL",
      "Context API",
      "EmailJS",
      "Netlify",
    ],
    githubUrl: "https://github.com/HosamMosstfa/dar-alnakheel",
    liveUrl: "https://lively-bienenstitch-ea151f.netlify.app/",
    architecture: {
      frontend:
        "React + Vite single-page app styled with Tailwind CSS v4, organized into reusable components and Auth, Cart, Language, Theme, and Toast context providers.",
      state:
        "Context-based global state for authentication, cart, language (RTL/LTR), and theme, with a localStorage demo fallback when Supabase keys are not connected.",
      backend:
        "Supabase Auth and PostgreSQL with Row Level Security; optional EmailJS notifications for commission requests.",
      deployment: "Git-connected deployment on Netlify (netlify.toml).",
    },
  },
  {
    id: "movie-discovery",
    title: "Movie Discovery & Tracking Platform",
    category: "Front-End",
    period: "Nov 2025",
    sortDate: "2025-11",
    priority: 4,
    badge: "Live App · Angular SPA",
    featured: true,
    hasVisualPreview: false,
    description:
      "Responsive Angular Single-Page Application integrating the TMDB REST API for live movie discovery, trailers, multi-criteria filtering, localization, and a persistent user watchlist.",
    highlights: [
      "Managed reactive asynchronous data streams using RxJS.",
      "Implemented Firebase Authentication and real-time persistent Watchlist sync.",
      "Built search, pagination, localization, and a Dark/Light theme switcher.",
    ],
    techStack: [
      "Angular",
      "TypeScript",
      "RxJS",
      "Firebase",
      "Bootstrap",
      "TMDB API",
    ],
    githubUrl: "",
    liveUrl: "https://beshoywageh.github.io/movie-app/",
    architecture: {
      frontend:
        "Modular Angular architecture with TypeScript, lazy-loaded routes, and Dark/Light theme engine.",
      state:
        "RxJS observables, debounced search streams, and multi-criteria query parameter state.",
      backend:
        "TMDB RESTful API integration paired with Firebase Auth & Cloud Database.",
      features:
        "Persistent per-user Watchlist, trailer modals, localization, and paginated catalog browsing.",
    },
  },
  {
    id: "ai-chat-generator",
    title: "AI Chat Assistant & Image Generator",
    category: "Full Stack & AI",
    period: "Nov 2025",
    sortDate: "2025-11",
    priority: 5,
    badge: "Live App · Fireworks.ai API",
    featured: true,
    hasVisualPreview: false,
    description:
      "Interactive web application integrating Fireworks.ai REST APIs for conversational GPT responses and text-to-image generation with dynamic session history.",
    highlights: [
      "Integrated Fireworks.ai endpoints for dual text chat and image synthesis.",
      "Handled non-blocking asynchronous requests with Async/Await and loading states.",
      "Maintained seamless conversation history without page reloads.",
    ],
    techStack: [
      "JavaScript (ES6+)",
      "RESTful APIs",
      "Async/Await",
      "Bootstrap 5",
      "CSS3",
    ],
    githubUrl: "",
    liveUrl: "https://hosammosstfa.github.io/ChatGPTDemo-ITI-Project/",
    architecture: {
      frontend:
        "Responsive Bootstrap 5 chat interface with real-time typing and image generation loaders.",
      backend:
        "Direct RESTful consumption of Fireworks.ai LLM and text-to-image endpoints.",
      state:
        "In-memory dynamic session history manager updating conversation threads without page reloads.",
      performance:
        "Non-blocking Fetch + Async/Await error handling and media rendering.",
    },
  },
  {
    id: "iti-ecommerce",
    title: "E-Commerce Platform (ITI Agile Team)",
    category: "Front-End",
    period: "Aug 2025 – Sep 2025",
    sortDate: "2025-09",
    priority: 6,
    badge: "Live App · Vercel",
    featured: true,
    hasVisualPreview: false,
    description:
      "Multi-page e-commerce storefront and administrative dashboard built within a 5-person Agile team during the ITI track, featuring product browsing, cart management, orders, and a persistent wishlist.",
    highlights: [
      "Collaborated in a 5-developer Agile team using Git/GitHub branching and code reviews.",
      "Built customer modules for Products, Shopping Cart, Orders, and LocalStorage Wishlist.",
      "Developed admin management tools with live search filtering, pagination, and Vercel deployment.",
    ],
    techStack: [
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "LocalStorage",
      "Vercel",
    ],
    githubUrl: "",
    liveUrl: "https://project-js-iti.vercel.app/",
    architecture: {
      frontend:
        "Responsive Bootstrap 5 multi-page storefront with dynamic DOM rendering for catalog, cart, and checkout.",
      state:
        "Client-side persistence using browser LocalStorage for cart items, orders, and user wishlist.",
      admin:
        "Administrative CRUD interface featuring instant search filtering and paginated tables.",
      deployment: "Production CI/CD hosting deployed on Vercel.",
    },
  },
  {
    id: "store-ecommerce",
    title: ".store — Multi-Page E-Commerce Storefront",
    category: "Front-End",
    period: "2024",
    sortDate: "2024-11",
    priority: 7,
    badge: "Live App · GitHub Pages",
    featured: false,
    hasVisualPreview: false,
    description:
      "Responsive multi-page e-commerce storefront built with semantic HTML5, CSS3, and modular Vanilla JavaScript, simulating the full shopping journey from browsing to checkout.",
    highlights: [
      "Built 11 pages including category browsing, product details, flash offers, cart, checkout, wishlist, account/order tracking, and sign-in.",
      "Implemented cart and wishlist logic with quantity controls, a slide-out mini-cart, coupon codes, and a shipping/tax estimator on top of a mock API.",
      "Added a persistent Dark/Light theme, a Swiper.js product gallery, countdown timers, stock progress bars, mega menus, and a mobile drawer with bottom navigation.",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Swiper.js",
      "Responsive Design",
      "GitHub Pages",
    ],
    githubUrl: "https://github.com/HosamMosstfa/semiFinalProjectECommerce",
    liveUrl: "https://hosammosstfa.github.io/semiFinalProjectECommerce/",
    architecture: {
      frontend:
        "Semantic HTML5 pages styled with CSS3 (Flexbox, Grid, CSS Variables) and responsive off-canvas mobile navigation.",
      state:
        "Modular vanilla JavaScript: store.js for cart, wishlist, and checkout; theme.js for saved theme preference.",
      backend:
        "mock-api.js simulates the product catalog and backend responses.",
      deployment: "Static hosting on GitHub Pages.",
    },
  },
];

export const CERTIFICATES = [
  {
    id: "iti-cert",
    title: "Full Stack Web Development Using .NET Track",
    issuer: "Information Technology Institute (ITI) — MCIT",
    date: "Jul 2025 – Dec 2025",
    driveUrl:
      "https://drive.google.com/file/d/17CE9Ks6h55_z2TXR6RtV4RaJFR2fOJos/view?usp=sharing",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=17CE9Ks6h55_z2TXR6RtV4RaJFR2fOJos&sz=w1200",
    previewUrl:
      "https://drive.google.com/file/d/17CE9Ks6h55_z2TXR6RtV4RaJFR2fOJos/preview",
    highlights:
      "ASP.NET Core, C#, EF Core, SQL Server, Angular & Agile Team Engineering",
  },
  {
    id: "eraasoft-cert",
    title: "Front-End Development Diploma (160 Hours)",
    issuer: "EraaSoft Academy — Cairo",
    date: "2024",
    driveUrl:
      "https://drive.google.com/file/d/1sQBsbleptCV1Aapn5RNyUpxJq7QQydHR/view?usp=sharing",
    thumbnailUrl:
      "https://drive.google.com/thumbnail?id=1sQBsbleptCV1Aapn5RNyUpxJq7QQydHR&sz=w1200",
    previewUrl:
      "https://drive.google.com/file/d/1sQBsbleptCV1Aapn5RNyUpxJq7QQydHR/preview",
    highlights:
      "React.js, Modern JavaScript (ES6+), HTML5, CSS3 & Responsive UI/UX",
  },
];

export const SKILLS_GROUPS = [
  {
    title: "Back-End & .NET Ecosystem",
    skills: [
      "C#",
      "ASP.NET Core",
      ".NET 8",
      "Entity Framework Core",
      "LINQ",
      "RESTful APIs",
      "Authentication & Authorization",
      "Clean Architecture",
    ],
  },
  {
    title: "Front-End & UI Engineering",
    skills: [
      "Angular",
      "TypeScript",
      "RxJS",
      "React.js",
      "Next.js (App Router)",
      "JavaScript (ES6+)",
      "TailwindCSS",
      "Bootstrap 5",
      "shadcn/ui",
      "HTML5 & CSS3",
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      "SQL Server",
      "MongoDB",
      "PostgreSQL",
      "Supabase (Auth & RLS)",
      "Firebase Auth & Realtime DB",
      "JSON Serialization",
    ],
  },
  {
    title: "Tools & Engineering Practices",
    skills: [
      "Git & GitHub",
      "Visual Studio",
      "VS Code",
      "Agile / Scrum",
      "Debugging",
      "Performance Optimization",
      "Figma",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Data Entry Specialist",
    company: "Fajr Al-Mutaqaddimah",
    location: "Dammam, Saudi Arabia",
    period: "Sep 2026 – Oct 2026",
    points: [
      "Entered, verified, and maintained business data accurately in company systems.",
      "Kept records organized and met daily deadlines.",
    ],
  },
  {
    role: "Frontend Developer (Freelance)",
    company: "Independent Clients",
    location: "Riyadh, Saudi Arabia",
    period: "Mar 2023 – May 2023",
    points: [
      "Delivered 4 responsive websites for clients, including furniture delivery businesses, with cross-browser compatibility and a mobile-first design.",
      "Built intuitive user interfaces, optimized page load speeds, and structured code for easy maintenance.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Full Stack .NET Track",
    institution: "Information Technology Institute (ITI) — Minya",
    period: "Jul 2025 – Dec 2025",
    details:
      "Government-sponsored intensive scholarship covering ASP.NET Core, C#, Entity Framework Core, SQL Server, Angular, and Agile team simulations.",
  },
  {
    degree: "Front-End Development Diploma (160 Hours)",
    institution: "EraaSoft Academy — Cairo",
    period: "2024",
    details:
      "Practical training in React.js, modern JavaScript (ES6+), HTML5, CSS3, and UI/UX fundamentals with hands-on web applications.",
  },
  {
    degree: "B.Sc. in Computer Science",
    institution: "Egyptian E-Learning University — Assiut, Egypt",
    period: "Sep 2021 – Jun 2024",
    details:
      "Grade: Good · Graduation Project: SMARTPOOL AI Monitoring System (3rd Place at Google DevFest Assiut).",
  },
];
