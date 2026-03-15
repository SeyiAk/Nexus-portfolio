import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
    id: number
    title: string
    category: string
    tech: string[]
    year: string
    color: string
    accent: string
    emoji: string
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Aurora OS',
        category: 'Product Design System',
        tech: ['React', 'TypeScript', 'Tailwind'],
        year: '2025',
        color: '#0f0524',
        accent: '#7C3AED',
        emoji: '🌌',
    },
    {
        id: 2,
        title: 'Flux AI',
        category: 'AI Dashboard & Analytics',
        tech: ['Next.js', 'D3.js', 'Python'],
        year: '2025',
        color: '#02131a',
        accent: '#22D3EE',
        emoji: '⚡',
    },
    {
        id: 3,
        title: 'Orbit Commerce',
        category: 'E-Commerce Platform',
        tech: ['Remix', 'Shopify', 'GSAP'],
        year: '2024',
        color: '#12051a',
        accent: '#9F67FF',
        emoji: '🛒',
    },
    {
        id: 4,
        title: 'Stellar Map',
        category: 'Data Visualization',
        tech: ['Three.js', 'WebGL', 'R3F'],
        year: '2024',
        color: '#031018',
        accent: '#67E8F9',
        emoji: '🌍',
    },
    {
        id: 5,
        title: 'Echo Studio',
        category: 'Creative Agency Site',
        tech: ['Framer', 'GSAP', 'WebGL'],
        year: '2024',
        color: '#160520',
        accent: '#C084FC',
        emoji: '🎬',
    },
]

function ProjectCard({ project }: { project: Project }) {
    const [hovered, setHovered] = [false, () => { }]

    return (
        <motion.div
            className="relative flex-none w-[320px] sm:w-[380px] h-[320px] rounded-2xl overflow-hidden cursor-pointer group"
            style={{ background: project.color, border: `1px solid ${project.accent}22` }}
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            data-cursor="hover"
        >
            {/* Gradient overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accent}25 0%, transparent 65%)` }}
            />

            {/* Top accent line */}
            <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
            />

            {/* Emoji / Icon */}
            <div className="absolute top-8 right-8 text-5xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                {project.emoji}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="mb-3">
                    <span
                        className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded"
                        style={{ color: project.accent, background: `${project.accent}18` }}
                    >
                        {project.year}
                    </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-1">{project.title}</h3>
                <p className="text-white/50 text-sm mb-5">{project.category}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-1 rounded-full"
                            style={{ color: `${project.accent}CC`, background: `${project.accent}12`, border: `1px solid ${project.accent}30` }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Arrow indicator */}
            <motion.div
                className="absolute top-8 left-8 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: `${project.accent}25`, border: `1px solid ${project.accent}50` }}
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </motion.div>
    )
}

export default function Work() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const titleInView = useInView(titleRef, { once: true })

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            if (!track) return

            const totalWidth = track.scrollWidth - track.parentElement!.clientWidth

            gsap.to(track, {
                x: () => -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="work" ref={sectionRef} className="relative overflow-hidden bg-nexus-black">
            <div className="h-screen flex flex-col justify-center px-8 sm:px-16">
                {/* Header */}
                <div ref={titleRef} className="mb-12">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={titleInView ? { opacity: 1 } : {}}
                        className="text-xs font-mono tracking-[0.3em] text-nexus-violet uppercase"
                    >
                        02 / Selected Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        className="font-display font-bold text-[clamp(2rem,5vw,4rem)] mt-3 text-white"
                    >
                        Things I've{' '}
                        <span className="text-gradient">built</span>
                    </motion.h2>
                </div>

                {/* Horizontal track */}
                <div className="overflow-hidden">
                    <div ref={trackRef} className="flex gap-6 w-max">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                        {/* End spacer */}
                        <div className="w-16 flex-none" />
                    </div>
                </div>

                {/* Drag hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={titleInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-white/25 text-xs font-mono tracking-widest"
                >
                    ←  SCROLL TO EXPLORE  →
                </motion.p>
            </div>
        </section>
    )
}
