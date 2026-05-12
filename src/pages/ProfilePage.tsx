import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Edit, Camera } from "lucide-react";
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
  cover_url: string | null;
  favorite_club: string | null;
  favorite_league: string | null;
  created_at: string;
}

interface BantRow {
  id: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  image_url: string | null;
}

const initials = (name?: string | null) =>
  (name || "U").split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

const timeAgo = (iso: string) => {
  const diff = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
};

type TabKey = "Bants" | "Replies" | "Media" | "Likes";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [allBants, setAllBants] = useState<BantRow[]>([]);
  const [likedBants, setLikedBants] = useState<BantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [followCounts, setFollowCounts] = useState({ following: 0, followers: 0 });
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabKey>("Bants");

  const avatarInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  // form state
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const loadProfile = async () => {
    if (!user) return;
    setLoading(true);
    const [{ data: p }, { data: b }, { data: likes }, { count: following }, { count: followers }] = await Promise.all([
      supabase.from("profiles")
        .select("username, display_name, bio, location, avatar_url, cover_url, favorite_club, favorite_league, created_at")
        .eq("user_id", user.id).maybeSingle(),
      supabase.from("bants")
        .select("id, content, created_at, parent_id, image_url")
        .eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("bant_likes")
        .select("bant_id, bants(id, content, created_at, parent_id, image_url)")
        .eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", user.id),
      supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", user.id),
    ]);
    setProfile(p as Profile | null);
    setAllBants((b ?? []) as BantRow[]);
    setLikedBants(((likes ?? []).map((l: any) => l.bants).filter(Boolean)) as BantRow[]);
    setFollowCounts({ following: following ?? 0, followers: followers ?? 0 });
    setLoading(false);
  };

  useEffect(() => { loadProfile(); /* eslint-disable-next-line */ }, [user?.id]);

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
    const { error } = await supabase.from("profiles").update({
      display_name: displayName || null,
      username: username || null,
      bio: bio || null,
      location: location || null,
    }).eq("user_id", user.id);
    setSaving(false);
    if (error) { toast.error("Failed to save", { description: error.message }); return; }
    toast.success("Profile updated");
    setEditOpen(false);
    loadProfile();
  };

  const uploadImage = async (file: File, bucket: "avatars" | "covers", field: "avatar_url" | "cover_url") => {
    if (!user) return;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) { toast.error("Upload failed", { description: error.message }); return; }
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
    const update = field === "avatar_url" ? { avatar_url: publicUrl } : { cover_url: publicUrl };
    const { error: e2 } = await supabase.from("profiles").update(update).eq("user_id", user.id);
    if (e2) { toast.error("Save failed", { description: e2.message }); return; }
    toast.success("Updated");
    loadProfile();
  };

  const joinedLabel = profile?.created_at
    ? `Joined ${new Date(profile.created_at).toLocaleString("default", { month: "long", year: "numeric" })}`
    : "";

  const displayed = (() => {
    if (tab === "Bants") return allBants.filter((b) => !b.parent_id);
    if (tab === "Replies") return allBants.filter((b) => b.parent_id);
    if (tab === "Media") return allBants.filter((b) => b.image_url);
    return likedBants;
  })();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div
        className={`relative h-32 ${profile?.cover_url ? "" : "gradient-pitch"}`}
        style={profile?.cover_url ? { backgroundImage: `url(${profile.cover_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <button onClick={() => navigate(-1)} className="absolute left-3 top-3 rounded-full bg-background/60 p-1.5 backdrop-blur-sm">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={() => coverInput.current?.click()}
          className="absolute right-3 top-3 rounded-full bg-background/60 p-1.5 backdrop-blur-sm"
          title="Change cover"
        >
          <Camera className="h-5 w-5 text-foreground" />
        </button>
        <input ref={coverInput} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "covers", "cover_url")} />
      </div>

      <div className="relative px-4">
        <div className="-mt-12 flex items-end justify-between">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {initials(profile?.display_name || profile?.username)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => avatarInput.current?.click()}
              className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-lg"
              title="Change avatar"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input ref={avatarInput} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], "avatars", "avatar_url")} />
          </div>
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
          <span><strong className="text-foreground">{followCounts.following}</strong> <span className="text-muted-foreground">Following</span></span>
          <span><strong className="text-foreground">{followCounts.followers}</strong> <span className="text-muted-foreground">Followers</span></span>
        </div>
      </div>

      <div className="mt-4 flex border-b border-border">
        {(["Bants", "Replies", "Media", "Likes"] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground text-sm">Nothing here yet.</p>
        </div>
      ) : (
        displayed.map((b) => (
          <BantCard
            key={b.id}
            id={b.id}
            name={profile?.display_name || profile?.username || "You"}
            username={profile?.username || "user"}
            time={timeAgo(b.created_at)}
            content={b.content}
            avatarUrl={profile?.avatar_url}
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
