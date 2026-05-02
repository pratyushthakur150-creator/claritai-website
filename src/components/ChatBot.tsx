import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Smile, ThumbsUp, ThumbsDown, X, RotateCcw, Sparkles, ArrowDown } from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import {
  ConfettiBurst, TypewriterText, Particles, TypingIndicator,
  RippleButton, MessageBubble, BOT_AVATAR, BOT_AVATAR_LG
} from './chat/ChatHelpers';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

const BOT_NAME = 'Sia';
const STORAGE_KEY = 'claritai_chat_v2';
const WELCOME_REPLIES = ['AI Chatbot', 'CRM Platform', 'Voice Agent', 'Book a Demo'];

const BOT_RESPONSES: { text: string; replies: string[] }[] = [
  { text: "Our AI Chatbot lives on your website 24/7 — capturing leads, answering questions, and booking meetings while you sleep. Trained on YOUR business data so every reply is accurate and on-brand!", replies: ['Show me a demo', 'Chatbot pricing', 'How is it different?'] },
  { text: "Our CRM brings order to your sales pipeline. Track every lead from first touch to close, automate follow-ups, assign team members, and see real-time analytics — all in one dashboard.", replies: ['CRM features', 'CRM pricing', 'Book a demo'] },
  { text: "The Voice Agent handles your phone calls with natural-sounding AI. It qualifies inbound leads, makes outbound follow-up calls, books appointments, and transfers to a human rep when needed!", replies: ['Voice demo', 'Voice pricing', 'Get a quote'] },
  { text: "Great news — you can bundle all three! Sia Chatbot starts at ₹4,999/mo, CRM at ₹9,999/mo, and Voice Agent at ₹7,999/mo. Best value is our Complete Bundle at ₹14,999/mo. Want a custom quote?", replies: ['Bundle & save', 'Custom quote', 'Start free trial'] },
  { text: "Setup is lightning fast! The Chatbot can be live on your website in under 10 minutes. CRM onboarding takes about a day. We handle everything for you — no coding needed!", replies: ["Let's go!", 'Book a demo', 'Talk to sales'] },
  { text: "I'd love to connect you with our team! Book a free 30-minute demo — we'll show you exactly how ClaritAI works for your business. No pressure, no credit card required.", replies: ['Book free demo', 'Send me pricing', 'Just browsing'] },
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ratingMessageId, setRatingMessageId] = useState<number | null>(null);
  const [ratings, setRatings] = useState<Record<number, 'up' | 'down'>>({});
  const [sendPulse, setSendPulse] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [typingDone, setTypingDone] = useState(true);
  const [confetti, setConfetti] = useState<{ x: number; y: number } | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(Date.now());

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) { const p = JSON.parse(s); if (p.messages?.length) setMessages(p.messages); if (p.ratings) setRatings(p.ratings); }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-40), ratings })); } catch {}
  }, [messages, ratings]);

  useEffect(() => { if (typingDone) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping, typingDone]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 400); }, [isOpen]);

  const handleChatScroll = useCallback(() => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 80);
  }, []);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  const sendMessage = async (textOverride?: string) => {
    const text = textOverride || input.trim();
    if (!text) return;
    setInput(''); setQuickReplies([]);
    setSendPulse(true); setTimeout(() => setSendPulse(false), 500);

    const uid = ++msgId.current;
    const userMsg: Message = { id: uid, sender: 'user', text, timestamp: new Date().toISOString(), status: 'sent' };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => setMessages(prev => prev.map(m => m.id === uid ? { ...m, status: 'read' } : m)), 800);

    setIsTyping(true); setTypingDone(false);
    const delay = 1200 + Math.random() * 1200;

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-10).map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text })) }),
      });
      const data = await res.json();
      const raw = data.response || data.message || '';

      const chipRegex = /\[([^\[\]]{1,60})\]/g;
      const chips: string[] = []; let match;
      while ((match = chipRegex.exec(raw)) !== null) chips.push(match[1].trim());
      const clean = raw.replace(chipRegex, '').replace(/\s{2,}/g, ' ').trim();

      await new Promise(r => setTimeout(r, delay));
      setIsTyping(false);
      setMessages(prev => [...prev, { id: ++msgId.current, sender: 'bot', text: clean || raw, timestamp: new Date().toISOString() }]);
      const fallback = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      setQuickReplies(chips.length > 0 ? chips : fallback.replies);
    } catch {
      await new Promise(r => setTimeout(r, delay));
      setIsTyping(false);
      const fallback = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      setMessages(prev => [...prev, { id: ++msgId.current, sender: 'bot', text: fallback.text, timestamp: new Date().toISOString() }]);
      setQuickReplies(fallback.replies);
    }
  };

  const handleRate = (messageId: number, rating: 'up' | 'down', e?: React.MouseEvent) => {
    setRatings(prev => ({ ...prev, [messageId]: rating }));
    setRatingMessageId(null);
    if (rating === 'up' && e) { setConfetti({ x: e.clientX, y: e.clientY }); setTimeout(() => setConfetti(null), 1200); }
  };

  const clearChat = () => { setMessages([]); setRatings({}); setRatingMessageId(null); setQuickReplies([]); localStorage.removeItem(STORAGE_KEY); };

  const lastBotIdx = messages.map((m, i) => m.sender === 'bot' ? i : -1).filter(i => i >= 0).pop();

  const chipColors = [
    'border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-50 hover:shadow-blue-100/50',
    'border-purple-200 text-purple-600 bg-purple-50/50 hover:bg-purple-50 hover:shadow-purple-100/50',
    'border-orange-200 text-orange-600 bg-orange-50/50 hover:bg-orange-50 hover:shadow-orange-100/50',
    'border-pink-200 text-pink-600 bg-pink-50/50 hover:bg-pink-50 hover:shadow-pink-100/50',
  ];

  return (
    <>
      {confetti && <ConfettiBurst x={confetti.x} y={confetti.y} />}

      {/* ── Floating Launcher ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            data-cursor="chatbot"
            className="fixed bottom-8 right-8 cursor-none group z-50"
          >
            {/* Orbital rings */}
            <motion.div className="absolute inset-[-8px] rounded-full border-2 border-blue-400/20"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute inset-[-16px] rounded-full border border-purple-400/15"
              animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute inset-[-24px] rounded-full border border-orange-400/10"
              animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />

            {/* Avatar button */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #4A7CFF, #8B5CF6, #FF6B4A)' }}>
              <motion.div className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
              <img src={BOT_AVATAR} alt="Sia" className="w-10 h-10 rounded-full object-cover relative z-10 ring-2 ring-white/30" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white z-10">
                <motion.span className="absolute inset-0 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
              </span>
            </div>

            {/* Hi badge */}
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}
              className="absolute -top-1 -left-1 px-2 py-0.5 rounded-full text-white text-[9px] font-bold flex items-center justify-center z-20 ring-2 ring-white"
              style={{ background: 'linear-gradient(135deg, #4A7CFF, #FF6B4A)' }}>
              Hi!
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Widget ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 60, scale: 0.85, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            data-cursor="chatbot"
            className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[640px] max-h-[calc(100vh-3rem)] rounded-[28px] flex flex-col overflow-hidden z-50 cursor-none"
          >
            {/* Rainbow animated border */}
            <div className="absolute -inset-[1.5px] rounded-[28px] z-0 overflow-hidden">
              <motion.div className="w-[300%] h-[300%] absolute -top-[100%] -left-[100%]"
                style={{ background: 'conic-gradient(from 0deg, #4A7CFF, #8B5CF6, #FF6B4A, #EC4899, #06B6D4, #4A7CFF)' }}
                animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
            </div>

            <div className="relative z-10 bg-white rounded-[27px] flex flex-col h-full overflow-hidden">

              {/* Rating card */}
              <AnimatePresence>
                {ratingMessageId !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.9, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 14, scale: 0.9, filter: 'blur(4px)' }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-3 flex items-center gap-3"
                    style={{ boxShadow: '0 8px 32px rgba(74,124,255,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }}
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-700 font-semibold whitespace-nowrap">Was this helpful?</span>
                    <motion.button onClick={(e: any) => handleRate(ratingMessageId, 'up', e)}
                      whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}
                      className="p-2 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                    </motion.button>
                    <motion.button onClick={() => handleRate(ratingMessageId, 'down')}
                      whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
                      <ThumbsDown className="w-4 h-4 text-red-400" />
                    </motion.button>
                    <button onClick={() => setRatingMessageId(null)}
                      className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating controls */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                <motion.button onClick={clearChat} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center cursor-pointer hover:bg-white transition-colors" title="Clear chat">
                  <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                </motion.button>
                <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <X className="w-3.5 h-3.5 text-gray-500" />
                </motion.button>
              </div>

              {/* Messages area */}
              <div ref={chatContainerRef} onScroll={handleChatScroll}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-scroll relative">
                <Particles />

                {messages.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10">
                    <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="relative mb-5">
                      <motion.div className="absolute -inset-[3px] rounded-full"
                        style={{ background: 'conic-gradient(from 0deg, #4A7CFF, #8B5CF6, #FF6B4A, #EC4899, #06B6D4, #4A7CFF)' }}
                        animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
                      <img src={BOT_AVATAR_LG} alt="Sia" className="w-20 h-20 rounded-full object-cover relative z-10 ring-4 ring-white" />
                      <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white z-20">
                        <motion.span className="absolute inset-0 rounded-full bg-green-400"
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                      </span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      <h2 className="text-gray-900 font-bold text-xl tracking-tight">Hi, I'm {BOT_NAME}! 👋</h2>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-[260px] mx-auto">
                        I can help you explore our AI Chatbot, CRM, and Voice Agent — everything your business needs to capture leads and close deals. What are you looking for?
                      </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 mt-6 justify-center">
                      {WELCOME_REPLIES.map((q, i) => (
                        <motion.button key={q} onClick={() => sendMessage(q)}
                          whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + i * 0.08 }}
                          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold cursor-pointer border hover:shadow-lg transition-all ${chipColors[i]}`}>
                          {q}
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                ) : (
                  <>
                    {/* Chat header (inside messages) */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 px-2 py-2 mb-2">
                      <div className="relative">
                        <motion.div className="absolute -inset-[2px] rounded-full"
                          style={{ background: 'conic-gradient(from 0deg, #4A7CFF, #8B5CF6, #FF6B4A, #EC4899, #06B6D4, #4A7CFF)' }}
                          animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
                        <img src={BOT_AVATAR} alt="Sia" className="w-10 h-10 rounded-full object-cover relative z-10 ring-2 ring-white" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white z-20">
                          <motion.span className="absolute inset-0 rounded-full bg-green-400"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-bold text-sm tracking-tight">{BOT_NAME}</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-[11px] text-gray-400 font-medium">Online • Sales Assistant</span>
                        </div>
                      </div>
                    </motion.div>
                    <div className="relative px-2 mb-1">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    {messages.map((msg, idx) => (
                      <MessageBubble key={msg.id} msg={msg}
                        onRateClick={() => setRatingMessageId(ratingMessageId === msg.id ? null : msg.id)}
                        userRating={ratings[msg.id]}
                        isLatestBot={msg.sender === 'bot' && idx === lastBotIdx && !typingDone}
                        onTypingDone={() => setTypingDone(true)} />
                    ))}

                    <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

                    {/* Quick Replies — colorful */}
                    <AnimatePresence>
                      {quickReplies.length > 0 && typingDone && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="flex flex-wrap gap-2 pl-12">
                          {quickReplies.map((reply, i) => (
                            <motion.button key={reply} onClick={() => sendMessage(reply)}
                              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold cursor-pointer border hover:shadow-md transition-all ${chipColors[i % 4]}`}>
                              {reply}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Scroll to bottom button */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToBottom}
                    className="absolute bottom-24 right-6 z-30 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <ArrowDown className="w-4 h-4 text-gray-500" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* ── Input Bar ── */}
              <div className="px-3 pb-3 pt-2 relative z-10">
                {/* Animated gradient border wrapper */}
                <div className="relative rounded-2xl p-[1.5px] overflow-hidden">
                  {/* Animated border gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={input.trim()
                      ? { opacity: 1, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                      : { opacity: 0.4, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: 'linear-gradient(90deg, #4A7CFF, #8B5CF6, #FF6B4A, #EC4899, #06B6D4, #4A7CFF)',
                      backgroundSize: '300% 100%',
                    }}
                  />
                  {/* Inner container */}
                  <div className={`relative flex items-center gap-2 rounded-[14px] px-3 py-2.5 transition-all duration-300 ${
                    input.trim() ? 'bg-white' : 'bg-gray-50'
                  }`}
                    style={input.trim() ? { boxShadow: '0 4px 20px rgba(74,124,255,0.12)' } : {}}>

                    {/* Plus button — gradient on hover */}
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }} whileTap={{ scale: 0.85 }}
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      style={{ background: 'transparent' }}
                      onHoverStart={e => (e.target as HTMLElement).style.background = 'linear-gradient(135deg,rgba(74,124,255,0.12),rgba(139,92,246,0.12))'}
                      onHoverEnd={e => (e.target as HTMLElement).style.background = 'transparent'}
                    >
                      <Plus className="w-4 h-4 text-gray-400" />
                    </motion.button>

                    {/* Input field */}
                    <input
                      ref={inputRef} type="text" value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendMessage()}
                      placeholder="Message Sia..."
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none min-w-0 font-medium"
                    />

                    {/* Smile button */}
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: -15 }} whileTap={{ scale: 0.85 }}
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <Smile className="w-4 h-4 text-gray-400 hover:text-yellow-400 transition-colors" />
                    </motion.button>

                    {/* ── Send Button — the star of the show ── */}
                    <motion.button
                      onClick={() => sendMessage()} disabled={!input.trim()}
                      whileHover={input.trim() ? { scale: 1.08 } : {}}
                      whileTap={input.trim() ? { scale: 0.9 } : {}}
                      animate={input.trim() ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                      transition={input.trim() ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                      className="flex-shrink-0 relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer disabled:cursor-not-allowed overflow-hidden"
                      style={{
                        background: input.trim()
                          ? 'linear-gradient(135deg, #4A7CFF 0%, #8B5CF6 50%, #FF6B4A 100%)'
                          : '#e5e7eb',
                        boxShadow: input.trim()
                          ? '0 0 0 0 rgba(74,124,255,0.4), 0 4px 15px rgba(74,124,255,0.35)'
                          : 'none',
                      }}
                    >
                      {/* Shimmer sweep */}
                      {input.trim() && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
                        />
                      )}
                      {/* Pulse ring when active */}
                      {input.trim() && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          animate={{ boxShadow: ['0 0 0 0px rgba(74,124,255,0.5)', '0 0 0 6px rgba(74,124,255,0)'] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      {/* Custom animated arrow — key remounts after each send to reset state */}
                      <motion.div
                        key={sendPulse ? 'firing' : 'ready'}
                        className="relative z-10 flex items-center justify-center"
                        initial={sendPulse ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                        animate={sendPulse ? { x: 12, opacity: 0 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.25, ease: 'easeIn' }}
                      >
                        {/* Trail dots — breathe when active */}
                        {input.trim() && !sendPulse && (
                          <>
                            <motion.span
                              className="absolute rounded-full bg-white/55"
                              animate={{ opacity: [0, 0.55, 0], x: [0, -3] }}
                              transition={{ duration: 1.1, repeat: Infinity, delay: 0 }}
                              style={{ width: 4, height: 4, left: -10, top: '50%', marginTop: -2 }}
                            />
                            <motion.span
                              className="absolute rounded-full bg-white/35"
                              animate={{ opacity: [0, 0.35, 0], x: [0, -4] }}
                              transition={{ duration: 1.1, repeat: Infinity, delay: 0.18 }}
                              style={{ width: 3, height: 3, left: -16, top: '50%', marginTop: -1.5 }}
                            />
                          </>
                        )}

                        {/* Arrow SVG */}
                        <motion.svg
                          width="18" height="18" viewBox="0 0 18 18" fill="none"
                          animate={input.trim() && !sendPulse ? { x: [0, 1.5, 0] } : { x: 0 }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          {/* Shaft */}
                          <line x1="3" y1="9" x2="13" y2="9"
                            stroke={input.trim() ? 'white' : '#9ca3af'}
                            strokeWidth="2" strokeLinecap="round" />
                          {/* Head top */}
                          <line x1="9" y1="4.5" x2="14" y2="9"
                            stroke={input.trim() ? 'white' : '#9ca3af'}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          {/* Head bottom */}
                          <line x1="9" y1="13.5" x2="14" y2="9"
                            stroke={input.trim() ? 'white' : '#9ca3af'}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          {/* Pulsing tip dot */}
                          {input.trim() && (
                            <motion.circle cx="14.5" cy="9" r="1.3" fill="white"
                              animate={{ scale: [1, 1.7, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 0.85, repeat: Infinity }} />
                          )}
                        </motion.svg>
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                {/* Powered by — enhanced */}
                <div className="flex items-center justify-center mt-2 gap-1.5">
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }} className="w-1 h-1 rounded-full bg-blue-400" />
                  <span className="text-[10px] font-semibold tracking-wider" style={{ color: '#c0c0c8' }}>
                    Powered by <span className="text-transparent bg-clip-text font-bold"
                      style={{ backgroundImage: 'linear-gradient(135deg, #4A7CFF, #8B5CF6, #FF6B4A)' }}>ClaritAI</span>
                  </span>
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }} className="w-1 h-1 rounded-full bg-orange-400" />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
