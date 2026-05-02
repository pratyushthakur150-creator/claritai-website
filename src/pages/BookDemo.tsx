import { motion } from 'framer-motion';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CALENDLY_URL = 'https://calendly.com/pratyushthakur150/30min';

export default function BookDemo() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl"/><div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-3xl"/></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-[#2563EB]"/><span className="text-sm font-medium text-[#2563EB]">Book a Demo</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Schedule a Free Demo</motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-lg text-gray-600 max-w-2xl mx-auto">Pick a time that works for you. Our team will walk you through ClaritAI's products and answer all your questions in a 30-minute call.</motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Calendly Embed */}
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <iframe
                  src={CALENDLY_URL}
                  style={{ width: '100%', height: '700px', border: 'none' }}
                  title="Schedule a demo with ClaritAI"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Side Info */}
            <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.4}} className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    'Live product walkthrough',
                    'Custom setup for your institute',
                    'Pricing discussion',
                    'Q&A with our team',
                    'No obligation — zero pressure',
                  ].map((item, i) => (
                    <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:0.5+i*0.1}} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0"/>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Prefer to chat instead?</h3>
                <p className="text-white/80 text-sm mb-4">Reach out via WhatsApp or fill our contact form for a quick response.</p>
                <div className="space-y-3">
                  <a href="https://wa.me/918953960991" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                    WhatsApp Us <ArrowRight className="w-4 h-4"/>
                  </a>
                  <Link to="/contact" className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                    Contact Form <ArrowRight className="w-4 h-4"/>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Demo Duration', value: '30 minutes' },
                    { label: 'Setup Time', value: '5 minutes' },
                    { label: 'Go Live', value: '7 days' },
                    { label: 'Cost to Start', value: 'Free trial' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{s.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
