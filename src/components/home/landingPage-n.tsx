import React, { useRef, useState } from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Environment, Cloud, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import CreativeFooter from '../Footer/Footer'
import logoReflect from '../../assets/images/restaurent.jpg'
import logo from '../../assets/images/new_nanthus_kitchen_logo.png'
import TypewriterText from '../common/TypewriterText'
import Sparkles from '../common/Sparkles'
import OrderButton from '../common/OrderButton'
import AboutUs from './AboutUs'
import LocationSelector from '../common/LocationSelector'
import { menuData } from '../menu/spiral'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

// --- 3D Components ---

const FloatingCrystal = ({ position, color, speed, rotationSpeed, scale }: any) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const baseY = position[1]

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed
      meshRef.current.rotation.y += delta * rotationSpeed * 0.5
      // Reduced movement range for a much smoother "float" instead of "jump"
      meshRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * (speed * 0.5)) * 0.15
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

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Rotate the entire group based on scroll
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, -scroll.offset * Math.PI * 2, 4, delta)
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, scroll.offset * 5, 4, delta)
    }
  })

  return (
    <>
      {/* 3D Sparkles removed to use common/Sparkles component */}

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

import { CustomScrollbarUI, ScrollSync } from '../common/CustomScrollbar'

const Landpage = ({ children }: { children?: React.ReactNode }) => {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false)

  const hasSpecials = menuData.some(cat =>
    cat.title === 'Specials' &&
    cat.subCategories.some(sub => sub.items.length > 0)
  )

  return (
    <div style={{ width: '100%', height: '100vh', background: '#001e36', overflow: 'hidden', position: 'relative' }}>
      <Sparkles />



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

      <Box
        sx={{
          position: 'fixed',
          top: { xs: 20, md: 35 },
          right: { xs: 20, md: 40 },
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 3
        }}
      >
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />

        {hasSpecials && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <Button
              onClick={() => window.location.href = '/special'}
              startIcon={<RestaurantMenuIcon />}
              sx={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                border: 'none',
                borderRadius: '50px',
                padding: { xs: '0.8rem', md: '1rem 2rem' },
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                fontWeight: 700,
                color: '#000',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: { xs: '45px', md: 'auto' },
                minHeight: { xs: '45px', md: 'auto' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
                },
                '&:active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              Specials
            </Button>

            {/* Fire badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#FF4444',
                color: '#FFF',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(255, 68, 68, 0.5)',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            >
              🔥
            </motion.div>
          </motion.div>
        )}
      </Box>

      <Canvas camera={{ position: [0, 0, 5], fov: isMobile ? 75 : isTablet ? 60 : 50 }} shadows>
        <fog attach="fog" args={['#001e36', 5, 25]} />

        <ScrollControls pages={isMobile ? 20 : 12} damping={0.15}>
          {/* Scroll Logic - Inside ScrollControls to access scroll data */}
          {!isMobile && <ScrollSync scrollbarRef={scrollbarRef} />}

          <SceneContent />

          <Scroll html style={{ width: '100vw', overflowX: 'hidden' }}>
            {/* Ultra Elegant Hero Section - Styled like LandingPage.tsx */}
            <Section>
              <div className="hero-title-wrapper">
                <div className="title-stack" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '9rem' }}>
                  <TypewriterText
                    text="New"
                    as="span"
                    className="accent-label"
                    delay={0.5}
                    stagger={0.1}
                  />
                  <TypewriterText
                    text="NANTHU'S"
                    as="h2"
                    className="main-title"
                    delay={1.5}
                    stagger={0.1}
                  />
                </div>
                <div className="title-divider"></div>
                <TypewriterText
                  text="THE ART OF KITCHEN"
                  as="p"
                  className="subtitle-tagline"
                  delay={2.5}
                  stagger={0.05}
                />
                <Button
                  className="dive-button"
                  onClick={() => {
                    const scrollContainer = document.querySelector('.lucide-scroll-container')
                    if (scrollContainer) {
                      scrollContainer.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                      })
                    }
                  }}
                  sx={{ mt: 4 }}
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
              </div>
            </Section>

            {/* About Us Section - Staggered Cards based on Reference Image */}
            <AboutUs />

            {/* Menu Redirection Section */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 2rem', md: '8rem 2rem' }, justifyContent: 'center', zIndex: 10 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  margin: '0 auto',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: '32px',
                    padding: { xs: '4rem 2rem', md: '6rem 4rem' },
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                      transform: 'translateY(-15px)',
                      border: '1px solid rgba(0, 255, 255, 0.5)',
                      boxShadow: '0 40px 100px rgba(0, 255, 255, 0.15)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '32px',
                      padding: '2px',
                      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.5), rgba(255, 215, 0, 0.5))',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'destination-out',
                      pointerEvents: 'none',
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    }
                  }}
                >
                  {/* Decorative Glow */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-50%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '150%',
                      height: '150%',
                      background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15), transparent 60%)',
                      pointerEvents: 'none',
                      transition: 'opacity 0.5s ease',
                      opacity: 0,
                    }}
                    className="menu-glow"
                  />

                  <Typography
                    variant="overline"
                    sx={{
                      color: '#FFD700',
                      letterSpacing: '0.6em',
                      mb: 3,
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: 400
                    }}
                  >
                    EXPLORE OUR FLAVORS
                  </Typography>

                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 300,
                      textTransform: 'uppercase',
                      letterSpacing: { xs: '0.3em', md: '0.5em' },
                      color: '#fff',
                      fontSize: { xs: '2rem', md: '4rem' },
                      textShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
                      lineHeight: 1.3,
                      mb: 2,
                    }}
                  >
                    Discover Our <span style={{ color: '#00ffff', fontWeight: 400 }}>Menu</span>
                  </Typography>

                  <Box
                    sx={{
                      width: '80px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #FFD700, #00ffff)',
                      margin: '2rem auto 3rem',
                      borderRadius: '2px'
                    }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: 1.8,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 300,
                      maxWidth: '600px',
                      margin: '0 auto 3rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Embark on a culinary journey through our carefully curated selection of authentic dishes,
                    crafted with passion and served with perfection.
                  </Typography>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => window.location.href = '/menu-new'}
                      sx={{
                        color: '#00ffff',
                        border: '2px solid rgba(0, 255, 255, 0.5)',
                        padding: { xs: '1rem 3rem', md: '1.2rem 4rem' },
                        borderRadius: '4px',
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        letterSpacing: '0.4em',
                        background: 'transparent',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s ease',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '0',
                          height: '0',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(0,255,255,0.2), transparent)',
                          transform: 'translate(-50%, -50%)',
                          transition: 'width 0.6s ease, height 0.6s ease',
                        },
                        '&:hover': {
                          background: 'rgba(0, 255, 255, 0.05)',
                          border: '2px solid #00ffff',
                          letterSpacing: '0.5em',
                          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                        '&:hover::before': {
                          width: '300px',
                          height: '300px',
                        }
                      }}
                    >
                      VIEW MENU
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Section>

            {/* Character Design Section - Standardized Alignment */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0 2rem 0', md: '6rem 0 4rem 0' }, justifyContent: 'flex-start', zIndex: 10 }}>
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
                <Typography variant="overline" sx={{ color: '#FFD700', letterSpacing: '0.6em', mb: 3, display: 'block', fontSize: '0.8rem', fontWeight: 400 }}>
                  SIGNATURE FLAVORS
                </Typography>
                <Typography variant="h2" sx={{
                  color: '#fff',
                  fontWeight: 300,
                  fontSize: { xs: '1.8rem', md: '3.5rem' },
                  letterSpacing: { xs: '0.3em', md: '0.5em' },
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'uppercase',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                }}>
                  PERFECTION
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', margin: '2rem auto' }} />
              </motion.div>
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
                <Typography variant="overline" sx={{ color: '#FFD700', letterSpacing: '0.6em', mb: 3, display: 'block', fontSize: '0.8rem', fontWeight: 400 }}>
                  CULINARY JOURNEY
                </Typography>
                <Typography variant="h2" sx={{
                  color: '#fff',
                  fontWeight: 300,
                  fontSize: { xs: '1.8rem', md: '3.5rem' },
                  letterSpacing: { xs: '0.3em', md: '0.5em' },
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'uppercase',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                }}>
                  SIGNATURES
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', margin: '2rem auto' }} />
              </motion.div>
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
                <Typography variant="overline" sx={{ color: '#FFD700', letterSpacing: '0.6em', mb: 3, display: 'block', fontSize: '0.8rem', fontWeight: 400 }}>
                  KITCHEN MAGIC
                </Typography>
                <Typography variant="h2" sx={{
                  color: '#fff',
                  fontWeight: 300,
                  fontSize: { xs: '1.8rem', md: '3.5rem' },
                  letterSpacing: { xs: '0.3em', md: '0.5em' },
                  fontFamily: '"Outfit", sans-serif',
                  textTransform: 'uppercase',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                }}>
                  OUR MENU
                </Typography>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0, 255, 255, 0.3)', margin: '2rem auto' }} />
              </motion.div>

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

      {/* Location Selector Modal */}
      <LocationSelector
        open={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
        onSelectLocation={(locationName) => {
          console.log(`Order placed from ${locationName}`);
          setLocationSelectorOpen(false);
          // Navigate to menu after location selection
          window.location.href = '/menu-new';
        }}
      />
    </div>
  )
}

