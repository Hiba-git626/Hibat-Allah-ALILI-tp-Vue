<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createJob, getJob, updateJob } from '../api/jobs'
import JobForm from '../components/JobForm.vue'

const props = defineProps({ mode: { type: String, default: 'create' } })
const route = useRoute(); const router = useRouter()
const initialJob = ref(null); const loading = ref(props.mode === 'edit'); const busy = ref(false); const error = ref('')
const editing = computed(() => props.mode === 'edit')
onMounted(async () => {
  if (!editing.value) return
  try { initialJob.value = await getJob(route.params.id) } catch { error.value = 'Impossible de trouver cette offre.' }
  finally { loading.value = false }
})
async function save(job) {
  busy.value = true; error.value = ''
  try {
    const saved = editing.value ? await updateJob(route.params.id, job) : await createJob(job)
    router.push(`/jobs/${saved.id}`)
  } catch { error.value = 'L’enregistrement a échoué. Vérifiez que le serveur JSON est disponible.' }
  finally { busy.value = false }
}
</script>

<template>
  <section class="page-wrap form-page"><RouterLink class="back-link" :to="editing ? `/jobs/${route.params.id}` : '/'">← Annuler</RouterLink><div class="form-heading"><p class="eyebrow dark-eyebrow">{{ editing ? 'MODIFIER UNE OFFRE' : 'RECRUTER SUR JOBBOARD' }}</p><h1>{{ editing ? 'Mettre à jour l’offre' : 'Publier une offre' }}</h1><p>{{ editing ? 'Actualisez les informations du poste.' : 'Présentez votre opportunité aux bons candidats.' }}</p></div><p v-if="loading" class="notice">Chargement du formulaire…</p><p v-else-if="error && !initialJob && editing" class="notice error-notice">{{ error }}</p><JobForm v-else :initial-job="initialJob" :busy="busy" :submit-label="editing ? 'Enregistrer les modifications' : 'Publier l’offre'" @submit="save" @cancel="router.push(editing ? `/jobs/${route.params.id}` : '/')"/><p v-if="error" class="notice error-notice">{{ error }}</p></section>
</template>
