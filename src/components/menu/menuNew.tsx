import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menuNew.css";
import MenuSpiral from "./MenuSpiral";
import { Box } from "@mui/material";
import InteractiveMenu from "./InteractiveMenu";
import Reusable3DBackground from "../common/Reusable3DBackground";
import NavButtons from "../common/NavButtons";

const MenuNew = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"gallery" | "spiral">("gallery");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [panelOpen, setPanelOpen] = useState(false);

  const handleClick = (type: string) => {
    setActiveCategory(type);
    setView("spiral");
  };

  return (
    <Box
      className="menu-container"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: "#001e36",
        overflow: 'hidden'
      }}
    >
      <Reusable3DBackground />

      {/* Content Layer */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        {view === "gallery" ? (
          <InteractiveMenu
            onSelectCategory={handleClick}
            onBack={() => navigate("/")}
            onHome={() => navigate("/")}
          />
        ) : (
          <>
            {!panelOpen && (
              <NavButtons
                onBack={() => setView("gallery")}
                onHome={() => navigate("/")}
              />
            )}
            <MenuSpiral
              activeCategory={activeCategory}
              onPanelOpenChange={setPanelOpen}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default MenuNew;
