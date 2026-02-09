import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";
import Reusable3DBackground from "../common/Reusable3DBackground";
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
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "transparent",
        padding: "4rem 1rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Reusable3DBackground />

      <NavButtons onHome={() => navigate("/")} />

      {/* Hero / Header — editorial, warm */}
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
            fontSize: "clamp(0.75rem, 1.8vw, 0.9rem)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255, 200, 140, 0.95)",
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
            fontWeight: 500,
            lineHeight: 1.15,
            color: "rgba(255, 252, 245, 0.98)",
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          Moments we love{" "}
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(255, 180, 100, 0.98)",
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
              background: "linear-gradient(90deg, transparent, rgba(255, 180, 100, 0.6))",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(255, 180, 100, 0.7)",
            }}
          />
          <span
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(255, 180, 100, 0.4)",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(255, 180, 100, 0.5)",
            }}
          />
          <span
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(255, 180, 100, 0.6), transparent)",
            }}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.72)",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          A peek into our kitchen, our people, and the little things that make every visit feel like home.
        </motion.p>
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}
      >
        <ImageGallery />
      </motion.div>
    </div>
  );
};

export default AboutUs;
