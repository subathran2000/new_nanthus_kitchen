import React, { useMemo } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import {
    Restaurant,
    MenuBook,
    LocalDining,
    Info,
    Phone,
    LocationOn,
    Star,
    EmojiEvents,
    Groups,
    OutdoorGrill,
    Coffee,
    Liquor,
    Close,
    Home
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Sparkles from '../common/Sparkles'

// Import existing assets
import restaurantImg from "../../assets/images/restaurent.jpg"
import bg2 from "../../assets/images/bg2.jpg"
import bg4 from "../../assets/images/bg4.jpg"
import logo from "../../assets/images/new_nanthus_kitchen_logo.png"

const ICON_SIZE = 160
const GAP = 30
const ROWS = 16
const COLS = 16

type ContentType = 'image' | 'video' | 'text' | 'icon'

interface AboutItem {
    id: string
    type: ContentType
    content: any
    color: string
    label?: string
}

interface AppIconProps extends AboutItem {
    x: number
    y: number
    dragX: any
    dragY: any
    onSelect: (item: AboutItem) => void
}

const AppIcon = React.memo<AppIconProps>(({ type, content, color, label, x, y, dragX, dragY, onSelect }) => {
    const hoverScale = useMotionValue(1)
    const smoothHoverScale = useSpring(hoverScale, { stiffness: 300, damping: 30 })

    const currentX = useTransform(dragX, (v: number) => v + x + ICON_SIZE / 2)
    const currentY = useTransform(dragY, (v: number) => v + y + ICON_SIZE / 2)

    const distance = useTransform([currentX, currentY], ([cx, cy]) => {
        const dx = cx - (typeof window !== 'undefined' ? window.innerWidth : 1000) / 2
        const dy = cy - (typeof window !== 'undefined' ? window.innerHeight : 1000) / 2
        return Math.sqrt(dx * dx + dy * dy)
    })

    // Base bulge effect - slightly increased minimums for better visibility
    const baseScale = useTransform(distance, [0, 150, 300, 600, 1000], [1.2, 1.05, 0.8, 0.45, 0.2])
    const opacity = useTransform(distance, [0, 500, 850], [1, 0.9, 0.1])

    // Professional additive scaling: Total Scale = Dynamic Bulge * Hover State
    const combinedScale = useTransform(
        [baseScale, smoothHoverScale],
        ([bs, hs]) => (bs as number) * (hs as number)
    )

    const renderContent = () => {
        switch (type) {
            case 'image':
                return <img src={content} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            case 'video':
                return (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                        <source src={content} type="video/mp4" />
                    </video>
                )
            case 'text':
                return (
                    <span style={{
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        padding: '10px',
                        textTransform: 'uppercase'
                    }}>
                        {content}
                    </span>
                )
            case 'icon':
            default:
                const Icon = content
                return <Icon style={{ color: color === '#ffffff' ? '#001e36' : '#fff', fontSize: ICON_SIZE * 0.4 }} />
        }
    }

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: ICON_SIZE,
                height: ICON_SIZE,
                borderRadius: '50%',
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scale: combinedScale,
                opacity,
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                overflow: 'hidden',
                zIndex: 1
            }}
            onHoverStart={() => {
                hoverScale.set(1.4)
            }}
            onHoverEnd={() => {
                hoverScale.set(1)
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect({ id: '', type, content, color, label })}
        >
            {renderContent()}
        </motion.div>
    )
})

