import { motion } from "framer-motion";
import { User, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const facultyAdvisors = [
  {
    name: "Dr. T. Mrunalini M.E., Ph.D",
    designation: "AP (SrG)",
    role: "Faculty Advisor",
    phone: "+91 98765 43210",
    photo: null,
  },
  {
    name: "Ms. S. Anitha M.E.",
    designation: "AP",
    role: "Faculty Advisor",
    phone: "+91 98765 43211",
    photo: null,
  },
];

const overallCoordinators = [
  {
    name: "Sruthi R",
    rollNo: "22EI001",
    phone: "+91 97501 49999",
    photo: null,
  },
  {
    name: "Harshini V",
    rollNo: "23EI002",
    phone: "+91 99944 41632",
    photo: null,
  },
];

const FacultySection = () => {
  return (
    <section id="faculty" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Faculty & <span className="text-gradient-gold">Members</span>
          </h2>
          <p className="section-subtitle">
            Meet the dedicated team behind INSTRROL 2K26
          </p>
        </motion.div>

        {/* Faculty Advisors */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-16">
          {facultyAdvisors.map((faculty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                style={{ boxShadow: "var(--shadow-gold-soft)" }}
              >
                {faculty.photo ? (
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-20 h-20 md:w-24 md:h-24 text-primary/50" />
                )}
              </motion.div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1 tracking-wide">
                {faculty.name}
              </h3>
              <p className="text-primary text-base font-display mb-1">
                {faculty.role}
              </p>
              <p className="text-muted-foreground text-sm font-body mb-1">
                {faculty.designation}
              </p>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1 font-body">
                <Phone size={14} /> {faculty.phone}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Overall Coordinators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-decorative text-2xl italic text-primary mb-8">
            Overall Coordinators
          </h3>
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {overallCoordinators.map((coordinator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/30 flex items-center justify-center mx-auto mb-5 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  style={{ boxShadow: "var(--shadow-glow-accent)" }}
                >
                  {coordinator.photo ? (
                    <img
                      src={coordinator.photo}
                      alt={coordinator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 md:w-20 md:h-20 text-accent/50" />
                  )}
                </motion.div>
                <h4 className="font-display text-lg font-bold text-foreground mb-1 tracking-wide">
                  {coordinator.name}
                </h4>
                <p className="text-accent text-sm font-display mb-1">
                  Overall Coordinator
                </p>
                <p className="text-muted-foreground text-sm font-body mb-1">
                  {coordinator.rollNo}
                </p>
                <p className="text-muted-foreground text-sm flex items-center justify-center gap-1 font-body">
                  <Phone size={14} /> {coordinator.phone}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Members Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            to="/members"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/members";
            }}
          >
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-lg tracking-wide"
              style={{
                background: "var(--gradient-gold)",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--shadow-gold)",
              }}
              whileHover={{ scale: 1.05, gap: "16px" }}
              whileTap={{ scale: 0.95 }}
            >
              View All Members
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultySection;
