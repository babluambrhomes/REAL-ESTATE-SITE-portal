"use client";

import { useState } from "react";
import { UserPlus, Users, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/axios";
import { usePermissions } from "@/lib/auth/usePermissions";
import { Can } from "@/components/auth/Can";

export default function TeamPage() {
  const { can, isOrganization, organizationId } = usePermissions();
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!can("member.invite")) {
      toast.error("You do not have permission to invite members.");
      return;
    }
    if (!isOrganization || !organizationId) {
      toast.error("Team management is available only for organization workspaces.");
      return;
    }
    if (!email.trim() || !roleId.trim()) {
      toast.error("Email and role ID are required.");
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post(`/orgs/${organizationId}/invitations`, {
        email: email.trim(),
        roleId: roleId.trim(),
      });
      toast.success("Invitation sent successfully.");
      setEmail("");
      setRoleId("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Could not send invitation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-jakarta">
      <div>
        <h1 className="text-2xl font-bold text-[#0B132B]">Team</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage organization members, invitations, and roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#1865F2] flex items-center justify-center">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B132B]">Members</p>
              <p className="text-xs text-slate-500">Organization access</p>
            </div>
          </div>
        </div>

        <Can any={["member.update", "role.manage"]}>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B132B]">Roles</p>
                <p className="text-xs text-slate-500">Manage member permissions</p>
              </div>
            </div>
          </div>
        </Can>

        <Can action="member.invite">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <UserPlus size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B132B]">Invitations</p>
                <p className="text-xs text-slate-500">Invite new employees</p>
              </div>
            </div>
          </div>
        </Can>
      </div>

      <Can action="member.invite">
        <form
          onSubmit={handleInvite}
          className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4"
        >
          <div>
            <h2 className="text-lg font-bold text-[#0B132B]">Invite employee</h2>
            <p className="mt-1 text-xs text-slate-500">
              Sends an invitation to the selected organization role.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="employee@example.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#1865F2]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Role ID
            </label>
            <input
              type="text"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              placeholder="Enter role ID"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#1865F2]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#1865F2] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Invitation"}
          </button>
        </form>
      </Can>
    </div>
  );
}
