import { useState } from 'react'
import { Box, Typography, Button, Dialog, IconButton } from '@mui/material'
import { commonButtonStyle } from '../common/ButtonStyles'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close'
import ContactForm from "./ContactFormRefactored";


const ContactSection = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '1400px',
            mx: 'auto',
            padding: { xs: '4rem 2rem', md: '10rem 80px' },
            position: 'relative'
        }}>
            <Box sx={{
                mb: { xs: 8, md: 15 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                textAlign: { xs: 'center', md: 'left' }
            }}>
                <Typography
                    variant="overline"
                    sx={{
                        color: '#FF8C00',
                        letterSpacing: '0.8em',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        fontFamily: "'Outfit', sans-serif",
                        mb: 2,
                        display: 'block'
                    }}
                >
                    ESTABLISH CONTACT
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        color: '#fff',
                        fontSize: { xs: '2.5rem', md: '4.5rem' },
                        letterSpacing: '0.05em',
                        lineHeight: 1.1,
                    }}
                >
                    SAY <span style={{ color: '#FF8C00', fontStyle: 'italic' }}>HELLO</span>
                </Typography>
                <Box sx={{ width: '60px', height: '1px', bgcolor: 'rgba(255,140,0,0.4)', mt: 3, mx: { xs: 'auto', md: 0 } }} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 5, md: 12 },
                alignItems: { xs: 'center', md: 'flex-start' },
                width: '100%'
            }}>
                {/* Left: Locations */}
                <Box sx={{
                    flex: 1.5,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: { xs: 4, sm: 8 },
                    textAlign: { xs: 'center', md: 'left' },
                    width: '100%'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em', display: 'block', mb: 4 }}>LOC_01 / MARKHAM</Typography>
                        <Typography sx={{ color: '#fff', fontSize: '1.2rem', mb: 1, fontFamily: "'Outfit', sans-serif" }}>72-30 Karachi Dr</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>Markham ON L3S 0B6</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
                            <PhoneIcon sx={{ color: '#FF8C00', fontSize: 18 }} />
                            <Typography sx={{ color: '#fff' }}>289.554.5999</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em', display: 'block', mb: 4 }}>LOC_02 / SCARBOROUGH</Typography>
                        <Typography sx={{ color: '#fff', fontSize: '1.2rem', mb: 1, fontFamily: "'Outfit', sans-serif" }}>80 Nashdene Rd</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>Scarborough ON M1V 5E4</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
                                <PhoneIcon sx={{ color: '#FF8C00', fontSize: 18 }} />
                                <Typography sx={{ color: '#fff' }}>416.299.1999</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
                                <PhoneIcon sx={{ color: '#FF8C00', fontSize: 18 }} />
                                <Typography sx={{ color: '#fff' }}>416.388.4791</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        gridColumn: { xs: 'span 1', sm: 'span 2' },
                        pt: 4,
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        width: '100%'
                    }}>
                        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em', display: 'block', mb: 2 }}>ELECTRONIC_MAIL</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
                            <EmailIcon sx={{ color: '#FF8C00', fontSize: 18 }} />
                            <Typography sx={{ color: '#fff', fontSize: '1.1rem' }}>newnanthuskitchen@gmail.com</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Right: CTA */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                    p: { xs: 3, md: 6 },
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    textAlign: { xs: 'center', md: 'left' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    width: '100%'
                }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Initiate Project Inquiry</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                        We're always looking for new culinary collaborations and catering opportunities. Let's discuss your next milestone.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setIsFormOpen(true)}
                        sx={{
                            ...commonButtonStyle,
                            width: '100%',
                            py: 2
                        }}
                    >
                        OPEN CONTACT FORM
                    </Button>
                </Box>
            </Box>

            <Dialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '0',
                        background: 'rgba(0, 30, 54, 0.95)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 140, 0, 0.1)',
                    }
                }}
            >
                <Box sx={{ position: 'relative', p: 4 }}>
                    <IconButton
                        onClick={() => setIsFormOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 20,
                            top: 20,
                            color: '#FF8C00',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <ContactForm />
                </Box>
            </Dialog>
        </Box>
    )
}


export default ContactSection
