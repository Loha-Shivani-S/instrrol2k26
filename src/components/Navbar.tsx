import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import kecLogo from "@/assets/kec-logo.png";
import isoiLogo from "@/assets/isoi-logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#home", label: "Home", small: false },
  { href: "#timeline", label: "Timeline", small: true },
  { href: "#about", label: "About", small: true },
  { href: "#events", label: "Events", small: true },
  { href: "#faculty", label: "Faculty & Members", small: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#home"
            className="block"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
          >
            <img src={kecLogo} alt="KEC Logo" className="h-14 w-auto object-contain" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`text-foreground/70 hover:text-primary transition-colors font-medium ${link.small ? 'text-sm' : ''}`}
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#events");
              }}
              className="btn-hero-primary px-6 py-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>

            <motion.a
              href="https://isoi.in" // Assuming ISOI link, can be updated
              target="_blank"
              rel="noopener noreferrer"
              className="block ml-2"
              whileHover={{ scale: 1.05 }}
            >
              <img src={isoiLogo} alt="ISOI Logo" className="h-14 w-auto object-contain" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`font-display text-foreground/80 hover:text-primary transition-colors ${link.small ? 'text-lg' : 'text-xl'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#events");
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="btn-hero-primary mt-4"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
