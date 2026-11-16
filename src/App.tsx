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
  Trophy,
  ChevronRight,
  MapPin,
  Flame,
  Award,
  Menu,
  X,
  Camera,
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-700 selection:text-white">
      {/* TOP TICKER BAR (Navy Blue & Club Colors accent matching the logo) */}
      <div className="bg-blue-950 text-white py-1.5 px-4 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-semibold">AD San Juan • Donibane Kirol Elkartea</span>
            <span className="text-blue-300/60 hidden sm:inline">•</span>
            <span className="text-blue-100/90 hidden sm:inline">Pabellón Polideportivo de Pamplona</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[11px] text-blue-200">
              balonmano.adsj@gmail.com
            </span>
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                <Unlock className="w-3 h-3" />
                <span>Sección Activa</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavClick('seccion')}
                className="inline-flex items-center gap-1 text-[11px] text-blue-100 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Acceso Clave Sección</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
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
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleNavClick('noticias')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'noticias'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Noticias y Novedades</span>
            </button>

            <button
              onClick={() => handleNavClick('equipos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'equipos'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Equipos</span>
              <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.2 rounded font-bold">
                Fem
              </span>
            </button>

            <button
              onClick={() => handleNavClick('contacto')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'contacto'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
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
                  ? 'bg-emerald-700 text-white shadow-md border border-emerald-700'
                  : 'bg-blue-950 hover:bg-blue-900 text-white shadow-sm'
              }`}
            >
              {isUnlocked ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-red-400" />
              )}
              <span>Área de la Sección</span>
              <span className="text-[10px] bg-white/15 text-white px-1.5 py-0.5 rounded font-mono">
                Drive
              </span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('seccion')}
              className="p-2 bg-blue-950 text-white rounded-xl text-xs flex items-center gap-1 font-bold"
            >
              {isUnlocked ? <Unlock className="w-4 h-4 text-emerald-300" /> : <Lock className="w-4 h-4 text-red-400" />}
              <span className="text-[11px]">Sección</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'inicio' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>
            <button
              onClick={() => handleNavClick('noticias')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'noticias' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Noticias y Novedades</span>
            </button>
            <button
              onClick={() => handleNavClick('equipos')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'equipos' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Equipos y Categorías (Especial Femenino)</span>
            </button>
            <button
              onClick={() => handleNavClick('seccion')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                activeTab === 'seccion' ? 'bg-emerald-700 text-white' : 'bg-blue-950 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>Área Privada de Sección (Contraseña + Drive)</span>
              </div>
              <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded">🔒</span>
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'contacto' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
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
            {/* HERO SPLIT SHOWCASE: Clean white layout with official logo colors and real Senior Femenino photo */}
            <div className="rounded-3xl sm:rounded-[36px] border border-slate-200 bg-slate-50/70 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left Copy */}
                <div className="lg:col-span-6 p-7 sm:p-12 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-blue-950 text-xs font-bold tracking-wide uppercase shadow-2xs">
                    <Shield className="w-3.5 h-3.5 text-red-600" />
                    <span>Agrupación Deportiva San Juan • Pamplona</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.08] font-display">
                    SECCIÓN DE <br />
                    <span className="text-emerald-700">BALONMANO</span>{' '}
                    <span className="text-red-600">ADSJ</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    Portal oficial de la sección de balonmano de la AD San Juan (Donibane). Pasión, formación y un proyecto referente en balonmano femenino y deporte base navarro.
                  </p>

                  {/* Tri-color accent line */}
                  <div className="flex items-center gap-1.5 h-1.5 w-36 rounded-full overflow-hidden">
                    <div className="flex-1 h-full bg-red-600" />
                    <div className="flex-1 h-full bg-blue-950" />
                    <div className="flex-1 h-full bg-emerald-700" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleNavClick('noticias')}
                      className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <Newspaper className="w-4 h-4" />
                      <span>Ver Noticias y Crónicas</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('seccion')}
                      className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Lock className="w-4 h-4 text-red-400" />
                      <span>Área Privada de Sección</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('contacto')}
                      className="px-4 py-3 text-slate-700 hover:text-emerald-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Quiero Jugar en San Juan</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Real Senior Femenino Team Photo */}
                <div className="lg:col-span-6 p-4 sm:p-6 lg:pr-8">
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
                    <img
                      src={handballImages.seniorFemeninoReal}
                      alt="Equipo Senior Femenino actual de la AD San Juan Balonmano"
                      className="w-full h-72 sm:h-96 lg:h-[420px] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-emerald-700 px-2.5 py-1 rounded-full mb-1.5">
                          <Camera className="w-3 h-3" />
                          Senior Femenino Actual
                        </span>
                        <p className="text-sm sm:text-base font-bold leading-snug">
                          Nuestro primer equipo femenino en el Polideportivo San Juan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: '6', label: 'Equipos Federados', desc: 'Cantera y Senior Femenino', icon: Trophy, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                { number: '+110', label: 'Jugadoras y Jugadores', desc: 'Compitiendo en Navarra', icon: Users, color: 'text-blue-950', bg: 'bg-blue-50' },
                { number: '14', label: 'Técnicos Titulados', desc: 'Formación y valores', icon: Award, color: 'text-red-600', bg: 'bg-red-50' },
                { number: '100%', label: 'Sentimiento Verde', desc: 'Pabellón Polideportivo', icon: Flame, color: 'text-emerald-700', bg: 'bg-emerald-50' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-600/50 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">{stat.number}</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{stat.label}</div>
                  <div className="text-[11px] text-slate-500">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* THREE FEATURED HUB HIGHLIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Highlight 1: Noticias y Crónicas */}
              <div
                onClick={() => handleNavClick('noticias')}
                className="bg-white border border-slate-200 hover:border-emerald-600 rounded-3xl p-6 transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-4 group-hover:scale-105 transition-transform">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                    Actualidad
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                    Noticias y Novedades
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Crónicas de partidos, resultados de fin de semana, avisos de entrenamientos y convocatorias de la Federación Navarra.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Explorar artículos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Highlight 2: Equipos & Balonmano Femenino */}
              <div
                onClick={() => handleNavClick('equipos')}
                className="bg-white border border-slate-200 hover:border-emerald-600 rounded-3xl p-6 transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Especial Chicas
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                    Equipos y Plantillas
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Conoce a nuestras jugadoras de Senior Femenino, Juveniles, Cadetes, Infantiles y Escuela de Iniciación con sus dorsales y cuerpo técnico.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Ver alineaciones</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Highlight 3: Área Privada Sección */}
              <div
                onClick={() => handleNavClick('seccion')}
                className="bg-blue-950 text-white border border-blue-900 hover:border-emerald-500 rounded-3xl p-6 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform shadow-sm">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                      Protegido por Clave
                    </span>
                    <span className="text-[10px] bg-white/15 text-white px-1.5 py-0.2 rounded font-mono">
                      Google Drive
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    Área de la Sección
                  </h3>
                  <p className="text-xs text-blue-100/90 mt-2 leading-relaxed">
                    Acceso exclusivo para técnicos y jugadoras: actas de mesa, autorizaciones, cuadrante de pistas y archivos de Drive sincronizados.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-900 flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span>{isUnlocked ? 'Acceder a tus archivos' : 'Desbloquear con clave'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* GALERÍA DE BALONMANO FEMENINO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Nuestra Identidad</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">Balonmano Femenino y Cantera</h3>
                </div>
                <button
                  onClick={() => handleNavClick('equipos')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todos los equipos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={handballImages.hero}
                      alt="Lanzamiento en suspensión balonmano femenino"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">Intensidad en cada partido</h4>
                    <p className="text-xs text-slate-500 mt-1">Competitividad y juego rápido en todas nuestras categorías.</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={handballImages.teamAction}
                      alt="Celebración equipo femenino de balonmano"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">Compañerismo en la pista</h4>
                    <p className="text-xs text-slate-500 mt-1">Cantera unida desde la escuela hasta categoría juvenil.</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={handballImages.tactics}
                      alt="Pizarra táctica y dirección técnica"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">Dirección Técnica Titulada</h4>
                    <p className="text-xs text-slate-500 mt-1">Planificación táctica y formación continua para nuestras jugadoras.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTALACIONES Y PABELLÓN */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Instalaciones AD San Juan • Donibane</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  Pabellón Polideportivo San Juan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Contamos con pista reglamentaria de balonmano de 40x20 metros con graderío para más de 400 espectadores, sala polivalente de preparación física, vestuarios adaptados y pistas exteriores en el complejo deportivo de la Agrupación en el barrio de San Juan.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-700 font-medium">
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">
                    Pista 1 Interior
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">
                    Pista 2 Interior
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">
                    Pista Verde Exterior
                  </span>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleNavClick('contacto')}
                  className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
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
      <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="space-y-4 md:col-span-1">
              <ClubLogo size="md" />
              <p className="text-slate-600 text-xs leading-relaxed">
                Agrupación Deportiva San Juan / Donibane Kirol Elkartea. Fomentando el deporte, los valores y el balonmano en Pamplona desde su fundación.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Secciones y Enlaces</h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button onClick={() => handleNavClick('inicio')} className="hover:text-emerald-700 cursor-pointer">
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('noticias')} className="hover:text-emerald-700 cursor-pointer">
                    Noticias y Novedades
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('equipos')} className="hover:text-emerald-700 cursor-pointer">
                    Equipos y Jugadoras
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('seccion')} className="hover:text-emerald-700 cursor-pointer">
                    Área Protegida de Sección (Drive)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contacto')} className="hover:text-emerald-700 cursor-pointer">
                    Contacto e Inscripciones
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Contacto de Sección</h4>
              <p className="text-emerald-700 font-mono font-semibold text-xs">balonmano.adsj@gmail.com</p>
              <p>Polideportivo AD San Juan</p>
              <p>C/ Virgen del Puy 1, 31011 Pamplona (Navarra)</p>
              <p className="text-slate-500">Teléfono ADSJ: 948 17 22 55</p>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">Seguridad y Acceso</h4>
              <p className="text-slate-600 text-xs">
                El acceso a actas, cuadrantes y Google Drive está restringido a miembros acreditados de la sección con contraseña.
              </p>
              <div className="pt-1">
                {isUnlocked ? (
                  <button
                    onClick={lockSection}
                    className="px-3 py-1.5 bg-white border border-red-200 text-red-700 font-semibold rounded-lg text-xs hover:bg-red-50 cursor-pointer"
                  >
                    Cerrar sesión de sección
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick('seccion')}
                    className="px-3 py-1.5 bg-blue-950 text-white font-semibold rounded-lg text-xs hover:bg-blue-900 cursor-pointer"
                  >
                    Desbloquear Sección
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
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
