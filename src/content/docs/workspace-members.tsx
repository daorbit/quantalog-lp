import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Members controls who has access to a workspace and what they can do
        in it. Every person you invite is assigned one role, which decides
        what they can see and change. Two summary cards at the top show how
        many members the workspace has and your own role.
      </P>

      <H2 id="roles">Roles</H2>
      <Ul>
        <Li><b>Owner</b> — full control, including deleting the workspace. There is exactly one owner, and the role cannot be granted to anyone through Members.</Li>
        <Li><b>Admin</b> — invites people, manages roles, and manages sharing and API keys.</Li>
        <Li><b>Editor</b> — adds sites, runs audits, and manages goals and reports, without managing people or settings.</Li>
        <Li><b>Viewer</b> — read-only access to the workspace&apos;s data.</Li>
      </Ul>
      <P>
        Only owners and admins can invite or manage other members, and only
        roles strictly below your own can be granted — an admin can invite or
        promote someone up to Admin, never to Owner. This applies both when
        sending an invite and when changing an existing member&apos;s role.
      </P>

      <H2 id="inviting">Inviting people</H2>
      <P>
        Use <b>Invite someone</b> to open <b>Invite to this workspace</b>,
        enter their email, pick a role, and press <b>Send invitation</b>. The
        invite appears under &quot;Awaiting acceptance&quot; until they accept
        it from the link they&apos;re emailed; you can withdraw an invite at
        any point before that.
      </P>

      <H2 id="leaving">Leaving or removing</H2>
      <P>
        Any member other than the owner can leave a workspace themselves.
        Owners and admins can remove other members, subject to the same
        role-rank rule used for invites. The owner can neither leave nor be
        removed — transferring or giving up ownership means deleting the
        workspace instead.
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
