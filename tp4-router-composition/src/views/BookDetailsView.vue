<template>
  <section class="details-page">
    <RouterLink class="back-link" to="/">← Retour au catalogue</RouterLink>
    <article v-if="book" class="details-card">
      <div class="details-art" :class="`spine-${Math.abs(book.id) % 4}`"><span>{{ book.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase() }}</span></div>
      <div class="details-copy"><p class="overline">FICHE DU LIVRE · N°{{ String(book.id).padStart(2, '0') }}</p><h1>{{ book.title }}</h1><p class="details-author">par {{ book.author }}</p><div class="details-tags"><span class="genre-pill">{{ book.genre || 'Sans genre' }}</span><span v-if="book.year" class="genre-pill">{{ book.year }}</span><span v-if="book.isFav" class="favorite-badge">VOTRE FAVORI</span></div><p class="details-description">Un livre de {{ book.genre?.toLowerCase() || 'votre collection' }}, ajouté à votre catalogue de lecture. Consultez la sélection et marquez vos découvertes préférées.</p><button class="submit-button detail-favorite" @click="toggleFavori">{{ book.isFav ? 'Retirer des favoris' : 'Ajouter aux favoris' }} <span>♡</span></button></div>
    </article>
    <div v-else-if="store.loading" class="not-found"><span class="overline">UN INSTANT</span><h1>Chargement du livre…</h1></div>
    <div v-else class="not-found"><span class="overline">404 · FICHE INTROUVABLE</span><h1>Ce livre n’est pas dans le catalogue.</h1><p>Vérifiez l’identifiant ou revenez à la collection.</p></div>
    <button class="back-button" @click="retour">Retour à la page précédente</button>
  </section>
</template>

<script>
import { store } from '../store/books.js'
export default {
  name: 'BookDetailsView',
  data() { return { store } },
  computed: {
    book() { return this.store.books.find(book => book.id === Number(this.$route.params.id)) },
  },
  methods: {
    retour() { this.$router.back() },
    toggleFavori() { if (this.book) this.book.isFav = !this.book.isFav },
  },
}
</script>
