# Hossam Mostafa Farghaly — Full Stack .NET & Front-End Portfolio

A modern, high-performance engineering portfolio built with **React**, **Vite**, and **Tailwind CSS**, tailored for recruiters and technical leads across **Saudi Arabia (KSA)** and **Egypt**.

---

## ✨ Key Features

- **Recruiter Perspective Switcher:** Dynamically adapts the hero summary, core focus tags, and ATS CV preview across three specialized tracks:
  - **Full Stack .NET Developer**
  - **Back-End .NET Developer**
  - **Front-End Developer**
- **Region & Availability Toggle (KSA / Egypt):** Switches contact credentials, phone/WhatsApp links, and regional availability between **Dammam, KSA** and **Cairo, Egypt**.
- **Interactive ATS CV Modal & Print Engine:** Built-in print-ready CV preview dynamically generated from the selected role perspective and region.
- **SMARTPOOL Visual & Telemetry Showcase:** Interactive preview component featuring real project UI screenshots with fullscreen zoom, AI bounding-box simulation, and system telemetry metrics.
- **Filterable & Sortable Engineering Projects:** Domain filtering (`All`, `Full Stack & AI`, `Back-End & .NET`, `Front-End`), timeline sorting, and deep-dive system architecture modals.
- **Verified Credentials Lightbox:** Direct certificate previews and Google Drive verification links (ITI Full Stack .NET Track & EraaSoft Front-End Diploma).
- **Dark / Light Theme & Accessible UI:** Smooth theme switching, keyboard-accessible modals (`ESC` support), and responsive layout across mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

- **Core:** React 18, Vite, JavaScript (ES6+)
- **Styling:** Tailwind CSS, Custom CSS Variables, Lucide React Icons
- **Deployment:** GitHub CI/CD + Netlify (`netlify.toml` SPA routing configured)

---

## 📂 Project Structure

```text
├── public/
│   ├── projects/               # Real project UI screenshots
│   └── profile.jpg             # Portrait avatar
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI, SpotlightCard, SmartPoolVisualPreview, Icons
│   │   ├── layout/             # Navbar, Footer, Modals (CV & Project Architecture)
│   │   └── sections/           # Hero, Projects, Skills, Experience, Certificates, Contact
│   ├── data/
│   │   └── portfolioData.js    # Centralized personal info, roles, projects & credentials
│   ├── App.jsx
│   └── main.jsx
├── netlify.toml                # Netlify build & redirect rules
├── package.json
└── README.md
```

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/HosamMosstfa/hossam-portfolio.git](https://github.com/HosamMosstfa/hossam-portfolio.git)
   cd hossam-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📬 Contact & Links

- **Portfolio Live:** *(Add your Netlify URL after deployment)*
- **LinkedIn:** [linkedin.com/in/hosammostfa](https://linkedin.com/in/hosammostfa)
- **GitHub:** [github.com/HosamMosstfa](https://github.com/HosamMosstfa)
- **Email:** [hossammostafa6520@gmail.com](mailto:hossammostafa6520@gmail.com)