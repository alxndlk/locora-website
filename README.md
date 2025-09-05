# Locora Website

A mobile app for travelers with detailed statistics for 50,000+ cities worldwide: cost of living, weather, transport, restaurants, attractions, safety, SIM cards, cultural tips, and more. Perfect for trip planning and getting around on the go.

## Features

- Cost of living data for 50,000+ cities
- Weather and transport information
- Restaurant and attraction recommendations
- Safety tips and statistics
- Local SIM card guides and cultural tips
- Designed for both trip planning and navigating on the go

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (v15), [React](https://react.dev/) (v19), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/), CSS
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/)
- **Auth & Data:** [Supabase](https://supabase.com/)
- **Other Libraries:** Framer Motion, AnimeJS, Boring Avatars, Flag Icons, country-code-to-flag-emoji, moment, marked, csv-parse, AWS SDK S3, and more.

## Project Structure

```
.
├── .vscode/                # Editor config
├── blueprints/             # App blueprints
├── migrations/             # Database migrations
├── public/                 # Static assets
├── src/                    # Main source code
│   └── ...                 # Components, pages, etc.
├── bulk_import.csv         # City dataset
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── models.ts               # Data models
├── types.ts                # TypeScript types
├── next.config.ts
├── schema.prisma           # Prisma schema
├── package.json
├── package-lock.json
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will start on [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Contributing

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

1. Fork the repo and create your branch.
2. Make your changes and submit a pull request.

## Security

See [SECURITY.md](./SECURITY.md) for vulnerability reporting.

## License

Distributed under the MIT License. See `LICENSE` for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
