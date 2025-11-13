import { useEffect, useState } from 'react';

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      new Notification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options,
      });
    }
  };

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: typeof window !== 'undefined' && 'Notification' in window,
  };
}







