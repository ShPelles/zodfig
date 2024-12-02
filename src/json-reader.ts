import ZodfigReader from "./zodfig-reader";

export default class JsonReader implements ZodfigReader {
  private jsonObject: Record<string, any>;

  constructor(jsonString: string) {
    this.jsonObject = JSON.parse(jsonString);
  }

  read(key: string): string | undefined {
    return this.jsonObject[key];
  }
}
