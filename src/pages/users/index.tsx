import React, { useEffect } from 'react';
import { useUserStore } from '@/store/user';

export const UserList: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg animate-pulse">Loading users...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md max-w-md mx-auto my-8">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0">
                {/* Placeholder avatar */}
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">
                  {user.name.charAt(0)}
                </div>
              </div>
              <div>
                <p className="text-gray-900 font-medium">{user.name}</p>
                {user.email && (
                  <p className="text-gray-500 text-sm">{user.email}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
