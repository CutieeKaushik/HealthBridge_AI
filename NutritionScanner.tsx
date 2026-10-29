import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Utensils, Upload, Camera, Info, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function NutritionScanner() {
  const { foodLogs, addFoodLog, user } = useApp();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [demoMode, setDemoMode] = useState(true);

  const demoFoods = [
    { foods: ['Grilled Chicken Breast', 'Brown Rice', 'Steamed Broccoli'], calories: 450, carbs: 42, protein: 38, fat: 12, fiber: 6 },
    { foods: ['Oatmeal', 'Banana', 'Almonds'], calories: 380, carbs: 55, protein: 12, fat: 14, fiber: 8 },
    { foods: ['Salmon Fillet', 'Quinoa', 'Mixed Salad'], calories: 520, carbs: 35, protein: 40, fat: 22, fiber: 5 },
  ];

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const food = demoFoods[Math.floor(Math.random() * demoFoods.length)];
      setResult({ ...food, meal: 'Lunch', suitability: getSuitability(food) });
      setAnalyzing(false);
    }, 2000);
  };

  const getSuitability = (food: any) => {
    const conditions = user?.conditions || [];
    const notes: string[] = [];
    if (conditions.includes('Diabetes') && food.carbs > 50) notes.push('High carb content - monitor blood sugar');
    if (conditions.includes('Heart Disease') && food.fat > 20) notes.push('High fat content - consider leaner options');
    if (notes.length === 0) notes.push('Suitable for your dietary profile');
    return notes;
  };

  const saveToLog = () => {
    if (!result) return;
    addFoodLog({ id: Date.now().toString(), foods: result.foods, calories: result.calories, carbs: result.carbs, protein: result.protein, fat: result.fat, fiber: result.fiber, date: new Date().toISOString().split('T')[0], meal: result.meal });
    setResult(null);
  };

  const todayLogs = foodLogs.filter(f => f.date === new Date().toISOString().split('T')[0]);
  const todayTotals = todayLogs.reduce((acc, f) => ({ calories: acc.calories + f.calories, carbs: acc.carbs + f.carbs, protein: acc.protein + f.protein, fat: acc.fat + f.fat, fiber: acc.fiber + f.fiber }), { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0 });
  const chartData = [{ name: 'Carbs', value: todayTotals.carbs }, { name: 'Protein', value: todayTotals.protein }, { name: 'Fat', value: todayTotals.fat }, { name: 'Fiber', value: todayTotals.fiber }];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Utensils className="w-6 h-6 text-green-600" /> AI Nutrition Scanner</h1>
        <p className="text-gray-600 mt-1">Upload food photos for instant nutritional analysis and dietary guidance.</p>
      </div>

      {demoMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <p className="font-medium">Demonstration Mode</p>
            <p>AI food analysis requires a configured vision model API. Currently showing simulated results for demonstration.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Upload Food Image</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={handleUpload} className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 transition">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">Upload Image</span>
            <span className="text-xs text-gray-400">JPG, PNG supported</span>
          </button>
          <button onClick={handleUpload} className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 transition">
            <Camera className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">Take Photo</span>
            <span className="text-xs text-gray-400">Camera capture</span>
          </button>
        </div>
        {analyzing && (
          <div className="mt-4 flex items-center gap-3 text-sm text-green-600">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
            Analyzing food image...
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">Analysis Results</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-green-700">{result.calories}</p><p className="text-xs text-green-600">Calories</p></div>
            <div className="bg-blue-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-blue-700">{result.carbs}g</p><p className="text-xs text-blue-600">Carbs</p></div>
            <div className="bg-purple-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-purple-700">{result.protein}g</p><p className="text-xs text-purple-600">Protein</p></div>
            <div className="bg-orange-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-orange-700">{result.fat}g</p><p className="text-xs text-orange-600">Fat</p></div>
            <div className="bg-teal-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-teal-700">{result.fiber}g</p><p className="text-xs text-teal-600">Fiber</p></div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Identified Foods:</p>
            <div className="flex flex-wrap gap-2">{result.foods.map((f: string, i: number) => <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{f}</span>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Dietary Suitability:</p>
            {result.suitability.map((s: string, i: number) => <p key={i} className="text-sm text-gray-600">• {s}</p>)}
          </div>
          <div className="flex gap-3">
            <button onClick={saveToLog} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">Save to Food Log</button>
            <button onClick={() => setResult(null)} className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Dismiss</button>
          </div>
        </div>
      )}

      {/* Today's Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Today's Nutrition Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          <div className="text-center"><p className="text-lg font-bold">{todayTotals.calories}</p><p className="text-xs text-gray-500">Calories</p></div>
          <div className="text-center"><p className="text-lg font-bold">{todayTotals.carbs}g</p><p className="text-xs text-gray-500">Carbs</p></div>
          <div className="text-center"><p className="text-lg font-bold">{todayTotals.protein}g</p><p className="text-xs text-gray-500">Protein</p></div>
          <div className="text-center"><p className="text-lg font-bold">{todayTotals.fat}g</p><p className="text-xs text-gray-500">Fat</p></div>
          <div className="text-center"><p className="text-lg font-bold">{todayTotals.fiber}g</p><p className="text-xs text-gray-500">Fiber</p></div>
        </div>
        {chartData.some(d => d.value > 0) && (
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Food History */}
      {foodLogs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Food History</h3>
          <div className="space-y-2">
            {foodLogs.slice(-5).reverse().map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="text-sm font-medium">{log.foods.join(', ')}</p><p className="text-xs text-gray-500">{log.meal} • {log.date}</p></div>
                <span className="text-sm font-medium text-gray-700">{log.calories} cal</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
