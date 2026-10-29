import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Heart, Pill, Brain, Utensils, AlertTriangle, Smartphone, Calendar, FileText, TrendingUp, Mic, MessageCircle, Clock, Leaf, Activity, Droplets, Footprints, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

export default function Dashboard() {
  const { user, medications, notifications, hydration, activity, symptoms, moods, foodLogs } = useApp();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const pendingMeds = medications.filter(m => m.confirmations.some(c => c.status === 'pending')).length;
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const bmi = user?.height && user?.weight ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : null;

  const quickLinks = [
    { to: '/app/medicine-interaction', icon: Pill, label: 'Interaction Check', color: 'bg-blue-50 text-blue-600' },
    { to: '/app/emotion', icon: Brain, label: 'Mood Check', color: 'bg-purple-50 text-purple-600' },
    { to: '/app/nutrition', icon: Utensils, label: 'Nutrition Scan', color: 'bg-green-50 text-green-600' },
    { to: '/app/emergency', icon: AlertTriangle, label: 'Emergency', color: 'bg-red-50 text-red-600' },
    { to: '/app/chatbot', icon: MessageCircle, label: 'Health Chat', color: 'bg-teal-50 text-teal-600' },
    { to: '/app/voice', icon: Mic, label: 'Voice', color: 'bg-indigo-50 text-indigo-600' },
    { to: '/app/disease-prediction', icon: Activity, label: 'Disease Check', color: 'bg-orange-50 text-orange-600' },
    { to: '/app/daily-plan', icon: Calendar, label: 'Daily Plan', color: 'bg-cyan-50 text-cyan-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-6 text-white">
        <p className="text-teal-100 text-sm">{today}</p>
        <h1 className="text-2xl font-bold mt-1">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-teal-100 mt-2">Here's your health overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><Pill className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{medications.length}</p><p className="text-xs text-gray-500">Active Meds</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center"><Droplets className="w-5 h-5 text-cyan-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{hydration}/8</p><p className="text-xs text-gray-500">Glasses Water</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><Footprints className="w-5 h-5 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{activity}%</p><p className="text-xs text-gray-500">Activity Goal</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center"><Heart className="w-5 h-5 text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{bmi || '--'}</p><p className="text-xs text-gray-500">BMI</p></div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link, i) => (
            <Link key={i} to={link.to} className={`${link.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition text-center`}>
              <link.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Reminders */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-teal-600" /> Upcoming Reminders</h3>
          {medications.length === 0 ? (
            <p className="text-sm text-gray-500">No medications scheduled. <Link to="/app/medicine-reminder" className="text-teal-600 hover:underline">Add one</Link></p>
          ) : (
            <div className="space-y-2">
              {medications.slice(0, 4).map(med => (
                <div key={med.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div><p className="text-sm font-medium">{med.name}</p><p className="text-xs text-gray-500">{med.dosage} • {med.times.join(', ')}</p></div>
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">Scheduled</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" /> Health Alerts</h3>
          {unreadNotifs === 0 ? (
            <p className="text-sm text-gray-500">No active alerts. You're all caught up!</p>
          ) : (
            <div className="space-y-2">
              {notifications.filter(n => !n.read).slice(0, 4).map(n => (
                <div key={n.id} className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  <div><p className="text-sm font-medium">{n.title}</p><p className="text-xs text-gray-600">{n.message}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Daily Plan Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /> Today's Plan</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3"><Sunrise className="w-4 h-4 text-orange-400" /><span className="text-sm">Morning: Breakfast, meds, hydration</span></div>
            <div className="flex items-center gap-3"><Sun className="w-4 h-4 text-yellow-400" /><span className="text-sm">Afternoon: Exercise, lunch, tracking</span></div>
            <div className="flex items-center gap-3"><Sunset className="w-4 h-4 text-orange-500" /><span className="text-sm">Evening: Check-in, dinner, meds</span></div>
            <div className="flex items-center gap-3"><Moon className="w-4 h-4 text-indigo-400" /><span className="text-sm">Night: Relaxation, sleep prep</span></div>
          </div>
          <Link to="/app/daily-plan" className="text-teal-600 text-sm mt-3 inline-block hover:underline">View Full Plan →</Link>
        </div>

        {/* Smart Medicine Box Status */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Smartphone className="w-4 h-4 text-green-500" /> Smart Medicine Box</h3>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            <div><p className="text-sm font-medium text-yellow-800">Simulated Mode</p><p className="text-xs text-yellow-600">No physical device connected. Demo mode active.</p></div>
          </div>
          <Link to="/app/medicine-box" className="text-teal-600 text-sm mt-3 inline-block hover:underline">Configure Device →</Link>
        </div>
      </div>

      {/* Nutrition Summary */}
      {foodLogs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Utensils className="w-4 h-4 text-green-500" /> Today's Nutrition</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Calories', 'Protein', 'Carbs', 'Fat'].map((label, i) => {
              const vals = foodLogs.filter(f => f.date === new Date().toISOString().split('T')[0]);
              const total = vals.reduce((sum, f) => sum + [f.calories, f.protein, f.carbs, f.fat][i], 0);
              return <div key={i} className="text-center"><p className="text-xl font-bold text-gray-900">{total}</p><p className="text-xs text-gray-500">{label}</p></div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
