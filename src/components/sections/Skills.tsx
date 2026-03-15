import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Skill {
    name: string
    icon: string
    level: number
    color: string
}

const skills: Skill[] = [
    { name: 'React', icon: '⚛️', level: 98, color: '#61DAFB' },
    { name: 'TypeScript', icon: '🔷', level: 95, color: '#3178C6' },
    { name: 'Three.js', icon: '🌐', level: 82, color: '#22D3EE' },
    { name: 'GSAP', icon: '🎞', level: 88, color: '#88CE02' },
    { name: 'Next.js', icon: '▲', level: 92, color: '#FFFFFF' },
    { name: 'Figma', icon: '🎨', level: 86, color: '#F24E1E' },
    { name: 'Node.js', icon: '💚', level: 85, color: '#339933' },
    { name: 'WebGL', icon: '🔮', level: 74, color: '#9F67FF' },
]

// SVG orbital ring with Framer Motion
type OrbitalRingProps = {
    radius: number
    duration: number
    reverse?: boolean
    skill: Skill
    angle: number
    inView: boolean
    delay: number
}

function OrbitalDot({ radius, duration, reverse, skill, angle, inView, delay }: OrbitalRingProps) {
    const rad = (angle * Math.PI) / 180
    const x = Math.cos(rad) * radius
    const y = Math.sin(rad) * radius * 0.45 // flatten to ellipse

    return (
        <>
            {/* Ring arc (thin circle) */}
            <motion.circle
                cx="0"
                cy="0"
                r={radius}
                fill="none"
                stroke="rgba(124,58,237,0.12)"
                strokeWidth="1"
                strokeDasharray="4 6"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: delay + 0.2, duration: 0.6 }}
            />

            {/* Orbiting skill dot */}
            <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: delay + 0.5, type: 'spring', stiffness: 200 }}
            >
                <motion.g
                    animate={inView ? { rotate: reverse ? -360 : 360 } : {}}
                    transition={{ duration, repeat: Infinity, ease: 'linear' }}
                    style={{ originX: 0, originY: 0 }}
                >
                    <g transform={`translate(${x}, ${y})`}>
                        <motion.circle r="20" fill="rgba(10,10,18,0.95)" stroke={skill.color} strokeWidth="1.5" opacity="0.9" />
                        <foreignObject x="-10" y="-12" width="20" height="20">
                            <div style={{ fontSize: '14px', textAlign: 'center', lineHeight: 1 }}>{skill.icon}</div>
                        </foreignObject>
                        <text y="34" textAnchor="middle" fill="rgba(240,240,255,0.55)" fontSize="9" fontFamily="Inter" letterSpacing="0.05em">
                            {skill.name}
                        </text>
                    </g>
                </motion.g>
            </motion.g>
        </>
    )
}

function ProgressBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
    return (
        <div>
            <div className="flex justify-between mb-1.5">
                <span className="text-sm text-white/70 font-medium">{skill.icon} {skill.name}</span>
                <span className="text-xs font-mono" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay, duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                />
            </div>
        </div>
    )
}

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const orbitRef = useRef<HTMLDivElement>(null)
    const titleInView = useInView(titleRef, { once: true })
    const orbitInView = useInView(orbitRef, { once: true, margin: '-15% 0px' })

    return (
        <section id="skills" ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-nexus-black">
            {/* BG accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)' }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <div ref={titleRef} className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={titleInView ? { opacity: 1 } : {}}
                        className="text-xs font-mono tracking-[0.3em] text-nexus-violet uppercase"
                    >
                        03 / Skills
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        className="font-display font-bold text-[clamp(2rem,5vw,4rem)] mt-3 text-white"
                    >
                        Tools of the{' '}
                        <span className="text-gradient">craft</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Orbital SVG - hidden on mobile, shown on lg+ */}
                    <div ref={orbitRef} className="flex justify-center items-center">
                        <div className="relative w-[480px] h-[360px]">
                            <svg
                                viewBox="-240 -180 480 360"
                                className="w-full h-full overflow-visible"
                            >
                                {/* Central core */}
                                <motion.circle
                                    cx="0" cy="0" r="40"
                                    fill="url(#coreGrad)"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={orbitInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                                />
                                <motion.circle
                                    cx="0" cy="0" r="60"
                                    fill="none"
                                    stroke="rgba(124,58,237,0.2)"
                                    strokeWidth="1"
                                    initial={{ opacity: 0 }}
                                    animate={orbitInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.3 }}
                                />
                                <motion.text
                                    y="5"
                                    textAnchor="middle"
                                    fill="#F0F0FF"
                                    fontSize="10"
                                    fontFamily="Space Grotesk"
                                    fontWeight="700"
                                    letterSpacing="0.15em"
                                    initial={{ opacity: 0 }}
                                    animate={orbitInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.4 }}
                                >
                                    STACK
                                </motion.text>

                                {/* 3 orbital rings with skills distributed */}
                                {[
                                    { radius: 100, duration: 18, reverse: false, skillStart: 0, count: 3 },
                                    { radius: 155, duration: 28, reverse: true, skillStart: 3, count: 3 },
                                    { radius: 210, duration: 40, reverse: false, skillStart: 6, count: 2 },
                                ].map((ring, ri) =>
                                    Array.from({ length: ring.count }).map((_, si) => {
                                        const skillIdx = ring.skillStart + si
                                        const angle = (360 / ring.count) * si - 90
                                        return (
                                            <OrbitalDot
                                                key={`${ri}-${si}`}
                                                radius={ring.radius}
                                                duration={ring.duration}
                                                reverse={ring.reverse}
                                                skill={skills[skillIdx]}
                                                angle={angle}
                                                inView={orbitInView}
                                                delay={0.3 + ri * 0.15 + si * 0.08}
                                            />
                                        )
                                    })
                                )}

                                <defs>
                                    <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#9F67FF" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-5">
                        {skills.map((skill, i) => (
                            <ProgressBar
                                key={skill.name}
                                skill={skill}
                                inView={orbitInView}
                                delay={i * 0.08}
                            />
                        ))}
                    </div>
                </div>

                {/* Tool tags */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mt-16 flex flex-wrap justify-center gap-3"
                >
                    {['Vite', 'Tailwind', 'Zustand', 'React Query', 'Prisma', 'Docker', 'GitHub Actions', 'Vercel', 'Storybook', 'Playwright'].map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-2 glass rounded-full text-xs font-mono text-white/50 border border-white/6 hover:border-nexus-violet/40 hover:text-nexus-cyan-light transition-all duration-300 cursor-pointer"
                            data-cursor="hover"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
