<!-- src/components/layout/AppHeader.vue -->
<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">

      <!-- Logo dan nama aplikasi -->
      <RouterLink to="/" class="flex items-center gap-2.5">
        <BookOpenCheck class="h-6 w-6 text-primary" />
        <span class="font-bold text-lg text-foreground">SiPerpus</span>
      </RouterLink>

      <!-- Navigasi desktop -->
      <nav class="hidden md:flex items-center gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          custom
          v-slot="{ navigate, isActive }"
        >
          <Button
            :variant="isActive ? 'secondary' : 'ghost'"
            size="sm"
            @click="navigate"
          >
            <component :is="item.icon" class="mr-1.5 h-4 w-4" />
            {{ item.label }}
          </Button>
        </RouterLink>
      </nav>

      <!-- Aksi kanan -->
      <div class="flex items-center gap-2">

        <!-- Search -->
        <div class="relative hidden sm:block">
          <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="kataCariHeader"
            placeholder="Cari buku..."
            class="w-48 pl-8 h-8 text-sm"
            @keyup.enter="cariDariHeader"
          />
        </div>

        <!-- User menu -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar class="h-8 w-8">
                <AvatarFallback class="bg-primary text-primary-foreground text-sm">
                  {{ inisialUser }}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>{{ namaUser }}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User class="mr-2 h-4 w-4" />
              Profil Saya
            </DropdownMenuItem>

            <DropdownMenuItem v-if="isPustakawan">
              <LayoutDashboard class="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem class="text-destructive">
              <LogOut class="mr-2 h-4 w-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  BookOpenCheck,
  Search,
  User,
  LayoutDashboard,
  LogOut,
  BookOpen,
  Home
} from 'lucide-vue-next'

const router = useRouter()

const kataCariHeader = ref('')

// Dummy user (nanti pakai Pinia)
const namaUser = ref('Ahmad Fauzi')
const isPustakawan = ref(false)

// ✅ Perbaikan inisial (ambil huruf depan tiap kata)
const inisialUser = computed(() => {
  return namaUser.value
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const navItems = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/katalog', label: 'Katalog', icon: BookOpen },
  { to: '/FormBuku', label: 'Pengisian Buku',icon: BookOpen }
]

function cariDariHeader() {
  if (!kataCariHeader.value.trim()) return

  router.push({
    name: 'katalog',
    query: { q: kataCariHeader.value }
  })

  kataCariHeader.value = ''
}
</script>