const About: React.FC = () => {
    const [selectedItem, setSelectedItem] = React.useState<AboutItem | null>(null)
    const navigate = useNavigate()
    const [dimensions, setDimensions] = React.useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1000,
        height: typeof window !== 'undefined' ? window.innerHeight : 1000
    })

    React.useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const { width: windowWidth, height: windowHeight } = dimensions

    // Mixed content array for the grid
    const rawData: Omit<AboutItem, 'id'>[] = [
        { type: 'image', content: restaurantImg, color: '#001e36', label: 'Our Restaurant' },
        { type: 'video', content: 'https://cdn.pixabay.com/video/2019/04/23/23011-332464791_tiny.mp4', color: '#D9A756', label: 'Chef Excellence' },
        { type: 'text', content: 'JAFFNA', color: '#7700ff', label: 'Our Heritage' },
        { type: 'image', content: bg2, color: '#001e36', label: 'Spices' },
        { type: 'icon', content: Restaurant, color: '#00ffff', label: 'Dining' },
        { type: 'video', content: 'https://cdn.pixabay.com/video/2021/04/30/72855-546051778_tiny.mp4', color: '#ff0055', label: 'Fresh Vibes' },
        { type: 'text', content: 'KITjkhhhghg hghkgyguyg hygyufyughjb ygjhk iugiuh iuyyiuh niugt7ih yutiu CHEN', color: '#ffaa00', label: 'Artistry' },
        { type: 'image', content: bg4, color: '#001e36', label: 'Tradition' },
        { type: 'icon', content: Star, color: '#ffffff', label: 'Quality' },
        { type: 'text', content: 'NANTHU', color: '#00ffaa', label: 'The Founder' },
        { type: 'image', content: logo, color: '#ffffff', label: 'Our Brand' },
        { type: 'icon', content: Coffee, color: '#5500ff', label: 'Cafe' },
    ]

    const dragX = useMotionValue(-((COLS * (ICON_SIZE + GAP)) / 2 - windowWidth / 2))
    const dragY = useMotionValue(-((ROWS * (ICON_SIZE + GAP) * 0.85) / 2 - windowHeight / 2))

    const springX = useSpring(dragX, { damping: 45, stiffness: 100, mass: 1 })
    const springY = useSpring(dragY, { damping: 45, stiffness: 100, mass: 1 })

    const icons = useMemo(() => {
        const items = []
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const offsetX = (r % 2) * (ICON_SIZE + GAP) / 2
                const data = rawData[(r * COLS + c) % rawData.length]
                items.push({
                    id: `${r}-${c}`,
                    x: c * (ICON_SIZE + GAP) + offsetX,
                    y: r * (ICON_SIZE + GAP) * 0.85,
                    ...data
                })
            }
        }
        return items
    }, [])

    return (
        <div className="about-page-wrapper" style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#001e36',
            position: 'relative'
        }}>
            <Sparkles />

            <IconButton
                onClick={() => navigate('/')}
                sx={{
                    position: 'absolute',
                    top: { xs: '20px', md: '40px' },
                    right: { xs: '20px', md: '40px' },
                    bgcolor: 'rgba(0, 255, 255, 0.1)',
                    border: '2px solid rgba(0, 255, 255, 0.3)',
                    color: '#00ffff',
                    width: '40px',
                    height: '40px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)',
                    zIndex: 1001,
                    '&:hover': {
                        bgcolor: 'rgba(0, 255, 255, 0.2)',
                        transform: 'scale(1.1)',
                        boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
                    },
                }}
            >
                <Home />
            </IconButton>

            <div className="background-gradient" style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <motion.div
                drag
                dragConstraints={{
                    left: -((COLS - 1) * (ICON_SIZE + GAP) - windowWidth),
                    right: 0,
                    top: -((ROWS - 1) * (ICON_SIZE + GAP) * 0.85 - windowHeight),
                    bottom: 0
                }}
                dragElastic={0.1}
                style={{
                    x: springX,
                    y: springY,
                    width: COLS * (ICON_SIZE + GAP),
                    height: ROWS * (ICON_SIZE + GAP),
                    position: 'absolute',
                    touchAction: 'none'
                }}
            >
                {icons.map((item) => (
                    <AppIcon
                        key={item.id}
                        {...item}
                        dragX={springX}
                        dragY={springY}
                        onSelect={setSelectedItem}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="item-detail-tray"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,30,54,0.95)',
                            backdropFilter: 'blur(15px)',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                    >
                        <motion.button
                            className="close-tray"
                            onClick={() => setSelectedItem(null)}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            <Close fontSize="large" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                width: '100%',
                                maxWidth: '1000px',
                                textAlign: 'center'
                            }}
                        >
                            <h3 style={{
                                color: '#D9A756',
                                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                                marginBottom: '2rem'
                            }}>
                                {selectedItem.label}
                            </h3>

                            <div style={{
                                borderRadius: '30px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                aspectRatio: '16/9',
                                backgroundColor: selectedItem.color
                            }}>
                                {selectedItem.type === 'image' && (
                                    <img src={selectedItem.content} alt={selectedItem.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                                {selectedItem.type === 'video' && (
                                    <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                                        <source src={selectedItem.content} type="video/mp4" />
                                    </video>
                                )}
                                {selectedItem.type === 'text' && (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 'clamp(3rem, 10vw, 8rem)',
                                        fontWeight: 900,
                                        color: '#fff'
                                    }}>
                                        {selectedItem.content}
                                    </div>
                                )}
                                {selectedItem.type === 'icon' && (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <selectedItem.content style={{ fontSize: '10rem', color: '#fff' }} />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="about-content-overlay" style={{
                position: 'fixed',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 100,
                pointerEvents: 'none'
            }}>
                <h1 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    fontWeight: 900,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    margin: 0,
                    textShadow: '0 5px 15px rgba(0,0,0,0.5)'
                }}>
                    Nanthu's gallery
                </h1>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#D9A756',
                    fontSize: '0.9rem',
                    letterSpacing: '0.5em',
                    marginTop: '1rem',
                    textTransform: 'uppercase',
                    opacity: 0.8
                }}>
                    Drag to explore • Click to expand
                </p>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        .about-page-wrapper {
          cursor: crosshair;
        }

        .about-page-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
          z-index: 10;
          mix-blend-mode: overlay;
        }
      `}</style>
        </div>
    )
}

export default About
