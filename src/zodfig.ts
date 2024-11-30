import { z } from "zod";

interface Zodfig<T extends z.ZodObject<z.ZodRawShape>> {
  read(): z.infer<T>;
}

export function zodfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
): Zodfig<T> {
  return {
    read: () => schema.parse({}),
  };
}
