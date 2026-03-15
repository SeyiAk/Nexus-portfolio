import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

// Magnetic button hook
function useMagnetic(strength = 0.5) {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useSpring(0, { stiffness: 300, damping: 25 })
    const y = useSpring(0, { stiffness: 300, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * strength)
        y.set((e.clientY - cy) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return { ref, x, y, handleMouseMove, handleMouseLeave }
}

// Animated input field
function AnimatedInput({
    label,
    type = 'text',
    required = false,
}: {
    label: string
    type?: string
    required?: boolean
}) {
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    return (
        <div className="relative">
            <label
                className="absolute left-0 transition-all duration-300 pointer-events-none font-medium"
                style={{
                    top: focused || hasValue ? '-16px' : '12px',
                    fontSize: focused || hasValue ? '11px' : '14px',
                    color: focused ? '#22D3EE' : 'rgba(240,240,255,0.4)',
                    letterSpacing: focused || hasValue ? '0.1em' : '0',
                    textTransform: focused || hasValue ? 'uppercase' : 'none',
                }}
            >
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    required={required}
                    rows={4}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value) }}
                    onChange={(e) => setHasValue(!!e.target.value)}
                    className="w-full bg-transparent border-0 border-b text-white/80 text-sm pt-4 pb-2 outline-none resize-none transition-colors duration-300"
                    style={{ borderColor: focused ? '#22D3EE' : 'rgba(255,255,255,0.12)' }}
                />
            ) : (
                <input
                    type={type}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => { setFocused(false); setHasValue(!!e.target.value) }}
                    onChange={(e) => setHasValue(!!e.target.value)}
                    className="w-full bg-transparent border-0 border-b text-white/80 text-sm pt-4 pb-2 outline-none transition-colors duration-300"
                    style={{ borderColor: focused ? '#22D3EE' : 'rgba(255,255,255,0.12)' }}
                />
            )}
            {/* Animated underline glow */}
            <motion.div
                className="absolute bottom-0 left-0 h-px"
                animate={{ width: focused ? '100%' : '0%', opacity: focused ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: 'linear-gradient(90deg, #7C3AED, #22D3EE)', boxShadow: '0 0 8px rgba(34,211,238,0.5)' }}
            />
        </div>
    )
}

// Dot grid background
function DotGrid() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
                backgroundImage: 'radial-gradient(rgba(124,58,237,0.4) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }}
        />
    )
}

export default function Contact() {
    const { ref: btnRef, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(0.45)
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const titleInView = useInView(titleRef, { once: true })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-32 px-6 overflow-hidden bg-nexus-dark"
        >
            <DotGrid />

            {/* Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 70%)' }}
            />

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: text and CTA */}
                    <div ref={titleRef}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={titleInView ? { opacity: 1 } : {}}
                            className="text-xs font-mono tracking-[0.3em] text-nexus-violet uppercase"
                        >
                            04 / Contact
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={titleInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] mt-3 text-white leading-tight"
                        >
                            Let's build
                            <br />
                            <span className="text-gradient">something wild</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={titleInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mt-6 text-white/40 leading-relaxed max-w-sm"
                        >
                            Whether it's a product that needs to feel alive, an interaction
                            that surprises, or a system that scales — I'm in.
                        </motion.p>

                        {/* Magnetic email button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={titleInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mt-10 inline-block"
                        >
                            <motion.button
                                ref={btnRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{ x, y }}
                                data-cursor="hover"
                                className="relative group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm overflow-hidden"
                                whileTap={{ scale: 0.97 }}
                            >
                                {/* Background */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: 'linear-gradient(135deg, #7C3AED, #22D3EE)' }}
                                />
                                {/* Shimmer */}
                                <div className="btn-shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

                                <span className="relative z-10">hello@nexus.dev</span>
                                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 16 16">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.button>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={titleInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.7 }}
                            className="flex gap-4 mt-8"
                        >
                            {[
                                { label: 'GitHub', href: '#' },
                                { label: 'Twitter', href: '#' },
                                { label: 'LinkedIn', href: '#' },
                                { label: 'Dribbble', href: '#' },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    data-cursor="hover"
                                    className="text-xs font-mono text-white/30 hover:text-nexus-cyan transition-colors duration-200 tracking-wider"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={titleInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="glass-strong rounded-2xl p-8"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center gap-4"
                            >
                                <div className="text-5xl">🚀</div>
                                <h3 className="font-display font-bold text-xl text-gradient">Message sent!</h3>
                                <p className="text-white/40 text-sm">I'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <AnimatedInput label="Your Name" required />
                                <AnimatedInput label="Email Address" type="email" required />
                                <AnimatedInput label="Message" type="textarea" required />
                                <button
                                    type="submit"
                                    data-cursor="hover"
                                    className="w-full py-3.5 rounded-full text-sm font-semibold glass border border-nexus-violet/40 text-white hover:border-nexus-cyan/60 hover:text-nexus-cyan transition-all duration-300 group"
                                >
                                    <span className="group-hover:tracking-wider transition-all duration-300">Send Message →</span>
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20 font-mono"
                >
                    <span>© {new Date().getFullYear()} NEXUS. Crafted with precision.</span>
                    <span className="text-gradient opacity-60">React · TypeScript · Three.js · GSAP</span>
                </motion.div>
            </div>
        </section>
    )
}
