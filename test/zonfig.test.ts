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

  test("should fill in values from the environment variables", () => {
    // Arrange
    process.env.TEST001 = "foo";
    process.env.TEST002 = "42";
    const schema = z.object({
      TEST001: z.string(),
      TEST002: z.coerce.number(),
    });
    // Act
    const result = zodfig(schema).read();
    // Assert
    expect(result).toEqual({
      TEST001: "foo",
      TEST002: 42,
    });
  });
});
