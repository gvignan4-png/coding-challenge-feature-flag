const { evaluateFeature } = require("../src/core/featureEngine");

describe("Feature Engine", () => {
  const feature = { default_enabled: 0 };

  test("default", () => {
    expect(evaluateFeature(feature, null, null)).toBe(false);
  });

  test("user override", () => {
    expect(evaluateFeature(feature, 1, 0)).toBe(true);
  });

  test("group override", () => {
    expect(evaluateFeature(feature, null, 1)).toBe(true);
  });

  test("error", () => {
    expect(() => evaluateFeature(null)).toThrow();
  });
});
