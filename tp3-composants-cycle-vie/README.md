# TP3 — Composants et cycle de vie

Catalogue de livres réalisé avec des composants monofichiers Vue. Le composant parent conserve la liste et la modifie à la suite des événements émis par les enfants.

## Lancer

```sh
npm install
npm run dev
```

## Éléments du TP couverts

- `BookList` reçoit `books` comme prop requise et affiche une carte par livre.
- `BookCard` valide que le titre de sa prop `book` n’est pas vide ; ses boutons émettent des événements au parent au lieu de modifier la prop.
- Le slot nommé `actions` est rempli par `BookList`.
- `App.vue` conserve les livres et simule leur chargement dans `mounted()` avec un délai de 600 ms. Le message utilise `v-show`.
- `AddBookForm` place le curseur sur le champ titre dans `mounted()` et émet `add-book` lors de la soumission.
