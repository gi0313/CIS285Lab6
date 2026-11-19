# SplitSmart

SplitSmart is a shared-expense tracker built with Next.js, TypeScript, Prisma, and SQLite. Groups, members, expenses, and their allocated shares are saved in the local database.

## Run locally

```bash
cd prototype
npm ci
cp .env.example .env
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default SQLite database is `prototype/dev.db`; the database file and `.env` are ignored by Git.

## How splitting works

Expense amounts are validated and converted to integer cents by the API. Each expense is divided equally between the selected participants. If cents remain, they are assigned one at a time in ascending member-ID order, so the allocation is deterministic. A member’s balance is the total they paid minus their allocated shares; a positive balance means they should receive money and a negative balance means they owe money.

## Available commands

- `npm run dev` — start the development server.
- `npm run build` — build the application.
- `npm run lint` — run ESLint.
- `npm run db:migrate` — apply or create local Prisma migrations.
- `npm run db:generate` — regenerate the Prisma client.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
