import { motion } from "framer-motion";
import instrrolBanner from "@/assets/instrrol-banner.jpg";

const InstrrolBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full mx-auto my-24 overflow-visible"
    >
      {/* Main banner container */}
      <div className="relative w-full">
        {/* Background glow effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 100% at 50% 50%, hsl(38 92% 50% / 0.15), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Banner image with gradients */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <img
            src={instrrolBanner}
            alt="INSTRROL 2K26 Banner"
            className="w-full h-full object-cover"
          />

          {/* Multi-layer gradient overlays for seamless blending */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, 
                  hsl(215 35% 12%) 0%,
                  hsl(215 35% 12% / 0.95) 3%,
                  hsl(215 35% 12% / 0.7) 10%,
                  transparent 25%,
                  transparent 75%,
                  hsl(215 35% 12% / 0.7) 90%,
                  hsl(215 35% 12% / 0.95) 97%,
                  hsl(215 35% 12%) 100%
                ),
                linear-gradient(to right,
                  hsl(215 35% 12% / 0.6) 0%,
                  hsl(215 35% 12% / 0.3) 8%,
                  transparent 20%,
                  transparent 80%,
                  hsl(215 35% 12% / 0.3) 92%,
                  hsl(215 35% 12% / 0.6) 100%
                )
              `,
            }}
          />

          {/* Central radial glow behind title */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(215 35% 12% / 0.9), transparent 70%)',
            }}
          />

          {/* Title overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center"
          >
            <h2
              className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-gradient-gold"
              style={{
                textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(245, 158, 11, 0.3)',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
              }}
            >
              INSTRROL 2K26
            </h2>
          </motion.div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default InstrrolBanner;
