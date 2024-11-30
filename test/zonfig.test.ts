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
});
