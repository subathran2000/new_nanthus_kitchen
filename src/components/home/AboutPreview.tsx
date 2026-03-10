import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { commonButtonStyle } from "../common/ButtonStyles";
import { motion } from "framer-motion";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";

import restaurantImage from "../../assets/images/restaurant.jpg";

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
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{
      duration: 0.7,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <Box
      sx={{
        position: "relative",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        padding: { xs: "1.5rem", md: "2rem" },
        border: "1px solid rgba(255, 255, 255, 0.05)",
        transition: "all 0.4s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-6px)",
          border: "1px solid rgba(197, 160, 89, 0.2)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(197, 160, 89, 0.15), rgba(197, 160, 89, 0.05))",
          border: "1px solid rgba(197, 160, 89, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {React.cloneElement(
          item.icon as React.ReactElement<{ sx?: object }>,
          { sx: { fontSize: "1.3rem", color: "#C5A059" } },
        )}
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "#fff",
          mb: 1.5,
          fontSize: { xs: "1.05rem", md: "1.15rem" },
        }}
      >
        {item.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          lineHeight: 1.7,
          fontSize: "0.88rem",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
        }}
      >
        {item.description}
      </Typography>
    </Box>
  </motion.div>
);

const AboutPreview: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        margin: "1rem auto 2rem",
        padding: { xs: "0 1.25rem", sm: "0 2rem" },
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Header with restaurant image */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 3, md: 6 },
          mb: { xs: 5, md: 6 },
        }}
      >
        {/* Restaurant image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1, width: "100%" }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: 200, sm: 240, md: 280 },
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <Box
              component="img"
              src={restaurantImage}
              alt="New Nanthu's Kitchen restaurant"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(5,7,10,0.6) 0%, transparent 60%)",
              }}
            />
          </Box>
        </motion.div>

        {/* Title + intro */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1 }}
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="overline"
              className="overline-text"
              sx={{ mb: 1.5, display: "block" }}
            >
              THE STORY BEHIND
            </Typography>
            <Typography
              variant="h2"
              sx={{
                textTransform: "uppercase",
                color: "#fff",
                fontSize: { xs: "2rem", md: "2.5rem" },
                lineHeight: 1.1,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 2,
              }}
            >
              Who We Are
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                fontWeight: 300,
                fontFamily: "'Inter', sans-serif",
                maxWidth: { md: "400px" },
              }}
            >
              Two locations. One mission. Serving the GTA with the most authentic
              Jaffna cuisine, crafted with generational recipes and the freshest ingredients.
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Cards grid - 2x2 on desktop, stacked on mobile */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: { xs: 2, md: 3 },
          mb: 4,
        }}
      >
        {aboutData.map((item, index) => (
          <AboutCard key={index} item={item} index={index} />
        ))}
      </Box>

      {/* Explore More Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            component="a"
            href="/about"
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

export default AboutPreview;
