import { ArrowLeft, Search, Users, Trophy, Shield, ChevronRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type CategoryId = "all" | "fan-groups" | "leagues" | "clubs";

const categories: { id: CategoryId; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: Globe },
  { id: "fan-groups", label: "Fan Groups", icon: Users },
  { id: "leagues", label: "Leagues", icon: Trophy },
  { id: "clubs", label: "Clubs", icon: Shield },
];

const communities = [
  // Fan Groups
  { id: "1", name: "Arsenal Faithful", category: "fan-groups" as const, members: "12.4K", badge: "🔴", desc: "The biggest Arsenal fan community on KickOff", joined: true },
  { id: "2", name: "Barça Nation", category: "fan-groups" as const, members: "18.9K", badge: "🔵🔴", desc: "Culers from around the world unite here", joined: false },
  { id: "3", name: "Chelsea Shed End", category: "fan-groups" as const, members: "9.2K", badge: "🔵", desc: "True Blues discussing all things Chelsea", joined: true },
  { id: "4", name: "Madridistas Global", category: "fan-groups" as const, members: "22.1K", badge: "⚪", desc: "Hala Madrid! The biggest RM fan group", joined: false },
  { id: "5", name: "Red Devils United", category: "fan-groups" as const, members: "15.7K", badge: "🔴", desc: "Manchester United supporters worldwide", joined: false },
  // Leagues
  { id: "6", name: "Premier League Hub", category: "leagues" as const, members: "45.3K", badge: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", desc: "Everything Premier League — news, stats, banter", joined: true },
  { id: "7", name: "La Liga Central", category: "leagues" as const, members: "28.6K", badge: "🇪🇸", desc: "The home of Spanish football discussion", joined: false },
  { id: "8", name: "Serie A Forum", category: "leagues" as const, members: "14.1K", badge: "🇮🇹", desc: "Calcio talk — tactics, transfers, and more", joined: false },
  { id: "9", name: "Bundesliga Zone", category: "leagues" as const, members: "11.8K", badge: "🇩🇪", desc: "German football community", joined: true },
  { id: "10", name: "Ligue 1 Lounge", category: "leagues" as const, members: "8.4K", badge: "🇫🇷", desc: "French football fans assemble", joined: false },
  // Clubs
  { id: "11", name: "Liverpool FC Official", category: "clubs" as const, members: "32.5K", badge: "🔴", desc: "You'll Never Walk Alone — official club community", joined: false },
  { id: "12", name: "Juventus Official", category: "clubs" as const, members: "19.3K", badge: "⚪⚫", desc: "Fino alla fine — official Juve community", joined: false },
  { id: "13", name: "Bayern München Official", category: "clubs" as const, members: "24.7K", badge: "🔴⚪", desc: "Mia san mia — official Bayern community", joined: true },
  { id: "14", name: "PSG Official", category: "clubs" as const, members: "21.0K", badge: "🔵🔴", desc: "Ici c'est Paris — official PSG community", joined: false },
  { id: "15", name: "AC Milan Official", category: "clubs" as const, members: "16.2K", badge: "🔴⚫", desc: "Forza Milan — official Rossoneri community", joined: false },
];

const CommunityPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = communities.filter((c) => {
    const matchesCategory = activeCategory === "all" || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Communities</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Community List */}
      <div>
        {filtered.map((community) => (
          <button
            key={community.id}
            onClick={() => {/* future: navigate to community detail */}}
            className="flex w-full items-center gap-3 border-b border-border px-4 py-4 text-left transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-xl">
              {community.badge}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-foreground">{community.name}</span>
                {community.joined && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    Joined
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{community.desc}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{community.members} members</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center">
            <Users className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No communities found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
