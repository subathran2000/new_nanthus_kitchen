import React, { useEffect, useRef, useState } from 'react';
import './ImageGallery.css';

const GALLERY_DATA = [
    {
        title: 'Night Cityscapes',
        media: [
            {
                type: 'image' as const,
                title: 'City at Night',
                content: 'https://i.postimg.cc/MTSXJLSd/city-at-night-1-1527139-639x426.jpg'
            },
            {
                type: 'video' as const,
                title: 'Urban Motion',
                content: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
                type: 'image' as const,
                title: 'Urban Glow',
                content: 'https://i.postimg.cc/FzFR7J1S/city-glow-1447263-638x458.jpg'
            },
            {
                type: 'image' as const,
                title: 'City at Night',
                content: 'https://i.postimg.cc/MTSXJLSd/city-at-night-1-1527139-639x426.jpg'
            },
            {
                type: 'video' as const,
                title: 'Urban Motion',
                content: 'https://www.w3schools.com/html/mov_bbb.mp4'
            },
            {
                type: 'image' as const,
                title: 'Urban Glow',
                content: 'https://i.postimg.cc/FzFR7J1S/city-glow-1447263-638x458.jpg'
            },
        ]
    },
    {
        title: 'Urban Lights',
        media: [
            {
                type: 'image' as const,
                title: 'Lights On',
                content: 'https://i.postimg.cc/vBtTYv8M/lights-on-1230961-640x480.jpg'
            },
            {
                type: 'image' as const,
                title: 'Night Skyline',
                content: 'https://i.postimg.cc/4xjmBdFC/night-skyline-1225750-640x480.jpg'
            },
            {
                type: 'video' as const,
                title: 'City View',
                content: 'https://www.w3schools.com/html/movie.mp4'
            },
        ]
    },
    {
        title: 'Metropolitan Views',
        media: [
            {
                type: 'image' as const,
                title: 'Metro Beauty',
                content: 'https://i.postimg.cc/MTSXJLSd/city-at-night-1-1527139-639x426.jpg'
            },
            {
                type: 'image' as const,
                title: 'Downtown',
                content: 'https://i.postimg.cc/wBJ3PpS1/city-at-night-2-1516046-640x480.jpg'
            },
            {
                type: 'image' as const,
                title: 'City Glow',
                content: 'https://i.postimg.cc/FzFR7J1S/city-glow-1447263-638x458.jpg'
            },
        ]
    },
    {
        title: 'Evening Skylines',
        media: [
            {
                type: 'image' as const,
                title: 'Lights On',
                content: 'https://i.postimg.cc/vBtTYv8M/lights-on-1230961-640x480.jpg'
            },
            {
                type: 'text' as const,
                title: 'Our Story',
                content: 'Experience the ',
            },
            {
                type: 'image' as const,
                title: 'Night Skyline',
                content: 'https://i.postimg.cc/4xjmBdFC/night-skyline-1225750-640x480.jpg'
            },
        ]
    },
];

const WRAPPER_SELECTOR = 'gallery__image-wrapper';
const CURRENT_WRAPPER = `${WRAPPER_SELECTOR}--selected`;
const TRANSITION_DURATION = 620;
const EASY_FN = 'cubic-bezier(0.65, 0, 0.35, 1)';
const DEFAULT_TRANSFORM = 'scale(1) translate3d(0, 0, 1px)';

const ImageGallery: React.FC = () => {
    return (
        <div style={{ width: '100%', maxWidth: '1400px' }}>
            {GALLERY_DATA.map((section, sectionIndex) => (
                <GallerySection
                    key={sectionIndex}
                    title={section.title}
                    media={section.media}
                    sectionIndex={sectionIndex}
                />
            ))}
        </div>
    );
};

interface MediaItem {
    type: 'image' | 'video' | 'text';
    title: string;
    content: string; // URL for images/videos, text content for text cards
    subtitle?: string; // Optional subtitle
}

interface GallerySectionProps {
    title: string;
    media: MediaItem[];
    sectionIndex: number;
}

