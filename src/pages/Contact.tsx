import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, Bot, BarChart3, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiRequest } from '../services/api';

const interestOptions = [
  { value: 'sia', label: 'Sia Chatbot' },
  { value: 'voice', label: 'Voice AI' },
  { value: 'crm', label: 'CRM Suite' },
  { value: 'suite', label: 'Full Suite' },
  { value: 'other', label: 'Other / General' },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preType = searchParams.get('type') || '';
  const preplan = searchParams.get('plan') || '';
  const [form, setForm] = useState({ name:'', email:'', phone:'', institute:'', city:'', interest: preType||preplan||'', message:'' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p=>({...p,[e.target.name]:e.target.value}));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.name||!form.email||!form.phone){toast.error('Please fill required fields');return;}
    setSubmitting(true);
    try { await apiRequest('/api/contact',{method:'POST',body:JSON.stringify({...form,source:`contact-page-${preType}`})}); setDone(true); toast.success('Message sent! We\'ll respond within 24 hours.'); }
    catch { toast.error('Failed to send. Please WhatsApp us directly.'); }
    finally { setSubmitting(false); }
  };

  if(done) return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="text-center max-w-md mx-auto px-6">
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:0.2}} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600"/>
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-2">Your message has been sent successfully.</p>
        <p className="text-gray-500 text-sm mb-8">We'll respond within 24 hours at <strong>{form.email}</strong></p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/918953960991" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full">Chat on WhatsApp</a>
          <a href="/" className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-full">Back to Home</a>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl"/><div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-3xl"/></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-4">
              <Mail className="w-4 h-4 text-[#2563EB]"/><span className="text-sm font-medium text-[#2563EB]">Get in Touch</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Let's Grow Your Institute Together</motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-lg text-gray-600 max-w-2xl mx-auto">Fill out the form and our team will reach out within 24 hours.</motion.p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:0.3}} className="lg:col-span-2">
              <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{preType==='trial'?'Start Your Free Trial':preType==='sia'?'Get Sia Chatbot':preType==='voice'?'Activate Voice AI':preType==='suite'?'Get Full Suite':'Send Us a Message'}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label htmlFor="c-name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label><input id="c-name" type="text" name="name" value={form.name} onChange={onChange} required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900"/></div>
                  <div><label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label><input id="c-email" type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@institute.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900"/></div>
                  <div><label htmlFor="c-phone" className="block text-sm font-medium text-gray-700 mb-2">Phone *</label><input id="c-phone" type="tel" name="phone" value={form.phone} onChange={onChange} required placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900"/></div>
                  <div><label htmlFor="c-inst" className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label><input id="c-inst" type="text" name="institute" value={form.institute} onChange={onChange} placeholder="Your coaching institute" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900"/></div>
                  <div><label htmlFor="c-city" className="block text-sm font-medium text-gray-700 mb-2">City</label><input id="c-city" type="text" name="city" value={form.city} onChange={onChange} placeholder="e.g. Delhi, Mumbai" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900"/></div>
                  <div><label htmlFor="c-int" className="block text-sm font-medium text-gray-700 mb-2">Interested in</label><select id="c-int" name="interest" value={form.interest} onChange={onChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900 bg-white"><option value="">Select a product</option>{interestOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
                </div>
                <div className="mt-6"><label htmlFor="c-msg" className="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea id="c-msg" name="message" value={form.message} onChange={onChange} rows={4} placeholder="Tell us about your institute..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900 resize-none"/></div>
                <motion.button type="submit" disabled={submitting} className="mt-6 w-full py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50" whileHover={{scale:submitting?1:1.01}} whileTap={{scale:submitting?1:0.99}}>
                  {submitting?<><Loader2 className="w-5 h-5 animate-spin"/>Sending...</>:<><Send className="w-5 h-5"/>Send Message</>}
                </motion.button>
              </form>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.4}} className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Details</h3>
                <div className="space-y-5">
                  <a href="mailto:s.pratyush@iitg.ac.in" className="flex items-start gap-4 group"><div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-[#2563EB]"/></div><div><p className="text-sm text-gray-500">Email</p><p className="text-gray-900 font-medium group-hover:text-[#2563EB] transition-colors">s.pratyush@iitg.ac.in</p></div></a>
                  <a href="tel:+918953960991" className="flex items-start gap-4 group"><div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#FF6B35]"/></div><div><p className="text-sm text-gray-500">Phone</p><p className="text-gray-900 font-medium group-hover:text-[#FF6B35] transition-colors">+91 8953960991</p></div></a>
                  <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-[#10B981]"/></div><div><p className="text-sm text-gray-500">Office</p><p className="text-gray-900 font-medium">Gautam Buddh Nagar, Noida</p></div></div>
                  <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-[#FBBF24]/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-[#FBBF24]"/></div><div><p className="text-sm text-gray-500">Response Time</p><p className="text-gray-900 font-medium">Within 24 hours</p></div></div>
                </div>
              </div>
              <a href="https://wa.me/918953960991" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-3xl p-8 text-white hover:shadow-xl transition-all group">
                <h3 className="text-xl font-bold mb-2">WhatsApp Us</h3>
                <p className="text-white/80 text-sm mb-4">Get instant responses. Available Mon-Sat, 9 AM - 8 PM.</p>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">Chat Now <ArrowRight className="w-4 h-4"/></div>
              </a>
              <a href="/book-demo" className="block bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-3xl p-8 text-white hover:shadow-xl transition-all group">
                <h3 className="text-xl font-bold mb-2">Prefer a Call?</h3>
                <p className="text-white/80 text-sm mb-4">Schedule a free 30-min demo with our team.</p>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">Book a Demo <ArrowRight className="w-4 h-4"/></div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
