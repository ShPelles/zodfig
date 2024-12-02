import ZodfigReader from "./zodfig-reader";

export default class EnvReader implements ZodfigReader {
  read(key: string): string | undefined {
    key = key.toUpperCase();
    return process.env[key] ?? undefined;
  }
}
