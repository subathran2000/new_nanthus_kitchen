import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import NoteIcon from '@mui/icons-material/Note';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// Import local images
import contactBg from "../../assets/images/Navy Blue Wallpaper.jpg";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    /* 🌿 Specials-Style Input Style */
    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem',
            '& fieldset': {
                borderColor: 'rgba(255, 140, 0, 0.15)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 140, 0, 0.4)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF8C00',
            },
            '& input': {
                color: '#fff',
                padding: '12px 14px',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.85rem',
            '&.Mui-focused': {
                color: '#FF8C00',
            },
        },
        '& .MuiInputAdornment-root svg': {
            color: 'rgba(255, 140, 0, 0.4)',
        },
        '& .Mui-focused .MuiInputAdornment-root svg': {
            color: '#FF8C00',
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                bgcolor: 'transparent',
            }}
        >
            {/* Left Column: Visual/Branding (Specials Style) */}
            <Box
                sx={{
                    flex: 1,
                    p: { xs: 4, md: 6 },
                    position: 'relative',
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    minHeight: { xs: '250px', md: 'auto' }
                }}
            >
                {/* Background Image with Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("${contactBg}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(0, 15, 27, 0.9), rgba(0, 5, 10, 0.7))',
                        }
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                        <EmailOutlinedIcon sx={{ color: '#FF8C00', fontSize: '2rem' }} />
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#FF8C00',
                                letterSpacing: '4px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}
                        >
                            CONNECT WITH US
                        </Typography>
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            color: '#fff',
                            fontFamily: "'Playfair Display', serif",
                            mb: 3,
                            textShadow: '0 0 20px rgba(255, 140, 0, 0.3)',
                            fontSize: { xs: '2.2rem', md: '3.2rem' },
                            fontWeight: 700,
                            lineHeight: 1.1
                        }}
                    >
                        We'd Love to <br />
                        <span style={{ color: '#FF8C00' }}>Hear</span> From <br />
                        You
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#aaccff',
                            lineHeight: 1.7,
                            fontSize: '1rem',
                            maxWidth: '350px',
                            fontWeight: 300,
                            opacity: 0.9
                        }}
                    >
                        Whether you have a question about our menu, events, or just want to say hello, our team is here to help.
                    </Typography>
                </motion.div>
            </Box>

            {/* Right Column: Form (Glassmorphic) */}
            <Box
                sx={{
                    flex: 1.2,
                    p: { xs: 4, md: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0, 5, 15, 0.4)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    borderLeft: { md: '1px solid rgba(255, 140, 0, 0.1)' }
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
                            style={{ width: '100%' }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <TextField
                                        fullWidth
                                        label="YOUR NAME"
                                        name="name"
                                        required
                                        sx={inputStyle}
                                        value={formData.name}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="EMAIL ADDRESS"
                                        name="email"
                                        type="email"
                                        required
                                        sx={inputStyle}
                                        value={formData.email}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    label="SUBJECT"
                                    name="subject"
                                    required
                                    sx={inputStyle}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SubjectIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="HOW CAN WE HELP?"
                                    name="message"
                                    required
                                    sx={{
                                        ...inputStyle,
                                        '& .MuiOutlinedInput-root': {
                                            height: 'auto',
                                            alignItems: 'flex-start',
                                            pt: 1.5,
                                        }
                                    }}
                                    value={formData.message}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ mt: 1 }}>
                                                <NoteIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Box sx={{ mt: 2 }}>
                                    <Box
                                        component="button"
                                        type="submit"
                                        sx={{
                                            width: '100%',
                                            py: 2,
                                            background: 'linear-gradient(90deg, #FF8C00, #F4511E)',
                                            border: 'none',
                                            borderRadius: '50px',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 25px rgba(255, 140, 0, 0.3)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-3px)',
                                                boxShadow: '0 15px 35px rgba(255, 140, 0, 0.4)',
                                                filter: 'brightness(1.1)'
                                            }
                                        }}
                                    >
                                        Send Message <span style={{ marginLeft: '10px' }}>→</span>
                                    </Box>
                                </Box>
                            </Box>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <Box sx={{ p: 4 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: '#FF8C00',
                                        fontFamily: "'Playfair Display', serif",
                                        mb: 2,
                                        fontWeight: 700
                                    }}
                                >
                                    Message Sent!
                                </Typography>
                                <Typography sx={{ color: '#aaccff', fontSize: '1.1rem', mb: 4 }}>
                                    Thank you for reaching out. <br />
                                    We'll get back to you as soon as possible.
                                </Typography>
                                <Button
                                    onClick={() => setSubmitted(false)}
                                    sx={{
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '50px',
                                        px: 4,
                                        textTransform: 'none',
                                        '&:hover': {
                                            borderColor: '#FF8C00',
                                            color: '#FF8C00'
                                        }
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
