import { useRef, useState, useEffect, Suspense, useCallback, type FC, type ReactNode } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import "./LandingPage.css";

// Assets
import logo from "../../assets/images/new_nanthus_kitchen_logo.png";
import heroImage from "../../assets/images/signature_dish_orb.png";

// Components
import OrderButton from "../common/OrderButton";
import LocationSelector from "../common/LocationSelector";
import AboutPreview from "./AboutPreview";
import SpecialOfferSection from "./SpecialOfferSection";
import PickupSection from "./PickupSection";
import CateringSection from "./CateringSection";
import ContactSection from "./ContactSection";
import Footer from "../footer/Footer";
import { commonButtonStyle } from "../common/ButtonStyles";
import SpecialsPopup from "./SpecialsPopup";
import ThreeBackground from "./ThreeBackground";
import MenuPreview from "./MenuPreview";

/* ─── Reusable Section wrapper ─── */
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
      py: { xs: 3, sm: 4, md: 5 },
      ...style,
    }}
  >
    {children}
  </Box>
);

/* ─── Stagger animation helpers ─── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.6 },
});

/* ─── Main Component ─── */
const LandingStatic: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollRef = useRef<HTMLDivElement>(null);

  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false);
  const [specialsPopupOpen, setSpecialsPopupOpen] = useState(false);

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
        position: "relative",
      }}
    >
      {/* Fixed Three.js Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
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
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>
          {!isMobile && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          )}
        </Canvas>
      </Box>

      {/* Top bar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          px: { xs: 2, md: 5 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2000,
          background: "linear-gradient(to bottom, rgba(5, 7, 10, 0.8) 0%, transparent 100%)",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            width: { xs: 44, md: 120 },
            cursor: "pointer",
            filter: "drop-shadow(0 0 10px rgba(197, 160, 89, 0.15))",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "scale(1.05)",
              filter: "drop-shadow(0 0 20px rgba(197, 160, 89, 0.3))",
            },
          }}
          onClick={() => {
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <OrderButton onClick={() => setLocationSelectorOpen(true)} />
      </Box>

      {/* Scrollable HTML Content */}
      <Box
        ref={scrollRef}
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
        {/* ════════════════════════════════════════════
            HERO SECTION — Modern Split Layout
            ════════════════════════════════════════════ */}
        <Box
          component="section"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, sm: 4, md: 8, lg: 12 },
            pt: { xs: 14, md: 0 },
            pb: { xs: 6, md: 0 },
            gap: { xs: 4, md: 6, lg: 8 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ── Mobile: Image first ── */}
          {isMobile && (
            <motion.div {...fadeUp(0.2)} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Box sx={{ position: "relative" }}>
                {/* Glow ring */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "115%",
                    height: "115%",
                    borderRadius: "50%",
                    border: "1px solid rgba(197, 160, 89, 0.12)",
                    boxShadow: "0 0 80px rgba(197, 160, 89, 0.06)",
                  }}
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Box
                    component="img"
                    src={heroImage}
                    alt="Signature dish"
                    sx={{
                      width: isSmall ? 220 : 280,
                      height: isSmall ? 220 : 280,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid rgba(197, 160, 89, 0.2)",
                      boxShadow: "0 0 60px rgba(197, 160, 89, 0.1), 0 30px 60px rgba(0,0,0,0.5)",
                    }}
                  />
                </motion.div>
              </Box>
            </motion.div>
          )}

          {/* ── Left: Text content ── */}
          <Box
            sx={{
              flex: { md: 1.1 },
              maxWidth: { md: "560px" },
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            {/* Overline */}
            <motion.div {...fadeUp(isMobile ? 0.4 : 0.3)}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: { xs: 2, md: 3 },
                }}
              >
                <Box sx={{ width: 32, height: "1px", bgcolor: "#C5A059" }} />
                <Typography
                  sx={{
                    color: "#C5A059",
                    letterSpacing: "0.35em",
                    fontSize: { xs: "0.6rem", md: "0.7rem" },
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Authentic Jaffna Cuisine
                </Typography>
                <Box sx={{ width: 32, height: "1px", bgcolor: "#C5A059" }} />
              </Box>
            </motion.div>

            {/* Brand Name */}
            <motion.div {...fadeUp(isMobile ? 0.5 : 0.5)}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4rem", lg: "4.5rem" },
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  mb: 0.5,
                }}
              >
                New Nanthu's
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4rem", lg: "4.5rem" },
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#C5A059",
                }}
              >
                Kitchen
              </Typography>
            </motion.div>

            {/* Tagline */}
            <motion.div {...fadeIn(isMobile ? 0.7 : 0.8)}>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.55)",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  lineHeight: 1.75,
                  mt: { xs: 2.5, md: 3 },
                  maxWidth: "420px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Where generations of Jaffna tradition meet modern culinary artistry.
                Every dish tells a story of heritage, love, and authentic Sri Lankan flavors.
              </Typography>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(isMobile ? 0.9 : 1.0)}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: { xs: 3, md: 4 },
                  flexDirection: { xs: "column", sm: "row" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Button
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "16px !important" }} />}
                  onClick={() => {
                    const menuSection = document.getElementById("menu-preview-section");
                    if (menuSection && scrollRef.current) {
                      scrollRef.current.scrollTo({ top: menuSection.offsetTop, behavior: "smooth" });
                    }
                  }}
                  sx={{
                    ...commonButtonStyle,
                    bgcolor: "#C5A059",
                    color: "#05070A",
                    borderColor: "#C5A059",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#D4AF37",
                      color: "#05070A",
                      borderColor: "#D4AF37",
                      transform: "translateY(-3px)",
                      boxShadow: "0 0 30px rgba(197, 160, 89, 0.3)",
                    },
                  }}
                >
                  Explore Menu
                </Button>
                <Button
                  onClick={() => setLocationSelectorOpen(true)}
                  sx={{
                    ...commonButtonStyle,
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "rgba(197, 160, 89, 0.08)",
                      borderColor: "#C5A059",
                      color: "#C5A059",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  Order Now
                </Button>
              </Box>
            </motion.div>

            {/* Location badges */}
            <motion.div {...fadeIn(isMobile ? 1.1 : 1.2)}>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 2, md: 3 },
                  mt: { xs: 3.5, md: 5 },
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                {["Scarborough", "Markham"].map((loc, i) => (
                  <Box key={loc} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {i > 0 && (
                      <Box
                        sx={{
                          width: "1px",
                          height: 14,
                          bgcolor: "rgba(255,255,255,0.15)",
                          mr: 1,
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                    )}
                    <LocationOnOutlinedIcon sx={{ color: "#C5A059", fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {loc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* ── Right: Hero Image (Desktop only) ── */}
          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Ambient glow */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "130%",
                  height: "130%",
                  background: "radial-gradient(circle, rgba(197, 160, 89, 0.06) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />

              {/* Decorative ring */}
              <motion.div
                {...fadeIn(0.4)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Box
                  sx={{
                    width: { md: 440, lg: 500 },
                    height: { md: 440, lg: 500 },
                    borderRadius: "50%",
                    border: "1px solid rgba(197, 160, 89, 0.1)",
                  }}
                />
              </motion.div>

              {/* Outer decorative ring */}
              <motion.div
                {...fadeIn(0.6)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Box
                  sx={{
                    width: { md: 520, lg: 580 },
                    height: { md: 520, lg: 580 },
                    borderRadius: "50%",
                    border: "1px dashed rgba(197, 160, 89, 0.06)",
                  }}
                />
              </motion.div>

              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Box
                    component="img"
                    src={heroImage}
                    alt="Signature dish"
                    sx={{
                      width: { md: 380, lg: 430 },
                      height: { md: 380, lg: 430 },
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid rgba(197, 160, 89, 0.2)",
                      boxShadow:
                        "0 0 80px rgba(197, 160, 89, 0.1), 0 40px 80px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.2)",
                      position: "relative",
                      zIndex: 2,
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Small accent dots */}
              {[
                { top: "15%", right: "10%", size: 6 },
                { bottom: "20%", left: "5%", size: 4 },
                { top: "40%", right: "2%", size: 3 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  {...fadeIn(1 + i * 0.15)}
                  style={{ position: "absolute", ...dot }}
                >
                  <Box
                    sx={{
                      width: dot.size,
                      height: dot.size,
                      borderRadius: "50%",
                      bgcolor: "rgba(197, 160, 89, 0.4)",
                      boxShadow: "0 0 8px rgba(197, 160, 89, 0.3)",
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          )}

          {/* Scroll indicator */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 20, md: 36 },
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <motion.div {...fadeIn(1.5)}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Scroll
              </Typography>
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Box
                sx={{
                  width: "1px",
                  height: 28,
                  background: "linear-gradient(to bottom, rgba(197, 160, 89, 0.5), transparent)",
                }}
              />
            </motion.div>
          </Box>
        </Box>

        {/* ════════════════════════════════════════════
            CONTENT SECTIONS
            ════════════════════════════════════════════ */}

        {/* 2. About Us */}
        <Section style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
          <AboutPreview />
        </Section>

        {/* 3. Menu Preview */}
        <Section id="menu-preview-section" style={{ paddingTop: 0, paddingBottom: 0, minHeight: "auto" }}>
          <MenuPreview />
        </Section>

        {/* 4. Other Sections */}
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
      </Box>

      <LocationSelector open={locationSelectorOpen} onClose={() => setLocationSelectorOpen(false)} onSelectLocation={() => navigate("/menu")} />
      <SpecialsPopup open={specialsPopupOpen} onClose={() => setSpecialsPopupOpen(false)} />
    </Box>
  );
};

export default LandingStatic;
