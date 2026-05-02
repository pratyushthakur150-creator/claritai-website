import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Building, Sparkles, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiRequest } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', institute: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill required fields'); return; }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, institute: form.institute, password: form.password }) });
      localStorage.setItem('claritai_token', res.token);
      localStorage.setItem('claritai_user', JSON.stringify(res.user));
      toast.success('Account created! Welcome to ClaritAI.');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md mx-4 my-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#FF6B35] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Clarit<span className="text-[#2563EB]">AI</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600 text-sm">Start your free trial — no credit card required</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="reg-name" type="text" name="name" value={form.name} onChange={onChange} required placeholder="Pratyush Thakur" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900" /></div>
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="reg-email" type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@institute.com" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900" /></div>
            </div>
            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="reg-phone" type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900" /></div>
            </div>
            <div>
              <label htmlFor="reg-inst" className="block text-sm font-medium text-gray-700 mb-1.5">Institute Name</label>
              <div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="reg-inst" type="text" name="institute" value={form.institute} onChange={onChange} placeholder="Your coaching institute" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900" /></div>
            </div>
            <div>
              <label htmlFor="reg-pw" className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="reg-pw" type={showPw?'text':'password'} name="password" value={form.password} onChange={onChange} required placeholder="Min 8 characters" className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900" /><button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPw?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button></div>
            </div>
            <div>
              <label htmlFor="reg-cpw" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input id="reg-cpw" type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required placeholder="Repeat password" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all text-gray-900" /></div>
            </div>
            <motion.button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2" whileHover={{scale:loading?1:1.01}} whileTap={{scale:loading?1:0.99}}>
              {loading?<><Loader2 className="w-5 h-5 animate-spin"/>Creating account...</>:'Create Account'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/login" className="text-[#2563EB] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
