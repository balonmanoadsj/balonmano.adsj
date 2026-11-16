import React, { useState } from 'react';
import { Users, Shield, Calendar, MapPin, Trophy, Sparkles, ChevronRight, UserCheck } from 'lucide-react';
import { TEAMS_DATA, Team, Player } from '../data/teams';
import { handballImages } from '../assets/images';

export const TeamsSection: React.FC = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(TEAMS_DATA[0].id);
  const selectedTeam = TEAMS_DATA.find((t) => t.id === selectedTeamId) || TEAMS_DATA[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-left space-y-2 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Nuestros Equipos y Jugadoras</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Equipos y Categorías
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Gran apuesta por el balonmano femenino y de cantera en la AD San Juan: desde la escuela de iniciación hasta la categoría senior nacional.
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
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-500'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <span>{team.name}</span>
            {team.gender === 'Femenino' && (
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-800/60 font-semibold">
                Fem
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected Team Card with Roster and Match Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Team Profile & Match info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card Info */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                {selectedTeam.division}
              </span>
              <h3 className="text-2xl font-black text-white font-display mt-0.5">
                {selectedTeam.name}
              </h3>
            </div>

            {/* Standings if available */}
            {selectedTeam.stats && (
              <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950/80 rounded-2xl border border-neutral-800 text-center">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Puesto</div>
                  <div className="text-base font-extrabold text-emerald-400 font-mono">
                    #{selectedTeam.stats.position}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">Puntos</div>
                  <div className="text-base font-extrabold text-white font-mono">
                    {selectedTeam.stats.points} pts
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">V / E / D</div>
                  <div className="text-xs font-bold text-neutral-300 font-mono mt-0.5">
                    {selectedTeam.stats.won}-{selectedTeam.stats.drawn}-{selectedTeam.stats.lost}
                  </div>
                </div>
              </div>
            )}

            {/* Staff & Logistics */}
            <div className="space-y-3 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
              <div className="flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-neutral-500">Primer/a Entrenador/a:</div>
                  <div className="font-bold text-white">{selectedTeam.coach}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Ayudante: {selectedTeam.assistantCoach}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-neutral-500">Horarios de Entrenamiento:</div>
                  <div className="font-medium text-white">{selectedTeam.trainingDays}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-neutral-500">Instalación:</div>
                  <div className="font-medium text-white">{selectedTeam.court}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Match Box */}
          {selectedTeam.nextMatch && (
            <div className="bg-gradient-to-br from-emerald-950/60 to-neutral-900 border border-emerald-800/40 rounded-3xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Próxima Jornada
                </span>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded font-mono">
                  {selectedTeam.nextMatch.isHome ? 'En Casa (Pabellón)' : 'Fuera'}
                </span>
              </div>

              <div className="pt-1">
                <div className="text-xs text-neutral-400">Rival:</div>
                <div className="text-base font-extrabold text-white">{selectedTeam.nextMatch.opponent}</div>
              </div>

              <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 text-xs space-y-1">
                <div className="flex justify-between text-neutral-300">
                  <span>Día:</span>
                  <span className="font-bold text-white">{selectedTeam.nextMatch.date}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Hora:</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedTeam.nextMatch.time}</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px] pt-1">
                  <span>Lugar:</span>
                  <span className="text-right truncate max-w-[170px]">{selectedTeam.nextMatch.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Plantilla / Roster */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-display">
              Plantilla Oficial • {selectedTeam.name}
            </h3>
            <span className="text-xs text-neutral-400 font-medium">
              {selectedTeam.roster.length} componentes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedTeam.roster.map((player, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-700/60 rounded-2xl p-4 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-950/90 border border-emerald-700/50 flex items-center justify-center text-emerald-300 font-mono font-black text-base group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                    {player.dorsal}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                        {player.name}
                      </span>
                      {player.captain && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
                          (C)
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400">{player.position}</span>
                  </div>
                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors" />
              </div>
            ))}
          </div>

          {/* Club photo banner */}
          <div className="mt-6 rounded-3xl overflow-hidden border border-neutral-800 relative h-48 sm:h-56">
            <img
              src={handballImages.teamAction}
              alt="Equipo de Balonmano AD San Juan"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-6">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Cultura de Club
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                Valores, esfuerzo y deportividad en cada balón
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                La sección de balonmano de la Agrupación fomenta la formación integral deportiva y humana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
