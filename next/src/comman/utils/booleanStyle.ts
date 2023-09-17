export function booleanStyle(
  isWeekly: boolean,
  value1: string,
  value2: string
): string {
  return isWeekly ? value1 : value2;
}
