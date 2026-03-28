const express = require("express");
const router = express.Router();

const {
  createFeature,
  getFeatureByName,
  listFeatures,
  setUserOverride,
  setGroupOverride,
  getUserOverride,
  getGroupOverride,
} = require("../services/featureService");

const { evaluateFeature } = require("../core/featureEngine");

router.post("/features", (req, res) => {
  const { name, defaultEnabled, description } = req.body;
  if (!name || typeof defaultEnabled !== "boolean") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    createFeature(name, defaultEnabled, description);
    res.json({ message: "Feature created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/features", (req, res) => {
  res.json(listFeatures());
});

router.get("/features/:name/evaluate", (req, res) => {
  const { userId, groupId } = req.query;
  const feature = getFeatureByName(req.params.name);

  if (!feature) return res.status(404).json({ error: "Feature not found" });

  const userOverride = userId ? getUserOverride(feature.id, userId) : null;
  const groupOverride = groupId ? getGroupOverride(feature.id, groupId) : null;

  const enabled = evaluateFeature(feature, userOverride, groupOverride);
  res.json({ enabled });
});

router.post("/features/:name/override/user", (req, res) => {
  const { userId, enabled } = req.body;
  const feature = getFeatureByName(req.params.name);
  if (!feature) return res.status(404).json({ error: "Feature not found" });

  setUserOverride(feature.id, userId, enabled);
  res.json({ message: "User override set" });
});

router.post("/features/:name/override/group", (req, res) => {
  const { groupId, enabled } = req.body;
  const feature = getFeatureByName(req.params.name);
  if (!feature) return res.status(404).json({ error: "Feature not found" });

  setGroupOverride(feature.id, groupId, enabled);
  res.json({ message: "Group override set" });
});

module.exports = router;
