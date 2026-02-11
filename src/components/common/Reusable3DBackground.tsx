import React, { Suspense, useCallback } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { Sparkles, Cloud, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import type { WebGLRenderer } from "three";

const BackgroundScene: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <group>
      {/* Warm golden sparkles */}
      <Sparkles
        count={isMobile ? 60 : 150}
        scale={15}
        size={3}
        speed={0.4}
        opacity={0.5}
        color="#F5A623"
      />
      {!isMobile && (
        <Sparkles
          count={80}
          scale={10}
          size={5}
          speed={0.15}
          opacity={0.15}
          color="#FFD166"
        />
      )}

      {/* Warm atmospheric fog */}
      <Cloud
        opacity={0.08}
        speed={0.08}
        segments={isMobile ? 5 : 10}
        position={[0, -5, -10]}
        color="#60A5FA"
      />

      {/* Warm lighting */}
      <ambientLight intensity={0.4} color="#0A1628" />
      <spotLight
        position={[0, 15, 5]}
        intensity={1.5}
        angle={0.6}
        penumbra={1}
        color="#F5A623"
      />
      <pointLight position={[8, 8, 8]} intensity={0.5} color="#FFD166" />

      {/* Environment for reflections */}
      <Environment preset="city" blur={1} />
    </group>
  );
};

const Reusable3DBackground: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  // Handle WebGL context loss gracefully
  const handleCreated = useCallback(({ gl }: { gl: WebGLRenderer }) => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault(); // Allow automatic context restoration
      console.info("WebGL context lost — will restore automatically.");
    });
    canvas.addEventListener("webglcontextrestored", () => {
      console.info("WebGL context restored.");
    });
  }, []);

  // Skip 3D entirely if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background:
            "radial-gradient(ellipse at center, #0F1D32 0%, #0A1628 100%)",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{
          powerPreference: "low-power",
          antialias: !isMobile,
          stencil: false,
          depth: !isMobile,
        }}
        onCreated={handleCreated}
      >
        <color attach="background" args={["#0A1628"]} />
        <fog attach="fog" args={["#0A1628", 8, 30]} />
        <Suspense fallback={null}>
          <BackgroundScene isMobile={isMobile} />
        </Suspense>
        {!isMobile && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={0.9}
              height={300}
              intensity={0.5}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        )}
      </Canvas>
    </Box>
  );
};

export default Reusable3DBackground;
