import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
]

/* ── Tab-scrub hook ──────────────────────────────── */
function useTabScrub(
    containerRef: React.RefObject<HTMLElement | null>,
    onScrub: (id: string) => void,
) {
    const [isScrubbing, setIsScrubbing] = useState(false)
    const lastHitId = useRef<string | null>(null)

    const hitTest = useCallback((clientX: number, clientY: number) => {
        const els = document.elementsFromPoint(clientX, clientY)
        for (const el of els) {
            const navId =
                (el as HTMLElement).dataset?.navId ??
                (el.closest('[data-nav-id]') as HTMLElement | null)?.dataset?.navId
            if (navId) {
                if (navId !== lastHitId.current) {
                    lastHitId.current = navId
                    onScrub(navId)
                    // Haptic feedback on mobile if supported
                    if (navigator.vibrate) navigator.vibrate(10)
                }
                return
            }
        }
    }, [onScrub])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        /* ── Start ────────────────────────────── */
        const onPointerDown = (e: PointerEvent) => {
            // Only start if the initial target is a nav item
            const target = e.target as HTMLElement
            if (!target.closest('[data-nav-id]')) return

            setIsScrubbing(true)
            lastHitId.current = null
            container.setPointerCapture(e.pointerId)
            hitTest(e.clientX, e.clientY)
        }

        /* ── Move ─────────────────────────────── */
        const onPointerMove = (e: PointerEvent) => {
            if (!container.hasPointerCapture(e.pointerId)) return
            e.preventDefault()
            hitTest(e.clientX, e.clientY)
        }

        /* ── End ──────────────────────────────── */
        const onPointerEnd = (e: PointerEvent) => {
            if (!container.hasPointerCapture(e.pointerId)) return
            container.releasePointerCapture(e.pointerId)
            setIsScrubbing(false)
            lastHitId.current = null
        }

        container.addEventListener('pointerdown', onPointerDown)
        container.addEventListener('pointermove', onPointerMove)
        container.addEventListener('pointerup', onPointerEnd)
        container.addEventListener('pointercancel', onPointerEnd)

        return () => {
            container.removeEventListener('pointerdown', onPointerDown)
            container.removeEventListener('pointermove', onPointerMove)
            container.removeEventListener('pointerup', onPointerEnd)
            container.removeEventListener('pointercancel', onPointerEnd)
        }
    }, [containerRef, hitTest])

    return isScrubbing
}

/* ── Navbar ──────────────────────────────────────── */
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const lastScrollY = useRef(0)
    const scrubContainerRef = useRef<HTMLDivElement>(null)
    const isScrubRef = useRef(false)

    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    const handleScrub = useCallback((id: string) => {
        setActiveSection(id)
        scrollTo(id)
    }, [scrollTo])

    const isScrubbing = useTabScrub(scrubContainerRef, handleScrub)

    // Keep a ref in sync so the IntersectionObserver callback can read it
    useEffect(() => {
        isScrubRef.current = isScrubbing
    }, [isScrubbing])

    /* ── Scroll hide/show ─────────────────── */
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            setScrolled(currentY > 80)
            lastScrollY.current = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /* ── Intersection observer ────────────── */
    useEffect(() => {
        const sections = navLinks
            .map((l) => document.getElementById(l.id))
            .filter(Boolean) as HTMLElement[]

        const observer = new IntersectionObserver(
            (entries) => {
                // Skip observer updates while scrubbing to avoid fighting
                if (isScrubRef.current) return
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id)
                })
            },
            { threshold: 0.4, rootMargin: '-10% 0px -50% 0px' },
        )

        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    return (
        <motion.nav
            className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <motion.div
                ref={scrubContainerRef}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-full${isScrubbing ? ' scrubbing' : ''}`}
                animate={{
                    backgroundColor: scrolled
                        ? 'rgba(5, 5, 8, 0.85)'
                        : 'rgba(255,255,255,0.04)',
                    borderColor: scrolled
                        ? 'rgba(124, 58, 237, 0.3)'
                        : 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    scale: isScrubbing ? 1.04 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ border: '1px solid', touchAction: 'none' }}
            >
                {/* Logo */}
                <button
                    onClick={() => scrollTo('hero')}
                    className="mr-3 font-display font-bold text-sm tracking-widest text-gradient"
                    data-cursor="hover"
                >
                    NEXUS
                </button>

                {/* Desktop links */}
                <div className="hidden sm:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            data-nav-id={link.id}
                            onClick={() => {
                                setActiveSection(link.id)
                                scrollTo(link.id)
                            }}
                            data-cursor="hover"
                            className="relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                            style={{
                                color:
                                    activeSection === link.id
                                        ? '#22D3EE'
                                        : 'rgba(240,240,255,0.5)',
                            }}
                        >
                            {activeSection === link.id && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'rgba(34, 211, 238, 0.1)',
                                        border: '1px solid rgba(34,211,238,0.25)',
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 35,
                                    }}
                                />
                            )}
                            <span className="relative z-10">{link.label}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile dot indicators */}
                <div className="flex sm:hidden items-center gap-1.5 ml-2">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            data-nav-id={link.id}
                            onClick={() => {
                                setActiveSection(link.id)
                                scrollTo(link.id)
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                activeSection === link.id
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
