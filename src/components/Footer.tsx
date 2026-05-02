import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Database, Clock, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Sia Chatbot', path: '/sia-chatbot' },
    { name: 'Voice AI', path: '/voice-ai' },
    { name: 'CRM Suite', path: '/crm-dashboard' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book a Demo', path: '/book-demo' },
  ],
};

const trustBadges = [
  { icon: Shield, label: 'DPDP Compliant' },
  { icon: Database, label: 'Data Control' },
  { icon: Clock, label: '7-Day Go-Live' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#FF6B35] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Clarit<span className="text-[#2563EB]">AI</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-6 max-w-xs">
              AI-powered lead conversion for coaching institutes. Never lose a student to delayed responses again.
            </p>
            <div className="space-y-3">
              <a href="mailto:s.pratyush@iitg.ac.in" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors">
                <Mail className="w-4 h-4" />
                s.pratyush@iitg.ac.in
              </a>
              <a href="tel:+918953960991" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors">
                <Phone className="w-4 h-4" />
                +91 8953960991
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                Gautam Buddh Nagar, Noida
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.linkedin.com/company/clarit-ai/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#0A66C2] rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all group" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://wa.me/918953960991" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#25D366] rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-600 hover:text-[#2563EB] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-600 hover:text-[#2563EB] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
            >
              <badge.icon className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-medium text-gray-700">{badge.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ClaritAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:s.pratyush@iitg.ac.in" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Support
            </a>
            <a href="https://www.linkedin.com/company/clarit-ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
