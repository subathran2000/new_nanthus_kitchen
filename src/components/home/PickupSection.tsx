import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from '../common/ButtonStyles';
import StoreIcon from '@mui/icons-material/Store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const PickupSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-end" },
        textAlign: { xs: "center", md: "right" },
        padding: { xs: "4rem 2rem", md: "8rem 2rem" },
        color: "#fff",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Typography
        variant="overline"
        className="overline-text"
      >
        BESPOKE SERVICE
      </Typography>

      <Typography
        variant="h2"
        className="section-title"
        sx={{
          fontSize: { xs: "3rem", md: "5rem" },
          lineHeight: 1,
          mb: 4,
          color: "#fff",
        }}
      >
        ORDER{" "}
        <span style={{ color: "#FF8C00", fontStyle: "italic" }}>PICKUP</span>
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
          mx: { xs: "auto", md: 0 },
        }}
      >
        Experience the pinnacle of Jaffna flavor in the comfort of your home.
        Our team meticulously prepares each order for a refined takeaway
        experience.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button variant="outlined" sx={commonButtonStyle}>
          SCARBOROUGH
        </Button>
        <Button variant="outlined" sx={commonButtonStyle}>
          MARKHAM
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          mt: 8,
          opacity: 0.4,
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StoreIcon sx={{ fontSize: 16, color: "#FF8C00" }} />
          <Typography
            variant="caption"
            sx={{ fontFamily: "monospace", letterSpacing: "0.2em" }}
          >
            LOC_DUAL
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: "#FF8C00" }} />
          <Typography
            variant="caption"
            sx={{ fontFamily: "monospace", letterSpacing: "0.2em" }}
          >
            EST_PREP: 25M
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PickupSection;
