
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { commonButtonStyle } from "../common/ButtonStyles";
import { motion, AnimatePresence } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import SvgIcon from "@mui/material/SvgIcon";
import { SOCIAL_LINKS, BRAND } from "../../constants/businessInfo";
import "./Footer.css";

const TikTokIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </SvgIcon>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        mt: 0,
        pb: 0,
        overflow: "visible",
        color: "#fff",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Decor Glows */}
      <Box
        sx={{
          position: "absolute",
          bottom: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "300px",
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Newsletter Section - Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: { xs: "16px", md: "24px" },
              border: "1px solid rgba(59, 130, 246, 0.12)",
              p: { xs: 3, sm: 4, md: 8 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 3, md: 6 },
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated Border Reveal */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "200px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, #F5A623, transparent)",
                animation: "moveLine 4s infinite linear",
              }}
            />

            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "3.5rem" },
                  lineHeight: 1.1,
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
                }}
              >
                Join Our <span className="footer-secret-text">Secret</span>{" "}
                Kitchen.
              </Typography>
              <Typography
                sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "500px", fontFamily: '"Inter", sans-serif' }}
              >
                Receive exclusive invitations to tasting events, secret
                traditional recipes, and culinary stories that you won't find
                anywhere else.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, width: "100%" }}>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        sx: {
                          color: "#fff",
                          bgcolor: "rgba(255, 255, 255, 0.03)",
                          borderRadius: "12px",
                          px: 2,
                          py: 1.5,
                          border: "1px solid rgba(59, 130, 246, 0.12)",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                          },
                          "&:focus-within": {
                            border: "1px solid #F5A623",
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)",
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                          },
                        },
                      },
                    }}
                  />
                  <AnimatePresence>
                    {!subscribed ? (
                      <motion.div exit={{ opacity: 0, scale: 0.9 }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          disabled={!email}
                          sx={{
                            ...commonButtonStyle,
                            py: 1.5
                          }}
                        >
                          Subscribe for updates
                        </Button>
                      </motion.div>
                    ) : (
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        sx={{ textAlign: "center" }}
                      >
                        <Typography sx={{ color: "#F5A623", fontWeight: 600 }}>
                          Welcome to the Circle! Check your inbox soon.
                        </Typography>
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              </form>
            </Box>
          </Box>
        </motion.div>

        {/* Footer Bottom */}
        <Box
          sx={{
            mt: 8,
            pb: 0,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#fff",
                mb: 1,
                letterSpacing: "2px",
              }}
            >
              NEW NANTHU'S <span className="footer-kitchen-text">KITCHEN</span>
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
              {BRAND.copyright}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.4)",
                mt: 1,
                display: "block",
                letterSpacing: "0.05em",
              }}
            >
              Created by{" "}
              <a
                href={BRAND.createdBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-creator-link"
              >
                {BRAND.createdBy.name}
              </a>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {[
              { Icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: "Instagram" },
              { Icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: "Facebook" },
              { Icon: TikTokIcon, href: SOCIAL_LINKS.tiktok, label: "TikTok" },
            ].map(({ Icon, href, label }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  color: "#F5A623",
                  bgcolor: "rgba(59, 130, 246, 0.05)",
                  border: "1px solid rgba(59, 130, 246, 0.1)",
                  "&:hover": { bgcolor: "rgba(59, 130, 246, 0.15)", color: "#fff", transform: "translateY(-5px)" },
                  transition: "all 0.3s ease",
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
