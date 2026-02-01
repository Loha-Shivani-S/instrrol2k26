import { motion, useScroll, useTransform } from "framer-motion";

import { Calendar, ArrowDown, Cpu, Gauge, Factory, Cog, MapPin, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

const HeroSection = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2026-02-18T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEventStarted(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isEventStarted) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF4500'] // Gold and orange theme
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF4500']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isEventStarted]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">

      {/* Background Elements */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-circuit)" }} />

      {/* Floating Technical Icons */}


      <div className="container mx-auto px-6 text-center relative z-10 pt-20">
        {/* College & Department Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <p
            className="text-gradient-gold font-display text-xl md:text-3xl font-bold tracking-wider uppercase mb-2 block"
          >
            Kongu Engineering College
          </p>
          <p className="text-muted-foreground font-display text-sm md:text-lg mt-2 tracking-wide font-medium">
            Department of Electronics and Instrumentation Engineering
          </p>
        </motion.div>

        {/* ISoI Chapter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-display tracking-wider">
            ISoI STUDENT'S CHAPTER
          </span>
        </motion.div>

        {/* Proudly Presents */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-decorative text-lg md:text-xl text-muted-foreground mb-4"
        >
          Proudly presents
        </motion.p>

        {/* Main Title - INSTRROL 2K26 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wider"
        >
          <span className="text-gradient-gold text-glow">INSTRROL 2K26</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-decorative text-lg md:text-xl text-foreground/80 mb-2"
        >
          an intra department symposium
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-primary font-display text-2xl md:text-3xl font-bold tracking-wide">
            <Calendar size={24} className="text-accent" />
            18 FEB 2026
          </span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4 md:gap-6 mb-10"
        >
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center p-3 md:p-4 rounded-lg bg-card/50 border min-w-[60px] md:min-w-[80px] transition-all duration-500 ${isEventStarted
                ? "border-primary bg-primary/20 shadow-[0_0_30px_rgba(255,215,0,0.6)] scale-110"
                : "border-primary/20"
                }`}
            >
              <span className={`font-display text-2xl md:text-4xl font-bold ${isEventStarted ? "text-white drop-shadow-lg" : "text-primary"}`}>
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground font-body">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Register Call to Action */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-accent font-decorative italic text-lg mb-6"
        >
          Register Expeditiously!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <motion.button
            className="btn-hero-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("#events")}
          >
            Register Now
          </motion.button>
          <motion.button
            className="btn-hero-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("#events")}
          >
            View Events
          </motion.button>
          <Link to="/smart-factory">
            <motion.button
              className="btn-hero-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Factory size={18} />
              Smart Factory Environment
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
        >
          <div className="flex items-center gap-2 text-foreground/70">
            <MapPin size={18} className="text-primary" />
            <span className="text-sm font-body">C K Prahalad Seminar Hall, MBA Block</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Trophy size={18} className="text-accent" />
            <span className="text-sm font-body">Win Exciting Prizes</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer text-primary/60 hover:text-primary transition-colors"
            onClick={() => handleNavClick("#timeline")}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
