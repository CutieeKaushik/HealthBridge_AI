import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age?: number;
  dob?: string;
  gender?: string;
  height?: number;
  weight?: number;
  conditions: string[];
  allergies: string[];
  medications: string[];
  herbalRemedies: string[];
  familyHistory: string[];
  lifestyle: string;
  dietaryPreferences: string;
  emergencyContacts: { name: string; phone: string; relation: string }[];
  createdAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  startDate: string;
  endDate: string;
  days: number;
  confirmations: { date: string; time: string; status: 'taken' | 'skipped' | 'pending' | 'missed' }[];
  reminderEnabled: boolean;
}

export interface SymptomRecord {
  id: string;
  symptoms: string[];
  severity: string;
  date: string;
  notes: string;
}

export interface MoodRecord {
  id: string;
  mood: string;
  stress: number;
  anxiety: number;
  fatigue: number;
  date: string;
}

export interface FoodLog {
  id: string;
  foods: string[];
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  date: string;
  meal: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'alert' | 'info' | 'emergency';
  read: boolean;
  date: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  medications: Medication[];
  symptoms: SymptomRecord[];
  moods: MoodRecord[];
  foodLogs: FoodLog[];
  notifications: Notification[];
  emergencyContacts: EmergencyContact[];
  hydration: number;
  activity: number;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addMedication: (med: Medication) => void;
  updateMedication: (id: string, med: Partial<Medication>) => void;
  removeMedication: (id: string) => void;
  addSymptom: (s: SymptomRecord) => void;
  addMood: (m: MoodRecord) => void;
  addFoodLog: (f: FoodLog) => void;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
  setHydration: (v: number) => void;
  setActivity: (v: number) => void;
  addEmergencyContact: (c: EmergencyContact) => void;
  removeEmergencyContact: (id: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('hb_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('hb_medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [symptoms, setSymptoms] = useState<SymptomRecord[]>(() => {
    const saved = localStorage.getItem('hb_symptoms');
    return saved ? JSON.parse(saved) : [];
  });
  const [moods, setMoods] = useState<MoodRecord[]>(() => {
    const saved = localStorage.getItem('hb_moods');
    return saved ? JSON.parse(saved) : [];
  });
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>(() => {
    const saved = localStorage.getItem('hb_foodlogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('hb_notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem('hb_emergency_contacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [hydration, setHydrationState] = useState(() => {
    return parseInt(localStorage.getItem('hb_hydration') || '0');
  });
  const [activity, setActivityState] = useState(() => {
    return parseInt(localStorage.getItem('hb_activity') || '0');
  });

  useEffect(() => { localStorage.setItem('hb_medications', JSON.stringify(medications)); }, [medications]);
  useEffect(() => { localStorage.setItem('hb_symptoms', JSON.stringify(symptoms)); }, [symptoms]);
  useEffect(() => { localStorage.setItem('hb_moods', JSON.stringify(moods)); }, [moods]);
  useEffect(() => { localStorage.setItem('hb_foodlogs', JSON.stringify(foodLogs)); }, [foodLogs]);
  useEffect(() => { localStorage.setItem('hb_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('hb_emergency_contacts', JSON.stringify(emergencyContacts)); }, [emergencyContacts]);
  useEffect(() => { localStorage.setItem('hb_hydration', hydration.toString()); }, [hydration]);
  useEffect(() => { localStorage.setItem('hb_activity', activity.toString()); }, [activity]);
  useEffect(() => { if (user) localStorage.setItem('hb_user', JSON.stringify(user)); }, [user]);

  const login = (email: string, _password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('hb_users') || '[]');
    const found = users.find((u: any) => u.email === email);
    if (found) {
      setUser(found.profile);
      return true;
    }
    return false;
  };

  const register = (email: string, _password: string, name: string): boolean => {
    const users = JSON.parse(localStorage.getItem('hb_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    const profile: UserProfile = {
      id: Date.now().toString(),
      email,
      name,
      conditions: [],
      allergies: [],
      medications: [],
      herbalRemedies: [],
      familyHistory: [],
      lifestyle: 'moderate',
      dietaryPreferences: '',
      emergencyContacts: [],
      createdAt: new Date().toISOString(),
    };
    users.push({ email, password: _password, profile });
    localStorage.setItem('hb_users', JSON.stringify(users));
    setUser(profile);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hb_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    const users = JSON.parse(localStorage.getItem('hb_users') || '[]');
    const idx = users.findIndex((u: any) => u.email === user.email);
    if (idx >= 0) { users[idx].profile = updated; localStorage.setItem('hb_users', JSON.stringify(users)); }
  };

  const addMedication = (med: Medication) => setMedications(prev => [...prev, med]);
  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };
  const removeMedication = (id: string) => setMedications(prev => prev.filter(m => m.id !== id));
  const addSymptom = (s: SymptomRecord) => setSymptoms(prev => [...prev, s]);
  const addMood = (m: MoodRecord) => setMoods(prev => [...prev, m]);
  const addFoodLog = (f: FoodLog) => setFoodLogs(prev => [...prev, f]);
  const addNotification = (n: Omit<Notification, 'id' | 'read' | 'date'>) => {
    const notif: Notification = { ...n, id: Date.now().toString(), read: false, date: new Date().toISOString() };
    setNotifications(prev => [notif, ...prev]);
  };
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const setHydration = (v: number) => setHydrationState(v);
  const setActivity = (v: number) => setActivityState(v);
  const addEmergencyContact = (c: EmergencyContact) => setEmergencyContacts(prev => [...prev, c]);
  const removeEmergencyContact = (id: string) => setEmergencyContacts(prev => prev.filter(c => c.id !== id));

  return (
    <AppContext.Provider value={{
      user, isAuthenticated: !!user, medications, symptoms, moods, foodLogs,
      notifications, emergencyContacts, hydration, activity,
      login, register, logout, updateProfile, addMedication, updateMedication,
      removeMedication, addSymptom, addMood, addFoodLog, addNotification,
      markNotificationRead, setHydration, setActivity, addEmergencyContact, removeEmergencyContact
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
