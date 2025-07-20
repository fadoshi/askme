This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Steps for App Devlopment 

## [Step 1] Setup
>npx create-next-app@15.3.2
>npx shadcn@2.5.0 init
>npx shadcn@2.5.0 add --all
>Publish on Github

## [Step 2] Database setups
>Add a PostgreSQL DB Neon
>Add Drizzle ORM
>npm i drizzle-orm@0.43.1 @neondatabase/serverless@1.0.0 dotenv@16.5.0
>npm i -D drizzle-kit@0.31.1 tsx@4.19.4
>Add Schema. Push scheme. Verify changes in neon. Verify changes i Drizzle Studio
>Create, Review and Merge pull request

## [Step 3] Auth setup
>Integrate Better Auth.  npm install better-auth@1.2.8 --legacy-peer-deps
>Configure auth schema. Push changes.
>Create basic UI. Create new user.
>Create, review and merge pull request

## [Step 4] Auth UI
>Create auth pages.
>Create auth layout
>Create auth module
>Create auth views. Register and Login form. Get app Logo.
>Create, review and merge pull request

## [Step 5] Social Auth
>Configure social providers Google and Github
>Protact non-auth pages
>Create, review and merge pull request

## [Step 6] Dashboard Sidebar
>Create dashboard layout
>Create dashboard module
>Create dashboard sidebar
>Modify 'globals.css'(2:44:30)  theme and fix auth view
>Create, review and merge pull request

## [Step 7] Dashboard Navbar
>Create dashboard navbar. colapse button. 
>Add responsive drawer
>input button to search for anything.
>Create, review and merge pull request



