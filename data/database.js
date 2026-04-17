
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let database;

function getMongoUri() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  if (process.env.DBUsername && process.env.DBPassword) {
    return `mongodb+srv://${process.env.DBUsername}:${process.env.DBPassword}@cluster0.cinusqz.mongodb.net/?appName=Cluster0`;
  }

  return 'mongodb://127.0.0.1:27017';
}

async function connectToDatabase() {
  const client = await MongoClient.connect(getMongoUri());
  database = client.db(process.env.MONGODB_DB_NAME || 'online-shop');
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