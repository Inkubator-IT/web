# IMPLEMENTATION PLAN — 3D Desk Experience `/our-services`

Langkah teknis per-fase. Konteks & alasan ada di [`PLAN.md`](./PLAN.md).

**Aturan kerja:** setiap fase harus berakhir dengan `npm run build` sukses dan
halaman bisa dibuka. Tidak lanjut ke fase berikutnya sebelum fase sekarang hijau.

---

## Fase 0 — Persiapan & jaring pengaman

Tujuan: bisa balik ke kondisi sekarang kapan saja, dan punya alat untuk melihat hasil.

- [ ] `git checkout -b feat/our-services-3d` dari `fix/enhance-ui`
- [ ] Screenshot baseline halaman `/our-services` yang sekarang di 4 viewport →
      simpan sebagai pembanding
- [ ] Install dependency:
      `npm i three @react-three/fiber @react-three/drei`
      `npm i -D @types/three puppeteer`
- [ ] Verifikasi `@react-three/fiber` yang terpasang adalah **v9.x** (React 19).
      Kalau resolver memberi v8, pin eksplisit — v8 tidak jalan di React 19
- [ ] Tulis `scripts/shoot.mjs` (Puppeteer): buka URL, tunggu canvas siap,
      screenshot di 360/768/1440/2560, simpan ke scratchpad
- [ ] `npm run build` → pastikan masih hijau setelah dependency masuk

**Selesai kalau:** build hijau, `node scripts/shoot.mjs` menghasilkan 4 PNG baseline.

---

## Fase 1 — Refactor & switcher (belum ada 3D sama sekali)

Tujuan: struktur reversible sudah berdiri, tampilan **belum berubah sedikit pun**.

- [ ] Buat `data/services.ts`: array 8 service dengan
      `{ id, title, description, features[], category, iconSrc, imageSrc }`.
      String diambil **verbatim** dari `page.tsx` sekarang
- [ ] Buat `our-services-classic.tsx` — pindahkan seluruh isi `page.tsx` sekarang,
      lalu ubah agar membaca dari `data/services.ts`.
      `components/service-card.tsx` **tidak disentuh**
- [ ] Ganti `page.tsx` jadi switcher:
      ```tsx
      const MODE: "3d" | "classic" = "classic";  // Fase 1 masih "classic"
      ```
- [ ] Bandingkan screenshot dengan baseline Fase 0 — **harus identik pixel-perfect**
- [ ] `npm run lint` + `npm run build`

**Selesai kalau:** halaman tidak berubah sama sekali, tapi struktur file sudah siap.
**Ini titik aman.** Commit di sini.

---

## Fase 2 — Canvas hidup: meja kosong

Tujuan: ada scene 3D yang benar-benar ter-render, dengan pipeline performa dari awal.

- [ ] `hooks/use-quality-tier.ts` — deteksi dukungan WebGL, mobile/desktop,
      `prefers-reduced-motion`. Return `"high" | "low" | "none"`
- [ ] `ui/fallback-grid.tsx` — render `our-services-classic.tsx` (dipakai saat tier `"none"`)
- [ ] `3d/desk-experience.tsx` — client component: heading + `<Canvas>` + section CTA
      bawah (dipertahankan dari halaman lama)
- [ ] `scene/desk.tsx` — permukaan meja dengan rounded edges + kaki, material gelap matte
- [ ] `scene/lighting.tsx` — `<Environment>` berisi `<Lightformer>` (**tanpa HDRI dari CDN**),
      key light hangat + fill ungu, plus `<ContactShadows>`
- [ ] `scene/camera-rig.tsx` — kamera top-down miring ~38°, framing responsif
      berdasarkan aspect ratio
- [ ] Set DPR clamp + `<PerformanceMonitor>` **sekarang**, bukan nanti
- [ ] `page.tsx`: `MODE = "3d"`, muat lewat
      `dynamic(..., { ssr: false, loading: () => <Loader /> })`
- [ ] **`npm run build` — verifikasi static export tidak pecah.** Ini gate kritis;
      kalau gagal di sini, perbaiki sebelum menulis satu objek pun
- [ ] Screenshot 4 viewport → meja harus masuk frame penuh di semua ukuran

**Selesai kalau:** meja kosong ter-render rapi di 4 viewport, build hijau, console bersih.

---

## Fase 3 — Delapan objek

Tujuan: semua benda ada di meja dengan komposisi yang enak dilihat.

- [ ] `3d/config.ts` — posisi, rotasi, skala, dan warna aksen tiap objek di satu tempat
      (supaya tuning tidak perlu buka 8 file)
- [ ] Bangun objek satu per satu, screenshot setelah masing-masing:
  - [ ] `laptop.tsx` — paling dulu, jadi acuan skala semua objek lain
  - [ ] `monitor.tsx` — monitor + PC tower
  - [ ] `smartphone.tsx`
  - [ ] `sketchbook.tsx` — sketchbook terbuka + pen
  - [ ] `game-controller.tsx`
  - [ ] `vr-headset.tsx`
  - [ ] `iot-board.tsx` — board + sensor + LED emissive
  - [ ] `ai-chip.tsx` — chip di pedestal + partikel orbit
- [ ] `scene/cables.tsx` — tube Catmull-Rom: PC→Monitor, Laptop→Monitor,
      IoT→Laptop, VR→PC
