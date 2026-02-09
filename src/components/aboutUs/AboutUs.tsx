import { useNavigate } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import Reusable3DBackground from "../common/Reusable3DBackground";
import NavButtons from "../common/NavButtons";

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
        background: "transparent",
        padding: "4rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Reusable3DBackground />

      <NavButtons onHome={() => navigate("/")} />

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
              "linear-gradient(135deg, #FF8C00 0%, #ff9f1a 50%, #FF8C00 100%)",
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
              "linear-gradient(90deg, transparent, #FF8C00, transparent)",
            margin: "0 auto 1.5rem",
          }}
        />
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#FF8C00",
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
