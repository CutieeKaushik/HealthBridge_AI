import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Calendar, Sunrise, Sun, Sunset, Moon, CheckCircle, Circle } from 'lucide-react';

interface PlanItem { id: string; text: string; done: boolean; category: string; }

export default function DailyPlan() {
  const { user, medications, hydration, setHydration, activity, setActivity } = useApp();
  const [morningItems, setMorningItems] = useState<PlanItem[]>([
    { id: 'm1', text: 'Drink a glass of water upon waking', done: false, category: 'hydration' },
    { id: 'm2', text: 'Eat a balanced breakfast', done: false, category: 'nutrition' },
    { id: 'm3', text: 'Take morning medications', done: false, category: 'medication' },
    { id: 'm4', text: '10-minute morning walk or stretch', done: false, category: 'activity' },
    { id: 'm5', text: 'Morning wellness check-in', done: false, category: 'wellness' },
  ]);
  const [afternoonItems, setAfternoonItems] = useState<PlanItem[]>([
    { id: 'a1', text: '30-minute exercise session', done: false, category: 'activity' },
    { id: 'a2', text: 'Drink 3 glasses of water', done: false, category: 'hydration' },
    { id: 'a3', text: 'Eat a nutritious lunch', done: false, category: 'nutrition' },
    { id: 'a4', text: 'Log afternoon symptoms if any', done: false, category: 'wellness' },
  ]);
  const [eveningItems, setEveningItems] = useState<PlanItem[]>([
    { id: 'e1', text: 'Evening health check-in', done: false, category: 'wellness' },
    { id: 'e2', text: 'Take evening medications', done: false, category: 'medication' },
    { id: 'e3', text: 'Eat a light dinner', done: false, category: 'nutrition' },
    { id: 'e4', text: 'Review daily progress', done: false, category: 'wellness' },
  ]);
  const [nightItems, setNightItems] = useState<PlanItem[]>([
    { id: 'n1', text: 'Prepare for sleep (no screens 30 min before)', done: false, category: 'wellness' },
    { id: 'n2', text: 'Take night medications if prescribed', done: false, category: 'medication' },
    { id: 'n3', text: 'Relaxation: meditation or reading', done: false, category: 'wellness' },
    { id: 'n4', text: 'Sleep by 10:30 PM', done: false, category: 'wellness' },
  ]);

  const toggleItem = (setter: React.Dispatch<React.SetStateAction<PlanItem[]>>, id: string) => {
    setter(items => items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const allItems = [...morningItems, ...afternoonItems, ...eveningItems, ...nightItems];
  const completed = allItems.filter(i => i.done).length;
  const progress = Math.round((completed / allItems.length) * 100);

  const renderSection = (title: string, icon: React.ReactNode, items: PlanItem[], setter: React.Dispatch<React.SetStateAction<PlanItem[]>>, color: string) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">{icon} {title}</h3>
      <div className="space-y-2">
        {items.map(item => (
          <label key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <button onClick={() => toggleItem(setter, item.id)} className="flex-shrink-0">
              {item.done ? <CheckCircle className={`w-5 h-5 ${color}`} /> : <Circle className="w-5 h-5 text-gray-300" />}
            </button>
            <span className={`text-sm ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.text}</span>
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Calendar className="w-6 h-6 text-blue-600" /> Personalized Daily Health Plan</h1>
        <p className="text-gray-600 mt-1">Your AI-generated health plan for today, customized to your profile.</p>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Today's Progress</span>
          <span className="text-2xl font-bold">{progress}%</span>
        </div>
        <div className="h-3 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-blue-100 mt-2">{completed} of {allItems.length} tasks completed</p>
      </div>

      {/* Hydration & Activity */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-2">💧 Hydration</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(hydration / 8) * 100}%` }} />
              </div>
            </div>
            <span className="font-bold text-lg">{hydration}/8</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setHydration(Math.min(hydration + 1, 12))} className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg text-sm">+1 Glass</button>
            <button onClick={() => setHydration(Math.max(hydration - 1, 0))} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">-1</button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-2">🏃 Activity</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${activity}%` }} />
              </div>
            </div>
            <span className="font-bold text-lg">{activity}%</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setActivity(Math.min(activity + 10, 100))} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">+10%</button>
            <button onClick={() => setActivity(Math.max(activity - 10, 0))} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">-10%</button>
          </div>
        </div>
      </div>

      {/* Plan Sections */}
      {renderSection('Morning Plan', <Sunrise className="w-5 h-5 text-orange-400" />, morningItems, setMorningItems, 'text-orange-500')}
      {renderSection('Afternoon Move', <Sun className="w-5 h-5 text-yellow-500" />, afternoonItems, setAfternoonItems, 'text-yellow-500')}
      {renderSection('Evening Check', <Sunset className="w-5 h-5 text-orange-500" />, eveningItems, setEveningItems, 'text-orange-500')}
      {renderSection('Night Rest', <Moon className="w-5 h-5 text-indigo-400" />, nightItems, setNightItems, 'text-indigo-400')}

      {/* Medications */}
      {medications.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">📋 Today's Medications</h3>
          <div className="space-y-2">
            {medications.map(med => (
              <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="text-sm font-medium">{med.name} - {med.dosage}</p><p className="text-xs text-gray-500">Times: {med.times.join(', ')}</p></div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Scheduled</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
