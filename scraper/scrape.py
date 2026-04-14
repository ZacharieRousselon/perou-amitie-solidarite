#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scrape.py -- Migration statique de perouamitiesolidarite.org
Extrait le contenu utile (h1/h2/p/ul/li), télécharge les images,
et génère des fichiers Markdown dans /content.
"""

import os
import re
import sys
import time
import urllib.parse
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# Forcer UTF-8 sur stdout (Windows cp1252 ne supporte pas les emojis)
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ('utf-8', 'utf-8-sig'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# ──────────────────────────────────────────────
# CONFIGURATION
# ──────────────────────────────────────────────

BASE_URL = "https://www.perouamitiesolidarite.org"

PAGES = [
    # ── Accueil ────────────────────────────────
    {"url": f"{BASE_URL}/",                                         "slug": "index",               "title": "Accueil"},
    # ── Association ────────────────────────────
    {"url": f"{BASE_URL}/qui-sommes-nous/",                        "slug": "association",          "title": "L'Association - Qui sommes-nous ?"},
    {"url": f"{BASE_URL}/nos-equipes/",                            "slug": "equipes",              "title": "Nos Equipes"},
    {"url": f"{BASE_URL}/france/",                                 "slug": "equipe-france",        "title": "Equipe France"},
    {"url": f"{BASE_URL}/perou/",                                  "slug": "equipe-perou",         "title": "Equipe Perou"},
    {"url": f"{BASE_URL}/nos-partenaires/",                        "slug": "partenaires",          "title": "Nos Partenaires"},
    {"url": f"{BASE_URL}/bilan-financier/",                        "slug": "bilan-financier",      "title": "Bilan Financier"},
    # ── Le Pérou ───────────────────────────────
    {"url": f"{BASE_URL}/histoire/",                               "slug": "perou-histoire",       "title": "Le Perou - Histoire"},
    {"url": f"{BASE_URL}/demographie-langues/",                    "slug": "perou-demographie",    "title": "Le Perou - Demographie et Langues"},
    {"url": f"{BASE_URL}/geographie-climat-et-ressources/",        "slug": "perou-geographie",     "title": "Le Perou - Geographie Climat et Ressources"},
    {"url": f"{BASE_URL}/patrimoine-culturel/",                    "slug": "perou-patrimoine",     "title": "Le Perou - Patrimoine Culturel"},
    {"url": f"{BASE_URL}/activites-economiques/",                  "slug": "perou-economie",       "title": "Le Perou - Activites Economiques"},
    {"url": f"{BASE_URL}/education-sante/",                        "slug": "perou-education",      "title": "Le Perou - Education et Sante"},
    {"url": f"{BASE_URL}/defis-a-relever/",                        "slug": "perou-actualite",      "title": "Le Perou - Actualite Politique Economique et Sociale"},
    # ── Parrainage ─────────────────────────────
    {"url": f"{BASE_URL}/parrainage/",                             "slug": "parrainage",           "title": "Parrainage"},
    {"url": f"{BASE_URL}/types-de-parrainage/",                    "slug": "types-parrainage",     "title": "Types de Parrainage"},
    {"url": f"{BASE_URL}/repas/",                                  "slug": "parrainage-repas",     "title": "Parrainage Repas - 26 euros par mois"},
    {"url": f"{BASE_URL}/etudes/",                                 "slug": "parrainage-etudes",    "title": "Parrainage Etudes - A partir de 35 euros"},
    {"url": f"{BASE_URL}/parrainages-maitresses/",                 "slug": "parrainage-maitresse", "title": "Parrainage Maitresse - 25 euros"},
    {"url": f"{BASE_URL}/comment-devenir-parrain-ou-marraine/",   "slug": "devenir-parrain",      "title": "Comment devenir parrain ou marraine ?"},
    # ── J'agis ─────────────────────────────────
    {"url": f"{BASE_URL}/benevolat/",                              "slug": "benevolat",            "title": "Benevolat et Stage"},
    {"url": f"{BASE_URL}/temoignages/",                            "slug": "temoignages",          "title": "Temoignages"},
    # ── Actualités ─────────────────────────────
    {"url": f"{BASE_URL}/journaux/",                               "slug": "journaux",             "title": "Journaux"},
    {"url": f"{BASE_URL}/dernieres-nouvelles/",                    "slug": "dernieres-nouvelles",  "title": "Dernieres Nouvelles"},
    # ── Don ────────────────────────────────────
    {"url": f"{BASE_URL}/don/",                                    "slug": "don",                  "title": "Faire un Don"},
    # ── Actions & Zones ────────────────────────
    {"url": f"{BASE_URL}/actions-et-projets/",                     "slug": "actions",              "title": "Actions et Projets"},
    {"url": f"{BASE_URL}/nos-projets/",                            "slug": "projets",              "title": "Nos Projets"},
    {"url": f"{BASE_URL}/collique/",                               "slug": "zone-collique",        "title": "Zone d'action - Collique"},
    {"url": f"{BASE_URL}/casitas/",                                "slug": "zone-casitas",         "title": "Zone d'action - Casitas"},
    {"url": f"{BASE_URL}/amantani/",                               "slug": "zone-amantani",        "title": "Zone d'action - Amantani"},
]


# Liens critiques à toujours conserver (HelloAsso, formulaires, dons)
CRITICAL_LINK_PATTERNS = [
    "helloasso",
    "don",
    "parrainage",
    "formulaire",
    "benevolat",
    "contact",
]

# Sélecteurs CSS à IGNORER (header, footer, nav, menus)
SKIP_SELECTORS = [
    "header",
    "footer",
    "nav",
    ".site-header",
    ".site-footer",
    ".main-navigation",
    ".nav-menu",
    ".menu",
    "#masthead",
    "#colophon",
    ".widget-area",
    ".sidebar",
    ".wpcf7",          # Contact Form 7 (on garde les liens uniquement)
    ".wp-block-navigation",
    ".navigation",
    ".post-navigation",
    ".pagination",
    ".breadcrumb",
    ".cookie-notice",
]

# Répertoires de sortie (relatifs à la racine du projet)
ROOT_DIR = Path(__file__).parent.parent
CONTENT_DIR = ROOT_DIR / "content"
IMAGES_DIR = ROOT_DIR / "assets" / "images"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

DELAY = 2  # secondes entre chaque requête


# ──────────────────────────────────────────────
# UTILITAIRES
# ──────────────────────────────────────────────

def slugify_filename(name: str) -> str:
    """Nettoie un nom de fichier."""
    name = re.sub(r'[^\w\-_.]', '_', name)
    name = re.sub(r'_+', '_', name)
    return name.strip('_')


def is_critical_link(href: str) -> bool:
    """Retourne True si le lien est un lien critique à conserver."""
    href_lower = href.lower()
    return any(pattern in href_lower for pattern in CRITICAL_LINK_PATTERNS)


def download_image(img_url: str, images_dir: Path) -> str | None:
    """
    Télécharge une image et retourne le chemin local relatif.
    Retourne None en cas d'échec.
    """
    try:
        parsed = urllib.parse.urlparse(img_url)
        filename = slugify_filename(os.path.basename(parsed.path))
        if not filename or '.' not in filename:
            return None

        local_path = images_dir / filename
        if local_path.exists():
            print(f"    [CACHE] Image deja presente : {filename}")
            return f"../assets/images/{filename}"

        print(f"    [IMG]   Telechargement : {img_url}")
        resp = requests.get(img_url, headers=HEADERS, timeout=15, stream=True)
        resp.raise_for_status()

        with open(local_path, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)

        time.sleep(0.5)  # petit délai pour les images
        return f"../assets/images/{filename}"

    except Exception as e:
        print(f"    [WARN]  Impossible de telecharger {img_url} : {e}")
        return None


def remove_skip_elements(soup: BeautifulSoup) -> None:
    """Supprime les éléments à ignorer (header, footer, nav…)."""
    for selector in SKIP_SELECTORS:
        for el in soup.select(selector):
            el.decompose()


def extract_content_blocks(soup: BeautifulSoup, images_dir: Path) -> list[str]:
    """
    Extrait les blocs de contenu utiles et les convertit en Markdown.
    Retourne une liste de chaînes Markdown.
    """
    # Chercher le contenu principal
    main = (
        soup.find("main")
        or soup.find("article")
        or soup.find(id="primary")
        or soup.find(id="content")
        or soup.find(class_="entry-content")
        or soup.find(class_="site-content")
        or soup.body
    )

    if not main:
        return []

    blocks = []
    seen_texts = set()  # déduplication

    for element in main.find_all(
        ["h1", "h2", "h3", "p", "ul", "ol", "img", "a"],
        recursive=True
    ):
        tag = element.name

        # ── Titres ──────────────────────────────
        if tag == "h1":
            text = element.get_text(strip=True)
            if text and text not in seen_texts:
                seen_texts.add(text)
                blocks.append(f"\n# {text}\n")

        elif tag == "h2":
            text = element.get_text(strip=True)
            if text and text not in seen_texts:
                seen_texts.add(text)
                blocks.append(f"\n## {text}\n")

        elif tag == "h3":
            text = element.get_text(strip=True)
            if text and text not in seen_texts:
                seen_texts.add(text)
                blocks.append(f"\n### {text}\n")

        # ── Paragraphes ─────────────────────────
        elif tag == "p":
            # Ignorer les paragraphes qui sont déjà dans un élément traité
            if element.find_parent(["ul", "ol"]):
                continue
            text = element.get_text(separator=" ", strip=True)
            if text and len(text) > 10 and text not in seen_texts:
                seen_texts.add(text)
                blocks.append(f"\n{text}\n")

        # ── Listes ──────────────────────────────
        elif tag in ("ul", "ol"):
            # Ignorer les listes imbriquées dans d'autres listes
            if element.find_parent(["ul", "ol"]):
                continue
            items = []
            for li in element.find_all("li", recursive=False):
                item_text = li.get_text(separator=" ", strip=True)
                if item_text and len(item_text) > 3:
                    items.append(f"- {item_text}")
            if items:
                list_md = "\n".join(items)
                if list_md not in seen_texts:
                    seen_texts.add(list_md)
                    blocks.append(f"\n{list_md}\n")

        # ── Images ──────────────────────────────
        elif tag == "img":
            src = element.get("src", "")
            alt = element.get("alt", "").strip() or "Image"
            if src and ("wp-content/uploads" in src or BASE_URL in src):
                local_path = download_image(src, images_dir)
                if local_path:
                    blocks.append(f"\n![{alt}]({local_path})\n")

        # ── Liens critiques ─────────────────────
        elif tag == "a":
            href = element.get("href", "").strip()
            text = element.get_text(strip=True)
            if href and text and is_critical_link(href):
                link_md = f"[{text}]({href})"
                if link_md not in seen_texts:
                    seen_texts.add(link_md)
                    blocks.append(f"\n> **[LIEN]** : {link_md}\n")

    return blocks


def scrape_page(page: dict, images_dir: Path) -> str:
    """
    Scrape une page et retourne son contenu Markdown.
    """
    url = page["url"]
    title = page["title"]
    slug = page["slug"]

    print(f"\n" + "="*60)
    print(f"[{slug.upper()}] Scraping : {url}")
    print("="*60)

    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(f"  [ERREUR] HTTP {e.response.status_code} pour {url}")
        return f"# {title}\n\n> Page non disponible lors du scraping ({e})\n"
    except Exception as e:
        print(f"  [ERREUR] {e}")
        return f"# {title}\n\n> Erreur lors du scraping : {e}\n"

    soup = BeautifulSoup(resp.content, "html.parser")

    # Supprimer les éléments à ignorer
    remove_skip_elements(soup)

    # Extraire le contenu
    blocks = extract_content_blocks(soup, images_dir)

    # Construire le Markdown final
    md_lines = [
        f"---",
        f"title: \"{title}\"",
        f"source: \"{url}\"",
        f"scraped_at: \"{time.strftime('%Y-%m-%dT%H:%M:%S')}\"",
        f"---",
        f"",
        f"# {title}",
        f"",
        f"> Source originale : [{url}]({url})",
        f"",
        "---",
        "",
    ]

    md_lines.extend(blocks)

    return "\n".join(md_lines)


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────

def main():
    print("[START] Demarrage du scraping -- Perou Amitie Solidarite")
    print(f"   Contenu -> {CONTENT_DIR}")
    print(f"   Images  -> {IMAGES_DIR}")

    # Créer les répertoires
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    results = []

    for i, page in enumerate(PAGES):
        md_content = scrape_page(page, IMAGES_DIR)

        # Sauvegarder le fichier Markdown
        output_file = CONTENT_DIR / f"{page['slug']}.md"
        output_file.write_text(md_content, encoding="utf-8")
        print(f"  [OK] Enregistre : {output_file.name}")

        results.append({
            "slug": page["slug"],
            "file": str(output_file),
            "chars": len(md_content),
        })

        # Rate-limiting : attendre entre chaque page (sauf la dernière)
        if i < len(PAGES) - 1:
            print(f"  [WAIT] Pause {DELAY}s...")
            time.sleep(DELAY)

    # Rapport final
    print(f"\n{'='*60}")
    print("[DONE] SCRAPING TERMINE")
    print(f"{'='*60}")
    for r in results:
        print(f"  - {r['slug']}.md -- {r['chars']} caracteres")

    image_count = len(list(IMAGES_DIR.glob("*")))
    print(f"  - {image_count} image(s) telechargee(s) dans assets/images/")
    print(f"\n[GIT] Pret pour le commit Git !")


if __name__ == "__main__":
    main()
