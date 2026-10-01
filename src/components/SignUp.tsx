import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

interface SignUpProps {
  onSuccess?: (registeredEmail: string) => void;
  onSwitchToSignIn?: (prefillEmail?: string) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      // 1) For Sign Up: Use supabase.auth.signUp({ email, password })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0]
          }
        }
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      // 1) After successful signup:
      // - Do NOT auto-login.
      // - Redirect the user to the Sign In page.
      // - Keep / pre-fill the email they just used.
      if (onSuccess) {
        onSuccess(email);
      } else if (onSwitchToSignIn) {
        onSwitchToSignIn(email);
      } else {
        // Redirect with query parameters: email & signup=success
        const searchParams = new URLSearchParams();
        searchParams.set('email', email);
        searchParams.set('signup', 'success');
        window.location.href = `/login?${searchParams.toString()}`;
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-200/80 dark:border-stone-800">
      <div className="text-center mb-5">
        <span className="font-logo text-2xl font-bold tracking-[0.2em] text-[#BE826A]">
          HARFTI
        </span>
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1">
          إنشاء حساب (Sign Up)
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="relative">
          <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
          />
        </div>

        <div className="relative">
          <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
          />
        </div>

        <div className="relative">
          <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#BE826A] hover:bg-[#A96E57] disabled:opacity-50 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer mt-2"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {/* Basic error handling if signup fails */}
        {errorMessage && (
          <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-2.5 text-center mt-2">
            {errorMessage}
          </p>
        )}
      </form>

      {onSwitchToSignIn && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => onSwitchToSignIn(email)}
            className="text-xs text-[#BE826A] hover:underline cursor-pointer"
          >
            Already have an account? Sign In
          </button>
        </div>
      )}
    </div>
  );
};
