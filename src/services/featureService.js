const db = require("../db/db");

function createFeature(name, defaultEnabled, description = "") {
  try {
    db.prepare(
      "INSERT INTO features (name, default_enabled, description) VALUES (?, ?, ?)"
    ).run(name, defaultEnabled ? 1 : 0, description);
  } catch {
    throw new Error("Feature already exists");
  }
}

function getFeatureByName(name) {
  return db.prepare("SELECT * FROM features WHERE name = ?").get(name);
}

function listFeatures() {
  return db.prepare("SELECT * FROM features").all();
}

function setUserOverride(featureId, userId, enabled) {
  db.prepare(`
    INSERT INTO user_overrides (feature_id, user_id, enabled)
    VALUES (?, ?, ?)
    ON CONFLICT(feature_id, user_id)
    DO UPDATE SET enabled = excluded.enabled
  `).run(featureId, userId, enabled ? 1 : 0);
}

function setGroupOverride(featureId, groupId, enabled) {
  db.prepare(`
    INSERT INTO group_overrides (feature_id, group_id, enabled)
    VALUES (?, ?, ?)
    ON CONFLICT(feature_id, group_id)
    DO UPDATE SET enabled = excluded.enabled
  `).run(featureId, groupId, enabled ? 1 : 0);
}

function getUserOverride(featureId, userId) {
  const row = db.prepare(
    "SELECT enabled FROM user_overrides WHERE feature_id = ? AND user_id = ?"
  ).get(featureId, userId);
  return row ? row.enabled : null;
}

function getGroupOverride(featureId, groupId) {
  const row = db.prepare(
    "SELECT enabled FROM group_overrides WHERE feature_id = ? AND group_id = ?"
  ).get(featureId, groupId);
  return row ? row.enabled : null;
}

module.exports = {
  createFeature,
  getFeatureByName,
  listFeatures,
  setUserOverride,
  setGroupOverride,
  getUserOverride,
  getGroupOverride,
};
