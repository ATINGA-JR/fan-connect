import { ArrowLeft, Search, Play, Headphones, Bell, BellOff, ChevronRight, Clock, Eye, Mic2, Video } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

type ContentType = "all" | "video" | "podcast";
type FeedTab = "subscribed" | "explore";

interface Channel {
  id: string;
  name: string;
  handle: string;
  initials: string;
  subscribers: string;
  subscribed: boolean;
  verified: boolean;
}

interface ContentItem {
  id: string;
  type: "video" | "podcast";
  title: string;
  channelName: string;
  channelInitials: string;
  duration: string;
  views: string;
  timeAgo: string;
  thumbnail: string;
  live?: boolean;
}

const channels: Channel[] = [
  { id: "1", name: "TacticsBoard", handle: "@tacticsboard", initials: "TB", subscribers: "245K", subscribed: true, verified: true },
  { id: "2", name: "MatchDay Pod", handle: "@matchdaypod", initials: "MP", subscribers: "180K", subscribed: true, verified: true },
  { id: "3", name: "FanZone TV", handle: "@fanzonetv", initials: "FZ", subscribers: "520K", subscribed: false, verified: true },
  { id: "4", name: "The Boot Room", handle: "@bootroom", initials: "BR", subscribers: "92K", subscribed: true, verified: false },
  { id: "5", name: "African Football HQ", handle: "@afhq", initials: "AF", subscribers: "310K", subscribed: false, verified: true },
  { id: "6", name: "Transfer Talk", handle: "@transfertalk", initials: "TT", subscribers: "410K", subscribed: false, verified: true },
];

const contentItems: ContentItem[] = [
  { id: "1", type: "video", title: "Why Arsenal's New System Changes Everything", channelName: "TacticsBoard", channelInitials: "TB", duration: "14:32", views: "48K", timeAgo: "2h ago", thumbnail: "🎬" },
  { id: "2", type: "podcast", title: "UCL QF Preview: Who Goes Through?", channelName: "MatchDay Pod", channelInitials: "MP", duration: "52:10", views: "12K", timeAgo: "5h ago", thumbnail: "🎙️" },
  { id: "3", type: "video", title: "Top 10 Goals of the Week", channelName: "FanZone TV", channelInitials: "FZ", duration: "8:45", views: "220K", timeAgo: "1d ago", thumbnail: "🎬", live: false },
  { id: "4", type: "podcast", title: "Transfer Window: Who's Moving?", channelName: "Transfer Talk", channelInitials: "TT", duration: "1:05:22", views: "34K", timeAgo: "3h ago", thumbnail: "🎙️" },
  { id: "5", type: "video", title: "AFCON 2026 Qualifiers Breakdown", channelName: "African Football HQ", channelInitials: "AF", duration: "22:18", views: "67K", timeAgo: "8h ago", thumbnail: "🎬" },
  { id: "6", type: "video", title: "Boot Review: Latest Predator vs Mercurial", channelName: "The Boot Room", channelInitials: "BR", duration: "11:03", views: "18K", timeAgo: "1d ago", thumbnail: "🎬" },
  { id: "7", type: "podcast", title: "Relegation Battle: Who Survives?", channelName: "MatchDay Pod", channelInitials: "MP", duration: "47:30", views: "9K", timeAgo: "12h ago", thumbnail: "🎙️" },
  { id: "8", type: "video", title: "Live: Chelsea vs Man City Watch-Along", channelName: "FanZone TV", channelInitials: "FZ", duration: "LIVE", views: "3.2K", timeAgo: "", thumbnail: "🎬", live: true },
];

