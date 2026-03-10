import { useState, useRef, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import { menuData } from "../../data/menuData";
import type { MainCategory } from "../../types";

const GOLD = "#C5A059";
const GOLD_LIGHT = "#E2C284";
const OBSIDIAN = "#050A14";

interface MenuSpiralProps {
  activeCategory?: string;
  onPanelOpenChange?: (open: boolean) => void;
}

const MotionBox = motion.create(Box);

const keyframes = `
@keyframes shimmer-sweep {
  0% { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}
@keyframes glow-breathe {
  0%, 100% { opacity: 0.04; }
  50% { opacity: 0.1; }
}
@keyframes border-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}
`;

/* 
   Category Card  used inside the floating window
    */
const CategoryCard: FC<{
  item: MainCategory;
  index: number;
  onSelect: () => void;
}> = ({ item, index, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  const totalItems = item.subCategories.reduce(
    (sum, sub) => sum + sub.items.length,
    0,
  );
  const popularItems = item.subCategories.reduce(
    (sum, sub) => sum + sub.items.filter((i) => i.popular).length,
    0,
  );

  return (
    <MotionBox
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.06 + 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 18,
      }}
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 350, damping: 22 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "3/4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        border: `1.5px solid ${hovered ? `${GOLD}44` : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 30px ${GOLD}10, 0 25px 60px rgba(0,0,0,0.5)`
          : "0 12px 35px rgba(0,0,0,0.35)",
        transition: "border-color 0.5s ease, box-shadow 0.6s ease",
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `url(${item.imageUrl}) center/cover no-repeat`,
          transition:
            "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          filter: hovered
            ? "brightness(1.1) saturate(1.2)"
            : "brightness(0.9) saturate(1)",
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.2) 30%, rgba(5,10,20,0.75) 60%, ${OBSIDIAN}FA 100%)`
            : `linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.1) 35%, rgba(5,10,20,0.65) 60%, ${OBSIDIAN}F2 100%)`,
          zIndex: 1,
          pointerEvents: "none",
          transition: "background 0.5s ease",
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
            animation: hovered ? "shimmer-sweep 1.5s ease-in-out" : "none",
          },
        }}
      />

      {/* Index badge  top left */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 5,
          width: 30,
          height: 30,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(5,10,20,0.5)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? `${GOLD}44` : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.4s ease",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            color: hovered ? GOLD_LIGHT : "rgba(255,255,255,0.4)",
            transition: "color 0.3s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>
      </Box>

      {/* Dish count  top right */}
      <Chip
        icon={
          <LocalDiningIcon
            sx={{ fontSize: 12, color: `${GOLD} !important` }}
          />
        }
        label={`${totalItems}`}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 5,
          bgcolor: "rgba(5,10,20,0.55)",
          color: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${hovered ? `${GOLD}33` : "rgba(255,255,255,0.06)"}`,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "0.6rem",
          letterSpacing: "0.06em",
          height: 24,
          transition: "all 0.4s ease",
          "& .MuiChip-icon": { ml: 0.5 },
        }}
      />

      {/* Bottom glass content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          mx: 1,
          mb: 1,
          px: { xs: 1.5, sm: 2 },
          py: { xs: 1.2, sm: 1.5 },
          borderRadius: "14px",
          background: hovered ? "rgba(5,10,20,0.95)" : "rgba(5,10,20,0.75)",
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          border: `1px solid ${hovered ? `${GOLD}55` : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.6), inset 0 0 15px ${GOLD}08`
            : "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        {/* Gold accent line */}
        <Box
          sx={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: hovered ? "60%" : "18%",
            height: "2px",
            borderRadius: 1,
            background: `linear-gradient(90deg, transparent, ${GOLD} 30%, ${GOLD_LIGHT} 70%, transparent)`,
            opacity: hovered ? 0.8 : 0.3,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Title */}
        <Typography
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hovered ? GOLD_LIGHT : "#fff",
            textShadow: hovered
              ? `0 2px 15px ${GOLD}55`
              : "0 2px 10px rgba(0,0,0,0.6)",
            textAlign: "center",
            lineHeight: 1.15,
            mb: 0.6,
            transition: "all 0.4s ease",
          }}
        >
          {item.title}
        </Typography>

        {/* Subcategory chips */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0.4,
            mb: 0.6,
          }}
        >
          {item.subCategories.slice(0, 2).map((sub, sIdx) => (
            <Chip
              key={sIdx}
              label={sub.title}
              size="small"
              sx={{
                height: 18,
                bgcolor: hovered ? `${GOLD}12` : "rgba(255,255,255,0.04)",
                color: hovered ? GOLD_LIGHT : "rgba(255,255,255,0.35)",
                fontSize: "0.5rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                border: `1px solid ${hovered ? `${GOLD}28` : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.3s ease",
                "& .MuiChip-label": { px: 0.6 },
              }}
            />
          ))}
          {item.subCategories.length > 2 && (
            <Chip
              label={`+${item.subCategories.length - 2}`}
              size="small"
              sx={{
                height: 18,
                bgcolor: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.5rem",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.04)",
                "& .MuiChip-label": { px: 0.5 },
              }}
            />
          )}
        </Box>

        {/* Stats row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.52rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              transition: "color 0.3s ease",
            }}
          >
            {item.subCategories.length}{" "}
            {item.subCategories.length === 1 ? "category" : "categories"}
          </Typography>
          {popularItems > 0 && (
            <>
              <Box
                sx={{
                  width: 2.5,
                  height: 2.5,
                  borderRadius: "50%",
                  bgcolor: `${GOLD}44`,
                }}
              />
              <Typography
                sx={{
                  color: hovered ? GOLD : "rgba(197,160,89,0.4)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.52rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  transition: "color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                }}
              >
                <StarIcon sx={{ fontSize: 9 }} />
                {popularItems} popular
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </MotionBox>
  );
};

/* 
   Food Item Card
    */
const FoodItemCard: FC<{
  menuItem: {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    popular?: boolean;
  };
  itemIdx: number;
  baseDelay: number;
}> = ({ menuItem, itemIdx, baseDelay }) => {
  const [isItemHovered, setIsItemHovered] = useState(false);

  return (
    <ListItem
      component={motion.li}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: baseDelay + itemIdx * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 90,
        damping: 16,
      }}
      disablePadding
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
      sx={{
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        border: `1px solid ${isItemHovered ? `${GOLD}55` : "rgba(255,255,255,0.06)"}`,
        background: isItemHovered
          ? `linear-gradient(135deg, rgba(197,160,89,0.06) 0%, rgba(5,10,20,0.95) 100%)`
          : "rgba(255,255,255,0.015)",
        "&:hover": {
          transform: "translateY(-6px) scale(1.01)",
          boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${GOLD}0A`,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {/* Image with overlay */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            overflow: "hidden",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `url(${menuItem.imageUrl}) center/cover no-repeat`,
              transition:
                "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
              transform: isItemHovered ? "scale(1.1)" : "scale(1)",
              filter: isItemHovered
                ? "brightness(1.1) saturate(1.15)"
                : "brightness(0.95)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, transparent 40%, ${OBSIDIAN}E8 100%)`,
              pointerEvents: "none",
            }}
          />
          {menuItem.popular && (
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: baseDelay + itemIdx * 0.05 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
              sx={{ position: "absolute", top: 12, left: 12, zIndex: 3 }}
            >
              <Chip
                icon={
                  <WhatshotIcon
                    sx={{ fontSize: 13, color: "#FF6B35 !important" }}
                  />
                }
                label="POPULAR"
                size="small"
                sx={{
                  height: 26,
                  bgcolor: "rgba(255, 107, 53, 0.15)",
                  color: "#FF9A6C",
                  fontSize: "0.6rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  border: "1px solid rgba(255, 107, 53, 0.3)",
                  backdropFilter: "blur(12px)",
                  "& .MuiChip-label": { px: 0.8, pr: 1 },
                  "& .MuiChip-icon": { ml: 0.5 },
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              right: 12,
              zIndex: 3,
              bgcolor: "rgba(5, 10, 20, 0.85)",
              backdropFilter: "blur(16px)",
              color: GOLD_LIGHT,
              border: `1px solid ${GOLD}44`,
              px: 1.8,
              py: 0.6,
              borderRadius: "12px",
              fontWeight: 800,
              fontSize: "0.88rem",
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.03em",
              transition: "all 0.4s ease",
              boxShadow: isItemHovered
                ? `0 4px 20px ${GOLD}25`
                : "0 4px 15px rgba(0,0,0,0.4)",
            }}
          >
            {menuItem.price}
          </Box>
        </Box>
        <Box sx={{ px: 2, py: 1.8 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              sx={{
                color: isItemHovered ? GOLD_LIGHT : "#fff",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.05rem" },
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.01em",
                transition: "color 0.3s ease",
                flex: 1,
              }}
            >
              {menuItem.name}
            </Typography>
            {menuItem.popular && (
              <StarIcon sx={{ fontSize: 16, color: GOLD, flexShrink: 0 }} />
            )}
          </Box>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {menuItem.description}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

/* 
   Side Panel  shows food items for a category
    */
const SidePanel: FC<{
  sidePanelRef: React.RefObject<HTMLDivElement | null>;
  selectedCategory: MainCategory | null;
  onClose: () => void;
}> = ({ sidePanelRef, selectedCategory, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const subCategories = selectedCategory?.subCategories || [];
  const hasMultipleSubs = subCategories.length > 1;
  const currentItems = hasMultipleSubs
    ? subCategories[activeTab]?.items || []
    : subCategories[0]?.items || [];
  const allItems = subCategories.flatMap((sub) => sub.items);
  const totalItems = allItems.length;
  const popularCount = allItems.filter((item) => item.popular).length;

  return (
    <Box
      ref={sidePanelRef}
      component={motion.div}
      initial={{ x: "-100%", opacity: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 55, damping: 18, mass: 1 }}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: { xs: "100%", md: "70%" },
        height: "100vh",
        bgcolor: "rgba(5, 8, 16, 0.98)",
        backdropFilter: "blur(30px)",
        zIndex: 2000,
        borderRight: `1px solid ${GOLD}25`,
        boxShadow: `30px 0 80px rgba(0,0,0,0.6), 0 0 60px ${GOLD}08`,
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* Top glow line */}
      <Box
        component={motion.div}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LIGHT} 50%, ${GOLD} 80%, transparent 100%)`,
          transformOrigin: "left",
          zIndex: 20,
          flexShrink: 0,
        }}
      />

      {/* Hero Banner */}
      {selectedCategory && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 220, sm: 260, md: 300 },
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            component={motion.div}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            sx={{
              position: "absolute",
              inset: -20,
              background: `url(${selectedCategory.imageUrl}) center/cover no-repeat`,
              filter: "brightness(0.5) saturate(1.3)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, ${OBSIDIAN}88 0%, transparent 30%, ${OBSIDIAN}CC 70%, ${OBSIDIAN}F8 100%)`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, ${OBSIDIAN}DD 0%, transparent 50%, ${OBSIDIAN}44 100%)`,
            }}
          />

          {/* Back button */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            sx={{
              position: "absolute",
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 28 },
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={onClose}
              aria-label="Back"
              component={motion.button as React.ElementType}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                color: "#fff",
                bgcolor: "rgba(5,10,20,0.5)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${GOLD}33`,
                width: 44,
                height: 44,
                borderRadius: "14px",
                "&:hover": { bgcolor: `${GOLD}20`, borderColor: `${GOLD}88` },
                transition: "all 0.3s ease",
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Close button */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            sx={{
              position: "absolute",
              top: { xs: 16, md: 24 },
              right: { xs: 16, md: 28 },
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={onClose}
              aria-label="Close"
              component={motion.button as React.ElementType}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                color: "rgba(255,255,255,0.6)",
                bgcolor: "rgba(5,10,20,0.5)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                width: 44,
                height: 44,
                borderRadius: "14px",
                "&:hover": { color: GOLD_LIGHT, bgcolor: `${GOLD}15` },
                transition: "all 0.3s ease",
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Hero content */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              px: { xs: 3, md: 5 },
              pb: { xs: 2.5, md: 3 },
              zIndex: 5,
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                type: "spring",
                stiffness: 80,
              }}
            >
              <Typography
                component={motion.span}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                sx={{
                  color: GOLD,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                  display: "block",
                  mb: 1,
                }}
              >
                Culinary Collection
              </Typography>
              <Typography
                variant="h3"
                component={motion.h3}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                sx={{
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                  mb: 1.5,
                  textShadow: "0 4px 30px rgba(0,0,0,0.8)",
                }}
              >
                {selectedCategory.title}
              </Typography>
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  icon={
                    <LocalDiningIcon
                      sx={{ fontSize: 14, color: `${GOLD} !important` }}
                    />
                  }
                  label={`${totalItems} Dishes`}
                  size="small"
                  sx={{
                    height: 28,
                    bgcolor: "rgba(5,10,20,0.6)",
                    color: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${GOLD}33`,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    "& .MuiChip-icon": { ml: 0.5 },
                  }}
                />
                {popularCount > 0 && (
                  <Chip
                    icon={
                      <StarIcon
                        sx={{ fontSize: 13, color: `${GOLD} !important` }}
                      />
                    }
                    label={`${popularCount} Popular`}
                    size="small"
                    sx={{
                      height: 28,
                      bgcolor: "rgba(197,160,89,0.1)",
                      color: GOLD_LIGHT,
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${GOLD}33`,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                      "& .MuiChip-icon": { ml: 0.5 },
                    }}
                  />
                )}
                <Chip
                  label={`${subCategories.length} ${subCategories.length === 1 ? "Category" : "Categories"}`}
                  size="small"
                  sx={{
                    height: 28,
                    bgcolor: "rgba(5,10,20,0.6)",
                    color: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Subcategory Tabs */}
      {hasMultipleSubs && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          sx={{
            position: "sticky",
            top: 2,
            zIndex: 15,
            bgcolor: "rgba(5, 8, 16, 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            px: { xs: 1, md: 3 },
            flexShrink: 0,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newVal) => setActiveTab(newVal)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 52,
              "& .MuiTabs-indicator": {
                height: 2,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
              },
              "& .MuiTabs-scrollButtons": {
                color: "rgba(255,255,255,0.3)",
                "&.Mui-disabled": { opacity: 0.15 },
              },
              "& .MuiTab-root": {
                minHeight: 52,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.78rem",
                letterSpacing: "0.05em",
                textTransform: "none",
                px: { xs: 1.5, md: 2.5 },
                transition: "all 0.3s ease",
                "&.Mui-selected": { color: GOLD_LIGHT, fontWeight: 700 },
                "&:hover": {
                  color: "rgba(255,255,255,0.7)",
                  backgroundColor: "rgba(197,160,89,0.05)",
                },
              },
            }}
          >
            {subCategories.map((sub, idx) => (
              <Tab
                key={idx}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <span>{sub.title}</span>
                    <Chip
                      label={sub.items.length}
                      size="small"
                      sx={{
                        height: 18,
                        minWidth: 18,
                        bgcolor:
                          activeTab === idx
                            ? `${GOLD}20`
                            : "rgba(255,255,255,0.05)",
                        color:
                          activeTab === idx
                            ? GOLD_LIGHT
                            : "rgba(255,255,255,0.3)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        border:
                          activeTab === idx
                            ? `1px solid ${GOLD}44`
                            : "1px solid transparent",
                        transition: "all 0.3s ease",
                        "& .MuiChip-label": { px: 0.6 },
                      }}
                    />
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Food Items Grid */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2.5, md: 3 },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
          touchAction: "pan-y",
        }}
      >
        {!hasMultipleSubs && subCategories[0] && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
              pb: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Box
              component={motion.div}
              initial={{ height: 0 }}
              animate={{ height: 28 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              sx={{
                width: 3,
                borderRadius: 4,
                background: `linear-gradient(180deg, ${GOLD}, ${GOLD_LIGHT})`,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.02em",
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                flex: 1,
              }}
            >
              {subCategories[0].title}
            </Typography>
            <Chip
              label={`${subCategories[0].items.length} items`}
              size="small"
              sx={{
                height: 24,
                bgcolor: "rgba(197,160,89,0.08)",
                color: GOLD_LIGHT,
                border: `1px solid ${GOLD}25`,
                fontSize: "0.65rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                "& .MuiChip-label": { px: 1.2 },
              }}
            />
          </Box>
        )}

        {hasMultipleSubs && subCategories[activeTab] && (
          <Box
            component={motion.div}
            key={activeTab}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
              pb: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Box
              sx={{
                width: 3,
                height: 28,
                borderRadius: 4,
                background: `linear-gradient(180deg, ${GOLD}, ${GOLD_LIGHT})`,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.02em",
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                flex: 1,
              }}
            >
              {subCategories[activeTab].title}
            </Typography>
            <Chip
              label={`${subCategories[activeTab].items.length} items`}
              size="small"
              sx={{
                height: 24,
                bgcolor: "rgba(197,160,89,0.08)",
                color: GOLD_LIGHT,
                border: `1px solid ${GOLD}25`,
                fontSize: "0.65rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                "& .MuiChip-label": { px: 1.2 },
              }}
            />
          </Box>
        )}

        <AnimatePresence mode="wait">
          <List
            key={hasMultipleSubs ? activeTab : "all"}
            component={motion.ul}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            sx={{
              p: 0,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 2.5 },
            }}
          >
            {currentItems.map((menuItem, itemIdx) => (
              <FoodItemCard
                key={menuItem.id}
                menuItem={menuItem}
                itemIdx={itemIdx}
                baseDelay={0.15}
              />
            ))}
          </List>
        </AnimatePresence>

        <Box sx={{ height: 40 }} />
      </Box>
    </Box>
  );
};

/* 
   MenuSpiral  Floating Window Category Selector
    */
const MenuSpiral: FC<MenuSpiralProps> = ({
  activeCategory = "Lunch",
  onPanelOpenChange,
}) => {
  const filteredItems = menuData.filter((item) =>
    item.mealType.includes(
      activeCategory as "Lunch" | "Dinner" | "Breakfast" | "Dessert",
    ),
  );
  const displayedItems =
    filteredItems.length > 0 ? filteredItems : menuData;

  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    onPanelOpenChange?.(open);
  }, [open, onPanelOpenChange]);

  const selectedCategory: MainCategory | null =
    selected !== null
      ? displayedItems[selected % displayedItems.length]
      : null;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "transparent",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        color: "rgba(255, 255, 255, 0.7)",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 3, md: 4 },
      }}
    >
      <style>{keyframes}</style>

      {/* Ambient glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 35%, ${GOLD}12 0%, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 1,
          animation: "glow-breathe 8s ease-in-out infinite",
        }}
      />

      {/* Backdrop overlay when panel is open */}
      <Box
        onClick={() => setOpen(false)}
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          zIndex: 500,
          transition: "opacity 0.4s ease",
          cursor: "pointer",
        }}
      />

      {/*  Floating Window  */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{
          opacity: open ? 0.3 : 1,
          y: 0,
          scale: open ? 0.95 : 1,
          filter: open ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1000,
          borderRadius: "28px",
          background: "rgba(5, 10, 20, 0.6)",
          backdropFilter: "blur(40px) saturate(160%)",
          WebkitBackdropFilter: "blur(40px) saturate(160%)",
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)`,
          overflow: "hidden",
          pointerEvents: open ? "none" : "auto",
          transition: "opacity 0.5s ease, filter 0.5s ease",
        }}
      >
        {/* Top gold accent */}
        <Box
          component={motion.div}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          sx={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${GOLD} 25%, ${GOLD_LIGHT} 50%, ${GOLD} 75%, transparent)`,
            transformOrigin: "center",
          }}
        />

        {/* Pulsing border overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "28px",
            border: `1px solid ${GOLD}`,
            opacity: 0.08,
            animation: "border-pulse 4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Window Header */}
        <Box
          sx={{
            px: { xs: 2.5, md: 4 },
            pt: { xs: 2.5, md: 3.5 },
            pb: { xs: 1.5, md: 2 },
            textAlign: "center",
          }}
        >
          {/* Decorative line with diamond */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.2,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD}88)`,
              }}
            />
            <LocalDiningIcon
              sx={{ fontSize: 14, color: GOLD, opacity: 0.7 }}
            />
            <Typography
              sx={{
                color: GOLD,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: { xs: "0.55rem", md: "0.65rem" },
              }}
            >
              {activeCategory} Menu
            </Typography>
            <LocalDiningIcon
              sx={{ fontSize: 14, color: GOLD, opacity: 0.7 }}
            />
            <Box
              sx={{
                width: 40,
                height: "1px",
                background: `linear-gradient(90deg, ${GOLD}88, transparent)`,
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "1.4rem", md: "1.9rem" },
              color: "#fff",
              letterSpacing: "0.03em",
              lineHeight: 1.2,
              mb: 0.8,
            }}
          >
            Select a Category
          </Typography>

          {/* Subtitle with count */}
          <Typography
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            sx={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Inter', sans-serif",
              fontSize: { xs: "0.72rem", md: "0.8rem" },
              fontWeight: 300,
            }}
          >
            {displayedItems.length} collections available
          </Typography>

          {/* Bottom separator */}
          <Box
            component={motion.div}
            initial={{ width: 0 }}
            animate={{ width: 50 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            sx={{
              height: "1.5px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              mx: "auto",
              mt: 1.5,
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Category Cards Grid */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2.5, md: 3.5 },
            pb: { xs: 2.5, md: 3.5 },
            maxHeight: { xs: "60vh", md: "65vh" },
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 1.2, sm: 1.5, md: 2 },
            }}
          >
            {displayedItems.map((item, i) => (
              <CategoryCard
                key={item.id}
                item={item}
                index={i}
                onSelect={() => {
                  setSelected(i);
                  setOpen(true);
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Bottom gold accent */}
        <Box
          sx={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${GOLD}33 30%, ${GOLD}33 70%, transparent)`,
          }}
        />
      </Box>

      {/* Side Panel */}
      <AnimatePresence mode="wait">
        {open && (
          <SidePanel
            sidePanelRef={sidePanelRef}
            selectedCategory={selectedCategory}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default MenuSpiral;
