# English Quiz - Vocabulary & Grammar Assessment

A free, lightweight English quiz application for assessing vocabulary and grammar levels.

## Features

- **Vocabulary Quiz**: 15 questions testing word meanings and synonyms
- **Grammar Quiz**: 15 questions testing grammar rules and structures
- **Mixed Quiz**: Random selection from both vocabulary and grammar
- **CEFR Level Assessment**: Maps scores to A1-C1 levels
- **Answer Review**: Review answers with explanations after completion
- **Mobile Responsive**: Works on all device sizes

## Tech Stack

- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Vanilla CSS
- **Architecture**: Modular, adapter-based design

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd english-quiz

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Option 1: GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save - your site will be live at `https://username.github.io/english-quiz/`

### Option 2: Cloudflare Pages

1. Push code to GitHub/GitLab
2. Log in to Cloudflare Dashboard
3. Go to Pages > Create a project
4. Connect your repository
5. Set build configuration:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy - your site will be live at `*.pages.dev`

### Option 3: Netlify

1. Push code to GitHub/GitLab
2. Log in to Netlify
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy - your site will be live at `*.netlify.app`

## Project Structure

```
english-quiz/
├── public/                    # Static assets
│   └── favicon.svg
├── src/
│   ├── core/                  # Quiz engine & business logic
│   │   ├── types.ts          # Domain models
│   │   ├── scoring.ts        # Score calculation & level mapping
│   │   ├── quiz-engine.ts    # State machine & quiz logic
│   │   └── index.ts          # Core exports
│   ├── data/                  # Question banks
│   │   ├── vocabulary.ts     # Vocabulary questions
│   │   ├── grammar.ts        # Grammar questions
│   │   └── index.ts          # Question loader
│   ├── ui/                    # User interface
│   │   ├── renderer.ts       # DOM utilities
│   │   ├── components/       # Reusable UI components
│   │   └── screens/          # Application screens
│   ├── app/                   # Application controller
│   │   └── app.ts
│   ├── adapters/              # Platform adapters
│   │   └── web.ts
│   ├── styles/                # CSS styles
│   │   └── main.css
│   └── main.ts               # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Architecture

### Core Engine (`src/core/`)
- **Types**: Domain models (Question, QuizState, Answer, Result)
- **Scoring**: Score calculation and CEFR level mapping
- **Quiz Engine**: State machine managing quiz lifecycle

### Question Bank (`src/data/`)
- Separate question banks for vocabulary and grammar
- Easy to add new question types
- Can be loaded from API in the future

### UI Layer (`src/ui/`)
- **Components**: Reusable UI elements (progress bar, question card, options)
- **Screens**: Application views (start, quiz, result, review)
- **Renderer**: DOM manipulation utilities

### Adapters (`src/adapters/`)
- **Web**: Current web-based interface
- **Future**: Telegram bot adapter (planned)

## Adding New Questions

### Vocabulary Questions

Edit `src/data/vocabulary.ts`:

```typescript
{
  id: 'vocab-016',
  type: 'vocabulary',
  difficulty: 'A1',  // A1, A2, B1, B2, C1, C2
  question: 'What is the synonym of "example"?',
  options: ['Sample', 'Problem', 'Question', 'Answer'],
  correctIndex: 0,
  explanation: "'Sample' is a synonym of 'example'."
}
```

### Grammar Questions

Edit `src/data/grammar.ts`:

```typescript
{
  id: 'grammar-016',
  type: 'grammar',
  difficulty: 'B1',
  question: 'She ___ to the store yesterday.',
  options: ['go', 'goes', 'went', 'going'],
  correctIndex: 2,
  explanation: "Past tense of 'go' is 'went'."
}
```

## Future Roadmap

### Phase 2 (Planned)
- [ ] Telegram bot adapter
- [ ] Cloudflare Worker integration
- [ ] Reading comprehension module
- [ ] Adaptive quiz engine
- [ ] User profiles and progress tracking
- [ ] Spaced repetition (Leitner system)

### Phase 3 (Future)
- [ ] Multiple language support
- [ ] Leaderboards
- [ ] Achievement system
- [ ] Offline mode with service workers

## License

MIT License - feel free to use and modify for your projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
