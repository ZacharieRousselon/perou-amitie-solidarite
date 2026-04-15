# L'Atelier de Zac — Architecture & Layout Plan

Directives comprises et intégrées : Astro SSG pur, CSS natif ou Tailwind cohérent, Privacy by Design RGPD, WCAG AA, Lighthouse 100/100, zéro backend lourd.

---

## Arborescence complète des pages

```
latelierdezac/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Layout racine (SEO, a11y, Open Graph)
│   ├── components/
│   │   ├── Header.astro              # Nav + logo + skip-to-content
│   │   ├── Footer.astro              # Liens légaux, contact rapide, réseaux
│   │   ├── Hero.astro                # Section d'accroche principale
│   │   ├── ServiceCard.astro         # Carte prestation réutilisable
│   │   ├── ProcessStep.astro         # Étape du process de travail
│   │   ├── TestimonialCard.astro     # Témoignage client
│   │   ├── ContactForm.astro         # Formulaire RGPD-compliant
│   │   ├── CookieBanner.astro        # Bandeau cookies minimaliste
│   │   └── SeoMeta.astro             # Composant SEO/OG centralisé
│   ├── pages/
│   │   ├── index.astro               # / — Page d'accueil
│   │   ├── services.astro            # /services — Prestations détaillées
│   │   ├── realisations.astro        # /realisations — Portfolio / Projets
│   │   ├── apropos.astro             # /apropos — Qui je suis, valeurs, process
│   │   ├── contact.astro             # /contact — Formulaire + infos
│   │   ├── mentions-legales.astro    # /mentions-legales ⚖️ OBLIGATOIRE
│   │   └── politique-confidentialite.astro  # /politique-confidentialite 🔒 RGPD
│   ├── content/
│   │   └── realisations/             # (optionnel) Content Collections Astro
│   │       └── *.md                  # Une fiche par projet
│   ├── styles/
│   │   └── global.css               # Reset, tokens CSS, typographie
│   └── assets/
│       ├── images/                   # Images sources (optimisées par Astro)
│       └── icons/                    # SVG inline (spray SVG ou composants)
├── public/
│   ├── fonts/                        # Polices auto-hébergées (RGPD)
│   ├── og/                           # Images Open Graph statiques
│   ├── robots.txt
│   └── sitemap.xml                   # Généré par @astrojs/sitemap
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Pages — Rôle & contenu

| Route | Titre | Objectif |
|---|---|---|
| `/` | Accueil | Accroche, proposition de valeur, services en bref, 1 CTA principal |
| `/services` | Mes Prestations | Détail des offres (création site, refonte, maintenance, SEO) |
| `/realisations` | Réalisations | Portfolio avec filtres, études de cas |
| `/apropos` | À propos | Storytelling, valeurs, process, photo, crédibilité |
| `/contact` | Contact | Formulaire RGPD, délai de réponse, infos pratiques |
| `/mentions-legales` | Mentions Légales | Éditeur, hébergeur, propriété intellectuelle |
| `/politique-confidentialite` | Politique de Confidentialité | Données collectées, base légale, droits |

---

## Structure de `BaseLayout.astro`

```astro
---
// BaseLayout.astro
interface Props {
  title: string;            // Balise <title> unique par page
  description: string;      // Meta description (150-160 chars)
  ogImage?: string;         // URL absolue image Open Graph (défaut: /og/default.jpg)
  ogType?: 'website' | 'article';
  canonicalUrl?: string;    // URL canonique pour éviter le duplicate content
  noIndex?: boolean;        // true sur les pages légales (optionnel)
}

const {
  title,
  description,
  ogImage = '/og/default.jpg',
  ogType = 'website',
  canonicalUrl = Astro.url.href,
  noIndex = false,
} = Astro.props;

const siteName = "L'Atelier de Zac";
const twitterHandle = '@latelierdezac'; // à adapter
---
<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO de base -->
  <title>{title} | {siteName}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  {noIndex && <meta name="robots" content="noindex, nofollow" />}

  <!-- Open Graph (Facebook, LinkedIn, WhatsApp...) -->
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={`${title} | ${siteName}`} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="fr_FR" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:title" content={`${title} | ${siteName}`} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  <!-- Favicon & theme -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="theme-color" content="#YOUR_BRAND_COLOR" />

  <!-- Polices auto-hébergées (RGPD : pas de Google Fonts distant) -->
  <link rel="preload" href="/fonts/inter-variable.woff2" as="font"
        type="font/woff2" crossorigin="anonymous" />

  <!-- Sitemap -->
  <link rel="sitemap" href="/sitemap-index.xml" />

  <slot name="head" /> <!-- Slot pour injecter du head spécifique par page -->
</head>

<body>
  <!-- Skip-to-content : accessibilité clavier obligatoire -->
  <a class="skip-link" href="#main-content">
    Aller au contenu principal
  </a>

  <Header />

  <main id="main-content" tabindex="-1">
    <slot /> <!-- Contenu de chaque page -->
  </main>

  <Footer />

  <CookieBanner />
</body>
</html>
```

---

## Design Tokens CSS prévus (`global.css`)

```css
:root {
  /* Palette "Artisanat Numérique" */
  --color-primary:   #1A1A2E;   /* Bleu nuit profond */
  --color-accent:    #E8A87C;   /* Ocre chaleureux */
  --color-surface:   #F5F5F0;   /* Blanc cassé / ivoire */
  --color-text:      #2D2D2D;
  --color-muted:     #6B6B6B;
  --color-border:    #E0DED8;

  /* Typographie */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif; /* Pour les titres */

  /* Espacements (scale de 4px) */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Breakpoints via container queries */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Ombres */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.12);
}
```

---

## Plugins Astro à installer

| Plugin | Rôle | Commande |
|---|---|---|
| `@astrojs/sitemap` | Génère `sitemap.xml` automatiquement | `npm i @astrojs/sitemap` |
| `@astrojs/image` | Optimisation images (WebP/AVIF) — inclus dans core Astro v5 | — |
| `sharp` | Traitement image côté build | `npm i sharp` |

> [!IMPORTANT]
> Les polices seront **auto-hébergées** dans `/public/fonts/` pour éviter toute requête vers Google Fonts (RGPD : transfert de données vers des serveurs US).

> [!NOTE]
> Les réalisations seront gérées via les **Content Collections** d'Astro (`src/content/realisations/*.md`) pour permettre d'ajouter des projets sans toucher au code.

---

## Prochaines étapes suggérées

1. **Initialiser le projet Astro** (`npm create astro@latest`)
2. **Créer `BaseLayout.astro`** + tokens CSS
3. **Construire le Header et Footer** (navigation accessible au clavier)
4. **Page d'accueil** (`index.astro`) — Hero + Services + CTA
5. **Pages légales** (`mentions-legales`, `politique-confidentialite`)
6. **Portfolio** avec Content Collections
7. **Formulaire de contact** RGPD-compliant
8. **Audit Lighthouse** final avant mise en prod
