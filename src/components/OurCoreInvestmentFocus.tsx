import React from 'react'
import { Box, Typography, Grid, useTheme, useMediaQuery, Container } from '@mui/material'
import { motion } from 'framer-motion'
import RestaurantMenu from '@mui/icons-material/RestaurantMenu'
import Eco from '@mui/icons-material/Eco'
import Groups from '@mui/icons-material/Groups'
import AutoGraph from '@mui/icons-material/AutoGraph'
import Diamond from '@mui/icons-material/Diamond'
import FormatQuote from '@mui/icons-material/FormatQuote'

const cardStyle = {
  bgcolor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '24px',
  p: { xs: 3, md: 5 },
  height: '100%',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    transform: 'translateY(-10px)',
    '& .icon-box': {
      transform: 'scale(1.1) rotate(5deg)',
      color: '#00ffff',
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
    }
  }
}

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    style={{ height: '100%' }}
  >
    <Box sx={cardStyle}>
      <Box
        className="icon-box"
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          bgcolor: 'rgba(0, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          transition: 'all 0.4s ease',
          color: '#D9A756'
        }}
      >
        <Icon sx={{ fontSize: '30px' }} />
      </Box>
      <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 300, fontFamily: '"Outfit", sans-serif', letterSpacing: '0.05em' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#aaccff', lineHeight: 1.8, opacity: 0.8, fontWeight: 300 }}>
        {desc}
      </Typography>
    </Box>
  </motion.div>
)

const HighlightQuote = ({ text, subtext, author }: any) => (
  <Box sx={{ mb: { xs: 8, md: 12 }, position: 'relative' }}>
    <FormatQuote sx={{
      position: 'absolute',
      top: -40,
      left: -20,
      fontSize: '80px',
      color: 'rgba(217, 167, 86, 0.1)',
      zIndex: 0
    }} />
    <Typography variant="h3" sx={{
      color: '#fff',
      fontWeight: 100,
      fontFamily: '"Outfit", sans-serif',
      fontSize: { xs: '1.8rem', md: '3.5rem' },
      lineHeight: 1.2,
      mb: 3,
      position: 'relative',
      zIndex: 1
    }}>
      “{text}”
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <div style={{ width: '40px', height: '1px', background: '#D9A756' }} />
      <Typography variant="subtitle1" sx={{ color: '#D9A756', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
        {author} — {subtext}
      </Typography>
    </Box>
  </Box>
)

const OurCoreInvestmentFocus = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 15 } }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '80px' }}
      >
        <Typography variant="overline" sx={{ color: '#D9A756', letterSpacing: '0.6em', mb: 2, display: 'block', fontWeight: 300 }}>
          OUR ETHOS
        </Typography>
        <Typography variant="h1" sx={{
          color: '#fff',
          fontWeight: 100,
          fontSize: { xs: '2.5rem', md: '5rem' },
          fontFamily: '"Outfit", sans-serif',
          mb: 4
        }}>
          Our Core <span style={{ color: 'rgba(0, 255, 255, 0.8)' }}>Investment Focus</span>
        </Typography>
        <div style={{ width: '100px', height: '1px', background: 'radial-gradient(circle, #00ffff 0%, transparent 100%)' }} />
      </motion.div>

      {/* Primary Quotes Section */}
      <Grid container spacing={{ xs: 4, md: 10 }}>
        <Grid item xs={12} md={6}>
          <HighlightQuote
            text="Crafting unforgettable memories through the alchemy of spices and passion."
            author="Sophie Moore"
            subtext="Executive Chef"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <HighlightQuote
            text="Scaling authentic culinary traditions into global lifestyle landmarks."
            author="Karlee Jhon"
            subtext="Director of Strategy"
          />
        </Grid>
      </Grid>

      {/* Impact Indicators / Where We Build Impact */}
      <Box sx={{ mt: { xs: 5, md: 10 } }}>
        <Typography variant="h4" sx={{ color: '#fff', mb: 8, fontWeight: 100, fontFamily: '"Outfit", sans-serif', borderLeft: '1px solid #D9A756', pl: 3 }}>
          Where We Build Impact ?
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={Eco}
              title="Sustainable Sourcing"
              desc="Empowering the transition to a cleaner world through renewable energy and sustainable food chains."
              delay={0.1}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={RestaurantMenu}
              title="Culinary Innovation"
              desc="Helping chefs turn bold ideas into scalable global menus and driving innovation everywhere."
              delay={0.2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={Groups}
              title="Community First"
              desc="Building ecosystems that connect people, cultures, and industries through shared dining values."
              delay={0.3}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={AutoGraph}
              title="Scalable Growth"
              desc="Driving the next generation of hospitality through intelligent design and data-driven expansions."
              delay={0.4}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Bottom CTA Gradient Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '100%', opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #00ffff, #D9A756, transparent)',
          marginTop: '100px'
        }}
      />
    </Container>
  )
}

export default OurCoreInvestmentFocus
