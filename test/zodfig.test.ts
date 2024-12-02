import { z } from "zod";
import { zodfig } from "../src/zodfig";
import ObjReader from "../src/obj-reader";
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

  test("should work with ObjReader", () => {
    // Arrange
    const obj = {
      TEST001: "foo",
      TEST002: 42,
    };
    const schema = z.object({
      TEST001: z.string(),
      TEST002: z.coerce.number(),
    });
    const reader = new ObjReader(obj);
    // Act
    const result = zodfig(schema, reader).read();
    // Assert
    expect(result).toEqual({
      TEST001: "foo",
      TEST002: 42,
    });
  });

  test("should work with custom readers", () => {
    // Arrange
    const customReader = {
      read: (key: string) => {
        const data = {
          TEST001: "foo",
          TEST002: "42",
        };
        return data[key];
      },
    };
    const schema = z.object({
      TEST001: z.string(),
      TEST002: z.coerce.number(),
    });
    // Act
    const result = zodfig(schema, customReader).read();
    // Assert
    expect(result).toEqual({
      TEST001: "foo",
      TEST002: 42,
    });
  });
});
