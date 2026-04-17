const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function getMongoUri() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  if (process.env.DBUsername && process.env.DBPassword) {
    return `mongodb+srv://${process.env.DBUsername}:${process.env.DBPassword}@cluster0.cinusqz.mongodb.net/?appName=Cluster0`;
  }

  return 'mongodb://127.0.0.1:27017';
}

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: getMongoUri(),
    databaseName: process.env.MONGODB_DB_NAME || 'online-shop',
    collection: 'sessions'
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SESSION_SECRET || 'dev-only-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;