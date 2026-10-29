<template>
  <article class="book-card" :class="{ 'is-favorite': book.isFav }">
    <div class="book-spine" :class="`spine-${Math.abs(book.id) % 4}`"><span>{{ initials }}</span></div>
    <div class="book-info">
      <div class="book-heading"><h3>{{ book.title }}</h3><span v-if="book.isFav" class="favorite-badge">FAVORI</span></div>
      <p class="book-byline">{{ book.author }}<span v-if="book.year"> · {{ book.year }}</span></p>
      <div class="card-bottom"><span class="genre-pill">{{ book.genre || 'Sans genre' }}</span><slot name="actions"></slot></div>
    </div>
    <div class="book-actions">
      <button class="text-action" :aria-pressed="book.isFav" @click="$emit('toggle-fav', book.id)">{{ book.isFav ? 'Retirer le favori' : 'Ajouter aux favoris' }}</button>
      <button class="delete-action" aria-label="Supprimer le livre" @click="$emit('delete-book', book.id)">×</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true,
      validator(value) { return typeof value.title === 'string' && value.title.trim().length > 0 },
    },
  },
  emits: ['toggle-fav', 'delete-book'],
  computed: {
    initials() { return this.book.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase() },
  },
}
</script>
