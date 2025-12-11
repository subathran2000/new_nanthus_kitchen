import React, { useEffect, useState } from 'react'
import './NeumorphicClock.css'

const NeumorphicClock: React.FC = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const hours = time.getHours() % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    const hourRotation = (hours * 30) + (minutes * 0.5)
    const minuteRotation = minutes * 6
    const secondRotation = seconds * 6

    return (
        <div className="page-background">
            <div className="clock-container">
                <div className="clock-face">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <div key={`marker-${num}`} className={`marker marker-${num}`}>
                            <div className="marker-dot"></div>
                        </div>
                    ))}

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <div key={`number-${num}`} className={`number number-${num}`}>
                            <span className={`number-${num}-text`}>{num}</span>
                        </div>
                    ))}

                    <div
                        className="hand hour-hand"
                        style={{ transform: `translateX(-50%) rotate(${hourRotation}deg)` }}
                    ></div>
                    <div
                        className="hand minute-hand"
                        style={{ transform: `translateX(-50%) rotate(${minuteRotation}deg)` }}
                    ></div>
                    <div
                        className="hand second-hand"
                        style={{ transform: `translateX(-50%) rotate(${secondRotation}deg)` }}
                    ></div>
                    <div className="center-pin"></div>
                </div>
            </div>
        </div>
    )
}

export default NeumorphicClock
