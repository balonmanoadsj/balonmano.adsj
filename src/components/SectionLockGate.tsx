import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useSectionAuth } from '../context/SectionAuthContext';
import { ClubLogo } from './ClubLogo';

export const SectionLockGate: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { unlockSection, authError, clearAuthError } = useSectionAuth();
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
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6">
      <div
        className={`w-full max-w-md bg-neutral-900/90 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300 ${
          shake ? 'translate-x-[-8px] animate-wiggle' : ''
        }`}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon & Club Logo */}
        <div className="text-center relative z-10 mb-6">
          <div className="inline-flex justify-center mb-4">
            <ClubLogo size="lg" showText={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Zona Restringida</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight font-display">
            Área de la Sección
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Espacio protegido para el equipo técnico, jugadoras, delegados y directiva de la{' '}
            <strong className="text-emerald-300 font-medium">AD San Juan Balonmano</strong>.
          </p>
        </div>

        {/* Formulario de Contraseña */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <KeyRound className="w-5 h-5 text-emerald-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) clearAuthError();
                }}
                placeholder="Introduce la clave de sección..."
                className="w-full bg-neutral-950/80 border border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 rounded-xl py-3 pl-11 pr-12 text-white placeholder-neutral-500 text-sm outline-none transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white transition-colors"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/50 hover:shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Desbloquear y Acceder</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-emerald-400/90 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showHint ? 'Ocultar pista' : '¿No recuerdas la contraseña?'}</span>
            </button>

            {showHint && (
              <div className="mt-3 p-3 bg-neutral-950/90 border border-emerald-900/50 rounded-xl text-left text-xs text-neutral-300 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clave predeterminada de la sección:</span>
                </div>
                <p>
                  Usa la palabra <code className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">sanjuan</code> o <code className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">donibane</code>.
                </p>
                <p className="text-neutral-400 text-[11px] pt-1">
                  Una vez dentro, cualquier delegado o técnico autorizado puede cambiarla o sincronizarla en la configuración.
                </p>
              </div>
            )}
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-800 text-center text-xs text-neutral-500">
          <p>Sección de Balonmano • Agrupación Deportiva San Juan</p>
          <p className="text-[11px] mt-0.5">Pamplona - Iruña (Navarra)</p>
        </div>
      </div>
    </div>
  );
};
