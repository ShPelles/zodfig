import { expect, test, describe } from "vitest";
import JsonReader from "../src/json-reader";

describe("JsonReader", () => {
  test("should read values from the JSON string", () => {
    // Arrange
    const jsonString = JSON.stringify({
      username: "john_doe",
      password: "secret123",
    });
    const reader = new JsonReader(jsonString);
    // Act & Assert
    expect(reader.read(["username"])).toBe("john_doe");
    expect(reader.read(["password"])).toBe("secret123");
  });

  test("should return undefined for non-existent keys", () => {
    // Arrange
    const reader = new JsonReader("{}");
    // Act & Assert
    expect(reader.read(["nonExistentKey"])).toBeUndefined();
  });

  test("should handle different data types", () => {
    // Arrange
    const settings = JSON.stringify({
      theme: "dark",
      notifications: true,
      maxResults: 10,
      preferdLanguage: undefined,
      user: null,
    });
    const reader = new JsonReader(settings);
    // Act & Assert
    expect(reader.read(["theme"])).toBe("dark");
    expect(reader.read(["notifications"])).toBe("true");
    expect(reader.read(["maxResults"])).toBe("10");
    expect(reader.read(["preferdLanguage"])).toBeUndefined();
    expect(reader.read(["user"])).toBeUndefined();
  });

  test("should handle nested objects", () => {
    // Arrange
    const jsonString = JSON.stringify({
      database: {
        host: "localhost",
        port: 5432,
        credentials: {
          user: "admin",
          password: "secret",
        },
      },
    });
    const reader = new JsonReader(jsonString);
    // Act & Assert
    expect(reader.read(["database", "host"])).toBe("localhost");
    expect(reader.read(["database", "port"])).toBe("5432");
    expect(reader.read(["database", "credentials", "user"])).toBe("admin");
    expect(reader.read(["database", "credentials", "password"])).toBe("secret");
  });
});
