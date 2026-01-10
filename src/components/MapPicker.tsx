
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
    onLocationSelect: (location: { lat: number, lng: number, address?: string }) => void;
    onClose?: () => void;
}

const LocationMarker = ({ setPosition, position }: { setPosition: (p: L.LatLng) => void, position: L.LatLng | null }) => {
    const map = useMap();

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const MapController = ({ center }: { center: [number, number] | null }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

const MapPicker = ({ onLocationSelect, onClose }: MapPickerProps) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

    const handleSearch = async () => {
        if (!searchQuery) return;
        setLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newPos = new L.LatLng(parseFloat(lat), parseFloat(lon));
                setPosition(newPos);
                setMapCenter([parseFloat(lat), parseFloat(lon)]);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (position) {
            setLoading(true);
            let address = `Lat: ${position.lat.toFixed(4)}, Lng: ${position.lng.toFixed(4)}`;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`);
                const data = await response.json();
                if (data && data.display_name) {
                    address = data.display_name;
                }
            } catch (error) {
                console.error('Reverse geocoding failed:', error);
            }
            onLocationSelect({ lat: position.lat, lng: position.lng, address });
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#001e36',
        }}>
            {/* Search Bar */}
            <Box sx={{ p: 2, display: 'flex', gap: 1, zIndex: 1001, bgcolor: 'rgba(0, 30, 54, 0.9)', backdropFilter: 'blur(10px)' }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search for a location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            color: '#fff',
                            '& fieldset': { borderColor: 'rgba(0, 255, 255, 0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(0, 255, 255, 0.4)' },
                            '&.Mui-focused fieldset': { borderColor: '#00ffff' },
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'rgba(0, 255, 255, 0.6)' }} />
                            </InputAdornment>
                        ),
                        endAdornment: loading && (
                            <InputAdornment position="end">
                                <CircularProgress size={20} sx={{ color: '#00ffff' }} />
                            </InputAdornment>
                        )
                    }}
                />
                {onClose && (
                    <IconButton onClick={onClose} sx={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>

            <Box sx={{ flex: 1, position: 'relative' }}>
                <MapContainer
                    center={[13.0827, 80.2707]}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker setPosition={setPosition} position={position} />
                    <MapController center={mapCenter} />
                </MapContainer>

                {/* Overlay instruction */}
                {!position && (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        bgcolor: 'rgba(0, 30, 54, 0.8)',
                        backdropFilter: 'blur(5px)',
                        px: 3,
                        py: 1,
                        borderRadius: '20px',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        pointerEvents: 'none'
                    }}>
                        <Typography sx={{ color: '#00ffff', fontSize: '0.9rem', textAlign: 'center' }}>
                            CLICK TO PIN EVENT LOCATION
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Confirm Button */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', zIndex: 1001, bgcolor: 'rgba(0, 30, 54, 0.9)' }}>
                <Button
                    variant="outlined"
                    disabled={!position || loading}
                    onClick={handleConfirm}
                    sx={{
                        borderColor: '#00ffff',
                        color: '#00ffff',
                        px: 4,
                        '&:hover': {
                            bgcolor: 'rgba(0, 255, 255, 0.1)',
                            borderColor: '#00ffff',
                        },
                        '&.Mui-disabled': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                >
                    {loading ? 'GEODECODING...' : 'CONFIRM LOCATION'}
                </Button>
            </Box>
        </Box>
    );
};

export default MapPicker;
