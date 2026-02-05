# 🎰 Bill Roulette

A fun Russian roulette-style game to decide who pays the bill! Pass the phone around and tap the pizzas and whoever triggers the losing tile pays!

## 🌐 Live Demo

**[Play Now → bill-roulette-rose.vercel.app](https://bill-roulette-rose.vercel.app/)**

## 🎮 How to Play

1. Choose grid size (3×3 or 4×4)
2. Pass the phone around the table
3. Each person taps a pizza 🍕
4. Safe taps disappear, but one tap will trigger the "YOU PAY!" moment
5. The unlucky person pays the bill!

## ✨ Features

- **Russian Roulette Logic** — probability increases as tiles are clicked
- **Sound Effects** — celebratory "yay" sound when someone loses
- **Responsive Design** — works on mobile, tablet, and desktop
- **Smooth Animations** — fade out for safe tiles, celebration modal for the loser
- **Grid Options** — choose between 3×3 (9 players) or 4×4 (16 players)

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Web Audio API (for synthesized sounds)
- CSS Animations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── App.tsx        # Main game component
├── App.css        # Styles and animations
├── constants.ts   # Messages and emoji constants
├── utils.ts       # Sound effects and utilities
├── main.tsx       # Entry point
└── index.css      # Base styles
```
