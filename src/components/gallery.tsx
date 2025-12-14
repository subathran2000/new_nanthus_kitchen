
import React, { useState } from 'react'
import { Box, Container, Typography, Modal, IconButton, useTheme, useMediaQuery } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import { motion, AnimatePresence } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Caustics, Environment, Cloud } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

// Reuse BackgroundScene from menu.tsx logic
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
            >
            </Caustics>

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
    )
}

// Mock Data for the Gallery
const portfolioItems = [
    { id: 1, title: 'Underwater Life', category: 'Photography', img: 'https://images.unsplash.com/photo-1582967788606-a171f1080cae?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'Deep Ocean', category: 'Exploration', img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'Coral Reefs', category: 'Nature', img: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1974&auto=format&fit=crop' },
    { id: 4, title: 'Bioluminescence', category: 'Science', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, title: 'Abyss', category: 'Mystery', img: 'https://images.unsplash.com/photo-1516663713099-37eb6d60c825?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, title: 'Marine Species', category: 'Biology', img: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2066&auto=format&fit=crop' },
    { id: 7, title: 'Shipwrecks', category: 'History', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop' },
    { id: 8, title: 'Blue World', category: 'Art', img: 'https://images.unsplash.com/photo-1580019542155-247062e19ce4?q=80&w=2127&auto=format&fit=crop' },
        { id: 1, title: 'Underwater Life', category: 'Photography', img: 'https://images.unsplash.com/photo-1582967788606-a171f1080cae?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'Deep Ocean', category: 'Exploration', img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'Coral Reefs', category: 'Nature', img: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1974&auto=format&fit=crop' },
    { id: 4, title: 'Bioluminescence', category: 'Science', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, title: 'Abyss', category: 'Mystery', img: 'https://images.unsplash.com/photo-1516663713099-37eb6d60c825?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, title: 'Marine Species', category: 'Biology', img: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2066&auto=format&fit=crop' },
    { id: 7, title: 'Shipwrecks', category: 'History', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop' },
    { id: 8, title: 'Blue World', category: 'Art', img: 'https://images.unsplash.com/photo-1580019542155-247062e19ce4?q=80&w=2127&auto=format&fit=crop' },
]

const Gallery = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    const [selectedId, setSelectedId] = useState<number | null>(null)

    const columns = isMobile ? 1 : isTablet ? 2 : 3

    return (
        <Box sx={{
            py: 10,
            bgcolor: '#001e36',
            minHeight: '100vh',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 1,
            },
        }}>
            {/* 3D Background */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <color attach="background" args={['#001e36']} />
                    <fog attach="fog" args={['#001e36', 5, 25]} />
                    <BackgroundScene />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </Box>

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, letterSpacing: '-0.02em' }}>
                            Selected Works
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#aaccff', maxWidth: '600px', mx: 'auto' }}>
                            A collection of immersive underwater experiences and digital art.
                        </Typography>
                    </motion.div>
                </Box>

                <Masonry columns={columns} spacing={3}>
                    {portfolioItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            onClick={() => setSelectedId(item.id)}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    '&:hover .overlay': {
                                        opacity: 1,
                                    },
                                    '&:hover img': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        height: 'auto',
                                        transition: 'transform 0.5s ease',
                                    }}
                                />
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        bgcolor: 'rgba(0, 30, 54, 0.8)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        backdropFilter: 'blur(3px)',
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                                    <Typography variant="caption" sx={{ color: '#00ffff', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                        {item.category}
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    ))}
                </Masonry>
            </Container>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedId && (
                    <Modal
                        open={!!selectedId}
                        onClose={() => setSelectedId(null)}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ outline: 'none', maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}
                        >
                            <IconButton
                                onClick={() => setSelectedId(null)}
                                sx={{ position: 'absolute', top: -40, right: 0, color: '#fff' }}
                            >
                                <CloseIcon fontSize="large" />
                            </IconButton>
                            <img
                                src={portfolioItems.find(i => i.id === selectedId)?.img}
                                alt="Full view"
                                style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                            />
                        </motion.div>
                    </Modal>
                )}
            </AnimatePresence>
        </Box>
    )
}

export default Gallery
