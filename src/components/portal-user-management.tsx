import { useMemo, useState } from "react";
import {
  KeyRound,
  Pencil,
  Plus,
  Power,
  Search,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Role = "Seller" | "Supervisor" | "Manager";
type Status = "Active" | "Inactive";

interface PortalUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  branch: string;
  assigned: number;
  status: Status;
}

const BRANCHES = [
  "Phoenix North",
  "Scottsdale",
  "Tucson",
  "Nogales",
  "San Luis",
];

const ROLES: Role[] = ["Seller", "Supervisor", "Manager"];

const INITIAL_USERS: PortalUser[] = [
  {
    id: "u-001",
    firstName: "Marisol",
    lastName: "Quintana",
    email: "marisol.quintana@alexai.cloud",
    role: "Manager",
    branch: "Phoenix North",
    assigned: 48,
    status: "Active",
  },
  {
    id: "u-002",
    firstName: "Diego",
    lastName: "Fuentes",
    email: "diego.fuentes@alexai.cloud",
    role: "Seller",
    branch: "Scottsdale",
    assigned: 31,
    status: "Active",
  },
  {
    id: "u-003",
    firstName: "Paola",
    lastName: "Rentería",
    email: "paola.renteria@alexai.cloud",
    role: "Supervisor",
    branch: "Nogales",
    assigned: 22,
    status: "Active",
  },
  {
    id: "u-004",
    firstName: "Héctor",
    lastName: "Méndez",
    email: "hector.mendez@alexai.cloud",
    role: "Seller",
    branch: "Tucson",
    assigned: 17,
    status: "Inactive",
  },
  {
    id: "u-005",
    firstName: "Andrea",
    lastName: "Solís",
    email: "andrea.solis@alexai.cloud",
    role: "Seller",
    branch: "Phoenix North",
    assigned: 40,
    status: "Active",
  },
  {
    id: "u-006",
    firstName: "Ricardo",
    lastName: "Cárdenas",
    email: "ricardo.cardenas@alexai.cloud",
    role: "Manager",
    branch: "San Luis",
    assigned: 12,
    status: "Inactive",
  },
  {
    id: "u-007",
    firstName: "Lucía",
    lastName: "Vargas",
    email: "lucia.vargas@alexai.cloud",
    role: "Supervisor",
    branch: "Scottsdale",
    assigned: 29,
    status: "Active",
  },
];

