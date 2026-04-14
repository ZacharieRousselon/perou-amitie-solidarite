import { BASE, HELLOASSO_URL } from '../config';

// ── Types ──────────────────────────────────────────────────────────────────────
type NavSection = { section: string };
type NavDivider  = { divider: true };
type NavPage     = { label: string; href: string };
export type NavChild = NavSection | NavDivider | NavPage;

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

// ── Structure de navigation complète du site ───────────────────────────────────
export const navigation: NavItem[] = [
  {
    label: "Je m'informe",
    href: `${BASE}/je-minforme`,
    children: [
      { section: "L'Association" },
      { label: "Qui sommes-nous ?",   href: `${BASE}/association` },
      { label: "Nos Équipes",          href: `${BASE}/equipes` },
      { label: "Nos Partenaires",      href: `${BASE}/partenaires` },
      { label: "Bilan Financier",      href: `${BASE}/bilan-financier` },
      { divider: true },
      { section: "Le Pérou" },
      { label: "Histoire",             href: `${BASE}/perou-histoire` },
      { label: "Démographie",          href: `${BASE}/perou-demographie` },
      { label: "Géographie",           href: `${BASE}/perou-geographie` },
      { label: "Patrimoine Culturel",  href: `${BASE}/perou-patrimoine` },
      { label: "Économie",             href: `${BASE}/perou-economie` },
      { label: "Éducation & Santé",    href: `${BASE}/perou-education` },
      { label: "Actualité politique",  href: `${BASE}/perou-actualite` },
    ],
  },
  {
    label: "Parrainage",
    href: `${BASE}/parrainage`,
    children: [
      { section: "Types de parrainage" },
      { label: "Parrainage Repas — 26€/mois",      href: `${BASE}/parrainage-repas` },
      { label: "Parrainage Études — dès 35€",       href: `${BASE}/parrainage-etudes` },
      { label: "Parrainage Maîtresse — 25€/mois",  href: `${BASE}/parrainage-maitresse` },
      { divider: true },
      { label: "Devenir parrain / marraine",         href: `${BASE}/devenir-parrain` },
    ],
  },
  {
    label: "J'agis",
    href: `${BASE}/agir`,
    children: [
      { label: "Bénévolat et Stage",  href: `${BASE}/benevolat` },
      { label: "Témoignages",          href: `${BASE}/temoignages` },
    ],
  },
  {
    label: "Actualités",
    href: `${BASE}/actualites`,
    children: [
      { label: "Dernières Nouvelles", href: `${BASE}/dernieres-nouvelles` },
      { label: "Journaux",             href: `${BASE}/journaux` },
    ],
  },
  {
    label: "Zones d'action",
    href: `${BASE}/actions`,
    children: [
      { label: "Collique (Lima)",      href: `${BASE}/zone-collique` },
      { label: "Casitas",              href: `${BASE}/zone-casitas` },
      { label: "Amantani (Titicaca)",  href: `${BASE}/zone-amantani` },
      { divider: true },
      { label: "Nos Projets",          href: `${BASE}/projets` },
    ],
  },
];

export { HELLOASSO_URL };
