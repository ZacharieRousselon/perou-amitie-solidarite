/**
 * Configuration des pages — Hero images, carousels, sidebars, menus, formulaires.
 * Extrait de [...slug].astro pour alléger le template.
 */

import { BASE } from '../config';

// ── Types ─────────────────────────────────────────────────────────────────────
export type FormType = 'repas' | 'etudes' | 'maitresse' | 'general' | 'don';
export type NavLink   = { label: string; href: string };
export type SidebarEntry = { title: string; links: NavLink[] };
export type Child = {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  img?: string;
};
export type CarouselSlide = { img: string; caption?: string };

// ── Pages-menu (contenu trop court) → grille de sous-pages ───────────────────
export const CHILDREN_MAP: Record<string, Child[]> = {
  'types-parrainage': [
    { slug: 'parrainage-repas',     title: 'Parrainage Repas — 26€/mois',  desc: 'Un repas chaud chaque jour pour un enfant de Collique.',     icon: '🍽️', img: 'Repas.png' },
    { slug: 'parrainage-etudes',    title: 'Parrainage Études — dès 35€',  desc: "Financez la scolarité jusqu'aux études supérieures.",         icon: '📚', img: 'IMG_20221103_114325-1-1024x768.jpg' },
    { slug: 'parrainage-maitresse', title: 'Parrainage Maîtresse — 25€',   desc: 'Soutenez une institutrice des casitas de Collique.',          icon: '👩‍🏫', img: 'IMG_20221104_115245-768x1024.jpg' },
  ],
  'agir': [
    { slug: 'benevolat',   title: 'Bénévolat et Stage', desc: 'Partez en mission au Pérou ou engagez-vous en France.', icon: '✈️', img: 'IMG_20191018_152356-1024x768.jpg' },
    { slug: 'temoignages', title: 'Témoignages',         desc: 'Récits de bénévoles et de parrains engagés.',           icon: '💬', img: 'Maite-223x300.jpg' },
  ],
  'je-minforme': [
    { slug: 'association',     title: "L'Association",    desc: "Notre histoire, nos valeurs, notre mission depuis 2003.",       icon: '🤝', img: 'imgp2516.jpg' },
    { slug: 'equipes',         title: 'Nos Équipes',      desc: 'Les membres actifs en France et au Pérou.',                    icon: '👥', img: 'IMG_7396-1.jpg' },
    { slug: 'partenaires',     title: 'Nos Partenaires',  desc: 'Les organisations qui nous soutiennent.',                      icon: '🤲', img: 'logo-belloc-1.png' },
    { slug: 'bilan-financier', title: 'Bilan Financier',  desc: 'Transparence sur nos ressources et leur utilisation.',         icon: '📊', img: 'IMG_20191018_152356-1024x768.jpg' },
  ],
  'actualites': [
    { slug: 'dernieres-nouvelles', title: 'Dernières Nouvelles', desc: "Toute l'actualité récente de nos actions sur le terrain.", icon: '📰', img: 'IMG-20231223-WA0015-2-770x1024.jpg' },
    { slug: 'journaux',            title: 'Journaux',            desc: 'Nos bulletins associatifs à télécharger.',                 icon: '📄', img: 'IMG-20221223-WA0016-1024x770.jpg' },
  ],
  'actions': [
    { slug: 'zone-collique',  title: 'Collique · Lima',     desc: 'Notre zone principale : repas, santé, éducation.',  icon: '🏘️', img: 'Map_of_Lima_highlighting_Comas-2.png' },
    { slug: 'zone-casitas',   title: 'Les Casitas',         desc: 'Classes maternelles et soutien scolaire.',           icon: '🏫', img: '20429586_1447639341992507_3194714572492583571_n.jpg' },
    { slug: 'zone-amantani',  title: 'Amantani · Titicaca', desc: "L'île du lac Titicaca et le collège Miguel Grau.",   icon: '🏔️', img: '400px-Localizacion_de_Amantani-2.jpg' },
    { slug: 'projets',        title: 'Nos Projets',         desc: "Eau potable, construction, éducation — nos projets.",icon: '🔨', img: 'IMG_20221105_165039.jpg' },
  ],
  'parrainage': [
    { slug: 'parrainage-repas',     title: 'Parrainage Repas',     desc: '26€/mois — un repas chaque jour.',      icon: '🍽️', img: 'Repas.png' },
    { slug: 'parrainage-etudes',    title: 'Parrainage Études',    desc: "dès 35€ — soutien à la scolarité.",     icon: '📚', img: 'IMG_20221103_114325-1-1024x768.jpg' },
    { slug: 'parrainage-maitresse', title: 'Parrainage Maîtresse', desc: '25€/mois — une institutrice soutenue.', icon: '👩‍🏫', img: 'IMG_20221104_115245-768x1024.jpg' },
    { slug: 'devenir-parrain',      title: 'Devenir parrain',      desc: 'Comment vous engager concrètement.',    icon: '❤️', img: 'imgp2516.jpg' },
  ],
};

