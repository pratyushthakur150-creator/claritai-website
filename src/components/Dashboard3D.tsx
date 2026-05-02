import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertCircle, Target, ArrowUp, ArrowDown, Zap } from 'lucide-react';

export default function Dashboard3D() {
  return (
    <div className="relative">
      {/* Main Dashboard */}
      <motion.div
        initial={{ y: 50, opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 w-full max-w-2xl transform perspective-1000"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">CRM Dashboard</h3>
            <p className="text-sm text-gray-500">Real-time pipeline overview</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">Live updates</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users, label: 'Total Leads', value: '1,247', change: '+12%', up: true, color: 'blue' },
            { icon: Target, label: 'Conversion', value: '42%', change: '+5%', up: true, color: 'green' },
            { icon: TrendingUp, label: 'Revenue', value: '₹2.4L', change: '+18%', up: true, color: 'coral' },
            { icon: AlertCircle, label: 'At Risk', value: '23', change: '-8%', up: false, color: 'yellow' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-4 h-4 ${
                  stat.color === 'blue' ? 'text-[#2563EB]' :
                  stat.color === 'green' ? 'text-[#10B981]' :
                  stat.color === 'coral' ? 'text-[#FF6B35]' : 'text-[#FBBF24]'
                }`} />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Overview</h4>
          <div className="flex gap-4">
            {[
              { label: 'New', count: 156, color: 'bg-[#2563EB]', width: '25%' },
              { label: 'Contacted', count: 89, color: 'bg-[#10B981]', width: '20%' },
              { label: 'Demo Scheduled', count: 67, color: 'bg-[#FBBF24]', width: '18%' },
              { label: 'Negotiation', count: 34, color: 'bg-[#FF6B35]', width: '12%' },
              { label: 'Closed Won', count: 28, color: 'bg-green-600', width: '10%' },
            ].map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="flex-1"
              >
                <div className={`${stage.color} rounded-t-lg h-2 mb-2`} style={{ width: stage.width }} />
                <p className="text-xs font-semibold text-gray-700">{stage.count}</p>
                <p className="text-[10px] text-gray-500">{stage.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h4 className="text-sm font-semibold text-red-700">Dropout Risk Alerts</h4>
            <span className="ml-auto text-xs px-2 py-0.5 bg-red-200 text-red-700 rounded-full">3 Active</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Amit Kumar', reason: 'No login for 7 days', risk: 'High' },
              { name: 'Priya Singh', reason: 'Missed last 2 classes', risk: 'Medium' },
              { name: 'Rahul Mehta', reason: 'Fee payment delayed', risk: 'High' },
            ].map((alert, i) => (
              <motion.div
                key={alert.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center justify-between bg-white rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                    {alert.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{alert.name}</p>
                    <p className="text-[10px] text-gray-500">{alert.reason}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  alert.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {alert.risk}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-8 -right-8 bg-[#10B981] rounded-2xl shadow-xl p-4"
      >
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-white" />
          <div>
            <p className="text-2xl font-bold text-white">30%</p>
            <p className="text-xs text-white/80">Fewer dropouts</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">40%</p>
            <p className="text-xs text-gray-500">Faster conversion</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
