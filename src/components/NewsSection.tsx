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
import { NewsArticle, NewsCategoryKey, INITIAL_NEWS } from '../data/news';
import { handballImages } from '../assets/images';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY_NEWS = 'adsj_handball_news_list_v4';

export const NewsSection: React.FC = () => {
  const { language, t } = useLanguage();

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

  const [activeCategory, setActiveCategory] = useState<'all' | NewsCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isCreatingNews, setIsCreatingNews] = useState(false);

  // Form for new article
  const [newTitle, setNewTitle] = useState('');
  const [newCategoryKey, setNewCategoryKey] = useState<NewsCategoryKey>('seniorFem');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(handballImages.seniorFemeninoReal);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(news));
  }, [news]);

  const categoryList: { key: 'all' | NewsCategoryKey; label: string }[] = [
    { key: 'all', label: t.news.categories.all },
    { key: 'seniorFem', label: t.news.categories.seniorFem },
    { key: 'baseFem', label: t.news.categories.baseFem },
    { key: 'school', label: t.news.categories.school },
    { key: 'club', label: t.news.categories.club },
    { key: 'federation', label: t.news.categories.federation },
  ];

  const getArticleTitle = (item: NewsArticle) =>
    language === 'eu' && item.titleEu ? item.titleEu : item.title;
  const getArticleSummary = (item: NewsArticle) =>
    language === 'eu' && item.summaryEu ? item.summaryEu : item.summary;
  const getArticleContent = (item: NewsArticle) =>
    language === 'eu' && item.contentEu ? item.contentEu : item.content;
  const getArticleDate = (item: NewsArticle) =>
    language === 'eu' && item.dateEu ? item.dateEu : item.date;
  const getArticleAuthor = (item: NewsArticle) =>
    language === 'eu' && item.authorEu ? item.authorEu : item.author;
  const getArticleTags = (item: NewsArticle) =>
    language === 'eu' && item.tagsEu ? item.tagsEu : item.tags;
  const getCategoryLabel = (key: NewsCategoryKey) => t.news.categories[key];

  const filteredNews = news.filter((item) => {
    const matchCat = activeCategory === 'all' || item.categoryKey === activeCategory;
    const titleStr = getArticleTitle(item).toLowerCase();
    const summaryStr = getArticleSummary(item).toLowerCase();
    const tagsList = getArticleTags(item);
    const q = searchQuery.toLowerCase();
    const matchSearch =
      titleStr.includes(q) ||
      summaryStr.includes(q) ||
      tagsList.some((tag) => tag.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const categoryMapToSpanish: Record<NewsCategoryKey, NewsArticle['category']> = {
    seniorFem: 'Senior Femenino',
    baseFem: 'Base Femenina',
    school: 'Escuela',
    club: 'Club',
    federation: 'Federación',
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const created: NewsArticle = {
      id: `custom-news-${Date.now()}`,
      categoryKey: newCategoryKey,
      title: newTitle.trim(),
      category: categoryMapToSpanish[newCategoryKey],
      date: new Date().toLocaleDateString(language === 'eu' ? 'eu-ES' : 'es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      author: language === 'eu' ? 'ADSJ Eskubaloi Saila' : 'Sección Balonmano ADSJ',
      summary: newSummary.trim() || newTitle.slice(0, 100),
      content: newContent.trim(),
      image: selectedImage,
      readTime: '2 min',
      tags: tagsArray.length > 0 ? tagsArray : ['Eskubaloia', 'AD San Juan'],
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
    if (confirm(t.news.confirmDelete)) {
      setNews(news.filter((n) => n.id !== id));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm(t.news.confirmRestore)) {
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
            <span>{t.news.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.news.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">{t.news.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreatingNews(true)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.news.publishBtn}</span>
          </button>

          <button
            onClick={handleRestoreDefaults}
            className="px-3 py-2 text-slate-500 hover:text-slate-900 text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {t.news.restoreBtn}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categoryList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.news.searchPlaceholder}
            className="w-full bg-white border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-3">
          <p className="text-slate-600 text-sm">{t.news.emptyText}</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
          >
            {t.news.viewAllBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item, index) => {
            const title = getArticleTitle(item);
            const summary = getArticleSummary(item);
            const date = getArticleDate(item);
            const tags = getArticleTags(item);
            const isHeroCard = index === 0 && activeCategory === 'all' && !searchQuery;

            return (
              <article
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className={`group bg-white border border-slate-200 hover:border-emerald-600/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between cursor-pointer ${
                  isHeroCard ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className={`relative overflow-hidden bg-slate-100 ${isHeroCard ? 'h-64 sm:h-80' : 'h-52'}`}>
                    <img
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {getCategoryLabel(item.categoryKey)}
                      </span>
                    </div>

                    {item.id.startsWith('custom-news') && (
                      <button
                        onClick={(e) => handleDeleteArticle(item.id, e)}
                        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white rounded-xl shadow-sm transition-colors"
                        title={t.news.deleteTooltip}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        {date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.readTime} {t.news.readTimeSuffix}
                      </span>
                    </div>

                    <h3
                      className={`font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-display ${
                        isHeroCard ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 flex items-center justify-between border-t border-slate-100 mt-auto">
                  <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1 transition-colors">
                    <span>{t.news.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[120px]">{tags[0]}</span>
                  </div>
                </div>
              </article>
            );
          })}
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
                  alt={getArticleTitle(selectedArticle)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {getCategoryLabel(selectedArticle.categoryKey)}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Calendar className="w-4 h-4" />
                    {getArticleDate(selectedArticle)}
                  </span>
                  <span>•</span>
                  <span>
                    {t.news.by} {getArticleAuthor(selectedArticle)}
                  </span>
                  <span>•</span>
                  <span>
                    {selectedArticle.readTime} {t.news.readTimeSuffix}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {getArticleTitle(selectedArticle)}
                </h2>

                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-700 rounded-r-xl text-slate-700 text-sm font-medium leading-relaxed italic">
                  {getArticleSummary(selectedArticle)}
                </div>

                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line space-y-4">
                  {getArticleContent(selectedArticle)}
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {getArticleTags(selectedArticle).map((tag) => (
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
                    {t.news.closeArticle}
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
                {t.news.modal.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                {t.news.modal.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{t.news.modal.subtitle}</p>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.news.modal.labelTitle}</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.news.modal.placeholderTitle}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.news.modal.labelCategory}</label>
                  <select
                    value={newCategoryKey}
                    onChange={(e) => setNewCategoryKey(e.target.value as NewsCategoryKey)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  >
                    <option value="seniorFem">{t.news.categories.seniorFem}</option>
                    <option value="baseFem">{t.news.categories.baseFem}</option>
                    <option value="school">{t.news.categories.school}</option>
                    <option value="club">{t.news.categories.club}</option>
                    <option value="federation">{t.news.categories.federation}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.news.modal.labelImage}</label>
                  <select
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  >
                    <option value={handballImages.seniorFemeninoReal}>{t.news.modal.imgOptionReal}</option>
                    <option value={handballImages.hero}>{t.news.modal.imgOptionHero}</option>
                    <option value={handballImages.teamAction}>{t.news.modal.imgOptionAction}</option>
                    <option value={handballImages.tactics}>{t.news.modal.imgOptionTactics}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.news.modal.labelSummary}</label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder={t.news.modal.placeholderSummary}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2 text-slate-900 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.news.modal.labelContent}</label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={t.news.modal.placeholderContent}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.news.modal.labelTags}</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder={t.news.modal.placeholderTags}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2 text-slate-900 outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreatingNews(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  {t.news.modal.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {t.news.modal.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
