<script setup>
defineProps({ job: { type: Object, required: true } })
const money = (value) => new Intl.NumberFormat('fr-MA').format(value)
</script>

<template>
  <article class="job-card">
    <div class="company-avatar" aria-hidden="true">{{ job.company?.slice(0, 1).toUpperCase() || 'E' }}</div>
    <div class="job-content">
      <div class="job-meta"><span class="pill">{{ job.type }}</span><span>{{ job.createdAt }}</span></div>
      <h2><RouterLink :to="`/jobs/${job.id}`">{{ job.title }}</RouterLink></h2>
      <p class="company-line">{{ job.company }} <span>·</span> {{ job.location }}</p>
      <p class="job-excerpt">{{ job.description }}</p>
      <div class="card-bottom"><span class="salary">{{ money(job.salary) }} MAD <small>/ mois</small></span><RouterLink class="text-link" :to="`/jobs/${job.id}`">Voir l’offre <span aria-hidden="true">↗</span></RouterLink></div>
    </div>
  </article>
</template>
