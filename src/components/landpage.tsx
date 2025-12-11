import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Stars, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

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
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0}
          metalness={0.5}
          transmission={0.6}
          thickness={2}
          clearcoat={1}
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
      <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Main Hero Crystal */}
      <FloatingCrystal position={[0, 0, 0]} color="#ff0080" speed={2} rotationSpeed={0.5} scale={1.5} />

      {/* Background Crystals */}
      <FloatingCrystal position={[-3, 2, -5]} color="#00ffff" speed={1.5} rotationSpeed={0.3} scale={0.8} />
      <FloatingCrystal position={[3, -2, -4]} color="#ffff00" speed={1.8} rotationSpeed={0.4} scale={0.7} />
      <FloatingCrystal position={[-2, -3, -2]} color="#ff00ff" speed={1.2} rotationSpeed={0.2} scale={0.5} />
      <FloatingCrystal position={[2, 3, -3]} color="#00ff00" speed={1.6} rotationSpeed={0.6} scale={0.6} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} angle={0.15} penumbra={1} />
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

const Landpage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />

        <ScrollControls pages={3} damping={0.2}>
          <SceneContent />

          <Scroll html style={{ width: '100%' }}>
            <Section>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 style={{ fontSize: '6rem', margin: 0, color: '#fff', textAlign: 'center' }}>
                  LUSION
                </h1>
                <p style={{ fontSize: '1.5rem', color: '#888', textAlign: 'center', marginTop: '1rem' }}>
                  DIGITAL EXPERIENCE
                </p>
              </motion.div>
            </Section>

            <Section style={{ alignItems: 'flex-start', paddingLeft: '10vw' }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 style={{ fontSize: '4rem', color: '#fff' }}>
                  IMMERSIVE
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '400px' }}>
                  We craft digital journeys that transcend the ordinary.
                  Every pixel is a universe, every interaction a story.
                </p>
              </motion.div>
            </Section>

            <Section style={{ alignItems: 'flex-end', paddingRight: '10vw' }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 style={{ fontSize: '4rem', color: '#fff', textAlign: 'right' }}>
                  FUTURE
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '400px', textAlign: 'right' }}>
                  Embrace the next generation of web technologies.
                  3D, WebGL, and seamless animations.
                </p>
                <button style={{
                  marginTop: '2rem',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  background: 'transparent',
                  border: '1px solid #fff',
                  color: '#fff',
                  cursor: 'pointer',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
                >
                  CONTACT US
                </button>
              </motion.div>
            </Section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default Landpage