// ── Images hero par page ──────────────────────────────────────────────────────
export const HERO_MAP: Record<string, string> = {
  'association':         '20429586_1447639341992507_3194714572492583571_n.jpg',
  'equipes':             'IMG_7396-1.jpg',
  'equipe-france':       'IMG_20221105_170850.jpg',
  'equipe-perou':        'IMG_20221103_200759-768x1024.jpg',
  'partenaires':         'logo-belloc-1.png',
  'bilan-financier':     'IMG_20221103_121345-1-1024x768.jpg',
  'perou-histoire':      'INCAS.gif',
  'perou-demographie':   'Peru-y-situado-en-LA-2.jpg',
  'perou-geographie':    'machu-pichu-639174_640.jpg',
  'perou-patrimoine':    'machu-pichu-639174_640.jpg',
  'perou-economie':      'Peru-y-situado-en-LA-2.jpg',
  'perou-education':     'IMG_20221103_114325-1-1024x768.jpg',
  'perou-actualite':     'IMG-20231223-WA0015-2-770x1024.jpg',
  'parrainage':          'image-53-1024x685.png',
  'types-parrainage':    'image-53-1024x685.png',
  'parrainage-repas':    'image-53-1024x685.png',
  'parrainage-etudes':   'IMG_20221103_114325-2-1024x768.jpg',
  'parrainage-maitresse':'IMG_20221104_115245-768x1024.jpg',
  'devenir-parrain':     'IMG_20221105_191530-FOTO-LISTA-PADRINOS-1024x460.jpg',
  'benevolat':           'IMG_20191018_152356-1024x768.jpg',
  'temoignages':         'Maite-223x300.jpg',
  'journaux':            'IMG-20221223-WA0016-1024x770.jpg',
  'dernieres-nouvelles': 'IMG-20231223-WA0015-2-770x1024.jpg',
  'don':                 'imgp2516.jpg',
  'actions':             'reg-cus-ville001-1280x800.jpeg',
  'projets':             'IMG_20221105_165039.jpg',
  'zone-collique':       'Map_of_Lima_highlighting_Comas-2.png',
  'zone-casitas':        '20429586_1447639341992507_3194714572492583571_n.jpg',
  'zone-amantani':       '400px-Localizacion_de_Amantani-2.jpg',
  'je-minforme':         'imgp2516.jpg',
  'agir':                'IMG_20191018_152356-1024x768.jpg',
  'actualites':          'IMG-20231223-WA0015-2-770x1024.jpg',
};

