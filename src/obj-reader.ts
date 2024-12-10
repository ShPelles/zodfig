import ZodfigReader from "./zodfig-reader";

export default class ObjReader implements ZodfigReader {
  constructor(private obj: Record<string, unknown>) {
    this.obj = obj;
  }

  read(path: string[]): string | undefined {
    let current: Record<string, unknown> = this.obj;
    for (const key of path) {
      current = current[key] as Record<string, unknown>;
      if (current === undefined || current === null) {
        return undefined;
      }
    }
    return String(current);
  }
}
