import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Phone, Mic, Calendar, 
  ChevronDown, Sparkles, Zap, Star, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Phone3D from '../components/Phone3D';

// Counter Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (hasAnimated) return;
    setCount(0);
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasAnimated]);
  
  return count;
}

const features = [
  { icon: Zap, title: '2-Minute Response', desc: 'Calls leads faster than any human team' },
  { icon: Mic, title: 'Human-Like Voice', desc: 'Natural conversations, not robotic' },
  { icon: Star, title: 'Intent Scoring', desc: 'AI rates lead quality automatically' },
  { icon: Calendar, title: 'Auto Scheduling', desc: 'Books demos in your calendar' },
  { icon: BarChart3, title: 'Full Transcripts', desc: 'Every word logged to CRM' },
  { icon: Clock, title: '24/7 Availability', desc: 'Calls anytime, including weekends' },
];

const faqs = [
  {
    question: 'What makes this the best AI calling solution?',
    answer: 'Our Voice AI is specifically trained for education sales. It understands JEE/NEET context, handles fee objections, and books demos with 95% accuracy. Plus, it integrates seamlessly with your existing CRM.',
  },
  {
    question: 'Can AI really handle admissions calls?',
    answer: 'Yes! Our AI handles 80% of admission queries autonomously. For complex questions, it smoothly transfers to your team with full context. Most students can\'t tell they\'re talking to AI.',
  },
  {
    question: 'How does this compare to manual calling?',
    answer: 'Manual calling: 2 days average response time, limited to working hours, inconsistent quality. Voice AI: 2 minutes response time, 24/7 availability, consistent scripting, automatic logging.',
  },
  {
    question: 'What languages does it support?',
    answer: 'Currently English and Hinglish ( Hindi + English mix). We\'re adding Hindi and regional languages soon based on demand.',
  },
];

export default function VoiceAI() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const daysCount = useCounter(2);
  const minutesCount = useCounter(2);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-sm font-medium text-[#FF6B35]">Voice AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Lead Just Filled a Form.
                <br />
                <span className="text-[#FF6B35]">Our AI Is Already Calling.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-xl">
                Calls in minutes, qualifies leads, books demos, and logs transcripts — 
                all automatically. Human-like conversations at AI speed.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Calls within 2 minutes of form submission',
                  'Qualifies intent with smart questions',
                  'Books demos directly in your calendar',
                  'Provides full conversation transcripts'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#FF6B35]" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-demo" className="px-8 py-4 bg-[#FF6B35] text-white font-semibold rounded-full btn-hover-lift flex items-center justify-center gap-2">
                  Hear Live Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#voice-pricing" className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all text-center">
                  View Pricing
                </a>
              </div>
            </motion.div>

            {/* Right - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <Phone3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Stat - 2 Days to 2 Minutes */}
      <section className="py-24 bg-gradient-to-r from-[#FF6B35] to-[#e55a2b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Response Time Transformation
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-8xl font-bold text-white/40 mb-2">
                {daysCount} Days
              </div>
              <p className="text-white/60">Average manual response</p>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              <ArrowRight className="w-12 h-12 md:w-16 md:h-16 rotate-90 md:rotate-0" />
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-8xl font-bold text-white mb-2">
                {minutesCount} Minutes
              </div>
              <p className="text-white/80">With ClaritAI Voice</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Voice AI Works
            </h2>
            <p className="text-gray-600">From form fill to demo booking — fully automated</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Flow */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Real Conversation
            </h2>
            <p className="text-gray-600">See how Voice AI qualifies and books demos</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="space-y-6">
              {[
                { speaker: 'AI', text: 'Hi Rahul! I\'m calling from Brilliant Academy. I see you\'re interested in our JEE Physics batch. Is now a good time?', delay: 0 },
                { speaker: 'Lead', text: 'Yes, tell me more about the schedule.', delay: 0.5 },
                { speaker: 'AI', text: 'Great! We have morning slots 7-9 AM and evening 6-8 PM. Which works better for you?', delay: 1 },
                { speaker: 'Lead', text: 'Evening would be better.', delay: 1.5 },
                { speaker: 'AI', text: 'Perfect! I can schedule a free demo for tomorrow 6 PM. Does that work?', delay: 2 },
                { speaker: 'Lead', text: 'Yes, that sounds good.', delay: 2.5 },
                { speaker: 'AI', text: 'Excellent! I\'ve booked your demo. You\'ll receive a confirmation SMS. Anything else I can help with?', delay: 3, highlight: true },
              ].map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: msg.delay * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex gap-4 ${msg.speaker === 'Lead' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.speaker === 'AI' ? 'bg-[#FF6B35]' : 'bg-gray-200'
                  }`}>
                    <span className="text-xs font-bold text-white">{msg.speaker === 'AI' ? 'AI' : 'R'}</span>
                  </div>
                  <div className={`max-w-[70%] px-5 py-3 rounded-2xl ${
                    msg.speaker === 'AI' 
                      ? 'bg-gray-100 text-gray-800 rounded-tl-md' 
                      : 'bg-[#FF6B35] text-white rounded-tr-md'
                  } ${msg.highlight ? 'ring-2 ring-[#FF6B35] ring-offset-2' : ''}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lead Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium mb-1">Lead Automatically Qualified</p>
                  <p className="text-xs text-green-600">High intent • Demo booked • CRM updated</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-700">92/100</p>
                  <p className="text-xs text-green-600">Lead Score</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="voice-pricing" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pay Per Minute, Not Per Head
            </h2>
            <p className="text-gray-600">Only pay for the calls we make</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBBF24]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span className="text-sm font-medium text-[#FBBF24]">Best Value</span>
            </div>

            <div className="mb-6">
              <span className="text-5xl md:text-6xl font-bold text-[#FF6B35]">₹18,000
              </span>
              <span className="text-gray-500"> / 1000 minutes</span>
            </div>

            <p className="text-gray-600 mb-2">
              ~₹18 per minute of AI calling
            </p>
            <p className="text-gray-500 text-sm mb-8">
              No setup fees. Unused minutes roll over for 3 months.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900">1000 mins</p>
                <p className="text-sm text-gray-600">₹18/min</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900">3000 mins</p>
                <p className="text-sm text-gray-600">₹16/min (Save 11%)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900">10000 mins</p>
                <p className="text-sm text-gray-600">₹14/min (Save 22%)</p>
              </div>
            </div>

            <Link to="/contact?type=voice" className="w-full md:w-auto px-12 py-4 bg-[#FF6B35] text-white font-semibold rounded-full btn-hover-lift inline-block text-center">
              Start with 100 Free Minutes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`accordion-content ${openFaq === i ? 'open' : ''}`}>
                  <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Call Every Lead in 2 Minutes?
          </h2>
          <p className="text-gray-400 mb-8">
            Start with 100 free minutes. No credit card required.
          </p>
          <Link to="/contact?type=voice" className="px-8 py-4 bg-[#FF6B35] text-white font-semibold rounded-full btn-hover-lift inline-block">
            Activate Voice AI
          </Link>
        </div>
      </section>
    </div>
  );
}
