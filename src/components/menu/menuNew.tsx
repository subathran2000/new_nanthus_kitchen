import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './menuNew.css'
import SpiralBackground, { menuData } from './spiral'
import { IconButton } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'
import Sparkles from '../common/Sparkles'

const MenuNew = () => {
  const navigate = useNavigate()
  const [view, setView] = useState<'gallery' | 'spiral'>('gallery')
  const [activeCategory, setActiveCategory] = useState<string>('')

  const menuItems = useMemo(() => {
    const types = new Set<string>();
    menuData.forEach(category => {
      category.mealType.forEach(type => types.add(type));
    });
    return Array.from(types);
  }, []);

  const handleClick = (type: string) => {
    setActiveCategory(type)
    setView('spiral')
    // scroll/reset handled inside SpiralBackground via activeCategory prop
  }

  // Common button style from Special.tsx
  const buttonStyle = {
    position: 'fixed' as const, // fixed for this page to stay on top
    top: { xs: '20px', md: '40px' },
    bgcolor: 'rgba(0, 255, 255, 0.1)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    color: '#00ffff',
    width: { xs: '40px', sm: '40px', md: '40px' },
    height: { xs: '40px', sm: '40px', md: '40px' },
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)',
    zIndex: 2000,
    '&:hover': {
      bgcolor: 'rgba(0, 255, 255, 0.2)',
      transform: 'scale(1.1)',
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {view === 'gallery' ? (
        <div className="gallery-wrapper">
          <Sparkles />
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
          <div
            className="container"
            style={{ '--total': menuItems.length } as React.CSSProperties}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={() => handleClick(item)}
                style={{ '--index': index } as React.CSSProperties}
              >
                <span className="item-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
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
