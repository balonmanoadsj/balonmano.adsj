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
  Languages,
} from 'lucide-react';
import { SectionAuthProvider, useSectionAuth } from './context/SectionAuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ClubLogo } from './components/ClubLogo';
import { NewsSection } from './components/NewsSection';
import { TeamsSection } from './components/TeamsSection';
import { ContactSection } from './components/ContactSection';
import { SectionLockGate } from './components/SectionLockGate';
import { DriveSectionHub } from './components/DriveSectionHub';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { handballImages } from './assets/images';

type NavTab = 'inicio' | 'noticias' | 'equipos' | 'seccion' | 'contacto';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isUnlocked, lockSection } = useSectionAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-700 selection:text-white">
      {/* TOP TICKER BAR (Navy Blue & Emerald/Gold Club Colors) */}
      <div className="bg-blue-950 text-white py-1.5 px-4 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-semibold truncate">{t.common.clubFull}</span>
            <span className="text-blue-300/60 hidden sm:inline">•</span>
            <span className="text-blue-100/90 hidden sm:inline">{t.common.pamplonaPavilion}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="hidden lg:inline text-[11px] text-blue-200">
              balonmano.adsj@gmail.com
            </span>

            {/* Language Selector ES / EU */}
            <div
              className="inline-flex items-center bg-blue-900/90 rounded-lg p-0.5 border border-blue-800"
              title={t.nav.langSwitchTitle}
            >
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  language === 'es' ? 'bg-white text-blue-950 shadow-2xs' : 'text-blue-200 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage('eu')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  language === 'eu' ? 'bg-emerald-500 text-white shadow-2xs' : 'text-blue-200 hover:text-white'
                }`}
              >
                EU
              </button>
            </div>

            {isUnlocked ? (
              <button
                onClick={() => handleNavClick('seccion')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-900/60 hover:bg-emerald-800/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 transition-colors cursor-pointer"
              >
                <Unlock className="w-3 h-3" />
                <span>{t.common.sectionActive}</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('seccion')}
                className="inline-flex items-center gap-1 text-[11px] text-blue-100 hover:text-emerald-300 transition-colors cursor-pointer font-medium"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">{t.common.accessKey}</span>
                <span className="sm:hidden">Clave</span>
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
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inicio'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.nav.home}</span>
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
              <span>{t.nav.news}</span>
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
              <span>{t.nav.teams}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                {t.nav.teamsFemBadge}
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
              <span>{t.nav.contact}</span>
            </button>

            <div className="ml-2 pl-2 border-l border-slate-200">
              <PWAInstallButton variant="header" />
            </div>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200"
              aria-label={t.nav.openMenu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-700" />
                <span>{t.nav.langSwitchTitle}</span>
              </span>
              <div className="inline-flex bg-white rounded-lg p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${
                    language === 'es' ? 'bg-blue-950 text-white' : 'text-slate-600'
                  }`}
                >
                  Castellano
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('eu')}
                  className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${
                    language === 'eu' ? 'bg-emerald-700 text-white' : 'text-slate-600'
                  }`}
                >
                  Euskara
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('inicio')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'inicio' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.nav.home}</span>
            </button>
            <button
              onClick={() => handleNavClick('noticias')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'noticias' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>{t.nav.news}</span>
            </button>
            <button
              onClick={() => handleNavClick('equipos')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'equipos' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.nav.teamsMobile}</span>
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                activeTab === 'contacto' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>{t.nav.contactMobile}</span>
            </button>
            <button
              onClick={() => handleNavClick('seccion')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                activeTab === 'seccion' ? 'bg-emerald-700 text-white' : 'bg-blue-950 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isUnlocked ? <Unlock className="w-4 h-4 text-emerald-300" /> : <Lock className="w-4 h-4 text-amber-400" />}
                <span>{t.nav.sectionMobile}</span>
              </div>
              <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-mono">Drive</span>
            </button>

            <PWAInstallButton variant="mobile" />
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-16">
            {/* 1. PRESENTACIÓN (HERO SPLIT SHOWCASE) */}
            <div className="rounded-3xl sm:rounded-[36px] border border-slate-200 bg-slate-50/70 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left Copy */}
                <div className="lg:col-span-6 p-7 sm:p-12 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-blue-950 text-xs font-bold tracking-wide uppercase shadow-2xs">
                    <Shield className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.hero.badge}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.08] font-display">
                    {t.hero.titleLine1} <br />
                    <span className="text-emerald-700">{t.hero.titleWord2}</span>{' '}
                    <span className="text-blue-950">{t.hero.titleWord3}</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    {t.hero.description}
                  </p>

                  <div className="flex items-center gap-1.5 h-1.5 w-36 rounded-full overflow-hidden">
                    <div className="flex-1 h-full bg-emerald-700" />
                    <div className="flex-1 h-full bg-blue-950" />
                    <div className="flex-1 h-full bg-amber-500" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleNavClick('noticias')}
                      className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <Newspaper className="w-4 h-4" />
                      <span>{t.hero.ctaNews}</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('equipos')}
                      className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Users className="w-4 h-4 text-emerald-300" />
                      <span>{t.hero.ctaTeams}</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('contacto')}
                      className="px-4 py-3 text-slate-700 hover:text-emerald-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.hero.ctaJoin}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Real Senior Femenino Team Photo */}
                <div className="lg:col-span-6 p-4 sm:p-6 lg:pr-8">
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
                    <img
                      src={handballImages.seniorFemeninoReal}
                      alt={t.hero.photoCaption}
                      className="w-full h-72 sm:h-96 lg:h-[420px] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-emerald-700 px-2.5 py-1 rounded-full mb-1.5">
                          <Camera className="w-3 h-3" />
                          {t.hero.photoBadge}
                        </span>
                        <p className="text-sm sm:text-base font-bold leading-snug">
                          {t.hero.photoCaption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. NOTICIAS Y NOVEDADES JUSTO DEBAJO DE LA PRESENTACIÓN */}
            <section aria-label={t.news.title}>
              <NewsSection />
            </section>

            {/* 3. STATS STRIP (7 equipos federados y ~100 jugadores y jugadoras) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  number: t.stats.teamsNum,
                  label: t.stats.teamsLabel,
                  desc: t.stats.teamsDesc,
                  icon: Trophy,
                  color: 'text-emerald-700',
                  bg: 'bg-emerald-50',
                },
                {
                  number: t.stats.playersNum,
                  label: t.stats.playersLabel,
                  desc: t.stats.playersDesc,
                  icon: Users,
                  color: 'text-blue-950',
                  bg: 'bg-blue-50',
                },
                {
                  number: t.stats.coachesNum,
                  label: t.stats.coachesLabel,
                  desc: t.stats.coachesDesc,
                  icon: Award,
                  color: 'text-amber-600',
                  bg: 'bg-amber-50',
                },
                {
                  number: t.stats.spiritNum,
                  label: t.stats.spiritLabel,
                  desc: t.stats.spiritDesc,
                  icon: Flame,
                  color: 'text-emerald-700',
                  bg: 'bg-emerald-50',
                },
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

            {/* 4. THREE FEATURED HUB HIGHLIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => handleNavClick('noticias')}
                className="bg-white border border-slate-200 hover:border-emerald-600 rounded-3xl p-6 transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-950 mb-4 group-hover:scale-105 transition-transform">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                    {t.highlights.newsTag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                    {t.highlights.newsTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.highlights.newsDesc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{t.highlights.newsCta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => handleNavClick('equipos')}
                className="bg-white border border-slate-200 hover:border-emerald-600 rounded-3xl p-6 transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    {t.highlights.teamsTag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                    {t.highlights.teamsTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.highlights.teamsDesc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{t.highlights.teamsCta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

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
                      {t.highlights.sectionTag}
                    </span>
                    <span className="text-[10px] bg-white/15 text-white px-1.5 py-0.2 rounded font-mono">
                      Google Drive
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mt-1">
                    {t.highlights.sectionTitle}
                  </h3>
                  <p className="text-xs text-blue-100/90 mt-2 leading-relaxed">{t.highlights.sectionDesc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-900 flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span>{isUnlocked ? t.highlights.sectionCtaUnlocked : t.highlights.sectionCtaLocked}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 5. GALERÍA DE BALONMANO FEMENINO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {t.gallery.tag}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">{t.gallery.title}</h3>
                </div>
                <button
                  onClick={() => handleNavClick('equipos')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.gallery.viewAll}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={handballImages.hero}
                      alt={t.gallery.card1Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">{t.gallery.card1Title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{t.gallery.card1Desc}</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={handballImages.teamAction}
                      alt={t.gallery.card2Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">{t.gallery.card2Title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{t.gallery.card2Desc}</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={handballImages.tactics}
                      alt={t.gallery.card3Title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm">{t.gallery.card3Title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{t.gallery.card3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. INSTALACIONES Y PABELLÓN */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>{t.facilities.tag}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {t.facilities.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.facilities.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-700 font-medium">
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">
                    {t.facilities.court1}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">
                    {t.facilities.court2}
                  </span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-slate-200">
                    {t.facilities.court3}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleNavClick('contacto')}
                  className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  {t.facilities.cta}
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
            <div className="space-y-4 md:col-span-1">
              <ClubLogo size="md" />
              <p className="text-slate-600 text-xs leading-relaxed">{t.footer.about}</p>
              <PWAInstallButton variant="footer" />
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                {t.footer.linksTitle}
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button onClick={() => handleNavClick('inicio')} className="hover:text-emerald-700 cursor-pointer">
                    {t.footer.linkHome}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('noticias')} className="hover:text-emerald-700 cursor-pointer">
                    {t.footer.linkNews}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('equipos')} className="hover:text-emerald-700 cursor-pointer">
                    {t.footer.linkTeams}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('seccion')} className="hover:text-emerald-700 cursor-pointer">
                    {t.footer.linkSection}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contacto')} className="hover:text-emerald-700 cursor-pointer">
                    {t.footer.linkContact}
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                {t.footer.contactTitle}
              </h4>
              <p className="text-emerald-700 font-mono font-semibold text-xs">balonmano.adsj@gmail.com</p>
              <p>{t.footer.address1}</p>
              <p>{t.footer.address2}</p>
              <p className="text-slate-500">{t.footer.phone}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                {t.footer.securityTitle}
              </h4>
              <p className="text-slate-600 text-xs">{t.footer.securityDesc}</p>
              <div className="pt-1">
                {isUnlocked ? (
                  <button
                    onClick={lockSection}
                    className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 font-semibold rounded-lg text-xs hover:bg-amber-50 cursor-pointer"
                  >
                    {t.footer.lockSession}
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick('seccion')}
                    className="px-3 py-1.5 bg-blue-950 text-white font-semibold rounded-lg text-xs hover:bg-blue-900 cursor-pointer"
                  >
                    {t.footer.unlockSection}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} {t.footer.copyright}
            </div>
            <div className="flex items-center gap-4">
              <span>{t.common.fnbm}</span>
              <span>•</span>
              <span>{t.common.pamplona}</span>
            </div>
          </div>
        </div>
      </footer>

      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SectionAuthProvider>
        <MainAppContent />
      </SectionAuthProvider>
    </LanguageProvider>
  );
}
