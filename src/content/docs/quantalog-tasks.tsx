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
          Tasks are cards in <b>buckets</b>, the board&apos;s columns. Every
          plan starts with six: Backlog, To do, In progress, Review, Blocked
          and Done. Press <b>Add new bucket</b> at the end of the board to add
          your own, and use the <b>⋯</b> menu on a bucket (or double-click its
          name) to rename or delete it. Deleting a bucket moves its tasks to
          another bucket; nothing else is deleted.
        </Li>
        <Li>
          Drag a card to move it within a bucket or into another one. Click the
          circle next to a task&apos;s name to complete it; completed tasks fold
          away under <b>Completed tasks</b> at the bottom of each bucket.
        </Li>
        <Li>
          Use <b>Group by</b> to arrange the columns by <b>Progress</b>,{" "}
          <b>Assigned to</b> or <b>Priority</b> instead. Dragging a card between
          those columns changes that field.
        </Li>
        <Li>
          Press <b>Add task</b> at the top of any column to add one straight
          into it, switch to <b>Grid</b> to see every task in a table, or open{" "}
          <b>Charts</b> for how many tasks are left by status, priority,
          bucket and person.
        </Li>
        <Li>
          Search by name, label or task number such as <b>T-12</b>, and click
          people&apos;s pictures above the board to show only their tasks.
        </Li>
        <Li>
          Use <b>Set a limit</b> in a bucket&apos;s <b>⋯</b> menu to cap how
          many open tasks it should hold. The count next to the name turns
          amber at the limit and red when the bucket goes over it.
        </Li>
      </Ul>

      <H2 id="views">Views</H2>
      <Ul>
        <Li>
          <b>Board</b> shows tasks as cards in columns, and <b>Grid</b> lists
          every task in a table.
        </Li>
        <Li>
          <b>Calendar</b> shows a month with each task on its due date. Drag a
          task to another day to change its due date; if it has a start date,
          that moves by the same number of days. Click a day to list its tasks
          underneath.
        </Li>
        <Li>
          <b>Timeline</b> draws each task as a bar from its start date to its
          due date, grouped by bucket, with arrows between linked tasks. Use
          the arrows at the top to move through the weeks.
        </Li>
        <Li>
          <b>My work</b> lists the open tasks assigned to you, grouped into
          Overdue, Today, Next 7 days, Later and No due date, with how many you
          finished this week and your current streak.
        </Li>
        <Li>
          <b>Charts</b> shows what the team shipped this week, the longest run
          of days with a finished task, and who finished the most, above the
          charts by status, priority, bucket and person.
        </Li>
      </Ul>

      <H2 id="details">Task details</H2>
      <P>
        Click a card to open its details: the name, labels, who it is
        assigned to, progress, priority (Low, Medium, Important or Urgent),
        due date, notes, a checklist and a link to a web page or a Quantalog
        page such as <b>/app/seo</b>. Changes save as you make them. Turn on{" "}
        <b>Show on card</b> to see the checklist on the board. Late tasks
        show their date in red. Give a task a <b>start date</b> as well as a
        due date to plan when work begins; the card then shows both.
      </P>

      <H2 id="subtasks">Subtasks</H2>
      <P>
        Open a task and type into <b>Subtasks</b> to split it into smaller
        tasks, each with its own number, assignee and dates. You can also turn
        a checklist item into a subtask, or pick a <b>Parent task</b> for an
        existing task. The parent&apos;s card shows how many subtasks are done,
        and each subtask&apos;s card names its parent. Subtasks can&apos;t have
        subtasks of their own.
      </P>

      <H2 id="dependencies">Dependencies</H2>
      <P>
        Under <b>Dependencies</b>, add the tasks that must finish first
        (<b>Blocked by</b>) or the tasks that wait on this one (<b>Blocks</b>).
        A task with an unfinished blocker shows <b>Blocked</b> on its card, and
        the Timeline draws an arrow between the two. Two tasks can&apos;t block
        each other. Deleting a task removes its links and turns its subtasks
        into ordinary tasks.
      </P>

      <H2 id="celebrations">Little celebrations</H2>
      <P>
        Finishing the last open task in a bucket, the last subtask of a task,
        a task with three or more subtasks or a task with a long checklist
        sets off a short burst of confetti. It stays off when motion is turned
        off in your theme settings or on your device.
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
