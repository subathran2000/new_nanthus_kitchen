import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../../constants/routes";
import ImageGallery from "./ImageGallery";
import NavButtons from "../common/NavButtons";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#F5F7FA",
        padding: "4rem 1rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <NavButtons onHome={() => navigate(ROUTES.HOME)} />

      {/* Hero / Header */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          maxWidth: "720px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.span
          variants={fadeUp}
          style={{
            display: "inline-block",
            fontSize: "clamp(0.75rem, 1.8vw, 0.85rem)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#F5A623",
            marginBottom: "1rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Our Gallery
        </motion.span>

        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.6rem, 7vw, 4.2rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#1A1D23",
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          Moments we love{" "}
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "#F5A623",
            }}
          >
            to share
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: "40px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #2B7DE9)",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#F5A623",
            }}
          />
          <span
            style={{
              width: "60px",
              height: "1px",
              background: "#E2E6ED",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#2B7DE9",
            }}
          />
          <span
            style={{
              width: "40px",
              height: "1px",
              background:
                "linear-gradient(90deg, #2B7DE9, transparent)",
            }}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "#5A6177",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          A peek into our kitchen, our people, and the little things that make
          every visit feel like home.
        </motion.p>
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageGallery />
      </motion.div>
    </Box>
  );
};

export default AboutUs;
