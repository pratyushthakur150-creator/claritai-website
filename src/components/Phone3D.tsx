import { motion } from 'framer-motion';
import { Phone, Mic, PhoneCall, Calendar, Star, Clock, CheckCircle } from 'lucide-react';

export default function Phone3D() {
  return (
    <div className="relative">
      {/* Phone Mockup */}
      <motion.div
        initial={{ y: 50, opacity: 0, rotateY: -15 }}
        animate={{ y: 0, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="phone-mockup bg-gray-900 p-3 w-[300px] sm:w-[340px] transform perspective-1000"
      >
        {/* Screen */}
        <div className="bg-white rounded-[32px] overflow-hidden h-[580px] sm:h-[640px] flex flex-col">
          {/* Status Bar */}
          <div className="bg-gray-900 px-6 py-3 flex justify-between items-center">
            <span className="text-white text-xs">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-white/20" />
              <div className="w-4 h-4 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Call Interface */}
          <div className="flex-1 bg-gradient-to-b from-gray-50 to-white p-4">
            {/* Incoming Call Header */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-center mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center mb-3">
                <PhoneCall className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">AI Voice Assistant</h3>
              <p className="text-sm text-gray-500">Calling lead: Rahul Sharma</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Live Call</span>
              </div>
            </motion.div>

            {/* Live Transcript */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Mic className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-semibold text-gray-700">Live Transcript</span>
                <span className="ml-auto text-xs text-[#2563EB] font-medium">2:34</span>
              </div>
              
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-semibold">AI</div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 py-2">
                    <p className="text-xs text-gray-700">Hello Rahul! I see you're interested in our JEE Physics batch. Is now a good time?</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-2 justify-end"
                >
                  <div className="bg-[#2563EB] rounded-2xl rounded-tr-md px-3 py-2">
                    <p className="text-xs text-white">Yes, please tell me more about the schedule.</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#FF6B35] flex-shrink-0 flex items-center justify-center text-xs font-semibold text-white">R</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-semibold">AI</div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 py-2">
                    <p className="text-xs text-gray-700">Perfect! We have morning 7-9 AM and evening 6-8 PM slots. Which works better?</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Lead Score Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/5 rounded-xl p-3 border border-[#10B981]/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#FBBF24]" />
                  <span className="text-xs font-semibold text-gray-700">Lead Score</span>
                </div>
                <span className="text-lg font-bold text-[#10B981]">85/100</span>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-[#2563EB]/10 text-[#2563EB] rounded-full">High Intent</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] rounded-full">Qualified</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-3 bg-gray-100 rounded-xl"
              >
                <Calendar className="w-5 h-5 text-[#2563EB]" />
                <span className="text-[10px] font-medium text-gray-600">Book Demo</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-3 bg-gray-100 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                <span className="text-[10px] font-medium text-gray-600">Qualify</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-3 bg-gray-100 rounded-xl"
              >
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-[10px] font-medium text-gray-600">Follow-up</span>
              </motion.button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-center">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Floating Stats */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">2 min</p>
            <p className="text-xs text-gray-500">Response time</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] rounded-2xl shadow-xl p-4"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold text-white">Demo Booked!</span>
        </div>
      </motion.div>
    </div>
  );
}
