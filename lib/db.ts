import { sql } from '@vercel/postgres';

export async function createTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS scans (
        domain VARCHAR(255) PRIMARY KEY,
        isProtected BOOLEAN,
        robotsTxt VARCHAR(50),
        xRobotsTag VARCHAR(50),
        metaTags VARCHAR(50),
        aiTxt VARCHAR(50),
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return true;
  } catch (error) {
    console.error('Failed to create table:', error);
    return false;
  }
}
