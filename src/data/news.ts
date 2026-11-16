import { handballImages } from '../assets/images';

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Senior Femenino' | 'Base Femenina' | 'Escuela' | 'Club' | 'Federación';
  date: string;
  author: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: '¡Gran victoria del Senior Femenino en un vibrante final de partido en San Juan!',
    category: 'Senior Femenino',
    date: '24 Oct 2025',
    author: 'Coordinación Balonmano ADSJ',
    summary: 'Las jugadoras de la Agrupación firmaron una épica remontada en el Pabellón Polideportivo ante un abarrotado graderío verde.',
    content: `El conjunto senior femenino de la AD San Juan logró este sábado una meritoria y trabajada victoria (28-26) en un encuentro lleno de tensión, garra y calidad balonmanística.

Con una defensa 6:0 muy sólida capitaneada en el centro del 40x20 y rápidas transiciones al contragolpe, las chicas dirigidas por el cuerpo técnico supieron sobreponerse a un inicio adverso de 3 goles abajo. En la segunda mitad, el acierto desde los 7 metros y las paradas clave en los minutos decisivos desataron la fiesta entre la afición sanjuanera.

"El compromiso táctico y el esfuerzo colectivo de todas las jugadoras ha sido ejemplar. Este triunfo nos afianza en los puestos altos de la tabla y premia el trabajo semanal en los entrenamientos", destacó el entrenador al concluir el choque.

¡Enhorabuena chicas, a seguir soñando en verde!`,
    image: handballImages.seniorFemeninoReal,
    readTime: '3 min',
    featured: true,
    tags: ['Senior Femenino', 'Crónica', 'Pabellón San Juan', 'Victoria'],
  },
  {
    id: 'news-2',
    title: 'Las Cadetes e Infantiles celebran su pase invicto a la fase final de los Juegos Deportivos',
    category: 'Base Femenina',
    date: '20 Oct 2025',
    author: 'Área Técnica de Cantera',
    summary: 'Nuestras jóvenes promesas culminan una primera vuelta histórica demostrando compañerismo, deportividad y una progresión sobresaliente.',
    content: `El balonmano base femenino de la AD San Juan continúa dando enormes alegrías a toda la familia de la Agrupación. Tanto el equipo Cadete como el Infantil Femenino sellaron este pasado fin de semana su clasificación para la fase por el título de los Juegos Deportivos de Navarra.

La intensidad defensiva, la circulación rápida de balón y sobre todo la sonrisa y disfrute en la pista de las jugadoras han sido las señas de identidad de este equipo. Los valores de respeto, ilusión y trabajo en equipo que inculcan nuestros monitores y entrenadores se reflejan en cada jornada.

Agradecemos también el apoyo incondicional de los padres, madres y acompañantes que llenan las gradas en cada desplazamiento animando incansablemente con las bufandas y camisetas verdes.`,
    image: handballImages.teamAction,
    readTime: '2 min',
    featured: false,
    tags: ['Cantera', 'Cadete', 'Infantil', 'Juegos Deportivos', 'Formación'],
  },
  {
    id: 'news-3',
    title: 'Jornada técnica de perfeccionamiento táctico y charlas formativas para entrenadores',
    category: 'Club',
    date: '15 Oct 2025',
    author: 'Dirección Deportiva ADSJ',
    summary: 'Sesión de análisis de vídeo, toma de decisiones en inferioridad numérica y pautas de preparación física para la prevención de lesiones en jugadoras.',
    content: `Este pasado martes se celebró en la sala polivalente del club una jornada formativa dirigida a todos los técnicos, delegados y entrenadoras de la sección de balonmano.

Durante la sesión se analizaron secuencias tácticas de ataque con pivote y fijaciones impares, así como ejercicios prácticos aplicados a la etapa cadete y juvenil. Asimismo, los servicios de fisioterapia del club expusieron un protocolo específico para el calentamiento preventivo de rodilla y hombro en balonmano femenino.

Todo el material didáctico, presentaciones y hojas de ejercicios se encuentran ya disponibles en la sección privada del Google Drive de la sección para el acceso de los técnicos del club.`,
    image: handballImages.tactics,
    readTime: '4 min',
    featured: false,
    tags: ['Formación', 'Entrenadores', 'Táctica', 'Drive'],
  },
  {
    id: 'news-4',
    title: 'Convocatoria de cuatro jugadoras de la AD San Juan con la Selección Navarra',
    category: 'Federación',
    date: '08 Oct 2025',
    author: 'Federación Navarra de Balonmano',
    summary: 'Orgullo sanjuanero: la FNBM cita a cuatro jugadoras de nuestra cantera para los entrenamientos de preparación del CESA.',
    content: `La Federación Navarra de Balonmano (FNBM) ha hecho pública la lista de convocadas para las próximas sesiones de tecnificación de las Selecciones Navarras Cadete y Juvenil Femenina de cara a la preparación del Campeonato de España de Selecciones Autonómicas (CESA).

Entre las seleccionadas se encuentran cuatro jugadoras formadas en las pistas de la Agrupación Deportiva San Juan. Este reconocimiento premia su constancia, dedicación y el magnífico trabajo que se realiza a diario en la escuela de balonmano de nuestro club.

¡Mucho ánimo y a disfrutar al máximo de esta bonita experiencia representando a Navarra y a la Agrupación!`,
    image: handballImages.hero,
    readTime: '2 min',
    featured: false,
    tags: ['Selección Navarra', 'CESA', 'Cantera', 'Orgullo'],
  },
];
