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
          Tasks are cards in columns. By default the columns are{" "}
          <b>Not started</b>, <b>In progress</b> and <b>Completed</b>. Drag a
          card to another column to change it, or click the circle next to its
          name to complete it.
        </Li>
        <Li>
          Use <b>Group by</b> to arrange the columns by <b>Assigned to</b> or{" "}
          <b>Priority</b> instead. Dragging a card between those columns
          reassigns it or changes its priority. Completed tasks fold away under{" "}
          <b>Show completed</b> at the bottom of each column.
        </Li>
        <Li>
          Press <b>Add task</b> at the top of any column to add one straight
          into it, or switch to <b>Grid</b> to see every task in a table.
        </Li>
        <Li>
          Search by name, label or task number such as <b>T-12</b>, and click
          people&apos;s pictures above the board to show only their tasks.
        </Li>
      </Ul>

      <H2 id="details">Task details</H2>
      <P>
        Click a card to open its details: the name, labels, who it is
        assigned to, progress, priority (Low, Medium, Important or Urgent),
        due date, notes, a checklist and a link to a web page or a Quantalog
        page such as <b>/app/seo</b>. Changes save as you make them. Turn on{" "}
        <b>Show on card</b> to see the checklist on the board. Late tasks
        show their date in red.
      </P>

      <H2 id="assign">Assigning tasks</H2>
      <P>
        Pick anyone in the workspace as the assignee. They are told in the
        notification bell straight away. Click your own picture above the
        board to see only your work.
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
