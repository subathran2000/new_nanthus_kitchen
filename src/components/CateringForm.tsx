
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Grid, useTheme, useMediaQuery, InputAdornment, Dialog, DialogContent, IconButton, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import NoteIcon from '@mui/icons-material/Note';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MapPicker from './MapPicker';

const eventTypes = [
    'Wedding Gala',
    'Corporate Dinner',
    'Private Celebration',
    'Cultural Event',
    'Other'
];

const CateringForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventType: '',
        location: '',
        coordinates: null as { lat: number, lng: number } | null,
        guests: '',
        message: ''
    });
    const [date, setDate] = useState<Dayjs | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            color: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
                borderColor: 'rgba(0, 255, 255, 0.1)',
                borderWidth: '1px',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(0, 255, 255, 0.4)',
                backgroundColor: 'rgba(0, 255, 255, 0.02)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00ffff',
                borderWidth: '1px',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.15)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(170, 204, 255, 0.4)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            '&.Mui-focused': {
                color: '#00ffff',
            },
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: 'rgba(0, 255, 255, 0.4)',
            fontSize: '1.2rem',
        },
        '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: '#00ffff',
        },
        '& input[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
            },
            '&::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
            },
        },
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{
                width: '100%',
                maxWidth: '1000px',
                mx: 'auto',
                mt: 12,
                position: 'relative',
                zIndex: 10
            }}>
                {/* Master Container with Dynamic Border */}
                <Box sx={{
                    position: 'relative',
                    p: '2px', // Space for animated border
                    background: 'rgba(0, 255, 255, 0.05)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-50%', // Use inset instead of top/left for cleaner containment
                        width: '200%',
                        height: '200%',
                        background: 'conic-gradient(transparent, transparent, transparent, #00ffff)',
                        animation: 'rotateBorder 6s linear infinite',
                        zIndex: 0
                    }
                }}>
                    <Box sx={{
                        background: 'rgba(0, 30, 54, 0.95)',
                        backdropFilter: 'blur(40px)',
                        borderRadius: '11px',
                        p: { xs: 2, sm: 4, md: 8 },
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    onSubmit={handleSubmit}
                                >
                                    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
                                        <Typography variant="overline" sx={{ 
                                            color: '#D9A756', 
                                            letterSpacing: { xs: '0.2em', md: '0.6em' }, 
                                            mb: 1, 
                                            display: 'block', 
                                            fontSize: { xs: '0.65rem', md: '0.8rem' } 
                                        }}>
                                            CURATED EVENTS
                                        </Typography>
                                        <Typography variant="h3" sx={{
                                            color: '#fff',
                                            fontWeight: 100,
                                            letterSpacing: { xs: '0.02em', md: '0.05em' },
                                            fontFamily: '"Outfit", sans-serif',
                                            textTransform: 'uppercase',
                                            fontSize: { xs: '1.2rem', sm: '2.5rem', md: '3.5rem' },
                                            lineHeight: 1.2
                                        }}>
                                            The <span style={{ color: '#00ffff' }}>Manuscript</span> of Celebration
                                        </Typography>
                                        <Box sx={{ width: '40px', height: '1px', background: '#D9A756', mx: 'auto', mt: { xs: 2, md: 3 } }} />
                                    </Box>

                                    <Grid container spacing={{ xs: 2, md: 4 }}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="HOST NAME"
                                                name="name"
                                                variant="outlined"
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
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="EMAIL CONTACT"
                                                name="email"
                                                type="email"
                                                variant="outlined"
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="OCCASION TYPE"
                                                name="eventType"
                                                variant="outlined"
                                                required
                                                sx={inputStyle}
                                                value={formData.eventType}
                                                onChange={handleChange}
                                                SelectProps={{
                                                    MenuProps: {
                                                        PaperProps: {
                                                            sx: {
                                                                bgcolor: 'rgba(0, 30, 54, 0.98)',
                                                                backdropFilter: 'blur(30px)',
                                                                border: '1px solid rgba(217, 167, 86, 0.3)',
                                                                borderRadius: 0,
                                                                mt: 0.5,
                                                                '& .MuiList-root': {
                                                                    p: 0,
                                                                }
                                                            }
                                                        }
                                                    }
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <RestaurantIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >
                                                {eventTypes.map((option) => (
                                                    <MenuItem key={option} value={option} sx={{
                                                        color: '#fff',
                                                        fontFamily: '"Outfit", sans-serif',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.2em',
                                                        fontSize: '0.8rem',
                                                        py: 2,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            bgcolor: '#D9A756',
                                                            color: '#001e36',
                                                            '& .MuiTypography-root': { color: '#001e36' }
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: 'rgba(0, 255, 255, 0.1)',
                                                            '&:hover': { bgcolor: '#D9A756' }
                                                        }
                                                    }}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="EVENT LOCATION"
                                                name="location"
                                                variant="outlined"
                                                required
                                                sx={inputStyle}
                                                value={formData.location}
                                                onClick={() => setIsMapOpen(true)}
                                                placeholder="Click to select location on map"
                                                InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOnIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DatePicker
                                                label="EVENT DATE"
                                                value={date}
                                                onChange={(newValue) => setDate(newValue)}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        variant: "outlined",
                                                        required: true,
                                                        sx: inputStyle,
                                                        InputProps: {
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CalendarMonthIcon />
                                                                </InputAdornment>
                                                            ),
                                                        } as any,
                                                    },
                                                    openPickerButton: {
                                                        sx: {
                                                            color: 'rgba(0, 255, 255, 0.4)',
                                                            '&:hover': {
                                                                color: '#D9A756',
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="GUESTS COUNT"
                                                name="guests"
                                                type="number"
                                                variant="outlined"
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
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Stack spacing={-0.5} sx={{ mr: -1 }}>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => {
                                                                        const val = parseInt(formData.guests) || 0;
                                                                        setFormData({ ...formData, guests: (val + 1).toString() });
                                                                    }}
                                                                    sx={{
                                                                        color: 'rgba(0, 255, 255, 0.4)',
                                                                        padding: '2px',
                                                                        '&:hover': { color: '#00ffff', backgroundColor: 'transparent' }
                                                                    }}
                                                                >
                                                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.2rem' }} />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => {
                                                                        const val = parseInt(formData.guests) || 0;
                                                                        if (val > 0) {
                                                                            setFormData({ ...formData, guests: (val - 1).toString() });
                                                                        }
                                                                    }}
                                                                    sx={{
                                                                        color: 'rgba(0, 255, 255, 0.4)',
                                                                        padding: '2px',
                                                                        '&:hover': { color: '#D9A756', backgroundColor: 'transparent' }
                                                                    }}
                                                                >
                                                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.2rem' }} />
                                                                </IconButton>
                                                            </Stack>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="CULINARY PREFERENCES & SPECIAL REQUESTS"
                                                name="message"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                sx={inputStyle}
                                                value={formData.message}
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                                            <NoteIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                                            <Button
                                                type="submit"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'rgba(0, 255, 255, 0.4)',
                                                    color: '#00ffff',
                                                    borderRadius: 0,
                                                    px: { xs: 4, sm: 10 },
                                                    py: 2.5,
                                                    fontWeight: 300,
                                                    textTransform: 'uppercase',
                                                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                                                    letterSpacing: { xs: '0.2em', md: '0.5em' },
                                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    backgroundColor: 'transparent',
                                                    '&:hover': {
                                                        borderColor: '#D9A756',
                                                        bgcolor: '#D9A756',
                                                        color: '#001e36',
                                                        boxShadow: '0 0 40px rgba(217, 167, 86, 0.5)',
                                                    }
                                                }}
                                            >
                                                INITIATE REQUEST
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '60px 0' }}
                                >
                                    <Typography variant="h2" sx={{
                                        color: '#00ffff',
                                        mb: 3,
                                        fontWeight: 100,
                                        letterSpacing: { xs: '0.1em', sm: '0.2em' },
                                        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }
                                    }}>
                                        RECEIVED
                                    </Typography>
                                    <Typography sx={{
                                        color: '#aaccff',
                                        opacity: 0.7,
                                        fontSize: { xs: '1rem', sm: '1.2rem' },
                                        letterSpacing: '0.1em',
                                        px: 2
                                    }}>
                                        Your culinary vision has been shared with our masters.
                                    </Typography>
                                    <Box sx={{ width: '40px', height: '1px', background: '#D9A756', mx: 'auto', mt: 4 }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>

                {/* Background "Spice Dust" Particles */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    pointerEvents: 'none',
                    zIndex: -1,
                    opacity: 0.3
                }}>
                    {[...Array(20)].map((_, i) => (
                        <Box
                            key={i}
                            component={motion.div}
                            animate={{
                                y: [0, -100, 0],
                                x: [0, Math.random() * 50 - 25, 0],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            sx={{
                                position: 'absolute',
                                left: `${Math.random() * 100}%`,
                                bottom: -20,
                                width: '2px',
                                height: '2px',
                                background: Math.random() > 0.5 ? '#00ffff' : '#D9A756',
                                borderRadius: '50%'
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <style>{`
                @keyframes rotateBorder {
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            <Dialog
                open={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: '#001e36',
                        backgroundImage: 'none',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogContent sx={{ p: 0, height: { xs: '80vh', md: '600px' } }}>
                    <MapPicker
                        onClose={() => setIsMapOpen(false)}
                        onLocationSelect={(loc) => {
                            setFormData(prev => ({
                                ...prev,
                                coordinates: { lat: loc.lat, lng: loc.lng },
                                location: loc.address || `Lat: ${loc.lat.toFixed(4)}, Lng: ${loc.lng.toFixed(4)}`
                            }));
                            setIsMapOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </LocalizationProvider>
    );
};

export default CateringForm;
