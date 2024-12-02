import { z } from "zod";
import ZodfigReader from "./zodfig-reader";
import EnvReader from "./env-reader";

interface Zodfig<T extends z.ZodObject<z.ZodRawShape>> {
  read(): z.infer<T>;
}

export function zodfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  customReader?: ZodfigReader
): Zodfig<T> {
  const reader = customReader || new EnvReader();
  const parser = z.preprocess(readConfig<T>(schema, reader), schema);

  return {
    read: () => parser.parse({}),
  };
}

function readConfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  reader: ZodfigReader,
): (arg: unknown, ctx: z.RefinementCtx) => unknown {
  return () => {
    const config: Record<string, string> = {};

    for (const key of Object.keys(schema.shape)) {
      const value = reader.read(key);
      if (value !== undefined) {
        config[key] = value;
      }
    }

    return config;
  };
}
