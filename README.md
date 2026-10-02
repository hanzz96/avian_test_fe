# Production Monitoring — Frontend (Vue 3)

Dashboard web untuk **Production Monitoring System PT XYZ Manufacturing** (Technical Test, Soal 6).
Backend API ada di repo [avian_test](https://github.com/hanzz96/avian_test).

**Stack:** Vue 3 (`<script setup>`) · Vite · Tailwind CSS 4 · Chart.js

## Menjalankan

Prasyarat: Node.js 20+ dan backend sudah berjalan (lihat README repo backend).

```bash
cp .env.example .env     # isi VITE_API_URL bila backend tidak di alamat default
npm install
npm run dev              # http://localhost:5173
```

| Perintah | Fungsi |
|---|---|
| `npm run dev` | dev server dengan hot reload |
| `npm run build` | build produksi ke `dist/` |
| `npm run preview` | menjalankan hasil build |

| Env | Default | Keterangan |
|---|---|---|
| `VITE_API_URL` | `http://127.0.0.1:8000/api` | base URL REST API |

## Cara kerja

Halaman ini **satu layar, satu request**: `App.vue` memanggil `GET /api/dashboard` sekali, lalu
membagikan bagian-bagian responsnya ke komponen:

| Field response | Ditampilkan sebagai |
|---|---|
| `summary` | 6 kartu KPI (`KpiCard`) |
| `trend_7_days` | line chart (`TrendChart`) |
| `status_breakdown` | donut chart (`StatusChart`) |
| `top_machines` | bar chart (`TopMachineChart`) + tabel (`TopMachineTable`) |

Loading, error, dan tombol Refresh ditangani di `App.vue`.

## Struktur

```
src/
├── main.js                    entry point
├── App.vue                    halaman dashboard: fetch data + susun layout
├── style.css                  import Tailwind
├── utils.js                   format angka / persen / tanggal (locale id-ID)
├── services/api.js            satu-satunya tempat yang memanggil API
├── composables/useChart.js    wrapper Chart.js (buat, perbarui, dan bersihkan chart)
└── components/
    ├── KpiCard.vue            kartu angka
    ├── ChartCard.vue          bingkai kartu untuk chart
    ├── TrendChart.vue         line chart
    ├── StatusChart.vue        donut chart
    ├── TopMachineChart.vue    bar chart
    └── TopMachineTable.vue    tabel top 10 mesin
```

## Menambah chart baru

1. Buat komponen di `src/components/` yang memanggil `useChart(canvasRef, () => config, () => props.data)`
   (contoh: `StatusChart.vue`).
2. Pasang di `App.vue` di dalam `<ChartCard title="...">`.
