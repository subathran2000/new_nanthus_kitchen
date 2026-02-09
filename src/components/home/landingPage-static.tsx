import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

// Assets
import logo from "../../assets/images/new_nanthus_kitchen_logo.png"
import logoReflect from "../../assets/images/restaurent.jpg"

// Components
import OrderButton from "../common/OrderButton"
import LocationSelector from "../common/LocationSelector"
import AboutUs from "./AboutUs"
import SpecialOfferSection from "./SpecialOfferSection"
import PickupSection from "./PickupSection"
import CateringSection from "./CateringSection"
import ContactSection from "./ContactSection"
import CreativeFooter from "../Footer/Footer"
import TypewriterText from '../common/TypewriterText'
import { commonButtonStyle } from '../common/ButtonStyles'
import SpecialsPopup from './SpecialsPopup'
import HeroImageGrid from './HeroImageGrid'
import Sparkles from '../common/Sparkles'
import { CustomScrollbarUI, ScrollSync } from '../common/CustomScrollbar'
import ThreeBackground from './ThreeBackground'

const Section: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  className?: string;
}> = ({ children, style, id, className }) => (
  <Box
    id={id}
    className={className}
    component={motion.section}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
    sx={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible', // Changed to visible for 3D interactions if needed
      py: 12,
      ...style
    }}
  >
    {children}
  </Box>
);

