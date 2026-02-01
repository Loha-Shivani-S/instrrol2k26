import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

// Levenshtein distance for fuzzy matching
const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

const faqResponses: { keywords: string[]; response: string; matchThreshold?: number }[] = [
  {
    keywords: ["hello", "hi", "hey", "hola", "greetings", "good morning", "good afternoon"],
    response: "Hello! 👋 Welcome to INSTRROL 2K26. How can I help you today?",
  },
  {
    keywords: ["what is instrroll", "instrroll", "about instrroll", "what is this event", "theme", "symposium"],
    response: "INSTRROL 2K26 is a National Level Technical Symposium organized by the Department of Electronics and Instrumentation Engineering at Kongu Engineering College. It features technical and non-technical events, workshops, and more!",
  },
  {
    keywords: ["register", "registration", "sign up", "signup", "join", "how to register", "link"],
    response: "To register for events, simply scroll down to the Events section and click the 'Register Now' button on any event card. You'll be redirected to our official Google Form!",
  },
  {
    keywords: ["event", "events", "list", "schedule", "program", "competitions", "games"],
    response: "We have a mix of Technical and Fun events! \n\nTechnical: Visionary Boards, Algorithm Telephone, Idea Canvas, Think On Demand.\n\nFun: Brain Buzz, Pitch the Product, Ad & Meme, Mindflayer.\n\nCheck the Events section for full details!",
  },
  {
    keywords: ["date", "when", "time", "timing", "schedule", "duration"],
    response: "INSTRROL 2K26 is happening on February 18, 2026! 📅 The events run from 08:45 AM to 04:15 PM.",
  },
  {
    keywords: ["venue", "location", "where", "place", "address", "map"],
    response: "The event is held at C K Prahalad Seminar Hall, MBA Block, Kongu Engineering College, Perundurai.",
  },
  {
    keywords: ["contact", "email", "phone", "number", "reach", "help", "support"],
    response: "Need help? You can contact our coordinators:\nSruthi R: +91 97501 49999\nHarshini V: +91 99944 41632\n\nOr email us at: isoi.eie@kongu.edu",
  },
  {
    keywords: ["prize", "reward", "winning", "winner", "cash", "money", "awards"],
    response: "Yes! There are exciting prizes and certificates for winners. We also have special awards like Best Crew, Mr. EIE, and Ms. EIE! 🏆",
  },
  {
    keywords: ["smart factory", "industry 4.0", "3d", "demo"],
    response: "Don't miss our Smart Factory Environment! It's an interactive 3D showcase of Industry 4.0 concepts. Click 'Smart Factory' in the menu to explore it.",
  },
  {
    keywords: ["food", "lunch", "snacks", "eating", "refreshment"],
    response: "Please note that lunch and snacks will NOT be provided by the team. Participants are requested to make their own arrangements. 🍽️",
  },
  {
    keywords: ["fee", "cost", "price", "amount", "charge", "free"],
    response: "Registration information and fee details (if any) are available on the registration form. Click 'Register Now' to check!",
  },
  {
    keywords: ["team", "size", "group", "track", "individual"],
    response: "Most events allow team participation (2-3 members), while some like 'Idea Canvas' or 'Pitch the Product' can be individual. Check the specific event rules in the Events section.",
  },
  {
    keywords: ["certificate", "certification", "participation"],
    response: "All registered participants will receive a certificate of participation. Winners will receive merit certificates! 📜",
  },
  {
    keywords: ["thanks", "thank you", "bye", "goodbye", "cool", "awesome"],
    response: "You're very welcome! If you have more questions, just ask. Can't wait to see you there! 🎉",
  }
];

const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase().trim();

  // 1. Direct checks
  if (lowerInput.length < 2) return "Could you please be a bit more specific?";

  let bestMatch = {
    response: "",
    score: Infinity
  };

  // 2. Fuzzy Matching
  for (const faq of faqResponses) {
    for (const keyword of faq.keywords) {

      // Exact substring match (highest priority)
      if (lowerInput.includes(keyword)) {
        return faq.response;
      }

      // Levenshtein distance match (for typos)
      // We allow a distance of roughly 20% of the keyword length (so "evnts" matches "events")
      const distance = levenshteinDistance(lowerInput, keyword);
      const threshold = Math.max(2, Math.floor(keyword.length * 0.3));

      // Also check if any WORD in the input matches a keyword closely
      const inputWords = lowerInput.split(" ");
      for (const word of inputWords) {
        const wordDist = levenshteinDistance(word, keyword);
        if (wordDist <= 2 && word.length > 3) {
          return faq.response;
        }
      }

      if (distance <= threshold && distance < bestMatch.score) {
        bestMatch = {
          response: faq.response,
          score: distance
        };
      }
    }
  }

  if (bestMatch.response && bestMatch.score < Infinity) {
    return bestMatch.response;
  }

  return "I'm not entirely sure about that yet. 🤖 You can ask me about:\n\n• Registration & Fees\n• Event Schedule & Dates\n• Venue Location\n• Contact Details";
};

const suggestions = [
  "How do I register?",
  "What are the events?",
  "Where is the venue?",
  "Contact details",
];

const FloatingChatbot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to INSTRROL 2K26. I can answer your questions even offline! What would you like to know?",
      isBot: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendMessage = (text: string = message) => {
    if (text.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: text,
        isBot: false,
      };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: getResponse(text),
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 600);
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
              className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp size={20} />
            </motion.button>

            <motion.div className="relative">
              <motion.button
                onClick={() => setIsChatOpen(true)}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative z-10"
                style={{
                  background: "var(--gradient-gold)",
                  color: "hsl(var(--primary-foreground))",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(255, 165, 0, 0.4)", "0 0 0 10px rgba(255, 165, 0, 0)", "0 0 0 0 rgba(255, 165, 0, 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle size={24} />
              </motion.button>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            </motion.div>
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
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col max-h-[600px]"
            style={{ background: "hsl(var(--card))" }}
          >
            {/* Chat Header */}
            <div
              className="p-4 flex items-center justify-between flex-shrink-0"
              style={{ background: "var(--gradient-gold)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary-foreground tracking-wide">INSTRROL Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-primary-foreground/90 font-medium">Online</p>
                  </div>
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
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isBot ? "" : "flex-row-reverse"}`}
                >
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle size={14} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-3 max-w-[85%] text-sm font-body leading-relaxed shadow-sm ${msg.isBot
                      ? "bg-secondary rounded-tl-none border border-border/50 text-foreground"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                      }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle size={14} className="text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-none p-4 w-16">
                    <div className="flex gap-1 justify-center">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & Input */}
            <div className="p-4 border-t border-border bg-card flex-shrink-0">
              {/* Suggestions Chips */}
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary border border-primary/20 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about events, dates..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-body transition-all"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "hsl(var(--primary-foreground))",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!message.trim()}
                >
                  <Send size={18} />
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
