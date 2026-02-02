import { motion } from "framer-motion";
import { User, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";


interface Member {
    name: string;
    class: string;
    phone?: string;
    rollNo?: string;
    photo?: string | null;
    objectPosition?: string;
}

interface MemberGroup {
    title: string;
    members: Member[];
}

const membersData: MemberGroup[] = [
    {
        title: "Visionary Boards",
        members: [
            { name: "Dharshini S M", class: "IV Year", rollNo: "22EIR016", phone: "+91 9043417973", photo: "/instrrol2k26/images/dharshini-sm.png" },
            { name: "Saran M", class: "III Year", rollNo: "23EIR088", phone: "+91 6369993963", photo: "/instrrol2k26/images/saran.png" },
            { name: "Keerthana T", class: "III Year", rollNo: "23EIR050", phone: "+91 9487708177", photo: "/instrrol2k26/images/keerthana.png" },
            { name: "Nivish G", class: "II Year", rollNo: "24EIR069", phone: "+91 6383231205", photo: "/instrrol2k26/images/nivish.png" },
        ],
    },
    {
        title: "Algorithm Telephone",
        members: [
            { name: "Ms. V. Janadharshini", class: "IV Year", rollNo: "22EI003", phone: "+91 98765 43214", photo: "/instrrol2k26/images/chairwoman.png" },
            { name: "Dhanusri P", class: "III Year", rollNo: "23EIR022", phone: "+91 6374439295", photo: "/instrrol2k26/images/dhanusri.png" },
            { name: "Lohashivani S", class: "II Year", rollNo: "24EIR055", phone: "+91 8270650379", photo: "/instrrol2k26/images/lohashivani.png", objectPosition: "50% 35%" },
            { name: "Hariharan S", class: "II Year", rollNo: "24EIR037", phone: "+91 7402799516", photo: "/instrrol2k26/images/hariharan.png" },
        ],
    },
    {
        title: "Idea Canvas",
        members: [
            { name: "Sudarshna R M", class: "IV Year", rollNo: "22EIR096", phone: "+91 8608684086", photo: "/instrrol2k26/images/sudarshana.png" },
            { name: "Srinivasan K", class: "III Year", rollNo: "23EIR104", phone: "+91 7550322068", photo: "/instrrol2k26/images/srinivasan.png" },
            { name: "Vimal T N", class: "III Year", rollNo: "23EIL125", phone: "+91 9342811601", photo: "/instrrol2k26/images/vimal.png" },
            { name: "Ramitha J", class: "II Year", rollNo: "24EIR080", phone: "+91 9942065216", photo: "/instrrol2k26/images/ramitha.png" },
        ],
    },
    {
        title: "Think On Demand",
        members: [
            { name: "Sruthi R", class: "IV Year", rollNo: "23EIR081", phone: "+91 6374448662", photo: "/instrrol2k26/images/sruthi.png" },
            { name: "Rohit Ganapathi S", class: "III Year", rollNo: "23EIR081", phone: "+91 6374448662", photo: "/instrrol2k26/images/rohit.png" },
            { name: "Vijay Prakash T A", class: "II Year", rollNo: "24EIR116", phone: "+91 9363984945", photo: "/instrrol2k26/images/vijay.jpg" },
            { name: "Chandresh P", class: "II Year", rollNo: "24EIR016", phone: "+91 8072347397", photo: "/instrrol2k26/images/chandresh.png" },
        ],
    },
    {
        title: "Zero State",
        members: [
            { name: "Subhashree S", class: "IV Year", rollNo: "22EIR094", phone: "+91 9025834922", photo: "/instrrol2k26/images/subhashree.png" },
            { name: "Srinithi S", class: "III Year", rollNo: "23EIR103", phone: "+91 9363629880", photo: "/instrrol2k26/images/srinithi.png" },
            { name: "Srinidhi A", class: "III Year", rollNo: "23EIR102", phone: "+91 7604829088", photo: "/instrrol2k26/images/srinidhi.png" },
            { name: "Asika SM", class: "II Year", rollNo: "24EIR010", phone: "+91 9025631138", photo: "/instrrol2k26/images/asika.png" },
        ],
    },
    {
        title: "Brain Buzz",
        members: [
            { name: "Vishalini A N", class: "IV Year", rollNo: "22EIR104", phone: "+91 9042901674", photo: "/instrrol2k26/images/vishalini.png" },
            { name: "Nihitha G", class: "III Year", rollNo: "23EIR068", phone: "+91 6382446405", photo: "/instrrol2k26/images/nihitha.png" },
            { name: "Malavika Mukundan", class: "III Year", rollNo: "23EIR059", phone: "+91 8056380141", photo: "/instrrol2k26/images/malavika.png", objectPosition: "50% 25%" },
            { name: "Nivish G", class: "II Year", rollNo: "24EIR069", phone: "+91 6383231205", photo: "/instrrol2k26/images/nivish.png" },
        ],
    },
    {
        title: "Pitch The Product",
        members: [
            { name: "Subhash T S", class: "IV Year", rollNo: "22EIR093", phone: "+91 9597131204", photo: "/instrrol2k26/images/subhash.png" },
            { name: "Deepika S", class: "III Year", rollNo: "23EIR016", phone: "+91 9944556955", photo: "/instrrol2k26/images/deepika.png" },
            { name: "Hariharan S", class: "II Year", rollNo: "24EIR037", phone: "+91 7402799516", photo: "/instrrol2k26/images/hariharan.png" },
            { name: "Chandresh P", class: "II Year", rollNo: "24EIR016", phone: "+91 8072347397", photo: "/instrrol2k26/images/chandresh.png" },
        ],
    },
    {
        title: "Fix It / Fake It",
        members: [
            { name: "Sugeshna V", class: "IV Year", rollNo: "22EIR097", phone: "+91 9677540947", photo: "/instrrol2k26/images/sugeshna.png" },
            { name: "Kavipriya K", class: "III Year", rollNo: "23EIR049", phone: "+91 9791266535", photo: "/instrrol2k26/images/kavipriya.png" },
            { name: "Ramitha J", class: "II Year", rollNo: "24EIR080", phone: "+91 9942065216", photo: "/instrrol2k26/images/ramitha.png" },
            { name: "Nivethitha S K", class: "II Year", rollNo: "24EIR068", phone: "+91 6369669948", photo: "/instrrol2k26/images/nivethitha.png" },
        ],
    },
    {
        title: "Mindflayer",
        members: [
            { name: "Yogapriya B", class: "IV Year", rollNo: "22EIR108", phone: "+91 9751930742", photo: "/instrrol2k26/images/yogapriya.png" },
            { name: "Gopika M", class: "III Year", rollNo: "23EIR032", phone: "+91 7010590477", photo: "/instrrol2k26/images/gopika.png" },
            { name: "Aakash K", class: "II Year", rollNo: "24EIR002", phone: "+91 9342534009", photo: "/images/aakash.png" },
            { name: "Sivapriya T", class: "II Year", rollNo: "24EIR096", phone: "+91 9715011770", photo: "/instrrol2k26/images/sivapriya.png" },
        ],
    },
    {
        title: "AD & MEME",
        members: [
            { name: "Sruthi R", class: "IV Year", rollNo: "23EIR081", phone: "+91 6374448662", photo: "/instrrol2k26/images/sruthi.png" },
            { name: "Harshini Velmurugan", class: "III Year", rollNo: "23EI002", phone: "+91 9994441632", photo: "/instrrol2k26/images/harshini.png" },
            { name: "Veena K", class: "III Year", rollNo: "23EIR115", phone: "+91 6369669948", photo: "/instrrol2k26/images/veena_new.png" },
            { name: "Vijay Prakash T A", class: "II Year", rollNo: "24EIR116", phone: "+91 9363984945", photo: "/instrrol2k26/images/vijay.jpg" },
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
        className="flex flex-col items-center text-center py-8 px-4"
    >
        <div
            className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden mb-6"
            style={{ boxShadow: "var(--shadow-gold-soft)" }}
        >
            {member.photo ? (
                <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: member.objectPosition || "center" }}
                />
            ) : (
                <User className="w-16 h-16 md:w-24 md:h-24 text-primary/50" />
            )}
        </div>
        <h4 className="font-display font-bold text-foreground text-2xl md:text-3xl mb-2 tracking-wide">{member.name}</h4>
        <p className="text-lg text-muted-foreground font-body mb-1">{member.class}</p>
        {!isFaculty(member.class) && member.rollNo && (
            <p className="text-lg text-primary font-display mb-1">{member.rollNo}</p>
        )}
        {member.phone && (
            <p className="text-base text-muted-foreground flex items-center gap-1 font-body">
                <Phone size={14} /> {member.phone}
            </p>
        )}
    </motion.div>
);

const Coordinators = () => {
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
                                <span className="text-gradient-gold">Event Coordinators</span>
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
                        className="mb-20"
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-16 text-left flex items-center gap-4 tracking-wider py-4 px-6 bg-gradient-to-r from-primary/10 to-transparent border-l-8 border-primary rounded-r-lg shadow-sm">
                            {group.title}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-16 md:gap-24">
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

export default Coordinators;
