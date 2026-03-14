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
import { UtensilsCrossed, ArrowRight } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { specialItems } from "../../data/specialItems";
import CardStack from "./CardStack";
import { motion } from "framer-motion";

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
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
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
            width: { xs: "95%", sm: "90%", md: "1100px" },
            height: { xs: "auto", md: "600px" },
            maxHeight: "95vh",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E6ED",
            borderRadius: "20px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
            p: 0,
            outline: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            aria-label="Close specials popup"
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 100,
              color: "#5A6177",
              bgcolor: "#F5F7FA",
              "&:hover": {
                bgcolor: "#E2E6ED",
                color: "#1A1D23",
              },
              transition: "all 0.2s",
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Visual Section */}
          <Box
            sx={{
              flex: 1.1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 4, md: 8 },
              bgcolor: "#F5F7FA",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", md: "100%" },
                maxWidth: "450px",
                maxHeight: "550px",
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
              flex: 0.9,
              p: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              bgcolor: "#FFFFFF",
              borderLeft: { md: "1px solid #E2E6ED" },
            }}
          >
            <motion.div
              key={currentItem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}
              >
                <UtensilsCrossed size={16} color="#F5A623" />
                <Typography
                  variant="overline"
                  sx={{
                    color: "#F5A623",
                    letterSpacing: "4px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  TODAY'S SPECIAL
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  color: "#1A1D23",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  mb: 3,
                  fontWeight: 600,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {currentItem.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#5A6177",
                  mb: 5,
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  maxWidth: "400px",
                }}
              >
                {currentItem.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => {
                    onClose();
                    navigate(ROUTES.SPECIAL);
                  }}
                  variant="outlined"
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderColor: "#2B7DE9",
                    color: "#2B7DE9",
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    letterSpacing: "0.5px",
                    "&:hover": {
                      borderColor: "#1B5FB5",
                      bgcolor: "rgba(43, 125, 233, 0.04)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 16px rgba(43, 125, 233, 0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  View All Specials
                </Button>
              </Box>
            </motion.div>

            <Box sx={{ mt: "auto", pt: 5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#A0A8B8",
                  letterSpacing: "1px",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                }}
              >
                Swipe cards to explore more
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SpecialsPopup;
