export function serializeRecord<T>(record: T): T {
  return JSON.parse(JSON.stringify(record));
}
