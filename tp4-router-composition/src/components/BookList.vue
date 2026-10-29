<template>
  <div v-if="books.length" class="book-list">
    <BookCardSetup v-for="book in books" :key="book.id" :book="book" @toggle-fav="$emit('toggle-fav', $event)" @delete-book="$emit('delete-book', $event)">
      <template #actions><RouterLink class="detail-link" :to="{ name: 'book-details', params: { id: book.id } }">Voir les détails <span>↗</span></RouterLink></template>
    </BookCardSetup>
  </div>
  <div v-else class="empty-list"><slot name="empty"><p>Aucun livre dans le catalogue.</p></slot></div>
</template>

<script>
import BookCardSetup from './BookCardSetup.vue'
export default {
  name: 'BookList',
  components: { BookCardSetup },
  props: { books: { type: Array, required: true } },
  emits: ['toggle-fav', 'delete-book'],
}
</script>
