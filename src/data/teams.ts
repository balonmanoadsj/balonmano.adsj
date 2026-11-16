export interface Player {
  dorsal: number;
  name: string;
  position:
    | 'Portera'
    | 'Portero'
    | 'Extremo Izquierdo'
    | 'Extremo Derecho'
    | 'Lateral Izquierdo'
    | 'Lateral Derecho'
    | 'Central'
    | 'Pivote';
  positionEu?: string;
  captain?: boolean;
}

export interface Team {
  id: string;
  name: string;
  nameEu: string;
  division: string;
  divisionEu: string;
  gender: 'Femenino' | 'Masculino' | 'Mixto';
  coach: string;
  assistantCoach: string;
  trainingDays: string;
  trainingDaysEu: string;
  court: string;
  courtEu: string;
  roster: Player[];
  nextMatch?: {
    opponent: string;
    isHome: boolean;
    date: string;
    dateEu: string;
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

export const POSITION_EU_MAP: Record<Player['position'], string> = {
  Portera: 'Atezaina',
  Portero: 'Atezaina',
  'Extremo Izquierdo': 'Ezker Hegala',
  'Extremo Derecho': 'Eskuin Hegala',
  'Lateral Izquierdo': 'Ezker Albokoa',
  'Lateral Derecho': 'Eskuin Albokoa',
  Central: 'Erdikoa',
  Pivote: 'Pibotea',
};

export const TEAMS_DATA: Team[] = [
  {
    id: 'senior-fem',
    name: 'Senior Femenino',
    nameEu: 'Senior Neskak',
    division: 'Primera Nacional / Liga Navarra Senior',
    divisionEu: 'Lehen Maila / Nafarroako Senior Liga',
    gender: 'Femenino',
    coach: 'Mikel Aranguren',
    assistantCoach: 'Nerea Echeverría',
    trainingDays: 'Lunes, Miércoles y Viernes • 20:00 - 21:30',
    trainingDaysEu: 'Astelehen, Asteazken eta Ostiralak • 20:00 - 21:30',
    court: 'Polideportivo San Juan - Pista Central',
    courtEu: 'Donibane Kiroldegia - Pista Nagusia',
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
      dateEu: 'Larunbata, Urriak 28',
      time: '18:30',
      location: 'Polideportivo AD San Juan (Pamplona)',
    },
    roster: [
      { dorsal: 1, name: 'Amaia Goñi', position: 'Portera' },
      { dorsal: 12, name: 'Leire Beaumont', position: 'Portera' },
      { dorsal: 3, name: 'Maite Zabalza', position: 'Central', captain: true },
      { dorsal: 6, name: 'Uxue Iriarte', position: 'Lateral Derecho' },
      { dorsal: 10, name: 'Ane Larrea', position: 'Extremo Derecho' },
      { dorsal: 11, name: 'Irati Oses', position: 'Extremo Izquierdo' },
      { dorsal: 13, name: 'Nora San Martín', position: 'Lateral Izquierdo' },
      { dorsal: 14, name: 'Paula Mendívil', position: 'Pivote' },
      { dorsal: 18, name: 'Ainhoa Alzórriz', position: 'Lateral Izquierdo' },
      { dorsal: 19, name: 'June Aldaz', position: 'Central' },
      { dorsal: 22, name: 'Saioa Barrena', position: 'Pivote' },
      { dorsal: 27, name: 'Haizea Elía', position: 'Extremo Izquierdo' },
    ],
  },
  {
    id: 'juvenil-fem',
    name: 'Juvenil Femenino',
    nameEu: 'Jubenil Neskak',
    division: 'Juegos Deportivos de Navarra Juvenil',
    divisionEu: 'Nafarroako Kirol Jokoak Jubenila',
    gender: 'Femenino',
    coach: 'Iñaki Zubeldia',
    assistantCoach: 'Marta Olcoz',
    trainingDays: 'Martes y Jueves • 19:30 - 21:00',
    trainingDaysEu: 'Astearte eta Ostegunak • 19:30 - 21:00',
    court: 'Polideportivo San Juan - Pista 1',
    courtEu: 'Donibane Kiroldegia - 1. Pista',
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
      dateEu: 'Igandea, Urriak 29',
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
    nameEu: 'Kadete Neskak',
    division: 'Juegos Deportivos de Navarra Cadete',
    divisionEu: 'Nafarroako Kirol Jokoak Kadetea',
    gender: 'Femenino',
    coach: 'Javier Azcona',
    assistantCoach: 'Uxue Iriarte',
    trainingDays: 'Lunes y Miércoles • 18:30 - 20:00',
    trainingDaysEu: 'Astelehen eta Asteazkenak • 18:30 - 20:00',
    court: 'Polideportivo San Juan - Pista 2',
    courtEu: 'Donibane Kiroldegia - 2. Pista',
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
      dateEu: 'Larunbata, Urriak 28',
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
    nameEu: 'Infantil Neskak',
    division: 'Juegos Deportivos de Navarra Infantil',
    divisionEu: 'Nafarroako Kirol Jokoak Infantila',
    gender: 'Femenino',
    coach: 'Marta Olcoz',
    assistantCoach: 'Ane Larrea',
    trainingDays: 'Martes y Jueves • 17:30 - 19:00',
    trainingDaysEu: 'Astearte eta Ostegunak • 17:30 - 19:00',
    court: 'Polideportivo San Juan - Pista 2',
    courtEu: 'Donibane Kiroldegia - 2. Pista',
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
      dateEu: 'Larunbata, Urriak 28',
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
    id: 'alevin-fem',
    name: 'Alevín Femenino',
    nameEu: 'Alebin Neskak',
    division: 'Juegos Deportivos de Navarra Alevín',
    divisionEu: 'Nafarroako Kirol Jokoak Alebina',
    gender: 'Femenino',
    coach: 'Maite Zabalza',
    assistantCoach: 'Leire Beaumont',
    trainingDays: 'Martes y Jueves • 17:00 - 18:15',
    trainingDaysEu: 'Astearte eta Ostegunak • 17:00 - 18:15',
    court: 'Polideportivo San Juan - Pista 1',
    courtEu: 'Donibane Kiroldegia - 1. Pista',
    stats: {
      played: 4,
      won: 3,
      drawn: 1,
      lost: 0,
      points: 7,
      position: 1,
    },
    nextMatch: {
      opponent: 'BM River Ega',
      isHome: true,
      date: 'Sábado, 28 Octubre',
      dateEu: 'Larunbata, Urriak 28',
      time: '11:30',
      location: 'Polideportivo AD San Juan (Pamplona)',
    },
    roster: [
      { dorsal: 1, name: 'Alba Etxeberria', position: 'Portera' },
      { dorsal: 4, name: 'Lorea Zubizarreta', position: 'Central', captain: true },
      { dorsal: 7, name: 'Claudia Ibero', position: 'Extremo Izquierdo' },
      { dorsal: 9, name: 'Izarbe Ardanaz', position: 'Lateral Izquierdo' },
      { dorsal: 12, name: 'Marta Beriáin', position: 'Pivote' },
      { dorsal: 15, name: 'Naiara Ollo', position: 'Extremo Derecho' },
    ],
  },
  {
    id: 'escuela-mix',
    name: 'Escuela Balonmano Donibane',
    nameEu: 'Donibane Eskubaloi Eskola',
    division: 'Benjamín y Prebenjamín Federado',
    divisionEu: 'Benjamin eta Aurrebenjamin Federatuak',
    gender: 'Mixto',
    coach: 'Amaia Goñi & Mikel Aranguren',
    assistantCoach: 'Monitores Sección Balonmano',
    trainingDays: 'Lunes y Miércoles • 17:00 - 18:30',
    trainingDaysEu: 'Astelehen eta Asteazkenak • 17:00 - 18:30',
    court: 'Polideportivo San Juan - Pista Verde',
    courtEu: 'Donibane Kiroldegia - Pista Berdea',
    roster: [
      { dorsal: 2, name: 'Iniciación al Balonmano', position: 'Central', positionEu: 'Eskubaloi Hastapena' },
      { dorsal: 4, name: 'Juegos de Habilidad y Bote', position: 'Lateral Izquierdo', positionEu: 'Trebetasun eta Bote Jokoak' },
      { dorsal: 8, name: 'Valores y Compañerismo', position: 'Extremo Derecho', positionEu: 'Balioak eta Laguntasuna' },
    ],
  },
  {
    id: 'senior-masc',
    name: 'Senior Masculino',
    nameEu: 'Senior Mutilak',
    division: 'Segunda Nacional Navarra',
    divisionEu: 'Nafarroako Bigarren Maila Nazionala',
    gender: 'Masculino',
    coach: 'Asier Urbiola',
    assistantCoach: 'David Arregui',
    trainingDays: 'Lunes y Jueves • 21:00 - 22:30',
    trainingDaysEu: 'Astelehen eta Ostegunak • 21:00 - 22:30',
    court: 'Polideportivo San Juan - Pista Central',
    courtEu: 'Donibane Kiroldegia - Pista Nagusia',
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