- [ ] Semua geometry & material dibungkus `useMemo`
- [ ] Tuning komposisi lewat screenshot sampai tidak ada yang bertumpuk/terpotong
      di 360px maupun 2560px
- [ ] Cek ulang ukuran chunk

**Selesai kalau:** meja terlihat seperti meja kerja sungguhan, rapi di semua viewport, ≥60fps desktop.

---

## Fase 4 — Hover: hotspot, gerakan, label

Tujuan: bagian "hidup"-nya. Ini yang paling menentukan apakah terasa premium atau tidak.

- [ ] `3d/store.tsx` — Context `{ hoveredId, selectedId, setHovered, setSelected }`,
      membungkus Canvas **dan** overlay DOM
- [ ] `scene/hotspot.tsx` — ring + titik billboard, berdenyut pelan dengan warna brand
- [ ] Wrapper hover per objek: `onPointerOver`/`onPointerOut`, angkat `+0.06` +
      tilt ke kamera, spring cepat-masuk (~180ms) pelan-keluar (~320ms)
- [ ] Cursor `pointer` saat hover
- [ ] Objek lain meredup halus saat ada yang di-hover
- [ ] `ui/hover-label.tsx` — **satu** node DOM dipakai ulang; posisi dari proyeksi
      world→screen; animasi mask/slide-up + fade; auto-flip kalau mepet tepi viewport
- [ ] Idle float: amplitudo kecil, fase berbeda tiap objek
- [ ] `use-pointer-parallax.ts` — parallax kamera yang damped (jangan 1:1 dengan kursor)
- [ ] Hormati `prefers-reduced-motion`: matikan float & parallax
- [ ] Screenshot state hover di 4 viewport — label tidak boleh keluar layar

**Selesai kalau:** hover terasa natural dan responsif, label muncul mulus di posisi benar.

---

## Fase 5 — Klik: kamera sinematik + modal

- [ ] `camera-rig.tsx`: mode `focus` — lerp posisi + target ke framing objek terpilih
      (~700ms, eased), lalu balik ke idle saat modal ditutup
- [ ] `ui/service-modal.tsx` pakai `motion`:
  - [ ] Backdrop: fade + blur scene di belakangnya
  - [ ] Panel: scale-up dari posisi benda di layar, spring
  - [ ] Konten stagger: icon+judul → deskripsi → features satu per satu
  - [ ] Border gradient ungu→oranye, konsisten dengan `service-card.tsx`
  - [ ] Features pakai `CheckCircle2` warna `#FFCD94` (sama seperti kartu sekarang)
  - [ ] CTA "See related work" → `/portfolio?category={category}`
  - [ ] Tutup: Esc / backdrop / tombol X
  - [ ] Focus trap, `role="dialog"`, `aria-modal`, fokus balik ke trigger
  - [ ] Konten panjang → panel scrollable, tidak overflow di layar pendek
- [ ] Kunci scroll body saat modal terbuka
- [ ] Screenshot state modal di 4 viewport

**Selesai kalau:** klik → kamera + modal terasa satu gerakan yang menyatu, bukan dua animasi terpisah.

---

## Fase 6 — Aksesibilitas, mobile, polish

- [ ] `ui/a11y-hotspots.tsx` — 8 tombol transparan di atas proyeksi layar tiap objek;
      Tab menyusuri semua, Enter/Space membuka modal, ada focus ring yang terlihat
- [ ] Tier `"low"` (mobile): DPR lebih rendah, kamera lebih dekat/framing vertikal,
      partikel AI chip dikurangi, float diperkecil
- [ ] Touch: tap pertama = hover (label muncul), tap kedua = buka modal —
      supaya user HP tetap dapat feedback label
- [ ] Pause render saat tab di-background / section keluar viewport (IntersectionObserver)
- [ ] Dispose geometry, material, dan texture saat unmount — cek tidak ada memory leak
- [ ] Loader: progress bar bergaya brand saat chunk 3D dimuat
- [ ] Tes manual di HP asli kalau memungkinkan

---

## Fase 7 — Verifikasi akhir

- [ ] `npm run lint` bersih
- [ ] `npm run build` sukses, static export utuh
- [ ] Ukur ukuran chunk `/our-services` — target ≤450KB gzip untuk bagian 3D
- [ ] Console bebas error & warning di semua state (idle/hover/modal)
- [ ] Screenshot final 4 viewport × 3 state (idle, hover, modal) = 12 gambar
- [ ] Tes fallback: WebGL dimatikan → grid classic muncul
- [ ] Tes `MODE = "classic"` → halaman lama kembali **identik dengan baseline Fase 0**
- [ ] Verifikasi halaman lain (`/`, `/portfolio`, `/blog`, `/contact`) tidak berubah
      dan tidak kebagian bundle three.js
- [ ] Update `README.md`: cara switch mode

---

## Gate yang tidak boleh dilewati

| Fase | Gate |
|---|---|
| 1 | Screenshot **identik** dengan baseline — kalau meleset, refactor-nya salah |
| 2 | `npm run build` hijau dengan three.js di dalamnya — risiko terbesar project ini |
| 3 | Tidak ada objek terpotong di 360px |
| 5 | Modal tidak overflow di layar pendek (mis. 360×640) |
| 7 | `MODE = "classic"` mengembalikan halaman lama dengan sempurna |

---

## Titik commit

Commit di akhir Fase 1, 2, 3, 4, 5, dan 7 — masing-masing adalah kondisi yang
bisa di-`revert` sendiri tanpa merusak yang lain.
