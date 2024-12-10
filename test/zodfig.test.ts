import { z } from "zod";
import { zodfig } from "../src/zodfig";
import { expect, test, describe } from "vitest";
import ObjReader from "../src/obj-reader";

describe("zodfig()", () => {
  test("should return an object with a read function", () => {
    // Arrange
    const schema = z.object({});
    // Act
    const result = zodfig(schema);
    // Assert
    expect(result).instanceOf(Object);
    expect(result.read).instanceOf(Function);
  });

  test("should work with custom readers", () => {
    // Arrange
    const customReader = {
      read: (path: string[]) => `${path[0]}Value`,
    };
    const schema = z.object({
      str1: z.string(),
      str2: z.string(),
    });
    // Act
    const result = zodfig(schema, [customReader]).read();
    // Assert
    expect(result).toEqual({
      str1: "str1Value",
      str2: "str2Value",
    });
  });

  test("should works with nested schemas", () => {
    // Arrange
    const schema = z.object({
      nested: z.object({
        str: z.string(),
        inner: z.object({
          value: z.string(),
        }),
      }),
    });
    const reader = {
      read: (path: string[]) => path.join(">"),
    };
    // Act
    const result = zodfig(schema, [reader]).read();
    // Assert
    expect(result).toEqual({
      nested: {
        str: "nested>str",
        inner: {
          value: "nested>inner>value",
        },
      },
    });
  });

  test("should use fallback mechanism with multiple readers", () => {
    // Arrange
    const reader1 = new ObjReader({ str1: "value1" });
    const reader2 = new ObjReader({ str2: "value2" });
    const schema = z.object({
      str1: z.string(),
      str2: z.string(),
    });
    // Act
    const result = zodfig(schema, [reader1, reader2]).read();
    // Assert
    expect(result).toEqual({
      str1: "value1",
      str2: "value2",
    });
  });

  test("should respect the order of readers in the fallback mechanism", () => {
    // Arrange
    const reader1 = new ObjReader({ str: "value1" });
    const reader2 = new ObjReader({ str: "value2" });
    const schema = z.object({
      str: z.string(),
    });
    // Act
    const result = zodfig(schema, [reader1, reader2]).read();
    // Assert
    expect(result).toEqual({
      str: "value1",
    });
  });
});
