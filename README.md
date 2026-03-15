# 🛸 Nexus Portfolio

![Nexus Portfolio](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.19-06B6D4?style=for-the-badge&logo=tailwindcss)

A highly interactive, visually stunning personal portfolio built with modern web technologies. This project serves as an interactive canvas where design meets code, showcasing frontend engineering at its most expressive.

## ✨ Features

- **Immersive 3D Backgrounds**: Powered by Three.js and React Three Fiber for a deep, spatial experience.
- **Advanced Animations**: Fluid transitions, scroll-triggered reveals, and micro-interactions utilizing Framer Motion and GSAP.
- **Modern "Glassmorphism" UI**: Sleek, translucent components layered over a dynamic dark mode aesthetic (Nexus Black, Violet, and Cyan).
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.
- **Custom Interactive Cursor**: A unique interactive cursor that adapts to hover states.
- **Text Scramble Effects**: Cyberpunk-inspired text reveal animations.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (with custom themes & animations), clsx, tailwind-merge
- **Animation**: Framer Motion, GSAP
- **3D & Graphics**: Three.js, \`@react-three/fiber\`, \`@react-three/drei\`
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd nexus-portfolio
   ```

2. **Install dependencies**:
   This project uses standard Yarn for dependency management.
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   yarn dev
   ```
   The application will start, usually on `http://localhost:5173`. Look at your terminal for the exact local URL.

## 📜 Available Scripts

- `yarn dev` - Starts the Vite development server.
- `yarn build` - Builds the app for production to the `dist` folder.
- `yarn lint` - Runs ESLint to check for code quality and formatting issues.
- `yarn preview` - Locally previews the production build.

## 🎨 Project Structure

- `/src/components` - Reusable UI components (Navbar, Custom Cursor, etc.)
- `/src/components/sections` - Major page sections (Hero, About, Skills, Work, Contact)
- `/src/index.css` - Global styles, Tailwind directives, and custom utility classes.
- `/src/App.tsx` - Main application entry point integrating all sections.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
