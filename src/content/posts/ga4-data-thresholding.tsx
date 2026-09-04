import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const mismatch = `Report A — Traffic acquisition, last 28 days
  Sessions ......................... 48,214

Report B — same range, Demographics added
  Sessions ......................... 41,880

Same range. Same property. Same metric.
The second report crossed a threshold and dropped rows.`;

const apiCheck = `// The Data API reports thresholding explicitly, which the UI
// only hints at with a small icon. If this comes back non-empty,
// the numbers you are looking at are incomplete.
{
  "propertyQuota": { ... },
  "metadata": {
    "dataLossFromOtherRow": true,
    "subjectToThresholding": true
  }
}`;

function Body() {
  return (
    <>
      <P>
        You open two GA4 reports over the same date range and get two different
        session counts. Nothing is broken, the tag is fine, and the discrepancy
        is not a bug — it is a documented feature called data thresholding, and
        it is doing exactly what it was designed to do.
      </P>
      <P>
        What it was designed to do is withhold data from you when showing it
        might identify an individual. That is a defensible goal. The
        implementation is what causes the confusion, because the threshold is
        undocumented, applied silently, and triggered by things that have nothing
        obvious to do with the report you are reading.
      </P>

      <Callout variant="warn">
        Thresholding removes rows from the report you are viewing. It does not
        remove them from the underlying data, and it does not tell you how many
        it removed. A report can be materially incomplete while presenting a
        confident total.
      </Callout>

      <H2 id="what-triggers">What actually triggers it</H2>
      <P>
        The mechanism is narrower than most explanations suggest. Thresholding
        applies when your property has <strong>Google signals</strong> enabled
        and a report includes data derived from it — demographics, interests,
        or cross-device identity. If a row would represent too few users, the
        row is withheld so that the individuals behind it cannot be inferred.
      </P>
      <P>
        The three conditions that put you into it:
      </P>
      <Ul>
        <Li>
          <strong>Google signals is on.</strong> This is the big one, and it is
          enabled by default in many setups. It is what makes cross-device and
          demographic reporting possible, and it is the same thing that makes
          those reports subject to withholding.
        </Li>
        <Li>
          <strong>The report includes a demographic or interest dimension.</strong>{" "}
          Age, gender, interest category. Adding one of these to a report that
          was previously complete can shrink it.
        </Li>
        <Li>
          <strong>The date range is short, or the segment is narrow.</strong>{" "}
          Fewer users per row means more rows below the threshold. The same
          report over 7 days is thresholded more aggressively than over 90.
        </Li>
      </Ul>
      <Pre label="What it looks like">{mismatch}</Pre>

      <H3 id="not-sampling">It is not sampling</H3>
      <P>
        These get conflated constantly and they are different problems. Sampling
        estimates a total from a subset when the query is too expensive to run
        exactly — the total is approximately right. Thresholding removes rows
        entirely — the total is exactly wrong, and low.
      </P>
      <P>
        Sampling degrades precision. Thresholding degrades completeness. A
        sampled report will tell you it is sampled and give you a confidence
        indicator. A thresholded report gives you a small icon.
      </P>

      <H2 id="detecting">Detecting it</H2>
      <P>
        In the interface, look for the thresholding indicator near the report
        title — an icon that, on hover, says data has been withheld. It is easy
        to miss and easy to dismiss, which is the core complaint.
      </P>
      <P>
        Through the Data API you get a real answer instead of an icon.
      </P>
      <Pre label="runReport response">{apiCheck}</Pre>
      <P>
        If you build any reporting on top of GA4 programmatically, check this
        field. A dashboard that silently reports thresholded numbers as truth is
        worse than no dashboard, because it is believed.
      </P>

      <H2 id="working-around">Working around it</H2>
      <P>
        Four options, in rough order of how much they cost you.
      </P>
      <Ul>
        <Li>
          <strong>Widen the date range.</strong> More users per row, fewer rows
          below the threshold. Cheapest fix, and it works, at the cost of not
          being able to look at last week specifically.
        </Li>
        <Li>
          <strong>Remove the demographic dimension.</strong> If you do not need
          age and gender in this particular report, dropping them frequently
          restores the missing rows. Worth testing before assuming your traffic
          fell.
        </Li>
        <Li>
          <strong>Turn off Google signals.</strong> This removes thresholding
          from most reports, and removes cross-device and demographic reporting
          along with it. A real trade, not a free win — but if you were not using
          the demographics, you were paying for them in withheld rows.
        </Li>
        <Li>
          <strong>Export to BigQuery.</strong> The event-level export is not
          thresholded. This is the complete answer, and it costs you a data
          pipeline, SQL, and a warehouse bill to get a session count.
        </Li>
      </Ul>

      <H2 id="broader-point">The broader point</H2>
      <P>
        Thresholding exists because GA4 collects data granular enough to
        identify people, and then has to protect them from it. The withholding
        is the mitigation for a problem the collection created.
      </P>
      <P>
        Analytics that never joins a visitor to a demographic profile in the
        first place has nothing to threshold. There is no row that could
        identify someone, so no row needs withholding, so the numbers you see are
        the numbers that happened. You give up cross-device demographic
        reporting — which, if you are reading this because a report shrank, you
        may already be giving up in practice.
      </P>
      <P>
        That is the actual choice underneath this. Not &quot;how do I turn
        thresholding off&quot;, but whether the reporting it protects is worth
        what it costs in trustworthiness elsewhere.
      </P>

      <Callout>
        <A href="/analytics">Quantalog</A> stores aggregates rather than
        identity: there is no demographic join to protect, so no rows are
        withheld and no report disagrees with another over the same range. See{" "}
        <A href="/blog/migrating-from-google-analytics-4">
          the GA4 migration guide
        </A>{" "}
        if you are weighing a move, or{" "}
        <A href="/blog/why-your-analytics-undercounts-traffic">
          why analytics undercounts traffic
        </A>{" "}
        for the other half of the missing-numbers problem.
      </Callout>
    </>
  );
}

export const ga4DataThresholding: Post = {
  slug: "ga4-data-thresholding-explained",
  title: "GA4 data thresholding: why your numbers are missing",
  description:
    "Two GA4 reports, same date range, different totals. What triggers thresholding, how it differs from sampling, how to detect it in the API, and the four ways around it.",
  date: "2026-09-04",
  tags: ["Analytics", "Google Analytics", "Privacy"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 8,
  Body,
};
