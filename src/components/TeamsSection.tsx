import React, { useState } from 'react';
import { Users, Calendar, MapPin, UserCheck, Camera } from 'lucide-react';
import { TEAMS_DATA } from '../data/teams';
import { handballImages } from '../assets/images';

export const TeamsSection: React.FC = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(TEAMS_DATA[0].id);
  const selectedTeam = TEAMS_DATA.find((t) => t.id === selectedTeamId) || TEAMS_DATA[0];

  const isSeniorFem = selectedTeam.id === 'senior-fem';
  const bannerImage = isSeniorFem ? handballImages.seniorFemeninoReal : handballImages.teamAction;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-left space-y-2 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Nuestros Equipos y Jugadoras</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Equipos y Categorías
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl">
          Gran apuesta por el balonmano femenino y de cantera en la AD San Juan: desde la escuela de iniciación hasta la categoría senior.
        </p>
      </div>

      {/* Team Category Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {TEAMS_DATA.map((team) => (
          <button
            key={team.id}
            onClick={() => setSelectedTeamId(team.id)}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              selectedTeamId === team.id
                ? 'bg-emerald-700 text-white shadow-md border border-emerald-700'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-200/70'
            }`}
          >
            <span>{team.name}</span>
            {team.gender === 'Femenino' && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  selectedTeamId === team.id
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                Fem
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Featured Real Team Photo Banner for Senior Femenino */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 bg-slate-100">
            <img
              src={bannerImage}
              alt={isSeniorFem ? 'Equipo Senior Femenino AD San Juan' : `Equipo ${selectedTeam.name} AD San Juan`}
              className="w-full h-full object-cover object-center"
            />
            {isSeniorFem && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-slate-200">
                <Camera className="w-3.5 h-3.5 text-emerald-700" />
                <span>Foto Oficial Temporada Actual</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                  {selectedTeam.division}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
                  {selectedTeam.name}
                </h3>
              </div>

              {selectedTeam.stats && (
                <div className="grid grid-cols-3 gap-2 p-3.5 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Puesto</div>
                    <div className="text-lg font-extrabold text-emerald-700 font-mono">
                      #{selectedTeam.stats.position}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Puntos</div>
                    <div className="text-lg font-extrabold text-slate-900 font-mono">
                      {selectedTeam.stats.points} pts
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">V / E / D</div>
                    <div className="text-xs font-bold text-slate-700 font-mono mt-1">
                      {selectedTeam.stats.won}-{selectedTeam.stats.drawn}-{selectedTeam.stats.lost}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-xs text-slate-700 pt-2">
                <div className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-slate-500">Cuerpo Técnico:</div>
                    <div className="font-bold text-slate-900">{selectedTeam.coach}</div>
                    <div className="text-[11px] text-slate-500">Ayudante: {selectedTeam.assistantCoach}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-slate-500">Horarios de Entrenamiento:</div>
                    <div className="font-semibold text-slate-900">{selectedTeam.trainingDays}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-slate-500">Instalación:</div>
                    <div className="font-semibold text-slate-900">{selectedTeam.court}</div>
                  </div>
                </div>
              </div>
            </div>

            {selectedTeam.nextMatch && (
              <div className="mt-6 p-4 bg-white border border-emerald-200 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Próxima Jornada
                  </span>
                  <span className="text-[10px] bg-blue-950 text-white px-2 py-0.5 rounded font-mono font-semibold">
                    {selectedTeam.nextMatch.isHome ? 'En Casa' : 'Fuera'}
                  </span>
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  vs {selectedTeam.nextMatch.opponent}
                </div>
                <div className="text-[11px] text-slate-600 flex items-center justify-between">
                  <span>{selectedTeam.nextMatch.date}</span>
                  <span className="font-mono font-bold text-emerald-700">{selectedTeam.nextMatch.time}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plantilla / Roster */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Plantilla Oficial • {selectedTeam.name}
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            {selectedTeam.roster.length} componentes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {selectedTeam.roster.map((player, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-600/60 rounded-2xl p-4 transition-all flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-mono font-black text-base group-hover:scale-105 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700 transition-all shrink-0">
                  {player.dorsal}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors">
                      {player.name}
                    </span>
                    {player.captain && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded border border-amber-300">
                        (C)
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">{player.position}</span>
                </div>
              </div>

              <div className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
