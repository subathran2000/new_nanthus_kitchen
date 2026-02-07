import { useRef, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Canvas } from '@react-three/fiber'
import {
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { motion } from "framer-motion";
import logoReflect from "../../assets/images/restaurent.jpg";
import logo from "../../assets/images/new_nanthus_kitchen_logo.png";
import OrderButton from "../common/OrderButton";
import LocationSelector from "../common/LocationSelector";
import AboutUs from "./AboutUs";
import SpecialOfferSection from "./SpecialOfferSection";
import PickupSection from "./PickupSection";
import CateringSection from "./CateringSection";
import ContactSection from "./ContactSection";

import { commonButtonStyle } from '../common/ButtonStyles';
import { CustomScrollbarUI, ScrollSync } from '../common/CustomScrollbar'

import SpecialsPopup from './SpecialsPopup';
import Sparkles from "../common/Sparkles";
import TypewriterText from '../common/TypewriterText';
import CreativeFooter from "../Footer/Footer";


// --- Spline Types ---
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

// --- 3D Components ---


const SplineHero = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.46/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      // Cleanup if necessary, though spline-viewer usually handles itself
    };
  }, []);

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden' // Ensure cropping
    }}>
      <Box sx={{
        width: '100%',
        height: '110%', // Height overflow
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        <spline-viewer
          url="https://prod.spline.design/GvZVVfvnVofKhkKr/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
}

// --- HTML Content ---

interface SectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

const Section = ({ children, style, ...props }: SectionProps) => {
  return (
    <Box
      component="section"
      {...props}
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "0.8rem", sm: "2rem" },
        boxSizing: "border-box",
        position: "relative",
        zIndex: 10,
        ...style,
      }}
    >
      {children}
    </Box>
  );
};


const DecorativePanel = () => (
  <Box
    sx={{
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      width: "60px",
      zIndex: 50,
      display: { xs: "none", lg: "flex" },
      alignItems: "center",
      justifyContent: "center",
      writingMode: "vertical-rl",
      textTransform: "uppercase",
      letterSpacing: "0.4em",
      color: "rgba(255,255,255,0.1)",
      fontSize: "9px",
      gap: 4,
      pointerEvents: "none",
    }}
  ></Box>
);

