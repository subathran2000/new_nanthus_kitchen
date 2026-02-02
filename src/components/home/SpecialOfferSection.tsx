import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
import { motion } from 'framer-motion';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// Import local images
import specialImage from '../../assets/images/special_bg.png';

const SpecialOfferSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '4rem auto 0',
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
          sx={{
            color: '#FF8C00',
            letterSpacing: '0.8em',
            fontSize: '0.75rem',
            display: 'block',
            mb: 2,
            fontWeight: 500,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          TEMPORARY COLLECTION
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#fff',
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            letterSpacing: '0.05em',
            lineHeight: 1.1,
          }}
        >
          CHEF'S <span style={{ color: '#FF8C00', fontStyle: 'italic' }}>SELECT</span>
        </Typography>

        <Box sx={{ width: '60px', height: '1px', bgcolor: 'rgba(255,140,0,0.4)', mt: 3, mx: { xs: 'auto', md: 0 } }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 15 },
          width: '100%',
        }}
      >
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
              },
            }}
          />

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${specialImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '32px',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, rgba(0,20,36,0.5))',
              },
            }}
          />
        </Box>

        <Box sx={{
          flex: 1,
          textAlign: { xs: 'center', md: 'left' },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' }
        }}>
          <Box sx={{ mb: 4, opacity: 0.08, display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h1" sx={{ fontSize: '12rem', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 0.8, ml: -6 }}>
              01
            </Typography>
          </Box>

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
            Fusion <span style={{ color: '#FF8C00' }}>Mastery</span><br />
            In Every Plate
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
              mx: { xs: 'auto', md: 0 }
            }}
          >
            Our limited-time offerings represent the intersection of tradition and avant-garde technique.
            Each dish is an ephemeral masterpiece, curated daily by our culinary team to surprise and delight the discerning palate.
          </Typography>

          <Button
            variant="outlined"
            onClick={() => (window.location.href = '/special')}
            startIcon={<LocalOfferIcon />}
            sx={commonButtonStyle}
          >
            EXPERIENCE SPECIALS
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SpecialOfferSection;
