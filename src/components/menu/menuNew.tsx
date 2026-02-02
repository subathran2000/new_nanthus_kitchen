import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './menuNew.css'
import SpiralBackground from './spiral'
import { IconButton } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import InteractiveMenu from './InteractiveMenu' // Import the new Interactive 3D Menu

const MenuNew = () => {
  const navigate = useNavigate()
  const [view, setView] = useState<'gallery' | 'spiral'>('gallery')
  const [activeCategory, setActiveCategory] = useState<string>('')

  const handleClick = (type: string) => {
    setActiveCategory(type)
    setView('spiral')
  }

  // Common button style for Spiral view
  const buttonStyle = {
    position: 'fixed' as const,
    top: { xs: '20px', md: '40px' },
    bgcolor: 'rgba(255, 140, 0, 0.1)',
    border: '2px solid rgba(255, 140, 0, 0.3)',
    color: '#FF8C00',
    width: { xs: '45px', sm: '45px', md: '50px' },
    height: { xs: '45px', sm: '45px', md: '50px' },
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(255, 140, 0, 0.3), 0 0 20px rgba(255, 140, 0, 0.2)',
    zIndex: 2000,
    '&:hover': {
      bgcolor: 'rgba(255, 140, 0, 0.2)',
      transform: 'scale(1.1)',
      boxShadow: '0 0 30px rgba(255, 140, 0, 0.6), 0 0 60px rgba(255, 140, 0, 0.4)',
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {view === 'gallery' ? (
        // Render the NEW Interactive Menu Component
        <InteractiveMenu
          onSelectCategory={handleClick}
          onBack={() => navigate('/')}
          onHome={() => navigate('/')}
        />
      ) : (
        <>
          {/* Back Button (Left) */}
          <IconButton
            onClick={() => setView('gallery')}
            sx={{
              ...buttonStyle,
              left: { xs: '20px', md: '40px' }
            }}
          >
            <ArrowBack />
          </IconButton>

          {/* Home Button (Right) */}
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              ...buttonStyle,
              right: { xs: '20px', md: '40px' }
            }}
          >
            <HomeIcon />
          </IconButton>

          <SpiralBackground activeCategory={activeCategory} />
        </>
      )}
    </div>
  )
}

export default MenuNew
