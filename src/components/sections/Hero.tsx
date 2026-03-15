import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '../ParticleBackground'

// Text scramble effect
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

function useTextScramble(text: string, play: boolean) {
    const [display, setDisplay] = useState(text)
    const frameRef = useRef(0)
    const iterRef = useRef(0)

    useEffect(() => {
        if (!play) return
        iterRef.current = 0
        clearInterval(frameRef.current)
        frameRef.current = window.setInterval(() => {
            setDisplay(
                text
                    .split('')
                    .map((char, idx) => {
                        if (char === ' ') return ' '
                        if (idx < iterRef.current) return text[idx]
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    .join('')
            )
            iterRef.current += 0.4
            if (iterRef.current >= text.length) {
                clearInterval(frameRef.current)
                setDisplay(text)
            }
        }, 30)
        return () => clearInterval(frameRef.current)
    }, [play, text])

    return display
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
}

const letterVariant = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
}

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`flex flex-wrap ${className}`}
            style={{ perspective: 800 }}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    variants={letterVariant}
                    className="inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.div>
    )
}

function StatusBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-nexus-violet/30 text-xs font-mono text-nexus-cyan-light mb-8"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexus-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nexus-cyan" />
            </span>
            SYSTEM ONLINE — v2.0.26
        </motion.div>
    )
}

function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-xs text-white/30 font-mono tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-nexus-violet/60 to-transparent relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full h-4 bg-nexus-cyan"
                    animate={{ y: [0, 48] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn' }}
                />
            </div>
        </motion.div>
    )
}

export default function Hero() {
    const [scramblePlayed, setScramblePlayed] = useState(false)
    const subtitleDisplay = useTextScramble('CRAFTING DIGITAL EXPERIENCES', scramblePlayed)

    useEffect(() => {
        const t = setTimeout(() => setScramblePlayed(true), 1400)
        return () => clearTimeout(t)
    }, [])

    return (
        <section
            id="hero"
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-nexus-black"
        >
            {/* Three.js Background */}
            <ParticleBackground />

            {/* Radial gradient overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, #050508 100%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
                <StatusBadge />

                {/* Main headline — letter stagger */}
                <div className="overflow-hidden mb-3">
                    <AnimatedHeadline
                        text="NEXUS"
                        className="font-display font-extrabold text-[clamp(5rem,16vw,14rem)] leading-none tracking-tighter text-gradient"
                    />
                </div>

                {/* Subtitle — text scramble */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="font-mono text-[clamp(0.65rem,1.8vw,1rem)] tracking-[0.3em] text-nexus-cyan-light/80 mb-4"
                >
                    {subtitleDisplay}
                </motion.p>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="text-white/40 text-sm max-w-md mb-10 leading-relaxed"
                >
                    An interactive canvas where design meets code.
                    <br />
                    Frontend engineering at its most expressive.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <a
                        href="#work"
                        data-cursor="hover"
                        onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="relative group px-7 py-3.5 rounded-full font-semibold text-sm overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #7C3AED, #22D3EE)',
                        }}
                    >
                        <span className="relative z-10">View My Work</span>
                        {/* Shimmer overlay */}
                        <span className="btn-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                        href="#about"
                        data-cursor="hover"
                        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="px-7 py-3.5 rounded-full font-semibold text-sm glass border border-nexus-border text-white/70 hover:text-white hover:border-nexus-violet/50 transition-all duration-300"
                    >
                        Learn More
                    </a>
                </motion.div>
            </div>

            {/* Floating stat chips */}
            {[
                { label: 'Projects', value: '40+', pos: 'top-[22%] left-[6%] sm:left-[12%]' },
                { label: 'Experience', value: '5 Yrs', pos: 'top-[22%] right-[6%] sm:right-[12%]' },
                { label: 'Stack', value: 'React', pos: 'bottom-[18%] left-[6%] sm:left-[12%]' },
                { label: 'Open to work', value: '✓', pos: 'bottom-[18%] right-[6%] sm:right-[12%]' },
            ].map((chip, i) => (
                <motion.div
                    key={chip.label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.4 + i * 0.1, duration: 0.5, type: 'spring' }}
                    className={`absolute hidden sm:flex flex-col items-center glass border border-nexus-border rounded-xl px-4 py-2.5 ${chip.pos}`}
                    style={{ animation: `float ${5 + i}s ease-in-out ${i * 0.8}s infinite` }}
                >
                    <span className="text-nexus-cyan font-display font-bold text-lg leading-none">{chip.value}</span>
                    <span className="text-white/40 text-[10px] tracking-widest uppercase mt-0.5">{chip.label}</span>
                </motion.div>
            ))}

            <ScrollIndicator />

            {/* Corner decorators */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-nexus-violet/30" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-nexus-violet/30" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-nexus-cyan/20" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-nexus-cyan/20" />
        </section>
    )
}
