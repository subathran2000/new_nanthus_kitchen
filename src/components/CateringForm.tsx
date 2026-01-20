import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    InputAdornment,
    Dialog,
    DialogContent,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import NoteIcon from '@mui/icons-material/Note';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import MapPicker from './MapPicker';

const eventTypes = [
    'Wedding Gala',
    'Corporate Dinner',
    'Private Celebration',
    'Cultural Event',
    'Other',
];

const CateringForm = ({ isPopup = false }: { isPopup?: boolean }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventType: '',
        location: '',
        coordinates: null as { lat: number; lng: number } | null,
        guests: '',
        message: '',
    });

    const [date, setDate] = useState<Dayjs | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);

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
            height: isPopup ? '40px' : '54px', // Reduced height for popup
            borderRadius: '14px',
            background:
                'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.35s ease',
            fontSize: isPopup ? '0.85rem' : '0.95rem',
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
                padding: isPopup ? '8px 14px' : '14px 16px', // Reduced padding
                color: '#fff',
            },
        },

        '& .MuiInputLabel-root': {
            color: 'rgba(200,220,255,0.45)',
            letterSpacing: '0.22em',
            fontSize: isPopup ? '0.65rem' : '0.7rem',
            transform: isPopup ? 'translate(14px, 10px) scale(1)' : 'translate(14px, 16px) scale(1)',
            '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)',
            },
            '&.Mui-focused': {
                color: '#00ffff',
            },
        },

        '& .MuiInputAdornment-root svg': {
            fontSize: isPopup ? '1rem' : '1.15rem',
            color: 'rgba(0,255,255,0.45)',
        },

        '& .Mui-focused .MuiInputAdornment-root svg': {
            color: '#00ffff',
        },
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ maxWidth: 920, mx: 'auto', mt: isPopup ? 0 : 14, px: 2 }}>
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
                            p: isPopup ? 3 : { xs: 4, md: 7 }, // Reduced padding in popup
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
                                    <Box textAlign="center" mb={isPopup ? 3 : 7}>
                                        {!isPopup && (
                                            <Typography
                                                variant="overline"
                                                sx={{
                                                    color: '#D9A756',
                                                    letterSpacing: '0.55em',
                                                    fontSize: '0.7rem',
                                                }}
                                            >
                                                CURATED EVENTS
                                            </Typography>
                                        )}

                                        <Typography
                                            sx={{
                                                mt: isPopup ? 0 : 2,
                                                color: '#fff',
                                                fontWeight: 200,
                                                letterSpacing: '0.08em',
                                                fontSize: isPopup ? { xs: '1.5rem', md: '2rem' } : { xs: '1.8rem', md: '3.2rem' },
                                                textTransform: 'uppercase',
                                                mb: isPopup ? 1 : 0
                                            }}
                                        >
                                            {isPopup ? (
                                                <>
                                                    <span style={{ color: '#00ffff' }}>Manuscript</span> of Celebration
                                                </>
                                            ) : (
                                                <>
                                                    The{' '}
                                                    <span style={{ color: '#00ffff' }}>Manuscript</span> of
                                                    Celebration
                                                </>
                                            )}
                                        </Typography>
                                    </Box>

                                    <Grid container spacing={isPopup ? 1.5 : 3}>
                                        <Grid xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="HOST NAME"
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
                                                label="EMAIL CONTACT"
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

                                        {/* Compact Row for Popup: Occasion, Date, Guests */}
                                        <Grid xs={12} md={isPopup ? 4 : 12}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="OCCASION TYPE"
                                                name="eventType"
                                                sx={{
                                                    ...inputStyle,
                                                    width: '260px',
                                                }}
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

                                                            },
                                                        },
                                                    },
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
                                                    <MenuItem
                                                        key={option}
                                                        value={option}
                                                        sx={{
                                                            color: '#fff',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.2em',
                                                            fontSize: '0.8rem',
                                                            py: 2,
                                                            '&:hover': {
                                                                bgcolor: '#D9A756',
                                                                color: '#001e36',
                                                            },
                                                            '&.Mui-selected': {
                                                                bgcolor: 'rgba(0,255,255,0.1)',
                                                                '&:hover': { bgcolor: '#D9A756' },
                                                            },
                                                        }}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid xs={12} md={isPopup ? 4 : 6}>
                                            <DatePicker
                                                label="EVENT DATE"
                                                value={date}
                                                onChange={setDate}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        sx: inputStyle,
                                                        InputProps: {
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CalendarMonthIcon />
                                                                </InputAdornment>
                                                            ),
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        <Grid xs={12} md={isPopup ? 4 : 6}>
                                            <TextField
                                                fullWidth
                                                label="GUEST COUNT"
                                                name="guests"
                                                type="number"
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
                                        </Grid>

                                        <Grid xs={12}>
                                            <TextField
                                                fullWidth
                                                label="EVENT LOCATION"
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


                                        <Grid xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={isPopup ? 2 : 4}
                                                label="CULINARY PREFERENCES & NOTES"
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

                                        <Grid xs={12} textAlign="center" mt={isPopup ? 3 : 5}>
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
                                                INITIATE REQUEST
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
                                        RECEIVED
                                    </Typography>
                                    <Typography sx={{ color: '#aaccff', mt: 2 }}>
                                        Your culinary vision has been delivered.
                                    </Typography>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Box>
                </motion.div>
            </Box>

            <Dialog
                open={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent sx={{ p: 0, height: '600px' }}>
                    <MapPicker
                        onClose={() => setIsMapOpen(false)}
                        onLocationSelect={(loc) => {
                            setFormData((prev) => ({
                                ...prev,
                                location: loc.address,
                                coordinates: { lat: loc.lat, lng: loc.lng },
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
