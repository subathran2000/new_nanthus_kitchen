import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NavButtons from "../common/NavButtons";
import { menuData } from "../../data/menuData";
import type { MealType } from "../../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Helper to get image for category
const getCategoryImage = (type: string) => {
  const match = menuData.find((cat) => cat.mealType.includes(type as MealType));
  return match?.imageUrl || "";
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

interface InteractiveMenuProps {
  onSelectCategory: (category: string) => void;
  onBack: () => void;
  onHome: () => void;
}

// Create motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function InteractiveMenu({
  onSelectCategory,
  onBack,
  onHome,
}: InteractiveMenuProps) {
  // Extract unique menu types
  const menuTypes = Array.from(new Set(menuData.flatMap((d) => d.mealType)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
        mass: 0.8,
      },
    },
  };

  const descriptions: Record<string, string> = {
    Breakfast: "Start your morning with authentic flavors",
    Lunch: "Savor our signature afternoon selections",
    Dinner: "An exquisite evening dining experience",
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
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 4 },
      }}
    >
      <NavButtons onBack={onBack} onHome={onHome} />

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1200,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, md: 5 },
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 1, md: 2 } }}>
          <MotionTypography
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              color: "#F5A623",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontSize: { xs: "0.7rem", md: "0.8rem" },
              mb: 1,
            }}
          >
            Our Kitchen
          </MotionTypography>
          <MotionTypography
            variant="h2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            sx={{
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              textAlign: "center",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
            }}
          >
            Choose Your Menu
          </MotionTypography>
          <MotionBox
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={{
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #3B82F6, #F5A623)",
              mx: "auto",
              mt: 2,
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Cards Grid */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            width: "100%",
            maxWidth: 1100,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fit, minmax(280px, 1fr))",
            },
            gap: { xs: 3, md: 4 },
            justifyContent: "center",
          }}
        >
          {menuTypes.map((type) => (
            <MotionBox
              key={type}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(type)}
              sx={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: { xs: "16/10", sm: "4/5" },
                minHeight: { xs: 220, sm: 360 },
                background: `url(${getCategoryImage(type)}) center/cover no-repeat`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(59, 130, 246, 0.15)",
                  "& .card-overlay": {
                    background:
                      "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.4) 50%, rgba(10,22,40,0.1) 100%)",
                  },
                  "& .card-accent-line": {
                    width: "80%",
                    opacity: 1,
                  },
                  "& .card-arrow": {
                    transform: "translateX(4px)",
                    bgcolor: "#F5A623",
                    color: "#0A1628",
                    borderColor: "#F5A623",
                  },
                  "& .card-image-glow": {
                    opacity: 0.3,
                  },
                },
              }}
            >
              {/* Blue glow on hover */}
              <Box
                className="card-image-glow"
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                  zIndex: 1,
                }}
              />

              {/* Gradient Overlay */}
              <Box
                className="card-overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.3) 40%, rgba(10,22,40,0.05) 100%)",
                  transition: "background 0.5s ease",
                  zIndex: 2,
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: { xs: 3, md: 3.5 },
                  zIndex: 3,
                }}
              >
                {/* Accent line */}
                <Box
                  className="card-accent-line"
                  sx={{
                    width: "40px",
                    height: 3,
                    background: "linear-gradient(90deg, #F5A623, #3B82F6)",
                    borderRadius: 2,
                    mb: 2,
                    opacity: 0.8,
                    transition: "all 0.4s ease",
                  }}
                />

                {/* Category Label */}
                <Typography
                  sx={{
                    color: "rgba(245,166,35,0.9)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                    mb: 0.5,
                  }}
                >
                  {getCategoryItemCount(type)}+ dishes
                </Typography>

                {/* Title */}
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: { xs: "1.8rem", md: "2rem" },
                    letterSpacing: "0.03em",
                    mb: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {type}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    color: "rgba(180, 210, 255, 0.7)",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    mb: 2,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {descriptions[type] ||
                    `Explore our ${type.toLowerCase()} offerings`}
                </Typography>

                {/* CTA Row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#F5A623",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Explore Menu
                  </Typography>
                  <Box
                    className="card-arrow"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid rgba(245,166,35,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#F5A623",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </MotionBox>
      </Box>
    </Box>
  );
}
