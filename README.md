# Pérou Amitié Solidarité — Migration Statique

Migration bénévole du site [perouamitiesolidarite.org](https://www.perouamitiesolidarite.org/) vers une architecture statique (Markdown + assets).

## Structure du projet

```
Perou/
├── content/              # Pages extraites en Markdown
│   ├── index.md          # Accueil
│   ├── association.md    # Qui sommes-nous ?
│   ├── parrainage.md     # Parrainage
│   └── projets.md        # Actions & Projets
├── assets/
│   └── images/           # Images téléchargées depuis le site original
├── scraper/
│   └── scrape.py         # Script de scraping BeautifulSoup
└── README.md
```

## Utilisation du scraper

```bash
# Créer et activer un environnement virtuel
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Linux/macOS

# Installer les dépendances
pip install requests beautifulsoup4

# Lancer le scraping
python scraper/scrape.py
```

Les fichiers Markdown seront générés dans `content/` et les images dans `assets/images/`.

## Licence

Projet associatif bénévole — usage interne uniquement.
