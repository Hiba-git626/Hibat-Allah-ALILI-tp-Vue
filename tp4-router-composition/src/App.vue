<template>
  <main class="page-shell">
    <header class="topline">
      <RouterLink class="brand" to="/">BIBLIOTHÈQUE<span>.</span></RouterLink>
      <nav class="app-nav" aria-label="Navigation"><RouterLink to="/">Catalogue</RouterLink><span class="course-tag">DBJS · TP 04</span></nav>
    </header>
    <RouterView />
    <footer class="page-footer"><span>Vue Router · Composition API</span><span>Un catalogue, plusieurs vues.</span></footer>
  </main>
</template>

<script>
export default { name: 'App' }
</script>
