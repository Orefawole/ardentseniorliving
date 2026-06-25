export const config = { runtime: "edge" };

export default async function handler(request) {
  const mod = await import("../dist/server/server.js");
  const h = mod.default ?? mod;
  return h.fetch(request);
}
