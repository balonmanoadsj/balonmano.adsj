import React, { createContext, useContext, useState } from 'react';

interface SectionAuthContextType {
  isUnlocked: boolean;
  unlockSection: (password: string) => boolean;
  lockSection: () => void;
  currentPasswordHint: string;
  changeSectionPassword: (oldPass: string, newPass: string) => boolean;
  authError: boolean;
  clearAuthError: () => void;
}

const DEFAULT_PASSWORD = 'sanjuan';
const STORAGE_KEY_AUTH = 'adsj_section_unlocked';
const STORAGE_KEY_PASS = 'adsj_section_password_custom';

const SectionAuthContext = createContext<SectionAuthContextType | undefined>(undefined);

export const SectionAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });
  const [authError, setAuthError] = useState<boolean>(false);

  const getActivePassword = () => {
    return localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_PASSWORD;
  };

  const unlockSection = (inputPass: string): boolean => {
    const trimmed = inputPass.trim().toLowerCase();
    const activePass = getActivePassword().toLowerCase();

    const isMatch =
      trimmed === activePass ||
      (activePass === DEFAULT_PASSWORD && (trimmed === 'donibane' || trimmed === 'adsj' || trimmed === 'balonmano'));

    if (isMatch) {
      setIsUnlocked(true);
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      setAuthError(false);
      return true;
    } else {
      setAuthError(true);
      return false;
    }
  };

  const lockSection = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
  };

  const changeSectionPassword = (oldPass: string, newPass: string): boolean => {
    const activePass = getActivePassword().toLowerCase();
    if (oldPass.trim().toLowerCase() !== activePass && oldPass.trim().toLowerCase() !== 'sanjuan') {
      return false;
    }
    if (newPass.trim().length < 4) {
      return false;
    }
    localStorage.setItem(STORAGE_KEY_PASS, newPass.trim());
    return true;
  };

  const clearAuthError = () => setAuthError(false);

  return (
    <SectionAuthContext.Provider
      value={{
        isUnlocked,
        unlockSection,
        lockSection,
        currentPasswordHint: 'sanjuan',
        changeSectionPassword,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </SectionAuthContext.Provider>
  );
};

export const useSectionAuth = () => {
  const context = useContext(SectionAuthContext);
  if (!context) {
    throw new Error('useSectionAuth must be used within a SectionAuthProvider');
  }
  return context;
};
