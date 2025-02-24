"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getPendingInvites,
  getTeamMembers,
  inviteUserByEmail,
} from "@/helpers/api";
import { formatDate } from "@/helpers/utils";
import { useToast } from "@/hooks/useToast";
import { Database } from "@/types/database";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mail, MoreVertical, Shield, UserPlus, XCircle } from "lucide-react";
import { useState } from "react";

interface TeamSettingsProps {
  accountId: string;
}

const ROLES = {
  admin: {
    label: "Admin",
    description: "Can manage team members and most settings",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  member: {
    label: "Member",
    description: "Can view and manage assigned resources",
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  },
};

interface IMember {
  account_id: string;
  created_at: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  role: Database["public"]["Enums"]["user_type"];
  status: Database["public"]["Enums"]["user_status"];
}

export default function TeamSettings({ accountId }: TeamSettingsProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  const { toast } = useToast();

  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ["team-members", accountId],
    queryFn: () => getTeamMembers(accountId),
  });

  const { data: pendingInvites, isLoading: isPendingInvitesLoading } = useQuery(
    {
      queryKey: ["pending-invites", accountId],
      queryFn: () => getPendingInvites(accountId),
    }
  );

  const { mutate: inviteUser } = useMutation({
    mutationFn: async (data: { email: string; role: string }) => {
      return inviteUserByEmail(data.email, data.role);
    },
    onSuccess: (data) => {
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${data.user.email}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    inviteUser({
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    });

    setInviteDialogOpen(false);
  };

  const handleRoleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRole = formData.get("role") as string;

    // TODO: Implement role change logic
    toast({
      title: "Role updated",
      description: `${selectedMember?.first_name} ${
        selectedMember?.last_name
      }'s role has been updated to ${
        ROLES[newRole as keyof typeof ROLES].label
      }`,
    });

    setChangeRoleDialogOpen(false);
    setSelectedMember(null);
  };

  if (!members) return <div>No members found</div>;
  if (isMembersLoading || isPendingInvitesLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your team members and their access levels
        </p>
      </div>

      {/* Change Role Dialog */}
      <Dialog
        open={changeRoleDialogOpen}
        onOpenChange={setChangeRoleDialogOpen}
      >
        <DialogContent>
          <form onSubmit={handleRoleChange}>
            <DialogHeader>
              <DialogTitle>Change Role</DialogTitle>
              <DialogDescription>
                Change the role and permissions for {selectedMember?.first_name}{" "}
                {selectedMember?.last_name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="role">Role</label>
                <Select name="role" defaultValue={selectedMember?.role}>
                  <SelectTrigger>
                    <SelectValue>
                      {ROLES[selectedMember?.role as keyof typeof ROLES]
                        ?.label || "Select a role"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLES).map(
                      ([value, { label, description }]) => (
                        <SelectItem key={value} value={value} textValue={label}>
                          <div className="flex flex-col">
                            <span>{label}</span>
                            <span className="text-xs text-muted-foreground">
                              {description}
                            </span>
                          </div>
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setChangeRoleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Team Members Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your team members and their roles
            </CardDescription>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleInvite}>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your team
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="email">Email address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter their email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="role">Role</label>
                    <Select name="role" defaultValue="member">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Invitation</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      alt={`${member.first_name[0]}${member.last_name[0]}`}
                    />
                    <AvatarFallback>
                      {`${member.first_name[0]}${member.last_name[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{`${member.first_name} ${member.last_name}`}</p>
                      {member.status === "invited" && (
                        <Badge variant="secondary" className="text-xs">
                          Invited
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="secondary"
                    className={ROLES[member.role].badge}
                  >
                    {ROLES[member.role].label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMember(member);
                          setChangeRoleDialogOpen(true);
                        }}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Resend Invite
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>Manage outstanding team invitations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingInvites?.map((invite, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{invite.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Invited {formatDate(invite.invited_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {ROLES[invite.role as keyof typeof ROLES].label}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
