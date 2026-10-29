import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MedicineInteraction from './pages/MedicineInteraction';
import EmotionAssistant from './pages/EmotionAssistant';
import NutritionScanner from './pages/NutritionScanner';
import EmergencyDetection from './pages/EmergencyDetection';
import SmartMedicineBox from './pages/SmartMedicineBox';
import DailyPlan from './pages/DailyPlan';
import DoctorReport from './pages/DoctorReport';
import HealthRisk from './pages/HealthRisk';
import VoiceAssistant from './pages/VoiceAssistant';
import Chatbot from './pages/Chatbot';
import SmartReminder from './pages/SmartReminder';
import MedicineReminder from './pages/MedicineReminder';
import TraditionalModern from './pages/TraditionalModern';
import DiseasePrediction from './pages/DiseasePrediction';
import HealthHistory from './pages/HealthHistory';
import NotificationsPage from './pages/NotificationsPage';
import Settings from './pages/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="medicine-interaction" element={<MedicineInteraction />} />
        <Route path="emotion" element={<EmotionAssistant />} />
        <Route path="nutrition" element={<NutritionScanner />} />
        <Route path="emergency" element={<EmergencyDetection />} />
        <Route path="medicine-box" element={<SmartMedicineBox />} />
        <Route path="daily-plan" element={<DailyPlan />} />
        <Route path="doctor-report" element={<DoctorReport />} />
        <Route path="health-risk" element={<HealthRisk />} />
        <Route path="voice" element={<VoiceAssistant />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="smart-reminder" element={<SmartReminder />} />
        <Route path="medicine-reminder" element={<MedicineReminder />} />
        <Route path="traditional-modern" element={<TraditionalModern />} />
        <Route path="disease-prediction" element={<DiseasePrediction />} />
        <Route path="history" element={<HealthHistory />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
