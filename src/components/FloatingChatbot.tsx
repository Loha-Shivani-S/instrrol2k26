import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const faqResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "hola"],
    response: "Hello! 👋 Welcome to INSTRROL 2K26. How can I help you today?",
  },
  {
    keywords: ["register", "registration", "sign up", "signup", "join"],
    response: "To register for events, scroll down to the Events section and click 'Register Now' on any event you're interested in. You'll be redirected to our Google Form!",
  },
  {
    keywords: ["event", "events", "schedule", "program"],
    response: "INSTRROL 2K26 features exciting events like Visionary Boards, Algorithm Telephone, Idea Canvas, Brain Buzz, Pitch the Product, and more! Check the Events section for details.",
  },
  {
    keywords: ["date", "when", "time", "timing"],
    response: "INSTRROL 2K26 is scheduled for 18 February 2026. The events run from 08:45 AM to 04:15 PM. Check the Timeline section for the detailed schedule!",
  },
  {
    keywords: ["venue", "location", "where", "place"],
    response: "The event takes place at C K Prahalad Seminar Hall, MBA Block, Kongu Engineering College.",
  },
  {
    keywords: ["contact", "email", "phone", "reach"],
    response: "For inquiries, contact our coordinators: Sruthi R (+91 97501 49999) or Harshini V (+91 99944 41632). Email: isoi.eie@kongu.edu",
  },
  {
    keywords: ["prize", "reward", "winning", "winner"],
    response: "Win exciting prizes including Best Crew, Mr.EIE, and Ms.EIE awards! Specific prize details will be announced at the event.",
  },
  {
    keywords: ["technical", "visionary", "algorithm"],
    response: "Technical Events include: Visionary Boards, Algorithm Telephone, Idea Canvas, Think On Demand, and Zero State!",
  },
  {
    keywords: ["creative", "brain", "pitch", "meme"],
    response: "Creative Confluence includes: Brain Buzz, Pitch the Product, Fix It / Fake It, Mindflayer, and Ad & Meme!",
  },
  {
    keywords: ["smart", "factory"],
    response: "Explore our Smart Factory Environment! It's an interactive 3D demonstration of Industry 4.0 concepts. Click the link in the navigation to check it out!",
  },
  {
    keywords: ["member", "team", "organizer", "coordinator"],
    response: "Our organizing team includes faculty advisors and student members from ISoI. Overall Coordinators: Sruthi R & Harshini V. Check the Faculty & Members section!",
  },
  {
    keywords: ["thanks", "thank", "bye", "goodbye"],
    response: "You're welcome! Feel free to ask if you have more questions. See you at INSTRROL 2K26! 🎉",
  },
];

const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const faq of faqResponses) {
    if (faq.keywords.some((keyword) => lowerInput.includes(keyword))) {
      return faq.response;
    }
  }
  
  return "I'm not sure about that. You can ask me about events, registration, schedule, venue, or contact details. Or scroll through the website for more information!";
};

const FloatingChatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to INSTRROL 2K26. I'm here to help you with any questions about the event, registration, or schedule. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: message,
        isBot: false,
      };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: getResponse(message),
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 800);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          >
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 rounded-full flex items-center justify-center animate-glow-pulse"
              style={{
                background: "var(--gradient-gold)",
                color: "hsl(var(--primary-foreground))",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden border border-border shadow-2xl"
            style={{ background: "hsl(var(--card))" }}
          >
            {/* Chat Header */}
            <div 
              className="p-4 flex items-center justify-between"
              style={{ background: "var(--gradient-gold)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary-foreground tracking-wide">INSTRROL Assistant</h3>
                  <p className="text-xs text-primary-foreground/70">Ask me anything!</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-72 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isBot ? "" : "flex-row-reverse"}`}
                >
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={14} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-3 max-w-[80%] ${
                      msg.isBot
                        ? "bg-secondary rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    <p className="text-sm font-body">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={14} className="text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-body"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "hsl(var(--primary-foreground))",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;
