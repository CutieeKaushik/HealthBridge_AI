import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { TrendingUp, AlertCircle, Info } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function HealthRisk() {
  const { user } = useApp();
  const [age, setAge] = useState(user?.age?.toString() || '');
  const [bp, setBp] = useState('120/80');
  const [smoking, setSmoking] = useState(false);
  const [exercise, setExercise] = useState('moderate');
  const [familyHistory, setFamilyHistory] = useState<string[]>(user?.familyHistory || []);
  const [newCondition, setNewCondition] = useState('');
  const [assessed, setAssessed] = useState(false);

  const bmi = user?.height && user?.weight ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : '25.0';

  const handleAssess = () => {
    setAssessed(true);
  };

  const riskData = [
    { disease: 'Diabetes', risk: 65, factors: ['BMI', 'Family history'] },
    { disease: 'Heart Disease', risk: 45, factors: ['Blood pressure', 'Age'] },
    { disease: 'Hypertension', risk: 55, factors: ['BP reading', 'Lifestyle'] },
    { disease: 'Obesity', risk: 40, factors: ['BMI', 'Activity level'] },
    { disease: 'Stroke', risk: 25, factors: ['BP', 'Age'] },
  ];

  const radarData = [
    { category: 'Cardiovascular', score: 55 },
    { category: 'Metabolic', score: 65 },
    { category: 'Respiratory', score: 20 },
    { category: 'Musculoskeletal', score: 30 },
    { category: 'Mental Health', score: 35 },
    { category: 'Digestive', score: 25 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-orange-600" /> Health Risk Prediction</h1>
        <p className="text-gray-600 mt-1">5-10 year preventive health risk assessment based on your profile.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-700">This is a demonstration tool. Risk scores are estimates for educational purposes and are not clinically validated probabilities. Consult healthcare professionals for actual risk assessment.</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Risk Assessment Inputs</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Blood Pressure</label>
            <input value={bp} onChange={e => setBp(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="120/80" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">BMI (from profile)</label>
            <input value={bmi} readOnly className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Exercise Level</label>
            <select value={exercise} onChange={e => setExercise(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light (1-2 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={smoking} onChange={e => setSmoking(e.target.checked)} className="w-4 h-4" id="smoking" />
            <label htmlFor="smoking" className="text-sm text-gray-700">Current smoker</label>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Family History</label>
            <div className="flex gap-2 mt-1">
              <input value={newCondition} onChange={e => setNewCondition(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && newCondition) { setFamilyHistory([...familyHistory, newCondition]); setNewCondition(''); } }} placeholder="Add condition" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {familyHistory.map((c, i) => <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{c}</span>)}
            </div>
          </div>
        </div>
        <button onClick={handleAssess} className="mt-4 bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-700">Run Risk Assessment</button>
      </div>

      {assessed && (
        <>
          {/* Risk Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Risk Category Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Risk Score" dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Disease Risks */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Disease Risk Estimates (5-10 year horizon)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={riskData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="disease" width={100} />
                <Tooltip />
                <Bar dataKey="risk" fill="#f97316" radius={[0, 4, 4, 0]} name="Risk %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Risks */}
          <div className="space-y-3">
            {riskData.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{r.disease}</h4>
                  <span className={`text-sm font-bold px-2 py-0.5 rounded ${r.risk > 60 ? 'bg-red-100 text-red-700' : r.risk > 40 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{r.risk}% risk</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full ${r.risk > 60 ? 'bg-red-500' : r.risk > 40 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${r.risk}%` }} />
                </div>
                <p className="text-xs text-gray-500">Contributing factors: {r.factors.join(', ')}</p>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-semibold text-green-800 mb-3">Preventive Recommendations</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Maintain regular exercise (150+ min/week moderate activity)</li>
              <li>• Monitor blood pressure and blood sugar regularly</li>
              <li>• Follow a balanced diet rich in vegetables and whole grains</li>
              <li>• Schedule annual health check-ups</li>
              <li>• Manage stress through meditation or yoga</li>
              <li>• Discuss family history risks with your doctor</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
