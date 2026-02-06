import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Cloud, Environment, Caustics } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

const BackgroundScene = () => {
    return (
        <group>
            {/* Caustics Effect */}
            <Caustics
                color="#00ffff"
                position={[0, -5, 0]}
                lightSource={[5, 5, -10]}
                worldRadius={10}
                ior={1.1}
                intensity={0.2}
                causticsOnly={false}
                backside={false}
            />

            {/* Bubbles */}
            <Sparkles count={300} scale={15} size={4} speed={0.6} opacity={0.6} color="#aaccff" />
            <Sparkles count={150} scale={10} size={10} speed={0.2} opacity={0.2} color="#ffffff" />

            {/* Subtle Cloud/Fog for depth */}
            <Cloud opacity={0.1} speed={0.1} segments={10} position={[0, -5, -10]} color="#aaccff" />

            {/* Lighting */}
            <ambientLight intensity={0.5} color="#001e36" />
            <spotLight position={[0, 20, 0]} intensity={2} angle={0.5} penumbra={1} color="#ccffff" castShadow />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />

            {/* Environment for reflections */}
            <Environment preset="city" blur={1} />
        </group>
    );
};

const Reusable3DBackground: React.FC = () => {
    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <color attach="background" args={['#001e36']} />
                <fog attach="fog" args={['#001e36', 5, 25]} />
                <Suspense fallback={null}>
                    <BackgroundScene />
                </Suspense>
                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
        </Box>
    );
};

export default Reusable3DBackground;
