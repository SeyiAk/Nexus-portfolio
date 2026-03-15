import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// 3D tilt card hook
function useTilt() {
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `perspective(900px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) translateZ(10px)`
    }

    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)'
        }
    }

    return { ref, handleMouseMove, handleMouseLeave }
}

interface TiltCardProps {
    icon: string
    title: string
    subtitle: string
    desc: string
    gradient: string
    delay: number
}

function TiltCard({ icon, title, subtitle, desc, gradient, delay }: TiltCardProps) {
    const { ref, handleMouseMove, handleMouseLeave } = useTilt()
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inView = useInView(wrapperRef, { once: true, margin: '-10% 0px' })

    return (
        <motion.div
            ref={wrapperRef}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
            <div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-cursor="hover"
                style={{ transition: 'transform 0.12s ease-out', willChange: 'transform', transformStyle: 'preserve-3d' }}
                className="relative h-full glass-strong rounded-2xl p-7 overflow-hidden group cursor-pointer"
            >
                {/* Gradient glow top */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{ background: gradient, mixBlendMode: 'screen' }}
                />
                {/* Border gradient */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: gradient, padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out' }}
                />

                <div className="relative z-10">
                    <div className="text-4xl mb-4">{icon}</div>
                    <h3 className="font-display font-bold text-xl text-white mb-1">{title}</h3>
                    <p className="text-nexus-cyan text-xs font-mono tracking-wider mb-3 uppercase">{subtitle}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>

                {/* Corner grid decoration */}
                <div
                    className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
                        backgroundSize: '12px 12px',
                    }}
                />
            </div>
        </motion.div>
    )
}

const cards = [
    {
        icon: '⚡',
        title: 'Performance Engineer',
        subtitle: 'Core Web Vitals Expert',
        desc: 'Obsessed with sub-100ms interactions, GPU-accelerated animations, and Lighthouse scores that make devs jealous.',
        gradient: 'radial-gradient(ellipse at top, rgba(124,58,237,0.2) 0%, transparent 70%)',
    },
    {
        icon: '🎨',
        title: 'Creative Technologist',
        subtitle: 'UI / Motion Design',
        desc: 'Where design systems meet generative art. Every pixel is intentional, every transition tells a story.',
        gradient: 'radial-gradient(ellipse at top, rgba(34,211,238,0.15) 0%, transparent 70%)',
    },
    {
        icon: '🧠',
        title: 'Systems Thinker',
        subtitle: 'Architecture & Scale',
        desc: 'Building modular, extensible front-ends that grow with your product and delight your team.',
        gradient: 'radial-gradient(ellipse at top, rgba(159,103,255,0.2) 0%, transparent 70%)',
    },
    {
        icon: '🛸',
        title: 'Experience Sculptor',
        subtitle: 'Interaction Design',
        desc: 'Cursor effects, scroll storytelling, micro-interactions — crafting the moments between moments.',
        gradient: 'radial-gradient(ellipse at top, rgba(34,211,238,0.18) 0%, transparent 70%)',
    },
]

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const titleInView = useInView(titleRef, { once: true, margin: '-10% 0px' })

    return (
        <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
            {/* Background elements */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
            />
            <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div ref={titleRef} className="mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={titleInView ? { opacity: 1 } : {}}
                        className="text-xs font-mono tracking-[0.3em] text-nexus-violet uppercase"
                    >
                        01 / About
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        className="font-display font-bold text-[clamp(2rem,5vw,4rem)] mt-3 text-white"
                    >
                        Built for the{' '}
                        <span className="text-gradient">extraordinary</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={titleInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-24 h-0.5 mx-auto mt-6"
                        style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)', transformOrigin: 'left center' }}
                    />
                </div>

                {/* Tilt cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.map((card, i) => (
                        <TiltCard key={card.title} {...card} delay={i * 0.12} />
                    ))}
                </div>

                {/* Stat bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="mt-16 grid grid-cols-3 gap-4"
                >
                    {[
                        { value: '5+', label: 'Years of Experience' },
                        { value: '40+', label: 'Projects Shipped' },
                        { value: '100K+', label: 'Users Reached' },
                    ].map((stat) => (
                        <div key={stat.label} className="glass rounded-xl p-6 text-center items-center justify-center flex flex-col">
                            <div className="font-display font-extrabold text-3xl text-gradient">{stat.value}</div>
                            <div className="text-white/40 text-xs mt-1 tracking-wider uppercase">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
