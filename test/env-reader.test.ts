import { expect, test, describe } from "vitest";
import EnvReader from "../src/env-reader";

describe("EnvReader", () => {
  test("should read environment variables", () => {
    // Arrange
    process.env.SERVICE_NAME = "foo";
    process.env.SERVICE_VERSION = "1.0.0";
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read(["SERVICE_NAME"])).toBe("foo");
    expect(reader.read(["SERVICE_VERSION"])).toBe("1.0.0");
  });

  test("should return undefined if the environment variable is not set", () => {
    // Arrange
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read(["NON_EXISTENT"])).toBeUndefined();
  });

  test("should read environment variables as uppercase key", () => {
    // Arrange
    process.env.USERS_SERVICE_URL = "https://users.xyz.com";
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read(["users_service_url"])).toBe("https://users.xyz.com");
  });

  test("should handle nested keys", () => {
    // Arrange
    process.env.DATABASE_HOST = "localhost";
    process.env.DATABASE_PORT = "5432";
    // Act & Assert
    const reader = new EnvReader();
    expect(reader.read(["database", "host"])).toBe("localhost");
    expect(reader.read(["database", "port"])).toBe("5432");
  });
});
