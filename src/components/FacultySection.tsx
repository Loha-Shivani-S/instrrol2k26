import { motion } from "framer-motion";
import { User, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const facultyAdvisors = [
  {
    name: "Dr. T. Mrunalini M.E., Ph.D",
    designation: "AP (SrG)",
    role: "Faculty Advisor",
    phone: "9865581285",
    photo: "/instrrol2k26/images/mrunalini.png",
  },
  {
    name: "Ms. S. Anitha M.E.",
    designation: "AP",
    role: "Faculty Advisor",
    phone: "8072099510",
    photo: "/instrrol2k26/images/anitha.png",
    scale: 1.35,
  },
];

const overallCoordinators = [
  {
    name: "Sruthi R",
    rollNo: "22EIR091",
    phone: "9750149999",
    photo: "/instrrol2k26/images/sruthi.png",
  },
  {
    name: "Harshini V",
    rollNo: "23EIR040",
    phone: "9994441632",
    photo: "/instrrol2k26/images/harshini.png",
  },
];

const FacultySection = () => {
  return (
    <section id="faculty" className="py-20 md:py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
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
        <h3 className="font-decorative text-2xl italic text-primary mb-8 text-center">
          Faculty Advisors
        </h3>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-16">
          {facultyAdvisors.map((faculty: any, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                style={{ boxShadow: "var(--shadow-gold-soft)" }}
              >
                {faculty.photo ? (
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                    style={{ transform: faculty.scale ? `scale(${faculty.scale})` : "none" }}
                  />
                ) : (
                  <User className="w-28 h-28 md:w-32 md:h-32 text-primary/50" />
                )}
              </motion.div>
              <h3 className="font-display text-3xl font-bold text-foreground mb-2 tracking-wide">
                {faculty.name}
              </h3>
              <p className="text-primary text-xl font-display mb-1">
                {faculty.role}
              </p>
              <p className="text-muted-foreground text-lg font-body mb-1">
                {faculty.designation}
              </p>
              <p className="text-muted-foreground text-base flex items-center justify-center gap-1 font-body">
                <Phone size={16} /> {faculty.phone}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chairwoman */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          className="text-center mb-16"
        >
          <h3 className="font-decorative text-2xl italic text-primary mb-8">
            Chairwoman
          </h3>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              className="text-center"
            >
              <motion.div
                className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/30 flex items-center justify-center mx-auto mb-5 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                style={{ boxShadow: "var(--shadow-glow-accent)" }}
              >
                {/* Chairwoman Image */}
                <img
                  src="/instrrol2k26/images/chairwoman.png"
                  alt="Ms. V. Janadharshini"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h4 className="font-display text-3xl font-bold text-foreground mb-2 tracking-wide">
                Ms. V. Janadharshini
              </h4>
              <p className="text-accent text-xl font-display mb-1">
                Chairwoman
              </p>
              <p className="text-muted-foreground text-lg font-body mb-1">
                22EIR031
              </p>
              <p className="text-muted-foreground text-base flex items-center justify-center gap-1 font-body">
                <Phone size={16} /> 9944556955
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Overall Coordinators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
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
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/30 flex items-center justify-center mx-auto mb-5 overflow-hidden"
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
                    <User className="w-28 h-28 md:w-32 md:h-32 text-accent/50" />
                  )}
                </motion.div>
                <h4 className="font-display text-3xl font-bold text-foreground mb-2 tracking-wide">
                  {coordinator.name}
                </h4>
                <p className="text-accent text-xl font-display mb-1">
                  Overall Coordinator
                </p>
                <p className="text-muted-foreground text-lg font-body mb-1">
                  {coordinator.rollNo}
                </p>
                <p className="text-muted-foreground text-base flex items-center justify-center gap-1 font-body">
                  <Phone size={16} /> {coordinator.phone}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            to="/coordinators"
          >
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-lg tracking-wide w-full sm:w-auto justify-center"
              style={{
                background: "var(--gradient-gold)",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--shadow-gold)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Coordinators
              <ArrowRight size={20} />
            </motion.button>
          </Link>

          <Link
            to="/members"
          >
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-lg tracking-wide w-full sm:w-auto justify-center border-2 border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
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
