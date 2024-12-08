// Import the evaluateDiceRoll function
import { evaluateDiceRoll } from "./evaluateDiceRoll";

describe("evaluateDiceRoll", () => {
  // Test simple dice rolls
  it("should correctly evaluate 1d4", () => {
    const result = evaluateDiceRoll("1d4");
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(4);
  });

  it("should correctly evaluate 1d8", () => {
    const result = evaluateDiceRoll("1d8");
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(8);
  });

  it("should correctly evaluate 2d10", () => {
    const result = evaluateDiceRoll("2d10");
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(20);
  });

  it("should correctly evaluate 40d100", () => {
    const result = evaluateDiceRoll("40d100");
    expect(result).toBeGreaterThanOrEqual(40);
    expect(result).toBeLessThanOrEqual(4000);
  });

  it("should correctly evaluate 2d6", () => {
    const result = evaluateDiceRoll("2d6");
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(12);
  });

  // Test dice rolls with expressions
  it("should correctly evaluate (10+2)d10", () => {
    const result = evaluateDiceRoll("(10+2)d10");
    expect(result).toBeGreaterThanOrEqual(12);
    expect(result).toBeLessThanOrEqual(120);
  });

  it("should correctly evaluate 20d(4+3)", () => {
    const result = evaluateDiceRoll("20d(4+3)");
    expect(result).toBeGreaterThanOrEqual(7);
    expect(result).toBeLessThanOrEqual(140);
  });

  it("should correctly evaluate 3d(4^2)", () => {
    const result = evaluateDiceRoll("3d(4^2)");
    expect(result).toBeGreaterThanOrEqual(3);
    expect(result).toBeLessThanOrEqual(48); // 4^2 = 16, so 3d16
  });

  // Test complex expressions
  it("should correctly evaluate 2d(3d4)", () => {
    const result = evaluateDiceRoll("2d(3d4)");
    expect(result).toBeGreaterThanOrEqual(2 * 3);
    expect(result).toBeLessThanOrEqual(2 * 12);
  });

  it("should correctly evaluate (1+1)d(2d4+1)", () => {
    const result = evaluateDiceRoll("(1+1)d(2d4+1)");
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(2 * (8 + 1));
  });

  // Test edge cases
  it("should return 0 for an empty string", () => {
    const result = evaluateDiceRoll("");
    expect(result).toBe(0);
  });

  it("should handle invalid input gracefully", () => {
    expect(() => evaluateDiceRoll("invalid")).toThrow();
  });

  it("should correctly evaluate single dice roll like 1d1", () => {
    const result = evaluateDiceRoll("1d1");
    expect(result).toBe(1);
  });
});

describe("evaluateDiceRoll with mocked Math.random", () => {
  it("should correctly evaluate lowest roll (1d4)", () => {
    jest.spyOn(Math, "random").mockReturnValue(0); // Always return lowest roll (1)
    const result = evaluateDiceRoll("1d4");
    expect(result).toBe(1); // Lowest roll
    jest.restoreAllMocks();
  });

  it("should correctly evaluate highest roll (1d4)", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.999999); // Return highest roll (4)
    const result = evaluateDiceRoll("1d4");
    expect(result).toBe(4); // Highest roll
    jest.restoreAllMocks();
  });

  it("should correctly evaluate lowest roll in complex expression", () => {
    jest.spyOn(Math, "random").mockReturnValue(0); // Always return lowest roll
    const result = evaluateDiceRoll("2d(3d4)");
    expect(result).toBe(2);
    jest.restoreAllMocks();
  });

  it("should correctly evaluate highest roll in complex expression", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.999999); // Return highest roll
    const result = evaluateDiceRoll("2d(3d4)");
    expect(result).toBe(2 * 12); // 2 * 12 (each 3d4 rolls 4+4+4)
    jest.restoreAllMocks();
  });
});
