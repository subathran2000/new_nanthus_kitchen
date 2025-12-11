import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Sparkles, Caustics, Environment, Cloud } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import NeumorphicClock from './NeumorphicClock'

// --- 3D Components ---

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
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={2}
          ior={1.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  )
}

const SceneContent = () => {
  const scroll = useScroll()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire group based on scroll
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, -scroll.offset * Math.PI * 2, 4, delta)
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, scroll.offset * 5, 4, delta)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Caustics Effect */}
      <Caustics
        color="#00ffff"
        position={[0, -5, 0]}
        lightSource={[5, 5, -10]}
        worldRadius={10}
        ior={1.1}
        intensity={0.2}
      >
      </Caustics>

      {/* Bubbles */}
      <Sparkles count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
      <Sparkles count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />

      {/* Subtle Cloud/Fog for depth */}
      <Cloud opacity={0.1} speed={0.1} width={20} depth={5} segments={10} position={[0, -5, -10]} color="#aaccff" />

      {/* Main Hero Crystal */}
      <FloatingCrystal position={[0, 0, 0]} color="#00aaff" speed={2} rotationSpeed={0.5} scale={1.5} />

      {/* Background Crystals */}
      <FloatingCrystal position={[-3, 2, -5]} color="#00ffff" speed={1.5} rotationSpeed={0.3} scale={0.8} />
      <FloatingCrystal position={[3, -2, -4]} color="#0088ff" speed={1.8} rotationSpeed={0.4} scale={0.7} />
      <FloatingCrystal position={[-2, -3, -2]} color="#4400ff" speed={1.2} rotationSpeed={0.2} scale={0.5} />
      <FloatingCrystal position={[2, 3, -3]} color="#00ffaa" speed={1.6} rotationSpeed={0.6} scale={0.6} />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#001e36" />
      <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" castShadow />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

      {/* Environment for reflections */}
      <Environment preset="city" blur={1} />
    </group>
  )
}

// --- HTML Content ---

const Section = ({ children, style }: any) => {
  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
        ...style
      }}
    >
      {children}
    </section>
  )
}

const Landpage = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#001e36', overflow: 'hidden' }}>
      {/* Floating Clock */}
      <NeumorphicClock />

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <color attach="background" args={['#001e36']} />
        <fog attach="fog" args={['#001e36', 5, 25]} />

        <ScrollControls pages={5} damping={0.2}>
          <SceneContent />

          <Scroll html style={{ width: '100%' }}>
            <Section>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 style={{ fontSize: '6rem', margin: 0, color: '#fff', textAlign: 'center', textShadow: '0 0 20px rgba(0,255,255,0.5)' }}>
                  DEEP DIVE
                </h1>
                <p style={{ fontSize: '1.5rem', color: '#aaccff', textAlign: 'center', marginTop: '1rem' }}>
                  EXPLORE THE UNKNOWN
                </p>
              </motion.div>
            </Section>

            <Section style={{ alignItems: 'flex-start', paddingLeft: '10vw' }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 style={{ fontSize: '4rem', color: '#fff', textShadow: '0 0 10px rgba(0,255,255,0.3)' }}>
                  FLUIDITY
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#aaccff', maxWidth: '400px' }}>
                  Like water, we adapt and flow.
                  Seamless experiences that feel natural and alive.
                </p>
              </motion.div>
            </Section>

            <Section style={{ alignItems: 'flex-end', paddingRight: '10vw' }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 style={{ fontSize: '4rem', color: '#fff', textAlign: 'right', textShadow: '0 0 10px rgba(0,255,255,0.3)' }}>
                  DEPTH
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#aaccff', maxWidth: '400px', textAlign: 'right' }}>
                  Dive deeper into immersive technologies.
                  Discover what lies beneath the surface.
                </p>
                <button style={{
                  marginTop: '2rem',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  background: 'rgba(0, 255, 255, 0.1)',
                  border: '1px solid #00ffff',
                  color: '#00ffff',
                  cursor: 'pointer',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)'
                }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#00ffff'; e.currentTarget.style.color = '#001e36' }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'; e.currentTarget.style.color = '#00ffff' }}
                >
                  START JOURNEY
                </button>
              </motion.div>
            </Section>

            {/* Render children (like Menu) here if nested, or just ignore if sibling */}
            {children}
          </Scroll>
        </ScrollControls>

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default Landpage
