export function formatPriceInr(num: number): string {
  if (!num || Number.isNaN(num)) return "₹ 0";

  if (num >= 10000000) {
    const value = (num / 10000000).toFixed(2).replace(/\.00$/, "");
    return `₹ ${value} Cr`;
  }

  if (num >= 100000) {
    const value = (num / 100000).toFixed(2).replace(/\.00$/, "");
    return `₹ ${value} L`;
  }

  return `₹ ${num.toLocaleString("en-IN")}`;
}
