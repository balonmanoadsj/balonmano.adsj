import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Newspaper,
  Users,
  Mail,
  Home,
  Shield,
  ArrowRight,
  HardDrive,
  Calendar,
  Trophy,
  ChevronRight,
  ExternalLink,
  MapPin,
  Flame,
  Award,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { SectionAuthProvider, useSectionAuth } from './context/SectionAuthContext';
import { ClubLogo } from './components/ClubLogo';
import { NewsSection } from './components/NewsSection';
import { TeamsSection } from './components/TeamsSection';
import { ContactSection } from './components/ContactSection';
import { SectionLockGate } from './components/SectionLockGate';
import { DriveSectionHub } from './components/DriveSectionHub';
import { handballImages } from './assets/images';

type NavTab = 'inicio' | 'noticias' | 'equipos' | 'seccion' | 'contacto';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isUnlocked, lockSection } = useSectionAuth();

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* TOP TICKER BAR */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/40 py-1.5 px-4 text-[11px] text-emerald-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">AD San Juan • Donibane Kirol Elkartea</span>
            <span className="text-emerald-500/60 hidden sm:inline">•</span>
            <span className="text-emerald-400/90 hidden sm:inline">Pabellón Polideportivo de Pamplona</span>
          </div>

          <div className="flex items-center gap-4 text-emerald-400">
            <span className="hidden md:inline text-[11px] text-emerald-300/80">
              balonmano.adsj@gmail.com
            </span>
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-600/50">
                <Unlock className="w-3 h-3 text-emerald-400" />
                <span>Sección Activa</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavClick('seccion')}
                className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Acceso Clave Sección</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center text-left cursor-pointer group"
          >
            <ClubLogo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inicio'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNavClick('noticias')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'noticias'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Noticias y Novedades</span>
            </button>

            <button
              onClick={() => handleNavClick('equipos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'equipos'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Equipos</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-1.5 py-0.2 rounded font-semibold">
                Fem
              </span>
            </button>

            <button
              onClick={() => handleNavClick('contacto')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'contacto'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contacto</span>
            </button>

            {/* Apartado Privado de la Sección con Contraseña */}
            <button
              onClick={() => handleNavClick('seccion')}
              className={`ml-2 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'seccion'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 border border-emerald-500'
                  : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60'
              }`}
            >
              {isUnlocked ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-200" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Área de la Sección</span>
              <span className="text-[10px] bg-emerald-900/80 text-white px-1.5 py-0.5 rounded font-mono">
                Google Drive
              </span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('seccion')}
              className="p-2 bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 rounded-xl text-xs flex items-center gap-1 font-bold"
            >
              {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span className="text-[11px]">Sección</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 space-y-2">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'inicio' ? 'bg-emerald-600 text-white' : 'text-neutral-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>
            <button
              onClick={() => handleNavClick('noticias')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'noticias' ? 'bg-emerald-600 text-white' : 'text-neutral-300'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Noticias y Novedades</span>
            </button>
            <button
              onClick={() => handleNavClick('equipos')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'equipos' ? 'bg-emerald-600 text-white' : 'text-neutral-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Equipos y Categorías (Especial Femenino)</span>
            </button>
            <button
              onClick={() => handleNavClick('seccion')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                activeTab === 'seccion' ? 'bg-emerald-600 text-white' : 'bg-emerald-950/60 text-emerald-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>Área Privada de Sección (Contraseña + Drive)</span>
              </div>
              <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded">🔒</span>
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'contacto' ? 'bg-emerald-600 text-white' : 'text-neutral-300'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contacto y Localización</span>
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-16">
            {/* HERO BANNER with generated computer imagery */}
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-emerald-900/40 shadow-2xl bg-neutral-950">
              <div className="absolute inset-0 z-0">
                <img
                  src={handballImages.hero}
                  alt="Balonmano Femenino AD San Juan"
                  className="w-full h-full object-cover object-top opacity-55 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
              </div>

              <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide uppercase">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Agrupación Deportiva San Juan • Pamplona</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-display">
                  BALONMANO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-white">
                    VERDE Y BLANCO
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                  Portal oficial de la sección de balonmano de la AD San Juan (Donibane). Pasión, formación y un proyecto referente en balonmano femenino y deporte base navarro.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleNavClick('noticias')}
                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <Newspaper className="w-4 h-4" />
                    <span>Ver Noticias y Crónicas</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('seccion')}
                    className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm rounded-2xl border border-neutral-700/80 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Área Privada de Sección</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('contacto')}
                    className="px-5 py-3.5 text-neutral-400 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Quiero Jugar en San Juan</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* STATS STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: '6', label: 'Equipos Federados', desc: 'Cantera y Senior Nacional', icon: Trophy },
                { number: '+110', label: 'Jugadoras y Jugadores', desc: 'Compitiendo en Navarra', icon: Users },
                { number: '14', label: 'Técnicos Titulados', desc: 'Formación y valores', icon: Award },
                { number: '100%', label: 'Sentimiento Verde', desc: 'Pabellón Polideportivo', icon: Flame },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/80 border border-neutral-800/90 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-700/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-emerald-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">{stat.number}</div>
                  <div className="text-xs font-bold text-neutral-200 mt-1">{stat.label}</div>
                  <div className="text-[11px] text-neutral-500">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* THREE FEATURED HUB HIGHLIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Highlight 1: Noticias y Crónicas */}
              <div
                onClick={() => handleNavClick('noticias')}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-emerald-700/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/40 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/90 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Actualidad
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    Noticias y Novedades
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Crónicas de partidos, resultados de fin de semana, avisos de entrenamientos y convocatorias de la Federación Navarra.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Explorar artículos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Highlight 2: Equipos & Balonmano Femenino */}
              <div
                onClick={() => handleNavClick('equipos')}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-emerald-700/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/40 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/90 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Especial Chicas
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    Equipos y Plantillas
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Conoce a nuestras jugadoras de Senior Femenino, Juveniles, Cadetes, Infantiles y Escuela de Iniciación con sus dorsales y cuerpo técnico.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Ver alineaciones</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Highlight 3: Área Privada Sección */}
              <div
                onClick={() => handleNavClick('seccion')}
                className="bg-gradient-to-br from-emerald-950/60 to-neutral-900 border border-emerald-800/50 hover:border-emerald-600 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/50 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform shadow-lg shadow-emerald-950/50">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Protegido por Clave
                    </span>
                    <span className="text-[10px] bg-emerald-900 text-emerald-200 px-1.5 py-0.2 rounded font-mono">
                      Google Drive
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    Área de la Sección
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Acceso exclusivo para técnicos y jugadoras: actas de mesa, autorizaciones, cuadrante de pistas y archivos de Drive sincronizados.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-emerald-900/60 flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span>{isUnlocked ? 'Acceder a tus archivos' : 'Desbloquear con clave'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* INSTALACIONES Y PABELLÓN */}
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Instalaciones AD San Juan • Donibane</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Pabellón Polideportivo San Juan
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Contamos con pista reglamentaria de balonmano de 40x20 metros con graderío para más de 400 espectadores, sala polivalente de preparación física, vestuarios adaptados y pistas exteriores en el complejo deportivo de la Agrupación en el barrio de San Juan.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs text-neutral-300">
                  <span className="px-3 py-1 bg-neutral-950 rounded-lg border border-neutral-800">
                    Pista 1 Interior
                  </span>
                  <span className="px-3 py-1 bg-neutral-950 rounded-lg border border-neutral-800">
                    Pista 2 Interior
                  </span>
                  <span className="px-3 py-1 bg-neutral-950 rounded-lg border border-neutral-800">
                    Pista Verde Exterior
                  </span>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleNavClick('contacto')}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer text-center"
                >
                  Contactar con la Sección
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NOTICIAS Y NOVEDADES */}
        {activeTab === 'noticias' && <NewsSection />}

        {/* TAB 3: EQUIPOS Y CATEGORÍAS */}
        {activeTab === 'equipos' && <TeamsSection />}

        {/* TAB 4: APARTADO DE LA SECCIÓN (PROTEGIDO POR CONTRASEÑA) */}
        {activeTab === 'seccion' && (
          <div>
            {!isUnlocked ? (
              <SectionLockGate onSuccess={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            ) : (
              <DriveSectionHub />
            )}
          </div>
        )}

        {/* TAB 5: CONTACTO */}
        {activeTab === 'contacto' && <ContactSection />}
      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 mt-20 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="space-y-4 md:col-span-1">
              <ClubLogo size="md" />
              <p className="text-neutral-400 text-xs leading-relaxed">
                Agrupación Deportiva San Juan / Donibane Kirol Elkartea. Fomentando el deporte, los valores y el balonmano en Pamplona desde su fundación.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Secciones y Enlaces</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <button onClick={() => handleNavClick('inicio')} className="hover:text-emerald-400 cursor-pointer">
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('noticias')} className="hover:text-emerald-400 cursor-pointer">
                    Noticias y Novedades
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('equipos')} className="hover:text-emerald-400 cursor-pointer">
                    Equipos y Jugadoras
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('seccion')} className="hover:text-emerald-400 cursor-pointer">
                    Área Protegida de Sección (Drive)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contacto')} className="hover:text-emerald-400 cursor-pointer">
                    Contacto e Inscripciones
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Contacto de Sección</h4>
              <p className="text-neutral-300 font-mono text-xs">balonmano.adsj@gmail.com</p>
              <p>Polideportivo AD San Juan</p>
              <p>C/ Virgen del Puy 1, 31011 Pamplona (Navarra)</p>
              <p className="text-neutral-500">Teléfono ADSJ: 948 17 22 55</p>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Seguridad y Acceso</h4>
              <p className="text-neutral-400 text-xs">
                El acceso a actas, cuadrantes y Google Drive está restringido a miembros acreditados de la sección con contraseña.
              </p>
              <div className="pt-1">
                {isUnlocked ? (
                  <button
                    onClick={lockSection}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-rose-400 rounded-lg text-xs hover:bg-neutral-800 cursor-pointer"
                  >
                    Cerrar sesión de sección
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick('seccion')}
                    className="px-3 py-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded-lg text-xs hover:bg-emerald-900 cursor-pointer"
                  >
                    Desbloquear Sección
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © {new Date().getFullYear()} AD San Juan Balonmano • Donibane Eskubaloia. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4">
              <span>Federación Navarra de Balonmano (FNBM)</span>
              <span>•</span>
              <span>Pamplona / Iruña</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SectionAuthProvider>
      <MainAppContent />
    </SectionAuthProvider>
  );
}
