import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleCloud() {
    const pointsRef = useRef<THREE.Points>(null!)
    const { size } = useThree()
    const mouse = useRef({ x: 0, y: 0 })
    const targetRotation = useRef({ x: 0, y: 0 })

    const count = 3500
    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            // Distribute in a sphere-ish volume
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 2.5 + Math.pow(Math.random(), 0.5) * 5

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
            positions[i * 3 + 2] = r * Math.cos(phi)

            // Color gradient: violet → cyan
            const t = Math.random()
            colors[i * 3] = 0.48 + t * (-0.35) // R
            colors[i * 3 + 1] = 0.23 + t * 0.59 // G
            colors[i * 3 + 2] = 0.93 + t * 0.0  // B

            sizes[i] = Math.random() * 2 + 0.5
        }
        return { positions, colors, sizes }
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state, delta) => {
        if (!pointsRef.current) return

        // Gentle auto-rotation
        targetRotation.current.y += delta * 0.04
        targetRotation.current.x = mouse.current.y * 0.3

        // Lerp toward target
        pointsRef.current.rotation.y += (targetRotation.current.y + mouse.current.x * 0.4 - pointsRef.current.rotation.y) * 0.02
        pointsRef.current.rotation.x += (targetRotation.current.x - pointsRef.current.rotation.x) * 0.03
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                vertexColors
                transparent
                opacity={0.85}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    )
}

function GridLines() {
    const gridRef = useRef<THREE.GridHelper>(null!)

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2
        }
    })

    return (
        <gridHelper
            ref={gridRef}
            args={[40, 40, '#7C3AED', '#1a0a2e']}
            position={[0, -3, 0]}
            rotation={[0, 0, 0]}
        />
    )
}

export default function ParticleBackground() {
    return (
        <div className="three-canvas absolute inset-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 65 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.5} />
                <ParticleCloud />
                <GridLines />
                <fog attach="fog" args={['#050508', 10, 25]} />
            </Canvas>
        </div>
    )
}
