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
import logoReflect from "../../assets/images/restaurant.jpg";

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
import HeroImageGrid from "./HeroImageGrid";
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

  // Memoize the scroll container style to prevent recreation
  const scrollStyle = useMemo(
    () => ({ width: "100vw", overflowX: "hidden" as const }),
    [],
  );

  // Handle WebGL context loss gracefully
  const handleCanvasCreated = useCallback(({ gl }: { gl: import("three").WebGLRenderer }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
    });
  }, []);

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
        bgcolor: "#0A1628", // Warm dark base
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
            filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.2))",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "scale(1.05)",
              filter: "drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))",
            },
          }}
          onClick={() => {
            const scrollContainer = document.querySelector(
              ".lucide-scroll-container",
            );
            if (scrollContainer) {
              scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      {/* 
        3D CANVAS & CONTENT 
      */}
      <Canvas
        key="landing-canvas"
        camera={{
          position: [0, 0, 5],
          fov: isMobile ? 75 : 50,
        }}
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
        <color attach="background" args={["#0A1628"]} />
        <fog attach="fog" args={["#060E1A", 8, 30]} />

        <ScrollControls
          key="landing-scroll-controls"
          pages={isMobile ? 12 : 11}
          damping={0.15}
        >
          {/* Internal components can access useScroll now */}
          {!isMobile && <ScrollSync scrollbarRef={scrollbarRef} />}

          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>

          {/* StableScroll wrapper suppresses createRoot() warnings from drei in React 19 */}
          <StableScroll html style={scrollStyle}>
            {/* 1. Hero Section */}
            <Section
              style={{
                minHeight: "100vh",
                height: "100vh",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                overflow: "visible",
                paddingTop: 0,
                paddingBottom: 0,
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
                  px: { xs: 2, sm: 3, md: 10 },
                  pt: { xs: 8, sm: 10, md: 0 },
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
                      height: { xs: "32vh", sm: "40vh" },
                      position: "relative",
                      mt: { xs: 1.5, sm: 2 },
                      mb: { xs: 1, sm: 2 },
                    }}
                  >
                    <HeroImageGrid
                      variant="mobile-bottom"
                      onSpecialsClick={() => setSpecialsPopupOpen(true)}
                    />
                  </Box>

                  <Button
                    onClick={() => {
                      const menuSection = document.getElementById(
                        "menu-preview-section",
                      );
                      const scrollContainer = document.querySelector(
                        ".lucide-scroll-container",
                      );
                      if (menuSection && scrollContainer) {
                        scrollContainer.scrollTo({
                          top: menuSection.offsetTop,
                          behavior: "smooth",
                        });
                      }
                    }}
                    sx={{
                      mt: { xs: 3, md: 5 },
                      ...commonButtonStyle,
                    }}
                  >
                    DIVE IN
                  </Button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 3, duration: 2 }}
                    style={{ marginTop: "4rem" }}
                  >
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "1px",
                          height: "60px",
                          background:
                            "linear-gradient(to bottom, #3B82F6, transparent)",
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
            <Section
              style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}
            >
              <AboutPreview />
            </Section>

            {/* 3. Menu preview — transparent background */}
            <Section
              id="menu-preview-section"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: "auto",
                background: "transparent",
              }}
            >
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
                    <Box sx={{ width: 24, height: 1, bgcolor: "#F5A623" }} />
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#F5A623",
                        letterSpacing: "0.5em",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      EXPLORE OUR FLAVORS
                    </Typography>
                    <Box sx={{ width: 24, height: 1, bgcolor: "#F5A623" }} />
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
                    gap: { xs: 3, sm: 4, md: 6 },
                  }}
                >
                  {/* Image block */}
                  <Box
                    sx={{
                      width: isMobile ? "100%" : "82%",
                      height: { xs: "240px", sm: "360px", md: "520px" },
                      background: `url(${logoReflect}) center/cover no-repeat`,
                      borderRadius: { xs: "16px", md: "32px" },
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
                          "linear-gradient(160deg, rgba(10, 22, 40, 0.15), transparent 50%)",
                      }}
                    />
                  </Box>

                  {/* Text block — transparent, no card fill */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "420px" },
                      background: "transparent",
                      padding: { xs: "1rem 0", md: "1.5rem 0" },
                      borderLeft: {
                        xs: "none",
                        md: "3px solid rgba(59, 130, 246, 0.6)",
                      },
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
                        color: "rgba(245, 166, 35, 0.95)",
                        letterSpacing: "0.35em",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      OUR CRAFT
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: { xs: "1.65rem", md: "2.5rem" },
                        color: "#fff",
                        lineHeight: 1.2,
                        "& span": { color: "#F5A623", mx: 0.5 },
                      }}
                    >
                      TRADITION <span>&</span> FLAVOR
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
                      From aromatic Biryanis and signature Kothu to
                      traditional Jaffna curries, every dish is crafted
                      with authentic spices and fresh ingredients to
                      bring you a true taste of home.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/menu")}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        ...commonButtonStyle,
                        width: { xs: "100%", md: "auto" },
                      }}
                    >
                      EXPLORE MENU
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Section>

            {/* 4. Specials, Pickup, Catering, Contact, Footer */}
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
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: "auto",
              }}
            >
              <ContactSection />
            </Section>

            <Section
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                minHeight: "auto",
                justifyContent: "flex-start",
                marginBottom: 0,
              }}
            >
              <Footer />
            </Section>
          </StableScroll>
        </ScrollControls>

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

      <LocationSelector
        open={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
        onSelectLocation={() => {
          setLocationSelectorOpen(false);
          navigate("/menu");
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
