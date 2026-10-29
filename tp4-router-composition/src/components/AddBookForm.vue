<template>
  <form class="book-form" @submit.prevent="submit">
    <label class="field-label">Titre du livre<input ref="titreInput" v-model.trim="newBook.title" required maxlength="100" placeholder="Ex. Le Petit Prince" /></label>
    <label class="field-label">Auteur<input v-model.trim="newBook.author" required maxlength="80" placeholder="Nom de l’auteur" /></label>
    <div class="field-pair"><label class="field-label">Année<input v-model.number="newBook.year" type="number" min="0" :max="new Date().getFullYear()" placeholder="2024" /></label><label class="field-label">Genre<input v-model.trim="newBook.genre" placeholder="Roman, essai…" /></label></div>
    <label class="check-row"><input v-model="newBook.isFav" type="checkbox" /><span class="custom-check"></span>Ajouter à mes favoris</label>
    <button class="submit-button" type="submit">Ajouter au catalogue <span>↗</span></button>
  </form>
</template>

<script>
const emptyBook = () => ({ title: '', author: '', year: null, genre: '', isFav: false })
export default {
  name: 'AddBookForm',
  emits: ['add-book'],
  data() { return { newBook: emptyBook() } },
  methods: {
    submit() {
      if (!this.newBook.title || !this.newBook.author) return
      this.$emit('add-book', { ...this.newBook })
      this.newBook = emptyBook()
      this.$nextTick(() => this.$refs.titreInput?.focus())
    },
  },
  mounted() { this.$refs.titreInput.focus() },
}
</script>
