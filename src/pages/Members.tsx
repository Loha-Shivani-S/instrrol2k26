import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Member {
  name: string;
  class: string;
  phone?: string;
  rollNo?: string;
  photo?: string | null;
}

interface MemberGroup {
  title: string;
  members: Member[];
}

const membersData: MemberGroup[] = [
  {
    title: "Faculty Advisors",
    members: [
      { name: "Dr. T. Mrunalini M.E., Ph.D", class: "AP (SrG)", phone: "+91 98765 43210", photo: null },
      { name: "Ms. S. Anitha M.E.", class: "AP", phone: "+91 98765 43211", photo: null },
    ],
  },

  {
    title: "Chairwoman",
    members: [{ name: "Ms. V. Janadharshini", class: "IV A", rollNo: "22EI003", phone: "+91 98765 43214", photo: "/instrrol2k26/images/chairwoman.png" }],
  },
  {
    title: "Vice Chairman",
    members: [
      { name: "Mr. D. Vigneshwaran", class: "IV B", rollNo: "22EI004", phone: "+91 98765 43215", photo: null },
      { name: "Mr. K. Srinivasan", class: "III B", rollNo: "23EI005", phone: "+91 98765 43216", photo: null },
    ],
  },
  {
    title: "Secretary",
    members: [{ name: "Ms. R. Sruthi", class: "IV B", rollNo: "22EI001", phone: "+91 98765 43212", photo: "/instrrol2k26/images/sruthi.png" }],
  },
  {
    title: "Treasurer",
    members: [{ name: "Mr. A. Abdul Hakeem", class: "IV A", rollNo: "22EI006", phone: "+91 98765 43217", photo: null }],
  },
  {
    title: "Additional Secretaries",
    members: [
      { name: "Ms. M. Krittika", class: "IV A", rollNo: "22EI007", phone: "+91 98765 43218", photo: null },
      { name: "Mr. R. A. Sabareeshwaran", class: "IV B", rollNo: "22EI008", phone: "+91 98765 43219", photo: null },
      { name: "Ms. Harshini Velmurugan", class: "III A", rollNo: "23EI002", phone: "+91 98765 43213", photo: null },
      { name: "Mr. S. Rohit Ganapati", class: "III B", rollNo: "23EI009", phone: "+91 98765 43220", photo: null },
    ],
  },
  {
    title: "Joint Treasurers",
    members: [
      { name: "Ms. B. Pavithra", class: "IV B", rollNo: "22EI010", phone: "+91 98765 43221", photo: null },
      { name: "Ms. M. Gopika", class: "III A", rollNo: "23EI011", phone: "+91 98765 43222", photo: null },
      { name: "Mr. P. Kavin", class: "III EEE B", rollNo: "23EE012", phone: "+91 98765 43223", photo: null },
    ],
  },
  {
    title: "Executive Members",
    members: [
      { name: "Ms. P. Dharshini", class: "IV A", rollNo: "22EI013", phone: "+91 98765 43224", photo: null },
      { name: "Mr. K. U. Yuvabalaji", class: "IV B", rollNo: "22EI014", phone: "+91 98765 43225", photo: null },
      { name: "Ms. S. Deepika", class: "III A", rollNo: "23EI015", phone: "+91 98765 43226", photo: null },
      { name: "Ms. P. Dhanusri", class: "III A", rollNo: "23EI016", phone: "+91 98765 43227", photo: null },
      { name: "Ms. K. Kavipriya", class: "III A", rollNo: "23EI017", phone: "+91 98765 43228", photo: null },
      { name: "Mr. M. Saran", class: "III B", rollNo: "23EI018", phone: "+91 98765 43229", photo: null },
      { name: "Ms. S. Srinithi", class: "III B", rollNo: "23EI019", phone: "+91 98765 43230", photo: null },
      { name: "Ms. G. Nihitha", class: "III B", rollNo: "23EI020", phone: "+91 98765 43231", photo: null },
      { name: "Mr. P. Chandresh", class: "II A", rollNo: "24EI021", phone: "+91 98765 43232", photo: null },
      { name: "Mr. S. Hariharan", class: "II A", rollNo: "24EI022", phone: "+91 98765 43233", photo: null },
      { name: "Ms. S. Lohashivani", class: "II A", rollNo: "24EI023", phone: "+91 98765 43234", photo: null },
      { name: "Ms. S. M. Asika", class: "II A", rollNo: "24EI024", phone: "+91 98765 43235", photo: null },
      { name: "Mr. T. A. Vijay Prakash", class: "II B", rollNo: "24EI025", phone: "+91 98765 43236", photo: null },
      { name: "Ms. J. Ramitha", class: "II B", rollNo: "24EI026", phone: "+91 98765 43237", photo: null },
      { name: "Mr. G. Nivish", class: "II B", rollNo: "24EI027", phone: "+91 98765 43238", photo: null },
      { name: "Ms. T. Sivapriya", class: "II B", rollNo: "24EI028", phone: "+91 98765 43239", photo: null },
    ],
  },
];

const isFaculty = (className: string) => {
  return className === "AP (SrG)" || className === "AP";
};

const MemberCard = ({ member, index }: { member: Member; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ delay: index * 0.03 }}
    className="flex flex-col items-start text-left py-4 px-6 w-full h-full bg-secondary/30 border border-primary/10 hover:border-primary/30 rounded-lg transition-all hover:bg-secondary/50"
  >
    <div className="flex flex-col gap-1 w-full">
      <h4 className="font-display font-bold text-2xl mb-1 tracking-wide text-gradient-gold">
        {member.name}
      </h4>
      <p className="text-lg text-muted-foreground font-body">{member.class}</p>

    </div>
  </motion.div>
);

const Members = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden machinery-pattern">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <motion.button
                className="w-10 h-10 rounded-full bg-secondary border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <div>
              <h1 className="font-display text-xl font-bold tracking-wider">
                <span className="text-gradient-gold">ISoI Members</span>
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                INSTRROL 2K26 Organizing Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {membersData.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: groupIndex * 0.1 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-10 text-left flex items-center gap-4 tracking-wider py-4 px-6 bg-gradient-to-r from-primary/10 to-transparent border-l-8 border-primary rounded-r-lg shadow-sm">
              {group.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.members.map((member, memberIndex) => (
                <MemberCard
                  key={memberIndex}
                  member={member}
                  index={memberIndex}
                />
              ))}
            </div>
          </motion.div>
        ))}


      </div>
    </div>
  );
};

export default Members;
