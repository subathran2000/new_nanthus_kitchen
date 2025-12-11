import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = ({ count = 100, color = '#ffffff' }) => {
    const mesh = useRef<THREE.Points>(null!);

    useFrame(() => {
        if (!mesh.current) return;

        // Rotate the entire swarm slowly
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.z += 0.0005;
    });

    return (
        <Sparkles
            count={count}
            scale={12}
            size={4}
            speed={0.4}
            opacity={0.5}
            color={color}
        />
    );
};

const UnderwaterScene = () => {
    return (
        <>
            <color attach="background" args={['#000510']} />
            <fog attach="fog" args={['#000510', 5, 20]} />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#0040ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <ParticleSwarm count={300} color="#4080ff" />
                <ParticleSwarm count={100} color="#ffffff" />
            </Float>

            {/* Deep water particles */}
            <Sparkles count={500} scale={20} size={2} speed={0.2} opacity={0.2} color="#002040" />
        </>
    );
};

const LandingPage2 = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <UnderwaterScene />
            </Canvas>

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                zIndex: 10
            }}>
                <nav style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    pointerEvents: 'auto'
                }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>LUSION</div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Work</a>
                        <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>About</a>
                        <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Contact</a>
                    </div>
                </nav>

                <h1 style={{
                    fontSize: '12vw',
                    fontWeight: 900,
                    lineHeight: 0.8,
                    margin: 0,
                    letterSpacing: '-0.05em',
                    background: 'linear-gradient(to bottom, #fff, #88aaff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(0,100,255,0.5))'
                }}>
                    DEEP<br />DIVE
                </h1>

                <p style={{
                    marginTop: '2rem',
                    fontSize: '1.2rem',
                    maxWidth: '400px',
                    textAlign: 'center',
                    opacity: 0.7,
                    lineHeight: 1.6
                }}>
                    Explore the depths of digital immersion.
                </p>
            </div>
        </div>
    );
};

export default LandingPage2;
