/**
 * Formats a number as Indian Rupee amount using a fixed 'en-IN' locale.
 * Using a hardcoded locale prevents SSR/client hydration mismatches that
 * occur when toLocaleString() is called without a locale argument (the
 * server may use a different system locale than the user's browser).
 */
export function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN");
}
