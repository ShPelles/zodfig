import ZodfigReader from "./zodfig-reader";

export default class EnvReader implements ZodfigReader {
  read(path: string[]): string | undefined {
    const key = path.join("_").toUpperCase();
    return process.env[key] ?? undefined;
  }
}
