import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Bell, CheckCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useApp();

  const typeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const typeBg = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    switch (type) {
      case 'reminder': return 'bg-blue-50';
      case 'alert': return 'bg-amber-50';
      case 'emergency': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Bell className="w-6 h-6 text-blue-600" /> Notifications</h1>
          <p className="text-gray-600 mt-1">All your alerts, reminders, and system notifications.</p>
        </div>
        <span className="text-sm text-gray-500">{notifications.filter(n => !n.read).length} unread</span>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No notifications yet. Notifications will appear here as you use the app.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(notif => (
            <div key={notif.id} onClick={() => markNotificationRead(notif.id)} className={`${typeBg(notif.type, notif.read)} rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-sm transition ${!notif.read ? 'border-l-4' : ''}`} style={!notif.read ? { borderLeftColor: notif.type === 'emergency' ? '#ef4444' : notif.type === 'alert' ? '#f59e0b' : notif.type === 'reminder' ? '#3b82f6' : '#6b7280' } : {}}>
              <div className="flex items-start gap-3">
                {typeIcon(notif.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{notif.title}</p>
                    <span className="text-xs text-gray-400">{new Date(notif.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{notif.message}</p>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
