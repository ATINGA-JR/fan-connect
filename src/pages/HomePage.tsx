import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import SideDrawer from "../components/SideDrawer";
import BantCard from "../components/BantCard";
import kickoffLogo from "@/assets/kickoff-logo.png";

const mockBants = [
  {
    name: "Carlos M.",
    username: "carlos_ftbl",
    time: "2m",
    content: "Arsenal F.C. need a striker before next season. The creativity is there but the finishing has been awful lately. Who should they sign? 🤔",
    tags: ["Arsenal", "Premier League"],
    replies: 12,
    rebants: 34,
    likes: 89,
  },
  {
    name: "Sarah K.",
    username: "sarah_goat",
    time: "15m",
    content: "Vinícius Jr. is on another level this season. That dribble in the second half was absolutely filthy. Best player in the world right now.",
    tags: ["Real Madrid", "La Liga"],
    replies: 45,
    rebants: 120,
    likes: 430,
  },
  {
    name: "James O.",
    username: "james_tactic",
    time: "32m",
    content: "People underrate how good the Bundesliga is for developing young talent. The pathway from youth to first team is unmatched.",
    tags: ["Bundesliga"],
    replies: 8,
    rebants: 22,
    likes: 67,
  },
  {
    name: "Amina B.",
    username: "amina_blues",
    time: "1h",
    content: "Chelsea's midfield rebuild is actually working. The way they controlled possession against Spurs was impressive. Palmer is a generational talent.",
    tags: ["Chelsea", "Premier League"],
    replies: 23,
    rebants: 56,
    likes: 198,
  },
  {
    name: "Pedro L.",
    username: "pedro_fcb",
    time: "2h",
    content: "Lamine Yamal at 18 doing things most players can't do at 28. Barcelona's academy continues to produce greatness. La Masia forever. 🔴🔵",
    tags: ["Barcelona", "La Liga"],
    replies: 67,
    rebants: 230,
    likes: 1024,
  },
];

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"foryou" | "following">("foryou");

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

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("foryou")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === "foryou"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === "following"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Following
          </button>
        </div>
      </header>

      {/* Feed */}
      <div>
        {mockBants.map((bant, i) => (
          <BantCard key={i} {...bant} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
