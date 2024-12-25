import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { AuthForm } from './AuthForm';
import { AuthTabs } from './AuthTabs';

export function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (email: string, password: string, username?: string) => {
    setError(null);
    
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
      } else {
        const { error: signUpError, data } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { username }
          }
        });

        if (signUpError) {
          if (signUpError.message === 'User already registered') {
            setError('This email is already registered. Please sign in instead.');
          } else {
            setError(signUpError.message);
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-xl rounded-2xl px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {mode === 'signin' ? 'Sign in to manage your tasks' : 'Sign up to get started'}
        </p>
        
        <AuthTabs mode={mode} onChange={setMode} />
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        <AuthForm onSubmit={handleAuth} mode={mode} />
      </div>
    </div>
  );
}