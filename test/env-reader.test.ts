import { expect, test, describe } from "vitest";
import EnvReader from "../src/env-reader";

describe("EnvReader", () => {
  test("should read environment variables", () => {
    // Arrange
    process.env.TEST001 = "foo";
    process.env.TEST002 = "42";
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read("TEST001")).toBe("foo");
    expect(reader.read("TEST002")).toBe("42");
  });

  test("should return undefined if the environment variable is not set", () => {
    // Arrange
    process.env.TEST001 = "foo";
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read("TEST003")).toBeUndefined();
  });

  test("should read environment variables as uppercase key", () => {
    // Arrange
    process.env.TEST004 = "foo";
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read("Test004")).toBe("foo");
  });
});
