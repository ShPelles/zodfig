import { z } from "zod";
import ZodfigReader from "./zodfig-reader";
import EnvReader from "./env-reader";

interface ConfigObject {
  [key: string]: ConfigObject | string | undefined;
}

interface Zodfig<T extends z.ZodObject<z.ZodRawShape>> {
  read(): z.infer<T>;
}

export function zodfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  readers: ZodfigReader[] = [new EnvReader()],
): Zodfig<T> {
  const parser = z.preprocess(() => readConfig(schema, readers), schema);

  return {
    read: () => parser.parse({}),
  };
}

function readConfig<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  readers: ZodfigReader[],
  path: string[] = [],
): ConfigObject {
  const config: ConfigObject = {};

  for (const key of Object.keys(schema.shape)) {
    const type = schema.shape[key];
    if (type instanceof z.ZodObject) {
      config[key] = readConfig(type, readers, [...path, key]);
      continue;
    }
    const value = readFromReaders(readers, [...path, key]);
    if (value !== undefined) {
      config[key] = value;
    }
  }

  return config;
}

function readFromReaders(
  readers: ZodfigReader[],
  path: string[],
): string | undefined {
  for (const reader of readers) {
    const value = reader.read(path);
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}
