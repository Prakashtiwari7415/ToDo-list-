import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import { TodoList } from './components/TodoList';
import { UserProfile } from './components/UserProfile';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {session ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <UserProfile onSignOut={handleSignOut} />
              <TodoList />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Auth />
          </div>
        )}
      </div>
    </div>
  );
}