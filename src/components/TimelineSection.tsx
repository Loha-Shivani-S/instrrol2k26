import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Coffee,
  Lightbulb,
  Zap,
  Utensils,
  MessageCircle,
  Megaphone,
  Wrench,
  Skull,
  Trophy,
  Image,
  Factory,
  Cpu,
  Gauge,
  Cog,
  HardHat,
  Ruler,
  DraftingCompass,
  Smartphone,
  Laptop,
  Globe,
  FileCog,
  PenTool,
  Hammer,
  Construction,
  Settings
} from "lucide-react";

const timelineEvents = [
  {
    time: "08:45 AM - 10:45 AM",
    title: "Visionary Boards",
    description: "Convert your paper/project into creative posters!",
    panel: null,
    icon: Sparkles,
    color: "primary",
  },
  {
    time: "08:45 AM - 10:45 AM",
    title: "Algorithm Telephone",
    description: "Listen carefully. Plan precisely. Code efficiently. Make every step count.",
    panel: null,
    icon: MessageCircle,
    color: "primary",
  },
  {
    time: "08:45 AM - 10:45 AM",
    title: "Idea Canvas",
    description: "Innovative ideas to solve real-world problems.",
    panel: null,
    icon: Lightbulb,
    color: "primary",
  },
  {
    time: "10:45 AM - 11:00 AM",
    title: "Break",
    description: "Short break to refresh, recharge, and prepare for the next challenge.",
    panel: null,
    icon: Coffee,
    color: "accent",
  },
  {
    time: "11:00 AM - 11:30 AM",
    title: "Think On Demand",
    description: "Make a prompt image with AI",
    panel: null,
    icon: Zap,
    color: "primary",
  },
  {
    time: "11:30 AM - 12:30 PM",
    title: "Zero State",
    description: "The team assembles and connects the circuit correctly.",
    panel: null,
    icon: Zap,
    color: "primary",
  },
  {
    time: "12:30 PM - 01:30 PM",
    title: "Lunch Break",
    description: "To relax, refuel, and network.",
    panel: null,
    icon: Utensils,
    color: "accent",
  },
  {
    time: "01:30 PM - 02:00 PM",
    title: "Brain Buzz",
    description: "Connect the dots logically from the starting point to the ending point.",
    panel: null,
    icon: Brain,
    color: "primary",
  },
  {
    time: "02:00 PM - 02:30 PM",
    title: "Pitch the Product",
    description: "Pitch the Product is an individual-based fun and creative competition.",
    panel: null,
    icon: Megaphone,
    color: "primary",
  },
  {
    time: "02:30 PM - 02:45 PM",
    title: "Break",
    description: "Short break to refresh, recharge, and prepare for the next challenge.",
    panel: null,
    icon: Coffee,
    color: "accent",
  },
  {
    time: "02:30 PM - 02:45 PM",
    title: "Ad & Meme",
    description: "AD & Meme challenges participants to creatively present technical concepts through clear, original, and impactful visuals.",
    panel: null,
    icon: Image,
    color: "primary",
  },
  {
    time: "02:45 PM - 03:15 PM",
    title: "Fix It / Fake It",
    description: "Sharpen your fundamentals, react fast, and enjoy learning through fun challenges.",
    panel: null,
    icon: Wrench,
    color: "primary",
  },
  {
    time: "03:15 PM - 03:45 PM",
    title: "Mind Flayer",
    description: "Think fast. Switch smart. Let your mind flare.",
    panel: null,
    icon: Skull,
    color: "primary",
  },
  {
    time: "03:45 PM - 04:15 PM",
    title: "Valedictory & Prize Distribution",
    description: "Closing ceremony & Awards",
    panel: null,
    icon: Trophy,
    color: "accent",
  },
];

const TimelineSection = () => {
  return (
    <section id="timeline" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Floating Elements */}
      {/* Background Floating Elements - Grid like distribution for coverage */}
      {/* Background Floating Elements - Grid like distribution for coverage */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Top Section - Primary Color */}
        <motion.div
          className="absolute top-[5%] left-[5%] text-primary/40"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Factory size={140} />
        </motion.div>
        <motion.div
          className="absolute top-[8%] right-[10%] text-primary/40"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <HardHat size={110} />
        </motion.div>
        <motion.div
          className="absolute top-[15%] left-[45%] text-primary/30"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cog size={90} />
        </motion.div>

        {/* Upper Mid Section - Primary/Accent Mix */}
        <motion.div
          className="absolute top-[25%] left-[8%] text-primary/30"
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Ruler size={100} />
        </motion.div>
        <motion.div
          className="absolute top-[28%] right-[5%] text-primary/40"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <DraftingCompass size={120} />
        </motion.div>
        <motion.div
          className="absolute top-[35%] left-[30%] text-accent/30"
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wrench size={80} />
        </motion.div>

        {/* Mid Section - Accent Color Dominance */}
        <motion.div
          className="absolute top-[45%] right-[25%] text-primary/40"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Hammer size={90} />
        </motion.div>
        <motion.div
          className="absolute top-[50%] left-[2%] text-accent/40"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FileCog size={100} />
        </motion.div>
        <motion.div
          className="absolute top-[55%] left-[60%] text-primary/30"
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PenTool size={130} />
        </motion.div>

        {/* Lower Mid Section - Accent Color */}
        <motion.div
          className="absolute top-[65%] right-[8%] text-accent/40"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Settings size={150} />
        </motion.div>
        <motion.div
          className="absolute top-[70%] left-[10%] text-primary/30"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Construction size={85} />
        </motion.div>
        <motion.div
          className="absolute top-[75%] right-[40%] text-accent/40"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Smartphone size={95} />
        </motion.div>

        {/* Bottom Section - Accent Color */}
        <motion.div
          className="absolute bottom-[10%] left-[5%] text-accent/40"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Laptop size={110} />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[15%] text-accent/40"
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Globe size={100} />
        </motion.div>
        <motion.div
          className="absolute bottom-[2%] left-[40%] text-accent/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gauge size={80} />
        </motion.div>
      </div>
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Event <span className="text-gradient-gold">Timeline</span>
          </h2>
          <p className="section-subtitle">
            A full day of technical challenges, innovation, and learning awaits you
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-accent" />

          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-4 md:gap-8 mb-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${event.color === "accent"
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                      }`}
                    whileHover={{ scale: 1.2 }}
                    style={{
                      boxShadow:
                        event.color === "accent"
                          ? "var(--shadow-glow-accent)"
                          : "var(--shadow-gold)",
                    }}
                  >
                    <Icon size={18} />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    }`}
                >
                  <motion.div
                    className="event-card"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-display mb-3 tracking-wide">
                      {event.time}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-wide">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body">
                      {event.description}
                      {event.panel && (
                        <span className="text-primary/70 ml-2">
                          ({event.panel})
                        </span>
                      )}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout on desktop */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
