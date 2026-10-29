import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Activity, Brain, Stethoscope, Pill, Utensils, AlertTriangle, Smartphone, Calendar, FileText, TrendingUp, Mic, MessageCircle, Bell, Clock, Leaf, Zap, ChevronDown, ChevronUp, Menu, X, CheckCircle, Users, Lock } from 'lucide-react';

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    { icon: Pill, title: 'Medicine Interaction Checker', desc: 'AI-powered analysis of drug interactions, herbal remedies, and supplement combinations.' },
    { icon: Brain, title: 'Emotion-Based Health Assistant', desc: 'Mood analysis with meditation, yoga, and wellness recommendations.' },
    { icon: Utensils, title: 'AI Nutrition Scanner', desc: 'Upload food photos for instant nutritional analysis and dietary guidance.' },
    { icon: AlertTriangle, title: 'Emergency Detection', desc: 'Smart symptom assessment with instant emergency contact notifications.' },
    { icon: Smartphone, title: 'Smart Medicine Box', desc: 'IoT-connected device for medication tracking with LED and buzzer alerts.' },
    { icon: Calendar, title: 'Personalized Daily Plan', desc: 'AI-generated morning-to-night health plans based on your profile.' },
    { icon: FileText, title: 'Doctor Report Generator', desc: 'Upload medical documents for AI-powered summary generation.' },
    { icon: TrendingUp, title: 'Health Risk Prediction', desc: '5-10 year preventive health risk assessment with recommendations.' },
    { icon: Mic, title: 'Voice Assistant', desc: 'Hands-free health management through natural voice commands.' },
    { icon: MessageCircle, title: 'Health Chatbot', desc: 'Instant medical guidance with possible causes and recommendations.' },
    { icon: Bell, title: 'Smart AI Reminders', desc: 'Intelligent follow-up system with caregiver notifications.' },
    { icon: Leaf, title: 'Traditional + Modern Treatment', desc: 'Bridging Ayurveda, yoga, and modern medicine safely.' },
  ];

  const faqs = [
    { q: 'Is HealthBridge AI a replacement for doctor visits?', a: 'No. HealthBridge AI is a complementary tool that helps you manage your health between doctor visits. Always consult qualified healthcare professionals for diagnosis and treatment.' },
    { q: 'How does the AI medicine interaction checker work?', a: 'Our system cross-references your medications, herbal remedies, and supplements against known interaction databases to identify potential risks. It always recommends consulting your doctor for medical decisions.' },
    { q: 'Is my health data secure?', a: 'Yes. All data is encrypted, stored securely, and only accessible by you. We follow healthcare data protection standards and never share your information without explicit consent.' },
    { q: 'What is the Smart Medicine Box?', a: 'It\'s an IoT device (Arduino/ESP32-based) that connects to the app to track medication adherence using weight sensors, LED indicators, and buzzer alerts.' },
    { q: 'Can I use this without the IoT device?', a: 'Absolutely. All software features work independently. The Smart Medicine Box is an optional hardware add-on for enhanced medication tracking.' },
    { q: 'How accurate are the AI predictions?', a: 'Our AI features are provided as demonstration tools and educational aids. They are not clinically validated diagnostic tools. Always verify with healthcare professionals.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">HealthBridge <span className="text-teal-600">AI</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-teal-600 text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-teal-600 text-sm font-medium">How It Works</a>
              <a href="#about" className="text-gray-600 hover:text-teal-600 text-sm font-medium">About</a>
              <a href="#faq" className="text-gray-600 hover:text-teal-600 text-sm font-medium">FAQ</a>
              <Link to="/auth" className="text-gray-700 hover:text-teal-600 text-sm font-medium">Login</Link>
              <Link to="/auth?mode=register" className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition">Get Started</Link>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-600 py-2">Features</a>
            <a href="#how-it-works" className="block text-gray-600 py-2">How It Works</a>
            <a href="#about" className="block text-gray-600 py-2">About</a>
            <a href="#faq" className="block text-gray-600 py-2">FAQ</a>
            <Link to="/auth" className="block text-gray-700 py-2">Login</Link>
            <Link to="/auth?mode=register" className="block bg-teal-600 text-white px-4 py-2 rounded-lg text-center">Get Started</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> AI-Powered Healthcare Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              AI-Integrated Smart <span className="text-teal-600">Healthcare</span> System
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Bridging traditional wellness and modern medicine through intelligent health management. 
              Smarter Healthcare. Safer Living. Better Tomorrow.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/auth?mode=register" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition shadow-lg shadow-teal-200">
                Get Started Free
              </Link>
              <a href="#features" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-teal-300 hover:text-teal-600 transition">
                Explore Features
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Free to use</div>
              <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> HIPAA aware</div>
              <div className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> 14+ Modules</div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-8 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Activity className="w-8 h-8 text-teal-500 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Health Monitoring</p>
                  <p className="text-xs text-gray-500">24/7 tracking</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Brain className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-gray-700">AI Analysis</p>
                  <p className="text-xs text-gray-500">Smart insights</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Shield className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Secure Data</p>
                  <p className="text-xs text-gray-500">Encrypted</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Stethoscope className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Medical Reports</p>
                  <p className="text-xs text-gray-500">AI summaries</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-teal-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Healthcare Modules</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">14+ integrated modules covering every aspect of modern health management, from medication tracking to AI-powered disease prediction.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                <f.icon className="w-10 h-10 text-teal-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">Get started in minutes with our simple onboarding process.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up and complete your health profile securely.' },
              { step: '02', title: 'Set Up Health Data', desc: 'Add medications, conditions, allergies, and preferences.' },
              { step: '03', title: 'Use AI Modules', desc: 'Access all 14+ modules for comprehensive health management.' },
              { step: '04', title: 'Stay Healthy', desc: 'Receive personalized plans, reminders, and health insights.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-700 font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Benefits of AI-Powered Preventive Healthcare</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Early Detection', desc: 'AI analyzes patterns to identify potential health risks before they become serious.' },
              { title: 'Personalized Care', desc: 'Recommendations tailored to your unique health profile, lifestyle, and goals.' },
              { title: 'Medication Safety', desc: 'Real-time interaction checking prevents dangerous drug combinations.' },
              { title: '24/7 Monitoring', desc: 'Continuous health tracking with intelligent alerts and follow-ups.' },
              { title: 'Bridging Traditions', desc: 'Safely integrating traditional wellness practices with modern medicine.' },
              { title: 'Emergency Ready', desc: 'Instant emergency detection and contact notification when you need it most.' },
            ].map((b, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-white/80 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional + Modern */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bridging Traditional & Modern Healthcare</h2>
              <p className="text-gray-600 mb-4">HealthBridge AI uniquely combines evidence-based modern medicine with time-tested traditional wellness practices like Ayurveda, yoga, and herbal remedies.</p>
              <p className="text-gray-600 mb-6">Our AI system checks for interactions between prescribed medications and traditional remedies, ensuring safe integration of both approaches.</p>
              <div className="space-y-3">
                {['Yoga & meditation recommendations', 'Herbal remedy safety checks', 'Dietary guidance from both traditions', 'Lifestyle improvement suggestions'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <Leaf className="w-8 h-8 text-green-500 mb-2" />
                  <p className="font-medium text-sm">Traditional</p>
                  <p className="text-xs text-gray-500">Yoga, Ayurveda, Herbs</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <Stethoscope className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="font-medium text-sm">Modern</p>
                  <p className="text-xs text-gray-500">Medicine, Lab Tests</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm col-span-2">
                  <Heart className="w-8 h-8 text-teal-500 mb-2" />
                  <p className="font-medium text-sm">HealthBridge AI</p>
                  <p className="text-xs text-gray-500">Safe integration of both approaches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
          <p className="text-gray-600 mb-8">Enterprise-grade technology stack for reliability and security.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Supabase', 'AI/ML Models', 'MQTT/IoT', 'Arduino/ESP32'].map((tech, i) => (
              <span key={i} className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm border">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Lock className="w-12 h-12 text-teal-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security First</h2>
                <p className="text-gray-600">Your health data is encrypted, access-controlled, and never shared without your explicit consent. We follow healthcare data protection best practices.</p>
              </div>
              <div className="space-y-3">
                {['End-to-end encryption', 'User-only data access', 'Consent-based sharing', 'Secure authentication', 'Regular security audits', 'Data deletion options'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-teal-500" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex justify-between items-center text-left">
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 text-sm">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-gray-600 mb-8">Join HealthBridge AI and experience the future of personalized healthcare management.</p>
          <Link to="/auth?mode=register" className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition shadow-lg shadow-teal-200">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">HealthBridge AI</span>
              </div>
              <p className="text-gray-400 text-sm">Smarter Healthcare. Safer Living. Better Tomorrow.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#features" className="block hover:text-white">Features</a>
                <a href="#how-it-works" className="block hover:text-white">How It Works</a>
                <a href="#faq" className="block hover:text-white">FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white">Privacy Policy</a>
                <a href="#" className="block hover:text-white">Terms of Service</a>
                <a href="#" className="block hover:text-white">Cookie Policy</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>support@healthbridge.ai</p>
                <p>+1 (555) 123-4567</p>
                <div className="flex gap-3 mt-3">
                  <Users className="w-5 h-5 hover:text-teal-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 HealthBridge AI. All rights reserved. This is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
