import { useEffect, useMemo, type FC } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "@mui/material";

/** Maximum sparkles — reduced from 300 for dramatically better performance. */
const SPARKLE_COUNT_DESKTOP = 80;
const SPARKLE_COUNT_MOBILE = 30;

/** Single parallax star — extracted so hooks are at the component top-level. */
const Star: FC<{
  star: {
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    depth: number;
  };
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}> = ({ star, springX, springY }) => {
  const halfW = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const halfH = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const px = useTransform(springX, (v: number) => (v - halfW) * star.depth);
  const py = useTransform(springY, (v: number) => (v - halfH) * star.depth);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{
        duration: star.duration,
        repeat: Infinity,
        delay: star.delay,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: `${star.x}%`,
        top: `${star.y}%`,
        x: px,
        y: py,
        width: star.size,
        height: star.size,
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.8)",
      }}
    />
  );
};

const Sparkles: FC = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const followerX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const followerY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (isTouchDevice) return; // No mouse tracking on touch devices
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isTouchDevice]);

  const count = isMobile ? SPARKLE_COUNT_MOBILE : SPARKLE_COUNT_DESKTOP;

  // Generate star config once — memoized to prevent re-creating on every render
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        depth: Math.random() * 0.08 + 0.01,
      })),
    [count],
  );

  // Respect prefers-reduced-motion — skip the sparkles entirely
  if (prefersReducedMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <Star key={star.id} star={star} springX={springX} springY={springY} />
      ))}

      {/* Cursor follower — hidden on touch devices */}
      {!isTouchDevice && (
        <motion.div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 70%)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
            pointerEvents: "none",
            zIndex: 2005,
            x: followerX,
            y: followerY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </div>
  );
};

export default Sparkles;
