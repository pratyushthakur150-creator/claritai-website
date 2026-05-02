import { motion } from 'framer-motion';
import { Bot, MessageCircle, Clock, Send } from 'lucide-react';

interface Sia3DProps {
  showConversation?: boolean;
  variant?: 'floating' | 'phone' | 'dashboard';
}

const chatMessages = [
  { id: 1, type: 'user', text: 'Hi, do you have JEE crash courses?', delay: 0 },
  { id: 2, type: 'sia', text: 'Hello! Yes, we offer intensive JEE crash courses starting Jan 15th. Would you like the schedule?', delay: 0.5 },
  { id: 3, type: 'user', text: 'Yes please! And fees?', delay: 1 },
  { id: 4, type: 'sia', text: 'Sending details to your WhatsApp now ✓', delay: 1.5 },
];

export default function Sia3D({ showConversation = true, variant = 'floating' }: Sia3DProps) {
  if (variant === 'phone') {
    return (
      <div className="relative">
        {/* Phone Frame */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="phone-mockup bg-gray-900 p-3 w-[280px] sm:w-[320px]"
        >
          {/* Screen */}
          <div className="bg-white rounded-[32px] overflow-hidden h-[520px] sm:h-[580px] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sia</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online</span>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-3 overflow-hidden bg-gray-50">
              <div className="flex justify-center">
                <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">Today, 11:00 PM</span>
              </div>
              
              {showConversation && chatMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: msg.delay + 0.5, duration: 0.4 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.type === 'user' 
                      ? 'bg-[#2563EB] text-white rounded-br-md' 
                      : 'bg-white shadow-sm border border-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="flex justify-start"
              >
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent text-sm outline-none"
                  readOnly
                />
                <button className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-6 -right-6 w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center shadow-lg"
        >
          <Clock className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-4 -left-6 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100"
        >
          <span className="text-sm font-semibold text-[#FF6B35]">24/7 Active</span>
        </motion.div>
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Dashboard Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Sia Dashboard</h4>
                <p className="text-sm text-gray-500">Live conversations</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Live
            </span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Active Chats', value: '24', color: 'blue' },
              { label: 'Leads Today', value: '156', color: 'green' },
              { label: 'Conversion', value: '42%', color: 'coral' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-xl">
                <p className={`text-2xl font-bold ${
                  stat.color === 'blue' ? 'text-[#2563EB]' : 
                  stat.color === 'green' ? 'text-[#10B981]' : 'text-[#FF6B35]'
                }`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Chats */}
          <div className="space-y-3">
            {[
              { name: 'Rahul M.', query: 'JEE Physics batch inquiry', time: '2m ago', status: 'active' },
              { name: 'Priya S.', query: 'NEET crash course fees', time: '5m ago', status: 'resolved' },
              { name: 'Amit K.', query: 'CBSE Class 12 tuition', time: '8m ago', status: 'active' },
            ].map((chat, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
                  {chat.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{chat.name}</p>
                  <p className="text-xs text-gray-500">{chat.query}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{chat.time}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    chat.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {chat.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Floating variant (default)
  return (
    <div className="relative">
      {/* Main Sia Avatar */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="relative w-64 h-64 sm:w-80 sm:h-80"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 to-[#FF6B35]/20 rounded-full blur-3xl" />
        
        {/* Main Circle */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center shadow-2xl">
          {/* Inner Ring */}
          <div className="absolute inset-4 rounded-full border-2 border-white/20" />
          
          {/* Bot Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bot className="w-24 h-24 sm:w-32 sm:h-32 text-white" strokeWidth={1.5} />
          </motion.div>
          
          {/* Orbiting Dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
              style={{ animationDelay: `${i * 2}s` }}
            >
              <div 
                className={`absolute w-3 h-3 rounded-full ${
                  i === 0 ? 'bg-[#FF6B35]' : i === 1 ? 'bg-[#10B981]' : 'bg-[#FBBF24]'
                }`}
                style={{ 
                  top: '50%', 
                  left: i === 0 ? '-6px' : i === 1 ? 'calc(100% - 6px)' : '50%',
                  transform: 'translateY(-50%)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white rounded-full shadow-lg border border-gray-100 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-700">Sia is online</span>
        </motion.div>
      </motion.div>

      {/* Floating Chat Bubbles */}
      {showConversation && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -left-16 top-10 bg-white rounded-2xl rounded-tl-md shadow-lg p-3 max-w-[180px] border border-gray-100"
          >
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-[#2563EB] mt-0.5" />
              <p className="text-xs text-gray-700">Hi! Do you have JEE courses?</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-16 top-32 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] rounded-2xl rounded-tr-md shadow-lg p-3 max-w-[200px]"
          >
            <p className="text-xs text-white">Yes! We have JEE crash courses. Can I get your number?</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="absolute -left-12 bottom-20 bg-white rounded-2xl rounded-bl-md shadow-lg p-3 border border-gray-100"
          >
            <p className="text-xs text-gray-700 font-medium text-[#10B981]">✓ Lead captured!</p>
          </motion.div>
        </>
      )}

      {/* Time Badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-[#FF6B35] rounded-2xl flex flex-col items-center justify-center shadow-lg"
      >
        <Clock className="w-5 h-5 text-white mb-0.5" />
        <span className="text-xs font-bold text-white">11 PM</span>
      </motion.div>
    </div>
  );
}
