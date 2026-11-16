import { handballImages } from '../assets/images';

export type NewsCategoryKey = 'seniorFem' | 'baseFem' | 'school' | 'club' | 'federation';

export interface NewsArticle {
  id: string;
  categoryKey: NewsCategoryKey;
  title: string;
  titleEu?: string;
  category: 'Senior Femenino' | 'Base Femenina' | 'Escuela' | 'Club' | 'Federación';
  date: string;
  dateEu?: string;
  author: string;
  authorEu?: string;
  summary: string;
  summaryEu?: string;
  content: string;
  contentEu?: string;
  image: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  tagsEu?: string[];
}

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    categoryKey: 'seniorFem',
    title: '¡Gran victoria del Senior Femenino en un vibrante final de partido en San Juan!',
    titleEu: 'Senior Nesken garaipen bikaina San Juaneko partida zirraragarriaren amaieran!',
    category: 'Senior Femenino',
    date: '24 Oct 2025',
    dateEu: '2025eko urr. 24',
    author: 'Coordinación Balonmano ADSJ',
    authorEu: 'ADSJ Eskubaloi Koordinazioa',
    summary:
      'Las jugadoras de la Agrupación firmaron una épica remontada en el Pabellón Polideportivo ante un abarrotado graderío verde.',
    summaryEu:
      'Elkarteko jokalariek erremontada ikusgarria lortu zuten Kiroldegian, harmailetan bildutako zaletu berdeen babesarekin.',
    content: `El conjunto senior femenino de la AD San Juan logró este sábado una meritoria y trabajada victoria (28-26) en un encuentro lleno de tensión, garra y calidad balonmanística.

Con una defensa 6:0 muy sólida capitaneada en el centro del 40x20 y rápidas transiciones al contragolpe, las chicas dirigidas por el cuerpo técnico supieron sobreponerse a un inicio adverso de 3 goles abajo. En la segunda mitad, el acierto desde los 7 metros y las paradas clave en los minutos decisivos desataron la fiesta entre la afición sanjuanera.

"El compromiso táctico y el esfuerzo colectivo de todas las jugadoras ha sido ejemplar. Este triunfo nos afianza en los puestos altos de la tabla y premia el trabajo semanal en los entrenamientos", destacó el entrenador al concluir el choque.

¡Enhorabuena chicas, a seguir soñando en verde!`,
    contentEu: `AD San Juaneko senior nesken taldeak garaipen landu eta merezia (28-26) lortu zuen larunbat honetan, tentsioz, kemenez eta kalitatez betetako neurketan.

40x20ko erdigunean gidatutako 6:0 defentsa sendoarekin eta kontraeraso bizkorrekin, taldeak hasierako 3 goleko desabantailari buelta ematen jakin zuen. Bigarren zatian, 7 metroetatik izandako asmatzeak eta azken minutuetako geldiketa erabakigarriek festa piztu zuten harmailetan.

"Jokalari guztien konpromiso taktikoa eta talde-esfortzua eredugarriak izan dira. Garaipen honek sailkapeneko goiko postuetan sendotzen gaitu eta asteko entrenamenduetako lana saritzen du", nabarmendu zuen entrenatzaileak partida amaieran.

Zorionak neskak, jarrai dezagun berdez amesten!`,
    image: handballImages.seniorFemeninoReal,
    readTime: '3 min',
    featured: true,
    tags: ['Senior Femenino', 'Crónica', 'Pabellón San Juan', 'Victoria'],
    tagsEu: ['Senior Neskak', 'Kronika', 'Donibane Kiroldegia', 'Garaipena'],
  },
  {
    id: 'news-2',
    categoryKey: 'baseFem',
    title: 'Las Cadetes e Infantiles celebran su pase invicto a la fase final de los Juegos Deportivos',
    titleEu: 'Kadete eta Infantil neskek Kirol Jokoetako azken faserako txartela ospatu dute',
    category: 'Base Femenina',
    date: '20 Oct 2025',
    dateEu: '2025eko urr. 20',
    author: 'Área Técnica de Cantera',
    authorEu: 'Harrobiko Arlo Teknikoa',
    summary:
      'Nuestras jóvenes promesas culminan una primera vuelta histórica demostrando compañerismo, deportividad y una progresión sobresaliente.',
    summaryEu:
      'Gure harrobiko jokalariek lehen itzuli historikoa borobildu dute, laguntasuna, kiroltasuna eta bilakaera bikaina erakutsiz.',
    content: `El balonmano base femenino de la AD San Juan continúa dando enormes alegrías a toda la familia de la Agrupación. Tanto el equipo Cadete como el Infantil Femenino sellaron este pasado fin de semana su clasificación para la fase por el título de los Juegos Deportivos de Navarra.

La intensidad defensiva, la circulación rápida de balón y sobre todo la sonrisa y disfrute en la pista de las jugadoras han sido las señas de identidad de este equipo. Los valores de respeto, ilusión y trabajo en equipo que inculcan nuestros monitores y entrenadores se reflejan en cada jornada.

Agradecemos también el apoyo incondicional de los padres, madres y acompañantes que llenan las gradas en cada desplazamiento animando incansablemente con las bufandas y camisetas verdes.`,
    contentEu: `AD San Juaneko oinarrizko emakumezkoen eskubaloiak poz handiak ematen jarraitzen dio elkarte osoari. Kadete eta Infantil Nesken taldeek Nafarroako Kirol Jokoetako titulurako azken faserako sailkapena lortu zuten joan den asteburuan.

Defentsako intentsitatea, baloiaren zirkulazio azkarra eta batez ere jokalariek kantxan erakusten duten irribarrea eta gozamena izan dira taldearen ezaugarri nagusiak. Gure entrenatzaileek transmititzen dituzten errespetu, ilusio eta talde-lan balioak jardunaldi bakoitzean islatzen dira.

Eskerrak eman nahi dizkiegu baita ere partida bakoitzean harmailetan bufanda eta kamiseta berdeekin animatzen ari diren guraso eta senideei.`,
    image: handballImages.teamAction,
    readTime: '2 min',
    featured: false,
    tags: ['Cantera', 'Cadete', 'Infantil', 'Juegos Deportivos', 'Formación'],
    tagsEu: ['Harrobia', 'Kadeteak', 'Infantilak', 'Kirol Jokoak', 'Formakuntza'],
  },
  {
    id: 'news-3',
    categoryKey: 'club',
    title: 'Jornada técnica de perfeccionamiento táctico y charlas formativas para entrenadores',
    titleEu: 'Hobekuntza teknikoko jardunaldia eta entrenatzaileentzako prestakuntza hitzaldiak',
    category: 'Club',
    date: '15 Oct 2025',
    dateEu: '2025eko urr. 15',
    author: 'Dirección Deportiva ADSJ',
    authorEu: 'ADSJ Kirol Zuzendaritza',
    summary:
      'Sesión de análisis de vídeo, toma de decisiones en inferioridad numérica y pautas de preparación física para la prevención de lesiones en jugadoras.',
    summaryEu:
      'Bideo analisia, jokalari gutxiagorekin erabakiak hartzeko saioa eta lesioak prebenitzeko prestakuntza fisikoaren jarraibideak.',
    content: `Este pasado martes se celebró en la sala polivalente del club una jornada formativa dirigida a todos los técnicos, delegados y entrenadoras de la sección de balonmano.

Durante la sesión se analizaron secuencias tácticas de ataque con pivote y fijaciones impares, así como ejercicios prácticos aplicados a la etapa cadete y juvenil. Asimismo, los servicios de fisioterapia del club expusieron un protocolo específico para el calentamiento preventivo de rodilla y hombro en balonmano femenino.

Todo el material didáctico, presentaciones y hojas de ejercicios se encuentran ya disponibles en la sección privada del Google Drive de la sección para el acceso de los técnicos del club.`,
    contentEu: `Joan den asteartean prestakuntza jardunaldia egin zen klubeko aretoan, eskubaloi saileko teknikari, ordezkari eta entrenatzaile guztiei zuzenduta.

Saioan pibotearekin egindako eraso sekuentzia taktikoak eta finkatze bakoitiak aztertu ziren, baita kadete eta jubenil mailetarako ariketa praktikoak ere. Horrez gain, klubeko fisioterapia zerbitzuek emakumezkoen eskubaloian belauneko eta sorbaldako lesioak prebenitzeko beroketa protokolo berezia aurkeztu zuten.

Material didaktiko guztia, aurkezpenak eta ariketa fitxak eskuragarri daude dagoeneko saileko eremu pribatuko Google Drive-n.`,
    image: handballImages.tactics,
    readTime: '4 min',
    featured: false,
    tags: ['Formación', 'Entrenadores', 'Táctica', 'Drive'],
    tagsEu: ['Formakuntza', 'Entrenatzaileak', 'Taktika', 'Drive'],
  },
  {
    id: 'news-4',
    categoryKey: 'federation',
    title: 'Convocatoria de cuatro jugadoras de la AD San Juan con la Selección Navarra',
    titleEu: 'AD San Juaneko lau jokalariren deialdia Nafarroako Selekzioarekin',
    category: 'Federación',
    date: '08 Oct 2025',
    dateEu: '2025eko urr. 08',
    author: 'Federación Navarra de Balonmano',
    authorEu: 'Nafarroako Eskubaloi Federazioa',
    summary:
      'Orgullo sanjuanero: la FNBM cita a cuatro jugadoras de nuestra cantera para los entrenamientos de preparación del CESA.',
    summaryEu:
      'Harrotasun berdea: FNBMk gure harrobiko lau jokalari deitu ditu Espainiako Txapelketa (CESA) prestatzeko entrenamenduetara.',
    content: `La Federación Navarra de Balonmano (FNBM) ha hecho pública la lista de convocadas para las próximas sesiones de tecnificación de las Selecciones Navarras Cadete y Juvenil Femenina de cara a la preparación del Campeonato de España de Selecciones Autonómicas (CESA).

Entre las seleccionadas se encuentran cuatro jugadoras formadas en las pistas de la Agrupación Deportiva San Juan. Este reconocimiento premia su constancia, dedicación y el magnífico trabajo que se realiza a diario en la escuela de balonmano de nuestro club.

¡Mucho ánimo y a disfrutar al máximo de esta bonita experiencia representando a Navarra y a la Agrupación!`,
    contentEu: `Nafarroako Eskubaloi Federazioak (FNBM) jakinarazi du Emakumezkoen Kadete eta Jubenil Selekzioen hurrengo teknifikazio saioetarako deialdia, Espainiako Autonomia Selekzioen Txapelketa (CESA) prestatzeko.

Hautatuen artean Donibane Kirol Elkarteko pistetan hezitako lau jokalari daude. Aitorpen honek euren konstantzia, dedikazioa eta egunero gure eskubaloi eskolan egiten den lan bikaina saritzen ditu.

Animo eta gozatu esperientzia eder honetaz Nafarroa eta elkartea ordezkatuz!`,
    image: handballImages.hero,
    readTime: '2 min',
    featured: false,
    tags: ['Selección Navarra', 'CESA', 'Cantera', 'Orgullo'],
    tagsEu: ['Nafarroako Selekzioa', 'CESA', 'Harrobia', 'Harrotasuna'],
  },
];
