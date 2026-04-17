import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db: any = null;

export async function getDb() {
  if (db) return db;
  
  db = await open({
    filename: path.join(process.cwd(), 'scans.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS scans (
      domain TEXT PRIMARY KEY,
      isProtected INTEGER,
      robotsTxt TEXT,
      xRobotsTag TEXT,
      metaTags TEXT,
      aiTxt TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
