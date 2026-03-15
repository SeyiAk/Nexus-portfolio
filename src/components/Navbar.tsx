import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const lastScrollY = useRef(0)

    const navLinks = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'work', label: 'Work' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            setScrolled(currentY > 80)
            setHidden(currentY > lastScrollY.current && currentY > 200)
            lastScrollY.current = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id)
                })
            },
            { threshold: 0.4, rootMargin: '-10% 0px -50% 0px' }
        )

        sections.forEach(s => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.nav
            className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: hidden ? -120 : 0,
                opacity: hidden ? 0 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <motion.div
                className="flex items-center gap-1 px-4 py-2.5 rounded-full"
                animate={{
                    backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'rgba(255,255,255,0.04)',
                    borderColor: scrolled ? 'rgba(124, 58, 237, 0.3)' : 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                }}
                transition={{ duration: 0.3 }}
                style={{ border: '1px solid' }}
            >
                {/* Logo */}
                <button
                    onClick={() => scrollTo('hero')}
                    className="mr-3 font-display font-bold text-sm tracking-widest text-gradient"
                    data-cursor="hover"
                >
                    NEXUS
                </button>

                <div className="hidden sm:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            data-cursor="hover"
                            className="relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                            style={{
                                color: activeSection === link.id ? '#22D3EE' : 'rgba(240,240,255,0.5)',
                            }}
                        >
                            {activeSection === link.id && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34,211,238,0.25)' }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                />
                            )}
                            <span className="relative z-10">{link.label}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile: just dot indicator */}
                <div className="flex sm:hidden items-center gap-1.5 ml-2">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === link.id
                                    ? 'bg-nexus-cyan w-4'
                                    : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    )
}
