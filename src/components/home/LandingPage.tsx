import React, { useEffect, useRef, useState } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CreativeFooter from '../Footer/Footer'
import logo from "../../assets/images/new_nanthus_kitchen_logo.png"
import restaurantBg from "../../assets/images/restaurent.jpg"
import TypewriterText from '../common/TypewriterText'
import OrderButton from '../common/OrderButton'
import bg2 from "../../assets/images/bg2.jpg"
import Antigravity from '../common/Antigravity'
import DynamicTypewriter from '../common/DynamicTypewriter'
import { motion, useTransform, useScroll, useMotionValue, useSpring } from 'framer-motion'
import LocationSelector from '../common/LocationSelector'

const RedirectionSection: React.FC = () => {
  const navigate = () => {
    window.location.href = '/menu-new'
  }

  // Mouse tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Parallax effect
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const ySphere = useTransform(scrollYProgress, [0, 1], [0, 150])
  const yImage = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div className="concept-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} ref={containerRef}>
      <div className="concept-visual-stack">
        <motion.div className="concept-bg-sphere" style={{ y: ySphere }} />
        <div className="concept-content-grid">
          <div className="concept-image-column">
            <motion.div
              className="concept-featured-frame"
              style={{ y: yImage }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <div
                className="concept-main-image"
                style={{ backgroundImage: `url(${restaurantBg})` }}
              />
              <div className="concept-image-overlay" />
              <div className="concept-frame-border" />
            </motion.div>
          </div>

          <div className="concept-text-column">
            <motion.div
              className="concept-glass-card"
              style={{ rotateX, rotateY, perspective: 1000 }}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="concept-card-noise" />
              <div className="concept-label">CONCEPT</div>
              <h2 className="concept-title">
                DESIGN <span className="amp">&</span> TASTE
              </h2>
              <div className="concept-divider" />
              <p className="concept-description">
                Experience the perfect fusion of culinary artistry and modern
                design. Our menu is a curated collection of flavors, textures,
                and visual delights.
              </p>
              <div className="concept-btn-wrapper">
                <button className="concept-btn" onClick={navigate}>
                  <span>EXPLORE MENU</span>
                  <span className="arrow">→</span>
                  <div className="btn-glow-pulse" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LandingPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [locationSelectorOpen, setLocationSelectorOpen] = useState(false)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const revealRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (revealRef.current) {
        const { clientX, clientY } = e;
        revealRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        revealRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    gsap.registerPlugin(ScrollTrigger)

    const container = rootRef.current
    const sections = Array.from(container.querySelectorAll<HTMLElement>('section.landing-section'))
    const images = Array.from(container.querySelectorAll<HTMLElement>('.bg'))
    const headings = Array.from(container.querySelectorAll<HTMLElement>('.section-heading'))
    const outerWrappers = Array.from(container.querySelectorAll<HTMLElement>('.outer'))
    const innerWrappers = Array.from(container.querySelectorAll<HTMLElement>('.inner'))

    // Wrap chars in spans for animation
    const splitChars = headings.map(h => {
      const text = h.textContent || ''
      h.innerHTML = ''
      const frag = document.createDocumentFragment()
      for (const ch of text.split('')) {
        const span = document.createElement('span')
        span.className = 'char'
        span.textContent = ch
        frag.appendChild(span)
      }
      h.appendChild(frag)
      return Array.from(h.querySelectorAll<HTMLElement>('.char'))
    })

    // Initial state
    gsap.set(outerWrappers, { yPercent: 100 })
    gsap.set(innerWrappers, { yPercent: -100 })
    gsap.set(sections, { autoAlpha: 0, zIndex: 0 })

    // First section is active by default
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 })
    gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 })

    // Cinematic Entrance Animation
    const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    entranceTl
      .fromTo('.hero-title-wrapper', { perspective: 400 }, { perspective: 400, duration: 0 })

      // Removed GSAP animations for title elements to use Framer Motion Typewriter
      // .fromTo('.accent-label', ...)
      // .fromTo(splitChars[0], ...) (Note: splitChars[0] was the first .section-heading, which we will remove class from)
      .fromTo('.title-divider',
        { width: '0%', autoAlpha: 0 },
        { width: '100%', autoAlpha: 0.8, duration: 1.5, ease: 'expo.inOut' },
        1.2
      )
    // .fromTo('.subtitle-tagline', ...)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sections-container",
        start: "top top",
        end: "+=400%", // Reduced from 800% for faster progression
        pin: true,
        scrub: 0.5, // Reduced from 2 for more immediate response
        snap: 1 / (sections.length - 1),
        anticipatePin: 1,
      }
    })

    // Build the timeline for section transitions
    sections.forEach((_, i) => {
      if (i === sections.length - 1) return

      const next = i + 1
      const label = `step${i}`
      tl.add(label)

      // Animate current section OUT
      tl.to(images[i], { yPercent: -15, duration: 0.5 }, label)
        .to(sections[i], { autoAlpha: 0, duration: 0.1 }, label + "+=0.4")

      // Animate next section IN
      tl.set(sections[next], { autoAlpha: 1, zIndex: 1 }, label)
        .fromTo([outerWrappers[next], innerWrappers[next]],
          { yPercent: (idx: number) => (idx ? -100 : 100) },
          { yPercent: 0, duration: 0.5, ease: "power1.inOut" }, label)
        .fromTo(images[next], { yPercent: 15 }, { yPercent: 0, duration: 0.5, ease: "power1.inOut" }, label)
        .fromTo(splitChars[next],
          { autoAlpha: 0, yPercent: 150 },
          { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: 'power2', stagger: { each: 0.01, from: 'random' } }, label + "+=0.1")
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(st => st.kill())
      gsap.killTweensOf('*')
    }
  }, [])

  const handleOrderClick = () => {
    // Open location selector modal instead of navigating directly
    setLocationSelectorOpen(true);
  };

  const handleDiveClick = () => {
    const nextSection = rootRef.current?.querySelector<HTMLElement>('.landing-section.second');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div ref={rootRef}>
      <div className="antigravity-bg" ref={revealRef}>
        <div
          className="reveal-layer"
          style={{ backgroundImage: `url(${restaurantBg})` }}
        ></div>
        <div className="reveal-glow"></div>
        <Antigravity
          count={isMobile ? 150 : isTablet ? 250 : 400}
          color="#00ffff"
          particleSize={1.5}
          magnetRadius={isMobile ? 6 : isTablet ? 10 : 15}
          ringRadius={isMobile ? 5 : isTablet ? 8 : 12}
          autoAnimate={true}
        />
      </div>
      <header className="lp-header">
        <img
          src={logo}
          alt="New Nanthu's Kitchen Logo"
          style={{ maxHeight: '7rem', objectFit: 'contain', cursor: 'pointer', marginTop: '5rem' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        <OrderButton onClick={handleOrderClick} />
      </header>

      <div className="sections-container">
        <section className="landing-section first">
          <div className="outer">
            <div className="inner">
              <div className="bg one">
                <div className="hero-title-wrapper">
                  <div className="title-stack" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <TypewriterText
                      text="New"
                      as="span"
                      className="accent-label"
                      delay={0.5}
                      stagger={0.1}
                    />
                    <TypewriterText
                      text="NANTHU'S"
                      as="h2"
                      className="main-title"
                      // Removed section-heading class to avoid GSAP conflict
                      delay={1.5}
                      stagger={0.1}
                    />
                  </div>
                  <div className="title-divider"></div>
                  <TypewriterText
                    text="THE ART OF KITCHEN"
                    as="p"
                    className="subtitle-tagline"
                    delay={2.5}
                    stagger={0.05}
                  />
                  <button className="dive-button" onClick={handleDiveClick} aria-label="Dive in">DIVE IN</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section second">
          <div className="outer">
            <div className="inner">
              <div className="bg story-split-bg">
                <div className="story-split-container">
                  <div className="story-visual-column">
                    <div className="story-image-frame">
                      <div
                        className="story-featured-image"
                        style={{ backgroundImage: `url(${bg2})` }}
                      ></div>
                      <div className="story-image-overlay"></div>
                      <div className="story-accent-glow"></div>
                    </div>
                  </div>
                  <div className="story-text-column">
                    <div className="story-content-inner">
                      <h2 className="story-mini-title">OUR LEGACY</h2>
                      <div className="story-headline-wrapper">
                        <span className="story-prefix">Excellence in</span>
                        <DynamicTypewriter
                          phrases={[
                            "Jaffna Cuisine",
                            "Catering Services",
                            "Seafood Artistry",
                            "Tamil Traditions",
                            "Fusion Gastronomy"
                          ]}
                          className="story-dynamic-text"
                          typingSpeed={80}
                          pauseTime={2500}
                        />
                      </div>
                      <p className="story-narrative">
                        From the heart of Sri Lanka to your neighborhood, Nanthu's Kitchen
                        is a celebration of heritage. We don't just cook; we craft memories
                        using time-honored recipes and the freshest ingredients.
                      </p>
                      <div className="story-cta-wrapper">
                        <button
                          className="premium-btn"
                          onClick={() => window.location.href = '/about'}
                        >
                          EXPLORE OUR JOURNEY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section third">
          <div className="outer">
            <div className="inner">
              <div className="bg concept-section-bg">
                <RedirectionSection />
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section fourth">
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <h2 className="section-heading">The Experience</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section fifth">
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <h2 className="section-heading">Explore Our Menu</h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="footer-container">
        <CreativeFooter />
      </div>

      {/* Location Selector Modal */}
      <LocationSelector
        open={locationSelectorOpen}
        onClose={() => setLocationSelectorOpen(false)}
        onSelectLocation={(locationName) => {
          console.log(`Order placed from ${locationName}`);
          setLocationSelectorOpen(false);
          // Navigate to menu after location selection
          window.location.href = '/menu-new';
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pinyon+Script&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        :root { 
          --light: #fff; 
          --navy: #001e36; 
          --gold: #D9A756;
          --cyan: #00ffff;
          --deep-blue: #001e36;
        }

        *{ box-sizing: border-box; user-select: none }

        body, html, #root { 
          margin: 0; 
          height: auto !important;
          min-height: 100vh;
          overflow-x: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .lp-header{ 
          position: fixed; 
          display:flex; 
          align-items:center; 
          justify-content:space-between; 
          padding:0 5%; 
          width:100%; 
          z-index:1000; 
          height:7rem; 
          font-size:clamp(0.6rem, 1.5vw, 0.9rem); 
          letter-spacing:0.4em; 
          color: var(--light);
          text-transform: uppercase;
        }

        .lp-header img {
          filter: drop-shadow(0 0 10px rgba(217, 167, 86, 0.2));
          transition: transform 0.3s ease;
        }

        .lp-header img:hover {
          transform: scale(1.05);
        }
        
        .sections-container { 
          position: relative; 
          width: 100%; 
          height: 100vh; 
          z-index: 1; 
        }
        
        section.landing-section{ 
          height: 100vh; 
          width: 100%; 
          top: 0; 
          left: 0; 
          position: absolute; 
          visibility: hidden; 
          overflow: hidden; 
        }
        
        .outer, .inner{ width: 100%; height: 100%; overflow: hidden; }
        
        .bg{ 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: absolute; 
          height: 100%; 
          width: 100%; 
          top: 0; 
          background-size: cover; 
          background-position: center; 
        }
        
        .bg h2{ 
          z-index: 999; 
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 8vw, 12rem); 
          font-weight: 900; 
          line-height: 1; 
          text-align: center; 
          margin-right:-0.5em; 
          width: 90vw; 
          max-width: 1400px; 
          text-transform: uppercase; 
          color: white; 
          font-style: normal;
        }

        .section-heading-mini {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          color: var(--gold);
          font-style: normal;
          font-weight: 800;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        /* Concept Redesign Styles */
        .concept-section-bg {
          background-color: var(--navy);
          overflow: hidden !important;
        }

        .concept-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .concept-visual-stack {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .concept-bg-sphere {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 1;
          filter: blur(40px);
        }

        .concept-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          width: 100%;
          height: 100%;
          z-index: 2;
          gap: 0;
          align-items: center;
        }

        .concept-image-column {
          position: relative;
          height: 70%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .concept-featured-frame {
          width: 90%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          position: relative;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .concept-main-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: brightness(0.8) contrast(1.1);
        }

        .concept-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(0,30,54,0.4), transparent);
        }

        .concept-text-column {
          position: relative;
          display: flex;
          align-items: center;
          margin-left: -15%;
          z-index: 10;
        }

        .concept-glass-card {
          background: linear-gradient(135deg, rgba(10, 15, 20, 0.9), rgba(15, 20, 30, 0.85));
          backdrop-filter: blur(35px);
          -webkit-backdrop-filter: blur(35px);
          padding: 4rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 50px 100px rgba(0,0,0,0.6),
            inset 0 0 20px rgba(255,255,255,0.02);
          width: 100%;
          max-width: 550px;
          text-align: left;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .concept-card-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
          mix-blend-mode: soft-light;
        }

        .concept-label {
          color: var(--gold);
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.6em;
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          opacity: 0.8;
          transform: translateZ(20px);
        }

        .concept-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 900 !important;
          font-size: clamp(2.5rem, 4vw, 5rem) !important;
          line-height: 1.05 !important;
          color: white !important;
          margin: 0 0 2.5rem 0 !important;
          letter-spacing: -0.01em !important;
          transform: translateZ(40px);
        }

        .concept-title .amp {
          color: var(--cyan);
          font-style: italic;
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          margin: 0 0.1em;
          text-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
        }

        .concept-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin-bottom: 3rem;
          transform: translateZ(10px);
        }

        .concept-description {
          font-size: 1.15rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4rem;
          font-weight: 300;
          transform: translateZ(30px);
        }

        .concept-btn-wrapper {
          transform: translateZ(50px);
        }

        .concept-btn {
          background: rgba(0, 255, 255, 0.02);
          border: 1px solid rgba(0, 255, 255, 0.4);
          color: var(--cyan);
          padding: 1.4rem 4rem;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 2rem;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          position: relative;
          overflow: hidden;
        }

        .concept-btn:hover {
          background: var(--cyan);
          color: var(--navy);
          border-color: var(--cyan);
          box-shadow: 0 0 60px rgba(0, 255, 255, 0.4);
          transform: translateX(10px);
        }

        .concept-btn .arrow {
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .concept-btn:hover .arrow {
          transform: translateX(8px);
        }

        .concept-frame-border {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(0, 255, 255, 0.1);
          pointer-events: none;
          z-index: 5;
        }

        .btn-glow-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .concept-btn:hover .btn-glow-pulse {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .concept-content-grid {
            grid-template-columns: 1fr;
            height: auto;
            gap: 4rem;
          }
          .concept-image-column {
            height: 450px;
            justify-content: center;
          }
          .concept-featured-frame {
            width: 100%;
          }
          .concept-text-column {
            margin-left: 0;
            margin-top: -5rem;
            justify-content: center;
          }
          .concept-glass-card {
            padding: 4rem 2.5rem;
            max-width: 100%;
          }
        }

        /* Premium Story UI Styles */
        .story-split-bg {
          background-color: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-split-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 90%;
          max-width: 1400px;
          height: 80vh;
          gap: 4rem;
          align-items: center;
        }

        .story-visual-column {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-image-frame {
          position: relative;
          width: 100%;
          height: 90%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .story-featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.9) contrast(1.1);
          transition: transform 0.8s ease;
        }

        .story-image-frame:hover .story-featured-image {
          transform: scale(1.05);
        }

        .story-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 30, 54, 0.4) 0%, transparent 100%);
        }

        .story-accent-glow {
          position: absolute;
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%);
          z-index: -1;
          top: -10%;
          left: -10%;
        }

        .story-text-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .story-mini-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 900 !important;
          font-size: clamp(1.2rem, 3vw, 2rem);
          letter-spacing: 0.1em !important;
          color: var(--gold);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          text-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }

        .story-headline-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }

        .story-prefix {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: white;
          font-style: normal;
          font-weight: 300;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .story-dynamic-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 900;
          color: var(--cyan);
          line-height: 1;
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          margin-top: 0.5rem;
        }

        .story-narrative {
          font-size: clamp(1rem, 1.2vw, 1.25rem);
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          font-weight: 300;
          max-width: 550px;
        }

        .premium-btn {
          background: transparent;
          border: 2px solid var(--gold);
          color: var(--gold);
          padding: 1rem 2.5rem;
          font-size: 0.9rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          font-weight: 700;
        }

        .premium-btn:hover {
          background: var(--gold);
          color: var(--navy);
          box-shadow: 0 0 30px rgba(217,167,86,0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .story-split-container {
            grid-template-columns: 1fr;
            height: auto;
            gap: 3rem;
            padding: 4rem 0;
            text-align: center;
          }

          .story-text-column {
            align-items: center;
            text-align: center;
          }

          .story-image-frame {
            height: 400px;
          }

          .story-narrative {
            margin-left: auto;
            margin-right: auto;
          }
        }

        .first .bg h2 {
          background: none;
          -webkit-background-clip: initial;
          -webkit-text-fill-color: initial;
          filter: none;
        }

        .hero-title-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          width: 90%;
          max-width: 1200px;
        }


        .accent-label {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-style: italic;
          color: #FFD700;
          font-size: clamp(1.8rem, 5vw, 5rem);
          /* Position removed for inline layout */
          z-index: 11;
          pointer-events: none;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3);
          white-space: nowrap;
          margin-left: 10rem;
        }


        .main-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 900 !important;
          font-size: clamp(2.5rem, 11vw, 15rem) !important;
          letter-spacing: 0.1em !important;
          color: white !important;
          margin: 0 !important;
          font-style: normal !important;
          text-shadow: 0 10px 40px rgba(0,0,0,0.6);
          text-align: center;
          line-height: 1.1;
        }

        .title-divider {
          width: 100%;
          max-width: 800px;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 20%, var(--cyan) 50%, var(--gold) 80%, transparent 100%);
          margin: 1.5rem 0;
          box-shadow: 0 0 15px var(--cyan);
          opacity: 0.8;
        }

        .subtitle-tagline {
          font-family: 'Inter', sans-serif;
          color: var(--gold);
          font-size: clamp(0.7rem, 2vw, 1.5rem);
          letter-spacing: 0.8em;
          margin-right: -0.8em; /* Offset for last char spacing */
          font-weight: 400;
          text-transform: uppercase;
          opacity: 0.9;
          text-align: center;
        }
        
        .dive-button {
          margin-top: 1.25rem;
          background: transparent;
          border: 2px solid rgba(0, 255, 255, 0.6);
          color: var(--cyan);
          padding: 0.75rem 2.25rem;
          font-size: clamp(0.85rem, 1.6vw, 1.2rem);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0,255,255,0.06), inset 0 0 10px rgba(0,255,255,0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .dive-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,255,0.2), transparent);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .dive-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .dive-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 30px rgba(0,255,255,0.12), inset 0 0 20px rgba(0,255,255,0.06);
          background: linear-gradient(90deg, rgba(0,255,255,0.04), rgba(217,167,86,0.02));
        }
        
        .char{ display: inline-block; }
        
        /* Use the same solid navy color for all slide backgrounds */
        .bg { background-color: transparent; }
        
        .antigravity-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          background: var(--navy);
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        .reveal-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          mask-image: radial-gradient(
            circle 180px at var(--mouse-x) var(--mouse-y),
            black 0%,
            black 30%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            circle 180px at var(--mouse-x) var(--mouse-y),
            black 0%,
            black 30%,
            transparent 100%
          );
          opacity: 0.7;
          transition: mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out;
          filter: brightness(1.1) contrast(1.1);
        }

        .reveal-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle 220px at var(--mouse-x) var(--mouse-y),
            rgba(0, 255, 255, 0.12) 0%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 1;
        }
        
        h2 *{ will-change: transform }
        
        .footer-container { 
          position: relative; 
          z-index: 2; 
          background: transparent; 
        }

        /* Noise Overlay for Premium Texture */
        .sections-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          mix-blend-mode: overlay;
        }

        .bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 30, 54, 0.2) 100%);
          pointer-events: none;
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .reveal-layer, .reveal-glow {
            display: none !important;
          }

          .lp-header {
            height: 5em;
            padding: 0 1.5rem;
          }
          
          .accent-label {
            top: -1.2em;
            left: 0;
            font-size: clamp(1.8rem, 8vw, 3rem);
            margin-top: 1rem;
            margin-right: 1rem;
            max-height: 5rem;
            margin-left: 0;
          }

          .title-divider {
            margin: 1rem 0;
            width: 80%;
          }

          .subtitle-tagline {
            letter-spacing: 0.4em;
            margin-right: -0.4em;
          }
        }

        /* Portrait Mobile Fixes */
        @media (max-width: 480px) {
          .hero-title-wrapper {
            width: 95%;
          }

          .accent-label {
            left: 0.5rem;
          }

          .main-title {
            letter-spacing: 0.05em !important;
          }
        }
      `}</style>
    </div >
  )
}

export default LandingPage
