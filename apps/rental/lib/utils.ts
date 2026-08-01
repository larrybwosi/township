/**
 * Format a numeric price into a localized currency string.
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

/**
 * Calculate the integer number of nights between check-in and check-out dates.
 * Returns 0 if either date is invalid, or if the start date is on or after the end date.
 */
export function calculateNights(
  startDateStr: string,
  endDateStr: string,
): number {
  if (!startDateStr || !endDateStr) return 0;

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  if (start >= end) return 0;

  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format dynamic welcome text based on simulated user role.
 */
export function formatUserGreeting(name: string, role: string): string {
  if (role === "HOMEOWNER") {
    return `Welcome back, Host ${name}!`;
  }
  if (role === "ADMIN") {
    return `Admin Panel: ${name}`;
  }
  return `Hello, ${name}! Find your perfect stay today.`;
}
