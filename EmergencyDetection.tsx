import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { AlertTriangle, Phone, MapPin, Mic, Send, CheckCircle, Clock, XCircle } from 'lucide-react';

const criticalSymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconsciousness', 'seizure', 'high fever above 104', 'stroke symptoms', 'severe allergic reaction'];

export default function EmergencyDetection() {
  const { emergencyContacts, addEmergencyContact, addNotification, addSymptom } = useApp();
  const [symptomText, setSymptomText] = useState('');
  const [assessment, setAssessment] = useState<any>(null);
  const [alertSent, setAlertSent] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });
  const [showAddContact, setShowAddContact] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const assessSymptoms = () => {
    const lower = symptomText.toLowerCase();
    const isCritical = criticalSymptoms.some(s => lower.includes(s));
    const severity = isCritical ? 'Critical' : lower.includes('pain') || lower.includes('fever') ? 'Moderate' : 'Low';
    setAssessment({
      severity,
      isCritical,
      guidance: isCritical
        ? 'IMMEDIATE: Call emergency services (911/112) now. Do not wait. Stay calm and follow dispatcher instructions.'
        : severity === 'Moderate'
        ? 'Seek medical attention soon. Monitor symptoms closely. Contact your doctor if symptoms worsen.'
        : 'Monitor symptoms. Rest and hydrate. Seek medical attention if symptoms persist or worsen.',
      actions: isCritical
        ? ['Call 911/emergency services immediately', 'Do not drive yourself', 'Unlock your door for emergency responders', 'Have medication list ready']
        : severity === 'Moderate'
        ? ['Contact your doctor today', 'Monitor temperature and symptoms', 'Rest and stay hydrated', 'Keep emergency contacts informed']
        : ['Rest and observe', 'Stay hydrated', 'Check back if symptoms change', 'Log symptoms for your doctor']
    });
    addSymptom({ id: Date.now().toString(), symptoms: [symptomText], severity, date: new Date().toISOString(), notes: '' });
  };

  const sendEmergencyAlert = () => {
    if (emergencyContacts.length === 0) return;
    addNotification({ title: 'Emergency Alert Sent', message: `Alert sent to ${emergencyContacts.length} contact(s): ${emergencyContacts.map(c => c.name).join(', ')}`, type: 'emergency' });
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 5000);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      addEmergencyContact({ ...newContact, id: Date.now().toString() });
      setNewContact({ name: '', phone: '', relation: '' });
      setShowAddContact(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><AlertTriangle className="w-6 h-6 text-red-600" /> Emergency Detection</h1>
        <p className="text-gray-600 mt-1">Report symptoms for AI urgency assessment and emergency contact notification.</p>
      </div>

      {assessment?.isCritical && (
        <div className="bg-red-600 text-white rounded-xl p-6 animate-pulse">
          <h2 className="text-xl font-bold mb-2">⚠️ CRITICAL EMERGENCY DETECTED</h2>
          <p className="text-red-100">{assessment.guidance}</p>
          <button onClick={() => window.open('tel:911')} className="mt-4 bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-lg">
            📞 Call 911 Now
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Describe Your Symptoms</h3>
        <textarea value={symptomText} onChange={e => setSymptomText(e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none" placeholder="Describe what you're experiencing... e.g., chest pain, difficulty breathing, high fever" />
        <div className="flex flex-wrap gap-3 mt-3">
          <button onClick={assessSymptoms} disabled={!symptomText.trim()} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
            <Send className="w-4 h-4" /> Assess Symptoms
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Mic className="w-4 h-4" /> Voice Input
          </button>
          <button onClick={() => setLocationShared(!locationShared)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${locationShared ? 'bg-green-50 text-green-700 border border-green-200' : 'border border-gray-300 hover:bg-gray-50'}`}>
            <MapPin className="w-4 h-4" /> {locationShared ? 'Location Shared' : 'Share Location'}
          </button>
        </div>
      </div>

      {assessment && (
        <div className={`rounded-xl p-5 border ${assessment.isCritical ? 'bg-red-50 border-red-200' : assessment.severity === 'Moderate' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
          <h3 className={`font-bold text-lg mb-2 ${assessment.isCritical ? 'text-red-700' : assessment.severity === 'Moderate' ? 'text-orange-700' : 'text-green-700'}`}>
            Urgency: {assessment.severity}
          </h3>
          <p className="text-sm text-gray-700 mb-3">{assessment.guidance}</p>
          <h4 className="font-medium text-sm text-gray-800 mb-2">Recommended Actions:</h4>
          <ul className="space-y-1">
            {assessment.actions.map((a: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Emergency Contacts</h3>
          <button onClick={() => setShowAddContact(!showAddContact)} className="text-sm text-teal-600 hover:underline">+ Add Contact</button>
        </div>
        {showAddContact && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-2">
            <input value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} placeholder="Name" className="w-full px-3 py-2 border rounded-lg text-sm" />
            <input value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} placeholder="Phone number" className="w-full px-3 py-2 border rounded-lg text-sm" />
            <input value={newContact.relation} onChange={e => setNewContact({ ...newContact, relation: e.target.value })} placeholder="Relation (e.g., Spouse, Parent)" className="w-full px-3 py-2 border rounded-lg text-sm" />
            <button onClick={handleAddContact} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">Save Contact</button>
          </div>
        )}
        {emergencyContacts.length === 0 ? (
          <p className="text-sm text-gray-500">No emergency contacts added yet.</p>
        ) : (
          <div className="space-y-2">
            {emergencyContacts.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <div><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-gray-500">{c.relation} • {c.phone}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {emergencyContacts.length > 0 && (
          <button onClick={sendEmergencyAlert} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Send Emergency Alert to All Contacts
          </button>
        )}
        {alertSent && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Alert notification sent. (Simulated - configure notification service for real delivery)</span>
          </div>
        )}
      </div>
    </div>
  );
}
