import { type Dispatch, type SetStateAction } from 'react';

interface AuthTabsProps {
  mode: 'signin' | 'signup';
  onChange: Dispatch<SetStateAction<'signin' | 'signup'>>;
}

export function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onChange('signin')}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200
          ${mode === 'signin'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onChange('signup')}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200
          ${mode === 'signup'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        Sign Up
      </button>
    </div>
  );
}