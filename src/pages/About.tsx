import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Rocket, Bot, Phone, BarChart3, ArrowRight, Sparkles, GraduationCap, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl"/><div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-3xl"/></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#2563EB]"/><span className="text-sm font-medium text-[#2563EB]">About ClaritAI</span>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">We're Building the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#FF6B35]">Education Sales</span></motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-xl text-gray-600 max-w-3xl mx-auto">ClaritAI empowers coaching institutes across India to capture, nurture, and convert leads using AI — so no student is ever lost to a delayed response.</motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center mb-6"><Target className="w-7 h-7 text-[#2563EB]"/></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">To democratize AI-powered sales and CRM technology for India's coaching institutes. We believe every institute — whether 50 students or 5,000 — deserves the same powerful tools that large ed-tech companies use to convert leads.</p>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center mb-6"><Lightbulb className="w-7 h-7 text-[#FF6B35]"/></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">A world where no student misses the right coaching because the institute didn't respond fast enough. We envision AI as the bridge between student intent and institute response — making enrollment seamless and instant.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Problem We Solve</h2>
            <p className="text-gray-600 text-lg">India's ₹7 lakh crore coaching industry loses crores in revenue every year due to one simple problem:</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: 'Students Browse Late', desc: '67% of students research coaching at night when nobody is available to respond.', color: '#2563EB' },
              { icon: Heart, title: 'Leads Go Cold', desc: 'Average response time is 2 days. By then, the student has already enrolled elsewhere.', color: '#FF6B35' },
              { icon: Zap, title: 'Revenue Lost', desc: 'Every delayed response costs ₹50,000+ in lost enrollment fees. Multiply by hundreds of leads.', color: '#10B981' },
            ].map((item, i) => (
              <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.1}} viewport={{once:true}} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor:`${item.color}15`}}><item.icon className="w-7 h-7" style={{color:item.color}}/></div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-24 bg-gradient-to-r from-[#2563EB] via-[#1d4ed8] to-[#1e40af]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three Products, One Platform</h2>
            <p className="text-white/70">Everything a coaching institute needs for lead conversion</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Bot, name: 'Sia Chatbot', desc: '24/7 AI chatbot trained for JEE, NEET, CBSE. Captures leads instantly while you sleep.', link: '/sia-chatbot' },
              { icon: Phone, name: 'Voice AI', desc: 'Calls leads within 2 minutes. Qualifies, answers questions, books demos automatically.', link: '/voice-ai' },
              { icon: BarChart3, name: 'CRM Suite', desc: 'Full pipeline visibility with AI dropout prediction. See every student\'s journey.', link: '/crm-dashboard' },
            ].map((p, i) => (
              <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.15}} viewport={{once:true}}>
                <Link to={p.link} className="block bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all group h-full">
                  <p.icon className="w-10 h-10 text-white mb-4"/>
                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{p.desc}</p>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-semibold group-hover:gap-3 transition-all">Learn More <ArrowRight className="w-4 h-4"/></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built by Engineers, for Educators</h2>
          <p className="text-gray-600 text-lg mb-12">ClaritAI is founded by passionate individuals who understand both technology and the Indian education landscape.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { initial: 'A', name: 'Aman Saraswat', role: 'Founder', desc: 'Visionary entrepreneur driving ClaritAI\'s mission to democratize AI-powered admissions technology for every coaching institute in India.', gradient: 'from-[#2563EB] to-[#7C3AED]' },
              { initial: 'P', name: 'Piyush Kumar', role: 'CEO', desc: 'Strategic leader with deep expertise in ed-tech operations, scaling ClaritAI\'s platform to empower 550+ coaching institutes nationwide.', gradient: 'from-[#FF6B35] to-[#F59E0B]' },
              { initial: 'P', name: 'Pratyush Singh', role: 'Co-Founder', desc: 'IIT Guwahati alumnus passionate about using AI to transform how coaching institutes capture and convert student leads.', gradient: 'from-[#10B981] to-[#2563EB]' },
            ].map((member, i) => (
              <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.15}} viewport={{once:true}} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5`}>
                  <span className="text-2xl font-bold text-white">{member.initial}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#2563EB] font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
                <div className="mt-4">
                  <a href="https://www.linkedin.com/company/clarit-ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Admissions?</h2>
          <p className="text-gray-400 mb-8 text-lg">Join 550+ coaching institutes using ClaritAI. Start your free trial today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact?type=trial" className="px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">Start Free Trial</Link>
            <Link to="/book-demo" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all">Book a Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
