import { motion } from "framer-motion";
import { Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 relative bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
          >
            <h3 className="font-display text-3xl font-bold mb-4 tracking-wider">
              <span className="text-gradient-gold">INSTRROL</span>
            </h3>
            <p className="text-muted-foreground mb-4 font-body">
              Department Technical Event organized by ISoI Students' Chapter,
              Department of Electronics & Instrumentation Engineering.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} />
              <span className="font-display tracking-wide">18 February 2026</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "#home", label: "Home" },
                { href: "#timeline", label: "Timeline" },
                { href: "#events", label: "Events" },
                { href: "#register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-body"
                  >
                    <ExternalLink size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium font-display">EIE Block</p>
                  <p className="text-sm text-muted-foreground font-body">Kongu Engineering College</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:isoi.eie@kongu.edu" className="text-muted-foreground hover:text-primary transition-colors font-body">
                  isoi.eie@kongu.edu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground font-body">+91 97501 49999</span>
              </li>
            </ul>

            {/* Coordinators */}
            <div className="mt-6 pt-6 border-t border-border">
              <h5 className="font-display text-sm text-foreground mb-3 tracking-wide">Coordinators</h5>
              <div className="space-y-2 text-sm text-muted-foreground font-body">
                <p><span className="text-primary">Sruthi R:</span> +91 97501 49999</p>
                <p><span className="text-accent">Harshini V:</span> +91 99944 41632</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          className="pt-8 border-t border-border text-center space-y-2"
        >
          <p className="text-sm text-muted-foreground font-body">
            © 2026 INSTRROL | ISoI Students' Chapter – EIE Department | Kongu Engineering College
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Website created by <span className="text-primary font-medium">Loha Shivani S</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
