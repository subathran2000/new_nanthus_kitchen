import React from 'react'
import { Box } from '@mui/material'

const SPLINE_URL =
  'https://my.spline.design/threadsfeatureheaderanimation-Uh4PJJ2vv5Wvnj53S0ezQKn5/'

type Props = {
  onSpecialsClick?: () => void
}

const SplineBackground: React.FC<Props> = ({ onSpecialsClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        display: { xs: 'none', md: 'block' },
        bgcolor: '#000814', // 🔵 deep navy base
      }}
      aria-hidden
    >
      {/* Spline container */}
      <Box
        sx={{
          width: '100%',
          height: '110%',
          position: 'absolute',
          top: 0,
          left: 0,
          clipPath: 'inset(0 0 10% 0)',
          pointerEvents: 'none',
        }}
      >
        {/* Spline iframe */}
        <Box
          component="iframe"
          src={SPLINE_URL}
          title="Spline White Cubes"
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            pointerEvents: 'none',
            bgcolor: 'transparent',

            /* ⬜ Force cubes to white */
            filter: `
              grayscale(1)
              brightness(1.8)
              contrast(1.15)
            `,
          }}
        />

        {/* 🔵 Navy blue color layer (keeps bg blue, cubes stay white) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(
                circle at center,
                rgba(20,70,160,0.45),
                rgba(0,8,20,0.95)
              )
            `,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Optional clickable area */}
      {onSpecialsClick && (
        <Box
          onClick={onSpecialsClick}
          sx={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 140,
            height: 140,
            zIndex: 2,
            cursor: 'pointer',
            pointerEvents: 'auto',
            background: 'transparent',
          }}
          aria-label="Open specials"
        />
      )}
    </Box>
  )
}

export default SplineBackground
