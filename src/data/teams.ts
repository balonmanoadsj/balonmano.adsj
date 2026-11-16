export interface Player {
  dorsal: number;
  name: string;
  position: 'Portera' | 'Portero' | 'Extremo Izquierdo' | 'Extremo Derecho' | 'Lateral Izquierdo' | 'Lateral Derecho' | 'Central' | 'Pivote';
  captain?: boolean;
}

export interface Team {
  id: string;
  name: string;
  division: string;
  gender: 'Femenino' | 'Masculino' | 'Mixto';
  coach: string;
  assistantCoach: string;
  trainingDays: string;
  court: string;
  roster: Player[];
  nextMatch?: {
    opponent: string;
    isHome: boolean;
    date: string;
    time: string;
    location: string;
  };
  stats?: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    points: number;
    position: number;
  };
}

export const TEAMS_DATA: Team[] = [
  {
    id: 'senior-fem',
    name: 'Senior Femenino',
    division: 'Primera Nacional / Liga Navarra Senior',
    gender: 'Femenino',
    coach: 'Mikel Aranguren',
    assistantCoach: 'Nerea Echeverría',
    trainingDays: 'Lunes, Miércoles y Viernes • 20:00 - 21:30',
    court: 'Polideportivo San Juan - Pista Central',
    stats: {
      played: 8,
      won: 6,
      drawn: 1,
      lost: 1,
      points: 13,
      position: 2,
    },
    nextMatch: {
      opponent: 'BM Loyola Hermano Gárate',
      isHome: true,
      date: 'Sábado, 28 Octubre',
      time: '18:30',
      location: 'Polideportivo AD San Juan (Pamplona)',
    },
    roster: [
      { dorsal: 1, name: 'Amaia Goñi', position: 'Portera' },
      { dorsal: 12, name: 'Leire Beaumont', position: 'Portera' },
      { dorsal: 3, name: 'Maite Zabalza', position: 'Central', captain: true },
      { dorsal: 7, name: 'Ane Larrea', position: 'Lateral Izquierdo' },
      { dorsal: 9, name: 'Uxue Iriarte', position: 'Lateral Derecho' },
      { dorsal: 11, name: 'Irati Oses', position: 'Extremo Izquierdo' },
      { dorsal: 14, name: 'Nora San Martín', position: 'Pivote' },
      { dorsal: 17, name: 'Paula Mendívil', position: 'Extremo Derecho' },
      { dorsal: 21, name: 'Ainhoa Alzórriz', position: 'Lateral Izquierdo' },
      { dorsal: 23, name: 'June Aldaz', position: 'Central' },
      { dorsal: 27, name: 'Saioa Barrena', position: 'Pivote' },
      { dorsal: 30, name: 'Haizea Elía', position: 'Extremo Izquierdo' },
    ],
  },
  {
    id: 'juvenil-fem',
    name: 'Juvenil Femenino',
    division: 'Juegos Deportivos de Navarra Juvenil',
    gender: 'Femenino',
    coach: 'Iñaki Zubeldia',
    assistantCoach: 'Marta Olcoz',
    trainingDays: 'Martes y Jueves • 19:30 - 21:00',
    court: 'Polideportivo San Juan - Pista 1',
    stats: {
      played: 7,
      won: 5,
      drawn: 0,
      lost: 2,
      points: 10,
      position: 3,
    },
    nextMatch: {
      opponent: 'BM Beti Onak Atarrabia',
      isHome: false,
      date: 'Domingo, 29 Octubre',
      time: '11:00',
      location: 'Polideportivo Lorenzo Goikoa (Villava)',
    },
    roster: [
      { dorsal: 1, name: 'Naroa Martínez', position: 'Portera' },
      { dorsal: 4, name: 'Lucía Garralda', position: 'Extremo Izquierdo' },
      { dorsal: 8, name: 'Elena Berruezo', position: 'Central', captain: true },
      { dorsal: 10, name: 'Carla Uriz', position: 'Lateral Izquierdo' },
      { dorsal: 13, name: 'Garazi Remírez', position: 'Pivote' },
      { dorsal: 15, name: 'Oihane Santesteban', position: 'Lateral Derecho' },
      { dorsal: 18, name: 'Ariadna López', position: 'Extremo Derecho' },
      { dorsal: 22, name: 'Sofía Yoldi', position: 'Pivote' },
    ],
  },
  {
    id: 'cadete-fem',
    name: 'Cadete Femenino',
    division: 'Juegos Deportivos de Navarra Cadete',
    gender: 'Femenino',
    coach: 'Javier Azcona',
    assistantCoach: 'Uxue Iriarte',
    trainingDays: 'Lunes y Miércoles • 18:30 - 20:00',
    court: 'Polideportivo San Juan - Pista 2',
    stats: {
      played: 6,
      won: 6,
      drawn: 0,
      lost: 0,
      points: 12,
      position: 1,
    },
    nextMatch: {
      opponent: 'BM Malkaitz Burlada',
      isHome: true,
      date: 'Sábado, 28 Octubre',
      time: '16:00',
      location: 'Polideportivo AD San Juan (Pamplona)',
    },
    roster: [
      { dorsal: 1, name: 'Nahia Lizarraga', position: 'Portera' },
      { dorsal: 2, name: 'Marina Ciga', position: 'Extremo Izquierdo' },
      { dorsal: 5, name: 'Enara Ganuza', position: 'Central', captain: true },
      { dorsal: 6, name: 'Clara Salinas', position: 'Lateral Izquierdo' },
      { dorsal: 11, name: 'Adriana Erviti', position: 'Lateral Derecho' },
      { dorsal: 16, name: 'Carmen Goñi', position: 'Pivote' },
      { dorsal: 19, name: 'Lorena Munárriz', position: 'Extremo Derecho' },
    ],
  },
  {
    id: 'infantil-fem',
    name: 'Infantil Femenino',
    division: 'Juegos Deportivos de Navarra Infantil',
    gender: 'Femenino',
    coach: 'Marta Olcoz',
    assistantCoach: 'Ane Larrea',
    trainingDays: 'Martes y Jueves • 17:30 - 19:00',
    court: 'Polideportivo San Juan - Pista 2',
    stats: {
      played: 5,
      won: 4,
      drawn: 0,
      lost: 1,
      points: 8,
      position: 2,
    },
    nextMatch: {
      opponent: 'Helvetia Anaitasuna B',
      isHome: false,
      date: 'Sábado, 28 Octubre',
      time: '10:30',
      location: 'Pabellón Anaitasuna (Pamplona)',
    },
    roster: [
      { dorsal: 1, name: 'Elsa Urra', position: 'Portera' },
      { dorsal: 3, name: 'Iraia Sola', position: 'Extremo Izquierdo' },
      { dorsal: 5, name: 'Maddi Oroz', position: 'Central', captain: true },
      { dorsal: 7, name: 'Vega Jiménez', position: 'Lateral Izquierdo' },
      { dorsal: 9, name: 'June Barberena', position: 'Pivote' },
      { dorsal: 14, name: 'Sara Mendióroz', position: 'Extremo Derecho' },
    ],
  },
  {
    id: 'escuela-mix',
    name: 'Escuela de Balonmano Donibane',
    division: 'Alevín y Benjamín de Iniciación',
    gender: 'Mixto',
    coach: 'Amaia Goñi & Mikel Aranguren',
    assistantCoach: 'Monitores Sección Balonmano',
    trainingDays: 'Lunes y Miércoles • 17:00 - 18:30',
    court: 'Polideportivo San Juan - Pista Verde',
    roster: [
      { dorsal: 2, name: 'Iniciación al Balonmano', position: 'Central' },
      { dorsal: 4, name: 'Juegos de Habilidad y Bote', position: 'Lateral Izquierdo' },
      { dorsal: 8, name: 'Valores y Compañerismo', position: 'Extremo Derecho' },
    ],
  },
  {
    id: 'senior-masc',
    name: 'Senior Masculino',
    division: 'Segunda Nacional Navarra',
    gender: 'Masculino',
    coach: 'Asier Urbiola',
    assistantCoach: 'David Arregui',
    trainingDays: 'Lunes y Jueves • 21:00 - 22:30',
    court: 'Polideportivo San Juan - Pista Central',
    stats: {
      played: 7,
      won: 4,
      drawn: 1,
      lost: 2,
      points: 9,
      position: 4,
    },
    roster: [
      { dorsal: 1, name: 'Xabier Perez', position: 'Portero' },
      { dorsal: 4, name: 'Jon Arbizu', position: 'Central', captain: true },
      { dorsal: 8, name: 'Pablo Suescun', position: 'Lateral Izquierdo' },
      { dorsal: 11, name: 'Daniel Oteiza', position: 'Extremo Izquierdo' },
      { dorsal: 15, name: 'Iker Echarte', position: 'Pivote' },
    ],
  },
];
