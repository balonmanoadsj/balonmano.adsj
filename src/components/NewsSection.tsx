import React, { useState, useEffect } from 'react';
import {
  Search,
  PlusCircle,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  X,
  Trash2,
} from 'lucide-react';
import { NewsArticle, INITIAL_NEWS } from '../data/news';
import { handballImages } from '../assets/images';

const STORAGE_KEY_NEWS = 'adsj_handball_news_list_v3';

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NEWS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NEWS;
      }
    }
    return INITIAL_NEWS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isCreatingNews, setIsCreatingNews] = useState(false);

  // Form for new article
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<NewsArticle['category']>('Senior Femenino');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(handballImages.seniorFemeninoReal);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(news));
  }, [news]);

  const categories = ['Todas', 'Senior Femenino', 'Base Femenina', 'Escuela', 'Club', 'Federación'];

  const filteredNews = news.filter((item) => {
    const matchCat = activeCategory === 'Todas' || item.category === activeCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const created: NewsArticle = {
      id: `custom-news-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Sección Balonmano ADSJ',
      summary: newSummary.trim() || newTitle.slice(0, 100),
      content: newContent.trim(),
      image: selectedImage,
      readTime: '2 min',
      tags: tagsArray.length > 0 ? tagsArray : ['Balonmano', 'AD San Juan'],
      featured: false,
    };

    setNews([created, ...news]);
    setIsCreatingNews(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewTags('');
  };

  const handleDeleteArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Eliminar esta noticia? Podrás volver a restaurar las predeterminadas si lo deseas.')) {
      setNews(news.filter((n) => n.id !== id));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm('¿Restablecer las noticias originales de la sección?')) {
      setNews(INITIAL_NEWS);
      localStorage.removeItem(STORAGE_KEY_NEWS);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Actualidad y Crónicas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Noticias y Novedades
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Sigue el día a día de nuestros equipos de balonmano: crónicas de partidos, convocatorias y vida del club.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreatingNews(true)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Novedad</span>
          </button>

          <button
            onClick={handleRestoreDefaults}
            className="px-3 py-2 text-slate-500 hover:text-slate-900 text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Restaurar noticias oficiales"
          >
            Restaurar originales
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar crónica o jugadora..."
            className="w-full bg-white border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-3">
          <p className="text-slate-600 text-sm">No hay noticias en esta categoría con el término buscado.</p>
          <button
            onClick={() => {
              setActiveCategory('Todas');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
          >
            Ver todas las noticias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item, index) => (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className={`group bg-white border border-slate-200 hover:border-emerald-600/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between cursor-pointer ${
                index === 0 && activeCategory === 'Todas' && !searchQuery ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden bg-slate-100 ${
                    index === 0 && activeCategory === 'Todas' && !searchQuery ? 'h-64 sm:h-80' : 'h-52'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Delete button if custom */}
                  {item.id.startsWith('custom-news') && (
                    <button
                      onClick={(e) => handleDeleteArticle(item.id, e)}
                      className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white rounded-xl shadow-sm transition-colors"
                      title="Eliminar noticia"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.readTime} de lectura
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-display ${
                      index === 0 && activeCategory === 'Todas' && !searchQuery
                        ? 'text-xl sm:text-2xl'
                        : 'text-base sm:text-lg'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 flex items-center justify-between border-t border-slate-100 mt-auto">
                <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1 transition-colors">
                  <span>Leer crónica</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[120px]">{item.tags[0]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-800 shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative h-64 sm:h-80 bg-slate-100">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Calendar className="w-4 h-4" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span>Por: {selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime} de lectura</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {selectedArticle.title}
                </h2>

                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-700 rounded-r-xl text-slate-700 text-sm font-medium leading-relaxed italic">
                  {selectedArticle.summary}
                </div>

                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line space-y-4">
                  {selectedArticle.content}
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Cerrar Crónica
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW ARTICLE MODAL */}
      {isCreatingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-2xl max-h-[90vh] rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setIsCreatingNews(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Gestión de Contenidos
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                Publicar Nueva Noticia o Novedad
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Añade una crónica, aviso de partido o comunicado oficial para la sección.
              </p>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Título de la Noticia *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: Emocionante empate del Juvenil Femenino en Anaitasuna..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as NewsArticle['category'])}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  >
                    <option value="Senior Femenino">Senior Femenino</option>
                    <option value="Base Femenina">Base Femenina</option>
                    <option value="Escuela">Escuela</option>
                    <option value="Club">Club</option>
                    <option value="Federación">Federación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Imagen de Portada</label>
                  <select
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  >
                    <option value={handballImages.seniorFemeninoReal}>Foto oficial Senior Femenino ADSJ</option>
                    <option value={handballImages.hero}>Jugadora en suspensión</option>
                    <option value={handballImages.teamAction}>Celebración equipo femenino</option>
                    <option value={handballImages.tactics}>Pizarra táctica y banquillo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Resumen / Entradilla</label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Breve frase que resume lo más destacado del artículo..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2 text-slate-900 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contenido Completo de la Crónica *</label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escribe aquí el relato del partido, goleadoras, análisis o comunicado..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Senior, Crónica, Pista Central, Femenino"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2 text-slate-900 outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreatingNews(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Publicar en la Web
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
