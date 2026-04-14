// Structure de navigation complète du site
export const navigation = [
  {
    label: "Je m'informe",
    href: "/perou-amitie-solidarite/je-minforme",
    children: [
      { section: "L'Association" },
      { label: "Qui sommes-nous ?",  href: "/perou-amitie-solidarite/association" },
      { label: "Nos Équipes",        href: "/perou-amitie-solidarite/equipes" },
      { label: "Nos Partenaires",    href: "/perou-amitie-solidarite/partenaires" },
      { label: "Bilan Financier",    href: "/perou-amitie-solidarite/bilan-financier" },
      { divider: true },
      { section: "Le Pérou" },
      { label: "Histoire",           href: "/perou-amitie-solidarite/perou-histoire" },
      { label: "Démographie",        href: "/perou-amitie-solidarite/perou-demographie" },
      { label: "Géographie",         href: "/perou-amitie-solidarite/perou-geographie" },
      { label: "Patrimoine Culturel",href: "/perou-amitie-solidarite/perou-patrimoine" },
      { label: "Économie",           href: "/perou-amitie-solidarite/perou-economie" },
      { label: "Éducation & Santé",  href: "/perou-amitie-solidarite/perou-education" },
      { label: "Actualité politique",href: "/perou-amitie-solidarite/perou-actualite" },
    ]
  },
  {
    label: "Parrainage",
    href: "/perou-amitie-solidarite/parrainage",
    children: [
      { section: "Types de parrainage" },
      { label: "Parrainage Repas — 26€/mois",       href: "/perou-amitie-solidarite/parrainage-repas" },
      { label: "Parrainage Études — dès 35€",        href: "/perou-amitie-solidarite/parrainage-etudes" },
      { label: "Parrainage Maîtresse — 25€/mois",   href: "/perou-amitie-solidarite/parrainage-maitresse" },
      { divider: true },
      { label: "Devenir parrain / marraine",         href: "/perou-amitie-solidarite/devenir-parrain" },
    ]
  },
  {
    label: "J'agis",
    href: "/perou-amitie-solidarite/agir",
    children: [
      { label: "Bénévolat et Stage",  href: "/perou-amitie-solidarite/benevolat" },
      { label: "Témoignages",         href: "/perou-amitie-solidarite/temoignages" },
    ]
  },
  {
    label: "Actualités",
    href: "/perou-amitie-solidarite/actualites",
    children: [
      { label: "Dernières Nouvelles", href: "/perou-amitie-solidarite/dernieres-nouvelles" },
      { label: "Journaux",            href: "/perou-amitie-solidarite/journaux" },
    ]
  },
  {
    label: "Zones d'action",
    href: "/perou-amitie-solidarite/actions",
    children: [
      { label: "Collique (Lima)",     href: "/perou-amitie-solidarite/zone-collique" },
      { label: "Casitas",             href: "/perou-amitie-solidarite/zone-casitas" },
      { label: "Amantani (Titicaca)", href: "/perou-amitie-solidarite/zone-amantani" },
      { divider: true },
      { label: "Nos Projets",         href: "/perou-amitie-solidarite/projets" },
    ]
  },
];
