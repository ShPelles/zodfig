import { expect, test, describe } from "vitest";
import JsonReader from "../src/json-reader";

describe("JsonReader", () => {
  test("should read values from the JSON string", () => {
    // Arrange
    const jsonString = JSON.stringify({
      key1: "value1",
      key2: 42,
      key3: true,
    });
    const reader = new JsonReader(jsonString);
    // Act & Assert
    expect(reader.read(["key1"])).toBe("value1");
    expect(reader.read(["key2"])).toBe("42");
    expect(reader.read(["key3"])).toBe("true");
  });

  test("should return undefined for non-existent keys", () => {
    // Arrange
    const jsonString = JSON.stringify({
      key1: "value1",
    });
    const reader = new JsonReader(jsonString);
    // Act & Assert
    expect(reader.read(["key2"])).toBeUndefined();
  });

  test("should handle different data types", () => {
    // Arrange
    const jsonString = JSON.stringify({
      key1: "value1",
      key2: 42,
      key3: true,
      key4: null,
      key5: undefined,
    });
    const reader = new JsonReader(jsonString);
    // Act & Assert
    expect(reader.read(["key1"])).toBe("value1");
    expect(reader.read(["key2"])).toBe("42");
    expect(reader.read(["key3"])).toBe("true");
    expect(reader.read(["key4"])).toBeUndefined();
    expect(reader.read(["key5"])).toBeUndefined();
  });

  test("should handle nested objects", () => {
    // Arrange
    const jsonString = JSON.stringify({
      nested: {
        str: "nested string",
        inner: {
          num: 42,
        },
      },
    });
    const reader = new JsonReader(jsonString);
    // Act & Assert
    expect(reader.read(["nested", "str"])).toBe("nested string");
    expect(reader.read(["nested", "inner", "num"])).toBe("42");
  });
});
