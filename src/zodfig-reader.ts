export default interface ZodfigReader {
  read(path: string[]): string | undefined;
}
