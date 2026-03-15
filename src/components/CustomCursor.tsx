// import { useEffect, useRef, useState } from 'react'
// import { motion, useSpring } from 'framer-motion'

// export default function CustomCursor() {
//     const [isVisible, setIsVisible] = useState(false)
//     const [isHovering, setIsHovering] = useState(false)
//     const [isPointer, setIsPointer] = useState(false)

//     const cursorX = useSpring(0, { stiffness: 400, damping: 35 })
//     const cursorY = useSpring(0, { stiffness: 400, damping: 35 })

//     const dotX = useSpring(0, { stiffness: 700, damping: 40 })
//     const dotY = useSpring(0, { stiffness: 700, damping: 40 })

//     useEffect(() => {
//         // Only show custom cursor on non-touch devices
//         if (window.matchMedia('(hover: none)').matches) return

//         const handleMouseMove = (e: MouseEvent) => {
//             cursorX.set(e.clientX)
//             cursorY.set(e.clientY)
//             dotX.set(e.clientX)
//             dotY.set(e.clientY)
//             if (!isVisible) setIsVisible(true)
//         }

//         const handleMouseOver = (e: MouseEvent) => {
//             const target = e.target as Element
//             const isInteractive = target.closest('a, button, [data-cursor="hover"], input, textarea')
//             setIsHovering(!!isInteractive)
//             const style = window.getComputedStyle(target)
//             setIsPointer(style.cursor === 'pointer')
//         }

//         const handleMouseLeave = () => setIsVisible(false)
//         const handleMouseEnter = () => setIsVisible(true)

//         window.addEventListener('mousemove', handleMouseMove)
//         window.addEventListener('mouseover', handleMouseOver)
//         document.addEventListener('mouseleave', handleMouseLeave)
//         document.addEventListener('mouseenter', handleMouseEnter)

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove)
//             window.removeEventListener('mouseover', handleMouseOver)
//             document.removeEventListener('mouseleave', handleMouseLeave)
//             document.removeEventListener('mouseenter', handleMouseEnter)
//         }
//     }, [isVisible, cursorX, cursorY, dotX, dotY])

//     if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
//         return null
//     }

//     return (
//         <>
//             {/* Outer glow orb */}
//             <motion.div
//                 className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
//                 style={{
//                     x: cursorX,
//                     y: cursorY,
//                     translateX: '-50%',
//                     translateY: '-50%',
//                 }}
//                 animate={{
//                     width: isHovering ? 60 : 36,
//                     height: isHovering ? 60 : 36,
//                     opacity: isVisible ? 1 : 0,
//                     backgroundColor: isHovering
//                         ? 'rgba(34, 211, 238, 0.15)'
//                         : 'rgba(124, 58, 237, 0.12)',
//                     borderColor: isHovering
//                         ? 'rgba(34, 211, 238, 0.6)'
//                         : 'rgba(124, 58, 237, 0.5)',
//                 }}
//                 transition={{ duration: 0.2, ease: 'easeOut' }}
//                 style={{
//                     x: cursorX,
//                     y: cursorY,
//                     translateX: '-50%',
//                     translateY: '-50%',
//                     border: '1px solid',
//                     mixBlendMode: 'screen',
//                 }}
//             />
//             {/* Inner dot */}
//             <motion.div
//                 className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
//                 style={{
//                     x: dotX,
//                     y: dotY,
//                     translateX: '-50%',
//                     translateY: '-50%',
//                 }}
//                 animate={{
//                     width: isPointer ? 6 : 4,
//                     height: isPointer ? 6 : 4,
//                     opacity: isVisible ? (isHovering ? 0 : 1) : 0,
//                     backgroundColor: '#22D3EE',
//                 }}
//                 transition={{ duration: 0.1 }}
//             />
//         </>
//     )
// }
