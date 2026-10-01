# 🧩 Puzzles

A browser-based puzzle hub with four playable logic games, built with **React + TypeScript + Vite + Tailwind CSS + shadcn/ui**.

**🎮 Live demo:** https://vrdevil44.github.io/Puzzles/

## The games

| Game | What it is | Difficulty |
|------|-----------|------------|
| **Number Sequence** | Watch a number sequence, then recall it in the correct order. The sequence grows each round. | Easy |
| **Memory Match** | Classic card-flip matching on a 4×4 grid — match the fruit emoji pairs in as few moves as possible. | Medium |
| **Pathfinder** | Navigate a grid from start to end, routing around blocked cells. Levels get harder as you go. | Medium |
| **Patterns** | Spot the missing element in a color/shape pattern across 5 rounds. | Medium |

Each game tracks your score and moves, with toast notifications on completion.

## Run it locally

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev      # dev server at http://localhost:8080
npm run build    # production build → dist/
```

## Tech stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui components
- react-router-dom (with `/Puzzles` basename for GitHub Pages project-page hosting)
- Deployed to GitHub Pages from the `gh-pages` branch (built output only; source lives on `main`)
