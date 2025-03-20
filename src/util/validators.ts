/**
 * Check whether a string contains only numeric characters
 */
export function isNumericString(value: string) {
  return /^\d+$/.test(value);
}
