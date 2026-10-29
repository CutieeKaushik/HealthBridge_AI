import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, WifiOff, Lightbulb, Volume2, Scale, Clock, CheckCircle, AlertCircle, Settings, Info } from 'lucide-react';

export default function SmartMedicineBox() {
  const [connected, setConnected] = useState(false);
  const [simMode, setSimMode] = useState(true);
  const [sensorWeight, setSensorWeight] = useState(0);
  const [ledStatus, setLedStatus] = useState('off');
  const [buzzerActive, setBuzzerActive] = useState(false);
  const [events, setEvents] = useState<{ time: string; type: string; message: string }[]>([]);
  const [deviceConfig, setDeviceConfig] = useState({ ip: '192.168.1.100', port: '1883', protocol: 'MQTT' });

  useEffect(() => {
    if (simMode && connected) {
      const interval = setInterval(() => {
        setSensorWeight(Math.random() * 100);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [simMode, connected]);

  const addEvent = (type: string, message: string) => {
    setEvents(prev => [{ time: new Date().toLocaleTimeString(), type, message }, ...prev].slice(0, 20));
  };

  const toggleConnection = () => {
    if (!connected) {
      setConnected(true);
      addEvent('connect', 'Device connected (simulated)');
    } else {
      setConnected(false);
      addEvent('disconnect', 'Device disconnected');
    }
  };

  const triggerLED = (color: string) => {
    setLedStatus(color);
    addEvent('led', `LED activated: ${color}`);
    setTimeout(() => setLedStatus('off'), 3000);
  };

  const triggerBuzzer = () => {
    setBuzzerActive(true);
    addEvent('buzzer', 'Buzzer activated for 5 seconds');
    setTimeout(() => setBuzzerActive(false), 5000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Smartphone className="w-6 h-6 text-blue-600" /> IoT Smart Medicine Box</h1>
        <p className="text-gray-600 mt-1">Monitor and control your Arduino/ESP32-based smart medicine box.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Simulated Device Mode</p>
          <p>No physical device is connected. This dashboard demonstrates the interface and workflows. See setup guide below for hardware instructions.</p>
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {connected ? <Wifi className="w-6 h-6 text-green-500" /> : <WifiOff className="w-6 h-6 text-gray-400" />}
            <div>
              <p className="font-semibold text-gray-900">{connected ? 'Connected' : 'Disconnected'}</p>
              <p className="text-sm text-gray-500">{simMode ? 'Simulated device' : `${deviceConfig.ip}:${deviceConfig.port} (${deviceConfig.protocol})`}</p>
            </div>
          </div>
          <button onClick={toggleConnection} className={`px-4 py-2 rounded-lg text-sm font-medium ${connected ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>

      {/* Sensor Readings & Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Scale className="w-4 h-4" /> Weight Sensor</h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-gray-900">{sensorWeight.toFixed(1)}g</p>
            <p className="text-sm text-gray-500 mt-1">Medicine compartment weight</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${Math.min(sensorWeight, 100)}%` }} />
            </div>
          </div>
          {sensorWeight < 10 && connected && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-700">Low medicine level detected</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Device Controls</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> LED Control</p>
              <div className="flex gap-2">
                {['green', 'yellow', 'red'].map(color => (
                  <button key={color} onClick={() => triggerLED(color)} className={`w-10 h-10 rounded-full border-2 ${ledStatus === color ? 'border-gray-800 scale-110' : 'border-gray-300'} transition`} style={{ backgroundColor: color === 'green' ? '#22c55e' : color === 'yellow' ? '#eab308' : '#ef4444' }} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4" /> Buzzer</p>
              <button onClick={triggerBuzzer} disabled={!connected} className={`px-4 py-2 rounded-lg text-sm ${buzzerActive ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-700'} disabled:opacity-50`}>
                {buzzerActive ? '🔊 Buzzer Active...' : 'Test Buzzer'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event History */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Event History</h3>
        {events.length === 0 ? (
          <p className="text-sm text-gray-500">No events yet. Connect the device to start logging.</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {events.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg text-sm">
                <span className="text-gray-400 text-xs">{e.time}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${e.type === 'led' ? 'bg-yellow-100 text-yellow-700' : e.type === 'buzzer' ? 'bg-red-100 text-red-700' : e.type === 'connect' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{e.type}</span>
                <span className="text-gray-700">{e.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hardware Setup Guide */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Settings className="w-4 h-4" /> Hardware Setup Guide</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-800">Components Required:</p>
            <ul className="list-disc ml-5 mt-1 space-y-1">
              <li>ESP32 or Arduino Uno with WiFi module</li>
              <li>HX711 Load Cell Amplifier + Weight Sensor</li>
              <li>3x LEDs (Green, Yellow, Red)</li>
              <li>Active Buzzer</li>
              <li>Breadboard and jumper wires</li>
              <li>5V Power supply</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-800">Pin Mapping (ESP32):</p>
            <div className="bg-gray-50 rounded-lg p-3 mt-1 font-mono text-xs">
              <p>HX711 DOUT → GPIO 4</p>
              <p>HX711 SCK → GPIO 5</p>
              <p>Green LED → GPIO 16</p>
              <p>Yellow LED → GPIO 17</p>
              <p>Red LED → GPIO 18</p>
              <p>Buzzer → GPIO 19</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-800">Communication Protocol:</p>
            <p className="mt-1">MQTT over WiFi. Topic: <code className="bg-gray-100 px-1 rounded">healthbridge/medbox/events</code></p>
            <p>Payload format: <code className="bg-gray-100 px-1 rounded">{"{ \"type\": \"dose_confirmed\", \"weight\": 45.2, \"time\": \"2024-01-15T08:00:00Z\" }"}</code></p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Firmware Code (Arduino/ESP32):</p>
            <pre className="bg-gray-900 text-green-400 rounded-lg p-3 mt-1 text-xs overflow-x-auto">{`#include <WiFi.h>
#include <PubSubClient.h>
#include "HX711.h"

#define DOUT 4
#define CLK 5
#define GREEN_LED 16
#define YELLOW_LED 17
#define RED_LED 18
#define BUZZER 19

HX711 scale;
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  scale.begin(DOUT, CLK);
  scale.set_scale(2280.f);
  scale.tare();
  WiFi.begin("SSID", "PASSWORD");
  client.setServer("broker_ip", 1883);
}

void loop() {
  if (!client.connected()) client.connect("medbox");
  client.loop();
  float weight = scale.get_units(5);
  String payload = "{\\"weight\\":" + String(weight) + "}";
  client.publish("healthbridge/medbox/sensor", payload.c_str());
  delay(5000);
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
