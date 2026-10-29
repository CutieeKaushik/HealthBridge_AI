import React, { useState } from 'react';
import { Activity, Info, AlertTriangle } from 'lucide-react';

export default function DiseasePrediction() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [existingDiseases, setExistingDiseases] = useState<string[]>([]);
  const [newDisease, setNewDisease] = useState('');
  const [lifestyle, setLifestyle] = useState('moderate');
  const [result, setResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const addSymptom = () => { if (newSymptom.trim()) { setSymptoms([...symptoms, newSymptom.trim()]); setNewSymptom(''); } };
  const addDisease = () => { if (newDisease.trim()) { setExistingDiseases([...existingDiseases, newDisease.trim()]); setNewDisease(''); } };

  const predict = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Demo prediction logic
      const lowerSymptoms = symptoms.join(' ').toLowerCase();
      let prediction = { disease: 'General check-up recommended', confidence: 50, severity: 'Low', steps: ['Consult a general physician', 'Get routine blood work done'] };
      
      if (lowerSymptoms.includes('urination') || lowerSymptoms.includes('thirst') || lowerSymptoms.includes('weight loss')) {
        prediction = { disease: 'Diabetes Mellitus', confidence: 92, severity: 'High', steps: ['Visit a physician immediately', 'Get fasting blood sugar test', 'Get HbA1c test', 'Monitor diet and hydration'] };
      } else if (lowerSymptoms.includes('chest pain') || lowerSymptoms.includes('breathing')) {
        prediction = { disease: 'Cardiovascular condition', confidence: 78, severity: 'High', steps: ['Seek immediate medical attention', 'Get ECG and cardiac enzymes', 'Consult a cardiologist'] };
      } else if (lowerSymptoms.includes('headache') && lowerSymptoms.includes('vision')) {
        prediction = { disease: 'Migraine with aura', confidence: 72, severity: 'Medium', steps: ['Consult a neurologist', 'Rest in a dark room', 'Stay hydrated', 'Keep a headache diary'] };
      } else if (lowerSymptoms.includes('fever') && lowerSymptoms.includes('cough')) {
        prediction = { disease: 'Upper Respiratory Infection', confidence: 85, severity: 'Low', steps: ['Rest and hydrate', 'Monitor temperature', 'Consult doctor if fever persists >3 days'] };
      } else if (symptoms.length > 0) {
        prediction = { disease: 'Symptom-based assessment needed', confidence: 60, severity: 'Medium', steps: ['Consult a physician for proper evaluation', 'Get relevant lab tests', 'Monitor symptoms'] };
      }

      setResult(prediction);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Activity className="w-6 h-6 text-red-600" /> AI Disease Prediction</h1>
        <p className="text-gray-600 mt-1">Input symptoms and health data for AI-based disease possibility assessment.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-yellow-700">
          <p className="font-medium">Important Disclaimer</p>
          <p>This is a demonstration tool. Confidence scores are illustrative, not clinically validated probabilities. Always consult qualified healthcare professionals for diagnosis.</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="45" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="70" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="170" />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Symptoms</label>
          <div className="flex gap-2 mt-1">
            <input value={newSymptom} onChange={e => setNewSymptom(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSymptom()} className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder="e.g., Frequent urination, Excessive thirst" />
            <button onClick={addSymptom} className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-200">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {symptoms.map((s, i) => (
              <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {s} <button onClick={() => setSymptoms(symptoms.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Existing Diseases</label>
            <div className="flex gap-2 mt-1">
              <input value={newDisease} onChange={e => setNewDisease(e.target.value)} onKeyDown={e => e.key === 'Enter' && addDisease()} className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder="Add condition" />
              <button onClick={addDisease} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {existingDiseases.map((d, i) => <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{d}</span>)}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Lifestyle</label>
            <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Very Active</option>
            </select>
          </div>
        </div>

        <button onClick={predict} disabled={symptoms.length === 0 || analyzing} className="mt-4 bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
          {analyzing ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyzing...</> : 'Predict Possible Disease'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className={`rounded-xl border-2 p-6 ${result.severity === 'High' ? 'border-red-300 bg-red-50' : result.severity === 'Medium' ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'}`}>
          <h3 className="font-bold text-xl text-gray-900 mb-2">Prediction Result</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Possible Disease</p>
              <p className="font-bold text-lg text-gray-900">{result.disease}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Confidence</p>
              <p className={`font-bold text-2xl ${result.confidence > 80 ? 'text-red-600' : result.confidence > 60 ? 'text-orange-600' : 'text-green-600'}`}>{result.confidence}%</p>
              <p className="text-xs text-gray-400">(Demonstration score)</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Severity</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${result.severity === 'High' ? 'bg-red-200 text-red-800' : result.severity === 'Medium' ? 'bg-orange-200 text-orange-800' : 'bg-green-200 text-green-800'}`}>{result.severity}</span>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-2">Recommended Next Steps:</p>
            <ul className="space-y-1">
              {result.steps.map((s: string, i: number) => <li key={i} className="text-sm text-gray-700 flex items-center gap-2"><span className="text-red-500">→</span>{s}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* Demo Example */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Demo Example:</p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1"><strong>Input:</strong> Age 45, Frequent urination, Excessive thirst, Weight loss</p>
          </div>
          <div>
            <p className="text-gray-600"><strong>Output:</strong> Diabetes • Confidence: 92% • Recommendation: Visit a physician</p>
          </div>
        </div>
      </div>
    </div>
  );
}
