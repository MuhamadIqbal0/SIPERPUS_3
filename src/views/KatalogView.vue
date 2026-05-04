<!-- src/views/KatalogView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
    <div class="container mx-auto px-4 py-8 max-w-7xl">

      <!-- HEADER -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-2">
          <Badge variant="outline" class="gap-1.5">
            <BookOpen class="h-3 w-3" />
            Katalog Buku
          </Badge>
        </div>

        <h1 class="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          Jelajahi Koleksi Buku
        </h1>

        <p class="text-muted-foreground">{{ infoHasil }}</p>
      </div>

      <!-- TOOLBAR -->
      <div class="bg-card border border-border rounded-xl p-4 mb-8 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">

          <!-- SEARCH -->
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              v-model.trim="kataCari"
              v-focus
              type="text"
              placeholder="Cari judul atau penulis..."
              class="pl-10"
              @keyup.escape="kataCari = ''"
            />

            <button
              v-if="kataCari"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              @click="kataCari = ''"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- FILTER KATEGORI -->
         <select
  v-model="filterKategori"
  class="w-full lg:w-[220px] border rounded px-3 py-2"
>
  <option value="">Semua Kategori</option>

  <option
    v-for="kat in daftarKategori"
    :key="kat"
    :value="kat"
  >
    {{ kat }}
  </option>
</select>
          <!-- FILTER STATUS -->
          <div class="inline-flex items-center gap-1 bg-muted p-1 rounded-lg">
            <button
              v-for="s in statusOptions"
              :key="s.value"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                filterStatus === s.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
              @click="filterStatus = s.value"
            >
              {{ s.label }}
            </button>
          </div>

          <!-- ADVANCED FILTER -->
          <Button
            variant="outline"
            size="sm"
            class="gap-2 shrink-0"
            @click="panelFilterTerbuka = !panelFilterTerbuka"
          >
            <SlidersHorizontal class="h-4 w-4" />
            {{ panelFilterTerbuka ? 'Sembunyikan' : 'Filter' }} Lanjutan
          </Button>

        </div>

        <!-- ADVANCED PANEL -->
        <div
          v-show="panelFilterTerbuka"
          class="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div class="space-y-2">
            <label class="text-sm font-medium">Tahun dari</label>
            <Input
              v-model.number="filterTahunDari"
              type="number"
              placeholder="2000"
              class="max-w-[200px]"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Tahun sampai</label>
            <Input
              v-model.number="filterTahunSampai"
              type="number"
              :placeholder="tahunSekarang"
              class="max-w-[200px]"
            />
          </div>
        </div>
      </div>

      <!-- LIST -->
      <DataList
        :items="bukuTerfilter"
        :is-loading="isLoading"
        grid-class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template #default="{ item: buku }">
          <KartuBuku
            :buku="buku"
            @lihat-detail="goToDetail"
            @pinjam="handlePinjam"
          />
        </template>

        <template #empty>
          <div class="col-span-full text-center py-16">
            <BookX class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p class="text-lg font-medium mb-1">Tidak ada buku ditemukan</p>
            <p class="text-muted-foreground mb-4">
              Coba ubah kata pencarian atau filter
            </p>

            <Button variant="outline" @click="resetFilter">
              <RotateCcw class="mr-2 h-4 w-4" />
              Reset Filter
            </Button>
          </div>
        </template>
      </DataList>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { vFocus } from '@/directives/vFocus'
import DataList from '@/components/ui/DataList.vue'
import KartuBuku from '@/components/buku/KartuBuku.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  BookX,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
} from 'lucide-vue-next'

const kataCari = ref('')
const filterKategori = ref('')
const filterStatus = ref('semua')
const filterTahunDari = ref(null)
const filterTahunSampai = ref(null)
const panelFilterTerbuka = ref(false)
const isLoading = ref(false)
const tahunSekarang = new Date().getFullYear()

const statusOptions = [
  { label: 'Semua', value: 'semua' },
  { label: 'Tersedia', value: 'tersedia' },
  { label: 'Dipinjam', value: 'dipinjam' },
]

const daftarBuku = ref([
  { id: 1, judul: 'Clean Code', penulis: 'Robert C. Martin', kategori: 'Teknologi', tahun: 2008, tersedia: true },
  { id: 2, judul: 'Vue.js 3 for Beginners', penulis: 'Simone Cuomo', kategori: 'Teknologi', tahun: 2024, tersedia: false },
  { id: 3, judul: 'Learning Vue', penulis: 'Maya Shavin', kategori: 'Teknologi', tahun: 2024, tersedia: true },
  { id: 4, judul: 'Bumi', penulis: 'Tere Liye', kategori: 'Fiksi', tahun: 2014, tersedia: true },
  { id: 5, judul: 'Sapiens', penulis: 'Yuval Noah Harari', kategori: 'Sejarah', tahun: 2011, tersedia: false },
  { id: 6, judul: 'Atomic Habits', penulis: 'James Clear', kategori: 'Bisnis', tahun: 2018, tersedia: true },
])

const daftarKategori = computed(() =>
  [...new Set(daftarBuku.value.map(b => b.kategori))].sort()
)

const bukuTerfilter = computed(() => {
  return daftarBuku.value.filter((buku) => {
    const q = kataCari.value.toLowerCase()

    const cocokCari =
      !q ||
      buku.judul.toLowerCase().includes(q) ||
      buku.penulis.toLowerCase().includes(q)

    const cocokKategori =
      !filterKategori.value || buku.kategori === filterKategori.value

    const cocokStatus =
      filterStatus.value === 'semua' ||
      (filterStatus.value === 'tersedia' && buku.tersedia) ||
      (filterStatus.value === 'dipinjam' && !buku.tersedia)

    const cocokTahun =
      (!filterTahunDari.value || buku.tahun >= filterTahunDari.value) &&
      (!filterTahunSampai.value || buku.tahun <= filterTahunSampai.value)

    return cocokCari && cocokKategori && cocokStatus && cocokTahun
  })
})

const infoHasil = computed(() => {
  const total = daftarBuku.value.length
  const terfilter = bukuTerfilter.value.length

  if (kataCari.value || filterKategori.value || filterStatus.value !== 'semua') {
    return `Menampilkan ${terfilter} dari ${total} buku`
  }

  return `Total ${total} buku dalam koleksi`
})

function resetFilter() {
  kataCari.value = ''
  filterKategori.value = ''
  filterStatus.value = 'semua'
  filterTahunDari.value = null
  filterTahunSampai.value = null
}

function goToDetail(buku) {
  console.log('Detail:', buku.judul)
}

function handlePinjam(id) {
  const buku = daftarBuku.value.find(b => b.id === id)
  if (buku) {
    buku.tersedia = false
    console.log(`Buku '${buku.judul}' dipinjam`)
  }
}
</script>
