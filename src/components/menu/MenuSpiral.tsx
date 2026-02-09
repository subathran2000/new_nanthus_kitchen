import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
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

import { menuData } from "../../data/menuData";
import type { MainCategory } from "../../types";

interface SpiralBackgroundProps {
  activeCategory?: string;
  onPanelOpenChange?: (open: boolean) => void;
}

const MotionBox = motion(Box);

const MenuSpiral: React.FC<SpiralBackgroundProps> = ({
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

  // Reset scroll when category changes
  useEffect(() => {
    scrollYRef.current = 0;
    targetScrollYRef.current = 0;
  }, [activeCategory]);

  const getResponsiveValues = () => {
    // Tight spiral: small radius and minimal step so cards sit close together
    if (typeof window === "undefined") return { radius: 580, spacing: 110 };
    const width = window.innerWidth;
    if (width < 480) return { radius: 240, spacing: 85 };
    if (width < 768) return { radius: 320, spacing: 95 };
    if (width < 1024) return { radius: 440, spacing: 105 };
    return { radius: 580, spacing: 110 };
  };

  useEffect(() => {
    if (!isSpiral) return;

    const prevOverflowX = document.documentElement.style.overflowX;
    document.documentElement.style.overflowX = "hidden";

    const cards = cardsRef.current;
    const total = cards.length;

    const { radius, spacing } = getResponsiveValues();
    const totalHeight = total * spacing;

    const minScroll = -totalHeight / 2;
    const maxScroll = totalHeight / 2;

    const updateCards = () => {
      const targetTransition = openRef.current ? 1 : 0;
      transitionRef.current += (targetTransition - transitionRef.current) * 0.1;

      if (Math.abs(targetTransition - transitionRef.current) < 0.001) {
        transitionRef.current = targetTransition;
      }

      const t = transitionRef.current;

      cards.forEach((card, i) => {
        if (!card) return;

        const offset = i * spacing;
        let spiralY = offset + scrollYRef.current;
        spiralY -= totalHeight / 2;

        const progress = spiralY / totalHeight;
        const angle = progress * Math.PI * 2 * 4;
        const isVisibleSpiral = spiralY >= minScroll && spiralY <= maxScroll;

        const vertSpacing = isMobile ? 80 : 120;
        const vertY = (i - (total - 1) / 2) * vertSpacing;

        // When open (t=1), shift cards to the center of the left 30% area (~15%); scrollable via scrollYRef
        const currentLeftPct = 50 + (15 - 50) * t;
        const currentY = spiralY * (1 - t) + (vertY + scrollYRef.current) * t;
        const currentRotationY = ((angle * 180) / Math.PI) * (1 - t);
        const currentTZ = -radius * (1 - t);

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
          zIndex: Math.round(Math.cos(angle) * 100 * (1 - t)) + (openRef.current ? 600 : 10),
        });
      });
    };

    const handleWheel = (e: WheelEvent) => {
      const newTargetScroll = targetScrollYRef.current - e.deltaY * 0.5;
      targetScrollYRef.current = Math.max(
        minScroll,
        Math.min(maxScroll, newTargetScroll),
      );
    };

    let touchStartY = 0;
    let touchLastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchLastY - touchY;
      touchLastY = touchY;

      const newTargetScroll = targetScrollYRef.current - deltaY * 2;
      targetScrollYRef.current = Math.max(
        minScroll,
        Math.min(maxScroll, newTargetScroll),
      );
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
      touchLastY = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    const ticker = gsap.ticker.add(() => {
      scrollYRef.current +=
        (targetScrollYRef.current - scrollYRef.current) * 0.1;
      updateCards();
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
      }}
    >
      {/* Universal Glow Background */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 60%)",
        pointerEvents: "none",
        zIndex: 1,
      }}
      />

      {/* Backdrop for side panel - dims the left side only, no blur so cards stay sharp */}
      <Box
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          zIndex: 500,
          transition: "opacity 0.6s ease",
          cursor: "pointer"
        }}
      />

      {/* Conditional Rendering: Spiral vs Horizontal */}
      {isSpiral ? (
        // 3D Spiral Mode
        displayedItems.map((item, i) => (
          <Box
            key={item.id}
            onClick={() => {
              setSelected(i);
              setOpen(true);
            }}
            ref={(el: HTMLDivElement | null) => {
              cardsRef.current[i] = el;
            }}
            className="spiral-card"
            sx={{
              width: "92%",
              maxWidth: "430px",
              aspectRatio: "1/1",
              background: `url(${item.imageUrl}) center/cover no-repeat`,
              borderRadius: "24px",
              position: "absolute",
              opacity: 0,
              border: "1px solid rgba(0, 255, 255, 0.2)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
              cursor: "pointer",
              userSelect: "none",
              transition: "border 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: open ? "flex-start" : "flex-end",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "24px",
                boxShadow: "inset 0 0 20px rgba(0,255,255,0.1)",
                pointerEvents: "none"
              },
              "&:hover": {
                border: "1px solid rgba(255, 140, 0, 0.6)",
                boxShadow: "0 0 30px rgba(255, 140, 0, 0.3), 0 30px 60px rgba(0,0,0,0.8)"
              },
              "&:hover .spiral-card-title": {
                backgroundImage: "linear-gradient(135deg, #fff 0%, #FF8C00 50%, #ffd700 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 12px rgba(255, 140, 0, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
              },
              "&:hover .spiral-card-accent": { width: "100%", opacity: 1 }
            }}
          >
            {/* Gradient veil: top when panel open (aligned list), bottom when spiral */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "50%",
                ...(open
                  ? {
                    top: 0,
                    background: "linear-gradient(to bottom, rgba(0,30,54,0.92) 0%, rgba(0,30,54,0.4) 50%, transparent 100%)",
                    borderRadius: "24px 24px 0 0"
                  }
                  : {
                    bottom: 0,
                    background: "linear-gradient(to top, rgba(0,30,54,0.92) 0%, rgba(0,30,54,0.4) 50%, transparent 100%)",
                    borderRadius: "0 0 24px 24px"
                  }),
                pointerEvents: "none",
                zIndex: 1,
                transition: "top 0.35s ease, bottom 0.35s ease, background 0.35s ease, borderRadius 0.35s ease"
              }}
            />
            {/* Glass strip for title: top when panel open, bottom when spiral */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                zIndex: 2,
                mx: 1.5,
                py: 1.5,
                px: 2,
                ...(open ? { top: 0, mt: 1.5 } : { bottom: 0, mb: 1.5 }),
                borderRadius: "16px",
                background: "rgba(0, 30, 54, 0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)",
                transition: "top 0.35s ease, bottom 0.35s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  borderColor: "rgba(255, 140, 0, 0.5)",
                  boxShadow: "inset 0 0 20px rgba(255, 140, 0, 0.1), 0 8px 32px rgba(0,0,0,0.4)"
                }
              }}
            >
              {/* Accent line above title (when at top, line stays above text; when at bottom, same) */}
              <Box
                className="spiral-card-accent"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "40%",
                  height: "2px",
                  borderRadius: 1,
                  background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent)",
                  opacity: 0.8,
                  transition: "width 0.4s ease, opacity 0.3s ease"
                }}
              />
              <Typography
                className="spiral-card-title"
                component="span"
                sx={{
                  display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.15rem", sm: "1.4rem", md: "1.65rem" },
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, #FF8C00 40%, #ffb347 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
                  transition: "all 0.4s ease",
                  lineHeight: 1.2,
                  textAlign: "center"
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        // Horizontal List Mode (for 1-2 items)
        <Box
          component={motion.div}
          animate={{
            x: open && !isMobile ? "-35%" : "0%", // Shift more aggressively to clear the 70% panel
            scale: open && !isMobile ? 0.85 : 1
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 3, md: 8 },
            width: "100%",
            height: "100%",
            flexDirection: { xs: "column", md: "row" },
            px: 4,
            zIndex: open ? 600 : 10,
            position: "relative"
          }}
        >
          {displayedItems.map((item, i) => (
            <MotionBox
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => {
                setSelected(i);
                setOpen(true);
              }}
              sx={{
                width: "90%",
                maxWidth: { xs: "300px", md: "420px" },
                aspectRatio: "1/1",
                background: `url(${item.imageUrl}) center/cover no-repeat`,
                borderRadius: "32px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                position: "relative",
                overflow: "hidden",
                filter: open && !isMobile ? "blur(3px) brightness(0.7)" : "none",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                  opacity: 0.6
                },
                "&:hover": {
                  boxShadow: "0 0 40px rgba(255, 140, 0, 0.4), 0 40px 80px rgba(0,0,0,1)",
                  borderColor: "rgba(255, 140, 0, 0.8)"
                }
              }}
            >
              <Box sx={{
                position: "absolute",
                bottom: 30,
                left: 0,
                right: 0,
                textAlign: "center"
              }}>
                <Typography variant="h5" sx={{
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}>
                  {item.title}
                </Typography>
              </Box>
            </MotionBox>
          ))}
        </Box>
      )}

      {/* Side Panel Detail View */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: "100%", sm: "100%", md: "70%", lg: "70%" }, // Take 70% of screen to meet the 30% card area
          maxWidth: "100%",
          boxSizing: "border-box",
          background: "rgba(0, 15, 27, 0.9)",
          backdropFilter: "blur(40px) saturate(150%)",
          WebkitBackdropFilter: "blur(40px) saturate(150%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "-40px 0 100px rgba(0,0,0,0.9)",
          zIndex: 1000,
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
            top: { xs: "80px", md: "100px" },
            right: { xs: "20px", md: "25px" },
            zIndex: 1100,
            color: "#FF8C00",
            bgcolor: "rgba(255,140,0,0.1)",
            "&:hover": {
              bgcolor: "rgba(255,140,0,0.2)",
              transform: "rotate(90deg)",
            },
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
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: "0 0 20px rgba(255, 140, 0, 0.4)",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              {selectedCategory?.title}
            </Typography>
            <Box
              sx={{
                width: "60px",
                height: "2px",
                bgcolor: "rgba(0, 255, 255, 0.3)",
                mx: "auto",
                mt: 2,
              }}
            />
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
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.05em",
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                  }}
                >
                  {sub.title}
                </Typography>
                <List
                  sx={{
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
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
                          top: 0,
                          left: 0,
                          bottom: 0,
                          width: "6px",
                          background: "#FF8C00",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          zIndex: 1,
                        },
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.85) 100%)",
                          borderColor: "#FF8C00",
                          boxShadow:
                            "0 0 25px rgba(255, 140, 0, 0.15), inset 0 0 20px rgba(255, 140, 0, 0.05)",
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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          width: "100%",
                          alignItems: { xs: "stretch", md: "center" },
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        <Box
                          className="item-image"
                          sx={{
                            width: { xs: "100%", md: "100px" },
                            height: { xs: "180px", md: "100px" },
                            minWidth: { xs: "auto", md: "100px" },
                            background: `url(${menuItem.imageUrl}) center/cover no-repeat`,
                            m: { xs: 0, md: 2 },
                            ml: { xs: 0, md: 3 },
                            borderRadius: { xs: "16px 16px 0 0", md: "12px" },
                            transition: "all 0.4s ease",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                          }}
                        />

                        <Box
                          sx={{
                            flex: 1,
                            px: { xs: 2, md: 2 },
                            py: 2,
                            minWidth: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 0.5,
                              flexDirection: { xs: "column", md: "row" },
                              gap: { xs: 1, md: 0 },
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "1.1rem", md: "1.2rem" },
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: "0.02em",
                              }}
                            >
                              {menuItem.name}
                              {menuItem.popular && (
                                <Box
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    color: "#FF8C00",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  ★ Popular
                                </Box>
                              )}
                            </Typography>

                            <Box
                              className="price-pill"
                              sx={{
                                display: { xs: "block", md: "none" },
                                bgcolor: "transparent",
                                color: "#FF8C00",
                                border: "1px solid rgba(255, 140, 0, 0.6)",
                                px: 2,
                                py: 0.5,
                                borderRadius: "50px",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                fontFamily: "'Inter', sans-serif",
                                transition: "all 0.4s ease",
                                letterSpacing: "0.05em",
                                alignSelf: "flex-start",
                              }}
                            >
                              {menuItem.price}
                            </Box>
                          </Box>

                          <Typography
                            sx={{
                              color: "rgba(255, 255, 255, 0.6)",
                              fontSize: "0.9rem",
                              lineHeight: 1.5,
                              mb: 1,
                              fontFamily: "'Inter', sans-serif",
                              maxWidth: "90%",
                            }}
                          >
                            {menuItem.description}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            pr: 2,
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Box
                            className="price-pill"
                            sx={{
                              bgcolor: "transparent",
                              color: "#FF8C00",
                              border: "1px solid rgba(255, 140, 0, 0.6)",
                              px: 2.5,
                              py: 1,
                              borderRadius: "50px",
                              fontWeight: 700,
                              fontSize: "1rem",
                              fontFamily: "'Inter', sans-serif",
                              transition: "all 0.4s ease",
                              letterSpacing: "0.05em",
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
      </Box>

      <style>{`
        @media (max-width: 1024px) { .spiral-card { max-width: 380px; } }
        @media (max-width: 768px) { .spiral-card { max-width: 320px; } }
        @media (max-width: 480px) { .spiral-card { max-width: 270px; } }
        @media (max-width: 375px) { .spiral-card { max-width: 220px; } }
      `}</style>
    </Box>
  );
};

export default MenuSpiral;