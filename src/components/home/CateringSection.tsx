import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { commonButtonStyle } from '../common/ButtonStyles';
import CateringForm from "./CateringFormRefactored";
import cateringImage from '../../assets/images/bg2.jpg';

const CateringSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '4rem auto 8rem',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: { xs: '2rem', md: '0 80px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 8, md: 10 },
          position: 'relative',
        }}
      >
        <Typography
          variant="overline"
          className="overline-text"
        >
          GLOBAL SERVICES
        </Typography>

        <Typography
          variant="h2"
          className="section-title"
          sx={{
            color: '#fff',
            fontSize: { xs: '3rem', md: '5rem' },
            lineHeight: 1,
          }}
        >
          PREMIUM <span style={{ color: '#FF8C00', fontStyle: 'italic' }}>CATERING</span>
        </Typography>

        <Box sx={{ width: '60px', height: '1px', bgcolor: 'rgba(255,140,0,0.4)', mt: 3, mx: { xs: 'auto', md: 0 } }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 15 },
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            Events With <span style={{ color: '#FF8C00' }}>Distinction</span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.1rem',
              lineHeight: 1.9,
              mb: 5,
              fontWeight: 300,
              fontFamily: '"Outfit", sans-serif',
              maxWidth: '450px',
              mx: { xs: 'auto', md: 0 },
            }}
          >
            Elevate your next gathering with the distinct flavors of Jaffna.
            From intimate corporate luncheons to grand celebratory milestones,
            we bring a touch of culinary excellence to every occasion.
          </Typography>

          <Button variant="outlined" onClick={() => setIsFormOpen(true)} sx={commonButtonStyle}>
            SEND INQUIRY
          </Button>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '55%' },
            height: { xs: '300px', sm: '400px', md: '650px' },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: { xs: -10, md: -20 },
              border: '1px solid rgba(255,140,0,0.15)',
              borderRadius: '40px',
              zIndex: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -1,
                borderRadius: '40px',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(255,140,0,0.3), transparent, rgba(255,140,0,0.1))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)'
              },
            }}
          />

          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${cateringImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '32px',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
              filter: 'brightness(0.8)',
              position: 'relative',
              zIndex: 1,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              },
            }}
          />
        </Box>
      </Box>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(255, 140, 0, 0.3)',
            boxShadow: '0 0 50px rgba(255, 140, 0, 0.2)',
            overflow: 'hidden',
            outline: 'none',
          },
        }}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        }}
      >
        <Box sx={{ position: 'relative', height: '100%', display: 'flex' }}>
          <IconButton
            onClick={() => setIsFormOpen(false)}
            sx={{
              position: 'absolute',
              right: 15,
              top: 15,
              color: '#FF8C00',
              bgcolor: 'rgba(255,140,0,0.1)',
              zIndex: 100,
              '&:hover': {
                bgcolor: 'rgba(255,140,0,0.2)',
                transform: 'rotate(90deg)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent
            sx={{
              p: 0,
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: '#FF8C00', borderRadius: '4px' },
            }}
          >
            <CateringForm />
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CateringSection;
