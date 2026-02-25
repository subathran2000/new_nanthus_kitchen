import { useEffect, useRef, useState, useCallback, type FC } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
  List,
  ListItem,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import StarIcon from "@mui/icons-material/Star";

import { menuData } from "../../data/menuData";
import type { MainCategory } from "../../types";

const GOLD = "#C5A059";
const GOLD_LIGHT = "#E2C284";
const OBSIDIAN = "#050A14";

interface SpiralBackgroundProps {
  activeCategory?: string;
  onPanelOpenChange?: (open: boolean) => void;
}

const MotionBox = motion.create(Box);

/* ──────── Shimmer keyframe for cards ──────── */
const shimmerKeyframes = `
@keyframes shimmer-sweep {
  0% { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}
@keyframes float-particle {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-8px) scale(1.3); opacity: 1; }
}
@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.3; }
  50% { transform: scale(1.02); opacity: 0.6; }
  100% { transform: scale(0.95); opacity: 0.3; }
}
@keyframes glow-breathe {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.12; }
}
`;

/* ──────── Floating Particle Dot component ──────── */
const FloatingDot: FC<{ delay: number; left: string; top: string }> = ({ delay, left, top }) => (
  <Box
    sx={{
      position: "absolute",
      left,
      top,
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: `${GOLD}88`,
      animation: `float-particle 3s ease-in-out ${delay}s infinite`,
      pointerEvents: "none",
      zIndex: 4,
    }}
  />
);

