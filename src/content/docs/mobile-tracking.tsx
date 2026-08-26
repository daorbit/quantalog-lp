import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

function Body() {
  return (
    <>
      <P>
        For a real app — one with signup, not an anonymous landing page —
        install the React Native SDK instead of the web tracker. Every
        visitor is a real, identified user from the moment they sign up, so
        instead of a rotating daily hash, events are tied to your own user
        id and stay queryable as one continuous history.
      </P>

      <H2 id="install">Install</H2>
      <Pre label="terminal">{`npm install @real-ana/react-native @react-native-async-storage/async-storage`}</Pre>

      <H2 id="setup">Create the client once</H2>
      <P>
        Create it at the app root and reuse the same instance everywhere —
        it holds the install id and the current session.
      </P>
      <Pre label="src/analytics.ts">{`import { createRealAna } from "@real-ana/react-native";

export const analytics = createRealAna({
  siteId: "YOUR_APP_SITE_ID",
  apiUrl: "${site.api}",
});`}</Pre>

      <H2 id="identify">Identify on signup / login</H2>
      <P>
        Call <Code>identify()</Code> once, right after signup or login
        succeeds. Anything the app already did — onboarding screens,
        <Code>signup_started</Code> — gets backfilled onto this user
        automatically, so their history is complete from their very first
        screen, not just from the moment they logged in.
      </P>
      <Pre label="SignupScreen.tsx">{`async function onSignupComplete(user: { id: string }) {
  await analytics.identify(user.id);
}`}</Pre>
      <P>
        Call <Code>reset()</Code> on logout. The install id stays — the same
        device reusing the app later is still the same install — but the
        user identity is cleared until the next identify().
      </P>
      <Pre label="LogoutButton.tsx">{`await analytics.reset();`}</Pre>

      <H2 id="journey">A full journey, end to end</H2>
      <P>
        Signup, land on a page, click into the dashboard, click a button —
        four calls across three screens is the whole thing:
      </P>
      <Pre label="App journey">{`// 1. Signup screen — before identify(), tied to install id only
analytics.track("signup_started");

// 2. Signup succeeds
await analytics.identify(newUser.id);
analytics.track("signup_completed");

// 3. Home screen loads
function HomeScreen() {
  useEffect(() => {
    analytics.screen("Home");
  }, []);
  ...
}

// 4. User taps into the dashboard
<Button onPress={() => {
  analytics.track("dashboard_opened");
  navigation.navigate("Dashboard");
}}>
  Open dashboard
</Button>

// 5. Dashboard screen loads
function DashboardScreen() {
  useEffect(() => {
    analytics.screen("Dashboard");
  }, []);
  ...
}

// 6. User taps "Add widget"
<Button onPress={() => {
  analytics.track("add_widget_clicked", { from: "dashboard" });
  openAddWidgetModal();
}}>
  Add widget
</Button>`}</Pre>
      <P>
        That sequence is exactly what shows up, in order, on that user's
        timeline in the dashboard — signup, home, dashboard, add-widget
        click — the same "which page, which step, which event fired"
        answer session replay tools give you, built from events you already
        fired.
      </P>

      <H2 id="screens-vs-events">Screens vs. events</H2>
      <Ul>
        <Li>
          <Code>screen(name, props?)</Code> — call on every screen mount.
          This is the app equivalent of a pageview.
        </Li>
        <Li>
          <Code>track(name, props?)</Code> — call for a tap, a funnel step,
          or anything else worth counting on its own. Name events as verbs:{" "}
          <Code>add_to_cart</Code>, <Code>checkout_step_2</Code>,{" "}
          <Code>share_tapped</Code>.
        </Li>
      </Ul>

      <H3 id="props">Custom properties</H3>
      <P>
        Both methods take an optional props object, stored as-is and
        filterable later the same way a web custom event is:
      </P>
      <Pre label="example">{`analytics.track("checkout_step", { step: 2, method: "card" });`}</Pre>

      <H2 id="funnels">Funnels and per-user timelines</H2>
      <P>
        Because every event on an app site carries the same <Code>appUserId</Code>,
        funnels, retention, and segments all work exactly as they do for web
        sites — the only difference is the identity behind each row is a real
        signed-up user instead of an anonymous visitor. Open any user from
        their event list to see their full screen-by-screen history.
      </P>

      <Callout>
        App sites are created with the platform set to <Code>app</Code> instead
        of <Code>web</Code> — they skip the domain field and use your app's
        bundle id / package name instead.
      </Callout>
    </>
  );
}

export const mobileTracking: Doc = {
  slug: "mobile-tracking",
  title: "Track a mobile app",
  description:
    "Install the React Native SDK, identify signed-up users, and track their journey screen by screen.",
  category: "Tracking",
  // Right after the web tracker install doc, before script options — the
  // reader picking a platform should see both installs before the details.
  order: 1.5,
  Body,
};
