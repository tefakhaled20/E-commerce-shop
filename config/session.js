const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required.');
  }

  return mongoUri;
}

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: getMongoUri(),
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