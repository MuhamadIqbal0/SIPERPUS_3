// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
 {
 path: '/',
 name: 'home',
 // Lazy loading — komponen dimuat saat halaman pertama dikunjungi
 component: () => import('../views/HomeView.vue'),
 meta: { title: 'Beranda' }
 },
 {
 path: '/katalog',
 name: 'katalog',
 component: () => import('../views/KatalogView.vue'),
 meta: { title: 'Katalog Buku' }
 },
 {
 path: '/formbuku',
 name: 'FormBuku',
 component: () => import('../views/FormBukuView.vue'),
 meta: { title: 'Form Buku' }
 },

 // Route-route lain ditambahkan di Bab 4 (Routing & State Management)
 ],
scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),

})
// Update title halaman otomatis
router.afterEach((to) => {
 document.title = to.meta.title
 ? `${to.meta.title} — SiPerpus`
 : 'SiPerpus'
})
export default router
