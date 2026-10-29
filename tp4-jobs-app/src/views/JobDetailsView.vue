<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteJob, getJob } from '../api/jobs'

const route = useRoute(); const router = useRouter()
const job = ref(null); const loading = ref(true); const error = ref('')
const money = value => new Intl.NumberFormat('fr-MA').format(value)
onMounted(async () => {
  try { job.value = await getJob(route.params.id) } catch { error.value = 'Cette offre est introuvable.' }
  finally { loading.value = false }
})
async function remove() {
  if (!window.confirm(`Supprimer l’offre « ${job.value.title} » ? Cette action est définitive.`)) return
  try { await deleteJob(job.value.id); router.push('/') } catch { error.value = 'La suppression a échoué. Réessayez.' }
}
</script>

<template>
  <section class="page-wrap"><RouterLink class="back-link" to="/">← Retour aux offres</RouterLink><p v-if="loading" class="notice">Chargement de l’offre…</p><p v-else-if="error" class="notice error-notice">{{ error }}</p><article v-else-if="job" class="detail-layout"><div class="detail-main"><div class="detail-company"><span class="company-avatar large">{{ job.company.slice(0, 1).toUpperCase() }}</span><div><b>{{ job.company }}</b><small>{{ job.location }}</small></div></div><span class="pill">{{ job.type }}</span><h1>{{ job.title }}</h1><p class="detail-date">Publié le {{ job.createdAt }}</p><hr><h2>À propos du poste</h2><p class="detail-description">{{ job.description }}</p><h2>Profil recherché</h2><p class="detail-description">{{ job.experience ? `${job.experience} année(s) d’expérience requise(s).` : 'Poste ouvert aux débutants.' }}</p></div><aside class="detail-aside"><p class="eyebrow dark-eyebrow">RÉMUNÉRATION</p><strong>{{ money(job.salary) }} <small>MAD / mois</small></strong><p>Lieu : {{ job.location }}</p><div class="detail-buttons"><RouterLink class="button button-primary" :to="`/jobs/${job.id}/edit`">Modifier l’offre</RouterLink><button class="button button-danger" @click="remove">Supprimer</button></div></aside></article></section>
</template>
