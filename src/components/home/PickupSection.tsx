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
        maxWidth: "1000px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: { xs: "2rem 1.25rem", sm: "3rem 2rem", md: "4rem 2rem" },
        position: "relative",
        zIndex: 10,
      }}
    >
      <Typography variant="overline" className="overline-text">
        QUICK & CONVENIENT
      </Typography>

      <Typography
        variant="h2"
        className="section-title"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          lineHeight: 1.1,
          mb: 3,
          color: "#1A1D23",
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        Order Pickup
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#5A6177",
          fontSize: "1rem",
          lineHeight: 1.8,
          maxWidth: "500px",
          mb: 5,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
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
          justifyContent: "center",
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
