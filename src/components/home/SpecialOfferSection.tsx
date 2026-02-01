import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
import { motion } from 'framer-motion';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// Import local images
import specialImage from "../../assets/images/special_bg.png";

const SpecialOfferSection: React.FC = () => {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          margin: "2rem auto 4rem",
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: { xs: "2rem", md: "0" },
        }}
      >
        {/* Header Section (Centered) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: { xs: 6, md: 8 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#FF8C00",
              letterSpacing: "0.6em",
              fontSize: "0.8rem",
              display: "block",
              mb: 2,
              fontWeight: 400,
            }}
          >
            LIMITED TIME
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              color: "#fff",
              fontSize: { xs: "1.8rem", md: "3.5rem" },
              letterSpacing: { xs: "0.2em", md: "0.3em" },
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              lineHeight: 1.1,
              "& span": {
                color: "#FF8C00",
                fontWeight: 600,
              },
            }}
          >
            Exclusive <span>Specials</span>
          </Typography>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255, 140, 0, 0.3)",
              marginTop: "2rem",
            }}
          />
        </Box>

        {/* Content Section: Image Left, Text Right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 6, md: 10 },
            width: "100%",
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Left Side: Image & Frame */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "500px" },
              height: { xs: "350px", md: "550px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* The Orange Offset Border Frame */}
            <Box
              sx={{
                position: "absolute",
                top: "20px",
                left: "-20px",
                width: "100%",
                height: "100%",
                border: "15px solid rgba(255, 255, 255, 0.05)",
                zIndex: 1,
                transform: "translate(-10px, 10px)",
              }}
            />

            {/* Main Image */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              sx={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${specialImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                filter: "brightness(0.9) contrast(110%)",
                borderRadius: "4px",
              }}
            />
          </Box>

          {/* Right Side: Description & Button */}
          <Box
            sx={{ maxWidth: "500px", textAlign: { xs: "center", md: "left" } }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.3,
              }}
            >
              Unforgettable Flavors at
              <br />
              <span style={{ color: "#FF8C00" }}>Unbeatable Prices</span>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1rem",
                lineHeight: 1.8,
                mb: 4,
                fontWeight: 300,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Dive into our chef's daily curated specials. From seasonal
              delicacies to our signature Jaffna dishes, experience the pinnacle
              of New Nanthu's Kitchen authentic flavors. These offers change
              regularly to bring you the freshest tastes.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/special")}
              startIcon={<LocalOfferIcon />}
              sx={commonButtonStyle}
            >
              View Offerings
            </Button>
          </Box>
        </Box>
      </Box>
    );
};

export default SpecialOfferSection;
