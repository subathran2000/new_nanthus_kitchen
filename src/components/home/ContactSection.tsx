import { useState } from 'react'
import { Box, Typography, Button, Dialog, IconButton } from '@mui/material'
import { commonButtonStyle } from '../common/ButtonStyles'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close'
import ContactForm from "./ContactForm";
import { LOCATIONS, CONTACT } from "../../constants/businessInfo";

const ContactSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        padding: { xs: "1.5rem 1.25rem", sm: "2rem", md: "2rem" },
        position: "relative",
      }}
    >
      <Box
        sx={{
          mb: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" className="overline-text">
          GET IN TOUCH
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
          Reach Us
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
          alignItems: { xs: "center", md: "flex-start" },
          width: "100%",
        }}
      >
        {/* Left: Locations */}
        <Box
          sx={{
            flex: 1.5,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 3, sm: 4, md: 6 },
            textAlign: { xs: "center", md: "left" },
            width: "100%",
          }}
        >
          {LOCATIONS.map((location) => (
            <Box
              key={location.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#A0A8B8",
                  letterSpacing: "0.3em",
                  display: "block",
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                {location.label}
              </Typography>
              <Typography
                sx={{
                  color: "#1A1D23",
                  fontSize: "1.1rem",
                  mb: 0.5,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                {location.address.street}
              </Typography>
              <Typography sx={{ color: "#5A6177", mb: 2.5 }}>
                {location.address.city} {location.address.province}{" "}
                {location.address.postalCode}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75,
                  alignItems: { xs: "center", md: "flex-start" },
                  width: "100%",
                }}
              >
                {location.phones.map((phone) => (
                  <Box
                    key={phone}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      justifyContent: { xs: "center", md: "flex-start" },
                      width: "100%",
                    }}
                  >
                    <PhoneIcon sx={{ color: "#2B7DE9", fontSize: 18 }} />
                    <Typography
                      component="a"
                      href={`tel:${phone.replace(/\./g, "")}`}
                      sx={{
                        color: "#1A1D23",
                        textDecoration: "none",
                        "&:hover": { color: "#2B7DE9" },
                      }}
                    >
                      {phone}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}

          <Box
            sx={{
              gridColumn: { xs: "span 1", sm: "span 2" },
              pt: 3,
              borderTop: "1px solid #E2E6ED",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              width: "100%",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#A0A8B8",
                letterSpacing: "0.3em",
                display: "block",
                mb: 1.5,
                fontWeight: 600,
              }}
            >
              EMAIL
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                justifyContent: { xs: "center", md: "flex-start" },
                width: "100%",
              }}
            >
              <EmailIcon sx={{ color: "#2B7DE9", fontSize: 18 }} />
              <Typography
                component="a"
                href={`mailto:${CONTACT.email}`}
                sx={{
                  color: "#1A1D23",
                  fontSize: "1.05rem",
                  textDecoration: "none",
                  "&:hover": { color: "#2B7DE9" },
                }}
              >
                {CONTACT.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right: CTA */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: { xs: 3, md: 5 },
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E6ED",
            borderRadius: "16px",
            textAlign: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
            width: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background:
                "linear-gradient(90deg, #2B7DE9, #F5A623)",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1A1D23",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
            }}
          >
            Have a Question?
          </Typography>
          <Typography sx={{ color: "#5A6177", lineHeight: 1.7 }}>
            Whether you have a question about our menu, hours, or want to plan a
            special event, we'd love to hear from you.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setIsFormOpen(true)}
            sx={{
              ...commonButtonStyle,
              width: "100%",
              py: 1.75,
            }}
          >
            OPEN CONTACT FORM
          </Button>
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
        <Box sx={{ position: "relative", p: 4 }}>
          <IconButton
            onClick={() => setIsFormOpen(false)}
            sx={{
              position: "absolute",
              right: 20,
              top: 20,
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
          <ContactForm />
        </Box>
      </Dialog>
    </Box>
  );
};

export default ContactSection;
