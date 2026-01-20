import React, { useRef } from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Sparkles, Caustics, Environment, Cloud, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import CharacterSection from './EventSection '
import LuminousCard from './LuminousCard'
import ProductCards from './ProductCards'
import MenuRedirectSection from './MenuRedirectSection'
import CateringSection from './CateringSection'
import CreativeFooter from './Footer'
import logoReflect from '../assets/images/restaurent.jpg'
import logo from '../assets/images/new_nanthus_kitchen_logo.png'
import ContactSection from './ContactSection'

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

const SceneContent = () => {
  const scroll = useScroll()
  const groupRef = useRef<THREE.Group>(null)

  // Load the texture for the environment
  const texture = useTexture(logoReflect)
  texture.mapping = THREE.EquirectangularReflectionMapping

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire group based on scroll
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, -scroll.offset * Math.PI * 2, 4, delta)
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, scroll.offset * 5, 4, delta)
    }
  })

  return (
    <>
      {/* Bubbles - Locked in place, not rotating with the group */}
      <Sparkles count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
      <Sparkles count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />

      <group ref={groupRef}>
        {/* Caustics Effect */}
        {/* Caustics Effect - Disabled to remove dark shadows */
        /* <Caustics
          color="#00ffff"
          position={[0, -5, 0]}
          lightSource={[5, 5, -10]}
          worldRadius={10}
          ior={1.1}
          intensity={0.2}
        >
        </Caustics> */}

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
        <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

        {/* Environment for reflections */}
        <Environment map={texture} blur={1} />
      </group>
    </>
  )
}

// --- HTML Content ---

const Section = ({ children, style, ...props }: any) => {
  return (
    <Box
      component="section"
      {...props}
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '0.8rem', sm: '2rem' },
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden', // Add hidden overflow to every section as a safety net
        ...style
      }}
    >
      {children}
    </Box>
  )
}

import { CustomScrollbarUI, ScrollSync } from './CustomScrollbar'

