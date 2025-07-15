import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    // { path: '/', label: 'Home', icon: '🏠' },
    { path: '/counter', label: 'Counter', icon: '🔢' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/todo-list', label: 'Todo List', icon: '📝' },
    { path: '/shoping-cart', label: 'Shopping Cart', icon: '🛒' }, // ✅ fixed typo
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-center">Zustand Guide</h1>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm font-medium rounded transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="mr-3 text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 text-center">Powered with ❤️</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
