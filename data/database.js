
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let database;

function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required.');
  }

  return mongoUri;
}

async function connectToDatabase() {
  const client = await MongoClient.connect(getMongoUri());
  database = client.db();
}

function getDb() {
  if (!database) {
    throw new Error('Database connection not established.');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};