import { motion } from "framer-motion";
import {
  Eye,
  Phone,
  Palette,
  Zap,
  RefreshCw,
  Brain as BrainIcon,
  Megaphone,
  Wrench,
  Skull,
  Users,
  Clock,
  ArrowRight,
  Image
} from "lucide-react";

const technicalEvents = [
  {
    icon: Eye,
    name: "Visionary Boards",
    description: "Transform your ideas into visual masterpieces. Create compelling vision boards that tell a story.",
    teamSize: "2-3 members",
    duration: "2 hours",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSds4FbknZ4-HLQuAwbTEXzeMswYumFo3pgkQ6z1CMUW-h728Q/viewform",
  },
  {
    icon: Phone,
    name: "Algorithm Telephone",
    description: "A fun twist on communication! Pass algorithms through the chain without losing the logic.",
    teamSize: "4 members",
    duration: "1.5 hours",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdiHFRqIdDaXs3dhDlwEK_3o_C9lf3896t77pKk2eGG__1SFQ/viewform?usp=send_form",
  },
  {
    icon: Palette,
    name: "Idea Canvas",
    description: "Sketch your innovative solutions on a blank canvas. Creativity meets engineering!",
    teamSize: "2 members",
    duration: "1 hour",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSeg7cK_lKx7I719WfvWI-m7A_CR9yqeboU6Ui-ttKHqcZZNBw/viewform",
  },
  {
    icon: Zap,
    name: "Think On Demand",
    description: "Quick-fire round testing your ability to think on your feet under pressure.",
    teamSize: "Individual",
    duration: "30 mins",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdkVSmPjrSBhcxHDxSpe_2yASoLIGegJr0uvN7mg1Xqkoaq2A/viewform?usp=dialog",
  },
  {
    icon: RefreshCw,
    name: "Zero State",
    description: "Start from scratch and build your way up. A technical challenge like no other.",
    teamSize: "2 members",
    duration: "1 hour",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfpf3X64xyDh0FSslHYx_yB33cOk1z5WMsDCBQMyEH7AYna4w/viewform?usp=send_form",
  },
];

const creativeEvents = [
  {
    icon: BrainIcon,
    name: "Brain Buzz",
    description: "Test your knowledge in this electrifying quiz spanning electronics and instrumentation.",
    teamSize: "2-3 members",
    duration: "30 mins",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfhc8l7YQKHEIadqc0ty8iWV6cQyi5sobpnISndDA8K4SZ6kg/viewform?usp=send_form",
  },
  {
    icon: Megaphone,
    name: "Pitch the Product",
    description: "Present your product idea like a pro. Convince the judges with your pitch!",
    teamSize: "2-4 members",
    duration: "30 mins",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfPWJKTeiw-IJpny840rWZNgzPL8IAcG8V4t1LbTVGqEnD91w/viewform",
  },
  {
    icon: Wrench,
    name: "Fix It / Fake It",
    description: "Debug the code or fake your way through. Can you tell the difference?",
    teamSize: "2 members",
    duration: "30 mins",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfkg6UQuL4JljyjD2_zx9j5Ak6kIOI3xi6KNhRjVW0cxVj8ZA/viewform",
  },
  {
    icon: Skull,
    name: "Mindflayer",
    description: "The ultimate mental challenge. Only the sharpest minds survive this finale.",
    teamSize: "Individual",
    duration: "30 mins",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSfFzUMcOsocMV7dGaio_j6V-t_rzeu248zMAxt_8S0O_vff6g/viewform?usp=send_form",
  },
  {
    icon: Image,
    name: "Ad & Meme",
    description: "Unleash your creativity! Create viral memes and catchy advertisements that stand out.",
    teamSize: "2 members",
    duration: "1 hour",
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdUCLHgpDnFYJM5JTyYhLTRoPYx6J2lyF6uQb07M0wrUB6PZg/viewform?usp=send_form",
  },
];

// Placeholder for Google Form link - replace with actual link
const GOOGLE_FORM_LINK = "https://forms.google.com/your-form-link-here";

type EventItem = {
  icon: typeof Eye;
  name: string;
  description: string;
  teamSize: string;
  duration: string;
  registerLink?: string;
};

const EventCard = ({ event, index }: { event: EventItem; index: number }) => {
  const Icon = event.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        className="event-card h-full flex flex-col"
        whileHover={{ y: -8 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-foreground tracking-wide">
              {event.name}
            </h3>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6 flex-grow font-body">
          {event.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users size={14} className="text-primary" />
            <span>{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={14} className="text-accent" />
            <span>{event.duration}</span>
          </div>
        </div>

        <motion.a
          href={(event as any).registerLink || GOOGLE_FORM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-lg border border-primary/30 text-primary font-display text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
          whileHover={{ gap: "12px" }}
        >
          Register
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Featured <span className="text-gradient-gold">Events</span>
          </h2>
          <p className="section-subtitle">
            Participate in a variety of technical and creative challenges designed to push your limits
          </p>
        </motion.div>

        {/* Technical Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="font-decorative text-2xl italic text-primary mb-8 text-center">
            Technical Events
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalEvents.map((event, index) => (
              <EventCard key={event.name} event={event} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Creative Confluence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-decorative text-2xl italic text-accent mb-8 text-center">
            Creative Confluence
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creativeEvents.map((event, index) => (
              <EventCard key={event.name} event={event} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Eligibility Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent font-display tracking-wide">
            <span className="font-medium">Eligibility:</span>
            <span>EIE Department Students Only</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
