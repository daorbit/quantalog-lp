import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Tasks</b> is one shared board for everything your team has
        to do next: fixing an SEO issue, replying to reviews, writing a post or
        following up a lead. It is an official Quantalog app: it ships with
        every workspace and stays off until a workspace admin turns it on.
      </P>

      <H2 id="enable">Turning Tasks on</H2>
      <P>
        Open <b>Apps</b>, find <b>Quantalog Tasks</b> in the{" "}
        <b>Quantalog apps</b> group and press <b>Enable</b>. Tasks then
        appears in the sidebar for everyone in the workspace.
      </P>

      <H2 id="board">The board</H2>
      <Ul>
        <Li>
          Tasks sit in three columns: <b>To do</b>, <b>Doing</b> and{" "}
          <b>Done</b>. Drag a card to move it, or tick its circle to mark it
          done.
        </Li>
        <Li>
          Type in the box at the top of <b>To do</b> and press Enter to add a
          task quickly, or press <b>New task</b> to fill in every detail.
        </Li>
        <Li>
          <b>Done</b> shows tasks finished in the last 30 days, so the board
          stays short.
        </Li>
      </Ul>

      <H2 id="details">Task details</H2>
      <P>
        Open a card to add notes, a priority, a due date and a link, either to
        a web page or to a Quantalog page such as <b>/app/seo</b>. Overdue
        tasks show their date in red and tasks due today in amber.
      </P>

      <H2 id="assign">Assigning tasks</H2>
      <P>
        Pick anyone in the workspace as the assignee. They are told in the
        notification bell straight away. Use <b>Assigned to me</b> above the
        board to see only your own work.
      </P>
      <Callout>
        Editors, admins and owners can add, move and delete tasks. Viewers can
        see the board but not change it.
      </Callout>

      <H2 id="limits">Plan limits</H2>
      <P>
        Free workspaces can have 50 open tasks at a time, Starter 500 and Pro
        5,000. Finished tasks don&apos;t count towards the limit.
      </P>
    </>
  );
}

export const quantalogTasks: Doc = {
  slug: "quantalog-tasks",
  title: "Quantalog Tasks",
  description: "Turn on the Tasks app for a shared To do, Doing and Done board with assignees and due dates.",
  category: "Tracking",
  order: 13.45,
  Body,
};
