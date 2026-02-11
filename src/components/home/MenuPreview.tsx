import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

import mainImage from "../../assets/images/restaurant.jpg";

const MenuPreview: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: "1.5rem", md: "2.5rem" },
        padding: { xs: "3rem 1rem", md: "4rem 2rem" },
        position: "relative",
      }}
    >
      {/* Section label + title */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", width: "100%" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Box sx={{ width: 24, height: 1, bgcolor: "#F5A623" }} />
          <Typography
            variant="overline"
            sx={{
              color: "#F5A623",
              letterSpacing: "0.5em",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
          >
            KITCHEN MAGIC
          </Typography>
          <Box sx={{ width: 24, height: 1, bgcolor: "#F5A623" }} />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Libre Caslon Display', serif",
            fontWeight: 300,
            textTransform: "uppercase",
            letterSpacing: { xs: "0.25em", md: "0.45em" },
            color: "#fff",
            fontSize: { xs: "1.75rem", md: "3.25rem" },
          }}
        >
          OUR MENU
        </Typography>
      </motion.div>

      {/* Content: image + text block */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 2.5, md: 6 },
        }}
      >
        {/* Image block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{
            y: [0, -8, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ width: "100%", zIndex: 1 }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : "82%",
              height: { xs: "280px", sm: "420px", md: "520px" },
              background: `url(${mainImage}) center/cover no-repeat`,
              borderRadius: { xs: "20px", md: "32px" },
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(160deg, rgba(10, 22, 40, 0.15), transparent 50%)",
              }}
            />
          </Box>
        </motion.div>

        {/* Text block — transparent, no card fill */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            zIndex: 2,
            width: isMobile ? "100%" : "420px",
          }}
        >
          <Box
            sx={{
              background: "transparent",
              padding: { xs: "1rem 0", md: "1.5rem 0" },
              borderLeft: {
                xs: "none",
                md: "3px solid rgba(59, 130, 246, 0.5)",
              },
              pl: { md: 2 },
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              textAlign: { xs: "center", md: "left" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "rgba(245, 166, 35, 0.95)",
                letterSpacing: "0.35em",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              CONCEPT
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.65rem", md: "2.5rem" },
                color: "#fff",
                lineHeight: 1.2,
                "& span": {
                  color: "#F5A623",
                  mx: 0.5,
                },
              }}
            >
              DESIGN <span>&</span> TASTE
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                maxWidth: "360px",
                mb: 1,
                fontWeight: 300,
              }}
            >
              Experience the perfect fusion of culinary artistry and modern
              design. Our menu is a curated collection of flavors, textures, and
              visual delights crafted to elevate your dining journey.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => navigate("/menu")}
              endIcon={<ArrowForwardIcon />}
              sx={commonButtonStyle}
            >
              EXPLORE MENU
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default MenuPreview;
