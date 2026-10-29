import React, { useState } from 'react';
import { useApp, Medication } from '../contexts/AppContext';
import { Bell, Plus, Trash2, Edit2, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function MedicineReminder() {
  const { medications, addMedication, updateMedication, removeMedication, addNotification } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', dosage: '', times: ['08:00'], startDate: new Date().toISOString().split('T')[0], endDate: '', days: 30, reminderEnabled: true });

  const handleSubmit = () => {
    if (!form.name || !form.dosage) return;
    if (editingId) {
      updateMedication(editingId, form);
      setEditingId(null);
    } else {
      const med: Medication = { id: Date.now().toString(), ...form, confirmations: [], times: form.times.filter(Boolean) };
      addMedication(med);
      addNotification({ title: 'Medicine Added', message: `${form.name} scheduled at ${form.times.join(', ')}`, type: 'info' });
    }
    setForm({ name: '', dosage: '', times: ['08:00'], startDate: new Date().toISOString().split('T')[0], endDate: '', days: 30, reminderEnabled: true });
    setShowForm(false);
  };

  const editMed = (med: Medication) => {
    setForm({ name: med.name, dosage: med.dosage, times: med.times, startDate: med.startDate, endDate: med.endDate, days: med.days, reminderEnabled: med.reminderEnabled });
    setEditingId(med.id);
    setShowForm(true);
  };

  const recordDose = (medId: string, status: 'taken' | 'skipped') => {
    const med = medications.find(m => m.id === medId);
    if (!med) return;
    const confirmation = { date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString(), status };
    updateMedication(medId, { confirmations: [...med.confirmations, confirmation] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Bell className="w-6 h-6 text-blue-600" /> Medicine Reminder</h1>
          <p className="text-gray-600 mt-1">Schedule and track your medication adherence.</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: '', dosage: '', times: ['08:00'], startDate: new Date().toISOString().split('T')[0], endDate: '', days: 30, reminderEnabled: true }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">{editingId ? 'Edit Medicine' : 'Add New Medicine'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Medicine Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="e.g., Metformin" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Dosage *</label>
              <input value={form.dosage} onChange={e => setForm({ ...form, dosage: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="e.g., 500mg" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Times (comma separated)</label>
              <input value={form.times.join(', ')} onChange={e => setForm({ ...form, times: e.target.value.split(',').map(t => t.trim()) })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="08:00, 20:00" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Duration (days)</label>
              <input type="number" value={form.days} onChange={e => setForm({ ...form, days: +e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" checked={form.reminderEnabled} onChange={e => setForm({ ...form, reminderEnabled: e.target.checked })} id="reminder" className="w-4 h-4" />
            <label htmlFor="reminder" className="text-sm text-gray-700">Enable push notifications</label>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">{editingId ? 'Update' : 'Add Medicine'}</button>
            <button onClick={() => setShowForm(false)} className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Medicine List */}
      <div className="space-y-3">
        {medications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No medications scheduled. Click "Add Medicine" to get started.</p>
            <p className="text-sm text-gray-400 mt-2">Example: Metformin 500mg, Morning 8:00 AM, Night 8:00 PM, 30 days</p>
          </div>
        ) : (
          medications.map(med => (
            <div key={med.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{med.name}</h4>
                  <p className="text-sm text-gray-500">{med.dosage} • {med.times.join(', ')}</p>
                  <p className="text-xs text-gray-400 mt-1">{med.startDate} → {med.endDate || `${med.days} days`}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editMed(med)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => removeMedication(med.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => recordDose(med.id, 'taken')} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-green-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Taken
                </button>
                <button onClick={() => recordDose(med.id, 'skipped')} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200 flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Skipped
                </button>
              </div>
              {med.confirmations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Recent confirmations:</p>
                  <div className="flex flex-wrap gap-1">
                    {med.confirmations.slice(-5).map((c, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded ${c.status === 'taken' ? 'bg-green-100 text-green-700' : c.status === 'skipped' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                        {c.date} {c.status}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reminder Example */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">Example Reminder Message:</p>
        <p className="text-sm text-blue-700">"Time to take Metformin. Please drink water after taking medicine."</p>
        <p className="text-xs text-blue-500 mt-2">Reminder includes: medicine name, dosage, and helpful instructions. Voice reminders available through the Voice Assistant.</p>
      </div>
    </div>
  );
}
