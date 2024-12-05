import ObjReader from "./obj-reader";

export default class JsonReader extends ObjReader {
  constructor(jsonString: string) {
    super(JSON.parse(jsonString));
  }
}
