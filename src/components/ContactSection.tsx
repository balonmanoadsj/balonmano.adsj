import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Globe,
  Sparkles,
  HelpCircle,
  Building,
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Senior Femenino',
    subject: 'Inscripción / Pruebas',
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
      <div className="text-left space-y-2 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>Atención a Familias y Deportistas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Contacto y Localización
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          ¿Quieres jugar en nuestros equipos, probar en la escuela de balonmano o necesitas información? Estamos a tu disposición.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <ClubLogo size="md" />
            </div>

            <div className="space-y-4 text-xs text-neutral-300 pt-2">
              {/* Email */}
              <div className="p-4 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800/50 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">Email Oficial de la Sección</div>
                  <a
                    href="mailto:balonmano.adsj@gmail.com"
                    className="font-bold text-white hover:text-emerald-300 text-sm break-all transition-colors"
                  >
                    balonmano.adsj@gmail.com
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Respuesta habitual en menos de 24 horas laborables.
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="p-4 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800/50 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">Oficinas AD San Juan</div>
                  <a href="tel:948172255" className="font-bold text-white hover:text-emerald-300 text-sm transition-colors">
                    (+34) 948 17 22 55
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Centralita general de la Agrupación Deportiva San Juan.
                  </p>
                </div>
              </div>

              {/* Dirección */}
              <div className="p-4 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800/50 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">Instalaciones Deportivas</div>
                  <div className="font-bold text-white text-sm">Polideportivo AD San Juan</div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    C/ Virgen del Puy, 1 • 31011 Pamplona / Iruña (Navarra)
                  </p>
                </div>
              </div>

              {/* Horarios */}
              <div className="p-4 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800/50 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-500 font-semibold uppercase">Horario de Entrenamientos y Pabellón</div>
                  <p className="text-white font-medium text-xs mt-0.5">
                    Lunes a Viernes: 16:30 a 22:30 h
                  </p>
                  <p className="text-neutral-400 text-[11px]">
                    Sábados y Domingos: Competiciones oficiales según calendario FNBM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/60">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  ¡Mensaje Recibido Correctamente!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Gracias por ponerte en contacto con la sección de balonmano de la AD San Juan. Nos pondremos en contacto contigo a través de <strong className="text-emerald-400">{formData.email}</strong> a la mayor brevedad.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'Senior Femenino',
                        subject: 'Inscripción / Pruebas',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    Formulario de Contacto
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                    Escribe a la Sección de Balonmano
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Rellena este formulario para consultas de altas, pruebas para jugadoras o cualquier duda.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Nombre y Apellidos *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Amaia Martínez"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu-email@ejemplo.com"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="600 000 000"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Categoría de Interés</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white outline-none"
                    >
                      <option value="Senior Femenino">Senior Femenino</option>
                      <option value="Juvenil Femenino">Juvenil Femenino</option>
                      <option value="Cadete Femenino">Cadete Femenino</option>
                      <option value="Infantil Femenino">Infantil Femenino</option>
                      <option value="Escuela Donibane">Escuela de Iniciación Donibane</option>
                      <option value="Senior Masculino">Senior Masculino</option>
                      <option value="Otro">Otra consulta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Motivo / Asunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white outline-none"
                  >
                    <option value="Inscripción / Pruebas">Pruebas de incorporación para la temporada</option>
                    <option value="Información Escuela">Información sobre la Escuela de Balonmano</option>
                    <option value="Partidos y Torneos">Consulta sobre partidos o torneos</option>
                    <option value="Patrocinio y Donaciones">Patrocinio o colaboración comercial</option>
                    <option value="Otro">Otro motivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Mensaje o Consulta *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos tu edad, experiencia previa o cualquier duda que tengas..."
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? 'Enviando...' : 'Enviar Consulta a la Sección'}</span>
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
