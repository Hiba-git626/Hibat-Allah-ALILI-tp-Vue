<template>
  <main class="page-shell">
    <header class="topline"><a class="brand" href="#">BIBLIOTHÈQUE<span>.</span></a><span class="course-tag">DBJS · TP 03</span></header>

    <section class="intro">
      <div class="intro-copy">
        <p class="overline">COMPOSANTS & CYCLE DE VIE</p>
        <h1>Une bibliothèque<br />à votre image.</h1>
        <p class="subtitle">Ajoutez, explorez et gardez vos livres préférés à portée de main.</p>
      </div>
      <div class="intro-art" aria-hidden="true"><span>01</span><i></i><b>Lire<br />autrement</b></div>
    </section>

    <section class="stats-row" aria-label="Statistiques du catalogue">
      <div><strong>{{ books.length }}</strong><span>livres au catalogue</span></div>
      <div><strong>{{ favoriteCount }}</strong><span>dans vos favoris</span></div>
      <div><strong>{{ genreCount }}</strong><span>genres représentés</span></div>
    </section>

    <p v-show="loading" class="loading-message"><span class="spinner"></span>Chargement du catalogue…</p>

    <section class="workspace">
      <div class="form-panel">
        <div class="section-title"><div><p class="overline">VOTRE PROCHAINE LECTURE</p><h2>Ajouter un livre</h2></div><span class="plus-mark">＋</span></div>
        <AddBookForm @add-book="addBook" />
        <p class="panel-note">Les champs titre et auteur sont nécessaires pour enregistrer une fiche.</p>
      </div>

      <div class="catalog-panel">
        <div class="section-title"><div><p class="overline">VOTRE COLLECTION</p><h2>Le catalogue</h2></div><span class="count-pill">{{ books.length }} titres</span></div>
        <BookList :books="books" @toggle-fav="toggleFavorite" @delete-book="deleteBook">
          <template #empty><p class="empty-message">Votre bibliothèque est prête à accueillir son premier livre.</p></template>
        </BookList>
      </div>
    </section>

    <footer class="page-footer"><span>Projet Vue.js · TP3</span><span>Les données vivent dans le composant parent.</span></footer>
  </main>
</template>

<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'

const initialBooks = [
  { id: 1, title: 'L’Alchimiste', author: 'Paulo Coelho', year: 1988, genre: 'Roman', isFav: true },
  { id: 2, title: 'Une si longue lettre', author: 'Mariama Bâ', year: 1979, genre: 'Littérature', isFav: false },
  { id: 3, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', year: 1943, genre: 'Conte', isFav: true },
  { id: 4, title: 'La boîte à merveilles', author: 'Ahmed Sefrioui', year: 1954, genre: 'Roman', isFav: false },
]

export default {
  name: 'App',
  components: { AddBookForm, BookList },
  data() { return { books: [], loading: true } },
  computed: {
    favoriteCount() { return this.books.filter(book => book.isFav).length },
    genreCount() { return new Set(this.books.map(book => book.genre).filter(Boolean)).size },
  },
  mounted() {
    setTimeout(() => {
      this.books = initialBooks.map(book => ({ ...book }))
      this.loading = false
    }, 600)
  },
  methods: {
    addBook(bookData) {
      const nextId = Math.max(0, ...this.books.map(book => Number(book.id))) + 1
      this.books.unshift({ ...bookData, id: nextId })
    },
    toggleFavorite(id) {
      this.books = this.books.map(book => book.id === id ? { ...book, isFav: !book.isFav } : book)
    },
    deleteBook(id) { this.books = this.books.filter(book => book.id !== id) },
  },
}
</script>
