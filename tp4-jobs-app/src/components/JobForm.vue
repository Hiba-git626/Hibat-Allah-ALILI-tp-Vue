<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ initialJob: { type: Object, default: null }, busy: Boolean, submitLabel: { type: String, default: 'Publier l’offre' } })
const emit = defineEmits(['submit', 'cancel'])
const blank = () => ({ title: '', company: '', location: '', description: '', salary: '', experience: '', createdAt: new Date().toISOString().slice(0, 10), type: 'CDI' })
const form = reactive(blank())
watch(() => props.initialJob, (job) => Object.assign(form, job ? { ...job } : blank()), { immediate: true })
function submit() {
  emit('submit', { ...form, salary: Number(form.salary), experience: Number(form.experience) })
}
</script>

<template>
  <form class="job-form" @submit.prevent="submit">
    <div class="form-grid">
      <label>Titre du poste<input v-model.trim="form.title" required maxlength="100" placeholder="Ex. Développeur Vue.js"></label>
      <label>Entreprise<input v-model.trim="form.company" required maxlength="100" placeholder="Nom de l’entreprise"></label>
      <label>Lieu<input v-model.trim="form.location" required maxlength="100" placeholder="Ville ou télétravail"></label>
      <label>Type de contrat<select v-model="form.type"><option>CDI</option><option>CDD</option><option>Stage</option><option>Freelance</option></select></label>
      <label>Salaire mensuel (MAD)<input v-model.number="form.salary" type="number" min="0" required placeholder="12000"></label>
      <label>Expérience requise (années)<input v-model.number="form.experience" type="number" min="0" max="50" required placeholder="2"></label>
      <label>Date de publication<input v-model="form.createdAt" type="date" required></label>
      <label class="full-width">Description<textarea v-model.trim="form.description" required minlength="20" rows="6" placeholder="Décrivez les missions, le profil recherché et les avantages…"></textarea></label>
    </div>
    <div class="form-actions"><button type="button" class="button button-quiet" @click="emit('cancel')">Annuler</button><button class="button button-primary" :disabled="busy">{{ busy ? 'Enregistrement…' : submitLabel }} <span aria-hidden="true">→</span></button></div>
  </form>
</template>
