import React, { useState } from 'react';

const PWAInstallGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-gray-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-gray-800"
        title="Show PWA install guide"
      >
        PWA Install Guide
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-base font-semibold text-gray-900">
            Install Zustand Guide
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 px-4 py-4 text-sm text-gray-700">
          <div>
            <h3 className="font-medium text-gray-900">
              Chrome / Edge (Desktop)
            </h3>
            <ol className="list-inside list-decimal">
              <li>Click the install icon in the address bar</li>
              <li>Or open menu → Install App</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">Android (Chrome/Edge)</h3>
            <ol className="list-inside list-decimal">
              <li>Open menu</li>
              <li>Select Add to Home screen</li>
              <li>Confirm Add</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">iOS (Safari)</h3>
            <ol className="list-inside list-decimal">
              <li>Tap the Share button</li>
              <li>Select Add to Home Screen</li>
              <li>Tap Add</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallGuide;
