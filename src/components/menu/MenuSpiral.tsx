import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Canvas } from '@react-three/fiber';
import { Sparkles, Caustics, Environment, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

import Reusable3DBackground from "../common/Reusable3DBackground";
import { menuData } from "../../data/menuData";
import type { MainCategory } from "../../types";



const MenuSpiral: React.FC<{ activeCategory?: string }> = ({ activeCategory = "Lunch" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const openRef = useRef(open);
  openRef.current = open;

  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const transitionRef = useRef(0);

  // Prepare exactly 20 items to match the density of the provided code
  const filteredItems = menuData.filter((item) =>
    item.mealType.includes(activeCategory as any)
  );
  const baseItems = filteredItems.length > 0 ? filteredItems : menuData;
  const items: MainCategory[] = [];
  while (items.length < 20) {
    items.push(...baseItems as any);
  }
  const displayedItems = items.slice(0, 20);

  const getResponsiveValues = () => {
    if (typeof window === "undefined") return { radius: 800, spacing: 250 };
    const width = window.innerWidth;
    if (width < 480) return { radius: 300, spacing: 180 };
    if (width < 768) return { radius: 400, spacing: 200 };
    if (width < 1024) return { radius: 600, spacing: 220 };
    return { radius: 800, spacing: 250 };
  };

  useEffect(() => {
    const prevOverflowX = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = "hidden";

    const cards = cardsRef.current;
    const total = cards.length;
    const { radius, spacing } = getResponsiveValues();
    const totalHeight = total * spacing;

    const minScroll = -totalHeight / 2;
    const maxScroll = totalHeight / 2;

    const updateCards = () => {
      // Transition logic for sidebar opening
      const targetTransition = openRef.current ? 1 : 0;
      transitionRef.current += (targetTransition - transitionRef.current) * 0.1;

      if (Math.abs(targetTransition - transitionRef.current) < 0.001) {
        transitionRef.current = targetTransition;
      }
      const t = transitionRef.current;

      cards.forEach((card, i) => {
        if (!card) return;

        // Spiral math from "perfect" version
        const offset = i * spacing;
        let spiralY = offset + scrollYRef.current;
        spiralY -= totalHeight / 2;

        const progress = spiralY / totalHeight;
        const angle = progress * Math.PI * 2 * 4;
        const isVisibleSpiral = spiralY >= minScroll && spiralY <= maxScroll;

        // Vertical List Positioning (from "old way")
        const vertSpacing = isMobile ? 80 : 120;
        const vertY = (i - (total - 1) / 2) * vertSpacing;

        // --- BLENDING LOGIC (Merged) ---
        const currentLeftPct = 50 + (15 - 50) * t;
        const currentY = spiralY * (1 - t) + vertY * t;
        const currentRotationY = ((angle * 180) / Math.PI) * (1 - t);
        const currentTZ = -radius * (1 - t);

        // Z-Index calculation
        const zIndex = Math.round(Math.cos(angle) * 100 * (1 - t)) + 10;

        // Opacity blend
        const opacity = (isVisibleSpiral ? 1 : 0) * (1 - t) + 1 * t;

        gsap.set(card, {
          y: currentY,
          rotationY: currentRotationY,
          transformOrigin: `50% 50% ${currentTZ}px`,
          xPercent: -50,
          yPercent: -50,
          left: `${currentLeftPct}%`,
          top: "50%",
          opacity: opacity,
          zIndex: zIndex
        });
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (openRef.current) return;
      const newTargetScroll = targetScrollYRef.current - e.deltaY * 0.5;
      targetScrollYRef.current = Math.max(minScroll, Math.min(maxScroll, newTargetScroll));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    const ticker = gsap.ticker.add(() => {
      if (!openRef.current) {
        scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.1;
      }
      updateCards();
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      gsap.ticker.remove(ticker);
      document.documentElement.style.overflowX = prevOverflowX;
    };
  }, [displayedItems, isMobile]);

  const selectedCategory: MainCategory | null =
    selected !== null ? displayedItems[selected % displayedItems.length] : null;

  return (
    <Box
      ref={containerRef}
      sx={{
        perspective: "1500px",
        width: "100%",
        height: "100vh",
        background: "#001e36",
        overflow: "hidden",
        position: "relative",
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#aaccff",
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <Reusable3DBackground />

      {/* Sidebar Overlay (Functional Layer) */}
      <Box
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          zIndex: 500,
          transition: "opacity 0.6s ease",
          cursor: "pointer"
        }}
      />

      {/* Spiral Cards */}
      {displayedItems.map((item, i) => (
        <Box
          key={i}
          ref={(el: HTMLDivElement | null) => {
            cardsRef.current[i] = el;
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelected(i);
            setOpen(true);
          }}
          className="spiral-card"
          sx={{
            width: "90%",
            maxWidth: "400px",
            aspectRatio: "1/1",
            background: `url(${item.imageUrl}) center/cover no-repeat`,
            borderRadius: "16px",
            position: "absolute",
            boxShadow: "0 25px 50px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.5)",
            opacity: 0,
            border: "1px solid rgba(0, 255, 255, 0.3)",
            cursor: "pointer",
            transition: "border 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              border: "1px solid rgba(255, 140, 0, 0.8)",
              boxShadow: "0 0 30px rgba(255, 140, 0, 0.4), 0 25px 50px rgba(0,0,0,0.9)"
            }
          }}
        />
      ))}

      {/* Side Panel Detail View (Old Way Restored) */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: "100%", sm: "100%", md: "70%", lg: "70%" },
          boxSizing: "border-box",
          background: "rgba(0, 15, 27, 0.9)",
          backdropFilter: "blur(40px) saturate(150%)",
          WebkitBackdropFilter: "blur(40px) saturate(150%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "-40px 0 100px rgba(0,0,0,0.9)",
          zIndex: 3000,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          p: 0,
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          aria-label="Close menu panel"
          sx={{
            position: "absolute",
            top: { xs: "80px", md: "110px" },
            right: { xs: "20px", md: "25px" },
            zIndex: 3100,
            color: "#FF8C00",
            bgcolor: "rgba(255,140,0,0.1)",
            "&:hover": { bgcolor: "rgba(255,140,0,0.2)", transform: "rotate(90deg)" },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 4, md: 8 },
            pt: { xs: 12, md: 10 },
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "#FF8C00",
              borderRadius: "4px",
            },
          }}
        >
          {/* Title Header */}
          <Box sx={{ p: { xs: 4, md: 5 }, pb: 0, textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                color: "#FF8C00",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: "0 0 20px rgba(255, 140, 0, 0.4)",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              {selectedCategory?.title}
            </Typography>
            <Box sx={{ width: "60px", height: "2px", bgcolor: "rgba(0, 255, 255, 0.3)", mx: "auto", mt: 2 }} />
          </Box>

          {/* Menu Content */}
          <Box sx={{ p: { xs: 3, md: 5 }, pt: 2 }}>
            {selectedCategory?.subCategories.map((sub, idx) => (
              <Box key={idx} sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#FF8C00",
                    fontWeight: 600,
                    mb: 3,
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: "0.05em",
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {sub.title}
                </Typography>
                <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  {sub.items.map((menuItem) => (
                    <ListItem
                      key={menuItem.id}
                      sx={{
                        p: 0,
                        mb: 2.5,
                        borderRadius: "16px",
                        background: "rgba(0, 0, 0, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0, left: 0, bottom: 0, width: "6px",
                          background: "#FF8C00",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          zIndex: 1,
                        },
                        "&:hover": {
                          background: "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.85) 100%)",
                          borderColor: "#FF8C00",
                          boxShadow: "0 0 25px rgba(255, 140, 0, 0.15), inset 0 0 20px rgba(255, 140, 0, 0.05)",
                          transform: "translateX(8px)",
                          "&::before": { opacity: 1 },
                          "& .item-image": {
                            boxShadow: "0 0 20px rgba(255, 140, 0, 0.5)",
                            borderColor: "#FF8C00",
                          },
                          "& .price-pill": {
                            bgcolor: "#FF8C00",
                            color: "#000000",
                            boxShadow: "0 0 20px rgba(255, 140, 0, 0.6)",
                            borderColor: "#FF8C00",
                          },
                        },
                      }}
                    >
                      <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        width: "100%",
                        alignItems: { xs: "center", md: "center" },
                        position: "relative",
                        zIndex: 2,
                      }}>
                        <Box
                          className="item-image"
                          sx={{
                            width: { xs: "120px", md: "100px" },
                            height: { xs: "120px", md: "100px" },
                            minWidth: { xs: "auto", md: "100px" },
                            background: `url(${menuItem.imageUrl}) center/cover no-repeat`,
                            m: { xs: "20px auto 10px auto", md: 2 },
                            ml: { xs: "auto", md: 3 },
                            borderRadius: { xs: "50%", md: "12px" },
                            transition: "all 0.4s ease",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                          }}
                        />

                        <Box sx={{
                          flex: 1,
                          px: { xs: 3, md: 2 },
                          py: 2,
                          minWidth: 0,
                          textAlign: { xs: "center", md: "left" }
                        }}>
                          <Box sx={{
                            display: "flex",
                            justifyContent: { xs: "center", md: "space-between" },
                            alignItems: { xs: "center", md: "flex-start" },
                            mb: 0.5,
                            flexDirection: { xs: "column", md: "row" },
                            gap: { xs: 1, md: 0 },
                          }}>
                            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "1.1rem", md: "1.2rem" }, fontFamily: "'Raleway', sans-serif" }}>
                              {menuItem.name}
                              {menuItem.popular && (
                                <Box component="span" sx={{ display: { xs: "block", md: "inline-block" }, ml: { xs: 0, md: 1 }, color: "#FF8C00", fontSize: "0.75rem", fontWeight: 600 }}>★ Popular</Box>
                              )}
                            </Typography>
                            <Box className="price-pill" sx={{ display: { xs: "inline-block", md: "none" }, color: "#FF8C00", border: "1px solid rgba(255, 140, 0, 0.6)", px: 2, py: 0.5, borderRadius: "50px", fontWeight: 700, fontSize: "0.95rem" }}>
                              {menuItem.price}
                            </Box>
                          </Box>
                          <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.9rem", lineHeight: 1.5, mb: 1, fontFamily: "'Inter', sans-serif" }}>
                            {menuItem.description}
                          </Typography>
                        </Box>

                        <Box sx={{ pr: 3, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                          <Box className="price-pill" sx={{ color: "#FF8C00", border: "1px solid rgba(255, 140, 0, 0.6)", px: 2.5, py: 1, borderRadius: "50px", fontWeight: 700 }}>
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
      </Box>

      <style>{`
                @media (max-width: 1024px) { .spiral-card { max-width: 350px; } }
                @media (max-width: 768px) { .spiral-card { max-width: 300px; } }
                @media (max-width: 480px) { .spiral-card { max-width: 250px; } }
            `}</style>
    </Box>
  );
};

export default MenuSpiral;
