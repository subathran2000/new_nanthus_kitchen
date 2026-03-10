import { useRef, useState, useEffect, Suspense, useCallback, type FC, type ReactNode } from "react";
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
import { ROUTES } from "../../constants/routes";
import { Canvas } from "@react-three/fiber";
import type { WebGLRenderer } from "three";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import ErrorBoundary from "../common/ErrorBoundary";
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
import Footer from "../footer/Footer";
import TypewriterText from "../common/TypewriterText";
import { commonButtonStyle } from "../common/ButtonStyles";
import SpecialsPopup from "./SpecialsPopup";
import { CustomScrollbarUI } from "../common/CustomScrollbar";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const progress = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
    scrollProgressRef.current = Math.max(0, Math.min(1, progress));
    if (scrollbarRef.current) {
      const TRACK_HEIGHT = 300;
      const THUMB_HEIGHT = 60;
      const y = progress * (TRACK_HEIGHT - THUMB_HEIGHT);
      if (!isNaN(y)) {
        scrollbarRef.current.style.transform = `translate(-50%, ${y}px)`;
      }
    }
  }, []);

  const handleCanvasCreated = useCallback(({ gl }: { gl: WebGLRenderer }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e: Event) => {
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

      {/* Top bar */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          left: 0,
          right: 0,
          px: { xs: 2, md: 5 },
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
            scrollContainerRef.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      {/* Fixed 3D Background */}
      {prefersReducedMotion ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            background:
              "radial-gradient(ellipse at center, #0F1218 0%, #05070A 100%)",
          }}
        />
      ) : (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <ErrorBoundary fallback={<></>}>
            <Canvas
              key="landing-canvas"
              camera={{ position: [0, 0, 5], fov: isMobile ? 75 : 50 }}
              shadows
              dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
              gl={{
                powerPreference: "high-performance",
                antialias: !isMobile,
                stencil: false,
                depth: true,
              }}
              onCreated={handleCanvasCreated}
              style={{ width: "100%", height: "100%" }}
            >
              <color attach="background" args={["#05070A"]} />
              <fog attach="fog" args={["#000000", 8, 30]} />
              <Suspense fallback={null}>
                <ThreeBackground scrollProgressRef={scrollProgressRef} />
              </Suspense>
              {!isMobile && (
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
              )}
            </Canvas>
          </ErrorBoundary>
        </Box>
      )}

      {/* Scrollable HTML Content */}
      <Box
        ref={scrollContainerRef}
        onScroll={handleScroll}
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
            {/* 1. Hero Section - Centered with Interaction */}
            <Section
              style={{
                minHeight: "100vh",
                height: "100vh",
                justifyContent: "center",
              }}
            >
              <Box
                component={motion.div}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { staggerChildren: 0.3 },
                  },
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
                    animate: { y: 0, opacity: 1 },
                  }}
                >
                  <TypewriterText
                    text="New"
                    className="accent-label"
                    delay={0.5}
                  />
                </motion.div>

                {/* This container handles the interaction between the two main words */}
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    variants={{
                      initial: { x: -50, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <TypewriterText
                      text="NANTHU'S"
                      as="h2"
                      className="main-title"
                      delay={1.2}
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      initial: { x: 50, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ marginTop: "20px" }} // Pulls them closer together
                  >
                    <TypewriterText
                      text="KITCHEN"
                      as="h2"
                      className="main-title"
                      style={{
                        color: "#D4AF37",
                        background: "none",
                        WebkitTextFillColor: "#D4AF37",
                      }}
                      delay={1.8}
                    />
                  </motion.div>
                </Box>

                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                  }}
                  transition={{ delay: 2.5 }}
                >
                  <TypewriterText
                    text="Authentic Sri Lankan Cuisine"
                    as="p"
                    className="subtitle-tagline"
                    delay={2.5}
                  />
                </motion.div>

                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const menuSection = document.getElementById(
                      "menu-preview-section",
                    );
                    if (menuSection && scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({
                        top: menuSection.offsetTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                  sx={{ mt: { xs: 3, md: 5 }, ...commonButtonStyle }}
                >
                  DIVE IN
                </Button>
              </Box>
            </Section>

            {/* 2. About Us */}
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <AboutPreview />
            </Section>

            {/* 3. Menu Preview */}
            <Section
              id="menu-preview-section"
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 1200,
                  mx: "auto",
                  py: { xs: "3rem", md: "4rem" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Typography
                  variant="h2"
                  className="section-title"
                  sx={{
                    color: "white",
                    fontFamily: "'Libre Caslon Display', serif",
                  }}
                >
                  OUR MENU
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(ROUTES.MENU)}
                  endIcon={<ArrowForwardIcon />}
                  sx={commonButtonStyle}
                >
                  EXPLORE MENU
                </Button>
              </Box>
            </Section>

            {/* 4. Other Sections (Fixed Errors: No longer empty/unused) */}
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <SpecialOfferSection />
            </Section>
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <PickupSection />
            </Section>
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <CateringSection />
            </Section>
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <ContactSection />
            </Section>
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <Footer />
            </Section>
      </Box>

      <LocationSelector
        open={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
        onSelectLocation={() => navigate(ROUTES.MENU)}
      />
      <SpecialsPopup
        open={specialsPopupOpen}
        onClose={() => setSpecialsPopupOpen(false)}
      />
    </Box>
  );
};

export default LandingStatic;