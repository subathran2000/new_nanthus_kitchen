import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NavButtons from "../common/NavButtons";
import { menuData } from "../../data/menuData";
import type { MealType } from "../../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const GOLD = "#C5A059";
const GOLD_LIGHT = "#E2C284";
const OBSIDIAN = "#05070A";

const keyframeStyles = `
@keyframes menuCardShimmer {
  0% { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}
`;

// Helper to get image for category — prefers HTTP URLs for quality
const getCategoryImage = (type: string) => {
  const categories = menuData.filter((cat) =>
    cat.mealType.includes(type as MealType)
  );
  if (!categories.length) return "";
  const offsets: Record<string, number> = { Breakfast: 0, Lunch: 0, Dinner: 1 };
  const start = offsets[type] ?? 0;
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[(start + i) % categories.length];
    if (cat.imageUrl.startsWith("http")) return cat.imageUrl;
  }
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[(start + i) % categories.length];
    for (const sub of cat.subCategories) {
      for (const item of sub.items) {
        if (item.imageUrl?.startsWith("http")) return item.imageUrl;
      }
    }
  }
  return categories[0].imageUrl;
};

// Get item count per category
const getCategoryItemCount = (type: string) => {
  const categories = menuData.filter((cat) =>
    cat.mealType.includes(type as MealType),
  );
  return categories.reduce(
    (acc, cat) =>
      acc + cat.subCategories.reduce((a, sub) => a + sub.items.length, 0),
    0,
  );
};

// Get category count per type
const getCategoryCount = (type: string) => {
  return menuData.filter((cat) => cat.mealType.includes(type as MealType)).length;
};

interface InteractiveMenuProps {
  onSelectCategory: (category: string) => void;
  onBack: () => void;
  onHome: () => void;
}

const MotionBox = motion(Box);

