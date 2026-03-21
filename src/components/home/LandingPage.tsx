import { useRef, useState, useEffect, Suspense, useMemo, useCallback, type FC, type ReactNode } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { StableScroll } from "../common/StableScroll";
import "./LandingPage.css";

// Assets
import logo from "../../assets/images/new_nanthus_kitchen_logo.png";

// Components
import OrderButton from "../common/OrderButton";
import LocationSelector from "../common/LocationSelector";
import AboutPreview from "./AboutPreview";
import SpecialOfferSection from "./SpecialOfferSection";
import PickupSection from "./PickupSection";
import CateringSection from "./CateringSection";
import ContactSection from "./ContactSection";
import Footer from "../Footer/Footer";
import TypewriterText from "../common/TypewriterText";
import { commonButtonStyle } from "../common/ButtonStyles";
import SpecialsPopup from "./SpecialsPopup";
import { CustomScrollbarUI, ScrollSync } from "../common/CustomScrollbar";
import ThreeBackground from "./ThreeBackground";

const Section: FC<{
  children: ReactNode;
  style?: React.CSSProperties;
  id?: string;
  className?: string;
}> = ({ children, style, id, className }) => (
  <Box
    id={id}
    className={className}
    component={motion.section}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    sx={{
      width: "100%",
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "visible",
      py: { xs: 6, sm: 8, md: 10 },
      ...style,
    }}
  >
    {children}
  </Box>
);

const LandingStatic: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);
  const [specialsPopupOpen, setSpecialsPopupOpen] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const scrollStyle = useMemo(
    () => ({ width: "100vw", overflowX: "hidden" as const }),
    []
  );

  const handleCanvasCreated = useCallback(({ gl }: { gl: any }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e: any) => {
      e.preventDefault();
    });
  }, []);

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
        height: "100vh",
        bgcolor: "#05070A",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
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

      {/* Logo Layer - Stays above Modals (1300) */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          left: 0,
          pl: { xs: 2, md: 5 },
          zIndex: 2000,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            width: { xs: 48, md: 150 },
            cursor: "pointer",
            filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.2))",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "scale(1.05)",
              filter: "drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))",
            },
          }}
          onClick={() => {
            const scrollContainer = document.querySelector(".lucide-scroll-container");
            if (scrollContainer) {
              scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      </Box>

      {/* Order Button Layer - Stays below Modals (1300) */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          right: 0,
          pr: { xs: 2, md: 5 },
          zIndex: 1000,
        }}
      >
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      <Canvas
        key="landing-canvas"
        camera={{ position: [0, 0, 5], fov: isMobile ? 75 : 50 }}
        shadows
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{ powerPreference: "high-performance", antialias: !isMobile, stencil: false, depth: true }}
        onCreated={handleCanvasCreated}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#05070A"]} />
        <fog attach="fog" args={["#000000", 8, 30]} />

        <ScrollControls pages={isMobile ? 8.5 : 8.0} damping={0.15}>
          {!isMobile && <ScrollSync scrollbarRef={scrollbarRef} />}

          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>

          <StableScroll html style={scrollStyle}>
            {/* 1. Hero Section - Centered with Interaction */}
            <Section style={{ minHeight: "100vh", height: "100vh", justifyContent: "center" }}>
              <Box
                component={motion.div}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { staggerChildren: 0.3 }
                  }
                }}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  zIndex: 20,
                }}
              >
                <motion.div
                  variants={{
                    initial: { y: 20, opacity: 0 },
                    animate: { y: 0, opacity: 1 }
                  }}>
                  <TypewriterText text="New" className="accent-label" delay={0.5} />
                </motion.div>

                {/* This container handles the interaction between the two main words */}
                <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <motion.div
                    variants={{
                      initial: { x: -50, opacity: 0 },
                      animate: { x: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <TypewriterText text="NANTHU'S" as="h2" className="main-title" delay={1.2} />
                  </motion.div>

                  <motion.div
                    variants={{
                      initial: { x: 50, opacity: 0 },
                      animate: { x: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ marginTop: '20px' }} // Pulls them closer together
                  >
                    <TypewriterText
                      text="KITCHEN"
                      as="h2"
                      className="main-title"
                      style={{ color: "#D4AF37", background: "none", WebkitTextFillColor: "#D4AF37" }}
                      delay={1.8}
                    />
                  </motion.div>

                </Box>

                <motion.div variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }} transition={{ delay: 2.5 }}>
                  <TypewriterText text="Authentic Sri Lankan Cuisine" as="p" className="subtitle-tagline" delay={2.5} />
                </motion.div>

                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const menuSection = document.getElementById("menu-preview-section");
                    const scrollContainer = document.querySelector(".lucide-scroll-container");
                    if (menuSection && scrollContainer) {
                      scrollContainer.scrollTo({ top: (menuSection as HTMLElement).offsetTop, behavior: "smooth" });
                    }
                  }}
                  sx={{ mt: { xs: 3, md: 5 }, ...commonButtonStyle }}
                >
                  DIVE IN
                </Button>
              </Box>
            </Section>

            {/* 2. About Us */}
            <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <AboutPreview />
            </Section>

            {/* 3. Menu Preview */}
            <Section id="menu-preview-section" style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: { xs: "3rem", md: "4rem" }, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <Typography variant="h2" className="section-title" sx={{ color: "white", fontFamily: "'Libre Caslon Display', serif" }}>
                  OUR MENU
                </Typography>
                <Button variant="outlined" onClick={() => navigate("/menu")} endIcon={<ArrowForwardIcon />} sx={commonButtonStyle}>
                  EXPLORE MENU
                </Button>
              </Box>
            </Section>

            {/* 4. Other Sections (Fixed Errors: No longer empty/unused) */}
            <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <SpecialOfferSection />
            </Section>
            <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <PickupSection />
            </Section>
            <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <CateringSection />
            </Section>
            <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <ContactSection />
            </Section>
            <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
              <Footer />
            </Section>
          </StableScroll>
        </ScrollControls>

        {!isMobile && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        )}
      </Canvas>

      <LocationSelector open={locationSelectorOpen} onClose={() => setLocationSelectorOpen(false)} onSelectLocation={() => navigate("/menu")} />
      <SpecialsPopup open={specialsPopupOpen} onClose={() => setSpecialsPopupOpen(false)} />
    </Box>
  );
};

export default LandingStatic;