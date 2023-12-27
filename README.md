# Solana Next.js

Building on Solana with Next.js

## Project setup

### Step 1

Clone the repository:

```bash
git clone https://github.com/terrytjw/solana-nextjs.git
```

### Step 2

Install dependencies:

```bash
yarn
```

### Step 3 (Optional)

Populate env variables in `.env.local` file. See `.env.example` for reference.

### Step 4 (Optional)

Set up your own Neon database at https://neon.tech/docs/get-started-with-neon/signing-up

Run the following command to push the schema to the database:

```bash
npx drizzle-kit push:pg
```

Schema file can be found in `/lib/db/schema.ts` directory.

### Step 5 

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Step 6 (Optional)

Run the following command to view the tables:

```bash
npx drizzle-kit studio
```

## Tech stack

1. Next.js (TypeScript) - Fullstack React framework
2. Tailwind CSS (shadcn/ui) - styling library
3. DrizzleORM + NeonDB - Database
4. @solana/web3.js - Solana JavaScript SDK
