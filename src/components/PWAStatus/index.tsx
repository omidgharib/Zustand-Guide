import React, { useState, useEffect } from 'react';

const PWAStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if app is running in standalone mode (installed as PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && isStandalone) return null; // Don't show status when everything is good

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isOnline && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg mb-2">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
              />
            </svg>
            <span className="text-sm font-medium">You're offline</span>
          </div>
          <p className="text-xs mt-1">Some features may not work properly</p>
        </div>
      )}

      {isStandalone && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-xs mt-1">Running as installed app</p>
        </div>
      )}
    </div>
  );
};

export default PWAStatus;