const Landpage = () => {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);
  const [specialsPopupOpen, setSpecialsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpecialsPopupOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#000000",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <SpecialsPopup
        open={specialsPopupOpen}
        onClose={() => setSpecialsPopupOpen(false)}
      />
      <DecorativePanel />

      {/* Brand Logo */}
      <Box
        component="img"
        src={logo}
        alt="New Nanthu's Kitchen Logo"
        sx={{
          position: "fixed",
          top: { xs: 20, md: 35 },
          left: { xs: 20, md: 80 },
          width: { xs: "55px", md: "85px" },
          height: "auto",
          zIndex: 2000,
          cursor: "pointer",
          filter: "drop-shadow(0 0 15px rgba(255, 140, 0, 0.2))",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            transform: "scale(1.05)",
            filter: "drop-shadow(0 0 25px rgba(255, 140, 0, 0.4))",
          },
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <Box
        sx={{
          position: "fixed",
          top: { xs: 20, md: 35 },
          right: { xs: 20, md: 40 },
          zIndex: 2000,
        }}
      >
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: isMobile ? 75 : isTablet ? 60 : 50,
        }}
        shadows
      >
        <fog attach="fog" args={["#000000", 5, 25]} />
        <ScrollControls pages={isMobile ? 14.5 : 10.5} damping={0.15}>
          <ScrollSync scrollbarRef={scrollbarRef} />
          {/* Spline Animation in Hero Section */}
          <Scroll html style={{ width: "100vw", pointerEvents: "none" }}>
            <Section style={{ pointerEvents: "none" }}>
              <SplineHero />
            </Section>
          </Scroll>

          <Scroll html style={{ width: "100vw", overflowX: "hidden" }}>
            <Section>
              <Box
                className="hero-title-wrapper"
                sx={{
                  alignItems: { xs: "center", md: "flex-start" },
                  textAlign: "left",
                  width: "100%",
                  maxWidth: "1400px",
                  mx: "auto",
                  px: { xs: 3, md: 10 },
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: { xs: 0, md: 10 },
                    width: "100%",
                    alignItems: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Box sx={{ alignSelf: "flex-start", mb: { xs: -1, md: 0 } }}>
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
                    stagger={0.05}
                  />
                  {!isMobile && (
                    <Box
                      sx={{
                        flex: 1,
                        height: "1px",
                        background: "rgba(255,255,255,0.05)",
                        mb: "0.4rem",
                      }}
                    />
                  )}
                </Box>

                <Button
                  onClick={() => {
                    const menuSection = document.getElementById(
                      "menu-preview-section",
                    );
                    if (menuSection)
                      menuSection.scrollIntoView({ behavior: "smooth" });
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            </Section>

            <Section style={{ height: "auto", minHeight: "120vh" }}>
              <AboutUs />
            </Section>

            <Section
              id="menu-preview-section"
              style={{
                height: "auto",
                minHeight: isMobile ? "auto" : "100vh",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "1200px",
                  mx: "auto",
                  px: 2,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    mb: 6,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#FF8C00",
                        letterSpacing: "0.8em",
                        mb: 2,
                        display: "block",
                        fontSize: "0.75rem",
                      }}
                    >
                      CURATED FLAVORS
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: "'Libre Caslon Display', serif",
                        fontWeight: 700,
                        fontSize: { xs: "2.5rem", md: "4.5rem" },
                      }}
                    >
                      THE MENU
                    </Typography>
                  </motion.div>
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "70%" },
                      height: { xs: "350px", md: "600px" },
                      background: `url(${logoReflect}) center/cover`,
                      borderRadius: "32px",
                      boxShadow: "0 50px 100px rgba(0,0,0,0.5)",
                    }}
                  />
                  <Box
                    sx={{
                      width: { xs: "90%", md: "450px" },
                      ml: { xs: 0, md: -15 },
                      mt: { xs: -5, md: 0 },
                      p: 6,
                      bgcolor: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(30px)",
                      borderRadius: "24px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#FF8C00",
                        mb: 3,
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      Gastronomy Redefined
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        mb: 4,
                        lineHeight: 1.8,
                      }}
                    >
                      Discover a sensory experience where every dish tells a
                      story of tradition, innovation, and passion.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => (window.location.href = "/menu")}
                      sx={commonButtonStyle}
                    >
                      View Full Menu
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Section>

            <Section
              style={{
                height: "auto",
                minHeight: isMobile ? "auto" : "80vh",
                zIndex: 10,
              }}
            >
              <SpecialOfferSection />
            </Section>
            <Section
              style={{
                height: "auto",
                minHeight: isMobile ? "auto" : "60vh",
                zIndex: 10,
              }}
            >
              <PickupSection />
            </Section>
            <Section
              style={{
                height: "auto",
                minHeight: isMobile ? "auto" : "80vh",
                zIndex: 10,
              }}
            >
              <CateringSection />
            </Section>
            <Section
              style={{
                height: "auto",
                minHeight: isMobile ? "auto" : "80vh",
                zIndex: 10,
              }}
            >
              <ContactSection />
            </Section>
            <Section style={{ height: "auto", zIndex: 10 }}>
              <CreativeFooter />
            </Section>
          </Scroll>
        </ScrollControls>

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={300}
            intensity={0.5}
          />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      {!isMobile && <CustomScrollbarUI ref={scrollbarRef} />}

      <LocationSelector
        open={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
        onSelectLocation={() => {
          setLocationSelectorOpen(false);
          window.location.href = "/menu";
        }}
      />
      <Sparkles />
    </div>
  );
};

export default Landpage;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pinyon+Script&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Rock+Salt&family=Libre+Caslon+Display&display=swap');

  :root {
    --gold: #FF8C00;
    --cyan: #00ffff;
    --navy: #000000;
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
    font-size: clamp(2rem, 11vw, 15rem) !important;
    letter-spacing: 0.1em !important;
    color: white !important;
    margin: 0 !important;
    font-style: normal !important;
    text-shadow: 0 10px 40px rgba(0,0,0,0.6);
    text-align: center !important;
    line-height: 1.1;
  }

  @media (min-width: 900px) {
    .main-title {
      text-align: left !important;
    }
  }

  .main-title {
    text-transform: uppercase;
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
