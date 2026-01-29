import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- 3D Components ---

const CyberGlobe = () => {
    const globeRef = useRef<THREE.Group>(null);

    // Generate random points on a sphere
    const points = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 50; i++) {
            const phi = Math.acos(-1 + (2 * i) / 50);
            const theta = Math.sqrt(50 * Math.PI) * phi;
            const x = 5 * Math.cos(theta) * Math.sin(phi);
            const y = 5 * Math.sin(theta) * Math.sin(phi);
            const z = 5 * Math.cos(phi);
            temp.push(new THREE.Vector3(x, y, z));
        }
        return temp;
    }, []);

    // Generate arcs between random points
    const arcs = useMemo(() => {
        const lines = [];
        for (let i = 0; i < 30; i++) {
            const start = points[Math.floor(Math.random() * points.length)];
            const end = points[Math.floor(Math.random() * points.length)];
            const mid = start.clone().add(end).multiplyScalar(1.5); // Control point for curve
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            lines.push(curve.getPoints(20));
        }
        return lines;
    }, [points]);

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={globeRef}>
            {/* Wireframe Core */}
            <mesh>
                <sphereGeometry args={[5, 32, 32]} />
                <meshBasicMaterial color="#003366" wireframe transparent opacity={0.3} />
            </mesh>

            {/* Solid Inner Core (Dark) */}
            <mesh>
                <sphereGeometry args={[4.8, 32, 32]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Nodes */}
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color="#FFD700" />
                </mesh>
            ))}

            {/* Arcs (Data Flow) */}
            {arcs.map((linePoints, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={linePoints.length}
                            array={new Float32Array(linePoints.flatMap(p => [p.x, p.y, p.z]))}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00ffff" transparent opacity={0.6} />
                </line>
            ))}

            {/* Outer Shield / Scanning Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[6, 6.1, 64]} />
                <meshBasicMaterial color="#00ffff" side={THREE.DoubleSide} transparent opacity={0.5} />
            </mesh>
        </group>
    );
};

const CyberScene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 20, 20]} intensity={1} color="#00ffff" />
            <pointLight position={[-20, -20, -20]} intensity={0.5} color="#FFD700" />
            <CyberGlobe />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};

// --- UI Components ---

const LandingPage3D: React.FC = () => {
    return (
        <Box sx={{ width: '100vw', height: '100vh', position: 'relative', bgcolor: '#050505', overflow: 'hidden' }}>

            {/* 3D Canvas Background */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
                    <CyberScene />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </Box>

            {/* Foreground Content */}
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Typography variant="overline" sx={{ color: '#00ffff', letterSpacing: '0.5em', fontSize: '1rem', textShadow: '0 0 10px #00ffff' }}>
                        SYSTEM ONLINE
                    </Typography>
                    <Typography variant="h1" sx={{
                        fontFamily: '"Courier New", monospace', // Placeholder for a tech font
                        fontWeight: 800,
                        color: '#fff',
                        fontSize: { xs: '3rem', md: '6rem' },
                        lineHeight: 1,
                        mb: 2,
                        textTransform: 'uppercase',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                    }}>
                        FUTURE OF <br />
                        <span style={{ color: '#FFD700', textShadow: '0 0 20px #D9A756' }}>FLAVOR</span>
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#ccc', maxWidth: '600px', mb: 6, fontFamily: '"Outfit", sans-serif', fontWeight: 300, letterSpacing: '0.1em' }}>
                        Initiating culinary sequence. Analyzing global taste profiles.
                        Experience the digital gastronomy ecosystem of Nanthus Kitchen.
                    </Typography>

                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#00ffff',
                            color: '#00ffff',
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            letterSpacing: '0.2em',
                            borderWidth: '2px',
                            borderRadius: 0,
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                            '&:hover': {
                                borderColor: '#FFD700',
                                color: '#FFD700',
                                boxShadow: '0 0 40px rgba(217, 167, 86, 0.6)',
                                backgroundColor: 'rgba(217, 167, 86, 0.1)'
                            }
                        }}
                    >
                        ENTER SYSTEM
                    </Button>
                </motion.div>
            </Container>

            {/* HUD Elements / Overlay */}
            <Box sx={{ position: 'absolute', bottom: 40, right: 40, zIndex: 10, textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: 'rgba(0, 255, 255, 0.5)', display: 'block', fontFamily: 'monospace' }}>
                    LAT: 43.8561° N
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(0, 255, 255, 0.5)', display: 'block', fontFamily: 'monospace' }}>
                    LONG: 79.3370° W
                </Typography>
                <Typography variant="caption" sx={{ color: '#FFD700', display: 'block', fontFamily: 'monospace', mt: 1 }}>
                    STATUS: OPTIMAL
                </Typography>
            </Box>

        </Box>
    );
};

export default LandingPage3D;