const DugoutPage = () => {
  const navigate = useNavigate();
  const [feedTab, setFeedTab] = useState<FeedTab>("subscribed");
  const [contentFilter, setContentFilter] = useState<ContentType>("all");
  const [subscribedIds, setSubscribedIds] = useState<string[]>(
    channels.filter((c) => c.subscribed).map((c) => c.id)
  );

  const toggleSubscribe = (id: string) => {
    setSubscribedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredContent = contentItems.filter((item) => {
    const typeMatch = contentFilter === "all" || item.type === contentFilter;
    if (feedTab === "subscribed") {
      const channel = channels.find((c) => c.name === item.channelName);
      return typeMatch && channel && subscribedIds.includes(channel.id);
    }
    return typeMatch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">The Dugout</h1>
          </div>
          <button className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Feed tabs */}
        <div className="flex border-b border-border">
          {(["subscribed", "explore"] as FeedTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFeedTab(tab)}
              className={`flex-1 py-2.5 text-center text-sm font-medium capitalize transition-colors ${
                feedTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab === "subscribed" ? "My Channels" : "Explore"}
            </button>
          ))}
        </div>

        {/* Content type filter */}
        <div className="flex gap-2 px-4 py-2.5">
          {([
            { id: "all", label: "All" },
            { id: "video", label: "Videos", icon: Video },
            { id: "podcast", label: "Podcasts", icon: Headphones },
          ] as const).map((f) => (
            <button
              key={f.id}
              onClick={() => setContentFilter(f.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                contentFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {f.icon && <f.icon className="h-3.5 w-3.5" />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribed channels row (only on My Channels tab) */}
      {feedTab === "subscribed" && subscribedIds.length > 0 && (
        <div className="border-b border-border px-4 py-3">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {channels
              .filter((c) => subscribedIds.includes(c.id))
              .map((channel) => (
                <div key={channel.id} className="flex flex-col items-center gap-1.5 min-w-[60px]">
                  <Avatar className="h-12 w-12 border-2 border-primary/40">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {channel.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight w-14 truncate">
                    {channel.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Content Feed */}
      <div className="p-4 space-y-4">
        {/* Live content pinned at top */}
        {filteredContent.filter((i) => i.live).map((item) => (
          <Card key={item.id} className="overflow-hidden border-destructive/40 bg-card">
            <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-destructive/20 to-primary/10 text-5xl">
              {item.thumbnail}
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive-foreground" /> LIVE
              </span>
              <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-background/80 px-2 py-0.5 text-[10px] text-foreground">
                <Eye className="h-3 w-3" /> {item.views} watching
              </span>
            </div>
            <div className="flex gap-3 p-3">
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">{item.channelInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.channelName}</p>
              </div>
            </div>
          </Card>
        ))}

        {/* Regular content */}
        {filteredContent.filter((i) => !i.live).map((item) => (
          <Card key={item.id} className="overflow-hidden bg-card">
            <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-secondary to-muted text-4xl">
              {item.thumbnail}
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                {item.type === "podcast" ? <Headphones className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {item.duration}
              </span>
            </div>
            <div className="flex gap-3 p-3">
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">{item.channelInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.channelName} · {item.views} views · {item.timeAgo}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {filteredContent.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-sm">
              {feedTab === "subscribed" ? "Subscribe to channels to see their content here." : "No content found."}
            </p>
          </div>
        )}

        {/* Explore: show channel list to subscribe */}
        {feedTab === "explore" && (
          <section className="mt-6">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Popular Channels</h2>
            <div className="space-y-2">
              {channels.map((channel) => {
                const isSub = subscribedIds.includes(channel.id);
                return (
                  <div key={channel.id} className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{channel.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {channel.name} {channel.verified && <span className="text-primary">✓</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{channel.subscribers} subscribers</p>
                    </div>
                    <Button
                      size="sm"
                      variant={isSub ? "secondary" : "default"}
                      className="text-xs gap-1"
                      onClick={() => toggleSubscribe(channel.id)}
                    >
                      {isSub ? <><BellOff className="h-3 w-3" /> Subscribed</> : <><Bell className="h-3 w-3" /> Subscribe</>}
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DugoutPage;
