// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useAuthStore = defineStore('auth', () => {
 // ── STATE ────────────────────────────────────────────────
 // Baca dari localStorage saat store pertama kali dibuat
 // Ini membuat sesi persist saat user refresh halaman
 const token = ref(localStorage.getItem('siperpus_token') || null)
 const user = ref(JSON.parse(localStorage.getItem('siperpus_user') ||
'null'))
 // ── GETTERS (computed) ───────────────────────────────────
 const isLoggedIn = computed(() => !!token.value)
 const isPustakawan = computed(() => user.value?.role === 'pustakawan')
 const isAnggota = computed(() => user.value?.role === 'anggota')
 const namaUser = computed(() => user.value?.nama || 'Tamu')
 const inisialUser = computed(() => {
 if (!user.value?.nama) return '?'
 return user.value.nama
 .split(' ')
 .map(n => n[0])
 .join('')
 .toUpperCase()
 .slice(0, 2)
 })
 // ── ACTIONS ──────────────────────────────────────────────
 async function login(email, password) {
 // Bab 5: ini akan memanggil POST /api/auth/login ke backend Express.js
 // Untuk sekarang, simulasi dengan data hardcode
 const users = [
 { id:1, nama:'Ahmad Pustakawan', email:'admin@siperpus.id',
 password:'admin123', role:'pustakawan' },
 { id:2, nama:'Siti Anggota', email:'siti@gmail.com',
 password:'anggota123', role:'anggota' },
 ]
 const found = users.find(u => u.email === email && u.password ===
password)
 if (!found) {
 throw new Error('Email atau password salah')
 }
 // Simpan token dan data user
 const fakeToken = `token-${found.id}-${Date.now()}`
 const userData = { id: found.id, nama: found.nama,
 email: found.email, role: found.role }
 token.value = fakeToken
 user.value = userData
 // Persist ke localStorage
 localStorage.setItem('siperpus_token', fakeToken)
 localStorage.setItem('siperpus_user', JSON.stringify(userData))
 return userData
 }
 function logout() {
 token.value = null
 user.value = null
 localStorage.removeItem('siperpus_token')
 localStorage.removeItem('siperpus_user')
 }
 return {
 // State
 token, user,
 // Getters
 isLoggedIn, isPustakawan, isAnggota, namaUser, inisialUser,
 // Actions
 login, logout,
 }
})
