import { c as createSsrRpc } from "./router-DziuQjSF.mjs";
import { c as createServerFn } from "./server-CkEUq1DS.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CXv2x3dD.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
const validateCoupon = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  code: stringType().min(2).max(40),
  subtotal: numberType()
}).parse(input)).handler(createSsrRpc("7d53124a31f98b85a93a534a154a80a64aff3ad6e9160b0b533490223d9a5d18"));
const placeOrder = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  customerName: stringType().trim().min(2).max(120),
  phone: stringType().trim().min(8).max(20),
  email: stringType().trim().email().max(200),
  shippingAddress: stringType().trim().min(8).max(500),
  paymentMethod: enumType(["cod", "mock_gateway"]),
  couponCode: stringType().max(40).optional().nullable()
}).parse(input)).handler(createSsrRpc("537c5b5eac7a9657f797c4c7df0b3e0c7c9c3e8d42e66d55520193729b08c440"));
const listMyOrders = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("51ac02698006d191c28969bc655e6f6227d772d713f4d3615f2c72940208c22e"));
const getMyOrderByCode = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  code: stringType()
}).parse(input)).handler(createSsrRpc("7505f42c80ef23062941d0d756dc981ff786a046ef5488fd334be4d47ac76d04"));
export {
  getMyOrderByCode as g,
  listMyOrders as l,
  placeOrder as p,
  validateCoupon as v
};
