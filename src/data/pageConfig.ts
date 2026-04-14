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
    { slug: 'bilan-financier', title: 'Bilan Financier',  desc: 'Transparence sur nos ressources et leur utilisation.',         icon: '📊', img: 'Logo-perou-asso-1024x304.png' },
  ],
  'actualites': [
    { slug: 'dernieres-nouvelles', title: 'Dernières Nouvelles', desc: "Toute l'actualité récente de nos actions sur le terrain.", icon: '📰', img: 'IMG-20231223-WA0015-2-770x1024.jpg' },
    { slug: 'journaux',            title: 'Journaux',            desc: 'Nos bulletins associatifs à télécharger.',                 icon: '📄', img: 'Logo-perou-asso-1024x304.png' },
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
  'bilan-financier':     'Logo-perou-asso-1024x304.png',
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
    { img: 'IMG_20221103_121345-1-1024x768.jpg', caption: 'Collique — Activités avec les enfants' },
    { img: 'IMG_20221104_102402-768x1024.jpg',   caption: 'Casita — Moment de partage' },
    { img: 'IMG_20221105_165039.jpg',            caption: 'Construction et rénovation' },
    { img: 'IMG_20221103_173649-1024x768.jpg',   caption: 'Collique — La vie au quotidien' },
    { img: 'IMG_20221104_115950-1024x768.jpg',   caption: 'Repas au comedor' },
  ],
  'zone-casitas': [
    { img: '20429586_1447639341992507_3194714572492583571_n.jpg', caption: 'Repas quotidien au Comedor' },
    { img: 'IMG_20221104_115950-1024x768.jpg', caption: 'Repas des enfants' },
    { img: 'IMG_20221102_124644-1-768x1024.jpg', caption: 'Moment de partage' },
    { img: 'IMG_20221105_191530-FOTO-LISTA-PADRINOS-1024x460.jpg', caption: 'Liste des padrinos 2022' },
  ],
  'zone-amantani': [
    { img: '400px-Localizacion_de_Amantani-2.jpg', caption: "Île d'Amantani — Lac Titicaca" },
    { img: 'IMG_4996-1024x768.jpg', caption: 'Amantani — Le collège Miguel Grau' },
    { img: 'IMG_4999-1024x768.jpg', caption: 'Amantani — Activités scolaires' },
    { img: 'IMG_6219-4-1024x768.jpg', caption: "Rencontre avec les enfants d'Amantani" },
  ],
  'association': [
    { img: 'imgp2516.jpg', caption: 'Pérou Amitié Solidarité — Sur le terrain' },
    { img: 'IMG_7396-1.jpg', caption: "L'équipe de l'association" },
    { img: 'IMG_20221105_191530-FOTO-LISTA-PADRINOS-1024x460.jpg', caption: 'Nos padrinos — 2022' },
    { img: 'IMG_20221103_121345-1-1024x768.jpg', caption: 'Mission terrain 2022' },
    { img: 'reg-cus-ville001-1280x800.jpeg', caption: 'Lima — Pérou' },
  ],
  'dernieres-nouvelles': [
    { img: 'IMG-20231223-WA0015-2-770x1024.jpg', caption: 'Décembre 2023 — Nouvelles de Collique' },
    { img: 'IMG-20221223-WA0016-1024x770.jpg',   caption: 'Décembre 2022 — Noël à Collique' },
    { img: 'IMG-20221223-WA0017-1024x770.jpg',   caption: 'Décembre 2022 — Remise de cadeaux' },
    { img: 'IMG_20221105_155745.jpg',             caption: 'Novembre 2022 — Mission équipe' },
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
