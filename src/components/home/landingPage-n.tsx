import React, { useRef, useState, useEffect } from 'react'
import { Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ScrollControls,
  Scroll,
  useScroll,
  Float,
  Environment,
  useTexture,
  Stars,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";
import CreativeFooter from "../Footer/Footer";
import logo from "../../assets/images/new_nanthus_kitchen_logo.png";
import TypewriterText from "../common/TypewriterText";
import Sparkles from "../common/Sparkles";
import OrderButton from "../common/OrderButton";
import AboutUs from "./AboutUs";
import LocationSelector from "../common/LocationSelector";
import { menuData } from "../menu/spiral";
import MenuPreview from "./MenuPreview";
import CateringSection from "./CateringSection";
import ContactSection from "./ContactSection";

// --- 3D Components ---

const EarthCenter = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Still use textures, but only for stylized masks
  const [earthTexture] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y += 0.0015;
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.02);
  });

  return (
    <group>
      {/* Stylized Glassmorphic Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#001e36" // Brand Navy
          emissive="#D9A756" // Brand Gold for continents
          emissiveMap={earthTexture}
          emissiveIntensity={4} // Strong glow for the stylized map
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Soft Cyan Inner Core Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff" // Brand Cyan
          transparent
          opacity={0.4}
        />
      </mesh>


      {/* Premium Studio Lighting for Stylized Look */}
      <pointLight position={[10, 10, 10]} intensity={4} color="#00ffff" />
      <pointLight position={[-10, -5, 5]} intensity={3} color="#D9A756" />
    </group>
  );
};

const Planet = ({
  orbitRadius,
  orbitSpeed,
  orbitOffset = 0,
  size,
  color,
  hasRings = false,
  rotationSpeed = 1,
}: any) => {
  const meshRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * orbitSpeed + orbitOffset;
      meshRef.current.position.x = Math.cos(t) * orbitRadius;
      meshRef.current.position.z = Math.sin(t) * orbitRadius;
      meshRef.current.position.y = Math.sin(t * 0.5) * (orbitRadius * 0.2); // Slight vertical oscillation
    }
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={planetMeshRef} scale={size}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.3}
          />
          {hasRings && (
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <ringGeometry args={[1.5, 2.2, 64]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </mesh>
      </Float>
    </group>
  );
};

const SceneContent = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);


  useFrame((_, delta) => {
    if (groupRef.current) {
      // Rotate the entire group based on scroll
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        -scroll.offset * Math.PI * 2,
        4,
        delta,
      );
      groupRef.current.position.z = THREE.MathUtils.damp(
        groupRef.current.position.z,
        scroll.offset * 5,
        4,
        delta,
      );
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <group ref={groupRef}>
        <EarthCenter />

        {/* Stylized Planets orbiting the Glass Earth */}
        {/* Mercury-like */}
        <Planet
          orbitRadius={5}
          orbitSpeed={0.8}
          size={0.4}
          color="#00ffff" // Brand Cyan
        />

        {/* Venus-like */}
        <Planet
          orbitRadius={8}
          orbitSpeed={0.5}
          orbitOffset={Math.PI}
          size={0.6}
          color="#D9A756" // Brand Gold
        />

        {/* Mars-like */}
        <Planet
          orbitRadius={16}
          orbitSpeed={0.25}
          orbitOffset={Math.PI * 1.5}
          size={0.5}
          color="#00ffff"
        />

        {/* Jupiter-like */}
        <Planet
          orbitRadius={22}
          orbitSpeed={0.15}
          size={1.2}
          color="#D9A756"
        />

        {/* Saturn-like with Rings */}
        <Planet
          orbitRadius={28}
          orbitSpeed={0.1}
          orbitOffset={1}
          size={1.0}
          color="#00ffff"
          hasRings={true}
        />

        {/* Subdued General Lighting to let Stylized Earth pop */}
        <ambientLight intensity={0.5} color="#ffffff" />
      </group>
    </>
  );
};

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

            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0', md: '8rem 0' }, justifyContent: 'center', zIndex: 10 }}>
              <MenuPreview />
            </Section>

            {/* Catering Services Section */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0', md: '8rem 0' }, justifyContent: 'center', zIndex: 10 }}>
              <CateringSection />
            </Section>

            {/* Contact Section */}
            <Section style={{ height: 'auto', minHeight: '100vh', padding: { xs: '4rem 0', md: '8rem 0' }, justifyContent: 'center', zIndex: 10 }}>
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
