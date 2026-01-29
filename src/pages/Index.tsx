import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import FacultySection from "@/components/FacultySection";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <AboutSection />
      <EventsSection />
      <FacultySection />
      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Index;
