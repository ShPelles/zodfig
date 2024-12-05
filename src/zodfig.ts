import { z } from "zod";
import ZodfigReader from "./zodfig-reader";
import EnvReader from "./env-reader";

interface Zodfig<T extends z.ZodObject<z.ZodRawShape>> {
  read(): z.infer<T>;
}

export function zodfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  readers: ZodfigReader[] = [new EnvReader()],
): Zodfig<T> {
  const parser = z.preprocess(readConfig<T>(schema, readers), schema);

  return {
    read: () => parser.parse({}),
  };
}

function readConfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  readers: ZodfigReader[],
): (arg: unknown, ctx: z.RefinementCtx) => unknown {
  return () => {
    const config: Record<string, string> = {};

    for (const key of Object.keys(schema.shape)) {
      const value = readFromReaders(readers, key);
      if (value !== undefined) {
        config[key] = value;
      }
    }

    return config;
  };
}

function readFromReaders(
  readers: ZodfigReader[],
  key: string,
): string | undefined {
  for (const reader of readers) {
    const value = reader.read(key);
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}
