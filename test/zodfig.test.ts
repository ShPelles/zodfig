import { z } from "zod";
import { zodfig } from "../src/zodfig";
import { expect, test, describe } from "vitest";

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
      read: (key: string) => `${key}Value`,
    };
    const schema = z.object({
      str1: z.string(),
      str2: z.string(),
    });
    // Act
    const result = zodfig(schema, customReader).read();
    // Assert
    expect(result).toEqual({
      str1: "str1Value",
      str2: "str2Value",
    });
  });
});
