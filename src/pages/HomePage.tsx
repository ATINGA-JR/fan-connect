import { useEffect, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SideDrawer from "../components/SideDrawer";
import BantCard from "../components/BantCard";
import CommunityFeed from "../components/CommunityFeed";
import kickoffLogo from "@/assets/kickoff-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

type TabId = "foryou" | "following" | "community";

const tabs: { id: TabId; label: string }[] = [
  { id: "foryou", label: "For You" },
  { id: "following", label: "Following" },
  { id: "community", label: "Community" },
];

interface FeedBant {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: { username: string | null; display_name: string | null } | null;
}

const timeAgo = (iso: string) => {
  const diff = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
};

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("foryou");
  const [bants, setBants] = useState<FeedBant[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const loadBants = async () => {
    setLoading(true);
    const { data: bantRows } = await supabase
      .from("bants")
      .select("id, user_id, content, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    const rows = bantRows ?? [];
    const userIds = Array.from(new Set(rows.map((b) => b.user_id)));
    let profileMap: Record<string, { username: string | null; display_name: string | null }> = {};
    if (userIds.length > 0) {
      const { data: profs } = await supabase
        .from("profiles")
        .select("user_id, username, display_name")
        .in("user_id", userIds);
      profileMap = Object.fromEntries((profs ?? []).map((p) => [p.user_id, p]));
    }
    setBants(rows.map((b) => ({ ...b, profile: profileMap[b.user_id] ?? null })));
    setLoading(false);
  };

  useEffect(() => {
    if (!session) return;
    loadBants();
    const channel = supabase
      .channel("bants-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "bants" }, () => loadBants())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setDrawerOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <img src={kickoffLogo} alt="KickOff" className="h-7" />
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-3">
          <Select value={activeTab} onValueChange={(val) => setActiveTab(val as TabId)}>
            <SelectTrigger className="w-full rounded-lg border-border bg-secondary text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.id} value={tab.id}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Feed */}
      <div>
        {activeTab === "community" ? (
          <CommunityFeed />
        ) : loading ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">Loading bants...</p>
        ) : bants.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            No bants yet. Tap the + button to post the first one!
          </p>
        ) : (
          bants.map((b) => (
            <BantCard
              key={b.id}
              id={b.id}
              name={b.profile?.display_name || b.profile?.username || "User"}
              username={b.profile?.username || "user"}
              time={timeAgo(b.created_at)}
              content={b.content}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
