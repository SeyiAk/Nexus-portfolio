import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <div className="bg-nexus-black min-h-screen">
      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
