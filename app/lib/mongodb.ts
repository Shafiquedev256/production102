import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri)
  throw new Error("❌ MONGODB_URI is not set in environment variables.");

interface GlobalMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalForMongo = globalThis as unknown as GlobalMongo;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (globalForMongo._mongoClientPromise) {
  // Reuse existing client in development
  clientPromise = globalForMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();

  // Save to global (development only)
  globalForMongo._mongoClientPromise = clientPromise;
}

export default clientPromise;
