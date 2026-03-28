function evaluateFeature(feature, userOverride, groupOverride) {
  if (!feature) throw new Error("Feature not found");

  if (userOverride !== null && userOverride !== undefined) {
    return !!userOverride;
  }

  if (groupOverride !== null && groupOverride !== undefined) {
    return !!groupOverride;
  }

  return !!feature.default_enabled;
}

module.exports = { evaluateFeature };
