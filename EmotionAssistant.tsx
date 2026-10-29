import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Brain, Camera, Mic, Smile, Frown, Meh, TrendingUp, Music, BookOpen, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const moodOptions = ['Happy', 'Calm', 'Neutral', 'Anxious', 'Stressed', 'Sad', 'Tired'];
const recommendations: Record<string, { meditation: string; yoga: string; music: string }> = {
  'Stressed': { meditation: '10-min guided breathing meditation', yoga: 'Child\'s pose, Cat-Cow stretch', music: 'Nature sounds, calming piano' },
  'Anxious': { meditation: '5-4-3-2-1 grounding technique', yoga: 'Legs-up-the-wall pose', music: 'Soft ambient, white noise' },
  'Sad': { meditation: 'Loving-kindness meditation', yoga: 'Backbends, Sun Salutation', music: 'Uplifting acoustic music' },
  'Tired': { meditation: 'Body scan relaxation', yoga: 'Gentle restorative poses', music: 'Energizing but gentle music' },
  'Happy': { meditation: 'Gratitude meditation', yoga: 'Any flow you enjoy', music: 'Your favorite upbeat playlist' },
  'Calm': { meditation: 'Mindfulness observation', yoga: 'Balancing poses', music: 'Instrumental, lo-fi' },
  'Neutral': { meditation: 'Breath awareness', yoga: 'Hatha yoga basics', music: 'Soft instrumental' },
};

export default function EmotionAssistant() {
  const { moods, addMood } = useApp();
  const [selectedMood, setSelectedMood] = useState('');
  const [stress, setStress] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [fatigue, setFatigue] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  const handleSubmit = () => {
    if (!selectedMood) return;
    addMood({ id: Date.now().toString(), mood: selectedMood, stress, anxiety, fatigue, date: new Date().toISOString().split('T')[0] });
    setSubmitted(true);
  };

  const currentRecs = recommendations[selectedMood] || recommendations['Neutral'];
  const chartData = moods.slice(-7).map(m => ({ date: m.date.slice(5), stress: m.stress, anxiety: m.anxiety, fatigue: m.fatigue }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Brain className="w-6 h-6 text-purple-600" /> Emotion-Based Health Assistant</h1>
        <p className="text-gray-600 mt-1">Track your emotional wellness and get personalized recommendations.</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-purple-700">Emotional estimates are not mental-health diagnoses. If you're experiencing a mental health crisis, please contact a professional immediately.</p>
      </div>

      {/* Camera/Voice Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Optional Analysis Methods</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { if (navigator.mediaDevices) { setCameraActive(!cameraActive); } }} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Camera className="w-4 h-4" /> {cameraActive ? 'Stop Camera' : 'Camera Analysis'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Mic className="w-4 h-4" /> Voice Analysis
          </button>
          <button onClick={() => setDemoMode(!demoMode)} className={`px-4 py-2 rounded-lg text-sm ${demoMode ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
            {demoMode ? 'Demo Mode Active' : 'Manual Mode'}
          </button>
        </div>
        {cameraActive && (
          <div className="mt-3 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">Camera access requested. In demo mode, facial analysis is simulated.</p>
            <p className="text-xs text-gray-400 mt-1">Permission required for actual camera access.</p>
          </div>
        )}
      </div>

      {/* Mood Check-in */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">How are you feeling right now?</h3>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-6">
          {moodOptions.map(mood => (
            <button key={mood} onClick={() => setSelectedMood(mood)} className={`p-3 rounded-lg text-center text-sm transition ${selectedMood === mood ? 'bg-purple-100 border-2 border-purple-400 text-purple-700' : 'bg-gray-50 border border-gray-200 hover:border-purple-200'}`}>
              {mood === 'Happy' ? '😊' : mood === 'Calm' ? '😌' : mood === 'Neutral' ? '😐' : mood === 'Anxious' ? '😰' : mood === 'Stressed' ? '😫' : mood === 'Sad' ? '😢' : '😴'}
              <p className="mt-1 text-xs">{mood}</p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between"><span>Stress Level</span><span>{stress}/10</span></label>
            <input type="range" min="0" max="10" value={stress} onChange={e => setStress(+e.target.value)} className="w-full mt-1 accent-purple-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between"><span>Anxiety Level</span><span>{anxiety}/10</span></label>
            <input type="range" min="0" max="10" value={anxiety} onChange={e => setAnxiety(+e.target.value)} className="w-full mt-1 accent-purple-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between"><span>Fatigue Level</span><span>{fatigue}/10</span></label>
            <input type="range" min="0" max="10" value={fatigue} onChange={e => setFatigue(+e.target.value)} className="w-full mt-1 accent-purple-500" />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={!selectedMood} className="mt-6 bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50">
          Save Mood Check-in
        </button>
      </div>

      {/* Recommendations */}
      {selectedMood && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <BookOpen className="w-8 h-8 text-purple-500 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Meditation</h4>
            <p className="text-sm text-gray-600">{currentRecs.meditation}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <span className="text-3xl mb-3 block">🧘</span>
            <h4 className="font-semibold text-gray-900 mb-2">Yoga</h4>
            <p className="text-sm text-gray-600">{currentRecs.yoga}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <Music className="w-8 h-8 text-purple-500 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Music</h4>
            <p className="text-sm text-gray-600">{currentRecs.music}</p>
          </div>
        </div>
      )}

      {/* Mood History Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Mood History (Last 7 entries)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress" />
              <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" name="Anxiety" />
              <Line type="monotone" dataKey="fatigue" stroke="#8b5cf6" name="Fatigue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {(stress > 7 || anxiety > 7) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium">⚠️ Your stress/anxiety levels are high. Consider reaching out to a mental health professional or trusted person.</p>
        </div>
      )}
    </div>
  );
}
