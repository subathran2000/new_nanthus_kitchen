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
        maxWidth: "1400px",
        margin: "2rem auto 2rem",
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
          EVENTS & CATERING
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
          PREMIUM CATERING
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 10 },
          width: "100%",
        }}
      >
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
              02
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
            Events With <span style={{ color: "#F5A623" }}>Distinction</span>
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
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, rgba(59, 130, 246, 0.1))",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              },
            }}
          />

          <AccordionFoldImage
            src={cateringImage}
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
      </Box>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "rgba(0, 0, 0, 0.95)",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            boxShadow: "0 0 50px rgba(59, 130, 246, 0.15)",
            overflow: "hidden",
            outline: "none",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
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
              color: "#F5A623",
              bgcolor: "rgba(59, 130, 246, 0.1)",
              zIndex: 100,
              "&:hover": {
                bgcolor: "rgba(59, 130, 246, 0.15)",
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
                background: "#F5A623",
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
