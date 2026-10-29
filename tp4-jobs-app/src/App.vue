<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/" aria-label="JobBoard, accueil"><span class="brand-mark">J</span><span>job<span class="brand-accent">board</span></span></RouterLink>
      <nav aria-label="Navigation principale"><RouterLink to="/">Explorer</RouterLink><RouterLink class="nav-post" to="/jobs/new">＋ Publier une offre</RouterLink></nav>
    </header>
    <main><RouterView /></main>
    <footer>JobBoard <span>·</span> Des opportunités pour vos prochains projets.</footer>
  </div>
</template>
