import { drizzle } from 'drizzle-orm/neon-http';
//import { neon } from "@neondatabase/serverless";

export const db = drizzle(process.env.DATABASE_URL!);
/* if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create a Neon client using the DATABASE_URL
const sql = neon(process.env.DATABASE_URL);

// Pass the Neon client to Drizzle
export const db = drizzle(sql); */