export default Landpage

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pinyon+Script&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

  :root {
    --gold: #D9A756;
    --cyan: #00ffff;
    --navy: #001e36;
  }

  .hero-title-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .accent-label {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-style: italic;
    color: #FFD700;
    font-size: clamp(1.8rem, 5vw, 5rem);
    z-index: 11;
    pointer-events: none;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3);
    white-space: nowrap;
    margin-left: 0rem;
  }

  .main-title {
    font-family: 'Inter', sans-serif !important;
    font-weight: 900 !important;
    font-size: clamp(2.5rem, 11vw, 15rem) !important;
    letter-spacing: 0.1em !important;
    color: white !important;
    margin: 0 !important;
    font-style: normal !important;
    text-shadow: 0 10px 40px rgba(0,0,0,0.6);
    text-align: center;
    line-height: 1.1;
  }

  .title-divider {
    width: 100%;
    max-width: 800px;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--gold) 20%, var(--cyan) 50%, var(--gold) 80%, transparent 100%);
    margin: 1.5rem 0;
    box-shadow: 0 0 15px var(--cyan);
    opacity: 0.8;
  }

  .subtitle-tagline {
    font-family: 'Inter', sans-serif;
    color: var(--gold);
    font-size: clamp(0.7rem, 2vw, 1.5rem);
    letter-spacing: 0.8em;
    margin-right: -0.8em;
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.9;
    text-align: center;
  }

  .dive-button {
    margin-top: 1.25rem;
    background: transparent !important;
    border: 2px solid rgba(0, 255, 255, 0.6) !important;
    color: var(--cyan) !important;
    padding: 0.75rem 2.25rem !important;
    font-size: clamp(0.85rem, 1.6vw, 1.2rem) !important;
    letter-spacing: 0.35em !important;
    text-transform: uppercase !important;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0,255,255,0.06), inset 0 0 10px rgba(0,255,255,0.03) !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease !important;
    border-radius: 2px !important;
    position: relative;
    overflow: hidden;
  }

  .dive-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,255,0.2), transparent);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  .dive-button:hover::before {
    width: 300px;
    height: 300px;
  }

  .dive-button:hover {
    transform: translateY(-4px) scale(1.02) !important;
    box-shadow: 0 8px 30px rgba(0,255,255,0.12), inset 0 0 20px rgba(0,255,255,0.06) !important;
    background: linear-gradient(90deg, rgba(0,255,255,0.04), rgba(217,167,86,0.02)) !important;
  }

  @media (max-width: 768px) {
    .accent-label {
      font-size: clamp(1.8rem, 8vw, 3rem);
      margin-top: 1rem;
      margin-right: 1rem;
      max-height: 5rem;
      margin-left: 0;
    }
    .main-title {
      letter-spacing: 0.05em !important;
    }
    .title-divider {
      width: 80%;
    }
    .subtitle-tagline {
      letter-spacing: 0.4em;
    }
  }

  .antigravity-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}
