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
import { X, UtensilsCrossed, ArrowRight } from "lucide-react";
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
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
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
            height: { xs: "auto", md: "650px" },
            maxHeight: "95vh",
            bgcolor: "#050505",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "32px",
            boxShadow: "0 0 100px rgba(0, 0, 0, 0.5)",
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
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              zIndex: 100,
              color: "rgba(255,255,255,0.5)",
              bgcolor: "rgba(255,255,255,0.05)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
              },
              transition: "all 0.2s",
            }}
          >
            <X size={20} />
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
              bgcolor: "#0a0a0a",
              overflow: "hidden",
            }}
          >
            {/* Background Glow */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle at 50% 50%, rgba(245, 166, 35, 0.05) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

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
              bgcolor: "#050505",
              borderLeft: { md: "1px solid rgba(255, 255, 255, 0.05)" },
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
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  mb: 3,
                  fontWeight: 400,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {currentItem.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 6,
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
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
                    py: 1.8,
                    px: 4.5,
                    borderColor: "rgba(245, 166, 35, 0.5)",
                    color: "#F5A623",
                    borderRadius: "100px",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    letterSpacing: "0.5px",
                    "&:hover": {
                      borderColor: "#F5A623",
                      bgcolor: "rgba(245, 166, 35, 0.08)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  View All Specials
                </Button>
              </Box>
            </motion.div>

            <Box sx={{ mt: "auto", pt: 6 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.4)",
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
