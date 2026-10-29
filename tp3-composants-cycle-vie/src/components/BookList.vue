<template>
  <div v-if="books.length" class="book-list">
    <BookCard v-for="book in books" :key="book.id" :book="book" @toggle-fav="$emit('toggle-fav', $event)" @delete-book="$emit('delete-book', $event)">
      <template #actions><span class="slot-note">Fiche {{ String(book.id).padStart(2, '0') }}</span></template>
    </BookCard>
  </div>
  <div v-else class="empty-list"><slot name="empty"><p>Aucun livre pour le moment.</p></slot></div>
</template>

<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookList',
  components: { BookCard },
  props: { books: { type: Array, required: true } },
  emits: ['toggle-fav', 'delete-book'],
}
</script>
