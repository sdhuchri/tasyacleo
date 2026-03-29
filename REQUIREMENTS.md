# Website untuk Tasya Cleo Bella
## Project Requirements & Documentation

---

## Tujuan
Membuat website personal yang **memukau, lucu, dan berkesan** sebagai hadiah digital untuk Tasya Cleo Bella — dirancang dengan estetika feminine yang "WAH", diperkaya oleh fitur AI yang interaktif.

---

## Tech Stack

| Layer     | Teknologi              | Keterangan                          |
|-----------|------------------------|-------------------------------------|
| Frontend  | Next.js 15 (App Router)| UI, routing, SSR/SSG                |
| Backend   | Golang + Gin           | REST API, logika bisnis, AI proxy   |
| AI        | Claude API (Anthropic) | AI Agent untuk fitur interaktif     |
| Database  | Supabase (PostgreSQL)  | Penyimpanan pesan, data interaksi   |
| Styling   | Tailwind CSS + Framer Motion | Animasi & desain WOW           |
| Deploy    | Vercel (Frontend) + Railway/Render (Backend Go) | Hosting |

---

## Fitur Utama

### 1. Landing Page — "Welcome, Tasya"
- Hero section dengan animasi partikel bunga sakura / bintang jatuh
- Nama Tasya tampil dengan efek typewriter + glitter
- Background gradient pastel (pink-purple-lavender) animasi
- Musik latar otomatis (soft lo-fi / kawaii music) dengan toggle

### 2. Gallery of Moments
- Grid foto interaktif dengan efek hover 3D tilt
- Setiap foto bisa diklik, muncul caption + tanggal kenangan
- Efek polaroid / film camera aesthetic
- Upload foto bisa dilakukan via admin panel sederhana

### 3. AI Love Letter Generator (FITUR AI #1)
- User (atau Tasya sendiri) input mood hari ini
- AI (Claude) generate surat/puisi personal yang indah
- Tersimpan di database, bisa di-share atau di-download sebagai kartu
- Tone: romantis, lucu, hangat

### 4. AI Chatbot "Teman Tasya" (FITUR AI #2)
- Chatbot dengan persona unik yang diberi nama & karakter
- Tahu tentang hal-hal favorit Tasya (bisa dikonfigurasi)
- Bisa diajak ngobrol, bercerita, atau minta rekomendasi
- UI chat bubble yang cute dengan avatar animasi

### 5. Zodiac & Personality Board (FITUR AI #3)
- Input tanggal lahir Tasya → AI generate "personality card" unik
- Lengkap dengan ilustrasi, kata-kata motivasi harian
- Bisa di-refresh setiap hari untuk konten baru

### 6. Countdown & Special Dates
- Countdown ke hari ulang tahun / anniversary / momen spesial
- Animasi confetti otomatis saat hari H tiba
- Mini kalender kenangan

### 7. Guestbook / Wall of Love
- Pengunjung bisa meninggalkan pesan
- AI moderasi konten (filter pesan tidak pantas)
- Tampil dalam bentuk sticky notes warna-warni animasi
- Backend Go menyimpan ke database

### 8. Secret Unlock Feature
- Ada halaman tersembunyi yang bisa dibuka dengan password khusus
- Berisi pesan rahasia / video / konten spesial
- Efek reveal yang dramatis

---

## Desain System

### Warna (Palette)
```
Primary:   #FF6B9D (Pink Bubblegum)
Secondary: #C44DFF (Lavender Purple)
Accent:    #FFD93D (Kuning Pastel)
Light:     #FFF0F7 (Pink Muda)
Dark:      #2D1B4E (Deep Purple)
```

### Tipografi
- Display: `Playfair Display` (serif elegan)
- Body: `Plus Jakarta Sans` (modern, bersih)
- Accent: `Dancing Script` (kursif manis)

### Elemen Dekoratif
- Animasi partikel: sakura, bintang, hati, glitter
- Cursor custom: sparkle trail
- Scroll indicator: pita/ribbon lucu
- Loading screen: animasi bouquet bunga
- Glassmorphism card style

