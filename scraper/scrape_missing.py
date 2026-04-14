#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scrape_missing.py -- Scrape uniquement les pages absentes du dossier content/
"""
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Importer le module principal
sys.path.insert(0, str(Path(__file__).parent))
import scrape

MISSING_SLUGS = {"je-minforme", "agir", "actualites"}

scrape.CONTENT_DIR.mkdir(parents=True, exist_ok=True)
scrape.IMAGES_DIR.mkdir(parents=True, exist_ok=True)

pages_to_run = [p for p in scrape.PAGES if p["slug"] in MISSING_SLUGS]
print(f"[INFO] {len(pages_to_run)} page(s) a scraper : {[p['slug'] for p in pages_to_run]}")

for i, page in enumerate(pages_to_run):
    md = scrape.scrape_page(page, scrape.IMAGES_DIR)
    out = scrape.CONTENT_DIR / f"{page['slug']}.md"
    out.write_text(md, encoding="utf-8")
    print(f"  [OK] {out.name} -- {len(md)} caracteres")
    if i < len(pages_to_run) - 1:
        print("  [WAIT] Pause 2s...")
        time.sleep(2)

print("[DONE] Pages manquantes scrapees.")
