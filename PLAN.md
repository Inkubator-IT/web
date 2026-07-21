# PLAN — 3D Desk Experience untuk `/our-services`

Dokumen ini menjelaskan **apa** yang dibangun dan **kenapa**. Untuk langkah teknis
per-fase, lihat [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md).

---

## 1. Tujuan

Mengganti halaman `/our-services` dari grid kartu statis menjadi **scene 3D
interaktif**: sebuah meja kerja dilihat dari atas, dengan 8 benda di atasnya yang
masing-masing mewakili satu service. Referensi rasa/interaksi:
[Lacoste Polo Factory Experience](https://members-play.lacoste.com/polo-factory-experience/us/en/).

Kriteria sukses:

| Aspek | Target |
|---|---|
| Interaksi | Hover → benda bergerak halus + label pop-up; klik → modal animated |
| Smooth | 60fps di desktop mid-range; ≥30fps di HP mid-range |
| Responsive | Berfungsi penuh dari 360px sampai 2560px |
| Optimized | Bundle 3D **lazy-loaded**, tidak menyentuh halaman lain |
| Reversible | **Kembali ke tampilan lama dengan mengubah 1 baris kode** |

---

## 2. Prinsip yang tidak boleh dilanggar

1. **Tampilan lama tidak dihapus.** Markup `/our-services` yang sekarang
   dipindahkan apa adanya ke `our-services-classic.tsx`. `service-card.tsx`
   tidak disentuh sama sekali.
2. **Satu baris untuk balik.** `page.tsx` jadi switcher tipis. Ganti satu
   konstanta → halaman lama kembali persis seperti sebelumnya.
3. **Konten adalah satu sumber kebenaran.** Judul, deskripsi, features, dan
   category diekstrak ke `data/services.ts`. Versi classic dan versi 3D
   membaca data yang sama — tidak ada teks yang ditulis dua kali.
4. **Zero regression di halaman lain.** `three.js` hanya masuk ke chunk
   `/our-services`, tidak pernah ke shared bundle.

---

## 3. Keputusan arsitektur (sudah dikonfirmasi)

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Sumber model 3D | **Procedural di React Three Fiber** | Tanpa Blender/MCP sama sekali. Tanpa file `.glb` untuk di-download (bundle jauh lebih kecil), gampang di-tweak lewat kode, dan style low-poly stylized cocok dengan brand gradient ungu→oranye |
| Kamera | **Top-down miring + parallax mouse** | Paling dekat ke referensi, komposisi selalu terkontrol, paling aman untuk responsive |
| Mobile | **3D disederhanakan + auto-fallback** | Tetap 3D tapi DPR/shadow diturunkan; fallback ke grid 2D hanya kalau WebGL tidak ada atau `prefers-reduced-motion` |
| Jumlah objek | **8 semua**, ditata seperti meja kerja nyata + kabel penghubung | Struktur konten sekarang tidak berubah |

### Kenapa tidak pakai Blender MCP

Blender MCP butuh dua komponen (extension di dalam Blender pada TCP `localhost:9876`
+ registrasi server ke Claude Code) dan **belum terhubung** di sesi ini. Lebih penting
lagi: modelling lewat MCP itu bolak-balik dan lambat, hasilnya `.glb` beberapa MB yang
harus di-download user. Untuk 8 benda stylized di atas meja, procedural R3F lebih
cepat dibuat, lebih ringan, dan lebih mudah di-iterasi. Blender tetap bisa dipakai
nanti kalau ada satu objek yang butuh detail tinggi — arsitekturnya tidak menghalangi.

---

## 4. Desain scene

### 4.1 Komposisi

Kamera perspektif, diletakkan di atas meja tapi **dimiringkan ~38° dari vertikal**
(bukan 90° datar) supaya sisi benda terlihat dan ada kedalaman. Meja mengisi frame
dengan margin aman di semua breakpoint — pada layar sempit kamera naik (FOV framing
lebih vertikal), bukan objeknya yang dipindah.

Tata letak di atas permukaan meja (sumbu X = kiri-kanan, Z = depan-belakang):

```
        ┌──────────────────────────────────────────────┐
 belakang│   [VR Headset]   [Monitor + PC]  [IoT Board] │
        │                                              │
 tengah  │      [Laptop]              [AI Chip]        │
        │                                              │
 depan   │ [Sketchbook+Pen]  [Smartphone] [Controller] │
        └──────────────────────────────────────────────┘
```

| # | Service | Benda | Posisi |
|---|---|---|---|
| 1 | Design Prototype | Sketchbook terbuka + pen + stylus | depan-kiri |
| 2 | Website Development | Laptop terbuka, layar menampilkan wireframe | tengah-kiri |
| 3 | Mobile Applications | Smartphone tergeletak, layar menyala | depan-tengah |
| 4 | Desktop Applications | Monitor + PC tower kecil | belakang-tengah |
| 5 | AI/ML Solutions | Chip di atas pedestal, ada partikel orbit halus | tengah-kanan |
| 6 | AR/VR Solutions | VR headset | belakang-kiri |
| 7 | IoT Solutions | Board mikrokontroler + sensor + LED kedip | belakang-kanan |
| 8 | Games Development | Game controller | depan-kanan |

**Kabel penghubung** (tube geometry mengikuti kurva Catmull-Rom, melengkung natural
di atas permukaan meja) menghubungkan: PC→Monitor, Laptop→Monitor, IoT Board→Laptop,
VR Headset→PC. Ini yang memberi kesan "tersusun masuk akal dan saling berhubungan".

### 4.2 Material & warna

Mengikuti palet brand yang sudah ada di halaman:

- Ungu `#7E67C1`, oranye `#FFB051`, aksen `#FFCD94`
- Latar/meja: gelap `#0C0C0C`–`#1C1C1C` (menyatu dengan `body` yang sudah ada)
- Permukaan meja: material gelap matte dengan sedikit roughness variation
- Aksen emissive ungu/oranye pada layar, LED, dan hotspot

Pencahayaan memakai `<Environment>` dengan `<Lightformer>` yang **dibuat di dalam
scene** — bukan HDRI dari CDN. Ini penting karena project ini `output: "export"`
(static export) dan tidak boleh bergantung pada request eksternal saat runtime.

### 4.3 Hotspot (penanda bisa di-hover)

Setiap benda punya penanda: **ring tipis + titik** yang melayang di atasnya,
selalu menghadap kamera (billboard), berdenyut pelan dengan gradient brand.
Ini yang memberi tahu user "ini bisa di-hover", tanpa harus menebak.

Saat hover, ring membesar dan berubah jadi solid.

---

## 5. Spesifikasi interaksi

### 5.1 Idle
- Kamera bergeser halus mengikuti mouse (parallax, damped — tidak 1:1 dengan
  kursor, ada easing sehingga terasa berat/premium)
- Benda-benda "bernapas": float amplitudo sangat kecil, fase berbeda-beda
- Hotspot berdenyut

### 5.2 Hover
- Benda naik `+0.06` unit dan miring sedikit ke arah kamera — cepat masuk
  (~180ms), pelan keluar (~320ms), pakai spring
- Rim emissive menyala di warna brand
- **Label pop-up animated**: nama service (mis. "Design Prototype") muncul dengan
  animasi mask/slide dari bawah + fade, menempel di dekat benda dan mengikuti
  posisinya di layar
- Cursor jadi `pointer`
- Benda lain sedikit meredup (desaturasi halus) supaya fokusnya jelas

### 5.3 Klik
1. Kamera melakukan gerakan sinematik zoom/dolly ke arah benda tersebut (~700ms, eased)
2. Scene di-blur dan digelapkan
3. **Modal muncul dengan animasi**: scale-up dari posisi benda di layar + fade,
   spring, konten stagger (judul → deskripsi → features satu per satu)
4. Isi modal = konten yang persis sama dengan kartu sekarang: icon, judul,
   deskripsi, list features dengan `CheckCircle2`, ditambah CTA
   "See related work" → `/portfolio?category={category}` (mempertahankan perilaku
   link kartu yang sekarang)
5. Tutup via Esc / klik backdrop / tombol X → kamera kembali ke posisi idle

### 5.4 Keyboard & aksesibilitas
- 8 tombol DOM transparan diposisikan di atas proyeksi layar tiap benda →
  Tab bisa menyusuri semua service, Enter/Space membuka modal
- Modal: focus trap, `role="dialog"`, `aria-modal`, fokus kembali ke trigger saat ditutup
- `prefers-reduced-motion`: kamera diam, float mati, transisi jadi fade sederhana
- Setiap benda punya `aria-label` berisi judul service

---

## 6. Strategi performa

| Teknik | Detail |
|---|---|
| Lazy load | `dynamic(() => import("./3d/desk-experience"), { ssr: false })`. Wajib `ssr: false` karena project ini static export — three.js tidak boleh jalan saat prerender di Node |
| DPR adaptif | Clamp `[1, 1.75]` desktop, `[1, 1.5]` mobile, plus `<PerformanceMonitor>` yang menurunkan DPR otomatis kalau fps drop |
| Tanpa shadow map real-time | Pakai `<ContactShadows>` blurred — jauh lebih murah dan cukup untuk POV atas |
| Geometry di-memo | Semua geometry & material dibuat sekali via `useMemo`, tidak dibuat ulang tiap frame |
| Overlay DOM minimal | Hanya **satu** elemen label yang dipakai ulang untuk semua hover (posisinya dihitung dari proyeksi world→screen), bukan 8 portal `<Html>` |
| Pause saat tidak terlihat | Canvas berhenti render kalau tab di-background atau section keluar viewport (IntersectionObserver) |
| Tanpa aset eksternal | Nol file `.glb`, nol HDRI dari CDN |

**Target budget:** chunk 3D ≈ 350–450KB gzip, dimuat setelah paint pertama.
Halaman lain tidak berubah ukurannya sama sekali.

---

## 7. Struktur file

```
src/app/our-services/
├── page.tsx                      # ← SWITCHER: 1 baris untuk pindah mode
├── layout.tsx                    # tidak berubah
├── our-services-classic.tsx      # ← tampilan LAMA, dipindah apa adanya
├── data/
│   └── services.ts               # sumber kebenaran konten (8 service)
├── components/
│   └── service-card.tsx          # tidak disentuh
└── 3d/
    ├── desk-experience.tsx       # entry client, wrapper Canvas + overlay
    ├── config.ts                 # posisi objek, warna, tuning kamera
    ├── scene/
    │   ├── desk.tsx              # meja + permukaan + kaki
    │   ├── lighting.tsx          # Environment + Lightformer + key/fill
    │   ├── camera-rig.tsx        # parallax idle + zoom-to-object
    │   ├── cables.tsx            # tube penghubung antar objek
    │   ├── hotspot.tsx           # ring penanda billboard
    │   └── objects/              # 8 komponen benda, satu file masing-masing
    ├── ui/
    │   ├── hover-label.tsx       # label pop-up (satu node, dipakai ulang)
    │   ├── service-modal.tsx     # modal animated (pakai `motion`)
    │   ├── a11y-hotspots.tsx     # tombol transparan untuk keyboard
    │   ├── loader.tsx            # progress saat chunk 3D dimuat
    │   └── fallback-grid.tsx     # render ulang versi classic
    ├── hooks/
    │   ├── use-quality-tier.ts   # deteksi WebGL, mobile, reduced-motion
    │   └── use-pointer-parallax.ts
    └── store.tsx                 # context: hovered / selected (lintas Canvas↔DOM)
```

### Cara balik ke tampilan lama

`src/app/our-services/page.tsx`:

```tsx
const MODE: "3d" | "classic" = "3d";   // ← ganti ke "classic", selesai
```

---

## 8. Dependency baru

| Package | Alasan |
|---|---|
| `three` | Engine 3D |
| `@react-three/fiber` v9 | Renderer React untuk three (v9 = React 19 compatible) |
| `@react-three/drei` | Helper: ContactShadows, Environment, Lightformer, Billboard, PerformanceMonitor |
| `@types/three` (dev) | Typing |
| `puppeteer` (dev) | Screenshot testing lintas viewport |

Sudah tersedia dan akan dipakai ulang: `motion` (modal + label), `lucide-react`
(`CheckCircle2`), Tailwind v4.

**Tidak** menambah state library — pakai React Context saja.

---

## 9. Rencana verifikasi

Testing visual dengan Puppeteer + Chromium, screenshot otomatis di:

- 360×800 (HP kecil), 768×1024 (tablet), 1440×900 (laptop), 2560×1440 (desktop besar)

Yang dicek di tiap iterasi:
1. Meja masuk frame penuh, tidak ada objek terpotong
2. State hover: label muncul di posisi benar, tidak keluar viewport
3. State modal: terbaca, tidak overflow, scrollable kalau konten panjang
4. Fallback: dengan WebGL dimatikan → grid classic muncul
5. `npm run build` sukses (static export tidak boleh pecah)
6. `npm run lint` (biome) bersih
7. Console bebas error/warning

---

## 10. Risiko

| Risiko | Mitigasi |
|---|---|
| Static export + three.js pecah saat prerender | `ssr: false` dari awal, diverifikasi lewat `npm run build` di Fase 1 sebelum lanjut |
| Bundle membengkak | Diukur tiap fase; import selektif dari drei |
| Objek procedural terlihat murahan | Fokus pada bevel/rounded edges, material PBR yang benar, dan pencahayaan — bukan pada jumlah polygon |
| Performa HP | Quality tier + PerformanceMonitor sejak Fase 1, bukan ditambal di akhir |
| Composition rusak di layar ekstrem | Framing kamera responsif berbasis aspect ratio, diverifikasi tiap fase dengan screenshot |
