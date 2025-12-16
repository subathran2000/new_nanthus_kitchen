import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { forwardRef } from 'react'
import type { RefObject } from 'react'

// Constants for easy tuning
const TRACK_HEIGHT_PX = 300 // Height of the scrollbar track in pixels
const THUMB_HEIGHT_PX = 60  // Height of the scrollbar thumb

// The UI component that lives outside the Canvas
export const CustomScrollbarUI = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',              // Center vertically
                right: '20px',           // Gap from right edge
                transform: 'translateY(-50%)', // Adjust for centering
                width: '10px',           // Container width
                height: `${TRACK_HEIGHT_PX}px`, // Fixed small height
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                boxSizing: 'border-box',
                pointerEvents: 'none',
            }}
        >
            {/* The Track Line */}
            <div
                style={{
                    width: '2px',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '1px',
                    position: 'relative',
                }}
            >
                {/* The Thumb (Pill) */}
                <div
                    ref={ref}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)', // Only center horizontally, Y is handled by JS
                        width: '4px',
                        height: `${THUMB_HEIGHT_PX}px`,
                        background: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                        transition: 'opacity 0.3s',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                    }}
                />
            </div>
        </div>
    )
})

// The Logic component that lives inside ScrollControls
export const ScrollSync = ({ scrollbarRef }: { scrollbarRef: RefObject<HTMLDivElement | null> }) => {
    const scroll = useScroll()

    useFrame(() => {
        if (scrollbarRef.current) {
            // Calculate available travel distance
            const availableHeight = TRACK_HEIGHT_PX - THUMB_HEIGHT_PX

            // Map scroll (0 to 1) to travel distance
            const currentY = scroll.offset * availableHeight

            if (!isNaN(currentY)) {
                // Apply translation
                // X is -50% to center it on the line
                // Y is the calculated position
                scrollbarRef.current.style.transform = `translate(-50%, ${currentY}px)`
            }
        }
    })

    return null
}
