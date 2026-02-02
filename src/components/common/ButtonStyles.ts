import type { SxProps, Theme } from '@mui/material';

export const commonButtonStyle: SxProps<Theme> = {
    backgroundColor: 'rgba(0,30,54,0.3)',
    border: '1px solid rgba(0, 255, 255, 0.4)',
    color: '#00ffff',
    borderRadius: 0,
    px: { xs: 4, sm: 8 },
    py: { xs: 1.5, md: 2 },
    fontWeight: 300,
    textTransform: 'uppercase',
    fontSize: { xs: '0.8rem', md: '1rem' },
    letterSpacing: '0.4em',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    fontFamily: "'Outfit', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    '&:hover': {
        borderColor: '#FF8C00',
        backgroundColor: '#FF8C00',
        color: '#001e36',
        boxShadow: '0 0 40px rgba(255, 140, 0, 0.5)',
        transform: 'translateY(-2px)',
    },
    '&.Mui-disabled': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.2)',
    }
};
