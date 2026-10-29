import React from 'react';
import { useApp } from '../contexts/AppContext';
import { History, Pill, Activity, Brain, Utensils } from 'lucide-react';

export default function HealthHistory() {
  const { medications, symptoms, moods, foodLogs } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><History className="w-6 h-6 text-gray-600" /> Health History</h1>
        <p className="text-gray-600 mt-1">Complete timeline of your health records and activities.</p>
      </div>

      {/* Medication History */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Pill className="w-4 h-4 text-blue-500" /> Medication History</h3>
        {medications.length === 0 ? (
          <p className="text-sm text-gray-500">No medications recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {medications.map(med => (
              <div key={med.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{med.name} - {med.dosage}</p>
                    <p className="text-xs text-gray-500">{med.times.join(', ')} • {med.startDate} → {med.endDate || `${med.days} days`}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{med.confirmations.filter(c => c.status === 'taken').length} confirmed</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Symptom History */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-orange-500" /> Symptom Records</h3>
        {symptoms.length === 0 ? (
          <p className="text-sm text-gray-500">No symptoms recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {symptoms.slice().reverse().map(s => (
              <div key={s.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-sm">{s.symptoms.join(', ')}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${s.severity === 'Critical' ? 'bg-red-100 text-red-700' : s.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{s.severity}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{new Date(s.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Brain className="w-4 h-4 text-purple-500" /> Mood History</h3>
        {moods.length === 0 ? (
          <p className="text-sm text-gray-500">No mood records yet.</p>
        ) : (
          <div className="space-y-2">
            {moods.slice().reverse().map(m => (
              <div key={m.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{m.mood}</p>
                  <p className="text-xs text-gray-500">Stress: {m.stress}/10 • Anxiety: {m.anxiety}/10 • Fatigue: {m.fatigue}/10</p>
                </div>
                <p className="text-xs text-gray-400">{m.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Food History */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Utensils className="w-4 h-4 text-green-500" /> Food Log History</h3>
        {foodLogs.length === 0 ? (
          <p className="text-sm text-gray-500">No food logs yet.</p>
        ) : (
          <div className="space-y-2">
            {foodLogs.slice().reverse().map(f => (
              <div key={f.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{f.foods.join(', ')}</p>
                  <p className="text-xs text-gray-500">{f.meal} • {f.calories} cal • P:{f.protein}g C:{f.carbs}g F:{f.fat}g</p>
                </div>
                <p className="text-xs text-gray-400">{f.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
