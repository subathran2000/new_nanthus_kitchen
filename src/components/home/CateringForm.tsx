import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    MenuItem,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NoteIcon from '@mui/icons-material/Note';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

// Import local images
import cateringImage from "../../assets/images/bg2.jpg";

const CateringForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventType: '',
        date: '',
        guests: '',
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
        },
        '& .MuiSelect-select': {
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '12px 14px',
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
                        backgroundImage: `url(${cateringImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(0, 15, 27, 0.95), rgba(0, 5, 10, 0.8))',
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
                        <RestaurantMenuIcon sx={{ color: '#FF8C00', fontSize: '2rem' }} />
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#FF8C00',
                                letterSpacing: '4px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}
                        >
                            PRIVATE EVENTS
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
                        Exceptional <br />
                        <span style={{ color: '#FF8C00' }}>Catering</span> <br />
                        Service
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
                        From intimate dinners to grand celebrations, we transform your vision into a culinary masterpiece.
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
                            key="catering-form"
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
                                        label="FULL NAME"
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

                                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="EVENT TYPE"
                                        name="eventType"
                                        required
                                        sx={inputStyle}
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EventIcon />
                                                </InputAdornment>
                                            ),
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
                                        sx={inputStyle}
                                        value={formData.guests}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <GroupsIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    label="EVENT DATE"
                                    name="date"
                                    placeholder="MM/DD/YYYY"
                                    required
                                    sx={inputStyle}
                                    value={formData.date}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="TELL US MORE"
                                    name="message"
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
                                        Submit Request <span style={{ marginLeft: '10px' }}>→</span>
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
                                    Request Received!
                                </Typography>
                                <Typography sx={{ color: '#aaccff', fontSize: '1.1rem', mb: 4 }}>
                                    Our event planners will review your request <br />
                                    and contact you within 24 hours.
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
