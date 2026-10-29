import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Settings as SettingsIcon, User, Shield, Bell, Trash2, Save, CheckCircle } from 'lucide-react';

export default function Settings() {
  const { user, updateProfile, logout } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age?.toString() || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [height, setHeight] = useState(user?.height?.toString() || '');
  const [weight, setWeight] = useState(user?.weight?.toString() || '');
  const [conditions, setConditions] = useState(user?.conditions || []);
  const [allergies, setAllergies] = useState(user?.allergies || []);
  const [medications, setMedications] = useState(user?.medications || []);
  const [herbalRemedies, setHerbalRemedies] = useState(user?.herbalRemedies || []);
  const [familyHistory, setFamilyHistory] = useState(user?.familyHistory || []);
  const [lifestyle, setLifestyle] = useState(user?.lifestyle || 'moderate');
  const [dietary, setDietary] = useState(user?.dietaryPreferences || '');
  const [newItem, setNewItem] = useState({ field: '', value: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({
      name, age: age ? parseInt(age) : undefined, gender, height: height ? parseFloat(height) : undefined,
      weight: weight ? parseFloat(weight) : undefined, conditions, allergies, medications, herbalRemedies,
      familyHistory, lifestyle, dietaryPreferences: dietary
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addToArray = (field: string) => {
    if (!newItem.value.trim()) return;
    switch (field) {
      case 'conditions': setConditions([...conditions, newItem.value.trim()]); break;
      case 'allergies': setAllergies([...allergies, newItem.value.trim()]); break;
      case 'medications': setMedications([...medications, newItem.value.trim()]); break;
      case 'herbalRemedies': setHerbalRemedies([...herbalRemedies, newItem.value.trim()]); break;
      case 'familyHistory': setFamilyHistory([...familyHistory, newItem.value.trim()]); break;
    }
    setNewItem({ field: '', value: '' });
  };

  const removeFromArray = (field: string, idx: number) => {
    switch (field) {
      case 'conditions': setConditions(conditions.filter((_, i) => i !== idx)); break;
      case 'allergies': setAllergies(allergies.filter((_, i) => i !== idx)); break;
      case 'medications': setMedications(medications.filter((_, i) => i !== idx)); break;
      case 'herbalRemedies': setHerbalRemedies(herbalRemedies.filter((_, i) => i !== idx)); break;
      case 'familyHistory': setFamilyHistory(familyHistory.filter((_, i) => i !== idx)); break;
    }
  };

  const renderArrayField = (label: string, field: string, items: string[], placeholder: string) => (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2 mt-1">
        <input value={newItem.field === field ? newItem.value : ''} onChange={e => setNewItem({ field, value: e.target.value })} onKeyDown={e => e.key === 'Enter' && addToArray(field)} placeholder={placeholder} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
        <button onClick={() => addToArray(field)} className="bg-teal-100 text-teal-700 px-3 py-2 rounded-lg text-sm hover:bg-teal-200">Add</button>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {items.map((item, i) => (
          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1">
            {item} <button onClick={() => removeFromArray(field, i)} className="text-gray-400 hover:text-red-500">×</button>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><SettingsIcon className="w-6 h-6 text-gray-600" /> Settings & Profile</h1>
        <p className="text-gray-600 mt-1">Manage your health profile and application preferences.</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">Profile saved successfully!</span>
        </div>
      )}

      {/* Personal Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><User className="w-4 h-4" /> Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input value={user?.email || ''} readOnly className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Lifestyle / Activity Level</label>
            <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Very Active</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Dietary Preferences</label>
            <input value={dietary} onChange={e => setDietary(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="e.g., Vegetarian, Vegan, No restrictions" />
          </div>
        </div>
      </div>

      {/* Health Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> Health Information</h3>
        <div className="space-y-4">
          {renderArrayField('Medical Conditions', 'conditions', conditions, 'e.g., Diabetes, Hypertension')}
          {renderArrayField('Allergies', 'allergies', allergies, 'e.g., Penicillin, Peanuts')}
          {renderArrayField('Current Medications', 'medications', medications, 'e.g., Metformin 500mg')}
          {renderArrayField('Herbal Remedies & Supplements', 'herbalRemedies', herbalRemedies, 'e.g., Ashwagandha, Vitamin D')}
          {renderArrayField('Family Medical History', 'familyHistory', familyHistory, 'e.g., Father has diabetes')}
        </div>
      </div>

      {/* Save */}
      <div className="flex gap-3">
        <button onClick={handleSave} className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Profile
        </button>
        <button onClick={logout} className="border border-red-300 text-red-600 px-6 py-2.5 rounded-lg font-medium hover:bg-red-50">
          Logout
        </button>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Data Management</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>All data is stored locally in your browser. For production deployment, data would be stored securely in an encrypted database with proper access controls.</p>
          <button onClick={() => { if (confirm('This will clear all local data. Are you sure?')) { localStorage.clear(); window.location.reload(); } }} className="text-red-600 hover:underline flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Clear All Local Data
          </button>
        </div>
      </div>
    </div>
  );
}