const LandingStatic: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // For Camera FOV
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false)
  const [specialsPopupOpen, setSpecialsPopupOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  // Automatically open specials after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpecialsPopupOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Fixed height for Canvas
        bgcolor: "#001e36", // Deep sea blue base
        color: "#fff",
        overflow: "hidden", // Hide native scroll
        position: "relative",
      }}
    >
      {/* 
        FIXED UI ELEMENTS 
        These sit completely outside the Canvas to ensure they are always clickale 
        and fixed to the viewport.
      */}

      {/* Custom Scrollbar Overlay */}
      {!isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <CustomScrollbarUI ref={scrollbarRef} />
        </Box>
      )}

      {/* Top bar: logo + order button on same line */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          left: 0,
          right: 0,
          px: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2000,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            width: { xs: 48, md: 85 },
            cursor: "pointer",
            filter: "drop-shadow(0 0 15px rgba(255, 140, 0, 0.2))",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "scale(1.05)",
              filter: "drop-shadow(0 0 25px rgba(255, 140, 0, 0.4))",
            },
          }}
          onClick={() => {
            const scrollContainer = document.querySelector('.lucide-scroll-container');
            if (scrollContainer) {
              scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      {/* 
        3D CANVAS & CONTENT 
      */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: isMobile ? 75 : isTablet ? 60 : 50 }}
        shadows
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#001e36']} />
        <fog attach="fog" args={['#001e36', 5, 25]} />

        <ScrollControls pages={isMobile ? 13 : 11} damping={0.15}>
          {/* Internal components can access useScroll now */}
          {!isMobile && <ScrollSync scrollbarRef={scrollbarRef} />}

          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>

          <Scroll html style={{ width: '100vw', overflowX: 'hidden' }}>

            {/* 1. Hero Section */}
            <Section
              style={{
                height: "100vh",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                overflow: "visible",
              }}
            >
              {/* DESKTOP ONLY: Synchronized 3D Background Grid - Right Cluster */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  width: "850px",
                  height: "850px",
                  zIndex: 1,
                  opacity: 0.8,
                  pointerEvents: "none",
                  overflow: "visible",
                  display: { xs: "none", md: "block" }, // HIDDEN on mobile
                }}
              >
                <HeroImageGrid
                  variant="desktop"
                  onSpecialsClick={() => setSpecialsPopupOpen(true)}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  maxWidth: "1400px",
                  mx: "auto",
                  px: { xs: 3, md: 10 },
                  pt: { xs: 10, md: 0 }, // Shift content down on mobile
                  position: "relative",
                  zIndex: 10,
                  overflow: "visible",
                }}
              >
                {/* Main Content Overlay */}
                <Box
                  sx={{
                    flex: 1,
                    alignItems: { xs: "center", md: "flex-start" },
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: { xs: "center", md: "flex-start" },
                      marginTop: "8%",
                    }}
                  >
                    <Box
                      sx={{
                        alignSelf: "flex-start",
                        ml: { xs: "15%", md: 0 },
                        mb: { xs: -1, md: 0 },
                      }}
                    >
                      <TypewriterText
                        text="New"
                        as="span"
                        className="accent-label"
                        delay={0.5}
                        stagger={0.1}
                      />
                    </Box>
                    <TypewriterText
                      text="NANTHU'S"
                      as="h2"
                      className="main-title"
                      delay={1.5}
                      stagger={0.1}
                    />
                  </Box>


                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "center", md: "flex-start" },
                      gap: 4,
                      width: "100%",
                      mt: 1,
                    }}
                  >
                    <TypewriterText
                      text="THE ART OF KITCHEN"
                      as="p"
                      className="subtitle-tagline"
                      delay={2.5}
                      stagger={0.03}
                    />
                  </Box>

                  {/* MOBILE BOTTOM GRID (4 Images) - Below Subtitle, Before Actions */}
                  <Box
                    sx={{
                      display: { xs: "block", md: "none" },
                      width: "100%",
                      height: "40vh", // Significant height for the bottom 4 images
                      position: "relative",
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <HeroImageGrid
                      variant="mobile-bottom"
                      onSpecialsClick={() => setSpecialsPopupOpen(true)}
                    />
                  </Box>

                  <Button
                    onClick={() => {
                      const menuSection = document.getElementById("menu-preview-section");
                      const scrollContainer = document.querySelector('.lucide-scroll-container');
                      if (menuSection && scrollContainer) {
                        // sections are inside a div that is moved by ScrollControls.
                        // offsetTop of the section relative to its parent (the Scroll html div)
                        // should be the target scroll position for the proxy container.
                        scrollContainer.scrollTo({ top: menuSection.offsetTop, behavior: "smooth" });
                      }
                    }}
                    sx={{
                      mt: 5,
                      ...commonButtonStyle,
                    }}
                  >
                    DIVE IN
                  </Button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 3, duration: 2 }}
                    style={{ marginTop: "8rem" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: "-20%" }}>
                      <Box
                        sx={{
                          width: "1px",
                          height: "60px",
                          background:
                            "linear-gradient(to bottom, #FF8C00, transparent)",
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          letterSpacing: "0.4em",
                          color: "#fff",
                          textTransform: "uppercase",
                          fontSize: "10px",
                        }}
                      >
                        Scroll to explore
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </Section>

            {/* 2. About Us */}
            <Section style={{ paddingTop: 0, paddingBottom: 0 }}>
              <AboutUs />
            </Section>

            {/* 3. Menu preview — transparent background */}
            <Section id="menu-preview-section" style={{ paddingTop: 0, paddingBottom: 0, background: 'transparent' }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 1200,
                  mx: "auto",
                  background: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: { xs: "1.5rem", md: "2.5rem" },
                  padding: { xs: "3rem 1rem", md: "4rem 2rem" },
                  px: { xs: 2, md: 4 },
                }}
              >
                {/* Section label + title */}
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <Box sx={{ width: 24, height: 1, bgcolor: "#FF8C00" }} />
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#FF8C00",
                        letterSpacing: "0.5em",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      KITCHEN MAGIC
                    </Typography>
                    <Box sx={{ width: 24, height: 1, bgcolor: "#FF8C00" }} />
                  </Box>
                  <Typography
                    variant="h2"
                    className="section-title"
                    sx={{
                      fontSize: { xs: "3rem", md: "5rem" },
                      color: "white",
                      lineHeight: 1,
                      fontFamily: "'Libre Caslon Display', serif",
                    }}
                  >
                    OUR MENU
                  </Typography>
                </Box>

                {/* Content: image + text block */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 1000,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: { xs: 2.5, md: 6 },
                  }}
                >
                  {/* Image block */}
                  <Box
                    sx={{
                      width: isMobile ? "100%" : "82%",
                      height: { xs: "280px", sm: "420px", md: "520px" },
                      background: `url(${logoReflect}) center/cover no-repeat`,
                      borderRadius: { xs: "20px", md: "32px" },
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(160deg, rgba(0, 20, 40, 0.15), transparent 50%)",
                      }}
                    />
                  </Box>

                  {/* Text block — transparent, no card fill */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "420px" },
                      background: "transparent",
                      padding: { xs: "1rem 0", md: "1.5rem 0" },
                      borderLeft: { xs: "none", md: "3px solid rgba(255, 140, 0, 0.6)" },
                      pl: { md: 2 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      textAlign: { xs: "center", md: "left" },
                      alignItems: { xs: "center", md: "flex-start" },
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "rgba(255, 140, 0, 0.95)",
                        letterSpacing: "0.35em",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      CONCEPT
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: { xs: "1.65rem", md: "2.5rem" },
                        color: "#fff",
                        lineHeight: 1.2,
                        "& span": { color: "#FF8C00", mx: 0.5 },
                      }}
                    >
                      DESIGN <span>&</span> TASTE
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        maxWidth: "360px",
                        mb: 1,
                        fontWeight: 300,
                      }}
                    >
                      Experience the perfect fusion of culinary artistry and modern design.
                      Our menu is a curated collection of flavors, textures, and visual
                      delights crafted to elevate your dining journey.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => (window.location.href = "/menu-new")}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ ...commonButtonStyle, width: { xs: "100%", md: "auto" } }}
                    >
                      EXPLORE MENU
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Section>

            {/* 4. Specials, Pickup, Catering, Contact, Footer */}
            <Section style={{ paddingTop: 0 }}>
              <SpecialOfferSection />
            </Section>

            <Section style={{ paddingTop: 0 }}>
              <PickupSection />
            </Section>

            <Section style={{ paddingTop: 0, paddingBottom: 0 }}>
              <CateringSection />
            </Section>

            <Section style={{ paddingTop: 0, paddingBottom: 0 }}>
              <ContactSection />
            </Section>

            <Section
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: "auto",
                justifyContent: "flex-start",
              }}
            >
              <CreativeFooter />
            </Section>

          </Scroll>
        </ScrollControls>

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      <LocationSelector
        open={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
        onSelectLocation={() => {
          setLocationSelectorOpen(false);
          window.location.href = "/menu-new";
        }}
      />
      <SpecialsPopup
        open={specialsPopupOpen}
        onClose={() => setSpecialsPopupOpen(false)}
      />
    </Box >
  );
};

export default LandingStatic;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pinyon+Script&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Rock+Salt&family=Raleway:wght@400;700;900&family=Libre+Caslon+Display&display=swap');

  :root {
    --gold: #FF8C00;
    --cyan: #00ffff;
    --navy: #000000;
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
    font-family: 'Raleway', sans-serif !important;
    font-weight: 900 !important;
    font-size: clamp(2rem, 11vw, 15rem) !important;
    letter-spacing: 0.1em !important;
    color: white !important;
    margin: 0 !important;
    font-style: normal !important;
    text-shadow: 0 10px 40px rgba(0,0,0,0.6);
    text-align: center !important;
    line-height: 1.1;
    text-transform: uppercase;
    white-space: nowrap !important;
  }

  @media (min-width: 900px) {
    .main-title {
      text-align: left !important;
    }
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
    text-align: center !important;
}
@media (min-width: 900px) {
    .subtitle-tagline {
        text-align: left !important;
    }
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
      white-space: normal !important;
    }
    .subtitle-tagline {
      letter-spacing: 0.4em;
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}
