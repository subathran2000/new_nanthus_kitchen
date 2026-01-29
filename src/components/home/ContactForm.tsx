import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    InputAdornment,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import NoteIcon from '@mui/icons-material/Note';

const ContactForm = ({ isPopup = false }: { isPopup?: boolean }) => {
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

    /* 🌿 Elegant Input Style */
    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            height: '40px', // Always compact for consistency
            borderRadius: '14px',
            background:
                'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.35s ease',
            fontSize: '0.85rem',
            letterSpacing: '0.04em',

            '& fieldset': {
                borderColor: 'rgba(255,255,255,0.12)',
            },

            '&:hover fieldset': {
                borderColor: 'rgba(0,255,255,0.35)',
            },

            '&.Mui-focused fieldset': {
                borderColor: '#00ffff',
                boxShadow: '0 0 0 1px rgba(0,255,255,0.25)',
            },

            '& input': {
                padding: '8px 14px',
                color: '#fff',
            },
        },

        '& .MuiInputLabel-root': {
            color: 'rgba(200,220,255,0.45)',
            letterSpacing: '0.22em',
            fontSize: '0.65rem',
            transform: 'translate(14px, 10px) scale(1)',
            '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)',
            },
            '&.Mui-focused': {
                color: '#00ffff',
            },
        },

        '& .MuiInputAdornment-root svg': {
            fontSize: '1rem',
            color: 'rgba(0,255,255,0.45)',
        },

        '& .Mui-focused .MuiInputAdornment-root svg': {
            color: '#00ffff',
        },
    };

    return (
        <Box sx={{ maxWidth: 920, mx: 'auto', px: 2 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
            >
                <Box
                    sx={{
                        background: 'rgba(0,30,54,0.88)',
                        backdropFilter: 'blur(30px)',
                        borderRadius: '36px',
                        border: '1px solid rgba(0,255,255,0.18)',
                        p: isPopup ? 4 : { xs: 4, md: 7 },
                        boxShadow: 'none',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                            >
                                <Box textAlign="center" mb={3}>
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 200,
                                            letterSpacing: '0.08em',
                                            fontSize: { xs: '1.5rem', md: '2rem' },
                                            textTransform: 'uppercase',
                                            mb: 1
                                        }}
                                    >
                                        <span style={{ color: '#00ffff' }}>Get</span> in Touch
                                    </Typography>
                                </Box>

                                <Grid container spacing={1.5}>
                                    <Grid xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="YOUR NAME"
                                            name="name"
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
                                    </Grid>

                                    <Grid xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="EMAIL ADDRESS"
                                            name="email"
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
                                    </Grid>

                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            label="SUBJECT"
                                            name="subject"
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
                                    </Grid>

                                    <Grid xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="MESSAGE"
                                            name="message"
                                            sx={{
                                                ...inputStyle,
                                                '& .MuiOutlinedInput-root': {
                                                    height: 'auto',
                                                    alignItems: 'flex-start',
                                                },
                                            }}
                                            value={formData.message}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        sx={{ alignSelf: 'flex-start', mt: 1.5 }}
                                                    >
                                                        <NoteIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={12} textAlign="center" mt={3}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            sx={{
                                                borderColor: 'rgba(0, 255, 255, 0.4)',
                                                color: '#00ffff',
                                                borderRadius: 0,
                                                px: { xs: 4, sm: 8 },
                                                py: 2,
                                                fontWeight: 300,
                                                textTransform: 'uppercase',
                                                fontSize: '0.85rem',
                                                letterSpacing: '0.4em',
                                                transition:
                                                    'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    borderColor: '#D9A756',
                                                    bgcolor: '#D9A756',
                                                    color: '#001e36',
                                                    boxShadow:
                                                        '0 0 40px rgba(217, 167, 86, 0.5)',
                                                },
                                            }}
                                        >
                                            SEND MESSAGE
                                        </Button>
                                    </Grid>
                                </Grid>
                            </motion.form>
                        ) : (
                            <Box textAlign="center" py={10}>
                                <Typography
                                    sx={{
                                        color: '#00ffff',
                                        fontSize: '3rem',
                                        letterSpacing: '0.3em',
                                    }}
                                >
                                    SENT
                                </Typography>
                                <Typography sx={{ color: '#aaccff', mt: 2 }}>
                                    We will get back to you shortly.
                                </Typography>
                            </Box>
                        )}
                    </AnimatePresence>
                </Box>
            </motion.div>
        </Box>
    );
};

export default ContactForm;