// ── Carousels par page ────────────────────────────────────────────────────────
export const CAROUSEL_MAP: Record<string, CarouselSlide[]> = {
  'zone-collique': [
    { img: 'IMG_20221103_121345-1-1024x768.jpg', caption: 'Vue panoramique de Collique depuis le quartier Nueva Unión — des milliers de foyers sur les collines de Lima (nov. 2022)' },
    { img: '75266213_2518945218151148_8877541519288958976_n-1024x646.jpg', caption: "Atelier créatif : enfants des casitas et bénévole autour d'une grande table de peinture" },
    { img: 'IMG_20221103_173649-1024x768.jpg',   caption: 'Les jeunes de Collique posant dans leur casita, devant le logo Amitié Solidarité Pérou' },
    { img: 'IMG_20221104_115950-1024x768.jpg',   caption: 'Fresque murale colorée peinte par les enfants dans une salle de classe de la casita' },
  ],
  'zone-casitas': [
    { img: 'image-65-1024x576.png',              caption: 'La Casita Rosada — PRONOEI Casita Rosada UGEL 04, avec le quartier de Collique en arrière-plan' },
    { img: 'image-70-1024x768.png',              caption: "Activité d'éveil scientifique : les enfants explorent avec des loupes, encadrés par leur maîtresse" },
    { img: 'image-63-1024x768.png',              caption: 'La maîtresse de la Casita Verde avec une bénévole française — gilets Casita Verde UGEL 04' },
    { img: '75266213_2518945218151148_8877541519288958976_n-1024x646.jpg', caption: 'Atelier peinture : une bénévole accompagne les enfants dans un exercice créatif' },
  ],
  'zone-amantani': [
    { img: '56749285_2419670564723977_7719081207677321216_o-1-1024x713.jpg', caption: 'Élèves du collège Miguel Grau en costumes folkloriques dansant dans la cour (Amantani, île du Lac Titicaca)' },
    { img: '20664171_1459660727457035_6086017232525540128_n-1.jpg',          caption: "Une habitante d'Amantani en costume traditionnel brodé à fleurs — l'île du Lac Titicaca" },
    { img: 'PICT0062-1024x768.jpg',                                           caption: "La délégation française avec les élèves d'Amantani autour du panneau solaire offert en 2011" },
    { img: '21618055_1661358703896188_3393621093547430011_n-2.jpg',           caption: "Cours au collège Miguel Grau d'Amantani — l'enseignant et les élèves en uniforme" },
    { img: '71342115_1265420186969173_3120209980091793408_o-1-1024x768.jpg',  caption: 'Installation du dispositif de pompage au bord du Lac Titicaca — projet eau potable 2019' },
    { img: '70015515_1265420330302492_8395538397883531264_o-1-1024x768.jpg',  caption: 'Les cuves Rotoplas du projet eau potable livrées à Amantani — pour le collège, le dispensaire et les familles' },
  ],
  'association': [
    { img: 'imgp2516.jpg', caption: 'Vue aérienne du quartier de Collique (Lima) — le cœur de l\'action de l\'association depuis 2003' },
    { img: 'IMG_7396-1.jpg', caption: 'La Casita Verde — panneau d\'empreintes de mains colorées avec les prénoms des enfants parrainés' },
    { img: 'IMG_20221105_191530-FOTO-LISTA-PADRINOS-1024x460.jpg', caption: 'Le mur des padrinos dans la casita : chaque nom affiché est celui d\'un parrain ou d\'une marraine' },
    { img: 'IMG_20221103_121345-1-1024x768.jpg', caption: 'Vue panoramique de Collique depuis le quartier Nueva Unión — nov. 2022' },
    { img: 'reg-cus-ville001-1280x800.jpeg', caption: 'Cusco, Pérou — la Plaza de Armas et sa cathédrale coloniale baroque au pied des Andes' },
  ],
  'dernieres-nouvelles': [
    { img: 'IMG-20221223-WA0016-1024x770.jpg',   caption: 'Décembre 2022 — Préparation des colis-cadeaux alignés sur les tables du comedor avant la fête' },
    { img: 'IMG-20221223-WA0017-1024x770.jpg',   caption: 'Décembre 2022 — Les enfants rassemblés dans la casita pour la remise des cadeaux de Noël' },
    { img: 'IMG_20221103_173649-1024x768.jpg',    caption: 'Novembre 2022 — Les jeunes de Collique réunis dans la casita lors de la visite de la chargée de mission' },
  ],
};

