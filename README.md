📁 components/

Folder utama untuk semua komponen Vue (reusable UI & logic).

📂 components/buku/

Berisi komponen khusus fitur buku (domain-specific).

📄 KartuBuku.vue

Komponen untuk menampilkan data buku dalam bentuk kartu (card).
Biasanya dipakai untuk:

daftar buku
tampilan katalog
preview informasi buku
📂 components/icons/

Berisi kumpulan ikon (SVG atau komponen icon).
Digunakan untuk mempercantik UI seperti tombol, menu, dll.

📂 components/layout/

Komponen untuk struktur layout aplikasi.

📄 AppHeader.vue

Bagian header aplikasi:

navbar
judul aplikasi
menu navigasi
📂 components/ui/

Ini bagian penting 💡
Berisi komponen UI reusable dari shadcn-vue.

Contohnya:

alert/ → notifikasi / pesan
avatar/ → foto profil user
badge/ → label kecil (status, kategori)
button/ → tombol
card/ → container konten
dialog/ → popup / modal
dropdown-menu/ → menu dropdown
input/ → input form
select/ → dropdown select
separator/ → garis pemisah
skeleton/ → loading placeholder
table/ → tabel data

👉 Semua ini biasanya hasil dari install shadcn-vue, jadi sifatnya reusable dan konsisten.

📄 Komponen lain di root components/
DataList.vue

Komponen untuk menampilkan daftar data (kemungkinan buku).
Biasanya dipakai bersama:

table
card list
ThemeSwitcher.vue

Untuk mengganti tema:

light mode 🌞
dark mode 🌙
