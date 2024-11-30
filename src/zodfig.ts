import { z } from "zod";

interface Zodfig<T extends z.ZodObject<z.ZodRawShape>> {
  read(): z.infer<T>;
}

export function zodfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
): Zodfig<T> {
  const parser = z.preprocess(readEnvValues<T>(schema), schema);

  return {
    read: () => parser.parse({}),
  };
}

function readEnvValues<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
): (arg: unknown, ctx: z.RefinementCtx) => unknown {
  return () => {
    const envValues: Record<string, string> = {};

    for (const key of Object.keys(schema.shape)) {
      const upperKey = key.toUpperCase();
      if (process.env[upperKey] !== undefined) {
        envValues[key] = process.env[upperKey];
      }
    }

    return envValues;
  };
}