const ROLE_STYLES: Record<Role, string> = {
  Seller: "bg-blue-50 text-[#1A56DB] ring-1 ring-blue-200",
  Supervisor: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  Manager: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

function initials(u: PortalUser) {
  return `${u.firstName[0] ?? ""}${u.lastName[0] ?? ""}`.toUpperCase();
}

function avatarColor(u: PortalUser) {
  const palette: Record<Role, string> = {
    Seller: "bg-[#1A56DB]/10 text-[#1A56DB]",
    Supervisor: "bg-violet-500/10 text-violet-600",
    Manager: "bg-amber-500/10 text-amber-600",
  };
  return palette[u.role];
}

export function PortalUserManagement() {
  const [users, setUsers] = useState<PortalUser[]>(INITIAL_USERS);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [branchFilter, setBranchFilter] = useState<"all" | string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Seller" as Role,
    branch: BRANCHES[0]!,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (q && !`${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q))
        return false;
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (branchFilter !== "all" && u.branch !== branchFilter) return false;
      return true;
    });
  }, [users, query, roleFilter, branchFilter]);

  function submitUser() {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      toast.error("Please complete first name, last name and email.");
      return;
    }
    const newUser: PortalUser = {
      id: `u-${Date.now()}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      branch: form.branch,
      assigned: 0,
      status: "Active",
    };
    setUsers((prev) => [newUser, ...prev]);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "Seller",
      branch: BRANCHES[0]!,
    });
    setDrawerOpen(false);
    toast.success("User created", {
      description: `${newUser.firstName} ${newUser.lastName} added as ${newUser.role}.`,
    });
  }

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Inactive" : "Active",
            }
          : u,
      ),
    );
    const u = users.find((x) => x.id === id);
    if (u)
      toast.success(
        u.status === "Active" ? "User deactivated" : "User activated",
      );
  }

  function resetPassword(id: string) {
    const u = users.find((x) => x.id === id);
    if (u)
      toast.success("Password reset link sent", {
        description: `Sent to ${u.email}.`,
      });
  }

  return (
    <div className="space-y-6 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0F172A]">
            <UserCog className="h-6 w-6 text-[#1A56DB]" />
            User Management & Roles
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Manage team members, assign roles and branches, and control platform
            access across the Chapman workspace.
          </p>
        </div>
        <Button
          onClick={() => setDrawerOpen(true)}
          className="bg-[#1A56DB] text-white hover:bg-[#1746b0]"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="border-slate-200 pl-9 text-sm text-[#0F172A] placeholder:text-slate-400 focus-visible:ring-[#1A56DB]"
            />
          </div>

          <Select
            value={roleFilter}
            onValueChange={(v) => setRoleFilter(v as "all" | Role)}
          >
            <SelectTrigger className="w-[170px] border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={branchFilter}
            onValueChange={(v) => setBranchFilter(v)}
          >
            <SelectTrigger className="w-[190px] border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]">
              <SelectValue placeholder="Office / Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {BRANCHES.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Office / Branch
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Assigned Clients / Quotes
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id} className="border-slate-100">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback
                          className={cn(
                            "text-xs font-semibold",
                            avatarColor(u),
                          )}
                        >
                          {initials(u)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0F172A]">
                          {u.firstName} {u.lastName}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        ROLE_STYLES[u.role],
                      )}
                    >
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {u.branch}
                  </TableCell>
                  <TableCell className="text-sm font-semibold tabular-nums text-[#0F172A]">
                    {u.assigned}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        u.status === "Active"
                          ? "bg-[#06D6A0]/15 text-[#06D6A0] ring-1 ring-[#06D6A0]/30"
                          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          u.status === "Active"
                            ? "bg-[#06D6A0]"
                            : "bg-slate-400",
                        )}
                      />
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-slate-500 hover:bg-slate-100 hover:text-[#1A56DB]"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => resetPassword(u.id)}
                        className="size-8 text-slate-500 hover:bg-slate-100 hover:text-[#1A56DB]"
                        title="Reset Password"
                      >
                        <KeyRound className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleStatus(u.id)}
                        className={cn(
                          "size-8 hover:bg-slate-100",
                          u.status === "Active"
                            ? "text-slate-500 hover:text-rose-600"
                            : "text-slate-500 hover:text-[#06D6A0]",
                        )}
                        title={u.status === "Active" ? "Deactivate" : "Activate"}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-sm text-slate-400"
                  >
                    <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-slate-300" />
                    No users match the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">
            Showing {filtered.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500">
              {users.filter((u) => u.status === "Active").length}
            </span>{" "}
            active ·{" "}
            <span className="font-medium text-slate-500">
              {users.filter((u) => u.status === "Inactive").length}
            </span>{" "}
            inactive
          </div>
        </div>
      </div>

      {/* Add User slide-over drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full border-slate-200 bg-white p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-slate-200 px-6 py-5">
            <SheetTitle className="flex items-center gap-2 text-lg font-bold text-[#0F172A]">
              <UserCog className="h-5 w-5 text-[#1A56DB]" />
              Add New User
            </SheetTitle>
            <SheetDescription className="text-sm text-slate-500">
              Create a new team member and assign their role and branch.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-5 px-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#0F172A]">
                  First Name
                </Label>
                <Input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  placeholder="Marisol"
                  className="border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#0F172A]">
                  Last Name
                </Label>
                <Input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  placeholder="Quintana"
                  className="border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#0F172A]">Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="name@alexai.cloud"
                className="border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#0F172A]">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v as Role }))}
              >
                <SelectTrigger className="border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#0F172A]">
                Office / Branch
              </Label>
              <Select
                value={form.branch}
                onValueChange={(v) => setForm((f) => ({ ...f, branch: v }))}
              >
                <SelectTrigger className="border-slate-200 text-sm text-[#0F172A] focus-visible:ring-[#1A56DB]">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {BRANCHES.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white px-6 py-4">
            <Button
              variant="outline"
              onClick={() => setDrawerOpen(false)}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              onClick={submitUser}
              className="bg-[#1A56DB] text-white hover:bg-[#1746b0]"
            >
              Create User
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
