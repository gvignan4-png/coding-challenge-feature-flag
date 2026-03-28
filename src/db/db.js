const Database = require("better-sqlite3");

const db = new Database("featureFlags.db");

db.exec(`
CREATE TABLE IF NOT EXISTS features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  default_enabled INTEGER NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS user_overrides (
  feature_id INTEGER,
  user_id TEXT,
  enabled INTEGER,
  PRIMARY KEY (feature_id, user_id)
);

CREATE TABLE IF NOT EXISTS group_overrides (
  feature_id INTEGER,
  group_id TEXT,
  enabled INTEGER,
  PRIMARY KEY (feature_id, group_id)
);
`);

module.exports = db;
