import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Bot, MessageCircle, 
  ChevronDown, Sparkles, Zap, Shield, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sia3D from '../components/Sia3D';

// Counter Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return count;
}

const features = [
  { icon: Zap, title: 'Instant Replies', desc: 'Sub-second response time, 24/7' },
  { icon: CheckCircle, title: 'Auto Lead Capture', desc: 'Collects name, phone, course interest' },
  { icon: Bot, title: 'JEE/NEET/CBSE Trained', desc: 'Understands education queries natively' },
  { icon: Users, title: 'Human Handoff', desc: 'Seamless transfer to your team' },
  { icon: Clock, title: '5-Min Install', desc: 'One line of code, or WhatsApp link' },
  { icon: Shield, title: 'DPDP Compliant', desc: 'Data privacy built-in' },
];

const faqs = [
  {
    question: 'What makes Sia the best chatbot for coaching institutes?',
    answer: 'Sia is trained specifically on education conversations. She understands JEE, NEET, CBSE terminology, course structures, and student psychology. Unlike generic chatbots, she speaks the language of Indian education.',
  },
  {
    question: 'How is Sia different from Tidio or Intercom?',
    answer: 'Tidio and Intercom are generic tools. Sia is purpose-built for coaching institutes with pre-trained responses for JEE/NEET/CBSE queries, lead qualification flows, and native CRM integration. Plus, we understand Indian context and pricing.',
  },
  {
    question: 'Does it work on PHP websites?',
    answer: 'Absolutely! Sia works with any website platform - PHP, WordPress, React, Angular, or plain HTML. Just paste one line of code and you\'re live. We also provide WhatsApp integration that needs zero coding.',
  },
  {
    question: 'Can we customize the responses?',
    answer: 'Yes! You can customize greetings, responses, and conversation flows. Our AI learns your specific courses, fees, and policies to provide accurate answers. You can also set up custom qualification questions.',
  },
];

export default function SiaChatbot() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const leadCount = useCounter(156);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-6">
                <Bot className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm font-medium text-[#2563EB]">Sia Chatbot</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Never Lose a Lead at{' '}
                <span className="text-[#FF6B35]">11 PM</span> Again.
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-xl">
                Sia captures lead data and logs it to your CRM automatically. 
                She answers questions, qualifies prospects, and works 24/7 while you sleep.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Instant responses to student queries',
                  'Auto-captures contact & course interest',
                  'Integrates with your existing CRM',
                  'Trained for JEE, NEET, CBSE questions'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact?type=sia" className="px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-full btn-hover-lift flex items-center justify-center gap-2">
                  Add Sia Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/book-demo" className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#2563EB] hover:text-[#2563EB] transition-all text-center">
                  See Demo
                </Link>
              </div>
            </motion.div>

            {/* Right - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <Sia3D variant="phone" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in a Chatbot
            </h2>
            <p className="text-gray-600">Built specifically for coaching institutes</p>
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
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The 11 PM Problem → Solved
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-3xl p-8 border border-red-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-700">Without Sia</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Student visits at 11 PM with JEE query',
                  'No response for 12+ hours',
                  'Lead loses interest',
                  'Goes to competitor who responded faster',
                  'Lost revenue: ₹50,000+ per lead'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-xs">✗</span>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-3xl p-8 border border-green-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-700">With Sia</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Student visits at 11 PM with JEE query',
                  'Sia responds instantly with course info',
                  'Captures phone, email, preferred batch',
                  'Logs to CRM with lead score 85/100',
                  'Voice AI calls next morning, books demo'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-24 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80">Live Performance</span>
            </div>
            <div className="text-6xl md:text-7xl font-bold text-white mb-4">
              {leadCount}
            </div>
            <p className="text-white/80 text-lg">Leads captured by Sia just today</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-gray-600">One plan, everything included</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span className="text-sm font-medium text-[#2563EB]">Most Popular</span>
            </div>

            <div className="mb-6">
              <span className="text-5xl md:text-6xl font-bold text-[#2563EB]">₹5,000</span>
              <span className="text-gray-500">/month</span>
            </div>

            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Everything you need to capture and qualify leads 24/7. 
              No setup fee, no hidden charges.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
                <CheckCircle className="w-4 h-4" /> No setup fee
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
                <CheckCircle className="w-4 h-4" /> No lock-in
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
                <CheckCircle className="w-4 h-4" /> Cancel anytime
              </span>
            </div>

            <Link to="/contact?type=trial" className="w-full md:w-auto px-12 py-4 bg-[#2563EB] text-white font-semibold rounded-full btn-hover-lift inline-block text-center">
              Start Free Trial
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
            Ready to Capture Every Lead?
          </h2>
          <p className="text-gray-400 mb-8">
            Start your free trial today. Setup takes 5 minutes.
          </p>
          <Link to="/contact?type=sia" className="px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-full btn-hover-lift inline-block">
            Add Sia to Your Website
          </Link>
        </div>
      </section>
    </div>
  );
}
