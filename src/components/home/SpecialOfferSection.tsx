import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { commonButtonStyle } from "../common/ButtonStyles";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import specialImage from "../../assets/images/special_bg.png";
import AccordionFoldImage from "./AccordionFoldImage";

const SpecialOfferSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "2rem auto 0",
        position: "relative",
        minHeight: { xs: "auto", md: "80vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: { xs: "1.5rem 1.25rem", sm: "2rem", md: "0 80px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: { xs: 5, md: 10 },
          position: "relative",
        }}
      >
        <Typography variant="overline" className="overline-text">
          LIMITED TIME SPECIALS
        </Typography>

        <Typography
          variant="h2"
          className="section-title"
          sx={{
            color: "#fff",
            fontSize: { xs: "3rem", md: "5rem" },
            lineHeight: 1,
            fontFamily: "'Libre Caslon Display', serif",
          }}
        >
          CHEF'S SELECT
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 10 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: "55%" },
            height: { xs: "250px", sm: "350px", md: "650px" },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: { xs: -8, md: -20 },
              border: "1px solid rgba(59, 130, 246, 0.15)",
              borderRadius: { xs: "24px", md: "40px" },
              zIndex: 0,
              "&::before": {
                content: '""',
                position: "absolute",
                inset: -1,
                borderRadius: { xs: "24px", md: "40px" },
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, rgba(59, 130, 246, 0.08))",
              },
            }}
          />

          <AccordionFoldImage
            src={specialImage}
            mode="scroll"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "32px",
              boxShadow: "0 50px 100px rgba(0,0,0,0.5)",
              zIndex: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box
            sx={{ mb: 4, opacity: 0.08, display: { xs: "none", md: "block" } }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "12rem",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 900,
                lineHeight: 0.8,
                ml: -6,
              }}
            >
              01
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            Fusion <span style={{ color: "#F5A623" }}>Mastery</span>
            <br />
            In Every Plate
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1.1rem",
              lineHeight: 1.9,
              mb: 5,
              fontWeight: 300,
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
            component="a"
            href="/special"
            variant="outlined"
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
