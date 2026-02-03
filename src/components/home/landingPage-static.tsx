import React, { useRef, useState, useEffect } from 'react'
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import logo from "../../assets/images/new_nanthus_kitchen_logo.png"
import logoReflect from "../../assets/images/restaurent.jpg"
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
import { CustomScrollbarUI } from '../common/CustomScrollbar'; // Import the specific scrollbar component

const Section: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  className?: string; // Add className prop
}> = ({ children, style, id, className }) => (
  <Box
    id={id}
    className={className}
    sx={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      py: 10,
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
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false)
  const [specialsPopupOpen, setSpecialsPopupOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null); // Ref for custom scrollbar

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Scroll Sync for Custom Scrollbar
  useEffect(() => {
    const handleScroll = () => {
      if (scrollbarRef.current) {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Avoid division by zero
        if (docHeight <= 0) return;

        const progress = scrollY / docHeight;

        // Constants from CustomScrollbar.tsx
        const TRACK_HEIGHT_PX = 300;
        const THUMB_HEIGHT_PX = 60;
        const availableTravel = TRACK_HEIGHT_PX - THUMB_HEIGHT_PX;

        const currentY = progress * availableTravel;

        // Update transform directly for performance
        scrollbarRef.current.style.transform = `translate(-50%, ${currentY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#001e36",
        color: "#fff",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Custom Scrollbar Overlay - Fixed Position */}
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

      {/* Global Sparkles Background */}
      <Sparkles />
      {/* Top bar with logo + order button */}
      <Box sx={{ position: "fixed", top: 20, left: 20, zIndex: 2000 }}>
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
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </Box>

      <Box sx={{ position: "fixed", top: 20, right: 30, zIndex: 2000 }}>
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      {/* Hero Section */}
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
          <HeroImageGrid variant="desktop" />
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
                as="h6"
                className="main-title"
                delay={1.5}
                stagger={0.1}
              />
            </Box>

            <Box
              sx={{
                width: "40px",
                height: "1px",
                background: "rgba(255, 140, 0, 0.4)",
                mt: 3,
                mb: 1,
                alignSelf: { xs: "center", md: "flex-start" },
              }}
            />

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
              <HeroImageGrid variant="mobile-bottom" />
            </Box>

            <Button
              className="dive-button"
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
        </Box>
      </Section>

      {/* About Us */}
      <Section style={{ paddingTop: 0 }}>
        <AboutUs />
      </Section>

      {/* Menu preview */}
      <Section id="menu-preview-section" style={{ paddingTop: 0 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 2, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              mb: 6,
            }}
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
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "2.5rem", md: "4.5rem" },
              }}
            >
              THE MENU
            </Typography>
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
                boxShadow: "0 50px 100px rgba(0,30,54,0.2)",
              }}
            />
            <Box
              sx={{
                width: { xs: "90%", md: "450px" },
                ml: { xs: 0, md: -15 },
                mt: { xs: -5, md: 0 },
                p: 6,
                bgcolor: "rgba(0,30,54,0.6)",
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
                sx={{ color: "rgba(255,255,255,0.7)", mb: 4, lineHeight: 1.8 }}
              >
                Discover a sensory experience where every dish tells a story of
                tradition, innovation, and passion.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => (window.location.href = "/menu-new")}
                sx={commonButtonStyle}
              >
                View Full Menu
              </Button>
            </Box>
          </Box>
        </Box>
      </Section>

      {/* Specials, Pickup, Catering, Contact, Footer */}
      <Section style={{ paddingTop: 0 }}>
        <SpecialOfferSection />
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <PickupSection />
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <CateringSection />
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <ContactSection />
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <CreativeFooter />
      </Section>

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
    </Box>
  );
};

export default LandingStatic;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pinyon+Script&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Rock+Salt&display=swap');

  :root {
    --gold: #FF8C00;
    --cyan: #00ffff;
    --navy: #001e36;
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
@media (min-width: 900px) {
    text-align: left !important;
}
    text-transform: uppercase;
    white-space: nowrap !important;
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
