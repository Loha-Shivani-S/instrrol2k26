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
  Image
} from "lucide-react";

const timelineEvents = [
  {
    time: "08:45 AM - 09:45 AM",
    title: "Visionary Boards",
    description: "Transform ideas into visual masterpieces",
    panel: "Panel 1 & 2",
    icon: Sparkles,
    color: "primary",
  },
  {
    time: "09:45 AM - 10:30 AM",
    title: "Algorithm Telephone",
    description: "Pass algorithms through the chain",
    panel: "Panel 1 & 2",
    icon: MessageCircle,
    color: "primary",
  },
  {
    time: "10:00 AM - 10:45 AM",
    title: "Idea Canvas",
    description: "Sketch innovative solutions",
    panel: null,
    icon: Lightbulb,
    color: "primary",
  },
  {
    time: "10:45 AM - 11:00 AM",
    title: "Break",
    description: "Refreshments",
    panel: null,
    icon: Coffee,
    color: "accent",
  },
  {
    time: "11:00 AM - 11:30 AM",
    title: "Think On Demand",
    description: "Quick thinking challenge",
    panel: null,
    icon: Zap,
    color: "primary",
  },
  {
    time: "11:30 AM - 12:30 PM",
    title: "Zero State",
    description: "Technical problem solving",
    panel: null,
    icon: Brain,
    color: "primary",
  },
  {
    time: "12:30 PM - 01:30 PM",
    title: "Lunch Break",
    description: "Networking & Refreshments",
    panel: null,
    icon: Utensils,
    color: "accent",
  },
  {
    time: "01:30 PM - 02:00 PM",
    title: "Brain Buzz",
    description: "Knowledge quiz",
    panel: null,
    icon: Brain,
    color: "primary",
  },
  {
    time: "02:00 PM - 02:30 PM",
    title: "Pitch the Product",
    description: "Product presentation",
    panel: null,
    icon: Megaphone,
    color: "primary",
  },
  {
    time: "02:30 PM - 03:00 PM",
    title: "Ad & Meme",
    description: "Creative meme and advertisement showcase",
    panel: null,
    icon: Image,
    color: "primary",
  },
  {
    time: "02:45 PM - 03:15 PM",
    title: "Fix It / Fake It",
    description: "Debugging challenge",
    panel: null,
    icon: Wrench,
    color: "primary",
  },
  {
    time: "03:15 PM - 03:45 PM",
    title: "Mindflayer",
    description: "Final mental challenge",
    panel: null,
    icon: Skull,
    color: "primary",
  },
  {
    time: "04:15 PM",
    title: "Valedictory & Prize Distribution",
    description: "Closing ceremony & Awards",
    panel: null,
    icon: Trophy,
    color: "accent",
  },
];

const TimelineSection = () => {
  return (
    <section id="timeline" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                className={`relative flex items-start gap-4 md:gap-8 mb-8 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.color === "accent"
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
                  className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${
                    isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
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
