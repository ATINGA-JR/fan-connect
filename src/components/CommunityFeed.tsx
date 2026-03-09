import { Building2, Megaphone, CalendarDays, ChevronRight } from "lucide-react";

const clubUpdates = [
  {
    club: "Arsenal F.C.",
    badge: "🔴",
    type: "announcement" as const,
    title: "New Kit Reveal — 2026/27 Season",
    content: "Be the first to see our brand new home kit. Pre-orders open March 15. Members get 20% off.",
    time: "1h ago",
  },
  {
    club: "FC Barcelona",
    badge: "🔵🔴",
    type: "event" as const,
    title: "Open Training Session — Camp Nou",
    content: "Socios are invited to an open training session on Saturday, March 14. Gates open at 10 AM.",
    time: "3h ago",
  },
  {
    club: "Manchester City",
    badge: "🩵",
    type: "statement" as const,
    title: "Official Statement on Stadium Expansion",
    content: "The club confirms plans to expand the Etihad Stadium east stand, increasing capacity to 63,000.",
    time: "5h ago",
  },
  {
    club: "Real Madrid",
    badge: "⚪",
    type: "announcement" as const,
    title: "Santiago Bernabéu Tour — New Experience",
    content: "Explore the renovated Bernabéu with our new immersive VR tour experience. Book now on the official site.",
    time: "8h ago",
  },
  {
    club: "Chelsea F.C.",
    badge: "🔵",
    type: "event" as const,
    title: "Fan Meet & Greet with First Team",
    content: "Season ticket holders can register for an exclusive meet & greet event at Cobham on March 20.",
    time: "12h ago",
  },
];

const typeConfig = {
  announcement: { icon: Megaphone, label: "Announcement", className: "text-primary" },
  event: { icon: CalendarDays, label: "Event", className: "text-draw" },
  statement: { icon: Building2, label: "Statement", className: "text-muted-foreground" },
};

const CommunityFeed = () => {
  return (
    <div>
      {/* Section header */}
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Club Updates</h2>
        <p className="text-xs text-muted-foreground">Direct from your favorite clubs</p>
      </div>

      {clubUpdates.map((update, i) => {
        const config = typeConfig[update.type];
        const TypeIcon = config.icon;
        return (
          <div
            key={i}
            className="border-b border-border px-4 py-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg">
                {update.badge}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{update.club}</span>
                  <span className="text-xs text-muted-foreground">· {update.time}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <TypeIcon className={`h-3.5 w-3.5 ${config.className}`} />
                  <span className={`text-[11px] font-medium ${config.className}`}>{config.label}</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-foreground">{update.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{update.content}</p>
                <button className="mt-2 flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  Read more <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityFeed;
