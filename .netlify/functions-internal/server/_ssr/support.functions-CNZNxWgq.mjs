import { c as createServerRpc } from "./createServerRpc-dAqAuA0L.mjs";
import { c as createServerFn } from "./server-CkEUq1DS.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const createSupportTicket_createServerFn_handler = createServerRpc({
  id: "42b7e30546b5a7c03d1813ff23502b3d12d813b160186ef0bd9c4bac61108f25",
  name: "createSupportTicket",
  filename: "src/lib/support.functions.ts"
}, (opts) => createSupportTicket.__executeServer(opts));
const createSupportTicket = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  name: stringType().trim().min(1).max(120),
  email: stringType().trim().email().max(200),
  subject: stringType().trim().min(2).max(200),
  message: stringType().trim().min(2).max(4e3)
}).parse(input)).handler(createSupportTicket_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("support_tickets").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  createSupportTicket_createServerFn_handler
};
