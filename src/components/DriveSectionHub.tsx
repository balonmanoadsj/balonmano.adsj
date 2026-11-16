import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  FileText,
  Calendar,
  Clock,
  Key,
  Users,
  CheckCircle2,
  HardDrive,
  Filter,
  Download,
  LogOut,
  ChevronRight,
  Info,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  getAccessToken,
} from '../services/auth';
import {
  DriveFileItem,
  SEED_SECTION_DOCUMENTS,
  fetchDriveFiles,
  formatFileSize,
  getFileIconBadge,
} from '../services/googleDrive';
import { useSectionAuth } from '../context/SectionAuthContext';

export const DriveSectionHub: React.FC = () => {
  const { lockSection, changeSectionPassword } = useSectionAuth();

  // Auth & Drive State
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>(SEED_SECTION_DOCUMENTS);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeSubTab, setActiveSubTab] = useState<'drive' | 'cuadrante' | 'convocatorias' | 'ajustes'>('drive');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Settings: change password state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState<{ text: string; ok: boolean } | null>(null);

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
    setErrorMessage(null);
    try {
      const files = await fetchDriveFiles(accessToken, query);
      // Combine with club seed templates so the section always has access to standard forms
      const merged = [...files, ...SEED_SECTION_DOCUMENTS.filter((seed) => !files.some((f) => f.name === seed.name))];
      setDriveFiles(merged);
    } catch (err: any) {
      console.warn('Could not load live Drive files, showing cached section files:', err);
      setErrorMessage(
        'Conexión activa. Mostrando archivos base de la sección. Si tienes carpetas en Drive, usa el buscador para localizarlas.'
      );
      setDriveFiles(SEED_SECTION_DOCUMENTS);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadFilesFromDrive(result.accessToken, searchQuery);
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setErrorMessage('No se completó el inicio de sesión con Google. Puedes seguir navegando los documentos base.');
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
      setPassMessage({ text: '¡Contraseña de la sección actualizada con éxito!', ok: true });
      setOldPass('');
      setNewPass('');
    } else {
      setPassMessage({ text: 'Error: Contraseña actual incorrecta o nueva clave demasiado corta (mínimo 4 caracteres).', ok: false });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner with security badge and lock controls */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-emerald-950/80 border border-emerald-800/50 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sección Desbloqueada</span>
              </span>
              <span className="text-neutral-400 text-xs hidden sm:inline">• AD San Juan Balonmano</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Área Privada de la Sección
            </h1>
            <p className="text-sm text-neutral-300 mt-1 max-w-2xl">
              Gestión documental con Google Drive, cuadrantes de pabellón y herramientas para técnicos, delegados y jugadoras.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={lockSection}
              className="px-4 py-2 bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl border border-neutral-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Bloquear Sección</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation inside the Private Area */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-emerald-900/40 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveSubTab('drive')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'drive'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>Documentos Google Drive</span>
            <span className="bg-emerald-950/80 text-emerald-200 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {filteredFiles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('cuadrante')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'cuadrante'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Cuadrante de Pistas</span>
          </button>

          <button
            onClick={() => setActiveSubTab('convocatorias')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'convocatorias'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Convocatorias y Mesa</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ajustes')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'ajustes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Contraseña Sección</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Google Drive File Explorer */}
      {activeSubTab === 'drive' && (
        <div className="space-y-6">
          {/* Google Account Bar / Sign-In Status */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800/60 shrink-0">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">Almacenamiento Google Drive</h3>
                  {user ? (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Conectado
                    </span>
                  ) : (
                    <span className="bg-neutral-800 text-neutral-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Modo Club / Offline
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {user
                    ? `Sesión iniciada como: ${user.email || user.displayName}`
                    : 'Inicia sesión con Google para sincronizar y buscar directamente en las carpetas de Drive del club.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && loadFilesFromDrive(token, searchQuery)}
                    disabled={isLoadingFiles}
                    className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    title="Recargar archivos de Drive"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/40 flex items-center gap-1.5 transition-all"
                  >
                    <span>Ir a Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleGoogleLogout}
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Desconectar
                  </button>
                </div>
              ) : (
                /* Google Official Sign In Button as instructed in workspace-integration SKILL.md */
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button"
                  title="Conectar con Google Drive"
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
                      {isLoggingIn ? 'Conectando...' : 'Conectar con Google Drive'}
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200 flex items-center gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar archivos por nombre o tema (ej. acta, plantilla, pista)..."
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none"
              />
            </form>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-neutral-500 text-[11px] font-semibold uppercase mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Tipo:
              </span>
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'calendario', label: 'Calendarios' },
                { id: 'convocatoria', label: 'Convocatorias' },
                { id: 'actas', label: 'Actas' },
                { id: 'medico', label: 'Médico' },
                { id: 'reglamento', label: 'Reglamentos' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-emerald-600/40 text-emerald-300 border border-emerald-500/50'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Files List / Grid */}
          {isLoadingFiles ? (
            <div className="py-16 text-center text-neutral-400 space-y-3">
              <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin mx-auto" />
              <p className="text-sm">Cargando archivos desde Google Drive...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="py-16 text-center bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 space-y-3">
              <FolderOpen className="w-10 h-10 text-neutral-600 mx-auto" />
              <h4 className="text-white font-bold text-sm">No se encontraron archivos</h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No hay documentos que coincidan con &quot;{searchQuery}&quot;. Prueba con otro término o limpia los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                }}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-emerald-400 rounded-lg cursor-pointer transition-colors"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => {
                const badge = getFileIconBadge(file.mimeType);
                return (
                  <div
                    key={file.id}
                    className="bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-800/80 rounded-2xl p-4 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase font-mono ${badge.color}`}
                        >
                          {badge.label}
                        </span>

                        {file.isLocalSeed ? (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
                            Plantilla Oficial
                          </span>
                        ) : (
                          <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-medium">
                            Google Drive
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-2 group-hover:text-emerald-300 transition-colors">
                        {file.name}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                      <div>
                        <span>{formatFileSize(file.size)}</span>
                        {file.modifiedTime && (
                          <span className="ml-2 text-neutral-500">
                            • {new Date(file.modifiedTime).toLocaleDateString('es-ES')}
                          </span>
                        )}
                      </div>

                      <a
                        href={file.webViewLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                        title="Abrir documento"
                      >
                        <span>Abrir</span>
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

      {/* SUB-TAB 2: Cuadrante de Entrenamientos y Pistas */}
      {activeSubTab === 'cuadrante' && (
        <div className="space-y-6">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Cuadrante Semanal de Pistas • Polideportivo AD San Juan
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Distribución de horarios de entrenamiento para la sección de balonmano en las instalaciones del club.
                </p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs px-3 py-1 rounded-full font-semibold">
                Temporada 2024 / 2025
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-950/60 text-neutral-300 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4">Días de Entrenamiento</th>
                    <th className="py-3 px-4">Horario</th>
                    <th className="py-3 px-4">Pista Asignada</th>
                    <th className="py-3 px-4">Cuerpo Técnico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                  <tr className="hover:bg-neutral-800/40">
                    <td className="py-3 px-4 font-bold text-emerald-400">Senior Femenino</td>
                    <td className="py-3 px-4">Lunes, Miércoles y Viernes</td>
                    <td className="py-3 px-4 font-mono">20:00 - 21:30</td>
                    <td className="py-3 px-4">Pista Central</td>
                    <td className="py-3 px-4 text-neutral-400">Mikel Aranguren / Nerea Echeverría</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="py-3 px-4 font-bold text-emerald-400">Juvenil Femenino</td>
                    <td className="py-3 px-4">Martes y Jueves</td>
                    <td className="py-3 px-4 font-mono">19:30 - 21:00</td>
                    <td className="py-3 px-4">Pista 1</td>
                    <td className="py-3 px-4 text-neutral-400">Iñaki Zubeldia / Marta Olcoz</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="py-3 px-4 font-bold text-emerald-400">Cadete Femenino</td>
                    <td className="py-3 px-4">Lunes y Miércoles</td>
                    <td className="py-3 px-4 font-mono">18:30 - 20:00</td>
                    <td className="py-3 px-4">Pista 2</td>
                    <td className="py-3 px-4 text-neutral-400">Javier Azcona / Uxue Iriarte</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="py-3 px-4 font-bold text-emerald-400">Infantil Femenino</td>
                    <td className="py-3 px-4">Martes y Jueves</td>
                    <td className="py-3 px-4 font-mono">17:30 - 19:00</td>
                    <td className="py-3 px-4">Pista 2</td>
                    <td className="py-3 px-4 text-neutral-400">Marta Olcoz / Ane Larrea</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="py-3 px-4 font-bold text-emerald-300">Escuela Donibane (Mixto)</td>
                    <td className="py-3 px-4">Lunes y Miércoles</td>
                    <td className="py-3 px-4 font-mono">17:00 - 18:30</td>
                    <td className="py-3 px-4">Pista Verde Exterior / Polideportivo</td>
                    <td className="py-3 px-4 text-neutral-400">Amaia Goñi & Monitores Cantera</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/40">
                    <td className="py-3 px-4 font-bold text-neutral-300">Senior Masculino</td>
                    <td className="py-3 px-4">Lunes y Jueves</td>
                    <td className="py-3 px-4 font-mono">21:00 - 22:30</td>
                    <td className="py-3 px-4">Pista Central</td>
                    <td className="py-3 px-4 text-neutral-400">Asier Urbiola / David Arregui</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-neutral-300 space-y-2">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Normas de uso de las instalaciones:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                <li>Resina balonmano: Permitida exclusivamente resina ecológica al agua autorizada por la ADSJ.</li>
                <li>Calzado deportivo de suela blanca o sin marcas exclusivo para la pista interior.</li>
                <li>Puntualidad en los cambios de pista para respetar los horarios de las distintas categorías.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Convocatorias y Turnos de Mesa */}
      {activeSubTab === 'convocatorias' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base font-display">Próxima Convocatoria de Partido</h3>
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Senior Fem
              </span>
            </div>

            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between font-bold text-neutral-200">
                <span>Partido:</span>
                <span className="text-emerald-400">AD San Juan vs BM Loyola</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Fecha y Hora:</span>
                <span>Sábado, 28 Octubre • 18:30 h</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Cita en Vestuarios:</span>
                <span className="font-mono text-emerald-300">17:15 h (Pabellón San Juan)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Indumentaria:</span>
                <span>Primera equipación (Verde / Blanco)</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Jugadoras Convocadas (14)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  '1. Amaia Goñi (POR)',
                  '12. Leire Beaumont (POR)',
                  '3. Maite Zabalza (C)',
                  '7. Ane Larrea',
                  '9. Uxue Iriarte',
                  '11. Irati Oses',
                  '14. Nora San Martín',
                  '17. Paula Mendívil',
                  '21. Ainhoa Alzórriz',
                  '23. June Aldaz',
                  '27. Saioa Barrena',
                  '30. Haizea Elía',
                ].map((name, i) => (
                  <div key={i} className="p-2 bg-neutral-950 rounded-lg border border-neutral-800/80 text-neutral-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base font-display">Asignación Mesa y Arbitrajes (Jornada)</h3>
            <p className="text-xs text-neutral-400">
              Turnos rotativos de cronometraje y anotación en los partidos que se disputan como local en el pabellón.
            </p>

            <div className="space-y-3">
              {[
                {
                  match: 'Cadete Femenino vs Malkaitz (16:00 h)',
                  anotador: 'Voluntariado Juvenil Fem (Elena B. & Carla U.)',
                  cronometrador: 'Delegado Cadete',
                },
                {
                  match: 'Senior Femenino vs BM Loyola (18:30 h)',
                  anotador: 'Oficial Designado FNBM',
                  cronometrador: 'Oficial Designado FNBM',
                },
                {
                  match: 'Infantil Femenino vs Anaitasuna (Visitante)',
                  anotador: 'Mesa asignada por Anaitasuna',
                  cronometrador: 'Mesa asignada por Anaitasuna',
                },
              ].map((turno, idx) => (
                <div key={idx} className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-400">{turno.match}</div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Anotador/a:</span>
                    <span>{turno.anotador}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Cronometrador/a:</span>
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
        <div className="max-w-xl mx-auto bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" />
              <span>Modificar Contraseña de la Sección</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Como técnico o directivo con acceso, puedes actualizar la clave que protege este apartado para toda la sección.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Contraseña Actual (o inicial: sanjuan)
              </label>
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder="Introduce la contraseña actual"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Nueva Contraseña de la Sección
              </label>
              <input
                type="text"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Ejemplo: donibane2025"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                required
              />
            </div>

            {passMessage && (
              <div
                className={`p-3 rounded-xl text-xs border ${
                  passMessage.ok
                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                    : 'bg-rose-950/80 border-rose-700 text-rose-300'
                }`}
              >
                {passMessage.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md"
            >
              Guardar Nueva Clave
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
