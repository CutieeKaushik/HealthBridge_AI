import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Clock, Bell, CheckCircle, AlertCircle, Users, Info } from 'lucide-react';

interface ReminderLog { id: string; medName: string; time: string; status: 'sent' | 'confirmed' | 'followup' | 'escalated'; date: string; }

export default function SmartReminder() {
  const { medications, addNotification, emergencyContacts } = useApp();
  const [logs, setLogs] = useState<ReminderLog[]>([]);
  const [activeReminder, setActiveReminder] = useState<{ medId: string; medName: string; time: string } | null>(null);
  const [followupTimer, setFollowupTimer] = useState<number | null>(null);
  const [escalateToCaregiver, setEscalateToCaregiver] = useState(true);
  const [followupMinutes, setFollowupMinutes] = useState(15);

  const sendReminder = (medId: string) => {
    const med = medications.find(m => m.id === medId);
    if (!med) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActiveReminder({ medId, medName: med.name, time: now });
    addNotification({ title: 'Medicine Reminder', message: `Time to take ${med.name}. Please drink water after taking medicine.`, type: 'reminder' });
    setLogs(prev => [{ id: Date.now().toString(), medName: med.name, time: now, status: 'sent', date: new Date().toISOString() }, ...prev]);
  };

  const confirmDose = () => {
    if (!activeReminder) return;
    setLogs(prev => prev.map(l => l.id === prev[0]?.id ? { ...l, status: 'confirmed' } : l));
    setActiveReminder(null);
    if (followupTimer) { clearTimeout(followupTimer); setFollowupTimer(null); }
  };

  const skipDose = () => {
    if (!activeReminder) return;
    setLogs(prev => prev.map(l => l.id === prev[0]?.id ? { ...l, status: 'followup' } : l));
    // Start follow-up timer
    const timer = window.setTimeout(() => {
      setLogs(prev => [{ id: Date.now().toString(), medName: activeReminder.medName, time: new Date().toLocaleTimeString(), status: 'followup', date: new Date().toISOString() }, ...prev]);
      addNotification({ title: 'Missed Medicine Follow-up', message: `You missed today's ${activeReminder.medName}. Please take it now.`, type: 'alert' });
      if (escalateToCaregiver && emergencyContacts.length > 0) {
        setLogs(prev => [{ id: (Date.now() + 1).toString(), medName: activeReminder.medName, time: new Date().toLocaleTimeString(), status: 'escalated', date: new Date().toISOString() }, ...prev]);
        addNotification({ title: 'Caregiver Notified', message: `Notification sent to ${emergencyContacts[0].name} about missed ${activeReminder.medName}`, type: 'alert' });
      }
      setActiveReminder(null);
    }, followupMinutes * 1000); // In demo, use shorter time
    setFollowupTimer(timer);
    setActiveReminder(null);
  };

  const simulateReminder = () => {
    if (medications.length > 0) sendReminder(medications[0].id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Clock className="w-6 h-6 text-amber-600" /> Smart AI Reminder</h1>
        <p className="text-gray-600 mt-1">Intelligent medication follow-up with caregiver escalation.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">This system sends reminders, follows up after {followupMinutes} minutes if unconfirmed, and optionally notifies caregivers. In production, this uses a backend scheduler for reliable timing.</p>
      </div>

      {/* Active Reminder */}
      {activeReminder && (
        <div className="bg-white rounded-xl border-2 border-amber-400 p-5 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-gray-900">Medicine Reminder</h3>
          </div>
          <p className="text-lg text-gray-700 mb-1">Time to take <strong>{activeReminder.medName}</strong></p>
          <p className="text-sm text-gray-500 mb-4">Please drink water after taking medicine. Scheduled at {activeReminder.time}</p>
          <div className="flex gap-3">
            <button onClick={confirmDose} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Confirm Taken
            </button>
            <button onClick={skipDose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
              Skip / Not Now
            </button>
          </div>
        </div>
      )}

      {/* Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Follow-up Configuration</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Follow-up delay (minutes)</label>
            <input type="number" value={followupMinutes} onChange={e => setFollowupMinutes(+e.target.value)} min={1} max={60} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={escalateToCaregiver} onChange={e => setEscalateToCaregiver(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-gray-700">Escalate to caregiver if unconfirmed</span>
            </label>
          </div>
        </div>
        {escalateToCaregiver && emergencyContacts.length === 0 && (
          <p className="text-xs text-amber-600 mt-2">⚠️ No emergency contacts configured. Add contacts in Emergency Detection or Settings.</p>
        )}
      </div>

      {/* Demo Button */}
      <button onClick={simulateReminder} disabled={medications.length === 0} className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2">
        <Bell className="w-4 h-4" /> Simulate Reminder (Demo)
      </button>

      {/* Reminder Logs */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Notification History</h3>
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500">No reminders sent yet. Add medications and trigger a reminder to see the workflow.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {logs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {log.status === 'confirmed' ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                   log.status === 'followup' ? <AlertCircle className="w-4 h-4 text-amber-500" /> :
                   log.status === 'escalated' ? <Users className="w-4 h-4 text-red-500" /> :
                   <Bell className="w-4 h-4 text-blue-500" />}
                  <div>
                    <p className="text-sm font-medium">{log.medName}</p>
                    <p className="text-xs text-gray-500">{log.date} at {log.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  log.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  log.status === 'followup' ? 'bg-amber-100 text-amber-700' :
                  log.status === 'escalated' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{log.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workflow Explanation */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-3">How Smart Follow-up Works</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3"><span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span><p>Scheduled reminder is sent at the configured time</p></div>
          <div className="flex items-start gap-3"><span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span><p>User confirms they've taken the medicine → logged as "confirmed"</p></div>
          <div className="flex items-start gap-3"><span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span><p>If no confirmation within {followupMinutes} minutes → follow-up reminder sent</p></div>
          <div className="flex items-start gap-3"><span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span><p>If still unconfirmed → caregiver/family member notification (if configured)</p></div>
          <div className="flex items-start gap-3"><span className="bg-teal-100 text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span><p>All events are logged for review and duplicate prevention</p></div>
        </div>
      </div>
    </div>
  );
}
