# 📸 NeoSnap — Modern Web Photobooth

> A modern, mobile-first web photobooth experience with an iOS-inspired glassmorphism interface.

NeoSnap adalah aplikasi web photobooth modern yang dibangun menggunakan **Next.js** dan **TypeScript**, dengan desain **iOS Glass UI**, efek **glassmorphism**, **neon glow**, dan animasi yang halus. Pengguna dapat langsung menggunakan aplikasi tanpa login, memilih template photobooth, mengambil foto, lalu mengunduh hasil dalam format **PNG** atau **PDF**.

---

## ✨ Features

- 🎨 Modern iOS-inspired Glassmorphism UI
- 📱 Mobile-first & fully responsive
- 🚫 No login required
- 🖼️ Multiple photobooth templates
- 📷 Live camera preview
- ⏱️ Animated countdown before capture
- 📸 Multi-photo strip layout
- 🔄 Retake photo option
- 🖼️ Export high-quality PNG
- 📄 Export printable PDF
- ✨ Smooth animations with Framer Motion
- 🌈 Dynamic gradients & neon glow effects

---

## 🎯 Project Goals

- Create a premium web-based photobooth experience.
- Deliver a simple and fast user flow without requiring an account.
- Provide a modern UI inspired by Apple's design language.
- Make the application optimized for mobile devices and event kiosks.
- Build a clean, maintainable, and scalable codebase.

---

## 🧭 User Flow

```text
Landing Page
     ↓
Choose Photobooth Template
     ↓
Open Camera
     ↓
Countdown Animation
     ↓
Capture Photos
     ↓
Preview Result
     ↓
Download PNG / PDF
```

---

## 🎨 UI & Design System

### Design Style
- iOS-inspired interface
- Glassmorphism
- Soft blur & translucent layers
- Floating cards and bottom sheets
- Smooth spring animations
- Premium mobile experience

### Color Palette

| Color | Usage |
|--------|--------|
| 🔵 Blue | Primary brand color |
| ⚪ White | Glass layers & text |
| ⚫ Black | Background & contrast |
| 🔴 Neon Red | Accent & highlight |
| ✨ Neon Glow | Interactive effects |

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript

### Styling
- Tailwind CSS
- CSS Variables
- Glassmorphism UI

### Animation
- Framer Motion

### Camera
- react-webcam
- WebRTC Browser API

### Export
- html2canvas
- jsPDF

### UI Components
- shadcn/ui

---

## 📂 Project Structure

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── landing/
│   ├── templates/
│   ├── camera/
│   ├── capture/
│   ├── export/
│   └── animations/
├── config/
├── constants/
├── hooks/
├── lib/
├── providers/
├── stores/
├── styles/
├── types/
├── data/
└── public/
```

### Folder Overview

| Folder | Description |
|----------|------------|
| `app/` | Next.js App Router pages |
| `components/` | Reusable UI and feature components |
| `hooks/` | Custom React hooks |
| `stores/` | Global state management |
| `lib/` | Utility and helper functions |
| `styles/` | Global styles and custom CSS |
| `data/` | Template and static configuration data |
| `public/` | Static assets (frames, icons, sounds, etc.) |

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/neosnap.git
cd neosnap
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📦 Planned Roadmap

### Phase 1 — Foundation
- [x] Project setup
- [x] Design system
- [x] Glassmorphism UI
- [x] Mobile-first layout

### Phase 2 — Core Features
- [ ] Landing page
- [ ] Template selection
- [ ] Camera integration
- [ ] Countdown animation
- [ ] Photo capture

### Phase 3 — Export System
- [ ] Preview screen
- [ ] PNG export
- [ ] PDF export

### Phase 4 — Polish
- [ ] UI animations
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] PWA support

---

## 📱 Responsive Design

NeoSnap is designed with a **mobile-first approach** and optimized for:

- 📱 Mobile devices
- 📲 Tablets
- 💻 Desktop browsers
- 🖥️ Event photobooth kiosks

---

## 💡 Future Features

- AI background replacement
- GIF / Boomerang export
- QR Code download
- Online gallery wall
- Event branding support
- Thermal printer integration
- Cloud storage
- PWA offline mode

---

## 🎭 Design Inspiration

- Apple iOS
- visionOS
- Apple Camera App
- Glassmorphism UI
- Cyber Neon Minimalism

---

## 🤝 Contributing

Contributions, ideas, and suggestions are welcome.

If you'd like to improve this project:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

## 📄 License

This project is released under the **MIT License**.

Feel free to use, modify, and build upon it for personal or commercial projects.

---

## ❤️ Acknowledgements

Built with:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- react-webcam
- jsPDF
- html2canvas

---

<p align="center">
  <strong>📸 Capture Moments. Create Memories.</strong><br/>
  <sub>Modern Web Photobooth Experience.</sub>
</p>
