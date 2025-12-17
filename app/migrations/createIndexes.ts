// migrations/createIndexes.ts
import db from "../lib/db";

export default async function createIndexes() {
  // Use the getCollection helper to get a typed collection
  const sellers = await db.getCollection("sellers");

  // Unique index on email (case-insensitive)
  await sellers.createIndex(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
  );

  // Index on phone number for searches
  await sellers.createIndex({ phoneNumber: 1 });

  // Optional: TTL for email verification tokens
  // const emailTokens = await db.getCollection("emailTokens");
  // await emailTokens.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

  console.log("Indexes created for sellers collection");
}
