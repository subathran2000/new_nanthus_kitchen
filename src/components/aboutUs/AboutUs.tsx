import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";
import ImageGallery from "./ImageGallery";
import Sparkles from "../common/Sparkles";

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
        justifyContent: "center",
        background: "#001e36",
        padding: "4rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sparkles Background */}
      <Sparkles />

      {/* Home Button */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: { xs: "20px", md: "40px" },
          right: { xs: "20px", md: "40px" },
          bgcolor: "rgba(0, 255, 255, 0.1)",
          border: "2px solid rgba(0, 255, 255, 0.3)",
          color: "#00ffff",
          width: "50px",
          height: "50px",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)",
          zIndex: 1001,
          "&:hover": {
            bgcolor: "rgba(0, 255, 255, 0.2)",
            transform: "scale(1.1)",
            boxShadow:
              "0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)",
          },
        }}
      >
        <Home />
      </IconButton>

      {/* Title Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          maxWidth: "800px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: "900",
            background:
              "linear-gradient(135deg, #D9A756 0%, #f0c674 50%, #D9A756 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
            letterSpacing: "0.05em",
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          }}
        >
          OUR GALLERY
        </h1>
        <div
          style={{
            width: "120px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #D9A756, transparent)",
            margin: "0 auto 1.5rem",
          }}
        />
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#D9A756",
            opacity: 0.9,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: "700",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Discover Our Culinary Journey
        </p>
      </div>

      {/* Image Gallery */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ImageGallery />
      </div>
    </div>
  );
};

export default AboutUs;
