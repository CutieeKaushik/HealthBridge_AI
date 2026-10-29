import React, { useState } from 'react';
import { MessageCircle, Send, AlertTriangle, Info } from 'lucide-react';

interface ChatMsg { role: 'user' | 'bot'; content: string; sections?: { title: string; items: string[] }[]; }

const responses: Record<string, { sections: { title: string; items: string[] }[] }> = {
  'headache fever': { sections: [
    { title: 'Possible Causes', items: ['Viral fever or flu', 'Migraine', 'Tension headache with infection', 'Sinusitis'] },
    { title: 'Immediate Recommendations', items: ['Drink plenty of water', 'Rest in a quiet, dark room', 'Take paracetamol if appropriate', 'Apply a cool compress to forehead', 'Monitor temperature regularly'] },
    { title: 'When to Seek Help', items: ['If fever continues for more than 2 days', 'If headache is severe and sudden', 'If accompanied by stiff neck or confusion', 'If temperature exceeds 103°F (39.4°C)'] }
  ]},
  'chest pain': { sections: [
    { title: '⚠️ IMPORTANT', items: ['Chest pain can be a medical emergency. If severe, call 911 immediately.'] },
    { title: 'Possible Causes', items: ['Heart-related conditions', 'Acid reflux/GERD', 'Muscle strain', 'Anxiety or panic attack'] },
    { title: 'Immediate Recommendations', items: ['Sit down and rest', 'Try slow deep breathing', 'If prescribed nitroglycerin, take as directed', 'Do NOT ignore persistent chest pain'] },
    { title: 'When to Seek Help', items: ['IMMEDIATELY if pain radiates to arm/jaw', 'If accompanied by shortness of breath', 'If you feel dizzy or sweaty', 'If pain lasts more than a few minutes'] }
  ]},
  'default': { sections: [
    { title: 'General Guidance', items: ['I understand you\'re experiencing symptoms. Let me provide some general guidance.', 'Please describe your symptoms in more detail for better assistance.', 'Remember: this chatbot provides general information, not medical diagnoses.'] },
    { title: 'Recommendations', items: ['Stay hydrated', 'Get adequate rest', 'Monitor your symptoms', 'Keep a symptom diary'] },
    { title: 'When to Seek Help', items: ['If symptoms worsen or persist beyond a few days', 'If you experience severe pain', 'If you have difficulty breathing', 'Always consult a doctor for proper diagnosis'] }
  ]}
};

function getResponse(input: string): ChatMsg {
  const lower = input.toLowerCase();
  let matched = responses['default'];
  if (lower.includes('headache') && (lower.includes('fever') || lower.includes('temperature'))) matched = responses['headache fever'];
  else if (lower.includes('chest pain') || lower.includes('chest tightness')) matched = responses['chest pain'];
  else if (lower.includes('headache')) matched = { sections: [{ title: 'Possible Causes', items: ['Tension headache', 'Migraine', 'Dehydration', 'Eye strain'] }, { title: 'Immediate Recommendations', items: ['Rest in a dark room', 'Stay hydrated', 'Try gentle neck stretches', 'Take OTC pain relief if appropriate'] }, { title: 'When to Seek Help', items: ['If headache is sudden and severe', 'If accompanied by vision changes', 'If it persists for more than 3 days'] }] };
  else if (lower.includes('cold') || lower.includes('cough')) matched = { sections: [{ title: 'Possible Causes', items: ['Common cold (viral)', 'Allergies', 'Flu'] }, { title: 'Immediate Recommendations', items: ['Rest and hydrate', 'Use a humidifier', 'Warm fluids like soup or tea', 'Salt water gargle for sore throat'] }, { title: 'When to Seek Help', items: ['If symptoms last more than 10 days', 'If you have difficulty breathing', 'If fever exceeds 101.3°F for more than 3 days'] }] };
  return { role: 'bot', content: 'Based on your symptoms, here\'s what I can suggest:', sections: matched.sections };
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'bot', content: 'Hello! I\'m your HealthBridge AI assistant. Describe your symptoms and I\'ll provide guidance.\n\nExample: "I have headache and fever"', sections: undefined }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, response]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><MessageCircle className="w-6 h-6 text-teal-600" /> Health Chatbot</h1>
        <p className="text-gray-600 mt-1">Instant medical guidance. Not a substitute for professional diagnosis.</p>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-teal-700">This chatbot provides general health information only. It does not diagnose conditions. For medical emergencies, call 911 immediately.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 flex flex-col" style={{ height: '500px' }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-2xl rounded-br-md px-4 py-2' : 'bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3'}`}>
                {msg.role === 'bot' && <p className="text-sm text-gray-700 mb-2">{msg.content}</p>}
                {msg.role === 'user' && <p className="text-sm">{msg.content}</p>}
                {msg.sections?.map((section, j) => (
                  <div key={j} className="mt-3">
                    <h4 className={`font-semibold text-sm mb-1 ${msg.role === 'bot' ? 'text-gray-900' : ''}`}>{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, k) => (
                        <li key={k} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-teal-500 mt-0.5">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 p-3 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Describe your symptoms..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500" />
          <button onClick={handleSend} disabled={loading} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}
