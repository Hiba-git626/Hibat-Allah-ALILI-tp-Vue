# TP4 — Application de gestion d’offres d’emploi

Application Vue 3 monopage de publication et de gestion des offres, avec navigation Vue Router et persistance via une API JSON Server.

## Démarrage

Prérequis : Node.js et npm.

```bash
npm install
```

Lancer l’API JSON Server dans un premier terminal :

```bash
npm run api
```

Dans un second terminal, depuis ce dossier :

```bash
npm run dev
```

Vite affiche l’adresse locale à ouvrir. Les offres sont enregistrées dans `db.json` par JSON Server sur `http://localhost:3000/jobs`.

## Fonctionnalités

- Liste des offres avec recherche et filtres par type de contrat.
- Page de détails par identifiant.
- Ajout, modification et suppression avec confirmation.
- Formulaire validé par le navigateur : titre, entreprise, lieu, type, salaire, expérience, date et description.
- États de chargement, erreurs API et page 404.

## Organisation

- `src/api/jobs.js` : appels HTTP GET, POST, PUT et DELETE.
- `src/components/` : carte d’offre et formulaire réutilisable.
- `src/views/` : accueil, détails, formulaire, 404.
- `src/router/` : routes de l’application.
- `db.json` : données initiales de démonstration.
