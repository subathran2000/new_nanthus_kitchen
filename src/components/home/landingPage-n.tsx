import React, { useRef, useState, useEffect } from 'react'
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ScrollControls,
  Scroll,
  useScroll,
  Float,
  Environment,
  useTexture,
  Cloud,
} from "@react-three/drei";
import Sparkles from "../common/Sparkles";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";
import CreativeFooter from "../Footer/Footer";
import logoReflect from "../../assets/images/restaurent.jpg";
import logo from "../../assets/images/new_nanthus_kitchen_logo.png";
import TypewriterText from "../common/TypewriterText";
import OrderButton from "../common/OrderButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AboutUs from "./AboutUs";
import LocationSelector from "../common/LocationSelector";

import { commonButtonStyle } from '../common/ButtonStyles';
import CateringSection from "./CateringSection";
import ContactSection from "./ContactSection";
import SpecialOfferSection from "./SpecialOfferSection";
import PickupSection from "./PickupSection";

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
      {/* Bubbles removed as per user request */}

      <group ref={groupRef}>
        {/* Subtle Cloud/Fog for depth */}
        <Cloud opacity={0.1} speed={0.1} segments={10} position={[0, -5, -10]} color="#aaccff" />

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

import SpecialsPopup from './SpecialsPopup';

