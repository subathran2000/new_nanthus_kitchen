import type { SxProps, Theme } from '@mui/material';

export const commonButtonStyle: SxProps<Theme> = {
    borderColor: 'rgba(0, 255, 255, 0.4)',
    color: '#00ffff',
    borderRadius: 0,
    px: { xs: 4, sm: 8 },
    py: 2,
    fontWeight: 300,
    textTransform: 'uppercase',
    fontSize: { xs: '0.8rem', md: '1rem' },
    letterSpacing: { xs: '0.2em', md: '0.4em' },
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'rgba(0,30,54,0.3)',
    backdropFilter: 'blur(10px)',
    fontFamily: '"Outfit", sans-serif',
    '&:hover': {
        borderColor: '#FF8C00',
        bgcolor: '#FF8C00',
        color: '#001e36',
        boxShadow: '0 0 40px rgba(255, 140, 0, 0.5)',
        transform: 'translateY(-2px)',
    },
    '&.Mui-disabled': {
        borderColor: 'rgba(0, 255, 255, 0.1)',
        color: 'rgba(0, 255, 255, 0.2)',
    }
};
