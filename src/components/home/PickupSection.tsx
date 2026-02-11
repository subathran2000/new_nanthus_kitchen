import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from "../common/ButtonStyles";
import { LOCATIONS } from "../../constants/businessInfo";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

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
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: { xs: "3rem 1.25rem", sm: "4rem 2rem", md: "6rem 2rem" },
        color: "#fff",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Decorative glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Typography variant="overline" className="overline-text">
        QUICK & CONVENIENT
      </Typography>

      <Typography
        variant="h2"
        className="section-title"
        sx={{
          fontSize: { xs: "3rem", md: "5rem" },
          lineHeight: 1,
          mb: 4,
          color: "#fff",
          fontFamily: "'Libre Caslon Display', serif",
        }}
      >
        ORDER PICKUP
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          maxWidth: "500px",
          mb: 6,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          mx: "auto",
        }}
      >
        Skip the wait and enjoy our authentic Jaffna flavors at home. Call ahead
        to place your order and pick it up fresh from either of our locations —
        ready when you are.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          justifyContent: { xs: "center", md: "center" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<PhoneInTalkIcon />}
          sx={commonButtonStyle}
          onClick={() => handleOrderClick("SCARBOROUGH")}
        >
          SCARBOROUGH
        </Button>
        <Button
          variant="outlined"
          startIcon={<PhoneInTalkIcon />}
          sx={commonButtonStyle}
          onClick={() => handleOrderClick("MARKHAM")}
        >
          MARKHAM
        </Button>
      </Box>
    </Box>
  );
};

export default PickupSection;
