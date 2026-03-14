import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// Import local images
import restaurantImg from "../../assets/images/restaurant.jpg";

interface Location {
  name: string;
  address: string;
  phone: string;
}

interface LocationSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectLocation: (locationName: string) => void;
}

const locations: Location[] = [
  {
    name: "SCARBOROUGH",
    address: "80 Nashdene Rd, Scarborough, ON",
    phone: "(416) 299 1999",
  },
  {
    name: "MARKHAM",
    address: "72-30 Karachi Dr, Markham, ON",
    phone: "(289) 554 5999",
  },
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  open,
  onClose,
  onSelectLocation,
}) => {
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
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
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
            maxWidth: "1000px",
            height: { xs: "auto", md: "550px" },
            maxHeight: { xs: "90vh", md: "550px" },
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E6ED",
            borderRadius: "16px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
            p: 0,
            outline: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <IconButton
            onClick={onClose}
            aria-label="Close location selector"
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              zIndex: 100,
              color: "#5A6177",
              bgcolor: "#F5F7FA",
              "&:hover": {
                bgcolor: "#E2E6ED",
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Left Column: Visual/Branding */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              position: "relative",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              overflow: "hidden",
              minHeight: { xs: "200px", md: "auto" },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${restaurantImg}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(26, 29, 35, 0.88), rgba(26, 29, 35, 0.75))",
                },
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1.5 }}
              >
                <RestaurantIcon sx={{ color: "#F5A623", fontSize: "2rem" }} />
                <Typography
                  variant="overline"
                  sx={{
                    color: "#F5A623",
                    letterSpacing: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  ORDER ONLINE
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  mb: 3,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Freshly <br />
                <span style={{ color: "#F5A623" }}>Prepared</span> <br />
                For You
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.6,
                  fontSize: "1rem",
                  maxWidth: "300px",
                  fontWeight: 400,
                }}
              >
                Choose your nearest branch and explore our authentic flavors
                today.
              </Typography>
            </motion.div>
          </Box>

          {/* Right Column: Selection Cards */}
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#FFFFFF",
              borderLeft: { md: "1px solid #E2E6ED" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#1A1D23",
                fontFamily: "'Playfair Display', Georgia, serif",
                mb: 4,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              Select Your Location
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${location.name} location`}
                    sx={{
                      p: 3,
                      borderRadius: "12px",
                      background: "#F5F7FA",
                      border: "1px solid #E2E6ED",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        background: "#FFFFFF",
                        borderColor: "#2B7DE9",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      },
                      "&:focus-visible": {
                        outline: "2px solid #2B7DE9",
                        outlineOffset: "2px",
                      },
                    }}
                    onClick={() => onSelectLocation(location.name)}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectLocation(location.name);
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "10px",
                          bgcolor: "rgba(43, 125, 233, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LocationOnIcon sx={{ color: "#2B7DE9" }} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#1A1D23",
                            fontWeight: 700,
                            letterSpacing: "1px",
                          }}
                        >
                          {location.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#5A6177" }}
                        >
                          {location.address}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 1,
                        ml: 1,
                      }}
                    >
                      <PhoneIcon
                        sx={{
                          color: "#A0A8B8",
                          fontSize: "0.9rem",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#5A6177" }}
                      >
                        {location.phone}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      aria-label={`Order from ${location.name}`}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onSelectLocation(location.name);
                      }}
                      sx={{
                        py: 1.5,
                        background: "#2B7DE9",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        boxShadow: "0 2px 8px rgba(43, 125, 233, 0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "#1B5FB5",
                          boxShadow: "0 4px 16px rgba(43, 125, 233, 0.35)",
                        },
                        "&:focus-visible": {
                          outline: "2px solid #2B7DE9",
                          outlineOffset: "2px",
                        },
                      }}
                    >
                      Order Now
                    </Button>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LocationSelector;
