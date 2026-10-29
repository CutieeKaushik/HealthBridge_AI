import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Heart, LayoutDashboard, Pill, Brain, Utensils, AlertTriangle, Smartphone, Calendar, FileText, TrendingUp, Mic, MessageCircle, Bell, Clock, Leaf, Activity, History, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/app/medicine-interaction', icon: Pill, label: 'Interaction Checker' },
  { path: '/app/emotion', icon: Brain, label: 'Emotion Assistant' },
  { path: '/app/nutrition', icon: Utensils, label: 'Nutrition Scanner' },
  { path: '/app/emergency', icon: AlertTriangle, label: 'Emergency Detection' },
  { path: '/app/medicine-box', icon: Smartphone, label: 'Smart Medicine Box' },
  { path: '/app/daily-plan', icon: Calendar, label: 'Daily Health Plan' },
  { path: '/app/doctor-report', icon: FileText, label: 'Doctor Report' },
  { path: '/app/health-risk', icon: TrendingUp, label: 'Health Risk' },
  { path: '/app/voice', icon: Mic, label: 'Voice Assistant' },
  { path: '/app/chatbot', icon: MessageCircle, label: 'Health Chatbot' },
  { path: '/app/smart-reminder', icon: Clock, label: 'Smart Reminder' },
  { path: '/app/medicine-reminder', icon: Bell, label: 'Medicine Reminder' },
  { path: '/app/traditional-modern', icon: Leaf, label: 'Traditional + Modern' },
  { path: '/app/disease-prediction', icon: Activity, label: 'Disease Prediction' },
  { path: '/app/history', icon: History, label: 'Health History' },
  { path: '/app/notifications', icon: Bell, label: 'Notifications' },
  { path: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">HealthBridge <span className="text-teal-600">AI</span></span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} end={item.end} onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.label === 'Notifications' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-700 font-medium text-sm">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1" />
          <NavLink to="/app/notifications" className="relative p-2 text-gray-500 hover:text-gray-700">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{unreadCount}</span>}
          </NavLink>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
