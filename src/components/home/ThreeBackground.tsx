import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, Cloud, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* Floating Spice Particle — warm-toned, organic shapes drifting gently */
const FloatingSpice = ({ position, color, speed, scale }: {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialY = position[1]

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.z += delta * 0.1
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

/* Warm steam wisps rising gently */
const SteamWisp = ({ position, delay }: {
  position: [number, number, number];
  delay: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = (state.clock.elapsedTime + delay) * 0.3
      meshRef.current.position.y = position[1] + (t % 4) * 1.5
      meshRef.current.position.x = position[0] + Math.sin(t * 2) * 0.3
      meshRef.current.scale.setScalar(0.5 + Math.sin(t) * 0.2)
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = Math.max(0, 0.08 - ((t % 4) / 4) * 0.08)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 8, 8]} />
      <meshStandardMaterial
        color="#C5A059"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  )
}

const ThreeBackground: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const isMobile = viewport.width < 6

  // Generate spice positions once
  const spiceParticles = useMemo(() => {
    const particles: { pos: [number, number, number]; color: string; speed: number; scale: number }[] = []
    const colors = ['#C5A059', '#8E6F3E', '#E2C68E', '#D4AF37', '#C5A059', '#FFD166']
    const count = isMobile ? 6 : 12
    for (let i = 0; i < count; i++) {
      particles.push({
        pos: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2
        ],
        color: colors[i % colors.length],
        speed: 0.5 + Math.random() * 1.5,
        scale: 0.6 + Math.random() * 1.2,
      })
    }
    return particles
  }, [isMobile])

  // Gentle continuous rotation instead of scroll-based
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <>
      {/* Warm golden sparkles — like floating embers */}
      <Sparkles
        count={isMobile ? 80 : 150}
        scale={15}
        size={3}
        speed={0.4}
        opacity={0.5}
        color="#C5A059"
      />
      <Sparkles
        count={isMobile ? 40 : 80}
        scale={12}
        size={2}
        speed={0.3}
        opacity={0.3}
        color="#E2C68E"
      />
      {!isMobile && (
        <Sparkles
          count={60}
          scale={10}
          size={6}
          speed={0.15}
          opacity={0.15}
          color="#FFF3E0"
        />
      )}

      <group ref={groupRef}>
        {/* Warm atmospheric fog */}
        <Cloud
          opacity={0.08}
          speed={0.08}
          segments={10}
          position={[0, -4, -8]}
          color="#E2C68E"
        />
        <Cloud
          opacity={0.05}
          speed={0.05}
          segments={8}
          position={[3, 2, -12]}
          color="#8E6F3E"
        />

        {/* Floating spice particles */}
        {spiceParticles.map((p, i) => (
          <FloatingSpice key={i} position={p.pos} color={p.color} speed={p.speed} scale={p.scale} />
        ))}

        {/* Rising steam wisps */}
        {!isMobile && (
          <>
            <SteamWisp position={[-2, -3, -3]} delay={0} />
            <SteamWisp position={[1, -3, -5]} delay={2} />
            <SteamWisp position={[3, -3, -2]} delay={4} />
          </>
        )}

        {/* Warm restaurant lighting */}
        <ambientLight intensity={0.4} color="#05070A" />
        <spotLight
          position={[0, 15, 5]}
          intensity={1.5}
          angle={0.6}
          penumbra={1}
          color="#C5A059"
        />
        <pointLight position={[-5, 8, 5]} intensity={0.6} color="#E2C68E" />
        <pointLight position={[5, 5, -5]} intensity={0.4} color="#FFD166" />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#8E6F3E" />

        {/* Environment for reflections */}
        <Environment preset="city" blur={1} />
      </group>
    </>
  )
}

export default ThreeBackground
