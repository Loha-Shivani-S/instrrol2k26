import { motion } from "framer-motion";
import { Users, Target, Lightbulb } from "lucide-react";
import InstrrolBanner from "./InstrrolBanner";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* About ISoI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-display tracking-wider mb-6">
            About ISoI
          </span>
          <h2 className="section-title mb-6">
            Instrument Society of <span className="text-gradient-gold">India</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-body">
            The Instrument Society of India (ISoI) is a premier professional body dedicated to advancing
            instrumentation, automation, and control systems. Our student chapter at Kongu Engineering College
            bridges the gap between academia and industry, fostering innovation and technical excellence in
            Electronics & Instrumentation Engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Industry Connect",
                description: "Bridging students with industry experts and professionals",
              },
              {
                icon: Lightbulb,
                title: "Innovation Hub",
                description: "Fostering creativity and technical innovation",
              },
              {
                icon: Target,
                title: "Skill Development",
                description: "Hands-on training in instrumentation & automation",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="event-card text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 tracking-wide">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* INSTRROL Banner */}
        <InstrrolBanner />

        {/* About INSTRROL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-display tracking-wider mb-6">
              About INSTRROL
            </span>
            <h2 className="section-title mb-6">
              What is <span className="text-gradient-gold">INSTRROL 2K26</span>?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              INSTRROL is the flagship department-level technical event organized by ISoI, exclusively
              for students of Electronics & Instrumentation Engineering. It's a platform where innovation
              meets competition, designed to test practical knowledge, teamwork, and problem-solving abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🧠", value: "10+", label: "Technical Events" },
              { icon: "👥", value: "EIE", label: "Students Only" },
              { icon: "📍", value: "KEC", label: "Venue" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card/50 border border-primary/20"
              >
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <span className="font-display text-3xl font-bold text-primary block mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground font-body">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
