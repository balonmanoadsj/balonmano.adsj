import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    category: string;
    subject: string;
    message: string;
  }>({
    name: '',
    email: '',
    phone: '',
    category: t.contact.categories[0],
    subject: t.contact.subjects[0],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-left space-y-2 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>{t.contact.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          {t.contact.title}
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl">{t.contact.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ClubLogo size="md" />
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">{t.contact.emailLabel}</div>
                  <a
                    href="mailto:balonmano.adsj@gmail.com"
                    className="font-bold text-slate-900 hover:text-emerald-700 text-sm break-all transition-colors"
                  >
                    balonmano.adsj@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.contact.emailNote}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 border border-blue-200 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">{t.contact.phoneLabel}</div>
                  <a href="tel:948172255" className="font-bold text-slate-900 hover:text-emerald-700 text-sm transition-colors">
                    (+34) 948 17 22 55
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.contact.phoneNote}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">{t.contact.addressLabel}</div>
                  <div className="font-bold text-slate-900 text-sm">{t.contact.addressTitle}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.contact.addressDetail}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">{t.contact.hoursLabel}</div>
                  <p className="text-slate-900 font-semibold text-xs mt-0.5">{t.contact.hoursWeek}</p>
                  <p className="text-slate-500 text-[11px]">{t.contact.hoursWeekend}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">{t.contact.successTitle}</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.contact.successDesc1} <strong className="text-emerald-700">{formData.email}</strong>{' '}
                  {t.contact.successDesc2}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: t.contact.categories[0],
                        subject: t.contact.subjects[0],
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    {t.contact.formTag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                    {t.contact.formTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{t.contact.formSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">{t.contact.nameLabel}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">{t.contact.emailInputLabel}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">{t.contact.phoneInputLabel}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="600 000 000"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">{t.contact.categoryLabel}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                    >
                      {t.contact.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.contact.subjectLabel}</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none"
                  >
                    {t.contact.subjects.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.contact.messageLabel}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-slate-900 outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? t.contact.sending : t.contact.submitBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
