import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';

interface UserProfileProps {
  onSignOut: () => void;
}

export function UserProfile({ onSignOut }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-medium">
            {user?.user_metadata.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {user?.user_metadata.username || 'User'}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={onSignOut}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-gray-900"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}