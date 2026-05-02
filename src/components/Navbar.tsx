import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Sia Chatbot', path: '/sia-chatbot' },
  { name: 'Voice AI', path: '/voice-ai' },
  { name: 'CRM Suite', path: '/crm-dashboard' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('claritai_token');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('claritai_token');
    localStorage.removeItem('claritai_user');
    navigate('/');
    window.location.reload();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-cursor="Home">
            <motion.div
              className="relative w-10 h-10"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg viewBox="0 0 45 40" className="w-full h-full">
                <defs>
                  <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB"/>
                    <stop offset="100%" stopColor="#FF6B35"/>
                  </linearGradient>
                </defs>
                <path
                  d="M20 5 C 10 5, 5 12, 5 20 C 5 32, 12 38, 20 38 C 28 38, 32 33, 32 28 L 28 28 C 28 31, 25 34, 20 34 C 15 34, 10 30, 10 20 C 10 14, 14 9, 20 9 C 25 9, 28 12, 28 16 L 32 16 C 32 10, 28 5, 20 5 Z"
                  fill="url(#navLogoGrad)"
                />
                <circle cx="38" cy="12" r="3" fill="#2563EB"/>
                <circle cx="38" cy="20" r="3" fill="#FF6B35"/>
                <circle cx="38" cy="28" r="3" fill="#10B981"/>
              </svg>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Clarit<span className="text-[#2563EB]">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/50 rounded-full p-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-cursor={link.name}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-white bg-[#2563EB] shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignOut}
                  data-cursor="Logout"
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </motion.button>
                <Link to="/contact?type=trial">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="Go!"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Dashboard
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="Login"
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/contact?type=trial">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="Go!"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Free
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      location.pathname === link.path ? 'bg-[#2563EB] text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                {isLoggedIn ? (
                  <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full py-3 text-base font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                    Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-3 text-base font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                      Sign In
                    </button>
                  </Link>
                )}
                <Link to="/contact?type=trial" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white text-base font-semibold rounded-xl mt-2">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
