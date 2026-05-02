import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  chips?: string[];
  timestamp: number;
}

interface LeadState {
  name: string | null;
  email: string | null;
  phone: string | null;
  institute: string | null;
  interest: string | null;
  captured: boolean;
}

const STORAGE_KEY = 'claritai_chat';
const WELCOME_MSG = `👋 Hi! I'm the ClaritAI Assistant — an AI-powered chatbot just like the ones we build for coaching institutes.\n\nI can help you with:\n• **Product info** — Sia Chatbot, Voice AI, CRM Suite\n• **Pricing** — plans starting at ₹4,999/mo\n• **Book a demo** — see ClaritAI in action\n• **Any questions** about lead conversion for coaching institutes\n\nWhat would you like to know?`;

const WELCOME_CHIPS = ['🤖 How Sia Works', '💰 Pricing Plans', '📅 Book a Demo', '📞 Talk to Team'];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [leadState, setLeadState] = useState<LeadState>({ name: null, email: null, phone: null, institute: null, interest: null, captured: false });
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstOpen = useRef(true);

  // Load persisted state
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.messages?.length) setMessages(parsed.messages);
        if (parsed.leadState) setLeadState(prev => ({ ...prev, ...parsed.leadState }));
      }
    } catch {}
  }, []);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-40), leadState }));
    } catch {}
  }, [messages, leadState]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 400);
  }, [isOpen]);

  const genId = () => Math.random().toString(36).slice(2, 10);

  const addMessage = useCallback((role: 'user' | 'bot', text: string, chips?: string[]) => {
    setMessages(prev => [...prev, { id: genId(), role, text, chips, timestamp: Date.now() }]);
  }, []);

  const extractLead = (text: string) => {
    const phoneMatch = text.match(/(?:\+?91[\s-]?)?([6-9]\d{9})/);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const nameMatch = text.match(/(?:my name is|i'm|i am|this is|call me)\s+([A-Za-z][a-zA-Z]*(?:\s+[A-Za-z][a-zA-Z]*){0,2})/i);

    setLeadState(prev => ({
      ...prev,
      ...(phoneMatch && !prev.phone ? { phone: phoneMatch[1] } : {}),
      ...(emailMatch && !prev.email ? { email: emailMatch[0].toLowerCase() } : {}),
      ...(nameMatch && !prev.name ? { name: nameMatch[1].trim() } : {}),
    }));
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
    if (firstOpen.current && messages.length === 0) {
      firstOpen.current = false;
      setTimeout(() => {
        setShowWelcome(false);
        addMessage('bot', WELCOME_MSG, WELCOME_CHIPS);
      }, 1800);
    } else {
      setShowWelcome(false);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text || isTyping) return;
    setInput('');
    addMessage('user', text);
    extractLead(text);
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-10).map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })) }),
      });
      const data = await res.json();
      const botText = data.response || data.message || "I'm having trouble right now. Please try again or reach us at +91 8953960991!";

      // Parse chips from [chip1] [chip2] format
      const chipRegex = /\[([^\[\]]{1,60})\]/g;
      const chips: string[] = [];
      let match;
      while ((match = chipRegex.exec(botText)) !== null) chips.push(match[1].trim());
      const cleanText = botText.replace(chipRegex, '').replace(/\s{2,}/g, ' ').trim();

      await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
      setIsTyping(false);
      addMessage('bot', cleanText || botText, chips.length > 0 ? chips : undefined);

      if (!isOpen) setHasNewMessage(true);
    } catch {
      setIsTyping(false);
      addMessage('bot', "Oops — something went wrong! Please try again or call us at +91 8953960991 📞");
    }
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Launcher */}
      <motion.button
        onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
        className="fixed bottom-6 right-6 z-[9999] w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-2xl border-0 outline-none cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)' }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#2563EB' }} />}

        {/* New message dot */}
        {hasNewMessage && !isOpen && (
          <motion.span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF6B35] rounded-full border-2 border-white" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-[100px] right-6 z-[9999] w-[400px] max-h-[600px] h-[600px] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', border: '1px solid rgba(37,99,235,0.12)' }}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Welcome Splash */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div className="absolute inset-0 z-20 flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-4">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <motion.p className="text-white/90 text-sm font-medium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    ClaritAI Assistant is ready
                  </motion.p>
                  <motion.div className="flex gap-1 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-white/60" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="relative px-5 py-4 flex items-center gap-3 flex-shrink-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)' }}>
              {/* Shimmer */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-full w-full h-full animate-[shimmer_4s_ease-in-out_infinite]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
              </div>
              {/* Floating particles */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-white/15" style={{ top: `${20 + i * 20}%`, left: `${10 + i * 25}%`, animation: `float-slow ${5 + i}s ease-in-out infinite ${i * 0.5}s` }} />
              ))}

              <div className="relative z-10 w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <h3 className="text-white font-bold text-[15px] leading-tight">ClaritAI Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/80 text-xs">AI-Powered • Replies instantly</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="relative z-10 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:rotate-90">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollBehavior: 'smooth' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, x: msg.role === 'user' ? 12 : -12 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-2xl rounded-br-sm text-white font-medium shadow-lg'
                      : 'rounded-2xl rounded-bl-sm text-gray-800 border border-gray-100 shadow-sm'
                  }`} style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' } : { background: '#F9FAFB' }}>
                    <div dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                  </div>
                </motion.div>
              ))}

              {/* Chips */}
              {messages.length > 0 && messages[messages.length - 1].chips && (
                <motion.div className="flex flex-wrap gap-2 pl-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {messages[messages.length - 1].chips!.map((chip, i) => (
                    <motion.button
                      key={chip}
                      onClick={() => handleSend(chip)}
                      className="px-3.5 py-2 rounded-full text-xs font-medium border border-[#2563EB]/30 text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200 }}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-50 border border-gray-100 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-gray-400" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex gap-2.5 items-center bg-white/95 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask anything about ClaritAI..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-gray-400"
                maxLength={500}
                disabled={isTyping}
              />
              <motion.button
                onClick={() => handleSend()}
                disabled={isTyping || !input.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 transition-all"
                style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Powered by */}
            <div className="text-center py-2 text-[11px] text-gray-400 bg-white border-t border-gray-50 flex-shrink-0">
              Powered by <a href="/" className="text-[#2563EB] font-semibold hover:underline">ClaritAI</a> • AI-Powered Lead Conversion
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer { 0% { left: -100%; } 50% { left: 100%; } 100% { left: 100%; } }
        @media (max-width: 480px) {
          .fixed.bottom-\\[100px\\].right-6.w-\\[400px\\] {
            width: calc(100vw - 16px) !important;
            right: 8px !important;
            bottom: 88px !important;
            max-height: calc(100vh - 108px) !important;
            height: calc(100vh - 108px) !important;
          }
        }
      `}</style>
    </>
  );
}
