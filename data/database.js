const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is required.');
  }
  return mongoUri;
}

async function connectToDatabase() {
  // Return cached connection if it exists
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(getMongoUri(), {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  cachedClient = client;
  cachedDb = client.db();

  return { client: cachedClient, db: cachedDb };
}

function getDb() {
  if (!cachedDb) {
    throw new Error('Call connectToDatabase() first.');
  }
  return cachedDb;
}

module.exports = { connectToDatabase, getDb };
