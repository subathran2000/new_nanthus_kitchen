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
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.07; }
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
      background: "rgba(59, 130, 246, 0.7)",
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
        aspectRatio: "3/4",
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
        border: "1.5px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        transition: "border-color 0.5s ease, box-shadow 0.6s ease",
        ...(isHovered && {
          borderColor: "rgba(59, 130, 246, 0.4)",
          boxShadow:
            "0 0 60px rgba(59, 130, 246, 0.12), 0 40px 80px rgba(0,0,0,0.7), inset 0 0 30px rgba(59, 130, 246, 0.04)",
        }),
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
            "linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(10,22,40,0.1) 30%, rgba(10,22,40,0.65) 60%, rgba(10,22,40,0.95) 100%)",
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
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
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
        icon={<LocalDiningIcon sx={{ fontSize: 13, color: "#F5A623 !important" }} />}
        label={`${totalItems} dishes`}
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 5,
          bgcolor: "rgba(10, 22, 40, 0.65)",
          color: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "0.68rem",
          letterSpacing: "0.04em",
          height: 26,
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          ...(isHovered && {
            bgcolor: "rgba(59, 130, 246, 0.15)",
            borderColor: "rgba(59, 130, 246, 0.35)",
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
          transition: "all 0.4s ease",
          ...(isHovered && {
            color: "#3B82F6",
            borderColor: "rgba(59,130,246,0.3)",
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
          mx: 2,
          mb: 2,
          px: 2.5,
          py: 2,
          borderRadius: "20px",
          background: isHovered
            ? "rgba(10, 22, 40, 0.82)"
            : "rgba(10, 22, 40, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${isHovered ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.06)"}`,
          transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
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
              "linear-gradient(90deg, transparent, #3B82F6 30%, #60A5FA 70%, transparent)",
            opacity: isHovered ? 0.9 : 0.4,
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        <Typography
          component="span"
          sx={{
            display: "block",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "1.15rem", sm: "1.35rem", md: "1.5rem" },
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fff",
            textShadow: isHovered
              ? "0 2px 20px rgba(59,130,246,0.3)"
              : "0 2px 12px rgba(0,0,0,0.5)",
            lineHeight: 1.25,
            textAlign: "center",
            mb: 0.5,
            transition: "text-shadow 0.5s ease",
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            display: "block",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: isHovered ? "rgba(96, 165, 250, 0.8)" : "rgba(255,255,255,0.35)",
            fontWeight: 500,
            transition: "color 0.4s ease",
          }}
        >
          Tap to explore
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

  useEffect(() => {
    onPanelOpenChange?.(open);
  }, [open, onPanelOpenChange]);

  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const transitionRef = useRef(0);

  // Reset scroll and trigger entrance animation when category changes
  const [isEntering, setIsEntering] = useState(true);
  useEffect(() => {
    setIsEntering(true);
    scrollYRef.current = 0;
    targetScrollYRef.current = 0;
    const timer = setTimeout(() => setIsEntering(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const getResponsiveValues = () => {
    // Cylinder radius: cards sit on a ring; slightly smaller on mobile
    if (typeof window === "undefined") return { radius: 420, cylinderCards: 7 };
    const width = window.innerWidth;
    if (width < 480) return { radius: 200, cylinderCards: 7 };
    if (width < 768) return { radius: 280, cylinderCards: 7 };
    if (width < 1024) return { radius: 360, cylinderCards: 7 };
    return { radius: 420, cylinderCards: 7 };
  };

  useEffect(() => {
    if (!isSpiral) return;

    const prevOverflowX = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = "hidden";

    const cards = cardsRef.current;
    const total = cards.length;

    const { radius, cylinderCards } = getResponsiveValues();
    // Card size: ~92% container, max 400px → strip gap proportional to card width
    const cardWidthPx = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.38, 220) : 180;
    const hasMoreThanSeven = total > cylinderCards;
    const scrollStep = 160;
    const maxCylinderScroll = hasMoreThanSeven ? (total - cylinderCards) * scrollStep : 0;
    const rotationFactor = 0.008;

    const easeInOutCubic = (s: number) => s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2;

    const updateCards = () => {
      const targetTransition = openRef.current ? 1 : 0;
      transitionRef.current += (targetTransition - transitionRef.current) * 0.06;
      if (Math.abs(targetTransition - transitionRef.current) < 0.001) {
        transitionRef.current = targetTransition;
      }
      const t = transitionRef.current;
      const vertSpacing = isMobile ? 80 : 120;

      if (!hasMoreThanSeven) {
        const baseAngle = scrollYRef.current * rotationFactor;
        const n = Math.min(total, cylinderCards);
        const angleStep = (2 * Math.PI) / n;

        cards.forEach((card, i) => {
          if (!card) return;
          const inCylinderRing = i < n;
          const angle = (i % n) * angleStep + baseAngle;
          const cylinderX = radius * Math.sin(angle);
          const cylinderZ = -radius * Math.cos(angle);
          const rotationYDeg = (angle * 180) / Math.PI;
          const vertY = (i - (total - 1) / 2) * vertSpacing;
          const currentLeftPct = 50 + (15 - 50) * t;
          const currentY = (vertY + scrollYRef.current) * t;
          const currentX = cylinderX * (1 - t);
          const currentZ = cylinderZ * (1 - t);
          const currentRotationY = rotationYDeg * (1 - t);
          const depthScale = 0.6 + 0.4 * (Math.cos(angle) + 1) / 2;
          const currentScale = t === 1 ? 1 : (inCylinderRing ? depthScale : 1);
          const opacity = t === 1 ? 1 : (inCylinderRing ? 1 : 0);
          // Enhanced entry stagger + exit fade
          const staggerDelay = isEntering ? i * 0.05 : 0;

          gsap.to(card, {
            x: currentX,
            y: currentY,
            z: currentZ,
            rotationY: currentRotationY,
            scale: currentScale,
            transformOrigin: "50% 50% 0px",
            xPercent: -50,
            yPercent: -50,
            left: `${currentLeftPct}%`,
            top: "50%",
            opacity: isEntering ? 0 : opacity,
            duration: isEntering ? 0.6 : 0.01,
            delay: staggerDelay,
            ease: "power2.out",
            zIndex: Math.round(Math.cos(angle) * 100 * (1 - t)) + (openRef.current ? 600 : 10),
            overwrite: "auto"
          });
        });
        return;
      }

      const rawScroll = Math.max(0, Math.min(maxCylinderScroll, scrollYRef.current));
      const scrollIndex = rawScroll / scrollStep;

      const vw = typeof window !== "undefined" ? window.innerWidth / 100 : 10;
      const leftStripStart = -Math.min(400, vw * 36);
      const rightStripStart = Math.min(400, vw * 36);
      const horizontalGap = Math.max(100, cardWidthPx * 0.55);
      const stripScaleNear = 0.58;
      const stripScaleFar = 0.36;
      const stripOpacityNear = 0.9;
      const stripOpacityFar = 0.4;

      const getCylinderPos = (angle: number) => ({
        x: radius * Math.sin(angle),
        z: -radius * Math.cos(angle),
        rot: (angle * 180) / Math.PI,
        scale: 0.6 + 0.4 * (Math.cos(angle) + 1) / 2,
      });

      cards.forEach((card, i) => {
        if (!card) return;
        const vertY = (i - (total - 1) / 2) * vertSpacing;
        const currentLeftPct = 50 + (15 - 50) * t;
        const currentY = (vertY + scrollYRef.current) * t;

        let currentX: number;
        let currentZ: number;
        let currentRotationY: number;
        let currentScale: number;
        let opacity: number;
        let zIndex: number;

        // Unified slot logic for smoothness
        const slot = i - scrollIndex;

        if (slot < 0) {
          // Left Strip (moving continuously)
          const leftProgress = Math.abs(slot);
          currentX = (leftStripStart + slot * horizontalGap) * (1 - t);
          currentZ = slot * 6 * (1 - t);
          currentRotationY = 0;
          currentScale = t === 1 ? 1 : Math.max(stripScaleFar, stripScaleNear - leftProgress * 0.1);
          opacity = t === 1 ? 1 : Math.max(stripOpacityFar, stripOpacityNear - leftProgress * 0.15);
          zIndex = 10 - Math.floor(leftProgress);
        } else if (slot < cylinderCards - 1) {
          // Inside Cylinder
          const angle = slot * (2 * Math.PI) / cylinderCards;
          const cyl = getCylinderPos(angle);
          currentX = cyl.x * (1 - t);
          currentZ = cyl.z * (1 - t);
          currentRotationY = cyl.rot * (1 - t);
          currentScale = t === 1 ? 1 : cyl.scale;
          opacity = 1;
          zIndex = 20 + Math.round(Math.cos(angle) * 70 * (1 - t));
        } else if (slot < cylinderCards) {
          // Exit Cylinder to Right (blend)
          const localFraction = slot - (cylinderCards - 1);
          const localBlend = easeInOutCubic(localFraction);
          const angle = slot * (2 * Math.PI) / cylinderCards;
          const cyl = getCylinderPos(angle);
          const rightX = rightStripStart;
          currentX = (1 - localBlend) * cyl.x * (1 - t) + localBlend * rightX * (1 - t);
          currentZ = (1 - localBlend) * cyl.z * (1 - t);
          currentRotationY = (1 - localBlend) * cyl.rot * (1 - t);
          currentScale = t === 1 ? 1 : (1 - localBlend) * cyl.scale + localBlend * stripScaleNear;
          opacity = 1;
          zIndex = 15;
        } else {
          // Right Strip (moving continuously)
          const rightProgress = slot - (cylinderCards - 1);
          currentX = (rightStripStart + (rightProgress - 1) * horizontalGap) * (1 - t);
          currentZ = -(rightProgress - 1) * 6 * (1 - t);
          currentRotationY = 0;
          currentScale = t === 1 ? 1 : Math.max(stripScaleFar, stripScaleNear - (rightProgress - 1) * 0.1);
          opacity = t === 1 ? 1 : Math.max(stripOpacityFar, stripOpacityNear - (rightProgress - 1) * 0.15);
          zIndex = 10 - Math.floor(rightProgress);
        }

        // Enhanced entrance/exit stagger
        const staggerDelay = isEntering ? i * 0.04 : 0;
        const animDuration = isEntering ? 0.7 : 0.05; // Slightly more than 0.01 to allow minor easing

        gsap.to(card, {
          x: currentX,
          y: currentY,
          z: currentZ,
          rotationY: currentRotationY,
          scale: currentScale,
          transformOrigin: "50% 50% 0px",
          xPercent: -50,
          yPercent: -50,
          left: `${currentLeftPct}%`,
          top: "50%",
          opacity: isEntering ? 0 : opacity,
          duration: animDuration,
          delay: staggerDelay,
          ease: isEntering ? "power3.out" : "none",
          zIndex: openRef.current ? 600 + i : zIndex,
          overwrite: "auto"
        });
      });
    };

    const container = containerRef.current;

    const handleWheel = (e: WheelEvent) => {
      const isInsidePanel = openRef.current && sidePanelRef.current?.contains(e.target as Node);
      if (isInsidePanel) return;

      e.preventDefault();
      const newTargetScroll = targetScrollYRef.current - e.deltaY * 0.42;

      if (openRef.current) {
        // Use vertical list bounds when panel is open
        const vertSpacing = isMobile ? 80 : 120;
        const verticalRange = (total - 1) * vertSpacing;
        const vMin = -verticalRange / 2;
        const vMax = verticalRange / 2;
        targetScrollYRef.current = Math.max(vMin, Math.min(vMax, newTargetScroll));
      } else if (hasMoreThanSeven) {
        targetScrollYRef.current = Math.max(0, Math.min(maxCylinderScroll, newTargetScroll));
      } else {
        targetScrollYRef.current = newTargetScroll;
      }
    };

    let touchStartY = 0;
    let touchLastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const isInsidePanel = openRef.current && sidePanelRef.current?.contains(e.target as Node);
      if (isInsidePanel) return;

      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchLastY - touchY;
      touchLastY = touchY;

      const newTargetScroll = targetScrollYRef.current - deltaY * 2;

      if (openRef.current) {
        // Use vertical list bounds when panel is open
        const vertSpacing = isMobile ? 80 : 120;
        const verticalRange = (total - 1) * vertSpacing;
        const vMin = -verticalRange / 2;
        const vMax = verticalRange / 2;
        targetScrollYRef.current = Math.max(vMin, Math.min(vMax, newTargetScroll));
      } else if (hasMoreThanSeven) {
        targetScrollYRef.current = Math.max(0, Math.min(maxCylinderScroll, newTargetScroll));
      } else {
        targetScrollYRef.current = newTargetScroll;
      }
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
      touchLastY = 0;
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
      // Smoother scroll physics with exponential damping
      const damping = openRef.current ? 0.08 : 0.072;
      scrollYRef.current += diff * damping;
      if (Math.abs(diff) < 0.1) scrollYRef.current = targetScrollYRef.current;
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
      sx={{
        perspective: "1500px",
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
            "radial-gradient(ellipse at 50% 40%, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          animation: "glow-breathe 6s ease-in-out infinite",
        }}
      />

      {/* Backdrop overlay when panel is open */}
      <Box
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.2) 50%, rgba(0,0,0,0) 100%)",
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
                  aspectRatio: "3/4",
                  borderRadius: "28px",
                  border: "1.5px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  filter: open && !isMobile ? "blur(3px) brightness(0.7)" : "none",
                  transition: "filter 0.5s ease, border-color 0.4s ease, box-shadow 0.5s ease",
                  "&:hover": {
                    boxShadow: "0 0 50px rgba(59, 130, 246, 0.15), 0 50px 100px rgba(0,0,0,0.7)",
                    borderColor: "rgba(59, 130, 246, 0.35)",
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
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "28px", background: "linear-gradient(180deg, rgba(10,22,40,0) 0%, rgba(10,22,40,0.1) 30%, rgba(10,22,40,0.88) 100%)", pointerEvents: "none" }} />

                {/* Number index badge */}
                <Box sx={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: "10px", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.7rem" }}>{String(i + 1).padStart(2, "0")}</Typography>
                </Box>

                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 3, background: "linear-gradient(180deg, transparent 0%, rgba(10,22,40,0.95) 100%)", zIndex: 2 }}>
                  <Typography sx={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, mb: 0.5, textAlign: "center" }}>{item.title}</Typography>
                  <Box sx={{ width: "25%", height: "2px", background: "linear-gradient(90deg, #3B82F6, #60A5FA)", mx: "auto", borderRadius: 2 }} />
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
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.3 },
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
                "linear-gradient(160deg, rgba(10, 22, 40, 0.98) 0%, rgba(6, 14, 26, 0.99) 100%)",
              backdropFilter: "blur(60px) saturate(160%)",
              WebkitBackdropFilter: "blur(60px) saturate(160%)",
              borderLeft: "1px solid rgba(59, 130, 246, 0.08)",
              boxShadow: "-80px 0 160px rgba(0,0,0,0.7)",
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
                  "linear-gradient(90deg, transparent 0%, #3B82F6 30%, #60A5FA 50%, #3B82F6 70%, transparent 100%)",
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
                  color: "rgba(255,255,255,0.6)",
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  "&:hover": {
                    bgcolor: "rgba(59, 130, 246, 0.1)",
                    borderColor: "rgba(59, 130, 246, 0.2)",
                    color: "#60A5FA",
                  },
                  transition: "all 0.3s ease",
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
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontSize: "0.6rem",
                }}
              >
                Menu
              </Typography>

              <IconButton
                onClick={() => setOpen(false)}
                aria-label="Close"
                component={motion.button as React.ElementType}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  width: 42,
                  height: 42,
                  borderRadius: "12px",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                  transition: "all 0.3s ease",
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
                      border: "2px solid rgba(59, 130, 246, 0.12)",
                      boxShadow:
                        "0 16px 50px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.08)",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: -4,
                        borderRadius: "32px",
                        border: "1px solid rgba(59,130,246,0.06)",
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
                    color: "rgba(96, 165, 250, 0.5)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontSize: "0.63rem",
                  }}
                >
                  {selectedCategory?.subCategories.reduce(
                    (sum, sub) => sum + sub.items.length,
                    0,
                  )}{" "}
                  items available
                </Typography>
                {/* Expanding accent line */}
                <Box
                  component={motion.div}
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  sx={{
                    height: "2px",
                    background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
                    mx: "auto",
                    mt: 2.5,
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
                          background: "linear-gradient(180deg, #3B82F6, #60A5FA)",
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
                        bgcolor: "rgba(59,130,246,0.06)",
                        color: "rgba(96,165,250,0.7)",
                        border: "1px solid rgba(59,130,246,0.08)",
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
                        initial={{ opacity: 0, x: 20, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          delay: 0.35 + idx * 0.1 + itemIdx * 0.05,
                          duration: 0.4,
                          type: "spring",
                          stiffness: 120,
                          damping: 18,
                        }}
                        sx={{
                          p: 0,
                          borderRadius: "16px",
                          background: "rgba(255, 255, 255, 0.015)",
                          border: "1px solid transparent",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "15%",
                            bottom: "15%",
                            left: 0,
                            width: "3px",
                            borderRadius: "0 4px 4px 0",
                            background: "linear-gradient(180deg, #3B82F6, #60A5FA)",
                            opacity: 0,
                            transition: "opacity 0.35s ease",
                          },
                          "&:hover": {
                            background: "rgba(59, 130, 246, 0.04)",
                            borderColor: "rgba(59, 130, 246, 0.1)",
                            transform: "translateX(4px)",
                            "&::before": { opacity: 1 },
                            "& .item-image": {
                              transform: "scale(1.06)",
                              borderColor: "rgba(59, 130, 246, 0.25)",
                              boxShadow: "0 0 16px rgba(59, 130, 246, 0.15)",
                            },
                            "& .price-pill": {
                              bgcolor: "#F5A623",
                              color: "#0A1628",
                              borderColor: "#F5A623",
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
                                        color: "#F5A623 !important",
                                      }}
                                    />
                                  }
                                  label="POPULAR"
                                  size="small"
                                  sx={{
                                    height: 20,
                                    bgcolor: "rgba(245,166,35,0.08)",
                                    color: "#F5A623",
                                    fontSize: "0.58rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    border: "1px solid rgba(245,166,35,0.15)",
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
                                color: "#F5A623",
                                border: "1px solid rgba(255,255,255,0.06)",
                                px: 1.8,
                                py: 0.5,
                                borderRadius: "10px",
                                fontWeight: 700,
                                fontSize: "0.82rem",
                                fontFamily: "'Inter', sans-serif",
                                transition:
                                  "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                letterSpacing: "0.03em",
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
