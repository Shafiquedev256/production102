// lib/db.ts
import { MongoClient, Db, Collection, Document } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI environment variable.");
}

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };

  const client = new MongoClient(uri);
  await client.connect();

  const dbName = client.db().databaseName || "test";
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T>> {
  const { db } = await connectToDatabase();
  return db.collection<T>(name);
}

// Default export object
const db = {
  connectToDatabase,
  getCollection,
};

export default db;
