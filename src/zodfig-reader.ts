export default interface ZodfigReader {
  read(key: string): string | undefined;
}
