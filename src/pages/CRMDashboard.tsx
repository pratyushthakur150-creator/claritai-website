import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, BarChart3, Users, AlertTriangle, 
  Target, TrendingUp, ChevronDown, Sparkles, Zap, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Dashboard3D from '../components/Dashboard3D';

const features = [
  { icon: Target, title: 'Pipeline View', desc: 'Visual funnel from lead to enrollment' },
  { icon: BarChart3, title: 'Smart Insights', desc: 'AI-powered analytics and predictions' },
  { icon: Users, title: 'Engagement Tracking', desc: 'Every touchpoint in one place' },
  { icon: AlertTriangle, title: 'Risk Alerts', desc: 'Catch dropouts before they happen' },
  { icon: Database, title: 'API Integration', desc: 'Connect with your existing tools' },
  { icon: Zap, title: 'Course Analytics', desc: 'Performance by batch and subject' },
];

const faqs = [
  {
    question: 'What makes this the best CRM for coaching institutes?',
    answer: 'Unlike generic CRMs like Salesforce or HubSpot, ClaritCRM is built specifically for education. It understands student lifecycles, tracks course-specific metrics, and predicts dropout risk using AI trained on education data.',
  },
  {
    question: 'How does risk detection work?',
    answer: 'Our AI analyzes 20+ signals — login frequency, class attendance, assignment submission, fee payment patterns, and engagement scores. When risk crosses a threshold, you get an instant alert with recommended actions.',
  },
  {
    question: 'Can we integrate with PostgreSQL?',
    answer: 'Yes! We offer native PostgreSQL integration along with MySQL, MongoDB, and REST APIs. You can also export data anytime in CSV, JSON, or Excel formats.',
  },
  {
    question: 'Do we need technical expertise to use it?',
    answer: 'Not at all. ClaritCRM is designed for coaching center owners and administrators. Setup takes 5 minutes, and our onboarding team helps you migrate from spreadsheets or other CRMs.',
  },
];

export default function CRMDashboard() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 rounded-full mb-6">
                <BarChart3 className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-medium text-[#10B981]">CRM Suite</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                See Every Lead.
                <br />
                <span className="text-[#10B981]">Save Every Student.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-xl">
                Track the complete student journey from first contact to enrollment. 
                Our AI flags at-risk students early so you can intervene before they drop out.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Complete pipeline visibility',
                  'AI-powered dropout prediction',
                  'Course-wise performance analytics',
                  'Integration with Sia and Voice AI'
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
                <Link to="/book-demo" className="px-8 py-4 bg-[#10B981] text-white font-semibold rounded-full btn-hover-lift flex items-center justify-center gap-2">
                  Free Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#crm-features" className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-[#10B981] hover:text-[#10B981] transition-all text-center">
                  View Features
                </a>
              </div>
            </motion.div>

            {/* Right - Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <Dashboard3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="crm-features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything in One Dashboard
            </h2>
            <p className="text-gray-600">Built for coaching institutes, not generic businesses</p>
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
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After - Dropout Prevention */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Catch Dropouts Before They Happen
            </h2>
            <p className="text-gray-600">AI-powered early warning system</p>
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
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-700">Late Discovery</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Student stops attending classes',
                  'No payment for 2 months',
                  'Finally notice and try to contact',
                  'Student already joined competitor',
                  'Revenue loss: ₹60,000+',
                  'No way to predict or prevent'
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
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Early Intervention</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'AI detects login frequency drop',
                  'Risk score crosses 70/100',
                  'Instant alert to counselor',
                  'Personal call within 24 hours',
                  'Student retained with support',
                  'Prevention: 30% fewer dropouts'
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

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-[#10B981] to-[#059669]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: '30%', label: 'Fewer Dropouts', desc: 'With AI risk detection' },
              { value: '40%', label: 'Faster Conversion', desc: 'With pipeline visibility' },
              { value: '100%', label: 'Visibility', desc: 'Into student journey' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <p className="text-xl font-semibold text-white/90 mb-1">{stat.label}</p>
                <p className="text-white/70">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Command Center
            </h2>
            <p className="text-gray-600">Everything you need in one view</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Mock Dashboard UI */}
            <div className="bg-gray-900 p-4 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-500 text-sm">ClaritCRM Dashboard</span>
              </div>
            </div>

            <div className="p-8">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Active Students', value: '1,247', color: 'blue' },
                  { label: 'At Risk', value: '23', color: 'red' },
                  { label: 'New Leads', value: '156', color: 'green' },
                  { label: 'Conversion', value: '42%', color: 'coral' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className={`text-2xl font-bold ${
                      stat.color === 'blue' ? 'text-[#2563EB]' :
                      stat.color === 'red' ? 'text-red-500' :
                      stat.color === 'green' ? 'text-[#10B981]' : 'text-[#FF6B35]'
                    }`}>{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Pipeline */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Admission Pipeline</h4>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#2563EB] w-[25%]" />
                  <div className="h-full bg-[#10B981] w-[20%]" />
                  <div className="h-full bg-[#FBBF24] w-[18%]" />
                  <div className="h-full bg-[#FF6B35] w-[12%]" />
                  <div className="h-full bg-green-600 w-[10%]" />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>New (156)</span>
                  <span>Contacted (89)</span>
                  <span>Demo (67)</span>
                  <span>Negotiation (34)</span>
                  <span>Closed (28)</span>
                </div>
              </div>

              {/* Risk Alerts */}
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-red-700">Risk Alerts</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Amit Kumar', course: 'JEE Advanced', risk: '85%' },
                    { name: 'Priya Singh', course: 'NEET', risk: '72%' },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                          {alert.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{alert.name}</p>
                          <p className="text-xs text-gray-500">{alert.course}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-red-600">{alert.risk} risk</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Included in Full Suite
            </h2>
            <p className="text-gray-600">No extra charge for CRM when you get the Full Suite</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Full Suite Recommended</span>
            </div>

            <div className="mb-6">
              <span className="text-5xl md:text-6xl font-bold">₹15,000</span>
              <span className="text-white/80">/month</span>
            </div>

            <p className="text-white/90 mb-8 max-w-md mx-auto">
              Get the complete package: Sia Chatbot + CRM Suite + 500 Voice AI minutes.
              Everything you need to convert more students.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {['Sia Chatbot', 'CRM Suite', '500 Voice Mins'].map((item, i) => (
                <div key={i} className="p-4 bg-white/10 rounded-xl backdrop-blur">
                  <CheckCircle className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>

            <Link to="/contact?type=suite" className="px-12 py-4 bg-white text-[#10B981] font-semibold rounded-full hover:bg-gray-100 transition-all inline-block text-center">
              Get Full Suite
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
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
            Ready for Complete Visibility?
          </h2>
          <p className="text-gray-400 mb-8">
            See your entire pipeline in one dashboard. Start your free demo today.
          </p>
          <Link to="/book-demo" className="px-8 py-4 bg-[#10B981] text-white font-semibold rounded-full btn-hover-lift inline-block">
            Schedule Free Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
