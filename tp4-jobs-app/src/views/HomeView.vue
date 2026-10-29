<script setup>
import { computed, onMounted, ref } from 'vue'
import { getJobs } from '../api/jobs'
import JobCard from '../components/JobCard.vue'

const jobs = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const contract = ref('Tous')
const types = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance']
const filteredJobs = computed(() => jobs.value.filter(job => {
  const query = search.value.toLocaleLowerCase('fr')
  const matchesText = [job.title, job.company, job.location, job.description].some(value => String(value).toLocaleLowerCase('fr').includes(query))
  return matchesText && (contract.value === 'Tous' || job.type === contract.value)
}))
async function load() {
  loading.value = true; error.value = ''
  try { jobs.value = await getJobs() } catch { error.value = 'Impossible de charger les offres. Vérifiez que le serveur JSON est démarré.' }
  finally { loading.value = false }
}
onMounted(load)
</script>

<template>
  <section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="pulse"></span> LE BON POSTE EST À PORTÉE DE CLIC</p><h1>Votre prochain<br><span>chapitre commence ici.</span></h1><p class="hero-text">Des offres sélectionnées pour faire avancer votre carrière. Trouvez l’opportunité qui vous ressemble.</p><RouterLink class="button button-light" to="/jobs/new">＋ Publier une offre</RouterLink></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-card hero-card-main"><span class="hero-card-icon">✳</span><div><b>Le bon match</b><small>vous attend</small></div><span class="match-dot">✓</span></div><div class="hero-card hero-card-small">✦  Nouveaux départs</div><span class="hero-spark spark-one">✳</span><span class="hero-spark spark-two">✦</span></div></section>
  <section class="listing-section"><div class="section-heading"><div><p class="eyebrow dark-eyebrow">FAITES LE PROCHAIN PAS</p><h2>Offres à la une <span class="count-badge">{{ jobs.length }}</span></h2></div><p>Le poste qu’il vous faut est peut-être déjà là.</p></div>
    <div class="filters"><label class="search-box"><span aria-hidden="true">⌕</span><input v-model="search" placeholder="Poste, entreprise, ville…" aria-label="Rechercher une offre"></label><div class="filter-pills"><button v-for="type in types" :key="type" :class="['filter-pill', { selected: contract === type }]" @click="contract = type">{{ type }}</button></div></div>
    <p v-if="error" class="notice error-notice">{{ error }} <button class="text-link" @click="load">Réessayer</button></p><div v-else-if="loading" class="notice">Chargement des offres…</div><div v-else-if="filteredJobs.length" class="job-grid"><JobCard v-for="job in filteredJobs" :key="job.id" :job="job" /></div><div v-else class="empty-state"><span>⌕</span><h3>Aucune offre ne correspond</h3><p>Essayez une autre recherche ou modifiez les filtres.</p></div>
  </section>
</template>
