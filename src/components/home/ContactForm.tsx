import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import NoteIcon from "@mui/icons-material/Note";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { validateContactForm } from "../../utils/validation";
import type { ContactFormData } from "../../types";

// Import local images
import contactBg from "../../assets/images/Navy Blue Wallpaper.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      background: "#F5F7FA",
      transition: "all 0.3s ease",
      fontSize: "0.9rem",
      "& fieldset": {
        borderColor: "#E2E6ED",
      },
      "&:hover fieldset": {
        borderColor: "#2B7DE9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2B7DE9",
      },
      "& input": {
        color: "#1A1D23",
        padding: "12px 14px",
      },
      "& textarea": {
        color: "#1A1D23",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#A0A8B8",
      fontSize: "0.85rem",
      "&.Mui-focused": {
        color: "#2B7DE9",
      },
    },
    "& .MuiInputAdornment-root svg": {
      color: "#A0A8B8",
    },
    "& .Mui-focused .MuiInputAdornment-root svg": {
      color: "#2B7DE9",
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#FFFFFF",
      }}
    >
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
          minHeight: { xs: "250px", md: "auto" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${contactBg}")`,
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1.5 }}>
            <EmailOutlinedIcon sx={{ color: "#F5A623", fontSize: "2rem" }} />
            <Typography
              variant="overline"
              sx={{
                color: "#F5A623",
                letterSpacing: "4px",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              CONNECT WITH US
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
            We'd Love to <br />
            <span style={{ color: "#F5A623" }}>Hear</span> From <br />
            You
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.7,
              fontSize: "1rem",
              maxWidth: "350px",
              fontWeight: 400,
            }}
          >
            Whether you have a question about our menu, events, or just want to
            say hello, our team is here to help.
          </Typography>
        </motion.div>
      </Box>

      {/* Right Column: Form */}
      <Box
        sx={{
          flex: 1.2,
          p: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "#FFFFFF",
          position: "relative",
          borderLeft: { md: "1px solid #E2E6ED" },
        }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    fullWidth
                    label="YOUR NAME"
                    name="name"
                    required
                    autoComplete="name"
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={inputStyle}
                    value={formData.name}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="EMAIL ADDRESS"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={inputStyle}
                    value={formData.email}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="SUBJECT"
                  name="subject"
                  required
                  error={!!errors.subject}
                  helperText={errors.subject}
                  sx={inputStyle}
                  value={formData.subject}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="HOW CAN WE HELP?"
                  name="message"
                  required
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={{
                    ...inputStyle,
                    "& .MuiOutlinedInput-root": {
                      ...inputStyle["& .MuiOutlinedInput-root"],
                      height: "auto",
                      alignItems: "flex-start",
                      pt: 1.5,
                    },
                  }}
                  value={formData.message}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mt: 1 }}>
                          <NoteIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Box sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    aria-label="Send message"
                    sx={{
                      py: 1.75,
                      background: "#2B7DE9",
                      border: "none",
                      borderRadius: "10px",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: "0 2px 8px rgba(43, 125, 233, 0.25)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 16px rgba(43, 125, 233, 0.35)",
                        background: "#1B5FB5",
                      },
                      "&:focus-visible": {
                        outline: "2px solid #2B7DE9",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center" }}
            >
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#2B7DE9",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Message Sent!
                </Typography>
                <Typography
                  sx={{
                    color: "#5A6177",
                    fontSize: "1.05rem",
                    mb: 4,
                  }}
                >
                  Thank you for reaching out. <br />
                  We'll get back to you as soon as possible.
                </Typography>
                <Button
                  onClick={() => setSubmitted(false)}
                  sx={{
                    color: "#1A1D23",
                    border: "1px solid #E2E6ED",
                    borderRadius: "8px",
                    px: 4,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#2B7DE9",
                      color: "#2B7DE9",
                    },
                  }}
                >
                  Send Another Message
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ContactForm;
