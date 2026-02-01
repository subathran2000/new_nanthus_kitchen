import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
import { motion } from 'framer-motion';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

interface AboutItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const aboutData: AboutItem[] = [
  {
    title: "Authentic Jaffna Heritage",
    description:
      "New Nanthu's Kitchen brings the authentic taste of Jaffna to Canada. With traditional recipes passed down through generations, we serve the true flavors of Sri Lankan cuisine with pride and passion.",
    icon: <HistoryIcon sx={{ color: "white" }} />,
  },
  {
    title: "Cooked with Heart",
    description:
      "We believe food is more than just a meal; it's a celebration of culture and family. Every dish is prepared with love, using the freshest ingredients and time-honored techniques that bring people together.",
    icon: <FavoriteIcon sx={{ color: "white" }} />,
  },
  {
    title: "Fresh & Quality Driven",
    description:
      "We source the finest ingredients daily to ensure every bite delivers authentic taste. From our signature Kothu to traditional Jaffna specialties, quality is never compromised.",
    icon: <VisibilityIcon sx={{ color: "white" }} />,
  },
  {
    title: "Excellence in Every Dish",
    description:
      "From our aromatic Biryanis to perfectly grilled specialties, our attention to detail ensures every dish is a masterpiece. We serve excellence on every plate.",
    icon: <StarIcon sx={{ color: "white" }} />,
  },
];

const AboutCard: React.FC<{ item: AboutItem; index: number }> = ({
  item,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: isEven ? "flex-end" : "flex-start",
        marginBottom: "6rem",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "85%", md: "550px" },
          position: "relative",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
          backdropFilter: "blur(15px) saturate(180%)",
          borderRadius: "24px",
          padding: "3rem 2.5rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          overflow: "visible",
          "&:hover": {
            transform: "translateY(-10px) scale(1.02)",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
            border: isEven
              ? "1px solid rgba(0, 255, 255, 0.4)"
              : "1px solid rgba(255, 140, 0, 0.4)",
            boxShadow: isEven
              ? "0 30px 60px rgba(0, 255, 255, 0.1)"
              : "0 30px 60px rgba(255, 140, 0, 0.1)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            padding: "1px",
            background: isEven
              ? "linear-gradient(135deg, rgba(0, 255, 255, 0.5), transparent, rgba(0, 255, 255, 0.1))"
              : "linear-gradient(135deg, rgba(255, 140, 0, 0.5), transparent, rgba(255, 140, 0, 0.1))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
            pointerEvents: "none",
          },
        }}
      >
        {/* Decorative Accent */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            [isEven ? "right" : "left"]: 0,
            width: "100px",
            height: "100px",
            background: isEven
              ? "radial-gradient(circle at top right, rgba(0, 255, 255, 0.15), transparent 70%)"
              : "radial-gradient(circle at top left, rgba(255, 140, 0, 0.15), transparent 70%)",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        {/* Icon Circle */}
        <Box
          sx={{
            position: "absolute",
            top: "-32px",
            [isEven ? "right" : "left"]: "40px",
            width: "74px",
            height: "74px",
            borderRadius: "22px", // Squircle shape for elegance
            background: isEven
              ? "linear-gradient(135deg, #001e36 0%, #003a5c 100%)"
              : "linear-gradient(135deg, #001e36 0%, #2a1b0a 100%)",
            border: `2px solid ${isEven ? "rgba(0, 255, 255, 0.5)" : "rgba(255, 140, 0, 0.5)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            zIndex: 2,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "rotate(10deg) scale(1.1)",
            },
          }}
        >
          <Box sx={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}>
            {React.cloneElement(item.icon as React.ReactElement, {
              // @ts-ignore - MUI icon sx prop type issue
              sx: {
                fontSize: "2.5rem",
                color: "#FF8C00",
              },
            })}
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            color: "#FF8C00",
            mb: 2,
            fontSize: { xs: "1.4rem", md: "1.8rem" },
            letterSpacing: "0.02em",
          }}
        >
          {item.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.8,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.01em",
          }}
        >
          {item.description}
        </Typography>

        {/* Number Indicator */}
        <Typography
          sx={{
            position: "absolute",
            bottom: "15px",
            [isEven ? "left" : "right"]: "25px",
            fontSize: "3rem",
            fontWeight: 900,
            color: "rgba(255, 255, 255, 0.03)",
            userSelect: "none",
            zIndex: -1,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          0{index + 1}
        </Typography>
      </Box>
    </motion.div>
  );
};

const AboutUs: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1300px',
        margin: '2rem auto 3rem',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#FF8C00',
            letterSpacing: '0.6em',
            mb: 2,
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: 400
          }}
        >
          THE STORY BEHIND
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.3em', md: '0.5em' },
            color: '#fff',
            fontSize: { xs: '1.8rem', md: '3.5rem' },
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            lineHeight: 1.5,
            '& span': {
              color: '#FF8C00',
              fontWeight: 500,
            }
          }}
        >
          Who <span>We Are</span>
        </Typography>
        <Box
          sx={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #FF8C00, transparent)',
            margin: '2rem auto',
            borderRadius: '2px'
          }}
        />
      </Box>

      <Box sx={{ position: 'relative' }}>
        {/* Artistic Path Line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(255, 140, 0, 0.2), rgba(0, 255, 255, 0.2), transparent)',
            display: { xs: 'none', md: 'block' },
            transform: 'translateX(-50%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '8px',
              height: '8px',
              background: '#FF8C00',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 15px #FF8C00'
            }
          }}
        />

        {aboutData.map((item, index) => (
          <AboutCard key={index} item={item} index={index} />
        ))}
      </Box>

      {/* Explore More Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => window.location.href = '/about'}
            variant="outlined"
            sx={commonButtonStyle}
          >
            EXPLORE MORE
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AboutUs;