const Landpage = ({ children }: { children?: React.ReactNode }) => {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false)
  const [specialsPopupOpen, setSpecialsPopupOpen] = useState(false);

  useEffect(() => {
    // Show specials popup on mount after a short delay
    const timer = setTimeout(() => {
      setSpecialsPopupOpen(true);
    }, 1000); // 1 second delay for better UX
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#001e36', overflow: 'hidden', position: 'relative' }}>
      <SpecialsPopup open={specialsPopupOpen} onClose={() => setSpecialsPopupOpen(false)} />

      <Sparkles />

      {/* Top Left Logo Restored */}
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

      </Box>

      <Canvas camera={{ position: [0, 0, 5], fov: isMobile ? 75 : isTablet ? 60 : 50 }} shadows>
        <fog attach="fog" args={['#001e36', 5, 25]} />

        <ScrollControls pages={isMobile ? 20 : 12} damping={0.15}>
          {/* Scroll Logic - Inside ScrollControls to access scroll data */}
          <ScrollSync scrollbarRef={scrollbarRef} />

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
                    const scrollContainer = document.querySelector('.lucide-scroll-container');
                    const menuSection = document.getElementById('menu-preview-section');
                    if (scrollContainer && menuSection) {
                      scrollContainer.scrollTo({
                        top: menuSection.offsetTop,
                        behavior: 'smooth'
                      });
                    } else if (menuSection) {
                      menuSection.scrollIntoView({ behavior: 'smooth' });
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

            <Section id="menu-preview-section" style={{ height: 'auto', minHeight: isMobile ? 'auto' : '100vh', justifyContent: 'center', zIndex: 10 }}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: { xs: '1.5rem', md: '2rem' },
                  padding: { xs: '3rem 1rem', md: '0rem 2rem' },
                  position: 'relative',
                }}
              >
                {/* Heading Above All */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: '#FF8C00',
                      letterSpacing: '0.6em',
                      mb: 2,
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: 400
                    }}
                  >
                    KITCHEN MAGIC
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      textTransform: 'uppercase',
                      letterSpacing: { xs: '0.3em', md: '0.5em' },
                      color: '#fff',
                      fontSize: { xs: '1.8rem', md: '3.5rem' },
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    OUR MENU
                  </Typography>
                  <Box
                    sx={{
                      width: '60px',
                      height: '2px',
                      background: 'linear-gradient(90deg, #FF8C00, transparent)',
                      margin: '1.5rem auto 0',
                      borderRadius: '2px'
                    }}
                  />
                </motion.div>

                {/* Main Content Area: Image + Overlapping Card */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1100px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Large Main Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{
                      y: [0, -10, 0],
                      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{ width: isMobile ? '100%' : '75%', zIndex: 1 }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: '300px', sm: '450px', md: '550px' },
                        background: `url(${logoReflect}) center/cover no-repeat`,
                        borderRadius: { xs: '24px', md: '40px' },
                        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(0, 30, 54, 0.2), transparent)',
                        }}
                      />
                    </Box>
                  </motion.div>

                  {/* Glassmorphic Overlapping Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : 80, y: isMobile ? -40 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{
                      zIndex: 2,
                      width: isMobile ? '90%' : '480px',
                      marginLeft: isMobile ? '0' : '-150px',
                      marginTop: isMobile ? '-60px' : '0',
                    }}
                  >
                    <Box
                      sx={{
                        background: 'rgba(0, 30, 54, 0.4)',
                        backdropFilter: 'blur(30px)',
                        padding: { xs: '2rem', md: '3.5rem 3rem' },
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5,
                        textAlign: 'left',
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.5)',
                          letterSpacing: '0.5em',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        CONCEPT
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 800,
                          fontSize: { xs: '2rem', md: '3.2rem' },
                          color: '#fff',
                          lineHeight: 1.1,
                          textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                          '& span': {
                            color: '#FF8C00',
                            textShadow: '0 0 20px rgba(255, 140, 0, 0.4)',
                          }
                        }}
                      >
                        DESIGN <span style={{ marginRight: '8px' }}>&</span><br />TASTE
                      </Typography>

                      <Box sx={{ width: '50px', height: '1.5px', background: 'rgba(255, 255, 255, 0.2)', my: 1 }} />

                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '1.05rem',
                          lineHeight: 1.7,
                          mb: 3,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        Experience the perfect fusion of culinary artistry and modern design.
                        Our menu is a curated collection of flavors, textures, and visual
                        delights crafted to elevate your dining journey.
                      </Typography>

                      <Button
                        variant="outlined"
                        onClick={() => window.location.href = '/menu-new'}
                        endIcon={<ArrowForwardIcon />}
                        sx={commonButtonStyle}
                      >
                        EXPLORE MENU
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </Section>


            {/* Special Offer Section - Added as per request */}
            <Section style={{ height: 'auto', minHeight: isMobile ? 'auto' : '80vh', padding: { xs: '1.5rem 0', md: '0rem 0' }, justifyContent: 'center', zIndex: 10 }}>
              <SpecialOfferSection />
            </Section>

            {/* Pickup Section - Order Online */}
            <Section style={{ height: 'auto', minHeight: isMobile ? 'auto' : '60vh', padding: { xs: '1.5rem 0', md: '0rem 0' }, justifyContent: 'center', zIndex: 10 }}>
              <PickupSection />
            </Section>

            {/* Catering Services Section */}
            <Section style={{ height: 'auto', minHeight: isMobile ? 'auto' : '80vh', padding: { xs: '1.5rem 0', md: '0rem 0' }, justifyContent: 'center', zIndex: 10 }}>
              <CateringSection />
            </Section>

            {/* Contact Section */}
            <Section style={{ height: 'auto', minHeight: isMobile ? 'auto' : '80vh', padding: { xs: '1.5rem 0', md: '3rem 0' }, justifyContent: 'center', zIndex: 10 }}>
              <ContactSection />
            </Section>

            {/* Creative Footer & Newsletter */}
            <Section style={{ height: 'auto', minHeight: '40vh', padding: '1rem 0 0 0', justifyContent: 'flex-start' }}>
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
    --gold: #FF8C00;
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
    color: rgba(255, 140, 0, 1);
    font-size: clamp(1.8rem, 5vw, 5rem);
    z-index: 11;
    pointer-events: none;
    text-shadow: 0 0 10px rgba(255, 140, 0, 0.8), 0 0 20px rgba(255, 140, 0, 0.5), 0 0 30px rgba(255, 140, 0, 0.3);
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
    background: rgba(0,30,54,0.3) !important;
    border: 1px solid rgba(0, 255, 255, 0.4) !important;
    color: var(--cyan) !important;
    padding: 1rem 3rem !important;
    font-size: 1rem !important;
    letter-spacing: 0.4em !important;
    text-transform: uppercase !important;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    border-radius: 0 !important;
    position: relative;
    overflow: hidden;
    font-weight: 300 !important;
    font-family: 'Outfit', sans-serif !important;
  }

  .dive-button:hover {
    border-color: var(--gold) !important;
    background: var(--gold) !important;
    color: var(--navy) !important;
    box-shadow: 0 0 40px rgba(255, 140, 0, 0.5) !important;
    transform: translateY(-2px) !important;
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
