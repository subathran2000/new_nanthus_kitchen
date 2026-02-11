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
        maxWidth: "1400px",
        mx: "auto",
        padding: { xs: "1rem 2rem", md: "2rem 80px" },
        position: "relative",
      }}
    >
      <Box
        sx={{
          mb: { xs: 5, md: 8 },
          position: "relative",
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
            color: "#fff",
            fontSize: { xs: "3rem", md: "5rem" },
            lineHeight: 1,
            fontFamily: "'Libre Caslon Display', serif",
          }}
        >
          REACH US
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 12 },
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
            gap: { xs: 3, sm: 5, md: 8 },
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
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.4em",
                  display: "block",
                  mb: 4,
                }}
              >
                {location.label}
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  mb: 1,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {location.address.street}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 3 }}>
                {location.address.city} {location.address.province}{" "}
                {location.address.postalCode}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
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
                      gap: 2,
                      justifyContent: { xs: "center", md: "flex-start" },
                      width: "100%",
                    }}
                  >
                    <PhoneIcon sx={{ color: "#F5A623", fontSize: 18 }} />
                    <Typography
                      component="a"
                      href={`tel:${phone.replace(/\./g, "")}`}
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        "&:hover": { color: "#F5A623" },
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
              pt: 4,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              width: "100%",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.4em",
                display: "block",
                mb: 2,
              }}
            >
              EMAIL
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
                width: "100%",
              }}
            >
              <EmailIcon sx={{ color: "#F5A623", fontSize: 18 }} />
              <Typography
                component="a"
                href={`mailto:${CONTACT.email}`}
                sx={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  "&:hover": { color: "#F5A623" },
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
            gap: 5,
            p: { xs: 3, md: 6 },
            bgcolor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(59, 130, 246, 0.12)",
            borderRadius: "16px",
            textAlign: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
            width: "100%",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 700,
            }}
          >
            Have a Question?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            Whether you have a question about our menu, hours, or want to plan a
            special event, we'd love to hear from you.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setIsFormOpen(true)}
            sx={{
              ...commonButtonStyle,
              width: "100%",
              py: 2,
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
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            boxShadow: "0 0 50px rgba(59, 130, 246, 0.15)",
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
        <Box sx={{ position: "relative", p: 4 }}>
          <IconButton
            onClick={() => setIsFormOpen(false)}
            sx={{
              position: "absolute",
              right: 20,
              top: 20,
              zIndex: 100,
              color: "#F5A623",
              bgcolor: "rgba(59, 130, 246, 0.1)",
              "&:hover": {
                bgcolor: "rgba(59, 130, 246, 0.15)",
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


export default ContactSection
