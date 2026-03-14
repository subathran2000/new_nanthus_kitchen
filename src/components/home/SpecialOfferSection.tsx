import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from "../common/ButtonStyles";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import specialImage from "../../assets/images/special_bg.png";
import AccordionFoldImage from "./AccordionFoldImage";

const SpecialOfferSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: { xs: "1.5rem 1.25rem", sm: "2rem", md: "0 2rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        <Typography variant="overline" className="overline-text">
          LIMITED TIME SPECIALS
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
          Chef's Select
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: "55%" },
            height: { xs: "250px", sm: "350px", md: "500px" },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: { xs: -4, md: -12 },
              border: "1px solid #E2E6ED",
              borderRadius: { xs: "16px", md: "24px" },
              zIndex: 0,
            }}
          />

          <AccordionFoldImage
            src={specialImage}
            mode="scroll"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              zIndex: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#1A1D23",
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.3,
            }}
          >
            Fusion <span style={{ color: "#F5A623" }}>Mastery</span>
            <br />
            In Every Plate
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#5A6177",
              fontSize: "1rem",
              lineHeight: 1.8,
              mb: 4,
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              maxWidth: "450px",
              mx: { xs: "auto", md: 0 },
            }}
          >
            Our limited-time specials showcase the best of Jaffna cuisine
            reimagined with a modern twist. Handcrafted daily by our chefs using
            the freshest seasonal ingredients, these dishes are available only
            while supplies last.
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.SPECIAL)}
            startIcon={<LocalOfferIcon />}
            sx={commonButtonStyle}
          >
            EXPERIENCE SPECIALS
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SpecialOfferSection;
