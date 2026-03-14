import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { commonButtonStyle } from "../common/ButtonStyles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";

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
    icon: <HistoryIcon />,
  },
  {
    title: "Cooked with Heart",
    description:
      "We believe food is more than just a meal; it's a celebration of culture and family. Every dish is prepared with love, using the freshest ingredients and time-honored techniques that bring people together.",
    icon: <FavoriteIcon />,
  },
  {
    title: "Fresh & Quality Driven",
    description:
      "We source the finest ingredients daily to ensure every bite delivers authentic taste. From our signature Kothu to traditional Jaffna specialties, quality is never compromised.",
    icon: <VisibilityIcon />,
  },
  {
    title: "Excellence in Every Dish",
    description:
      "From our aromatic Biryanis to perfectly grilled specialties, our attention to detail ensures every dish is a masterpiece. We serve excellence on every plate.",
    icon: <StarIcon />,
  },
];

const AboutCard: React.FC<{ item: AboutItem; index: number }> = ({
  item,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: isEven ? "flex-end" : "flex-start",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "800px" },
          mb: { xs: "2rem", sm: "2.5rem", md: "2.5rem" },
          position: "relative",
          background: "#FFFFFF",
          borderRadius: { xs: "12px", md: "16px" },
          padding: {
            xs: "2rem 1.25rem",
            sm: "2.5rem 1.5rem",
            md: "3rem 2.5rem",
          },
          border: "1px solid #E2E6ED",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
          transition: "all 0.4s ease",
          overflow: "visible",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)",
            borderColor: "#2B7DE9",
          },
        }}
      >
        {/* Icon Circle */}
        <Box
          sx={{
            position: "absolute",
            top: "-24px",
            [isEven ? "right" : "left"]: { xs: "20px", sm: "32px" },
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: isEven
              ? "linear-gradient(135deg, #2B7DE9, #5B9DF0)"
              : "linear-gradient(135deg, #F5A623, #FFB84D)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isEven
              ? "0 4px 12px rgba(43, 125, 233, 0.3)"
              : "0 4px 12px rgba(245, 166, 35, 0.3)",
            zIndex: 2,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "rotate(5deg) scale(1.1)",
            },
          }}
        >
          {React.cloneElement(
            item.icon as React.ReactElement<{ sx?: object }>,
            {
              sx: {
                fontSize: "1.8rem",
                color: "#fff",
              },
            },
          )}
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: "#1A1D23",
            mb: 1.5,
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            letterSpacing: "0.01em",
          }}
        >
          {item.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#5A6177",
            lineHeight: 1.75,
            fontSize: { xs: "0.95rem", md: "1rem" },
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          {item.description}
        </Typography>

        {/* Number Indicator */}
        <Typography
          sx={{
            position: "absolute",
            bottom: "12px",
            [isEven ? "left" : "right"]: "20px",
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "rgba(43, 125, 233, 0.06)",
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

const AboutPreview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: { xs: "0 1.25rem", sm: "0 2rem" },
        position: "relative",
        zIndex: 10,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="overline" className="overline-text" sx={{ mb: 1 }}>
          THE STORY BEHIND
        </Typography>
        <Typography
          variant="h2"
          className="section-title"
          sx={{
            color: "#1A1D23",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            lineHeight: 1.1,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Who We Are
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        {/* Subtle center line */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, #E2E6ED, transparent)",
            display: { xs: "none", md: "block" },
            transform: "translateX(-50%)",
            zIndex: -1,
          }}
        />

        {aboutData.map((item, index) => (
          <AboutCard key={index} item={item} index={index} />
        ))}
      </Box>

      {/* Explore More Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.ABOUT)}
            sx={commonButtonStyle}
          >
            EXPLORE MORE
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AboutPreview;
