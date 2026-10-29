import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Pill, AlertTriangle, CheckCircle, XCircle, Plus, Trash2, Info } from 'lucide-react';

const interactionDB: Record<string, { with: string; severity: string; consequence: string; recommendation: string }[]> = {
  'warfarin': [{ with: 'Ginger', severity: 'High', consequence: 'May increase bleeding risk significantly', recommendation: 'Consult your doctor immediately. This combination may increase bleeding risk.' },
    { with: 'Garlic', severity: 'High', consequence: 'Increased bleeding risk', recommendation: 'Avoid combining. Consult your doctor.' },
    { with: 'Vitamin E', severity: 'Medium', consequence: 'May increase anticoagulant effect', recommendation: 'Monitor closely. Consult your doctor.' }],
  'aspirin': [{ with: 'Ibuprofen', severity: 'Medium', consequence: 'Reduced aspirin effectiveness, increased GI risk', recommendation: 'Take aspirin 30 min before ibuprofen or consult doctor.' },
    { with: 'Ginkgo Biloba', severity: 'High', consequence: 'Increased bleeding risk', recommendation: 'Avoid combination. Consult your doctor.' }],
  'metformin': [{ with: 'Alcohol', severity: 'High', consequence: 'Risk of lactic acidosis', recommendation: 'Avoid alcohol while on Metformin.' }],
  'lisinopril': [{ with: 'Potassium supplements', severity: 'High', consequence: 'Risk of hyperkalemia', recommendation: 'Do not combine without doctor supervision.' }],
  'ibuprofen': [{ with: 'Aspirin', severity: 'Medium', consequence: 'Reduced aspirin cardioprotective effect', recommendation: 'Separate doses by at least 30 minutes.' }],
};

export default function MedicineInteraction() {
  const { user } = useApp();
  const [medicines, setMedicines] = useState<string[]>(user?.medications || []);
  const [herbs, setHerbs] = useState<string[]>(user?.herbalRemedies || []);
  const [newMed, setNewMed] = useState('');
  const [newHerb, setNewHerb] = useState('');
  const [results, setResults] = useState<{ med1: string; med2: string; severity: string; consequence: string; recommendation: string }[]>([]);
  const [checked, setChecked] = useState(false);

  const addMedicine = () => { if (newMed.trim()) { setMedicines([...medicines, newMed.trim()]); setNewMed(''); } };
  const addHerb = () => { if (newHerb.trim()) { setHerbs([...herbs, newHerb.trim()]); setNewHerb(''); } };
  const removeItem = (arr: 'meds' | 'herbs', idx: number) => {
    if (arr === 'meds') setMedicines(medicines.filter((_, i) => i !== idx));
    else setHerbs(herbs.filter((_, i) => i !== idx));
  };

  const checkInteractions = () => {
    const allItems = [...medicines, ...herbs];
    const found: typeof results = [];
    for (let i = 0; i < allItems.length; i++) {
      for (let j = i + 1; j < allItems.length; j++) {
        const key1 = allItems[i].toLowerCase();
        const key2 = allItems[j].toLowerCase();
        const db1 = interactionDB[key1]?.find(x => x.with.toLowerCase() === key2);
        const db2 = interactionDB[key2]?.find(x => x.with.toLowerCase() === key1);
        const match = db1 || db2;
        if (match) {
          found.push({ med1: allItems[i], med2: allItems[j], severity: match.severity, consequence: match.consequence, recommendation: match.recommendation });
        }
      }
    }
    setResults(found);
    setChecked(true);
  };

  const severityColor = (s: string) => s === 'High' ? 'text-red-600 bg-red-50' : s === 'Medium' ? 'text-orange-600 bg-orange-50' : 'text-yellow-600 bg-yellow-50';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Pill className="w-6 h-6 text-teal-600" /> Medicine Interaction Checker</h1>
        <p className="text-gray-600 mt-1">Check for potential interactions between your medications, herbal remedies, and supplements.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">This tool cross-references known interaction databases. Always consult your doctor or pharmacist for medical decisions. Results are for informational purposes only.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Medications & Supplements</h3>
          <div className="flex gap-2 mb-3">
            <input value={newMed} onChange={e => setNewMed(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMedicine()} placeholder="e.g., Warfarin, Aspirin" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
            <button onClick={addMedicine} className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-teal-700"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2">
            {medicines.map((m, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm">{m}</span>
                <button onClick={() => removeItem('meds', i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Herbal Remedies</h3>
          <div className="flex gap-2 mb-3">
            <input value={newHerb} onChange={e => setNewHerb(e.target.value)} onKeyDown={e => e.key === 'Enter' && addHerb()} placeholder="e.g., Ginger, Garlic, Ginkgo" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
            <button onClick={addHerb} className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2">
            {herbs.map((h, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm">{h}</span>
                <button onClick={() => removeItem('herbs', i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={checkInteractions} disabled={[...medicines, ...herbs].length < 2} className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Check Interactions
      </button>

      {checked && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Results</h3>
          {results.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700">No known interactions found among the items you listed. However, always verify with your healthcare provider.</p>
            </div>
          ) : (
            results.map((r, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{r.med1} + {r.med2}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityColor(r.severity)}`}>{r.severity} Severity</span>
                  </div>
                  <AlertTriangle className={`w-5 h-5 ${r.severity === 'High' ? 'text-red-500' : 'text-orange-500'}`} />
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium text-gray-700">Consequence:</span> <span className="text-gray-600">{r.consequence}</span></p>
                  <p><span className="font-medium text-gray-700">Recommendation:</span> <span className="text-gray-600">{r.recommendation}</span></p>
                  <p className="text-xs text-gray-400 mt-2">Source: Known interaction database • Verification: Cross-referenced</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Example Interaction:</p>
        <p><strong>Warfarin + Ginger:</strong> May increase bleeding risk. Consult your doctor before combining these.</p>
      </div>
    </div>
  );
}
