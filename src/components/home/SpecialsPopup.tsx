import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Button,
} from "@mui/material";
import { Close, RestaurantMenu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { specialItems } from "../../data/specialItems";
import CardStack from "./CardStack";

interface SpecialsPopupProps {
  open: boolean;
  onClose: () => void;
}

const SpecialsPopup: React.FC<SpecialsPopupProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(specialItems[0]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "800px", md: "1000px" },
            height: { xs: "auto", md: "600px" },
            maxHeight: { xs: "90vh", md: "600px" },
            bgcolor: "rgba(10, 22, 40, 0.98)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: "16px",
            boxShadow: "0 0 50px rgba(59, 130, 246, 0.15)",
            p: 0,
            outline: "none",
            overflowY: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <IconButton
            onClick={onClose}
            aria-label="Close specials popup"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 100,
              color: "#F5A623",
              bgcolor: "rgba(59, 130, 246, 0.1)",
              "&:hover": { bgcolor: "rgba(59, 130, 246, 0.2)" },
            }}
          >
            <Close />
          </IconButton>

          {/* Card Stack Section */}
          <Box
            sx={{
              flex: 1.2,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              perspective: "1000px",
              minHeight: { xs: "400px", md: "auto" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: "350px", md: "100%" },
                maxWidth: "400px",
                maxHeight: "500px",
                position: "relative",
              }}
            >
              <CardStack
                items={specialItems}
                onCenterCardChange={setCurrentItem}
              />
            </Box>
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              flex: 0.8,
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              background:
                "linear-gradient(135deg, rgba(10, 22, 40, 0.95), rgba(8, 18, 36, 0.98))",
              borderLeft: { md: "1px solid rgba(59, 130, 246, 0.1)" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <RestaurantMenu sx={{ color: "#F5A623" }} />
              <Typography
                variant="overline"
                sx={{
                  color: "#F5A623",
                  letterSpacing: "3px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                TODAY'S SPECIAL
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "'Playfair Display', serif",
                mb: 2,
                textShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              {currentItem.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              {currentItem.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Button
                onClick={() => {
                  onClose();
                  navigate("/special");
                }}
                sx={{
                  py: 1.5,
                  px: 4,
                  background: "linear-gradient(90deg, #F5A623, #3B82F6)",
                  color: "#fff",
                  borderRadius: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 35px rgba(59, 130, 246, 0.3)",
                    filter: "brightness(1.1)",
                    background: "linear-gradient(90deg, #F5A623, #3B82F6)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid #F5A623",
                    outlineOffset: "2px",
                  },
                }}
              >
                View All Specials
              </Button>
            </Box>

            <Typography
              variant="caption"
              sx={{
                mt: 3,
                color: "rgba(255,255,255,0.3)",
                fontStyle: "italic",
              }}
            >
              Swipe cards to explore more
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SpecialsPopup;
