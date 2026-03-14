import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, IconButton, DialogContent } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { commonButtonStyle } from "../common/ButtonStyles";
import CateringForm from "./CateringForm";
import cateringImage from "../../assets/images/bg2.jpg";
import AccordionFoldImage from "./AccordionFoldImage";

const CateringSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
          EVENTS & CATERING
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
          Premium Catering
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          width: "100%",
        }}
      >
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
            Events With <span style={{ color: "#F5A623" }}>Distinction</span>
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
            Make your next event unforgettable with authentic Jaffna cuisine.
            Whether it's a family celebration, corporate gathering, or wedding,
            our catering team delivers exceptional food and service tailored to
            your occasion.
          </Typography>

          <Button
            variant="outlined"
            onClick={() => setIsFormOpen(true)}
            sx={commonButtonStyle}
          >
            SEND INQUIRY
          </Button>
        </Box>

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
            src={cateringImage}
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
      </Box>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "#FFFFFF",
            border: "1px solid #E2E6ED",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            overflow: "hidden",
            outline: "none",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        }}
      >
        <Box sx={{ position: "relative", height: "100%", display: "flex" }}>
          <IconButton
            onClick={() => setIsFormOpen(false)}
            sx={{
              position: "absolute",
              right: 15,
              top: 15,
              color: "#5A6177",
              bgcolor: "#F5F7FA",
              zIndex: 100,
              "&:hover": {
                bgcolor: "#E2E6ED",
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent
            sx={{
              p: 0,
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: "#A0A8B8",
                borderRadius: "4px",
              },
            }}
          >
            <CateringForm />
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CateringSection;