/* ——— MealCard Component ——— */
const MealCard: React.FC<{
  type: string;
  index: number;
  description: string;
  timeRange: string;
  onSelect: () => void;
}> = ({ type, index, description, timeRange, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const itemCount = getCategoryItemCount(type);
  const catCount = getCategoryCount(type);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        delay: index * 0.12 + 0.3,
        duration: 0.7,
        type: "spring",
        stiffness: 80,
        damping: 18,
      }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        aspectRatio: { xs: "4/5", sm: "3/4.5" },
        minHeight: { xs: 330, sm: 380, md: 440 },
        border: `1.5px solid ${hovered ? `${GOLD}44` : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 35px ${GOLD}10, 0 35px 80px rgba(0,0,0,0.6)`
          : "0 20px 50px rgba(0,0,0,0.4)",
        transition: "border-color 0.5s ease, box-shadow 0.6s ease",
      }}
    >
      {/* Background image with zoom */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `url(${getCategoryImage(type)}) center/cover no-repeat`,
          transition:
            "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          filter: hovered
            ? "brightness(1.1) saturate(1.25)"
            : "brightness(0.95) saturate(1)",
        }}
      />

      {/* Cinematic gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.15) 30%, rgba(5,10,20,0.75) 60%, ${OBSIDIAN}FA 100%)`
            : `linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.1) 35%, rgba(5,10,20,0.65) 60%, ${OBSIDIAN}F2 100%)`,
          zIndex: 1,
          pointerEvents: "none",
          transition: "background 0.6s ease",
        }}
      />

      {/* Shimmer sweep */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 2,
          pointerEvents: "none",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${GOLD}22, transparent)`,
            transform: "translateX(-100%) rotate(25deg)",
            animation: hovered ? "menuCardShimmer 1.5s ease-in-out" : "none",
          },
        }}
      />

      {/* Index badge — top left */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 5,
          width: 36,
          height: 36,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(5,10,20,0.55)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${hovered ? `${GOLD}44` : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.5s ease",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.72rem",
            color: hovered ? GOLD_LIGHT : "rgba(255,255,255,0.4)",
            transition: "color 0.4s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>
      </Box>

      {/* Dish count chip — top right */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.2,
          py: 0.5,
          borderRadius: "10px",
          bgcolor: "rgba(5,10,20,0.6)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${hovered ? `${GOLD}33` : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.5s ease",
        }}
      >
        <LocalDiningIcon
          sx={{
            fontSize: 12,
            color: hovered ? GOLD : "rgba(197,160,89,0.5)",
            transition: "color 0.4s ease",
          }}
        />
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
            transition: "color 0.4s ease",
          }}
        >
          {itemCount} Dishes
        </Typography>
      </Box>

      {/* Bottom glass content panel */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          mt: "auto",
          mx: { xs: 1, sm: 1.5 },
          mb: { xs: 1, sm: 1.5 },
          px: { xs: 2, sm: 2.5 },
          py: { xs: 1.5, sm: 2 },
          borderRadius: "18px",
          background: hovered ? "rgba(5,10,20,0.96)" : "rgba(5,10,20,0.78)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: `1px solid ${hovered ? `${GOLD}55` : "rgba(255,255,255,0.1)"}`,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "translateY(-10px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 25px 60px rgba(0,0,0,0.7), inset 0 0 20px ${GOLD}10`
            : "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top accent line */}
        <Box
          sx={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: hovered ? "60%" : "20%",
            height: "2px",
            borderRadius: 1,
            background: `linear-gradient(90deg, transparent, ${GOLD} 30%, ${GOLD_LIGHT} 70%, transparent)`,
            opacity: hovered ? 0.8 : 0.35,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Title */}
        <Typography
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "1.4rem", md: "1.65rem" },
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hovered ? GOLD_LIGHT : "#fff",
            textShadow: hovered
              ? `0 3px 20px ${GOLD}55`
              : "0 2px 10px rgba(0,0,0,0.6)",
            textAlign: "center",
            lineHeight: 1.1,
            mb: 0.8,
            transition: "all 0.5s ease",
          }}
        >
          {type}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            lineHeight: 1.5,
            mb: 1.2,
          }}
        >
          {description}
        </Typography>

        {/* Time pill + stats */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 1.2,
          }}
        >
          {timeRange && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.4,
                px: 1,
                py: 0.3,
                borderRadius: "8px",
                bgcolor: hovered ? `${GOLD}12` : "rgba(255,255,255,0.03)",
                border: `1px solid ${hovered ? `${GOLD}33` : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.4s ease",
              }}
            >
              <AccessTimeIcon
                sx={{
                  fontSize: 11,
                  color: hovered ? GOLD : "rgba(197,160,89,0.5)",
                  transition: "color 0.4s ease",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.55rem",
                  fontWeight: 500,
                  color: hovered
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.35)",
                  letterSpacing: "0.04em",
                  transition: "color 0.4s ease",
                }}
              >
                {timeRange}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.15)",
            }}
          />
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            {catCount} categories
          </Typography>
        </Box>

        {/* Explore CTA */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              px: 2,
              py: 0.6,
              borderRadius: "10px",
              border: `1px solid ${hovered ? `${GOLD}55` : "rgba(255,255,255,0.08)"}`,
              bgcolor: hovered ? `${GOLD}10` : "transparent",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: hovered ? GOLD_LIGHT : "rgba(255,255,255,0.3)",
                transition: "color 0.4s ease",
              }}
            >
              Explore Menu
            </Typography>
            <ArrowForwardIcon
              sx={{
                fontSize: 13,
                color: hovered ? GOLD : "rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
                transform: hovered ? "translateX(3px)" : "translateX(0)",
              }}
            />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default function InteractiveMenu({
  onSelectCategory,
  onBack,
  onHome,
}: InteractiveMenuProps) {
  const menuTypes = Array.from(new Set(menuData.flatMap((d) => d.mealType)));

  const descriptions: Record<string, string> = {
    Breakfast: "Start your morning with authentic flavors",
    Lunch: "Savor our signature afternoon selections",
    Dinner: "An exquisite evening dining experience",
  };

  const timeRanges: Record<string, string> = {
    Breakfast: "7 AM – 11 AM",
    Lunch: "11 AM – 4 PM",
    Dinner: "4 PM – 10 PM",
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "transparent",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2, md: 4 },
        py: { xs: 5, md: 4 },
      }}
    >
      <style>{keyframeStyles}</style>
      <NavButtons onBack={onBack} onHome={onHome} />

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2.5, md: 3.5 },
        }}
      >
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          sx={{ textAlign: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: 1,
                height: 20,
                background: `linear-gradient(180deg, transparent, ${GOLD})`,
                borderRadius: 1,
              }}
            />
            <Typography
              sx={{
                color: GOLD,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontSize: { xs: "0.6rem", md: "0.7rem" },
              }}
            >
              Our Kitchen
            </Typography>
            <Box
              sx={{
                width: 1,
                height: 20,
                background: `linear-gradient(180deg, ${GOLD}, transparent)`,
                borderRadius: 1,
              }}
            />
          </Box>
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              mb: 0.8,
            }}
          >
            Choose Your Menu
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'Inter', sans-serif",
              fontSize: { xs: "0.75rem", md: "0.82rem" },
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Select a meal time to explore our authentic Jaffna cuisine
          </Typography>
        </MotionBox>

        {/* Cards Grid */}
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: { xs: 2, sm: 2, md: 2.5 },
          }}
        >
          {menuTypes.map((type, i) => (
            <MealCard
              key={type}
              type={type}
              index={i}
              description={descriptions[type] || `Explore our ${type.toLowerCase()} offerings`}
              timeRange={timeRanges[type] || ""}
              onSelect={() => onSelectCategory(type)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
