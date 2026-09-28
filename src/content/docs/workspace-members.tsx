import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Members controls who has access to a workspace and what they can do
        in it. Every person you invite is assigned one role, which decides
        what they can see and change.
      </P>

      <H2 id="roles">Roles</H2>
      <Ul>
        <Li><b>Owner</b> — full control, including deleting the workspace.</Li>
        <Li><b>Admin</b> — manages people and workspace settings.</Li>
        <Li><b>Editor</b> — adds sites and runs audits, without managing people or settings.</Li>
        <Li><b>Viewer</b> — read-only access to the workspace&apos;s data.</Li>
      </Ul>
      <P>
        Only owners and admins can manage other members, and only roles
        strictly below your own can be assigned to someone else — an admin
        cannot promote a member to owner.
      </P>

      <H2 id="inviting">Inviting people</H2>
      <P>
        Use <b>Invite someone</b>, enter their email, and pick a role. The
        invite appears in an &quot;awaiting acceptance&quot; list until they
        accept it from the link they&apos;re emailed; you can withdraw an
        invite at any point before that.
      </P>

      <H2 id="leaving">Leaving or removing</H2>
      <P>
        Any member can leave a workspace themselves. Owners and admins can
        remove other members, subject to the same role-rank rule used for
        invites.
      </P>

      <Callout>
        Workspaces themselves — creating, renaming, deleting, and their list
        of sites — are managed separately, from the workspace switcher rather
        than the Members screen.
      </Callout>
    </>
  );
}

export const workspaceMembers: Doc = {
  slug: "workspace-members",
  title: "Workspace members",
  description:
    "Invite people to a workspace, assign roles, and control who can manage people and settings.",
  category: "Workspace",
  order: 1,
  Body,
};
