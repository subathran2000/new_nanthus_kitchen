import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CreativeFooter from "../Footer/Footer";
import logo from "../../assets/images/new_nanthus_kitchen_logo.png";
import TypewriterText from "../common/TypewriterText";
import OrderButton from "../common/OrderButton";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = rootRef.current;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("section.landing-section"),
    );
    const images = Array.from(container.querySelectorAll<HTMLElement>(".bg"));
    const headings = Array.from(
      container.querySelectorAll<HTMLElement>(".section-heading"),
    );
    const outerWrappers = Array.from(
      container.querySelectorAll<HTMLElement>(".outer"),
    );
    const innerWrappers = Array.from(
      container.querySelectorAll<HTMLElement>(".inner"),
    );

    // Wrap chars in spans for animation
    const splitChars = headings.map((h) => {
      const text = h.textContent || "";
      h.innerHTML = "";
      const frag = document.createDocumentFragment();
      for (const ch of text.split("")) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        frag.appendChild(span);
      }
      h.appendChild(frag);
      return Array.from(h.querySelectorAll<HTMLElement>(".char"));
    });

    // Initial state
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    gsap.set(sections, { autoAlpha: 0, zIndex: 0 });

    // First section is active by default
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
    gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });

    // Cinematic Entrance Animation
    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    entranceTl
      .fromTo(
        ".hero-title-wrapper",
        { perspective: 400 },
        { perspective: 400, duration: 0 },
      )

      // Removed GSAP animations for title elements to use Framer Motion Typewriter
      // .fromTo('.accent-label', ...)
      // .fromTo(splitChars[0], ...) (Note: splitChars[0] was the first .section-heading, which we will remove class from)
      .fromTo(
        ".title-divider",
        { width: "0%", autoAlpha: 0 },
        { width: "100%", autoAlpha: 0.8, duration: 1.5, ease: "expo.inOut" },
        1.2,
      );
    // .fromTo('.subtitle-tagline', ...)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sections-container",
        start: "top top",
        end: "+=800%", // Increased for "slow" feel
        pin: true,
        scrub: 2, // Increased for "smooth" weight
        snap: 1 / (sections.length - 1),
        anticipatePin: 1,
      },
    });

    // Build the timeline for section transitions
    sections.forEach((_, i) => {
      if (i === sections.length - 1) return;

      const next = i + 1;
      const label = `step${i}`;
      tl.add(label);

      // Animate current section OUT
      tl.to(images[i], { yPercent: -15, duration: 1 }, label).to(
        sections[i],
        { autoAlpha: 0, duration: 0.1 },
        label + "+=0.9",
      );

      // Animate next section IN
      tl.set(sections[next], { autoAlpha: 1, zIndex: 1 }, label)
        .fromTo(
          [outerWrappers[next], innerWrappers[next]],
          { yPercent: (idx: number) => (idx ? -100 : 100) },
          { yPercent: 0, duration: 1, ease: "power1.inOut" },
          label,
        )
        .fromTo(
          images[next],
          { yPercent: 15 },
          { yPercent: 0, duration: 1, ease: "power1.inOut" },
          label,
        )
        .fromTo(
          splitChars[next],
          { autoAlpha: 0, yPercent: 150 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          },
          label + "+=0.2",
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  const handleOrderClick = () => {
    // Navigate to menu or order page
    window.location.href = "/menu";
  };

  const handleDiveClick = () => {
    const nextSection = rootRef.current?.querySelector<HTMLElement>(
      ".landing-section.second",
    );
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div ref={rootRef}>
      <header className="lp-header">
        <img
          src={logo}
          alt="New Nanthu's Kitchen Logo"
          className="lp-header-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <OrderButton onClick={handleOrderClick} />
      </header>

      <div className="sections-container">
        <section className="landing-section first">
          <div className="outer">
            <div className="inner">
              <div className="bg one">
                <div className="hero-title-wrapper">
                  <div className="title-stack">
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
                  <button
                    className="dive-button"
                    onClick={handleDiveClick}
                    aria-label="Dive in"
                  >
                    DIVE IN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section second">
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <h2 className="section-heading">Animated with GSAP</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section third">
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <h2 className="section-heading">GreenSock</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section fourth">
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <h2 className="section-heading">Animation platform</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section fifth">
          <div className="outer">
            <div className="inner">
              <div className="bg">
                <h2 className="section-heading">Keep scrolling</h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="footer-container">
        <CreativeFooter />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pinyon+Script&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        :root { 
          --light: #fff; 
          --navy: #050b18; 
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
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 8vw, 12rem); 
          font-weight: 700; 
          line-height: 1; 
          text-align: center; 
          margin-right:-0.5em; 
          width: 90vw; 
          max-width: 1400px; 
          text-transform: none; 
          color: white; 
          font-style: italic;
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
        }

        .dive-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 30px rgba(0,255,255,0.12), inset 0 0 20px rgba(0,255,255,0.06);
          background: linear-gradient(90deg, rgba(0,255,255,0.04), rgba(217,167,86,0.02));
        }
        
        .char{ display: inline-block; }
        
        /* Use the same solid navy color for all slide backgrounds */
        .bg { background-color: var(--deep-blue); }
        
        h2 *{ will-change: transform }
        
        .footer-container { 
          position: relative; 
          z-index: 2; 
          background: transparent; 
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
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
    </div>
  );
};

export default LandingPage
