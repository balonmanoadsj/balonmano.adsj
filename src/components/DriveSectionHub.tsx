import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  Search,
  RefreshCw,
  ExternalLink,
  FileText,
  Calendar,
  Key,
  CheckCircle2,
  HardDrive,
  Filter,
  LogOut,
  Info,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
} from '../services/auth';
import {
  DriveFileItem,
  SEED_SECTION_DOCUMENTS,
  fetchDriveFiles,
  formatFileSize,
  getFileIconBadge,
} from '../services/googleDrive';
import { useSectionAuth } from '../context/SectionAuthContext';
import { useLanguage } from '../context/LanguageContext';

export const DriveSectionHub: React.FC = () => {
  const { lockSection, changeSectionPassword } = useSectionAuth();
  const { language, t } = useLanguage();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>(SEED_SECTION_DOCUMENTS);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeSubTab, setActiveSubTab] = useState<'drive' | 'cuadrante' | 'convocatorias' | 'ajustes'>('drive');
  const [errorType, setErrorType] = useState<'drive' | 'login' | null>(null);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passStatus, setPassStatus] = useState<'ok' | 'err' | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        loadFilesFromDrive(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setDriveFiles(SEED_SECTION_DOCUMENTS);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadFilesFromDrive = async (accessToken: string, query?: string) => {
    setIsLoadingFiles(true);
    setErrorType(null);
    try {
      const files = await fetchDriveFiles(accessToken, query);
      const merged = [...files, ...SEED_SECTION_DOCUMENTS.filter((seed) => !files.some((f) => f.name === seed.name))];
      setDriveFiles(merged);
    } catch (err: any) {
      console.warn('Could not load live Drive files, showing cached section files:', err);
      setErrorType('drive');
      setDriveFiles(SEED_SECTION_DOCUMENTS);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorType(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadFilesFromDrive(result.accessToken, searchQuery);
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setErrorType('login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setDriveFiles(SEED_SECTION_DOCUMENTS);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      loadFilesFromDrive(token, searchQuery);
    }
  };

  const filteredFiles = driveFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (file.category && file.category.includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeCategory === 'todos') return true;
    return file.category === activeCategory;
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = changeSectionPassword(oldPass, newPass);
    if (ok) {
      setPassStatus('ok');
      setOldPass('');
      setNewPass('');
    } else {
      setPassStatus('err');
    }
  };

  const courtsRows = [
    {
      cat: language === 'eu' ? 'Senior Neskak' : 'Senior Femenino',
      days: language === 'eu' ? 'Astelehen, Asteazken eta Ostiralak' : 'Lunes, Miércoles y Viernes',
      time: '20:00 - 21:30',
      court: language === 'eu' ? 'Pista Nagusia' : 'Pista Central',
      staff: 'Mikel Aranguren / Nerea Echeverría',
      highlight: 'emerald',
    },
    {
      cat: language === 'eu' ? 'Jubenil Neskak' : 'Juvenil Femenino',
      days: language === 'eu' ? 'Astearte eta Ostegunak' : 'Martes y Jueves',
      time: '19:30 - 21:00',
      court: language === 'eu' ? '1. Pista' : 'Pista 1',
      staff: 'Iñaki Zubeldia / Marta Olcoz',
      highlight: 'emerald',
    },
    {
      cat: language === 'eu' ? 'Kadete Neskak' : 'Cadete Femenino',
      days: language === 'eu' ? 'Astelehen eta Asteazkenak' : 'Lunes y Miércoles',
      time: '18:30 - 20:00',
      court: language === 'eu' ? '2. Pista' : 'Pista 2',
      staff: 'Javier Azcona / Uxue Iriarte',
      highlight: 'emerald',
    },
    {
      cat: language === 'eu' ? 'Infantil Neskak' : 'Infantil Femenino',
      days: language === 'eu' ? 'Astearte eta Ostegunak' : 'Martes y Jueves',
      time: '17:30 - 19:00',
      court: language === 'eu' ? '2. Pista' : 'Pista 2',
      staff: 'Marta Olcoz / Ane Larrea',
      highlight: 'emerald',
    },
    {
      cat: language === 'eu' ? 'Alebin Neskak' : 'Alevín Femenino',
      days: language === 'eu' ? 'Astearte eta Ostegunak' : 'Martes y Jueves',
      time: '17:00 - 18:15',
      court: language === 'eu' ? '1. Pista' : 'Pista 1',
      staff: 'Maite Zabalza / Leire Beaumont',
      highlight: 'emerald',
    },
    {
      cat: language === 'eu' ? 'Donibane Eskola (Mistoa)' : 'Escuela Donibane (Mixto)',
      days: language === 'eu' ? 'Astelehen eta Asteazkenak' : 'Lunes y Miércoles',
      time: '17:00 - 18:30',
      court: language === 'eu' ? 'Kanpoko Pista Berdea' : 'Pista Verde Exterior / Polideportivo',
      staff: language === 'eu' ? 'Amaia Goñi eta Harrobiko Begiraleak' : 'Amaia Goñi & Monitores Cantera',
      highlight: 'blue',
    },
    {
      cat: language === 'eu' ? 'Senior Mutilak' : 'Senior Masculino',
      days: language === 'eu' ? 'Astelehen eta Ostegunak' : 'Lunes y Jueves',
      time: '21:00 - 22:30',
      court: language === 'eu' ? 'Pista Nagusia' : 'Pista Central',
      staff: 'Asier Urbiola / David Arregui',
      highlight: 'slate',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-emerald-700" />
          <div className="flex-1 bg-blue-950" />
          <div className="flex-1 bg-amber-500" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 pt-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.driveHub.unlockedBadge}</span>
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">• {t.common.clubName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              {t.driveHub.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">{t.driveHub.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={lockSection}
              className="px-4 py-2 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 text-xs font-semibold rounded-xl border border-slate-300 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.driveHub.lockBtn}</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-200 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveSubTab('drive')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'drive'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>{t.driveHub.tabDrive}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                activeSubTab === 'drive' ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {filteredFiles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('cuadrante')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'cuadrante'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.driveHub.tabCourts}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('convocatorias')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'convocatorias'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.driveHub.tabLineups}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ajustes')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'ajustes'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{t.driveHub.tabSettings}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Google Drive */}
      {activeSubTab === 'drive' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200 shrink-0">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{t.driveHub.storageTitle}</h3>
                  {user ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      {t.driveHub.connected}
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {t.driveHub.offlineMode}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {user ? `${t.driveHub.signedAs} ${user.email || user.displayName}` : t.driveHub.signPrompt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && loadFilesFromDrive(token, searchQuery)}
                    disabled={isLoadingFiles}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    title={t.driveHub.reloadTitle}
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1.5 transition-all"
                  >
                    <span>{t.driveHub.openDrive}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleGoogleLogout}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    {t.driveHub.disconnect}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button"
                  title={t.driveHub.connectBtn}
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper flex items-center">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        style={{ display: 'block', width: '20px', height: '20px' }}
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {isLoggingIn ? t.driveHub.connecting : t.driveHub.connectBtn}
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {errorType && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorType === 'drive' ? t.driveHub.driveWarn : t.driveHub.loginWarn}</span>
            </div>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.driveHub.searchPlaceholder}
                className="w-full bg-white border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none"
              />
            </form>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 text-[11px] font-semibold uppercase mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> {t.driveHub.typeLabel}
              </span>
              {[
                { id: 'todos', label: t.driveHub.filters.all },
                { id: 'calendario', label: t.driveHub.filters.calendar },
                { id: 'convocatoria', label: t.driveHub.filters.lineup },
                { id: 'actas', label: t.driveHub.filters.acts },
                { id: 'medico', label: t.driveHub.filters.medical },
                { id: 'reglamento', label: t.driveHub.filters.rules },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-blue-950 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {isLoadingFiles ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <RefreshCw className="w-7 h-7 text-emerald-700 animate-spin mx-auto" />
              <p className="text-sm">{t.driveHub.loadingFiles}</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="py-16 text-center bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-3">
              <FolderOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-slate-900 font-bold text-sm">{t.driveHub.noFilesTitle}</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {t.driveHub.noFilesDesc1} &quot;{searchQuery}&quot;. {t.driveHub.noFilesDesc2}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                }}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-xs text-emerald-700 font-semibold rounded-lg cursor-pointer transition-colors"
              >
                {t.driveHub.clearSearch}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => {
                const badge = getFileIconBadge(file.mimeType);
                return (
                  <div
                    key={file.id}
                    className="bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-emerald-600/60 rounded-2xl p-4 transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase font-mono ${badge.color}`}
                        >
                          {badge.label}
                        </span>

                        {file.isLocalSeed ? (
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                            {t.driveHub.officialTemplate}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                            {t.driveHub.googleDrive}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 group-hover:text-emerald-700 transition-colors">
                        {file.name}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        <span>{formatFileSize(file.size)}</span>
                        {file.modifiedTime && (
                          <span className="ml-2 text-slate-400">
                            • {new Date(file.modifiedTime).toLocaleDateString(language === 'eu' ? 'eu-ES' : 'es-ES')}
                          </span>
                        )}
                      </div>

                      <a
                        href={file.webViewLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors p-1"
                        title={t.driveHub.openFile}
                      >
                        <span>{t.driveHub.openFile}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: Cuadrante */}
      {activeSubTab === 'cuadrante' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{t.driveHub.courtsTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">{t.driveHub.courtsSubtitle}</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-3 py-1 rounded-full font-semibold">
                {t.driveHub.currentSeason}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">{t.driveHub.colCategory}</th>
                    <th className="py-3 px-4">{t.driveHub.colDays}</th>
                    <th className="py-3 px-4">{t.driveHub.colTime}</th>
                    <th className="py-3 px-4">{t.driveHub.colCourt}</th>
                    <th className="py-3 px-4">{t.driveHub.colStaff}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {courtsRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td
                        className={`py-3 px-4 font-bold ${
                          row.highlight === 'emerald'
                            ? 'text-emerald-700'
                            : row.highlight === 'blue'
                            ? 'text-blue-900'
                            : 'text-slate-700'
                        }`}
                      >
                        {row.cat}
                      </td>
                      <td className="py-3 px-4">{row.days}</td>
                      <td className="py-3 px-4 font-mono">{row.time}</td>
                      <td className="py-3 px-4">{row.court}</td>
                      <td className="py-3 px-4 text-slate-500">{row.staff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-slate-700 space-y-2">
              <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>{t.driveHub.rulesTitle}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>{t.driveHub.rule1}</li>
                <li>{t.driveHub.rule2}</li>
                <li>{t.driveHub.rule3}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Convocatorias y Mesa */}
      {activeSubTab === 'convocatorias' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base font-display">{t.driveHub.nextCallTitle}</h3>
              <span className="bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {language === 'eu' ? 'Senior Neskak' : 'Senior Fem'}
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>{t.driveHub.matchLabel}</span>
                <span className="text-emerald-700">AD San Juan vs BM Loyola</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.driveHub.dateTimeLabel}</span>
                <span>{language === 'eu' ? 'Larunbata, Urriak 28 • 18:30' : 'Sábado, 28 Octubre • 18:30 h'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.driveHub.lockerRoomLabel}</span>
                <span className="font-mono text-blue-950 font-bold">17:15 (Donibane)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t.driveHub.kitLabel}</span>
                <span>{t.driveHub.kitValue}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {t.driveHub.calledPlayers}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  '1. Amaia Goñi (POR)',
                  '12. Leire Beaumont (POR)',
                  '3. Maite Zabalza (C)',
                  '6. Uxue Iriarte',
                  '10. Ane Larrea',
                  '11. Irati Oses',
                  '13. Nora San Martín',
                  '14. Paula Mendívil',
                  '18. Ainhoa Alzórriz',
                  '19. June Aldaz',
                  '22. Saioa Barrena',
                  '27. Haizea Elía',
                ].map((name, i) => (
                  <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base font-display">{t.driveHub.tableDutyTitle}</h3>
            <p className="text-xs text-slate-500">{t.driveHub.tableDutyDesc}</p>

            <div className="space-y-3">
              {[
                {
                  match:
                    language === 'eu'
                      ? 'Kadete Neskak vs Malkaitz (16:00)'
                      : 'Cadete Femenino vs Malkaitz (16:00 h)',
                  anotador:
                    language === 'eu'
                      ? 'Jubenil Nesken Boluntarioak (Elena B. & Carla U.)'
                      : 'Voluntariado Juvenil Fem (Elena B. & Carla U.)',
                  cronometrador: language === 'eu' ? 'Kadeteen Ordezkaria' : 'Delegado Cadete',
                },
                {
                  match:
                    language === 'eu'
                      ? 'Senior Neskak vs BM Loyola (18:30)'
                      : 'Senior Femenino vs BM Loyola (18:30 h)',
                  anotador: language === 'eu' ? 'FNBMk izendatutako ofiziala' : 'Oficial Designado FNBM',
                  cronometrador: language === 'eu' ? 'FNBMk izendatutako ofiziala' : 'Oficial Designado FNBM',
                },
                {
                  match:
                    language === 'eu'
                      ? 'Infantil Neskak vs Anaitasuna (Kanpoan)'
                      : 'Infantil Femenino vs Anaitasuna (Visitante)',
                  anotador: language === 'eu' ? 'Anaitasunak jarritako mahaia' : 'Mesa asignada por Anaitasuna',
                  cronometrador: language === 'eu' ? 'Anaitasunak jarritako mahaia' : 'Mesa asignada por Anaitasuna',
                },
              ].map((turno, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-700">{turno.match}</div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">{t.driveHub.scorerLabel}</span>
                    <span>{turno.anotador}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">{t.driveHub.timerLabel}</span>
                    <span>{turno.cronometrador}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Ajustes de Contraseña */}
      {activeSubTab === 'ajustes' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-700" />
              <span>{t.driveHub.passTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">{t.driveHub.passDesc}</p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.driveHub.currentPassLabel}
              </label>
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder={t.driveHub.currentPassPlaceholder}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.driveHub.newPassLabel}
              </label>
              <input
                type="text"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder={t.driveHub.newPassPlaceholder}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600"
                required
              />
            </div>

            {passStatus && (
              <div
                className={`p-3 rounded-xl text-xs border ${
                  passStatus === 'ok'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                {passStatus === 'ok' ? t.driveHub.passSuccess : t.driveHub.passError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
            >
              {t.driveHub.savePassBtn}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
