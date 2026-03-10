import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from "../common/ButtonStyles";
import { LOCATIONS } from "../../constants/businessInfo";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { motion } from "framer-motion";

import restaurantImage from "../../assets/images/restaurant.jpg";

const PickupSection: React.FC = () => {
  const handleOrderClick = (locationName: string) => {
    const location = LOCATIONS.find((l) => l.name === locationName);
    if (location) {
      window.open(`tel:${location.phones[0].replace(/\./g, "")}`, "_self");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: { xs: "2rem 1.25rem", sm: "3rem 2rem", md: "4rem 2rem" },
        color: "#fff",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
        <Typography variant="overline" className="overline-text">
          QUICK & CONVENIENT
        </Typography>
        <Typography
          variant="h2"
          className="section-title"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 1,
            mb: 2,
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          ORDER PICKUP
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.55)",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            maxWidth: "500px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            mx: "auto",
          }}
        >
          Skip the wait and enjoy our authentic Jaffna flavors at home. Call ahead
          to place your order — ready when you are.
        </Typography>
      </Box>

      {/* Location Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {LOCATIONS.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                background: "rgba(255,255,255,0.02)",
                transition: "all 0.4s ease",
                "&:hover": {
                  border: "1px solid rgba(197, 160, 89, 0.2)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                },
              }}
            >
              {/* Image header */}
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 140, md: 160 },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={restaurantImage}
                  alt={`${location.name} location`}
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
                    background: "linear-gradient(to top, rgba(5,7,10,0.85) 0%, rgba(5,7,10,0.2) 100%)",
                  }}
                />
                {/* Location badge */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ color: "#C5A059", fontSize: 16 }} />
                  <Typography
                    sx={{
                      color: "#C5A059",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {location.label}
                  </Typography>
                </Box>
              </Box>

              {/* Card content */}
              <Box sx={{ p: { xs: 2, md: 2.5 } }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "0.95rem",
                    mb: 0.5,
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {location.address.street}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.85rem",
                    mb: 2,
                  }}
                >
                  {location.address.city} {location.address.province} {location.address.postalCode}
                </Typography>

                {/* Phone numbers */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 2.5 }}>
                  {location.phones.map((phone) => (
                    <Box key={phone} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneInTalkIcon sx={{ color: "rgba(197, 160, 89, 0.6)", fontSize: 14 }} />
                      <Typography
                        component="a"
                        href={`tel:${phone.replace(/\./g, "")}`}
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          "&:hover": { color: "#C5A059" },
                          transition: "color 0.2s",
                        }}
                      >
                        {phone}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<PhoneInTalkIcon />}
                  fullWidth
                  sx={{
                    ...commonButtonStyle,
                    py: 1.3,
                    fontSize: "0.7rem",
                  }}
                  onClick={() => handleOrderClick(location.name)}
                >
                  Call to Order
                </Button>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default PickupSection;
