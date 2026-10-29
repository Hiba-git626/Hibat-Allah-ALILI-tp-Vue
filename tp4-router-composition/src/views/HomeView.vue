<template>
  <section class="intro"><div><p class="overline">VOTRE ESPACE DE LECTURE</p><h1>Le catalogue<br />des curieux.</h1><p class="subtitle">Retrouvez vos livres favoris ou ajoutez votre prochaine découverte.</p></div><div class="intro-art" aria-hidden="true"><span>04</span><i></i><b>Lire<br />autrement</b></div></section>
  <p v-show="store.loading" class="loading-message"><span class="spinner"></span>Chargement du catalogue…</p>
  <section class="workspace">
    <div class="form-panel"><div class="section-title"><div><p class="overline">UNE NOUVELLE LECTURE</p><h2>Ajouter un livre</h2></div><span class="plus-mark">＋</span></div><AddBookForm @add-book="addBook" /><p class="panel-note">Les modifications sont partagées entre les pages grâce au store réactif.</p></div>
    <div class="catalog-panel"><div class="section-title"><div><p class="overline">COLLECTION PARTAGÉE</p><h2>Le catalogue</h2></div><span class="count-pill">{{ store.books.length }} titres</span></div><BookList :books="store.books" @toggle-fav="toggleFavori" @delete-book="deleteBook"><template #empty><p class="empty-message">Aucun livre pour le moment.</p></template></BookList></div>
  </section>
</template>

<script>
import AddBookForm from '../components/AddBookForm.vue'
import BookList from '../components/BookList.vue'
import { store } from '../store/books.js'

export default {
  name: 'HomeView',
  components: { AddBookForm, BookList },
  data() { return { store } },
  methods: {
    addBook(bookData) {
      const id = Math.max(0, ...store.books.map(book => Number(book.id))) + 1
      store.books.unshift({ ...bookData, id })
    },
    toggleFavori(id) {
      const book = store.books.find(item => item.id === id)
      if (book) book.isFav = !book.isFav
    },
    deleteBook(id) { store.books = store.books.filter(book => book.id !== id) },
  },
}
</script>
