function formatVND(amount) {
  const n = typeof amount === "string" ? Number(amount) : amount ?? 0;
  if (!Number.isFinite(n)) return "0đ";
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n) + "đ";
}
export {
  formatVND as f
};
