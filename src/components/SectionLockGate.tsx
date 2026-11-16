import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useSectionAuth } from '../context/SectionAuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ClubLogo } from './ClubLogo';

export const SectionLockGate: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { unlockSection, authError, clearAuthError } = useSectionAuth();
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    if (!password.trim()) return;

    const ok = unlockSection(password);
    if (ok) {
      if (onSuccess) onSuccess();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-[65vh] flex items-center justify-center p-4 sm:p-6">
      <div
        className={`w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-300 ${
          shake ? 'translate-x-[-8px]' : ''
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-emerald-700" />
          <div className="flex-1 bg-blue-950" />
          <div className="flex-1 bg-amber-500" />
        </div>

        <div className="text-center relative z-10 mb-6 pt-2">
          <div className="inline-flex justify-center mb-4">
            <ClubLogo size="lg" showText={false} />
          </div>

          <div className="block">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-950 text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.lockGate.badge}</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            {t.lockGate.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t.lockGate.descPrefix}{' '}
            <strong className="text-emerald-700 font-semibold">{t.lockGate.descClub}</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              {t.lockGate.labelPassword}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-5 h-5 text-emerald-700" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) clearAuthError();
                }}
                placeholder={t.lockGate.placeholderPassword}
                className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 rounded-xl py-3 pl-11 pr-12 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                title={showPassword ? t.lockGate.hidePassword : t.lockGate.showPassword}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.lockGate.wrongPassword}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t.lockGate.unlockBtn}</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showHint ? t.lockGate.hideHint : t.lockGate.showHint}</span>
            </button>

            {showHint && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.lockGate.hintTitle}</span>
                </div>
                <p>
                  {t.lockGate.hintBody1}{' '}
                  <code className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">sanjuan</code>{' '}
                  {t.lockGate.hintOr}{' '}
                  <code className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">donibane</code>.
                </p>
                <p className="text-slate-500 text-[11px] pt-1">{t.lockGate.hintBody2}</p>
              </div>
            )}
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>{t.lockGate.footerLine1}</p>
          <p className="text-[11px] mt-0.5">{t.lockGate.footerLine2}</p>
        </div>
      </div>
    </div>
  );
};
