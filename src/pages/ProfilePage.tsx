import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import BantCard from "@/components/BantCard";

interface Profile {
  username: string | null;
  display_name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  favorite_club: string | null;
  favorite_league: string | null;
  created_at: string;
}

const initials = (name?: string | null) =>
  (name || "U")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const timeAgo = (iso: string) => {
  const diff = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bants, setBants] = useState<{ id: string; content: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // form state
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const loadProfile = async () => {
    if (!user) return;
    setLoading(true);
    const [{ data: p }, { data: b }] = await Promise.all([
      supabase
        .from("profiles")
        .select("username, display_name, bio, location, avatar_url, favorite_club, favorite_league, created_at")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("bants")
        .select("id, content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);
    setProfile(p as Profile | null);
    setBants(b ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const openEdit = () => {
    setDisplayName(profile?.display_name || "");
    setUsername(profile?.username || "");
    setBio(profile?.bio || "");
    setLocation(profile?.location || "");
    setEditOpen(true);
  };

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName || null,
        username: username || null,
        bio: bio || null,
        location: location || null,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to save", { description: error.message });
      return;
    }
    toast.success("Profile updated");
    setEditOpen(false);
    loadProfile();
  };

  const joinedLabel = profile?.created_at
    ? `Joined ${new Date(profile.created_at).toLocaleString("default", { month: "long", year: "numeric" })}`
    : "";

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-32 gradient-pitch">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 rounded-full bg-background/60 p-1.5 backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="relative px-4">
        <div className="-mt-12 flex items-end justify-between">
          <Avatar className="h-24 w-24 border-4 border-background">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {initials(profile?.display_name || profile?.username)}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mb-1 gap-1.5" onClick={openEdit}>
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Button>
        </div>

        <div className="mt-3">
          <h1 className="text-lg font-bold text-foreground">
            {loading ? "..." : profile?.display_name || profile?.username || "Unnamed"}
          </h1>
          <p className="text-sm text-muted-foreground">@{profile?.username || "user"}</p>
        </div>

        {profile?.bio && <p className="mt-2 text-sm text-foreground">{profile.bio}</p>}

        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {profile?.location && (
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {profile.location}</span>
          )}
          {joinedLabel && (
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {joinedLabel}</span>
          )}
        </div>

        <div className="mt-3 flex gap-4 text-sm">
          <span><strong className="text-foreground">0</strong> <span className="text-muted-foreground">Following</span></span>
          <span><strong className="text-foreground">0</strong> <span className="text-muted-foreground">Followers</span></span>
        </div>
      </div>

      <div className="mt-4 flex border-b border-border">
        {["Bants", "Replies", "Media", "Likes"].map((tab, i) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              i === 0 ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {bants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground text-sm">Your bants will appear here.</p>
        </div>
      ) : (
        bants.map((b) => (
          <BantCard
            key={b.id}
            name={profile?.display_name || profile?.username || "You"}
            username={profile?.username || "user"}
            time={timeAgo(b.created_at)}
            content={b.content}
            replies={0}
            rebants={0}
            likes={0}
          />
        ))
      )}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="display_name">Display name</Label>
              <Input id="display_name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={saveProfile} disabled={saving} className="gradient-pitch text-primary-foreground">
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