// ── Navigation sidebar ────────────────────────────────────────────────────────
const ASSO_NAV: SidebarEntry = { title: "L'Association", links: [
  { label: "Qui sommes-nous ?",  href: `${BASE}/association` },
  { label: "Nos Équipes",        href: `${BASE}/equipes` },
  { label: "Équipe France",      href: `${BASE}/equipe-france` },
  { label: "Équipe Pérou",       href: `${BASE}/equipe-perou` },
  { label: "Nos Partenaires",    href: `${BASE}/partenaires` },
  { label: "Bilan Financier",    href: `${BASE}/bilan-financier` },
]};

const PARRAINAGE_NAV: SidebarEntry = { title: "Parrainage", links: [
  { label: "Vue d'ensemble",        href: `${BASE}/parrainage` },
  { label: "Parrainage Repas",      href: `${BASE}/parrainage-repas` },
  { label: "Parrainage Études",     href: `${BASE}/parrainage-etudes` },
  { label: "Parrainage Maîtresse",  href: `${BASE}/parrainage-maitresse` },
  { label: "Devenir parrain",       href: `${BASE}/devenir-parrain` },
]};

const PEROU_NAV: SidebarEntry = { title: "Le Pérou", links: [
  { label: "Histoire",            href: `${BASE}/perou-histoire` },
  { label: "Démographie",         href: `${BASE}/perou-demographie` },
  { label: "Géographie",          href: `${BASE}/perou-geographie` },
  { label: "Patrimoine Culturel", href: `${BASE}/perou-patrimoine` },
  { label: "Économie",            href: `${BASE}/perou-economie` },
  { label: "Éducation & Santé",   href: `${BASE}/perou-education` },
  { label: "Actualité politique", href: `${BASE}/perou-actualite` },
]};

const ZONES_NAV: SidebarEntry = { title: "Zones d'action", links: [
  { label: "Collique · Lima",     href: `${BASE}/zone-collique` },
  { label: "Les Casitas",         href: `${BASE}/zone-casitas` },
  { label: "Amantani · Titicaca", href: `${BASE}/zone-amantani` },
  { label: "Nos Projets",         href: `${BASE}/projets` },
]};

const AGIR_NAV: SidebarEntry = { title: "J'agis", links: [
  { label: "Bénévolat et Stage", href: `${BASE}/benevolat` },
  { label: "Témoignages",        href: `${BASE}/temoignages` },
]};

const ACTU_NAV: SidebarEntry = { title: "Actualités", links: [
  { label: "Dernières Nouvelles", href: `${BASE}/dernieres-nouvelles` },
  { label: "Journaux",            href: `${BASE}/journaux` },
]};

function spread(keys: string[], entry: SidebarEntry) {
  return Object.fromEntries(keys.map(k => [k, entry]));
}

export const SIDEBAR_NAV: Record<string, SidebarEntry> = {
  ...spread(['association','equipes','equipe-france','equipe-perou','partenaires','bilan-financier'], ASSO_NAV),
  ...spread(['parrainage','types-parrainage','parrainage-repas','parrainage-etudes','parrainage-maitresse','devenir-parrain'], PARRAINAGE_NAV),
  ...spread(['perou-histoire','perou-demographie','perou-geographie','perou-patrimoine','perou-economie','perou-education','perou-actualite'], PEROU_NAV),
  ...spread(['zone-collique','zone-casitas','zone-amantani','projets','actions'], ZONES_NAV),
  ...spread(['benevolat','temoignages','agir'], AGIR_NAV),
  ...spread(['actualites','dernieres-nouvelles','journaux'], ACTU_NAV),
};

// ── Formulaires parrainage ────────────────────────────────────────────────────
export const FORM_TYPE: Record<string, FormType> = {
  'parrainage-repas':     'repas',
  'parrainage-etudes':    'etudes',
  'parrainage-maitresse': 'maitresse',
  'devenir-parrain':      'general',
  'parrainage':           'general',
  'don':                  'don',
};

export const FORM_PRICE: Record<string, string> = {
  'parrainage-repas':     '26€/mois',
  'parrainage-etudes':    'dès 35€/mois',
  'parrainage-maitresse': '25€/mois',
};

// ── Seuil pages-menu (caractères) ────────────────────────────────────────────
export const THIN_THRESHOLD = 200;
