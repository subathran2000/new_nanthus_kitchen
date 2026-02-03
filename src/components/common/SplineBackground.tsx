import React from 'react'
import { Box } from '@mui/material'

const SPLINE_URL = 'https://my.spline.design/threadsfeatureheaderanimation-Uh4PJJ2vv5Wvnj53S0ezQKn5/';

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
        zIndex: 0, // Behind all content
        opacity: 1, // Full opacity for "perfect" look on black
        pointerEvents: 'none',
        overflow: 'hidden',
        display: { xs: 'none', md: 'block' },
        bgcolor: '#000000', // Ensure black background if spline takes time to load
      }}
      aria-hidden
    >
      <Box
        sx={{
          width: '100%',
          height: '110%', // Increased height
          position: 'absolute',
          top: 0,
          left: 0,
          clipPath: 'inset(0 0 10% 0)', // Crop the bottom 10%
          pointerEvents: 'none',
        }}
      >
        <Box
          component="iframe"
          src={SPLINE_URL}
          title="Spline Cube"
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            pointerEvents: 'none',
            bgcolor: 'transparent',
            filter: 'grayscale(1) brightness(1.5)',
          }}
        />
      </Box>

      {onSpecialsClick ? (
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
      ) : null}
    </Box>
  )
}

export default SplineBackground