/* ──────── Interactive Card with tilt + parallax ──────── */
const SpiralCard: FC<{
  item: MainCategory;
  index: number;
  onSelect: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}> = ({ item, index, onSelect, cardRef }) => {
  const cardElRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY_tilt = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const imgScale = useSpring(1, { stiffness: 300, damping: 25 });
  const [isHovered, setIsHovered] = useState(false);

  const totalItems = item.subCategories.reduce(
    (sum, sub) => sum + sub.items.length,
    0,
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardElRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    imgScale.set(1.08);
  }, [imgScale]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    imgScale.set(1);
  }, [mouseX, mouseY, imgScale]);

  return (
    <Box
      ref={(el: HTMLDivElement | null) => {
        cardRef(el);
        (cardElRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="spiral-card"
      sx={{
        width: "92%",
        maxWidth: "400px",
        aspectRatio: "1/1",
        borderRadius: "28px",
        position: "absolute",
        opacity: 0,
        cursor: "pointer",
        userSelect: "none",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        transformStyle: "preserve-3d",
        border: `1.5px solid ${isHovered ? `${GOLD}66` : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: isHovered
          ? `0 40px 80px rgba(0,0,0,0.8), 0 0 50px ${GOLD}15`
          : "0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
      }}
    >
      {/* Parallax background image with tilt */}
      <MotionBox
        style={{ scale: imgScale, rotateX, rotateY: rotateY_tilt }}
        sx={{
          position: "absolute",
          inset: -10,
          background: `url(${item.imageUrl}) center/cover no-repeat`,
          borderRadius: "28px",
          zIndex: 0,
          transition: "filter 0.5s ease",
          filter: isHovered ? "brightness(1.1) saturate(1.2)" : "brightness(1) saturate(1)",
        }}
      />

      {/* Cinematic gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "28px",
          background:
            `linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.1) 30%, rgba(5,10,20,0.65) 60%, ${OBSIDIAN}F5 100%)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Shimmer sweep on hover */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "28px",
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
            background:
              `linear-gradient(90deg, transparent, ${GOLD}33, transparent)`,
            transform: "translateX(-100%) rotate(25deg)",
            animation: isHovered ? "shimmer-sweep 1.5s ease-in-out" : "none",
          },
        }}
      />

      {/* Floating particle dots */}
      {isHovered && (
        <>
          <FloatingDot delay={0} left="15%" top="20%" />
          <FloatingDot delay={0.5} left="80%" top="15%" />
          <FloatingDot delay={1} left="75%" top="45%" />
          <FloatingDot delay={0.3} left="20%" top="55%" />
        </>
      )}

      {/* Dish count badge with scale entrance */}
      <Chip
        icon={<LocalDiningIcon sx={{ fontSize: 13, color: `${GOLD} !important` }} />}
        label={`${totalItems} Signature Dishes`}
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 5,
          bgcolor: "rgba(5, 10, 20, 0.75)",
          color: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${GOLD}22`,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          height: 24,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isHovered ? "translateX(-4px) scale(1.05)" : "translateX(0) scale(1)",
          ...(isHovered && {
            bgcolor: "rgba(197, 160, 89, 0.15)",
            borderColor: `${GOLD}66`,
            color: GOLD_LIGHT,
          }),
          "& .MuiChip-icon": { ml: 0.5 },
        }}
      />

      {/* Number index badge — top left */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 5,
          width: 32,
          height: 32,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(10, 22, 40, 0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 700,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          ...(isHovered && {
            color: GOLD_LIGHT,
            borderColor: `${GOLD}44`,
            bgcolor: "rgba(197, 160, 89, 0.1)",
          }),
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </Box>

      {/* Bottom glass content area */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          mx: 1.5,
          mb: 1.5,
          px: 2,
          py: 2,
          borderRadius: "20px",
          background: isHovered
            ? "rgba(5, 10, 20, 0.96)"
            : "rgba(5, 10, 20, 0.75)",
          backdropFilter: "blur(44px) saturate(220%)",
          WebkitBackdropFilter: "blur(44px) saturate(220%)",
          border: `1px solid ${isHovered ? `${GOLD}99` : "rgba(255, 255, 255, 0.15)"}`,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isHovered ? "translateY(-18px) translateZ(80px) scale(1.03)" : "translateY(0) translateZ(0) scale(1)",
          boxShadow: isHovered
            ? `0 45px 90px rgba(0,0,0,0.85), inset 0 0 35px ${GOLD}20`
            : "0 15px 45px rgba(0,0,0,0.45)",
        }}
      >
        {/* Accent line */}
        <Box
          sx={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: isHovered ? "80%" : "25%",
            height: "2px",
            borderRadius: 1,
            background:
              `linear-gradient(90deg, transparent, ${GOLD} 30%, ${GOLD_LIGHT} 70%, transparent)`,
            opacity: isHovered ? 0.9 : 0.4,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <Typography
          component="span"
          sx={{
            display: "block",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.85rem" },
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: isHovered ? GOLD_LIGHT : "#fff",
            textShadow: isHovered
              ? `0 4px 30px ${GOLD}88, 0 0 15px rgba(255,255,255,0.4)`
              : "0 2px 20px rgba(0,0,0,0.9)",
            lineHeight: 1,
            textAlign: "center",
            mb: 1,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            display: "block",
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: isHovered ? GOLD : "rgba(255,255,255,0.25)",
            fontWeight: 700,
            transition: "all 0.5s ease",
            opacity: isHovered ? 1 : 0.6,
          }}
        >
          Discover Collection
        </Typography>
      </Box>
    </Box>
  );
};

const MenuSpiral: FC<SpiralBackgroundProps> = ({
  activeCategory = "Lunch",
  onPanelOpenChange,
}) => {
  const filteredItems = menuData.filter((item) =>
    item.mealType.includes(
      activeCategory as "Lunch" | "Dinner" | "Breakfast" | "Dessert",
    ),
  );
  const itemsToUse = filteredItems.length > 0 ? filteredItems : menuData;
  const spiralItems = itemsToUse;
  const displayedItems = spiralItems;
  const isSpiral = displayedItems.length > 2;

  const containerRef = useRef<HTMLDivElement>(null);
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const openRef = useRef(open);
  openRef.current = open;

  const mouseSpringX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseSpringY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    onPanelOpenChange?.(open);
  }, [open, onPanelOpenChange]);

  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const transitionRef = useRef(0);

  // Ref-based entrance progress for high-performance staggered animation
  const entranceRef = useRef({ val: 0 });
  useEffect(() => {
    entranceRef.current.val = 0;
    scrollYRef.current = 0;
    targetScrollYRef.current = 0;
    gsap.to(entranceRef.current, {
      val: 1,
      duration: 1.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [activeCategory]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseSpringX.set(clientX);
    mouseSpringY.set(clientY);
  }, [mouseSpringX, mouseSpringY]);


  useEffect(() => {
    if (!isSpiral) return;

    const prevOverflowX = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = "hidden";

    const cards = cardsRef.current;
    const total = displayedItems.length;

    const updateCards = () => {
      const targetTransition = openRef.current ? 1 : 0;
      const lerpFactor = 0.08;
      transitionRef.current += (targetTransition - transitionRef.current) * lerpFactor;

      if (Math.abs(targetTransition - transitionRef.current) < 0.0005) {
        transitionRef.current = targetTransition;
      }

      const t = transitionRef.current;
      const vertSpacing = isMobile ? 80 : 120;

      // Adaptive Geometry constants
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isLandscape = vw > vh;

      // Radius adapts to smallest dimension to ensure circle fits
      const radius = isMobile
        ? Math.min(vh * 0.5, vw * 0.8)
        : Math.min(vh * 0.8, vw * 0.6);

      const centerY = radius * 0.65; // Push center down for a top-centered rainbow arc
      const adaptiveItemSpacing = isMobile ? (isLandscape ? 0.45 : 0.38) : 0.35; // 180 degree spacing

      const scrollVal = scrollYRef.current;
      const entranceVal = entranceRef.current.val;

      cards.forEach((card, i) => {
        if (!card) return;

        // --- Layout 1: Improved Rainbow Arc (Peak at Top-Center) ---
        // Peak is at 0 rad (top center). Ends are at -0.5PI (left) and 0.5PI (right).
        const angle = (i * adaptiveItemSpacing) + (scrollVal * 0.0035);

        const rotaryX = Math.sin(angle) * radius;
        const rotaryY = -Math.cos(angle) * radius + centerY;
        const rotaryZ = -Math.abs(Math.sin(angle)) * (radius * 0.5);

        const absAngle = Math.abs(angle);
        // Fade out sharply beyond the 180-degree sweep
        const fadeProgress = Math.min(1, absAngle / (Math.PI * 0.6));
        const rotaryOpacity = Math.max(0, 1 - Math.pow(fadeProgress, 2));
        const rotaryBlur = Math.pow(fadeProgress, 2) * 2;
        const rotaryScale = 1 - (Math.pow(fadeProgress, 2) * 0.15);

        const rotaryRotationY = (angle * 180) / Math.PI * 0.6;
        const rotaryRotationZ = (angle * 180) / Math.PI * 0.15;

        // --- Layout 2: Vertical List (When Panel is Open) ---
        const vertY = (i - (total - 1) / 2) * vertSpacing + scrollVal;
        const vertX = 0;
        const vertZ = 0;
        const vertRotationY = 0;
        const vertRotationZ = 0;
        const vertScale = 1;
        const vertOpacity = 1;

        // --- Interpolate between Rotary and Vertical ---
        const currentLeftPct = 50 + (15 - 50) * t;
        const currentX = rotaryX * (1 - t) + vertX * t;
        const currentY = rotaryY * (1 - t) + vertY * t;
        const currentZ = rotaryZ * (1 - t) + vertZ * t;
        const currentRotationY = rotaryRotationY * (1 - t) + vertRotationY * t;
        const currentRotationZ = rotaryRotationZ * (1 - t) + vertRotationZ * t;
        const currentScale = rotaryScale * (1 - t) + vertScale * t;

        const staggerDelay = i * 0.1;
        const entranceProgress = Math.max(0, Math.min(1, (entranceVal * 2) - staggerDelay));

        const baseOpacity = rotaryOpacity * (1 - t) + vertOpacity * t;
        const finalOpacity = baseOpacity * entranceProgress;
        const finalBlur = rotaryBlur * (1 - t);

        gsap.set(card, {
          x: currentX,
          y: currentY,
          z: currentZ,
          rotationY: currentRotationY,
          rotationZ: currentRotationZ,
          scale: currentScale,
          transformOrigin: "50% 50% 0px",
          xPercent: -50,
          yPercent: -50,
          left: `${currentLeftPct}%`,
          top: "55%",
          opacity: finalOpacity,
          filter: finalBlur > 0.1 ? `blur(${finalBlur}px)` : "none",
          zIndex: Math.round(currentZ) + 1000,
        });
      });
    };

    const container = containerRef.current;

    const handleWheel = (e: WheelEvent) => {
      const isInsidePanel = openRef.current && sidePanelRef.current?.contains(e.target as Node);
      if (isInsidePanel) return;

      e.preventDefault();
      const newTargetScroll = targetScrollYRef.current - e.deltaY * 0.8;

      if (openRef.current) {
        // Use vertical list bounds when panel is open
        const vertSpacing = isMobile ? 80 : 120;
        const verticalRange = (total - 1) * vertSpacing;
        const vMin = -verticalRange / 2;
        const vMax = verticalRange / 2;
        targetScrollYRef.current = Math.max(vMin, Math.min(vMax, newTargetScroll));
      } else {
        // Horizontal rotary bounds - hard boundaries for first and last item centered
        const isLandscape = window.innerWidth > window.innerHeight;
        const itemSpacing = isMobile ? (isLandscape ? 0.45 : 0.38) : 0.35;
        const rotaryRange = (total - 1) * (itemSpacing / 0.0035);
        const hMax = 0; // lock first item at center
        const hMin = -rotaryRange; // lock last item at center
        targetScrollYRef.current = Math.max(hMin, Math.min(hMax, newTargetScroll));
      }
    };

    let touchStartX = 0;
    let touchLastX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchLastX = touchStartX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const isInsidePanel = openRef.current && sidePanelRef.current?.contains(e.target as Node);
      if (isInsidePanel) return;

      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const deltaX = touchLastX - touchX;
      touchLastX = touchX;

      const friction = isMobile ? 1.2 : 1.5;
      const newTargetScroll = targetScrollYRef.current - deltaX * friction;

      if (openRef.current) {
        // Use vertical list bounds when panel is open
        const vertSpacing = isMobile ? 80 : 120;
        const verticalRange = (total - 1) * vertSpacing;
        const vMin = -verticalRange / 2;
        const vMax = verticalRange / 2;
        targetScrollYRef.current = Math.max(vMin, Math.min(vMax, newTargetScroll));
      } else {
        // Horizontal rotary bounds - hard boundaries for first and last item centered
        const isLandscape = window.innerWidth > window.innerHeight;
        const itemSpacing = isMobile ? (isLandscape ? 0.45 : 0.38) : 0.35;
        const rotaryRange = (total - 1) * (itemSpacing / 0.0035);
        const hMax = 0; // lock first item at center
        const hMin = -rotaryRange; // lock last item at center
        targetScrollYRef.current = Math.max(hMin, Math.min(hMax, newTargetScroll));
      }
    };

    const handleTouchEnd = () => {
      touchStartX = 0;
      touchLastX = 0;
    };

    // Scope listeners to the container element instead of window
    // to avoid blocking page-level scroll on mobile
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd);
    }

    const ticker = gsap.ticker.add(() => {
      const diff = targetScrollYRef.current - scrollYRef.current;
      // Smoother scroll physics with exponential damping and a "springy" finish
      const damping = openRef.current ? 0.09 : 0.08;
      scrollYRef.current += diff * damping;

      if (Math.abs(diff) < 0.05) {
        scrollYRef.current = targetScrollYRef.current;
      }

      updateCards();
    });

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
      gsap.ticker.remove(ticker);
      document.documentElement.style.overflowX = prevOverflowX;
    };
  }, [spiralItems, isMobile, activeCategory, isSpiral]);

  const selectedCategory: MainCategory | null =
    selected !== null ? displayedItems[selected % displayedItems.length] : null;

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      sx={{
        perspective: "2000px",
        width: "100%",
        height: "100vh",
        background: "transparent",
        overflow: "hidden",
        position: "relative",
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        fontFamily: "'Inter', sans-serif",
        color: "rgba(255, 255, 255, 0.7)",
        touchAction: "none", // prevent browser scroll on this container
      }}
    >
      {/* Inject keyframes */}
      <style>{shimmerKeyframes}</style>

      {/* Breathing ambient glow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            `radial-gradient(ellipse at 50% 40%, ${GOLD}15 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.8,
          animation: "glow-breathe 8s ease-in-out infinite",
        }}
      />

      {/* Dynamic Mouse Spotlight */}
      <MotionBox
        style={{
          x: mouseSpringX,
          y: mouseSpringY,
        }}
        sx={{
          position: "fixed",
          top: -300,
          left: -300,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${GOLD}12 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: "screen",
          opacity: open ? 0.3 : 1,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Backdrop overlay when panel is open */}
      <Box
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          inset: 0,
          background:
            `linear-gradient(to right, ${OBSIDIAN}CC 0%, ${OBSIDIAN}33 50%, transparent 100%)`,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          zIndex: 500,
          transition: "opacity 0.5s ease",
          cursor: "pointer",
        }}
      />

      {/* Conditional Rendering: Spiral vs Horizontal with Cross-fade */}
      <AnimatePresence mode="wait">
        {isSpiral ? (
          <Box
            key="spiral-container"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            sx={{ position: "absolute", inset: 0 }}
          >
            {displayedItems.map((item, i) => (
              <SpiralCard
                key={item.id}
                item={item}
                index={i}
                onSelect={() => {
                  setSelected(i);
                  setOpen(true);
                }}
                cardRef={(el) => {
                  cardsRef.current[i] = el;
                }}
              />
            ))}
          </Box>
        ) : (
          <Box
            key="horizontal-container"
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: open && !isMobile ? 0.88 : 1,
              x: open && !isMobile ? "-30%" : "0%",
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 3, md: 6 },
              width: "100%",
              height: "100%",
              flexDirection: { xs: "column", md: "row" },
              px: 4,
              zIndex: open ? 600 : 10,
              position: "relative",
            }}
          >
            {displayedItems.map((item, i) => (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, y: 60, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 80,
                  damping: 16,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                onClick={() => {
                  setSelected(i);
                  setOpen(true);
                }}
                sx={{
                  width: "90%",
                  maxWidth: { xs: "300px", md: "380px" },
                  aspectRatio: "1/1",
                  borderRadius: "28px",
                  border: `1.5px solid ${GOLD}22`,
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  filter: open && !isMobile ? "blur(3px) brightness(0.7)" : "none",
                  transition: "filter 0.5s ease, border-color 0.4s ease, box-shadow 0.5s ease",
                  "&:hover": {
                    boxShadow: `0 0 50px ${GOLD}15, 0 50px 100px rgba(0,0,0,0.7)`,
                    borderColor: `${GOLD}66`,
                  },
                }}
              >
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: `url(${item.imageUrl}) center/cover no-repeat`,
                    borderRadius: "28px",
                  }}
                />
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "28px", background: `linear-gradient(180deg, rgba(5,10,20,0) 0%, rgba(5,10,20,0.1) 30%, ${OBSIDIAN}E6 100%)`, pointerEvents: "none" }} />

                {/* Number index badge */}
                <Box sx={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: "10px", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)", border: `1px solid ${GOLD}22`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                  <Typography sx={{ color: GOLD_LIGHT, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.7rem" }}>{String(i + 1).padStart(2, "0")}</Typography>
                </Box>

                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 3, background: `linear-gradient(180deg, transparent 0%, ${OBSIDIAN}F2 100%)`, zIndex: 2 }}>
                  <Typography sx={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, mb: 0.5, textAlign: "center", letterSpacing: '0.1em' }}>{item.title}</Typography>
                  <Box sx={{ width: "25%", height: "2px", background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, mx: "auto", borderRadius: 2 }} />
                </Box>
              </MotionBox>
            ))}
          </Box>
        )}
      </AnimatePresence>

      {/* ──── Side Panel Detail View ──── */}
      <AnimatePresence mode="wait">
        {open && (
          <Box
            ref={sidePanelRef}
            component={motion.div}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 22,
              mass: 0.8,
              opacity: { duration: 0.4 },
            }}
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: { xs: "100%", sm: "100%", md: "70%", lg: "65%" },
              maxWidth: "100%",
              boxSizing: "border-box",
              background:
                `linear-gradient(165deg, ${OBSIDIAN}FC 0%, #000 100%)`,
              backdropFilter: "blur(100px) saturate(220%)",
              WebkitBackdropFilter: "blur(100px) saturate(220%)",
              borderLeft: `1px solid ${GOLD}15`,
              boxShadow: `-150px 0 300px rgba(0,0,0,0.9), inset 60px 0 120px ${GOLD}05`,
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              p: 0,
              overflow: "hidden",
            }}
          >
            {/* ── Decorative top edge glow ── */}
            <Box
              component={motion.div}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, transparent 100%)`,
                transformOrigin: "left",
                zIndex: 10,
              }}
            />

            {/* ── Panel top bar ── */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 2.5, md: 4 },
                pt: { xs: 2.5, md: 3 },
                pb: 2,
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                flexShrink: 0,
              }}
            >
              <IconButton
                onClick={() => setOpen(false)}
                aria-label="Back"
                component={motion.button as React.ElementType}
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: `1px solid ${GOLD}22`,
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  "&:hover": {
                    bgcolor: `${GOLD}15`,
                    borderColor: `${GOLD}66`,
                    color: GOLD_LIGHT,
                  },
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 19 }} />
              </IconButton>

              <Typography
                component={motion.span}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                sx={{
                  color: GOLD,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontSize: "0.6rem",
                }}
              >
                Culinary Collection
              </Typography>

              <IconButton
                onClick={() => setOpen(false)}
                aria-label="Close"
                component={motion.button as React.ElementType}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  "&:hover": {
                    color: GOLD_LIGHT,
                    bgcolor: `${GOLD}10`,
                  },
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <CloseIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>

            {/* ── Scrollable content ── */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                px: { xs: 2.5, md: 5 },
                py: { xs: 3, md: 4 },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
                touchAction: "pan-y", // ensure touch scroll works inside the panel
              }}
            >
              {/* ── Category Hero Header ── */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 18,
                }}
                sx={{ textAlign: "center", mb: 5 }}
              >
                {selectedCategory && (
                  <Box
                    component={motion.div}
                    initial={{ scale: 0, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                    }}
                    sx={{
                      width: { xs: 90, md: 110 },
                      height: { xs: 90, md: 110 },
                      borderRadius: "28px",
                      mx: "auto",
                      mb: 2.5,
                      background: `url(${selectedCategory.imageUrl}) center/cover no-repeat`,
                      border: `2px solid ${GOLD}33`,
                      boxShadow:
                        `0 16px 50px rgba(0,0,0,0.5), 0 0 30px ${GOLD}15`,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: -4,
                        borderRadius: "32px",
                        border: `1px solid ${GOLD}22`,
                        animation: "pulse-ring 3s ease-in-out infinite",
                      },
                    }}
                  />
                )}
                <Typography
                  component={motion.h3}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  variant="h3"
                  sx={{
                    color: "#fff",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    letterSpacing: "0.03em",
                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                    lineHeight: 1.15,
                    mb: 1,
                  }}
                >
                  {selectedCategory?.title}
                </Typography>
                <Typography
                  component={motion.p}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    opacity: 0.9,
                    color: GOLD_LIGHT,
                  }}
                >
                  <Box component="span" sx={{ color: GOLD, fontWeight: 900 }}>
                    {selectedCategory?.subCategories.reduce(
                      (sum, sub) => sum + sub.items.length,
                      0,
                    )}
                  </Box>{" "}
                  Masterpieces
                </Typography>
                {/* Expanding accent line */}
                <Box
                  component={motion.div}
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  sx={{
                    height: "2px",
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                    mx: "auto",
                    mt: 3,
                    borderRadius: 2,
                  }}
                />
              </Box>

              {/* ── Menu Content — staggered subcategory sections ── */}
              {selectedCategory?.subCategories.map((sub, idx) => (
                <Box
                  key={idx}
                  component={motion.div}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + idx * 0.12,
                    duration: 0.55,
                    type: "spring",
                    stiffness: 90,
                    damping: 16,
                  }}
                  sx={{ mb: 5 }}
                >
                  {/* Sub-category header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2.5,
                      pb: 1.5,
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        component={motion.div}
                        initial={{ height: 0 }}
                        animate={{ height: 24 }}
                        transition={{ delay: 0.4 + idx * 0.12, duration: 0.4 }}
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
                          fontSize: { xs: "1.05rem", md: "1.15rem" },
                        }}
                      >
                        {sub.title}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${sub.items.length}`}
                      size="small"
                      sx={{
                        height: 22,
                        minWidth: 28,
                        bgcolor: "rgba(197,160,89,0.1)",
                        color: GOLD_LIGHT,
                        border: `1px solid ${GOLD}33`,
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        "& .MuiChip-label": { px: 1 },
                      }}
                    />
                  </Box>

                  <List
                    sx={{
                      p: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.75,
                    }}
                  >
                    {sub.items.map((menuItem, itemIdx) => (
                      <ListItem
                        key={menuItem.id}
                        component={motion.li}
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          delay: 0.4 + idx * 0.12 + itemIdx * 0.05,
                          duration: 0.55,
                          type: "spring",
                          stiffness: 100,
                          damping: 18,
                        }}
                        disablePadding
                        sx={{
                          borderRadius: "16px",
                          overflow: "hidden",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.02)",
                            transform: "translateX(8px)",
                            "& .item-image": {
                              transform: "scale(1.08)",
                              borderColor: `${GOLD}44`,
                            },
                            "& .price-pill": {
                              bgcolor: GOLD,
                              color: OBSIDIAN,
                              borderColor: GOLD,
                              transform: "scale(1.05)",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            width: "100%",
                            alignItems: { xs: "stretch", sm: "center" },
                            gap: { xs: 0, sm: 2 },
                          }}
                        >
                          <Box
                            className="item-image"
                            sx={{
                              width: { xs: "100%", sm: "76px" },
                              height: { xs: "130px", sm: "76px" },
                              minWidth: { xs: "auto", sm: "76px" },
                              background: `url(${menuItem.imageUrl}) center/cover no-repeat`,
                              m: { xs: 0, sm: 1.5 },
                              borderRadius: {
                                xs: "16px 16px 0 0",
                                sm: "12px",
                              },
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              border: "1px solid rgba(255,255,255,0.04)",
                            }}
                          />

                          <Box
                            sx={{
                              flex: 1,
                              px: { xs: 2, sm: 0.5 },
                              py: { xs: 1.5, sm: 1.2 },
                              minWidth: 0,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 0.3,
                                gap: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontWeight: 600,
                                  fontSize: { xs: "0.92rem", md: "0.97rem" },
                                  fontFamily: "'Inter', sans-serif",
                                  letterSpacing: "0.01em",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menuItem.name}
                              </Typography>
                              {menuItem.popular && (
                                <Chip
                                  icon={
                                    <StarIcon
                                      sx={{
                                        fontSize: 11,
                                        color: `${GOLD} !important`,
                                      }}
                                    />
                                  }
                                  label="CHEF'S CHOICE"
                                  size="small"
                                  sx={{
                                    height: 20,
                                    bgcolor: "rgba(197,160,89,0.1)",
                                    color: GOLD_LIGHT,
                                    fontSize: "0.58rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.12em",
                                    border: `1px solid ${GOLD}33`,
                                    "& .MuiChip-label": { px: 0.5, pr: 1 },
                                    "& .MuiChip-icon": { ml: 0.5 },
                                  }}
                                />
                              )}
                            </Box>

                            <Typography
                              sx={{
                                color: "rgba(255, 255, 255, 0.35)",
                                fontSize: "0.78rem",
                                lineHeight: 1.45,
                                fontFamily: "'Inter', sans-serif",
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

                          <Box
                            sx={{
                              pr: { xs: 2, sm: 2.5 },
                              pb: { xs: 1.5, sm: 0 },
                              display: "flex",
                              alignItems: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Box
                              className="price-pill"
                              sx={{
                                bgcolor: "transparent",
                                color: GOLD,
                                border: `1px solid ${GOLD}33`,
                                px: 1.8,
                                py: 0.5,
                                borderRadius: "8px",
                                fontWeight: 800,
                                fontSize: "0.85rem",
                                fontFamily: "'Playfair Display', serif",
                                transition:
                                  "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                letterSpacing: "0.05em",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {menuItem.price}
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) { .spiral-card { max-width: 360px; } }
        @media (max-width: 768px) { .spiral-card { max-width: 300px; } }
        @media (max-width: 480px) { .spiral-card { max-width: 260px; } }
        @media (max-width: 375px) { .spiral-card { max-width: 220px; } }
      `}</style>
    </Box>
  );
};

export default MenuSpiral;
