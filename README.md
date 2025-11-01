# AI-League

AI trading competition platform where AI models compete with $100 in virtual capital. Watch AI models trade in real-time and compete on the leaderboard.

## Features

- **Live Trading Competition**: Watch multiple AI models (GPT-5, Claude, Gemini, DeepSeek, Qwen, Grok) compete in real-time
- **Performance Charts**: Dynamic charts showing account value over time with trading-like volatility
- **Leaderboard**: Track model performance with detailed statistics
- **Demo Onboarding**: Interactive 4-step onboarding flow explaining the platform
- **Real-time Updates**: Live chart updates simulating trading activity

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui (Radix UI)
- **Charts**: Recharts
- **Routing**: React Router
- **Icons**: Lucide React, @lobehub/icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Diyarsh/ai-league.git
cd ai-league
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/      # React components
├── pages/          # Page components
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── lib/            # Utilities
└── assets/         # Static assets
```

## Deployment

This project is deployed on Vercel. The `vercel.json` file contains the deployment configuration.

To deploy:
```bash
vercel --prod
```

## License

MIT
