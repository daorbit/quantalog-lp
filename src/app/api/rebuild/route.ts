export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const hook = process.env.DEPLOY_HOOK_URL;

  if (!secret || !hook) {
    return Response.json({ ok: false, error: "rebuild is not configured" }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const res = await fetch(hook, { method: "POST", cache: "no-store" });
  if (!res.ok) {
    return Response.json({ ok: false, error: `deploy hook returned ${res.status}` }, { status: 502 });
  }

  return Response.json({ ok: true, triggeredAt: new Date().toISOString() });
}
