import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menuNew.css";
import MenuSpiral from "./MenuSpiral";
import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import InteractiveMenu from "./InteractiveMenu";

const MenuNew = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"gallery" | "spiral">("gallery");
  const [activeCategory, setActiveCategory] = useState<string>("");

  const handleClick = (type: string) => {
    setActiveCategory(type);
    setView("spiral");
  };

  const buttonStyle = {
    position: "fixed" as const,
    top: { xs: "20px", md: "40px" },
    bgcolor: "rgba(255, 140, 0, 0.1)",
    border: "2px solid rgba(255, 140, 0, 0.3)",
    color: "#FF8C00",
    width: { xs: "45px", sm: "45px", md: "50px" },
    height: { xs: "45px", sm: "45px", md: "50px" },
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow:
      "0 8px 32px rgba(255, 140, 0, 0.3), 0 0 20px rgba(255, 140, 0, 0.2)",
    zIndex: 2000,
    "&:hover": {
      bgcolor: "rgba(255, 140, 0, 0.2)",
      transform: "scale(1.1)",
      boxShadow:
        "0 0 30px rgba(255, 140, 0, 0.6), 0 0 60px rgba(255, 140, 0, 0.4)",
    },
  };

  return (
    <div className="menu-container">
      {view === "gallery" ? (
        <InteractiveMenu
          onSelectCategory={handleClick}
          onBack={() => navigate("/")}
          onHome={() => navigate("/")}
        />
      ) : (
        <>
          <IconButton
            onClick={() => setView("gallery")}
            aria-label="Back to menu selection"
            sx={{
              ...buttonStyle,
              left: { xs: "20px", md: "40px" },
            }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={() => navigate("/")}
            aria-label="Go to home page"
            sx={{
              ...buttonStyle,
              right: { xs: "20px", md: "40px" },
            }}
          >
            <HomeIcon />
          </IconButton>

          <MenuSpiral activeCategory={activeCategory} />
        </>
      )}
    </div>
  );
};

export default MenuNew;
