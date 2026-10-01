import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';

interface SignInProps {
  prefillEmail?: string;
  signupSuccess?: boolean;
  onSuccess?: () => void;
  onSwitchToSignUp?: () => void;
}

export const SignIn: React.FC<SignInProps> = ({
  prefillEmail,
  signupSuccess,
  onSuccess,
  onSwitchToSignUp
}) => {
  // Read from props or query parameters
  const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialEmail = prefillEmail || queryParams?.get('email') || '';
  const isFromSignUp = signupSuccess || queryParams?.get('signup') === 'success';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    isFromSignUp
      ? 'Your account has been created. Please check your email and verify your address before logging in.'
      : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
    if (signupSuccess) {
      setSuccessMessage('Your account has been created. Please check your email and verify your address before logging in.');
    }
  }, [prefillEmail, signupSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      // Sign In with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (onSuccess) {
        onSuccess();
      }

      // Redirect user to the Home page ("/")
      window.location.href = '/';
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during sign in.');
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
          تسجيل الدخول (Sign In)
        </h3>
      </div>

      {/* 2) Success message above the form if user comes from signup */}
      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
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
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Error message under the form */}
        {errorMessage && (
          <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-2.5 text-center mt-2">
            {errorMessage}
          </p>
        )}
      </form>

      {onSwitchToSignUp && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-xs text-[#BE826A] hover:underline cursor-pointer"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      )}
    </div>
  );
};
