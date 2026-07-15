import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, A, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

function Body() {
  return (
    <>
      <P>
        The Platform API lets you offer analytics to <b>your</b> users inside{" "}
        <b>your</b> product. Your users never sign up with Quantalog and never see
        our UI — your backend creates the sites, injects the tracker, reads the
        numbers, and renders them in your own design.
      </P>

      <H2 id="model">The model</H2>
      <Ul>
        <Li>
          <b>Workspace</b> — your organisation. Holds the API key. All data is
          scoped to it.
        </Li>
        <Li>
          <b>Project</b> — one app belonging to one of your end-users. Tag it with
          your own <Code>extUserId</Code>.
        </Li>
        <Li>
          <b>Site</b> — a tracked property inside a project. Has a public{" "}
          <Code>siteId</Code>.
        </Li>
      </Ul>

      <H2 id="flow">Integration flow</H2>
      <P>
        1. Create a project when a user creates an app on your platform:
      </P>
      <Pre label="POST /v1/projects">{`curl -X POST ${site.api}/v1/projects \\
  -H "Authorization: Bearer $QUANTALOG_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "Jane Portfolio", "extUserId": "user_123" }'`}</Pre>

      <P>2. Create a site inside that project — the snippet comes back:</P>
      <Pre label="POST /v1/projects/:pid/sites">{`curl -X POST ${site.api}/v1/projects/PROJECT_ID/sites \\
  -H "Authorization: Bearer $QUANTALOG_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "Production", "domain": "jane.app", "framework": "react" }'

# -> { "site": { "siteId": "..." }, "snippet": "<script ...></script>" }`}</Pre>

      <P>
        3. Inject the returned <Code>snippet</Code> into the generated app&apos;s{" "}
        <Code>&lt;head&gt;</Code>.
      </P>
      <P>
        4. Read the stats from your backend and render them in your own UI:
      </P>
      <Pre label="GET /v1/sites/:siteId/stats">{`curl "${site.api}/v1/sites/SITE_ID/stats?range=24h" \\
  -H "Authorization: Bearer $QUANTALOG_API_KEY"`}</Pre>

      <Callout>
        API keys are server-side only. A leaked key exposes every site in the
        workspace — store it in an environment variable, never in client code.
      </Callout>

      <H2 id="next">Full reference</H2>
      <P>
        See the <A href="/docs/api-reference">API reference</A> for authentication,
        every endpoint, and response codes.
      </P>
    </>
  );
}

export const platformApi: Doc = {
  slug: "platform-api",
  title: "Platform API",
  description:
    "Embed analytics into your own product — projects, sites, and the integration flow.",
  category: "Platform API",
  order: 1,
  Body,
};
