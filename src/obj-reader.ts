import ZodfigReader from "./zodfig-reader";

export default class ObjReader implements ZodfigReader {
  constructor(private obj: Record<string, unknown>) {
    this.obj = obj;
  }

  read(key: string): string | undefined {
    const value = this.obj[key];
    if (value === undefined || value === null) {
      return undefined;
    }
    return String(value);
  }
}