const GallerySection: React.FC<GallerySectionProps> = ({ title, media, sectionIndex }) => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [_selectedImageId, setSelectedImageId] = useState<number>(0);
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);
    const [mediaErrors, setMediaErrors] = useState<Set<number>>(new Set());
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const [mediaData] = useState(
        media.map((item, id) => ({
            id,
            ...item,
            alt: `${title} - ${item.type} ${id + 1}`,
        })),
    );

    const handleMediaError = (id: number) => {
        setMediaErrors((prev) => new Set(prev).add(id));
    };

    useEffect(() => {
        // Initial selection
        selectImage(0);

        // Auto-select last image after delay (staggered by section)
        const timer = setTimeout(
            () => {
                selectImage(media.length - 1);
            },
            1000 + sectionIndex * 500,
        );

        return () => clearTimeout(timer);
    }, [media.length, sectionIndex]);

    const handlePlayVideo = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRefs.current[id];
        if (video) {
            if (playingVideo === id) {
                video.pause();
                setPlayingVideo(null);
            } else {
                // Pause all other videos
                videoRefs.current.forEach((v) => v?.pause());
                video.play();
                setPlayingVideo(id);
                // Expand this card to big view when playing from small
                selectImage(id);
            }
        }
    };

    const selectImage = (id: number) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setSelectedImageId(id);

        if (!galleryRef.current) return;

        const wrapperElements = Array.from(
            galleryRef.current.childNodes,
        ) as HTMLElement[];
        const currentElement = wrapperElements[id];

        if (!currentElement) return;

        // Get the elements rects before class changes
        const prevRects = wrapperElements.map((child) =>
            child.getBoundingClientRect(),
        );

        // Remove "selected" class, transitions and transforms from every element
        wrapperElements.forEach((child) => {
            child.style.transition = "none";
            child.style.transform = DEFAULT_TRANSFORM;
            child.classList.remove(CURRENT_WRAPPER);
        });

        // Set the current element as selected
        currentElement.classList.add(CURRENT_WRAPPER);

        // Apply FLIP animation technique
        wrapperElements.forEach((child, i) => {
            const prevRect = prevRects[i];
            const newRect = child.getBoundingClientRect();

            // Calculate the difference between the element states
            const scale = prevRect.width / newRect.width;
            const x = ((prevRect.x - newRect.x) * 1) / scale;
            const y = ((prevRect.y - newRect.y) * 1) / scale;

            // Apply the calculated transformation
            child.style.transform = `
        scale(${scale})
        translate3d(${x}px, ${y}px, 1px)
      `;

            // Reset the transformation on next tick
            setTimeout(() => {
                child.style.transition = `all ${TRANSITION_DURATION}ms ${EASY_FN}`;
                child.style.transform = DEFAULT_TRANSFORM;
            }, 0);
        });
    };

    return (
        <div style={{ marginBottom: '6rem' }}>
            {/* Section Title */}
            <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: '500',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: 'rgba(255, 252, 245, 0.95)',
                marginBottom: '2.5rem',
                letterSpacing: '0.02em',
                textAlign: 'center',
            }}>
                {title}
            </h2>

            {/* Gallery Grid */}
            <div className="gallery" ref={galleryRef}>
                {mediaData.map((item) => (
                    <div
                        key={item.id}
                        className="gallery__image-wrapper"
                        data-media-type={item.type}
                        onClick={() => selectImage(item.id)}
                    >
                        <div className="media-badge">
                            {item.type === 'image'
                                ? 'Photo'
                                : item.type === 'video'
                                    ? 'Video'
                                    : 'Story'}
                        </div>
                        {mediaErrors.has(item.id) && (item.type === 'image' || item.type === 'video') ? (
                            <div className="text-content-card">
                                <div className="text-content-inner">
                                    <h3 className="text-card-title">{item.title}</h3>
                                    <p className="text-card-content">{item.content}</p>
                                    {item.subtitle && (
                                        <span className="text-card-subtitle">{item.subtitle}</span>
                                    )}
                                </div>
                            </div>
                        ) : item.type === 'video' ? (
                            <>
                                <video
                                    ref={(el) => { videoRefs.current[item.id] = el; }}
                                    className="gallery__image"
                                    src={item.content}
                                    loop
                                    muted
                                    playsInline
                                    onEnded={() => setPlayingVideo(null)}
                                    onError={() => handleMediaError(item.id)}
                                />
                                <div
                                    className={`video-play-overlay ${playingVideo === item.id ? 'playing' : ''}`}
                                    onClick={(e) => handlePlayVideo(item.id, e)}
                                    role="button"
                                    aria-label={playingVideo === item.id ? 'Stop video' : 'Play video'}
                                >
                                    {playingVideo !== item.id && (
                                        <div className="play-button">
                                            <span className="play-circle" aria-hidden="true">
                                                <svg
                                                    className="play-icon"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </span>
                                            <span className="play-label">Play</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : item.type === 'text' ? (
                            <div className="text-content-card">
                                <div className="text-content-inner">
                                    <h3 className="text-card-title">{item.title}</h3>
                                    <p className="text-card-content">{item.content}</p>
                                    {item.subtitle && (
                                        <span className="text-card-subtitle">{item.subtitle}</span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <img
                                className="gallery__image"
                                src={item.content}
                                alt={item.alt}
                                onError={() => handleMediaError(item.id)}
                            />
                        )}
                        {item.title && item.type !== 'text' && (
                            <div className="media-text-overlay">
                                <span className="media-title">{item.title}</span>
                                <span className="media-meta">
                                    {item.type === 'video' ? 'Tap to play' : 'Tap to view'}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
