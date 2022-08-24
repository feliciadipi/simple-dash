// MongoDB things happen here! 🥭
import { MongoClient } from 'mongodb';
import 'dotenv/config';

export async function connectClient() {
  const client = await new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
  return client;
}

export async function getCollection(client, db_name, collection_name) {
  const db = await client.db(db_name);
  const collection = await db.collection(collection_name);
  return collection;
}
