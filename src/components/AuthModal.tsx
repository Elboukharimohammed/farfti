import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../supabaseClient';
import { X, Lock, Mail, User as UserIcon, Hammer, ShoppingBag } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authPromptText, login } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'artisan'>('user');
  const [city, setCity] = useState('Casablanca');
  const [specialty, setSpecialty] = useState('Carpentry & Woodwork');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
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

        // Update local session
        login(email, role, data?.user?.user_metadata?.name || name || email.split('@')[0]);
        closeAuthModal();

        // Redirect user to Home page ("/")
        window.location.href = '/';
      } else {
        // Sign Up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name || email.split('@')[0],
              role,
              city,
              specialty: role === 'artisan' ? specialty : undefined
            }
          }
        });

        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
          return;
        }

        // 1) Do NOT auto-login
        // 2) Redirect to Sign In, keep/pre-fill email, show success message
        setMode('login');
        setPassword('');
        setSuccessMessage(
          'Your account has been created. Please check your email and verify your address before logging in.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoRole: 'user' | 'artisan') => {
    if (demoRole === 'artisan') {
      login('anas.craftsman@harfti.ma', 'artisan', 'المعلم أنس (Master Anas)');
    } else {
      login('customer@harfti.ma', 'user', 'اسم المستخدم (User)');
    }
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200/80 dark:border-stone-800 animate-scaleUp">
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-5">
          <span className="font-logo text-2xl font-bold tracking-[0.2em] text-[#BE826A]">
            HARFTI
          </span>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mt-1">
            {mode === 'login' ? t.login : t.register}
          </h3>
          {authPromptText && (
            <p className="text-xs text-[#BE826A] bg-[#BE826A]/10 rounded-lg p-2 mt-2">
              {authPromptText}
            </p>
          )}
        </div>

        {/* Mode switcher tabs */}
        <div className="flex p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {t.login}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {t.register}
          </button>
        </div>

        {/* Success message after signup */}
        {successMessage && mode === 'login' && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed text-center">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    role === 'user'
                      ? 'border-[#BE826A] bg-[#BE826A]/10 text-[#BE826A]'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('artisan')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    role === 'artisan'
                      ? 'border-[#BE826A] bg-[#BE826A]/10 text-[#BE826A]'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Hammer className="w-3.5 h-3.5" />
                  <span>Craftsman</span>
                </button>
              </div>

              <div className="relative">
                <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Full Name / Workshop Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
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
            <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
            />
          </div>

          {mode === 'register' && role === 'artisan' && (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City (e.g. Casablanca)"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
              />
              <input
                type="text"
                placeholder="Specialty (e.g. Carpentry)"
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#BE826A]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#BE826A] hover:bg-[#A96E57] disabled:opacity-50 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer mt-2"
          >
            {loading ? '...' : mode === 'login' ? t.login : t.register}
          </button>

          {/* 4) Error message under the form */}
          {errorMessage && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-2.5 text-center mt-2">
              {errorMessage}
            </p>
          )}
        </form>

        {/* Fast 1-click Demo buttons */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
          <p className="text-[11px] text-stone-400 text-center mb-2.5">
            Quick 1-Click Demo Profiles:
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickDemo('user')}
              className="flex-1 py-1.5 px-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg text-[11px] text-stone-700 dark:text-stone-300 font-medium cursor-pointer transition-colors"
            >
              Demo Customer
            </button>
            <button
              onClick={() => handleQuickDemo('artisan')}
              className="flex-1 py-1.5 px-2 bg-[#BE826A]/10 hover:bg-[#BE826A]/20 text-[#BE826A] rounded-lg text-[11px] font-medium cursor-pointer transition-colors"
            >
              Demo Craftsman
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
