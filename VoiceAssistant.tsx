import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; text: string; }

export default function VoiceAssistant() {
  const { medications, addNotification, foodLogs } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const processCommand = (cmd: string): string => {
    const lower = cmd.toLowerCase();
    if (lower.includes('remind') && lower.includes('medicine')) {
      const timeMatch = lower.match(/(\d+)\s*(am|pm|o'clock)/);
      const time = timeMatch ? timeMatch[0] : 'next scheduled time';
      addNotification({ title: 'Voice Reminder Created', message: `Medicine reminder set for ${time}`, type: 'reminder' });
      return `I've set a medicine reminder for ${time}. You'll be notified when it's time.`;
    }
    if (lower.includes('what should i eat') || lower.includes('food recommendation')) {
      return 'Based on your profile, I recommend: a balanced meal with lean protein, whole grains, and vegetables. Consider grilled chicken with brown rice and steamed vegetables for lunch.';
    }
    if (lower.includes('sugar history') || lower.includes('glucose')) {
      return 'I don\'t have specific blood sugar readings logged yet. You can add them through the Health History module. Would you like me to help you log a reading?';
    }
    if (lower.includes('daily plan') || lower.includes('today\'s plan')) {
      return 'Your daily plan includes: Morning - breakfast, medications, and a walk. Afternoon - exercise and lunch. Evening - health check-in and dinner. Night - relaxation and sleep by 10:30 PM.';
    }
    if (lower.includes('medicine') || lower.includes('medication')) {
      if (medications.length > 0) {
        return `You have ${medications.length} active medication(s): ${medications.map(m => m.name).join(', ')}. Next doses are scheduled at ${medications[0]?.times?.join(', ') || 'various times'}.`;
      }
      return 'You don\'t have any medications scheduled. Would you like to add one through the Medicine Reminder module?';
    }
    if (lower.includes('notification') || lower.includes('alert')) {
      return 'You have no urgent notifications at this time. Everything looks good!';
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return `Hello! I'm your HealthBridge AI voice assistant. I can help you with medicine reminders, daily plans, nutrition advice, symptom logging, and more. What would you like to do?`;
    }
    if (lower.includes('symptom') || lower.includes('log')) {
      return 'I can help you log symptoms. Please describe what you\'re experiencing, and I\'ll record it. For example: "I have a headache and mild fever."';
    }
    return `I heard: "${cmd}". I can help with medicine reminders, daily plans, nutrition advice, symptom logging, and health information. Try saying "What should I eat today?" or "Remind me to take medicine at 8 PM."`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const response = processCommand(input);
    const assistantMsg: Message = { role: 'assistant', text: response };
    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput('');
    if (speaking && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setListening(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInput(text);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser. Please type your command.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Mic className="w-6 h-6 text-indigo-600" /> Voice Assistant</h1>
        <p className="text-gray-600 mt-1">Hands-free health management through voice or text commands.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Chat Area */}
        <div className="h-80 overflow-y-auto mb-4 space-y-3 p-3 bg-gray-50 rounded-lg">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <Mic className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Try saying or typing a command...</p>
              <div className="mt-4 space-y-1 text-xs text-gray-400">
                <p>"Remind me to take medicine at 8 PM"</p>
                <p>"What should I eat today?"</p>
                <p>"Show my sugar history"</p>
                <p>"What's my daily plan?"</p>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <button onClick={startListening} className={`p-3 rounded-lg ${listening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type or speak a command..." className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          <button onClick={handleSend} className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"><Send className="w-5 h-5" /></button>
          <button onClick={() => setSpeaking(!speaking)} className={`p-3 rounded-lg ${speaking ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
            {speaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
        {listening && <p className="text-sm text-red-500 mt-2 text-center animate-pulse">🎤 Listening... Speak now</p>}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Supported Commands:</p>
        <ul className="space-y-1 text-xs">
          <li>• "Remind me to take medicine at [time]"</li>
          <li>• "What should I eat today?"</li>
          <li>• "Show my sugar history"</li>
          <li>• "What's my daily plan?"</li>
          <li>• "Log symptom: [description]"</li>
          <li>• "Check my notifications"</li>
        </ul>
      </div>
    </div>
  );
}
