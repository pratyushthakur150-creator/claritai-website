import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Play, Bot, Phone, BarChart3, CheckCircle, 
  ChevronDown, Star, Shield, Zap, Clock, Users, Sparkles,
  MoveHorizontal, TrendingUp, MessageCircle, Calendar,
  AlertCircle, Target, RefreshCw, Award, Rocket, MousePointer2,
  CheckSquare, ArrowUpRight, Layers, Cpu, Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Enhanced3DSia from '../components/Enhanced3DSia';
import Sia3D from '../components/Sia3D';
import Phone3D from '../components/Phone3D';
import Dashboard3D from '../components/Dashboard3D';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import TextReveal, { TextScramble, WordReveal } from '../components/TextReveal';
import ParallaxContainer from '../components/ParallaxContainer';
import AnimatedCounter from '../components/AnimatedCounter';
import { FloatingParticles, GradientOrbs } from '../components/FloatingElements';
import { useMouseAnimation } from '../components/AnimationProvider';

// Staggered children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

// Animated Marquee Trust Ticker
function TrustTicker() {
  const items = [
    { text: '20,000+ Students', icon: Users, color: '#2563EB' },
    { text: '550+ Tutors', icon: Sparkles, color: '#FF6B35' },
    { text: '5-min setup', icon: Zap, color: '#10B981' },
    { text: 'No setup fees', icon: CheckCircle, color: '#FBBF24' },
    { text: 'DPDP compliant', icon: Shield, color: '#2563EB' },
    { text: 'PHP/Python ready', icon: Cpu, color: '#FF6B35' },
    { text: '24/7 Support', icon: Clock, color: '#10B981' },
    { text: '7-day go-live', icon: Target, color: '#FBBF24' },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-10 pointer-events-none" />
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
          className="flex gap-12 shrink-0"
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-3 shrink-0 cursor-pointer"
              whileHover={{ scale: 1.1, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </motion.div>
              <span className="text-lg font-bold text-white whitespace-nowrap">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// 3D Product Cards with enhanced animations
function ProductCards() {
  const products = [
    {
      icon: Bot,
      name: 'Sia Chatbot',
      price: '₹5k',
      period: '/mo',
      description: '24/7 lead capture with instant AI responses. Trained for JEE, NEET, CBSE queries.',
      features: ['Instant replies', 'Lead qualification', 'CRM sync', 'Human handoff'],
      color: '#2563EB',
      gradient: 'from-blue-500 to-indigo-600',
      shadowColor: 'rgba(37, 99, 235, 0.4)',
      link: '/sia-chatbot',
      badge: 'Most Popular',
      iconBg: 'bg-blue-500/10',
    },
    {
      icon: Phone,
      name: 'Voice AI',
      price: '₹18k',
      period: '/1000 min',
      description: 'AI calls leads within 2 minutes. Qualifies, answers questions, books demos.',
      features: ['2-min response', 'Human-like voice', 'Auto scheduling', 'Transcripts'],
      color: '#FF6B35',
      gradient: 'from-orange-500 to-red-600',
      shadowColor: 'rgba(255, 107, 53, 0.4)',
      link: '/voice-ai',
      badge: 'Best Value',
      iconBg: 'bg-orange-500/10',
    },
    {
      icon: BarChart3,
      name: 'CRM Suite',
      price: '₹15k',
      period: '/mo',
      description: 'Complete pipeline visibility with AI dropout prediction and risk alerts.',
      features: ['Pipeline view', 'Risk alerts', 'Analytics', 'API access'],
      color: '#10B981',
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      link: '/crm-dashboard',
      badge: 'Full Suite',
      iconBg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 perspective-1000">
      {products.map((product, i) => (
        <TiltCard key={product.name} tiltAmount={10} glareEnabled={true}>
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link to={product.link}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden"
                style={{
                  boxShadow: `0 25px 50px -12px ${product.shadowColor}`,
                }}
              >
                {/* Animated background gradient */}
                <motion.div 
                  className={`absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 bg-gradient-to-br ${product.gradient} blur-3xl`}
                  whileHover={{ opacity: 0.2, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />

                {/* Badge */}
                <motion.div 
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white z-10"
                  style={{ backgroundColor: product.color }}
                  initial={{ opacity: 0, x: 20, rotate: 10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                >
                  {product.badge}
                </motion.div>

                {/* Icon with 3D effect */}
                <motion.div 
                  className={`relative w-20 h-20 rounded-2xl mb-6 flex items-center justify-center ${product.iconBg}`}
                  style={{ 
                    border: `2px solid ${product.color}20`,
                    transform: 'translateZ(30px)',
                  }}
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <product.icon className="w-10 h-10" style={{ color: product.color }} />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ transform: 'translateZ(20px)' }}>
                  {product.name}
                </h3>
                
                <div className="flex items-baseline gap-1 mb-4" style={{ transform: 'translateZ(25px)' }}>
                  <motion.span 
                    className="text-4xl font-bold"
                    style={{ color: product.color }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {product.price}
                  </motion.span>
                  <span className="text-gray-500">{product.period}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed" style={{ transform: 'translateZ(15px)' }}>
                  {product.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6" style={{ transform: 'translateZ(10px)' }}>
                  {product.features.map((feature, fi) => (
                    <motion.div 
                      key={fi} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + fi * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: product.color }}
                        whileHover={{ scale: 2 }}
                      />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div 
                  className="flex items-center gap-2 font-semibold text-sm"
                  style={{ color: product.color, transform: 'translateZ(30px)' }}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Explore {product.name}
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  );
}

// Interactive Before/After Slider
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  const beforeItems = [
    { icon: Clock, text: 'Student visits at 11 PM', color: '#FF6B35' },
    { icon: MessageCircle, text: 'No response for hours', color: '#FF6B35' },
    { icon: AlertCircle, text: 'Lead loses interest', color: '#FF6B35' },
    { icon: TrendingUp, text: 'Goes to competitor', color: '#FF6B35' },
    { icon: Target, text: 'Lost revenue: ₹50,000+', color: '#FF6B35' },
  ];

  const afterItems = [
    { icon: Zap, text: 'Instant AI response at 11 PM', color: '#10B981' },
    { icon: Bot, text: 'Sia captures all details', color: '#2563EB' },
    { icon: BarChart3, text: 'Auto-logged to CRM', color: '#2563EB' },
    { icon: Phone, text: 'Voice AI calls by 9 AM', color: '#FF6B35' },
    { icon: Calendar, text: 'Demo booked automatically', color: '#10B981' },
  ];

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="p-8 md:p-12">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4"
          >
            <MousePointer2 className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Interactive Comparison</span>
          </motion.div>
          <TextReveal>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              The ClaritAI Difference
            </h3>
          </TextReveal>
          <p className="text-gray-600 text-lg">Drag to see the transformation</p>
        </div>

        <div 
          ref={containerRef}
          className="relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-inner"
          onMouseDown={() => setIsDragging(true)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* After Side */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6 md:p-10">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <CheckCircle className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold text-emerald-600">With ClaritAI</span>
                  <p className="text-emerald-600/70 text-sm">Never miss a lead again</p>
                </div>
              </div>
              
              <motion.div 
                className="space-y-4 flex-1"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {afterItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-4 bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm border border-white/50"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </motion.div>
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Before Side */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 p-6 md:p-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Clock className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold text-orange-600">Without ClaritAI</span>
                  <p className="text-orange-600/70 text-sm">Leads slip through cracks</p>
                </div>
              </div>

              <motion.div 
                className="space-y-4 flex-1"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {beforeItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-4 bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm border border-white/50"
                    whileHover={{ x: -10 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </motion.div>
                    <span className="text-gray-600 font-medium line-through decoration-red-400 decoration-2">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Slider Handle */}
          <motion.div 
            className="absolute top-0 bottom-0 w-2 bg-white shadow-2xl cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            animate={{ scale: isDragging ? 1.1 : 1 }}
          >
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              whileHover={{ scale: 1.15 }}
            >
              <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-100">
                <MoveHorizontal className="w-7 h-7 text-gray-600" />
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Before
            </motion.div>
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              After
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <MoveHorizontal className="w-4 h-4" />
            Drag the slider to compare
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Enhanced Stats Section
function AnimatedStats() {
  const stats = [
    { value: 40, suffix: '%', label: 'Higher Conversion', sublabel: 'vs industry', icon: TrendingUp, color: '#FBBF24', bgGradient: 'from-yellow-400 to-orange-500' },
    { value: 24, suffix: '/7', label: 'Always Online', sublabel: 'Zero downtime', icon: Clock, color: '#10B981', bgGradient: 'from-emerald-400 to-teal-500' },
    { value: 5, suffix: ' min', label: 'Lightning Setup', sublabel: 'Go live fast', icon: Zap, color: '#2563EB', bgGradient: 'from-blue-400 to-indigo-500' },
    { value: 30, suffix: '%', label: 'Time Saved', sublabel: 'Automation', icon: Target, color: '#FF6B35', bgGradient: 'from-orange-400 to-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <TiltCard key={stat.label} tiltAmount={8}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative group"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 overflow-hidden h-full">
              <motion.div 
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.bgGradient} opacity-20 blur-2xl`}
                whileHover={{ opacity: 0.5, scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}30` }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>

              <div className="flex items-baseline gap-1 mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold text-white"
                />
              </div>

              <p className="text-white font-semibold text-lg">{stat.label}</p>
              <p className="text-white/60 text-sm">{stat.sublabel}</p>
            </div>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  );
}

// Pricing Section with 3D cards
function PricingSection() {
  const plans = [
    { name: 'Starter', price: '₹5,000', period: '/month', description: 'Perfect for small coaching centers', features: ['Sia Chatbot', 'Basic CRM', 'Email support', '100 leads/month'], color: 'blue', popular: false },
    { name: 'Full Suite', price: '₹15,000', period: '/month', description: 'Everything you need to scale', features: ['Sia Chatbot', 'Full CRM Suite', 'Voice AI (500 min)', 'Priority support', 'Unlimited leads', 'Risk alerts'], color: 'coral', popular: true },
    { name: 'Voice Add-on', price: '₹18,000', period: '/1000 mins', description: 'Extra calling minutes', features: ['1000 AI call minutes', 'Call transcripts', 'Lead scoring', 'CRM integration'], color: 'green', popular: false },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 perspective-1000">
      {plans.map((plan, i) => (
        <TiltCard key={plan.name} tiltAmount={5}>
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${plan.popular ? 'border-[#2563EB] shadow-2xl' : 'border-gray-100 hover:border-gray-200 hover:shadow-xl'}`}
          >
            {plan.popular && (
              <motion.div 
                className="absolute -top-4 left-1/2 -translate-x-1/2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <span className="px-4 py-1.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white text-sm font-bold rounded-full shadow-lg">
                  Recommended
                </span>
              </motion.div>
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-4xl font-bold ${plan.color === 'blue' ? 'text-[#2563EB]' : plan.color === 'coral' ? 'text-[#FF6B35]' : 'text-[#10B981]'}`}>
                {plan.price}
              </span>
              <span className="text-gray-500">{plan.period}</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, fi) => (
                <motion.li 
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + fi * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <CheckSquare className="w-5 h-5 text-[#10B981]" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <MagneticButton className="w-full">
              <Link to={`/contact?type=pricing&plan=${encodeURIComponent(plan.name)}`} className="block">
                <motion.button 
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white shadow-lg' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </MagneticButton>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  );
}

// FAQ Section with smooth animations
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { question: 'Is the chatbot designed specifically for coaching institutes?', answer: 'Yes! Sia is trained on millions of education-specific conversations. She understands JEE, NEET, CBSE queries and speaks the language your students and parents use.' },
    { question: 'How is this different from LeadSquared?', answer: 'Unlike generic CRMs, ClaritAI is built for coaching institutes from the ground up. We combine AI chat, voice calling, and CRM with dropout prediction - all in one platform.' },
    { question: 'Why AI instead of WhatsApp Business API?', answer: 'WhatsApp API requires manual responses. Sia responds instantly, 24/7, qualifies leads, and schedules demos automatically. You get human-level conversations at AI speed.' },
    { question: 'How quickly can we go live?', answer: '5 minutes. No kidding. Just add one line of code to your website or share the WhatsApp link. Our team can also do a white-glove setup if needed.' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <motion.button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left"
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
          >
            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// Main Home Component
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const springY = useSpring(heroY, { stiffness: 100, damping: 30 });

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <GradientOrbs />
        <FloatingParticles />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div style={{ y: springY, opacity: heroOpacity }} className="text-center lg:text-left z-10">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2563EB]/10 to-[#2563EB]/5 rounded-full mb-6 border border-[#2563EB]/20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-4 h-4 text-[#2563EB]" />
                </motion.div>
                <span className="text-sm font-medium text-[#2563EB]">Trusted by 550+ coaching institutes</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <TextScramble text="Your Students Visit at " className="text-gray-900" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]">
                  <TextScramble text="11 PM." />
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#e55a2b]">
                  <TextScramble text="Nobody Is Answering." />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                ClaritAI captures, calls, and converts leads automatically for coaching institutes. 
                Never lose a student to delayed responses again.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <MagneticButton>
                  <Link to="/contact?type=trial">
                    <motion.button 
                      className="px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Free — No Setup Fee
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </motion.button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/book-demo">
                    <motion.button 
                      className="px-8 py-4 border-2 border-[#FF6B35] text-[#FF6B35] font-semibold rounded-full hover:bg-[#FF6B35] hover:text-white transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-5 h-5" />
                      Watch Live Demo
                    </motion.button>
                  </Link>
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start"
              >
                {[
                  { icon: Shield, text: 'DPDP Compliant', color: '#10B981' },
                  { icon: Zap, text: '5-Min Setup', color: '#FBBF24' },
                  { icon: Users, text: '20,000+ Students', color: '#2563EB' },
                ].map((item, i) => (
                  <motion.div 
                    key={item.text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </motion.div>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Enhanced 3D Sia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="relative flex justify-center z-10"
            >
              <Enhanced3DSia />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <TrustTicker />

      {/* Product Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-4"
            >
              <Award className="w-4 h-4 text-[#2563EB]" />
              <span className="text-sm font-medium text-[#2563EB]">Powerful Products</span>
            </motion.div>
            <TextReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                One Platform, Three Powerful Products
              </h2>
            </TextReveal>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose what works for you, or get the full suite for maximum impact
            </p>
          </div>
          <ProductCards />
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-[#2563EB] via-[#1d4ed8] to-[#1e40af] relative overflow-hidden">
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Results That Speak
              </h2>
            </TextReveal>
            <p className="text-white/70">Real outcomes from real coaching institutes</p>
          </div>
          <AnimatedStats />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sia Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50 }}
              className="order-2 lg:order-1"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Bot className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm font-medium text-[#2563EB]">Sia Chatbot</span>
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                <TextScramble text="Never Miss a Lead at 11 PM" />
              </h3>
              <p className="text-gray-600 mb-6">
                Sia captures lead information automatically, answers questions about your courses, 
                and qualifies prospects 24/7. She's trained specifically for coaching institutes.
              </p>
              <ul className="space-y-3 mb-8">
                {['Instant responses to student queries', 'Auto-captures contact details', 'Integrates with your CRM', 'Human handoff when needed'].map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    </motion.div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton>
                <Link to="/sia-chatbot" className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all">
                  Learn more about Sia <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </motion.div>
            <ParallaxContainer offset={30}>
              <Sia3D variant="phone" />
            </ParallaxContainer>
          </div>

          {/* Voice AI Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <ParallaxContainer offset={30} direction="down">
              <Phone3D />
            </ParallaxContainer>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-sm font-medium text-[#FF6B35]">Voice AI</span>
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                <TextScramble text="Your AI Is Already Calling" />
              </h3>
              <p className="text-gray-600 mb-6">
                The moment a lead fills a form, our AI calls them. It qualifies their intent, 
                answers questions, and books demos — all in a natural, human-like voice.
              </p>
              <ul className="space-y-3 mb-8">
                {['Calls within 2 minutes of form submission', 'Human-like voice conversations', 'Automatic demo scheduling', 'Full call transcripts in CRM'].map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    </motion.div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton>
                <Link to="/voice-ai" className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold hover:gap-3 transition-all">
                  Learn more about Voice AI <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* CRM Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <BarChart3 className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-medium text-[#10B981]">CRM Suite</span>
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                <TextScramble text="See Every Lead. Save Every Student." />
              </h3>
              <p className="text-gray-600 mb-6">
                Track the complete student journey from first contact to enrollment. 
                Our AI identifies at-risk students before they drop out.
              </p>
              <ul className="space-y-3 mb-8">
                {['Complete pipeline visibility', 'AI-powered dropout prediction', 'Engagement tracking', 'Course-wise analytics'].map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    </motion.div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton>
                <Link to="/crm-dashboard" className="inline-flex items-center gap-2 text-[#10B981] font-semibold hover:gap-3 transition-all">
                  Explore CRM Suite <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </motion.div>
            <ParallaxContainer offset={30}>
              <Dashboard3D />
            </ParallaxContainer>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
            </TextReveal>
            <p className="text-gray-600 mb-4">No setup fees. No lock-in. Cancel anytime.</p>
            <div className="flex items-center justify-center gap-6">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#10B981]" /> No setup fee
              </span>
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#10B981]" /> No lock-in
              </span>
            </div>
          </div>
          <PricingSection />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </TextReveal>
            <p className="text-gray-600">Everything you need to know about ClaritAI</p>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] relative overflow-hidden">
        <FloatingParticles />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <TextScramble text="Ready to Never Lose a Lead Again?" />
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join 550+ coaching institutes using ClaritAI to capture, call, and convert leads automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Link to="/contact?type=trial">
                  <motion.button 
                    className="px-8 py-4 bg-white text-[#2563EB] font-semibold rounded-full shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial
                  </motion.button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/book-demo">
                  <motion.button 
                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule a Demo
                  </motion.button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
