import type { Doc } from "@/lib/docs";
import { H2, P, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

const ENDPOINTS: { m: string; p: string; d: string }[] = [
  { m: "POST", p: "/v1/projects", d: "Create a project (one end-user's app). Pass your own extUserId." },
  { m: "GET", p: "/v1/projects", d: "List projects. Filter with ?extUserId=user_123." },
  { m: "POST", p: "/v1/projects/:pid/sites", d: "Create a tracked site. Response includes the snippet." },
  { m: "GET", p: "/v1/projects/:pid/sites", d: "List sites in a project." },
  { m: "GET", p: "/v1/sites/:siteId/stats", d: "Aggregated analytics. Optional ?range=1h|24h|7d|30d." },
  { m: "GET", p: "/v1/sites/:siteId/snippet", d: "Fetch the tracking snippet again for a site." },
  { m: "DELETE", p: "/v1/sites/:siteId", d: "Delete a site and every event collected for it." },
];

const CODES: { code: string; meaning: string }[] = [
  { code: "201", meaning: "Resource created." },
  { code: "204", meaning: "Success, no body (deletes, event collection)." },
  { code: "400", meaning: "Missing or invalid body field." },
  { code: "401", meaning: "Missing, malformed, or revoked API key." },
  { code: "404", meaning: "Project or site not found in this workspace." },
];

function Body() {
  return (
    <>
      <H2 id="auth">Authentication</H2>
      <P>
        Every <Code>/v1</Code> request needs your workspace API key in the{" "}
        <Code>Authorization</Code> header. Create one in the dashboard under{" "}
        <b>Developers → API Keys</b>. Keys are shown once at creation; only a hash
        is stored.
      </P>
      <Pre label="Authorization header">{`curl ${site.api}/v1/projects \\
  -H "Authorization: Bearer sk_live_xxxxxxxxxxxx"`}</Pre>
      <Callout>
        A missing, malformed, or revoked key returns <Code>401 Unauthorized</Code>.
        A key can never read another workspace&apos;s data.
      </Callout>

      <H2 id="endpoints">Endpoints</H2>
      <P>
        Base URL: <Code>{site.api}</Code>. All endpoints are scoped to the API
        key&apos;s workspace.
      </P>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((e) => (
              <tr key={e.m + e.p}>
                <td>
                  <span className={`doc-method doc-method-${e.m.toLowerCase()}`}>{e.m}</span>
                </td>
                <td>
                  <code>{e.p}</code>
                </td>
                <td>{e.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="codes">Response codes</H2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {CODES.map((c) => (
              <tr key={c.code}>
                <td>
                  <code>{c.code}</code>
                </td>
                <td>{c.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const apiReference: Doc = {
  slug: "api-reference",
  title: "API reference",
  description:
    "Authentication, every /v1 endpoint, and response codes for the Platform API.",
  category: "Platform API",
  order: 2,
  Body,
};
