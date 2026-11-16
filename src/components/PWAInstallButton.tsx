import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, Monitor } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';
import { ClubLogo } from './ClubLogo';

interface PWAInstallButtonProps {
  variant?: 'header' | 'mobile' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  const renderButton = () => {
    if (variant === 'mobile') {
      return (
        <button
          onClick={handleClick}
          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Download className="w-4 h-4 text-emerald-700" />
            <span>{t.pwa.installMobile}</span>
          </div>
          <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-full">PWA</span>
        </button>
      );
    }

    if (variant === 'footer') {
      return (
        <button
          onClick={handleClick}
          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.pwa.installBtn}</span>
        </button>
      );
    }

    return (
      <button
        onClick={handleClick}
        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
        title={t.pwa.installMobile}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{t.pwa.installBtn}</span>
      </button>
    );
  };

  return (
    <>
      {renderButton()}

      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <ClubLogo size="sm" showText={false} />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {t.pwa.badge}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 font-display">
                  {t.pwa.modalTitle}
                </h3>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs text-slate-700">
                <p className="text-slate-600">{t.pwa.iosIntro}</p>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                  <Share className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{t.pwa.iosStep1Title}</div>
                    <p className="text-slate-500 mt-0.5">{t.pwa.iosStep1Desc}</p>
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                  <PlusSquare className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{t.pwa.iosStep2Title}</div>
                    <p className="text-slate-500 mt-0.5">{t.pwa.iosStep2Desc}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-700">
                <p className="text-slate-600">{t.pwa.generalIntro}</p>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{t.pwa.androidTitle}</div>
                    <p className="text-slate-500 mt-0.5">{t.pwa.androidDesc}</p>
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                  <Share className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{t.pwa.iosTitle}</div>
                    <p className="text-slate-500 mt-0.5">{t.pwa.iosDesc}</p>
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">{t.pwa.desktopTitle}</div>
                    <p className="text-slate-500 mt-0.5">{t.pwa.desktopDesc}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-5 w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              {t.pwa.understood}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
