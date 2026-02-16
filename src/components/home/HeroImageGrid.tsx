import React, { useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import SplineImageCard from "./SplineImageCard";
import type { SplineImageCardHandle } from "./SplineImageCard";
import logoReflect from "../../assets/images/restaurant.jpg";
import img5 from "../../assets/images/5.jpeg";
import imgChef from "../../assets/images/5451355.jpg";
import imgBg4 from "../../assets/images/bg4.jpg";
import imgDish from "../../assets/images/signature_dish_orb.png";
import imgSpecial from "../../assets/images/special_bg.png";

interface HeroImageGridProps {
  variant?: "desktop" | "mobile-top" | "mobile-bottom";
  onSpecialsClick?: () => void;
}

const HeroImageGrid: React.FC<HeroImageGridProps> = ({
  variant = "desktop",
  onSpecialsClick,
}) => {
  const cardRefs = useRef<(SplineImageCardHandle | null)[]>([]);
  const rafId = useRef<number>(0);
  const latestValues = useRef({ rotX: 0, rotY: 0, mx: 0, my: 0 });

  const flushUpdate = useCallback(() => {
    const { rotX, rotY, mx, my } = latestValues.current;
    cardRefs.current.forEach((ref) => ref?.update(rotX, rotY, mx, my));
    rafId.current = 0;
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(flushUpdate);
    }
  }, [flushUpdate]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { innerWidth: width, innerHeight: height } = window;
      const x = (e.clientX - width / 2) / (width / 2);
      const y = (e.clientY - height / 2) / (height / 2);
      latestValues.current = { rotX: -y * 12, rotY: x * 12, mx: x, my: y };
      scheduleUpdate();
    },
    [scheduleUpdate],
  );

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth: width, innerHeight: height } = window;
      const x = (touch.clientX - width / 2) / (width / 2);
      const y = (touch.clientY - height / 2) / (height / 2);
      latestValues.current = { rotX: -y * 15, rotY: x * 15, mx: x, my: y };
      scheduleUpdate();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleTouchMove]);

  const allImages = [
    { src: logoReflect, alt: "Restaurant Interior" },
    { src: "https://i.pinimg.com/736x/c4/10/06/c41006049b919e5dbbdbb2e972839e5f.jpg", alt: "Culinary Art" },
    { src: "https://i.pinimg.com/736x/3f/c5/0e/3fc50e70eeef3f9b2a9ee033417adb8b.jpg", alt: "Chef at Work" },
    { src: "https://i.pinimg.com/736x/f0/7c/5a/f07c5a46b6a3072e36a457b495bb827b.jpg", alt: "Signature Dish" },
    { src: logoReflect, alt: "Ambience" },
    { src: "https://i.pinimg.com/736x/0f/a7/be/0fa7be3c2818c8e1819e9f65727ca6dd.jpg", alt: "Gourmet Experience" },
  ];

  // --- CONFIGURATIONS ---

  // 1. DESKTOP: Full Cluster (Right Aligned)
  const desktopConfigs = [
    {
      top: "5%",
      left: "20%",
      width: { md: "30%" },
      height: { md: "30%" },
      zIndex: 5,
    },
    {
      top: "15%",
      left: "72%",
      width: { md: "28%" },
      height: { md: "26%" },
      zIndex: 3,
    },
    {
      top: "40%",
      left: "15%",
      width: { md: "34%" },
      height: { md: "34%" },
      zIndex: 6,
    },
    {
      top: "45%",
      left: "65%",
      width: { md: "35%" },
      height: { md: "30%" },
      zIndex: 4,
    },
    {
      top: "70%",
      left: "30%",
      width: { md: "40%" },
      height: { md: "28%" },
      zIndex: 7,
    },
    {
      top: "65%",
      left: "76%",
      width: { md: "24%" },
      height: { md: "24%" },
      zIndex: 2,
    },
  ];

  // 2. MOBILE TOP: 2 Images (Above Text)
  // Overlapping visual for the top
  const mobileTopConfigs = [
    { top: "10%", left: "5%", width: "50%", height: "80%", zIndex: 2 },
    { top: "20%", left: "45%", width: "45%", height: "70%", zIndex: 3 },
  ];

  // 3. MOBILE BOTTOM: 4 Images (Below Text)
  // 2x2 Cluster feeling
  const mobileBottomConfigs = [
    { top: "0%", left: "5%", width: "50%", height: "50%", zIndex: 4 }, // imgChef
    { top: "15%", left: "45%", width: "45%", height: "45%", zIndex: 3 }, // imgDish
    { top: "55%", left: "10%", width: "40%", height: "40%", zIndex: 5 }, // imgBg4
    { top: "45%", left: "55%", width: "35%", height: "35%", zIndex: 2 }, // imgSpecial
  ];

  let renderImages: typeof allImages = [];
  let renderConfigs: any[] = [];

  if (variant === "desktop") {
    renderImages = allImages;
    renderConfigs = desktopConfigs;
  } else if (variant === "mobile-top") {
    renderImages = allImages.slice(0, 2);
    renderConfigs = mobileTopConfigs;
  } else if (variant === "mobile-bottom") {
    renderImages = allImages.slice(2, 6);
    renderConfigs = mobileBottomConfigs;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: { xs: "1500px", md: "2500px" },
        overflow: "visible",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          overflow: "visible",
        }}
      >
        {renderImages.map((img, idx) => (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              top: renderConfigs[idx].top,
              left: renderConfigs[idx].left,
              width: renderConfigs[idx].width,
              height: renderConfigs[idx].height,
              zIndex: renderConfigs[idx].zIndex,
              transformStyle: "preserve-3d",
            }}
          >
            <SplineImageCard
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              src={img.src}
              alt={img.alt}
              sx={{ width: "100%", height: "100%" }}
              onClick={
                img.alt === "Gourmet Experience" ? onSpecialsClick : undefined
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeroImageGrid;
