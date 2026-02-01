import React, { useState, useCallback, memo } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import NoteIcon from "@mui/icons-material/Note";

import FormField from "../common/FormField";
import {
  formContainerStyle,
  formLeftColumnStyle,
  formRightColumnStyle,
  formTitleStyle,
  formDescriptionStyle,
  formButtonStyle,
  successMessageStyle,
} from "../common/FormStyles";
import {
  FormStatus as FormStatusConst,
  type FormStatusType,
} from "../../types";
import type { ContactFormData } from "../../types";
import { validateContactForm } from "../../utils/validation";

// Import background image
import contactBg from "../../assets/images/Navy Blue Wallpaper.jpg";

interface ContactFormProps {
  onSubmitCallback?: (data: ContactFormData) => void | Promise<void>;
}

const ContactForm = memo(({ onSubmitCallback }: ContactFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatusType>(FormStatusConst.IDLE);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form
      const validation = validateContactForm(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      setStatus(FormStatusConst.LOADING);
      setErrors({});

      try {
        // Call optional callback if provided
        if (onSubmitCallback) {
          await onSubmitCallback(formData);
        } else {
          // TODO: Implement API call to backend
          // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
        }

        setStatus(FormStatusConst.SUCCESS);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset status after 5 seconds
        setTimeout(() => setStatus(FormStatusConst.IDLE), 5000);
      } catch (error) {
        setStatus(FormStatusConst.ERROR);
        setErrors({ submit: "Failed to submit form. Please try again." });
      }
    },
    [formData, onSubmitCallback],
  );

  return (
    <Box sx={formContainerStyle}>
      {/* Left Column: Visual/Branding */}
      {!isMobile && (
        <Box sx={formLeftColumnStyle}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${contactBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.4,
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: 300,
                mb: 2,
                background: "linear-gradient(135deg, #FF8C00, #FFB84D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.7,
              }}
            >
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Right Column: Form */}
      <Box sx={formRightColumnStyle}>
        <Typography sx={formTitleStyle}>Contact Us</Typography>
        <Typography sx={formDescriptionStyle}>
          Fill out the form below and we'll get back to you shortly.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <FormField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              icon={<PersonIcon />}
              error={errors.name}
              placeholder="John Doe"
              required
            />

            <FormField
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              icon={<EmailIcon />}
              error={errors.email}
              type="email"
              placeholder="your@email.com"
              required
            />

            <FormField
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              icon={<SubjectIcon />}
              error={errors.subject}
              placeholder="What is this about?"
              required
            />

            <FormField
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              icon={<NoteIcon />}
              error={errors.message}
              placeholder="Tell us more..."
              multiline
              rows={4}
              required
            />

            {errors.submit && (
              <Box sx={successMessageStyle}>
                <Typography>{errors.submit}</Typography>
              </Box>
            )}

            <AnimatePresence>
              {status === FormStatusConst.SUCCESS && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Box sx={successMessageStyle}>
                    <Typography>
                      ✓ Thank you! Your message has been sent successfully.
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="outlined"
              disabled={status === FormStatusConst.LOADING}
              sx={{
                ...formButtonStyle,
                mt: 2,
              }}
            >
              {status === FormStatusConst.LOADING
                ? "Sending..."
                : "Send Message"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
