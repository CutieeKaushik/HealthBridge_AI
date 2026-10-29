import React, { useState } from 'react';
import { Leaf, Stethoscope, Info, AlertTriangle } from 'lucide-react';

const conditions = [
  {
    name: 'Diabetes',
    modern: { tests: ['Fasting blood sugar', 'HbA1c', 'Lipid profile'], specialist: 'Endocrinologist / General Physician', medicines: ['Metformin (if prescribed)', 'Insulin (if prescribed)', 'Blood sugar monitoring'] },
    traditional: { yoga: ['Surya Namaskar (Sun Salutation)', 'Pranayama (breathing exercises)', 'Mandukasana'], diet: ['Fenugreek seeds (Methi)', 'Bitter gourd (Karela)', 'Balanced low-GI diet', 'Cinnamon in moderation'], lifestyle: ['Daily 30-min walk', 'Stress management', 'Adequate sleep (7-8 hours)'] }
  },
  {
    name: 'Hypertension',
    modern: { tests: ['Blood pressure monitoring', 'ECG', 'Kidney function test'], specialist: 'Cardiologist / General Physician', medicines: ['ACE inhibitors (if prescribed)', 'Calcium channel blockers (if prescribed)', 'Regular BP monitoring'] },
    traditional: { yoga: ['Shavasana', 'Chandra Bhedana Pranayama', 'Vajrasana'], diet: ['Low sodium diet', 'Garlic cloves (empty stomach)', 'Hibiscus tea', 'Potassium-rich foods'], lifestyle: ['Regular aerobic exercise', 'Meditation', 'Limit alcohol and caffeine'] }
  },
  {
    name: 'Common Cold',
    modern: { tests: ['Usually no tests needed', 'CBC if persistent'], specialist: 'General Physician', medicines: ['Antihistamines (if needed)', 'Decongestants (if needed)', 'Rest and hydration'] },
    traditional: { yoga: ['Anulom Vilom', 'Gentle stretching'], diet: ['Turmeric milk (Haldi Doodh)', 'Ginger tea', 'Tulsi (Holy Basil)', 'Honey with warm water'], lifestyle: ['Steam inhalation', 'Warm salt water gargle', 'Adequate rest'] }
  },
  {
    name: 'Anxiety / Stress',
    modern: { tests: ['Psychological assessment', 'Thyroid function test'], specialist: 'Psychiatrist / Psychologist', medicines: ['SSRIs (if prescribed)', 'Therapy/Counseling', 'Cognitive Behavioral Therapy'] },
    traditional: { yoga: ['Yoga Nidra', 'Bhramari Pranayama', 'Viparita Karani'], diet: ['Chamomile tea', 'Ashwagandha (consult doctor)', 'Magnesium-rich foods', 'Avoid excess caffeine'], lifestyle: ['Daily meditation (15-20 min)', 'Nature walks', 'Journaling', 'Digital detox periods'] }
  }
];

export default function TraditionalModern() {
  const [selected, setSelected] = useState(0);
  const cond = conditions[selected];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Leaf className="w-6 h-6 text-green-600" /> Traditional + Modern Treatment</h1>
        <p className="text-gray-600 mt-1">Integrating evidence-based modern medicine with traditional wellness practices.</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-green-700">Traditional practices complement modern medical care and should not replace prescribed treatment without professional guidance. Always consult your doctor before making changes to your treatment plan.</p>
      </div>

      {/* Condition Selector */}
      <div className="flex flex-wrap gap-2">
        {conditions.map((c, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selected === i ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Modern Treatment */}
        <div className="bg-white rounded-xl border border-blue-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Modern Treatment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Required Lab Tests</p>
              <ul className="space-y-1">{cond.modern.tests.map((t, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />{t}</li>)}</ul>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Medical Specialist</p>
              <p className="text-sm text-gray-600">{cond.modern.specialist}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Medications / Treatment</p>
              <ul className="space-y-1">{cond.modern.medicines.map((m, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />{m}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* Traditional Treatment */}
        <div className="bg-white rounded-xl border border-green-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Traditional & Lifestyle</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">🧘 Yoga & Meditation</p>
              <ul className="space-y-1">{cond.traditional.yoga.map((y, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" />{y}</li>)}</ul>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">🌿 Diet & Herbal Remedies</p>
              <ul className="space-y-1">{cond.traditional.diet.map((d, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" />{d}</li>)}</ul>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">🏃 Lifestyle Improvements</p>
              <ul className="space-y-1">{cond.traditional.lifestyle.map((l, i) => <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" />{l}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      {/* Diabetes Example */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Diabetes Example</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-1">Modern Approach:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Blood sugar test (fasting & post-meal)</li>
              <li>• Physician consultation for medication</li>
              <li>• Regular HbA1c monitoring</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Traditional & Lifestyle:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Daily walking (30+ minutes)</li>
              <li>• Fenugreek seeds (soaked overnight)</li>
              <li>• Balanced diet with controlled carbohydrates</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-1">Important Note:</p>
        <p>Herbal remedies and traditional practices may interact with prescribed medications. Use the Medicine Interaction Checker to verify safety before combining treatments. Always inform your doctor about any traditional remedies you're using.</p>
      </div>
    </div>
  );
}
