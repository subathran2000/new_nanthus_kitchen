import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { validateCateringForm } from "../../utils/validation";
import type { CateringFormData } from "../../types";

// Import local images
import cateringImage from "../../assets/images/bg2.jpg";

const CateringForm = () => {
  const [formData, setFormData] = useState<CateringFormData>({
    name: "",
    email: "",
    eventType: "",
    date: "",
    guests: "",
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
    const result = validateCateringForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  /* 🌿 Specials-Style Input Style */
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.03)",
      transition: "all 0.3s ease",
      fontSize: "0.9rem",
      "& fieldset": {
        borderColor: "rgba(59, 130, 246, 0.15)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(59, 130, 246, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F5A623",
      },
      "& input": {
        color: "#fff",
        padding: "12px 14px",
      },
      "& textarea": {
        color: "#fff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "0.85rem",
      "&.Mui-focused": {
        color: "#F5A623",
      },
    },
    "& .MuiInputAdornment-root svg": {
      color: "rgba(59, 130, 246, 0.3)",
    },
    "& .Mui-focused .MuiInputAdornment-root svg": {
      color: "#F5A623",
    },
    "& .MuiSelect-select": {
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 1,
      padding: "12px 14px",
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "transparent",
      }}
    >
      {/* Left Column: Visual/Branding (Specials Style) */}
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
        {/* Background Image with Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${cateringImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(10, 22, 40, 0.95), rgba(8, 16, 32, 0.8))",
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
            <RestaurantMenuIcon sx={{ color: "#F5A623", fontSize: "2rem" }} />
            <Typography
              variant="overline"
              sx={{
                color: "#F5A623",
                letterSpacing: "4px",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              PRIVATE EVENTS
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              mb: 3,
              textShadow: "0 0 20px rgba(245, 166, 35, 0.3)",
              fontSize: { xs: "2.2rem", md: "3.2rem" },
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Exceptional <br />
            <span style={{ color: "#F5A623" }}>Catering</span> <br />
            Service
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(180, 210, 255, 0.7)",
              lineHeight: 1.7,
              fontSize: "1rem",
              maxWidth: "350px",
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            From intimate dinners to grand celebrations, we transform your
            vision into a culinary masterpiece.
          </Typography>
        </motion.div>
      </Box>

      {/* Right Column: Form (Glassmorphic) */}
      <Box
        sx={{
          flex: 1.2,
          p: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "rgba(10, 22, 40, 0.5)",
          backdropFilter: "blur(20px)",
          position: "relative",
          borderLeft: { md: "1px solid rgba(59, 130, 246, 0.1)" },
        }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="catering-form"
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
                    label="FULL NAME"
                    name="name"
                    required
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

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    select
                    fullWidth
                    label="EVENT TYPE"
                    name="eventType"
                    required
                    error={!!errors.eventType}
                    helperText={errors.eventType}
                    sx={inputStyle}
                    value={formData.eventType}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  >
                    <MenuItem value="Wedding">Wedding</MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                    <MenuItem value="Birthday">Birthday</MenuItem>
                    <MenuItem value="Private">Private Event</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    label="EXPECTED GUESTS"
                    name="guests"
                    type="number"
                    required
                    error={!!errors.guests}
                    helperText={errors.guests}
                    sx={inputStyle}
                    value={formData.guests}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <GroupsIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="EVENT DATE"
                  name="date"
                  placeholder="MM/DD/YYYY"
                  required
                  error={!!errors.date}
                  helperText={errors.date}
                  sx={inputStyle}
                  value={formData.date}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="TELL US MORE"
                  name="message"
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
                    aria-label="Submit catering request"
                    sx={{
                      py: 2,
                      background: "linear-gradient(90deg, #F5A623, #3B82F6)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
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
                    Submit Request <span style={{ marginLeft: "10px" }}>→</span>
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
                    color: "#F5A623",
                    fontFamily: "'Playfair Display', serif",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Request Received!
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(180, 210, 255, 0.7)",
                    fontSize: "1.1rem",
                    mb: 4,
                  }}
                >
                  Our event planners will review your request <br />
                  and contact you within 24 hours.
                </Typography>
                <Button
                  onClick={() => setSubmitted(false)}
                  sx={{
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px",
                    px: 4,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#F5A623",
                      color: "#F5A623",
                    },
                  }}
                >
                  Send Another Request
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default CateringForm;
