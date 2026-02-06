import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Float, Sparkles, Cloud, useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'
import logoReflect from "../../assets/images/restaurent.jpg"

const FloatingCrystal = ({ position, color, speed, rotationSpeed, scale }: any) => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * rotationSpeed
            meshRef.current.rotation.y += delta * rotationSpeed * 0.5
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
        }
    })

    return (
        <Float speed={speed} rotationIntensity={rotationSpeed} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={0.5}
                    ior={1.2}
                    clearcoat={0.8}
                    attenuationDistance={1}
                    attenuationColor="#ffffff"
                />
            </mesh>
        </Float>
    )
}

interface ThreeBackgroundProps {
    showCrystal?: boolean;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ showCrystal = true }) => {
    const scroll = useScroll()
    const groupRef = useRef<THREE.Group>(null)

    // Load the texture for the environment
    const texture = useTexture(logoReflect)
    texture.mapping = THREE.EquirectangularReflectionMapping

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotate the entire group based on scroll
            // Check if scroll exists (it might be null during initial render or if outside ScrollControls)
            const scrollOffset = scroll ? scroll.offset : 0;

            groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, -scrollOffset * Math.PI * 2, 4, delta)
            groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, scrollOffset * 5, 4, delta)
        }
    })

    return (
        <>
            {/* Bubbles - Locked in place, not rotating with the group */}
            <Sparkles count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
            <Sparkles count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />

            <group ref={groupRef}>
                {/* Subtle Cloud/Fog for depth */}
                <Cloud opacity={0.1} speed={0.1} width={20} depth={5} segments={10} position={[0, -5, -10]} color="#aaccff" />

                {/* Main Hero Crystal */}
                {showCrystal && (
                    <FloatingCrystal position={[0, 0, 0]} color="#00aaff" speed={2} rotationSpeed={0.5} scale={1.5} />
                )}

                {/* Background Crystals Removed */}

                {/* Lighting */}
                <ambientLight intensity={0.5} color="#001e36" />
                <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

                {/* Environment for reflections */}
                <Environment map={texture} blur={1} />
            </group>
        </>
    )
}

export default ThreeBackground
