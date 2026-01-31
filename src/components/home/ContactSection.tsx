import { useState } from 'react'
import { Box, Typography, Button, Dialog, IconButton, DialogContent } from '@mui/material'
import { commonButtonStyle } from '../common/ButtonStyles'
import { motion } from 'framer-motion'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close'
import ContactForm from './ContactForm'

const ContactSection = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* Section Heading */}
            <Box textAlign="center" mb={2}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Typography variant="overline" sx={{ color: '#FF8C00', letterSpacing: '0.4em', fontSize: '0.9rem' }}>
                        HAVE QUESTIONS?
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#fff',
                            fontWeight: 100,
                            letterSpacing: '0.15em',
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            mt: 1,
                            textTransform: 'uppercase',
                            fontFamily: '"Outfit", sans-serif',
                        }}
                    >
                        CONTACT <span style={{ color: '#00ffff' }}>US</span>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.9rem', md: '1.1rem' },
                            maxWidth: '600px',
                            mx: 'auto',
                            mt: 2,
                            fontWeight: 300,
                            letterSpacing: '0.05em',
                            fontFamily: '"Outfit", sans-serif',
                        }}
                    >
                        We'd love to hear from you. Reach out for inquiries, feedback, or just to say hello.
                    </Typography>
                </motion.div>
            </Box>

            {/* Contact Details Grid */}
            <Box sx={{ mb: 6, maxWidth: '900px', mx: 'auto', px: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                    {/* Markham */}
                    <Box sx={{ textAlign: 'center' }}>
                        <LocationOnIcon sx={{ color: '#FF8C00', fontSize: '2rem', mb: 1 }} />
                        <Typography variant="h6" sx={{ color: '#FF8C00', letterSpacing: '0.1em', mb: 2, fontFamily: '"Outfit", sans-serif' }}>
                            MARKHAM
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', opacity: 0.8, mb: 0.5 }}>
                            72-30 Karachi Dr
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', opacity: 0.8, mb: 2 }}>
                            Markham ON L3S 0B6
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <PhoneIcon sx={{ color: '#FF8C00', fontSize: '1.2rem' }} />
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                289-554-5999
                            </Typography>
                        </Box>
                    </Box>

                    {/* Scarborough */}
                    <Box sx={{ textAlign: 'center' }}>
                        <LocationOnIcon sx={{ color: '#FF8C00', fontSize: '2rem', mb: 1 }} />
                        <Typography variant="h6" sx={{ color: '#FF8C00', letterSpacing: '0.1em', mb: 2, fontFamily: '"Outfit", sans-serif' }}>
                            SCARBOROUGH
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', opacity: 0.8, mb: 0.5 }}>
                            80 Nashdene Rd
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', opacity: 0.8, mb: 2 }}>
                            Scarborough ON M1V 5E4
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ color: '#FF8C00', fontSize: '1.2rem' }} />
                                <Typography variant="body1" sx={{ color: '#fff' }}>
                                    416-299-1999
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ color: '#D9A756', fontSize: '1.2rem' }} />
                                <Typography variant="body1" sx={{ color: '#fff' }}>
                                    416-388-4791
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Email - Full Width */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                            <EmailIcon sx={{ color: '#FF8C00', fontSize: '1.5rem' }} />
                            <Typography variant="body1" sx={{ color: '#fff', fontSize: '1.1rem' }}>
                                newnanthuskitchen@gmail.com
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box textAlign="center" mt={4}>
                <Button
                    variant="outlined"
                    onClick={() => setIsFormOpen(true)}
                    startIcon={<BusinessCenterIcon sx={{ fontSize: '1.2rem !important' }} />}
                    sx={commonButtonStyle}
                >
                    GET IN TOUCH
                </Button>
            </Box>

            {/* Popup Dialog */}
            <Dialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        background: 'rgba(0, 15, 27, 0.8)',
                        border: '1px solid rgba(255, 140, 0, 0.3)',
                        boxShadow: '0 0 50px rgba(255, 140, 0, 0.2)',
                        overflow: 'hidden',
                        outline: 'none',
                    }
                }}
                BackdropProps={{
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 30, 54, 0.8)',
                    }
                }}
            >
                <Box sx={{ position: 'relative', height: '100%', display: 'flex' }}>
                    <IconButton
                        onClick={() => setIsFormOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 15,
                            top: 15,
                            color: '#FF8C00',
                            bgcolor: 'rgba(255,140,0,0.1)',
                            zIndex: 100,
                            '&:hover': {
                                bgcolor: 'rgba(255,140,0,0.2)',
                                transform: 'rotate(90deg)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogContent sx={{
                        p: 0,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': { background: '#FF8C00', borderRadius: '4px' }
                    }}>
                        <ContactForm />
                    </DialogContent>
                </Box>
            </Dialog>
        </Box>
    )
}

export default ContactSection
