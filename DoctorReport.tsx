import React, { useState } from 'react';
import { FileText, Upload, Download, Printer, Edit3, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ExtractedData {
  testResults: { name: string; value: string; unit: string; range: string; abnormal: boolean }[];
  diagnoses: string[];
  medications: string[];
  allergies: string[];
  history: string[];
}

export default function DoctorReport() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [data, setData] = useState<ExtractedData | null>(null);
  const [editing, setEditing] = useState(false);
  const [reports, setReports] = useState<{ id: string; date: string; title: string }[]>([]);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setData({
        testResults: [
          { name: 'Blood Glucose (Fasting)', value: '142', unit: 'mg/dL', range: '70-100', abnormal: true },
          { name: 'HbA1c', value: '7.2', unit: '%', range: '<5.7', abnormal: true },
          { name: 'Total Cholesterol', value: '195', unit: 'mg/dL', range: '<200', abnormal: false },
          { name: 'HDL Cholesterol', value: '45', unit: 'mg/dL', range: '>40', abnormal: false },
          { name: 'Blood Pressure', value: '135/85', unit: 'mmHg', range: '<120/80', abnormal: true },
          { name: 'BMI', value: '28.5', unit: 'kg/m²', range: '18.5-24.9', abnormal: true },
        ],
        diagnoses: ['Type 2 Diabetes (preliminary)', 'Prehypertension'],
        medications: ['Metformin 500mg', 'Lisinopril 10mg'],
        allergies: ['Penicillin'],
        history: ['Family history of diabetes', 'Sedentary lifestyle'],
      });
      setUploaded(true);
      setAnalyzing(false);
    }, 2500);
  };

  const generateReport = () => {
    if (!data) return;
    const report = { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], title: `Health Summary - ${new Date().toLocaleDateString()}` };
    setReports(prev => [report, ...prev]);
    alert('Report generated! In production, this would download as a PDF.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-600" /> Doctor Report Generator</h1>
        <p className="text-gray-600 mt-1">Upload medical documents for AI-powered extraction and summary generation.</p>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-indigo-700">Document extraction uses AI analysis. In demo mode, sample medical data is shown. Always verify extracted information for accuracy.</p>
      </div>

      {/* Upload */}
      {!uploaded && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Upload Medical Document</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <button onClick={handleUpload} className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Upload PDF/Image</span>
              <span className="text-xs text-gray-400">Lab reports, prescriptions, etc.</span>
            </button>
            <button onClick={handleUpload} className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition">
              <FileText className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Load Demo Data</span>
              <span className="text-xs text-gray-400">Sample medical report</span>
            </button>
          </div>
          {analyzing && (
            <div className="mt-4 flex items-center gap-3 text-sm text-indigo-600">
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              Extracting data from document...
            </div>
          )}
        </div>
      )}

      {/* Extracted Data */}
      {data && (
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Extracted Test Results</h3>
              <button onClick={() => setEditing(!editing)} className="text-sm text-indigo-600 flex items-center gap-1"><Edit3 className="w-4 h-4" /> {editing ? 'Done Editing' : 'Edit'}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-2 px-2 text-gray-600">Test</th><th className="text-left py-2 px-2 text-gray-600">Value</th><th className="text-left py-2 px-2 text-gray-600">Unit</th><th className="text-left py-2 px-2 text-gray-600">Reference</th><th className="text-left py-2 px-2 text-gray-600">Status</th></tr></thead>
                <tbody>
                  {data.testResults.map((t, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 px-2">{t.name}</td>
                      <td className="py-2 px-2 font-medium">{t.value}</td>
                      <td className="py-2 px-2 text-gray-500">{t.unit}</td>
                      <td className="py-2 px-2 text-gray-500">{t.range}</td>
                      <td className="py-2 px-2">{t.abnormal ? <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">Abnormal</span> : <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">Normal</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Diagnoses</h4>
              {data.diagnoses.map((d, i) => <p key={i} className="text-sm text-gray-700 py-1">• {d}</p>)}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Current Medications</h4>
              {data.medications.map((m, i) => <p key={i} className="text-sm text-gray-700 py-1">• {m}</p>)}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Allergies & History</h4>
              {[...data.allergies, ...data.history].map((h, i) => <p key={i} className="text-sm text-gray-700 py-1">• {h}</p>)}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={generateReport} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"><FileText className="w-4 h-4" /> Generate Summary</button>
            <button onClick={() => window.print()} className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"><Printer className="w-4 h-4" /> Print</button>
            <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"><Download className="w-4 h-4" /> Download PDF</button>
          </div>
        </>
      )}

      {/* Report History */}
      {reports.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Report History</h3>
          <div className="space-y-2">
            {reports.map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-gray-500">{r.date}</p></div>
                <button className="text-indigo-600 text-sm hover:underline">View</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
