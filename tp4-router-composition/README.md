# TP4 — Vue Router et Composition API

Suite du TP3 : catalogue multi-pages avec état réactif partagé entre les vues.

## Lancer

```sh
npm install
npm run dev
```

## Parcours du TP

- `/` affiche l’accueil et le formulaire d’ajout.
- `/livre/:id` affiche la fiche, en convertissant l’identifiant de route avec `Number(...)` avant la comparaison.
- Toute autre URL affiche la page 404.
- Le store `reactive()` partage les livres entre les vues indépendantes.
- La fiche utilise la navigation programmatique avec `this.$router.back()`.
- `BookCardSetup.vue` reprend les props validées et les événements dans `<script setup>`, avec le computed `libelleFavori`.
