import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobDetailsView from '../views/JobDetailsView.vue'
import JobFormView from '../views/JobFormView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/jobs/new', name: 'job-create', component: JobFormView, props: { mode: 'create' } },
    { path: '/jobs/:id', name: 'job-details', component: JobDetailsView },
    { path: '/jobs/:id/edit', name: 'job-edit', component: JobFormView, props: { mode: 'edit' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior: () => ({ top: 0 })
})