---

## Struktur Folder

```
d:/tasyacleo/
├── frontend/                  # Next.js App
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── gallery/           # Gallery
│   │   ├── letter/            # AI Letter Generator
│   │   ├── chat/              # AI Chatbot
│   │   ├── zodiac/            # Zodiac Board
│   │   ├── guestbook/         # Wall of Love
│   │   └── secret/            # Hidden page
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/                   # Golang Gin API
│   ├── main.go
│   ├── handlers/
│   │   ├── letter.go          # AI letter endpoint
│   │   ├── chat.go            # Chatbot endpoint
│   │   ├── guestbook.go       # Guestbook CRUD
│   │   └── gallery.go         # Gallery management
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── REQUIREMENTS.md
```

---

## API Endpoints (Backend Go)

| Method | Endpoint                  | Deskripsi                        |
|--------|---------------------------|----------------------------------|
| POST   | /api/letter/generate      | Generate AI love letter          |
| POST   | /api/chat/message         | Kirim pesan ke AI chatbot        |
| GET    | /api/guestbook            | Ambil semua pesan guestbook      |
| POST   | /api/guestbook            | Tambah pesan baru                |
| GET    | /api/gallery              | Ambil daftar foto                |
| POST   | /api/gallery              | Upload foto baru (admin)         |
| GET    | /api/zodiac/:date         | Generate zodiac personality card |
| POST   | /api/secret/verify        | Verifikasi password halaman rahasia |

---

## AI Agent Architecture

```
Frontend (Next.js)
      ↓ fetch
Backend (Go Gin)           ← Proxy & Rate Limiting
      ↓ Anthropic SDK
Claude API
  - System prompt berisi konteks tentang Tasya
  - Tool use untuk akses database (favorit, kenangan)
  - Memory: percakapan tersimpan per sesi
```

### Ide AI yang Bisa Dikembangkan
1. **Mood-to-Poem**: Input emoji/kata mood → AI buat puisi yang pas
2. **Memory Keeper**: AI bisa "ingat" semua kenangan yang diinput, lalu ceritakan ulang secara kreatif
3. **Daily Affirmation**: Setiap hari AI generate kalimat semangat personal untuk Tasya
4. **Dream Interpreter**: Tasya cerita mimpi → AI interpretasikan dengan cara yang manis & lucu

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Backend (.env)
```
PORT=8080
ANTHROPIC_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
JWT_SECRET=...
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Deployment Plan

### Frontend → Vercel
- Connect GitHub repo ke Vercel
- Set environment variables di Vercel dashboard
- Auto-deploy on push to `main`

### Backend → Railway atau Render
- Dockerless: deploy langsung dari Go binary
- Set environment variables
- CORS dikonfigurasi untuk domain Vercel

---

## Development Phases

### Phase 1 — Foundation (Setup)
- [ ] Init Next.js project dengan Tailwind + Framer Motion
- [ ] Init Go Gin project
- [ ] Setup Supabase tables
- [ ] Konfigurasi CORS & API connection

### Phase 2 — Core Pages
- [ ] Landing page dengan animasi
- [ ] Gallery page
- [ ] Countdown component

### Phase 3 — AI Features
- [ ] AI Letter Generator
- [ ] AI Chatbot
- [ ] Zodiac/Personality board

### Phase 4 — Polish
- [ ] Guestbook
- [ ] Secret page
- [ ] Custom cursor & particles
- [ ] Mobile responsive
- [ ] Loading animations

### Phase 5 — Deploy
- [ ] Deploy backend ke Railway
- [ ] Deploy frontend ke Vercel
- [ ] Domain custom (opsional)

---

## Estimasi Effort

| Phase | Kompleksitas |
|-------|-------------|
| Setup | Rendah |
| Core Pages | Sedang |
| AI Features | Tinggi |
| Polish | Sedang |
| Deploy | Rendah |

---

*Dibuat dengan penuh semangat untuk Tasya Cleo Bella*
