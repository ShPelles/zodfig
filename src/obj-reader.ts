import ZodfigReader from "./zodfig-reader";

export default class ObjReader implements ZodfigReader {
  private obj: Record<string, any>;

  constructor(obj: Record<string, any>) {
    this.obj = obj;
  }

  read(key: string): string | undefined {
    return this.obj[key] ?? undefined;
  }
}
