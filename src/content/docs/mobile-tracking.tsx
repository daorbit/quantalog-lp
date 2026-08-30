import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

function Body() {
  return (
    <>
      <P>
        For a real app — one with signup, not an anonymous landing page —
        trace the journey of a real, identified user instead of using the
        anonymous web tracker. One call per action: what happened, where it
        happened, and where it led — no separate identify step, no client-
        held state. The user id is just passed on every call, the same way
        your app already knows who's logged in.
      </P>

      <H2 id="install">React Native</H2>
      <Pre label="terminal">{`npm install @real-ana/react-native`}</Pre>
      <P>Create the client once, at the app root, and reuse the same instance everywhere:</P>
      <Pre label="src/analytics.ts">{`import { createRealAna } from "@real-ana/react-native";

export const analytics = createRealAna({
  siteId: "YOUR_APP_SITE_ID",
  apiUrl: "${site.api}",
});`}</Pre>

      <H2 id="web">Web app</H2>
      <P>
        No SDK needed — one plain function does the same thing from a
        browser:
      </P>
      <Pre label="trace.ts">{`async function trace(userId: string, action: string, src?: string, dest?: string) {
  if (!userId) return;
  await fetch("${site.api}/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      siteId: "YOUR_APP_SITE_ID",
      appUserId: userId,
      action,
      src,
      dest,
    }),
  }).catch(() => {});
}`}</Pre>

      <H2 id="journey">A full journey</H2>
      <P>
        Two calls across two screens is the whole shape — call it right where
        the action happens:
      </P>
      <Pre label="App journey">{`// User taps into the dashboard from Home
<Button onPress={() => {
  analytics.trace(user.id, "dashboard_opened", "home", "dashboard");
  navigation.navigate("Dashboard");
}}>
  Open dashboard
</Button>

// User taps "Add widget" on the Dashboard
<Button onPress={() => {
  analytics.trace(user.id, "add_widget_clicked", "dashboard", "widget_modal");
  openAddWidgetModal();
}}>
  Add widget
</Button>`}</Pre>
      <P>
        That's exactly what shows up, in order, on that user's timeline in
        the dashboard — dashboard_opened, then add_widget_clicked — the same
        "which page, which step, which event fired" answer session replay
        tools give you, built from two calls you already had a reason to
        make.
      </P>

      <H2 id="shape">trace(userId, action, src?, dest?)</H2>
      <Ul>
        <Li><Code>userId</Code> — required. Your own id for this user; nothing is recorded without it.</Li>
        <Li><Code>action</Code> — required. What happened, named as a verb: <Code>add_to_cart</Code>, <Code>checkout_step_2</Code>, <Code>share_tapped</Code>.</Li>
        <Li><Code>src</Code> / <Code>dest</Code> — optional. Where the action happened and where it led. Omit both for a one-off event that isn't really a step between two places.</Li>
      </Ul>

      <Callout>
        This posts to a public, siteId-only endpoint — no API key, no secret
        in the app bundle. A workspace's API key is a real secret and should
        never ship inside client code; it's for your own backend calling the
        Platform API directly, a separate and unrelated use.
      </Callout>
    </>
  );
}

export const mobileTracking: Doc = {
  slug: "mobile-tracking",
  title: "Track an app",
  description:
    "Trace a signed-up user's journey — one call per action, no API key needed in the app itself.",
  category: "Tracking",

  order: 1.5,
  Body,
};