const Landpage = ({ children }: { children?: React.ReactNode }) => {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div style={{ width: '100%', height: '100vh', background: '#001e36', overflow: 'hidden', position: 'relative' }}>

      {/* Top Left Logo */}
      <Box
        component="img"
        src={logo}
        alt="New Nanthu's Kitchen Logo"
        onClick={() => {
          const scrollContainer = document.querySelector('.lucide-scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        sx={{
          position: 'fixed',
          top: { xs: 20, md: 35 },
          left: { xs: 20, md: 40 },
          width: { xs: '55px', md: '85px' },
          height: 'auto',
          zIndex: 2000,
          cursor: 'pointer',
          filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.3))',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'scale(1.1) rotate(-5deg)',
            filter: 'drop-shadow(0 0 25px rgba(217, 167, 86, 0.6))',
          },
          '&:active': {
            transform: 'scale(0.95)',
          }
        }}
      />

      <Canvas camera={{ position: [0, 0, 5], fov: isMobile ? 75 : isTablet ? 60 : 50 }} shadows>
        <color attach="background" args={['#001e36']} />
        <fog attach="fog" args={['#001e36', 5, 25]} />

        <ScrollControls pages={isMobile ? 20 : 12} damping={0.15}>
          {/* Scroll Logic - Inside ScrollControls to access scroll data */}
          {!isMobile && <ScrollSync scrollbarRef={scrollbarRef} />}

          <SceneContent />

          <Scroll html style={{ width: '100vw', overflowX: 'hidden' }}>
            {/* Ultra Elegant Hero Section */}
            <Section>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -15, 0] }} // Floating flair for Hero
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  default: { duration: 2, ease: [0.22, 1, 0.36, 1] }
                }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      position: 'absolute',
                      top: { xs: '-1.5rem', md: '-2.5rem' },
                      left: { xs: '-1rem', md: '-3rem' },
                      marginTop: { xs: '0.5rem', sm: '1rem', md: '13rem' },

                      fontFamily: 'cursive',
                      color: '#D9A756',
                      transform: 'rotate(-15deg)',
                      zIndex: 2,
                      textShadow: '0 0 10px rgba(217, 167, 86, 0.5)',
                      fontWeight: 400,
                      pointerEvents: 'none'
                    }}
                  >
                    New
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.2rem', sm: '4rem', md: '7rem', lg: '9rem' },
                      marginTop: { xs: '0.5rem', sm: '1rem', md: '13rem' },
                      fontWeight: 100, // Ultra thin for maximum elegance
                      margin: 0,
                      color: '#fff',
                      textAlign: 'center',
                      letterSpacing: { xs: '0.05em', sm: '0.2em', md: '0.35em' }, // Tightened for xs
                      textShadow: '0 0 50px rgba(0,255,255,0.25)',
                      fontFamily: '"Outfit", sans-serif',
                      lineHeight: 1
                    }}
                  >
                    NANTHU'S
                  </Typography>
                  <motion.div
                    initial={{ width: 0, opacity: 0.2 }}
                    whileInView={{ width: '100%', opacity: 1 }} // Force 100% width on all to avoid push
                    transition={{ duration: 2, delay: 0.5 }}
                    style={{
                      height: '1px',
                      background: 'radial-gradient(circle, #00ffff 0%, transparent 100%)',
                      marginTop: '0.8rem',
                      marginLeft: '0'
                    }}
                  />
                </div>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '1rem' },
                    color: '#D9A756', // Elegant Gold accent
                    textAlign: 'center',
                    marginTop: '2rem',
                    letterSpacing: { xs: '0.4em', sm: '0.8em' }, // Extreme tracking
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    opacity: 0.9
                  }}
                >
                  THE ART OF KITCHEN
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() => {
                    const scrollContainer = document.querySelector('.lucide-scroll-container')
                    const targetEl = document.getElementById('menuButton')
                    if (scrollContainer && targetEl) {
                      // Calculate position relative to the scroll container
                      const containerTop = scrollContainer.getBoundingClientRect().top
                      const targetTop = targetEl.getBoundingClientRect().top
                      const scrollTarget = scrollContainer.scrollTop + (targetTop - containerTop)

                      scrollContainer.scrollTo({
                        top: scrollTarget,
                        behavior: 'smooth'
                      })
                      return
                    }
                    // Fallback to searching for the element if container logic fails
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  sx={{
                    mt: 6,
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                    color: '#00ffff',
                    borderRadius: 0,
                    px: 6,
                    py: 1.5,
                    fontSize: '0.8rem',
                    letterSpacing: '0.4em',
                    fontWeight: 300,
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      borderColor: '#D9A756',
                      color: '#001e36',
                      bgcolor: '#D9A756',
                      boxShadow: '0 0 30px rgba(217, 167, 86, 0.4)'
                    }
                  }}
                >
                  DIVE IN
                </Button>

                {/* Subtle Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 3, duration: 1 }}
                  style={{ marginTop: '6rem' }}
                >
                  <div style={{
                    width: '1px',
                    height: '80px',
                    background: 'linear-gradient(to bottom, #00ffff, transparent)',
                    position: 'relative'
                  }}>
                    <motion.div
                      animate={{ y: [0, 80] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: '3px',
                        height: '3px',
                        background: '#fff',
                        borderRadius: '50%',
                        position: 'absolute',
                        left: '-1px',
                        boxShadow: '0 0 10px #fff'
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </Section>

            {/* Character Design Section - Standardized Alignment */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0 2rem 0', md: '6rem 0 4rem 0' }, justifyContent: 'flex-start', zIndex: 10 }}>
              <CharacterSection />
            </Section>

            {/* Product Cards Section with Heading - Standardized Alignment */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0 2rem 0', md: '0rem 0 2rem 0' }, justifyContent: 'flex-start' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }} // Floating flair
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.2 },
                  default: { duration: 1.2, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '1rem' }}
              >
                <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.5em', mb: 3, display: 'block', fontSize: '0.8rem', fontWeight: 300 }}>
                  SIGNATURE FLAVORS
                </Typography>
                <Typography variant="h2" sx={{
                  color: '#fff',
                  fontWeight: 100,
                  fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
                  letterSpacing: { xs: '0.1em', md: '0.2em' },
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'uppercase'
                }}>
                  PERFECTION
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', margin: '2rem auto' }} />
              </motion.div>
              <ProductCards />
            </Section>

            {/* Luminous Card Section with Heading - Standardized Alignment */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0 2rem 0', md: '0rem 0 2rem 0' }, justifyContent: 'flex-start', gap: '4rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }} // Floating flair
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.2 },
                  default: { duration: 1.2, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '1rem' }}
              >
                <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.5em', mb: 3, display: 'block', fontSize: '0.8rem', fontWeight: 300 }}>
                  CULINARY JOURNEY
                </Typography>
                <Typography variant="h2" sx={{
                  color: '#fff',
                  fontWeight: 100,
                  fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
                  letterSpacing: { xs: '0.1em', md: '0.2em' },
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'uppercase'
                }}>
                  SIGNATURES
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', margin: '2rem auto' }} />
              </motion.div>
              <LuminousCard />
            </Section>

            {/* Menu Redirect Section - Fixed Centering to avoid top clipping */}
            <Section style={{ height: '1292px', padding: '6rem 0 10rem 0', justifyContent: 'flex-start', zIndex: 20 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }} // Floating flair
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.2 },
                  default: { duration: 1.2, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '1rem' }}
              >
                <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.5em', mb: 3, display: 'block', fontSize: '0.8rem', fontWeight: 300 }}>
                  KITCHEN MAGIC
                </Typography>
                <Typography variant="h2" sx={{
                  color: '#fff',
                  fontWeight: 100,
                  fontSize: { xs: '3rem', md: '5rem' },
                  letterSpacing: '0.2em',
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'uppercase'
                }}>
                  OUR MENU
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', margin: '2rem auto' }} />
              </motion.div>
              <MenuRedirectSection id="menuButton" />

            </Section>

            {/* Catering Section - Fixed Centering to avoid top clipping */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '6rem 0 4rem 0', md: '15rem 0 10rem 0' }, justifyContent: 'flex-start' }}>
              <CateringSection />
            </Section>

            {/* Contact Section */}
            <Section style={{ height: 'auto', minHeight: '50vh', padding: '4rem 0', justifyContent: 'center' }}>
              <ContactSection />
            </Section>

            {/* Creative Footer & Newsletter */}
            <Section style={{ height: 'auto', minHeight: '60vh', padding: '5rem 0 0 0', justifyContent: 'flex-start' }}>
              <CreativeFooter />
            </Section>

            {/* Render children (like Menu) here if nested */}
            {children}
          </Scroll>
        </ScrollControls>

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      {/* Custom Scrollbar UI - Moved to bottom to sit on top of Canvas */}
      {!isMobile && <CustomScrollbarUI ref={scrollbarRef} />}
    </div>
  )
}

export default Landpage
