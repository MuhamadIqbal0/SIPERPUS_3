<!-- src/components/buku/KartuBuku.vue -->
<!-- Komponen kartu buku yang digunakan di halaman Katalog -->
<template>
 <Card class="flex flex-col h-full hover:shadow-lg transition-shadow
duration-200">
 <CardHeader class="pb-3">
 <!-- Header: judul dan badge status -->
 <div class="flex items-start justify-between gap-2">
 <CardTitle class="text-base leading-snug line-clamp-2">
 {{ buku.judul }}
 </CardTitle>
 <Badge
 :variant="buku.tersedia ? 'default' : 'destructive'"
 class="shrink-0 text-xs"
 >
 {{ buku.tersedia ? 'Tersedia' : 'Dipinjam' }}
 </Badge>
 </div>
 <CardDescription>{{ buku.penulis }}</CardDescription>
 </CardHeader>
 <CardContent class="flex-1 pb-3">
 <!-- Meta info -->
 <div class="flex flex-wrap gap-1.5 mb-3">
 <Badge variant="secondary" class="text-xs">{{ buku.kategori
}}</Badge>
 <Badge variant="outline" class="text-xs">{{ buku.tahun }}</Badge>
 </div>
 <!-- Sinopsis singkat jika ada -->
 <p v-if="buku.sinopsis" class="text-sm text-muted-foreground lineclamp-3">
 {{ buku.sinopsis }}
 </p>
 <!-- Slot default: parent bisa menyisipkan konten tambahan -->
 <slot />
 </CardContent>
 <CardFooter class="pt-3 gap-2">
 <!-- Slot footer: parent bisa override tombol aksi -->
 <slot name="footer">
 <!-- Konten default jika slot tidak disediakan -->
 <Button
 variant="outline"
 size="sm"
 class="flex-1"
 @click="emit('lihat-detail', buku)"
 >
 <BookOpen class="mr-1.5 h-3.5 w-3.5" />
 Detail
 </Button>
 <Button
 size="sm"
 class="flex-1"
 :disabled="!buku.tersedia"
 @click="emit('pinjam', buku.id)"
 >
 <BookMarked class="mr-1.5 h-3.5 w-3.5" />
 {{ buku.tersedia ? 'Pinjam' : 'Dipinjam' }}
 </Button>
 </slot>
 </CardFooter>
 </Card>
</template>
<script setup>
import { Card, CardContent, CardDescription,
 CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, BookMarked } from 'lucide-vue-next'

const props = defineProps({
 buku: {
 type: Object,
 required: true,
 validator: (b) => b.id && b.judul && b.penulis,
 },
})
const emit = defineEmits(['lihat-detail', 'pinjam'])
</script>
