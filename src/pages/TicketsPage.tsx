import { useState } from "react";
import { ArrowLeft, Search, MapPin, Calendar, Clock, Users, Ticket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = "all" | "kickoff-hub" | "premier-league" | "la-liga" | "bundesliga" | "serie-a" | "champions-league" | "cups";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kickoff-hub", label: "⚽ KickOff Hub" },
  { id: "premier-league", label: "Premier League" },
  { id: "la-liga", label: "La Liga" },
  { id: "bundesliga", label: "Bundesliga" },
  { id: "serie-a", label: "Serie A" },
  { id: "champions-league", label: "Champions League" },
  { id: "cups", label: "Cups & Tournaments" },
];

const mockTickets = [
  {
    id: 1,
    category: "kickoff-hub",
    homeTeam: "Arsenal vs Chelsea",
    event: "KickOff Watch Party",
    venue: "KickOff Hub — London",
    date: "Sat, Mar 22",
    time: "15:00 GMT",
    price: "Free",
    spots: 48,
    totalSpots: 80,
    featured: true,
    badge: "KickOff Exclusive",
  },
  {
    id: 2,
    category: "kickoff-hub",
    homeTeam: "Real Madrid vs Barcelona",
    event: "El Clásico Screening",
    venue: "KickOff Hub — Lagos",
    date: "Sun, Mar 23",
    time: "20:00 WAT",
    price: "₦2,000",
    spots: 22,
    totalSpots: 60,
    featured: true,
    badge: "KickOff Exclusive",
  },
  {
    id: 3,
    category: "premier-league",
    homeTeam: "Arsenal vs Chelsea",
    event: "Premier League — Matchday 28",
    venue: "Emirates Stadium, London",
    date: "Sat, Mar 22",
    time: "15:00 GMT",
    price: "£65",
    spots: 120,
    totalSpots: 500,
    featured: false,
  },
  {
    id: 4,
    category: "premier-league",
    homeTeam: "Liverpool vs Man City",
    event: "Premier League — Matchday 28",
    venue: "Anfield, Liverpool",
    date: "Sun, Mar 23",
    time: "16:30 GMT",
    price: "£78",
    spots: 45,
    totalSpots: 300,
    featured: false,
  },
  {
    id: 5,
    category: "la-liga",
    homeTeam: "Real Madrid vs Barcelona",
    event: "La Liga — Jornada 29",
    venue: "Santiago Bernabéu, Madrid",
    date: "Sun, Mar 23",
    time: "21:00 CET",
    price: "€120",
    spots: 200,
    totalSpots: 800,
    featured: false,
  },
  {
    id: 6,
    category: "champions-league",
    homeTeam: "Bayern vs Inter Milan",
    event: "UCL Quarter-Final — Leg 1",
    venue: "Allianz Arena, Munich",
    date: "Tue, Apr 8",
    time: "21:00 CET",
    price: "€95",
    spots: 310,
    totalSpots: 600,
    featured: false,
  },
  {
    id: 7,
    category: "bundesliga",
    homeTeam: "Dortmund vs Bayern",
    event: "Bundesliga — Spieltag 26",
    venue: "Signal Iduna Park, Dortmund",
    date: "Sat, Mar 29",
    time: "18:30 CET",
    price: "€55",
    spots: 180,
    totalSpots: 500,
    featured: false,
  },
  {
    id: 8,
    category: "serie-a",
    homeTeam: "AC Milan vs Juventus",
    event: "Serie A — Giornata 28",
    venue: "San Siro, Milan",
    date: "Sun, Mar 30",
    time: "20:45 CET",
    price: "€70",
    spots: 95,
    totalSpots: 400,
    featured: false,
  },
  {
    id: 9,
    category: "cups",
    homeTeam: "Man Utd vs Tottenham",
    event: "FA Cup — Semi-Final",
    venue: "Wembley Stadium, London",
    date: "Sat, Apr 12",
    time: "17:30 GMT",
    price: "£85",
    spots: 500,
    totalSpots: 2000,
    featured: false,
  },
];

const TicketsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filtered = mockTickets.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      t.homeTeam.toLowerCase().includes(search.toLowerCase()) ||
      t.venue.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Always show KickOff Hub tickets first
  const sorted = [...filtered].sort((a, b) => {
    if (a.category === "kickoff-hub" && b.category !== "kickoff-hub") return -1;
    if (b.category === "kickoff-hub" && a.category !== "kickoff-hub") return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Ticket className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Tickets</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search matches, venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Tickets list */}
      <div className="space-y-3 p-4">
        {sorted.map((ticket) => (
          <Card
            key={ticket.id}
            className={`overflow-hidden border-border ${
              ticket.featured ? "ring-1 ring-primary/30" : ""
            }`}
          >
            {ticket.badge && (
              <div className="bg-primary px-3 py-1">
                <div className="flex items-center gap-1.5">
                  <Star className="h-3 w-3 text-primary-foreground" />
                  <span className="text-[11px] font-semibold text-primary-foreground">
                    {ticket.badge}
                  </span>
                </div>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-foreground">{ticket.homeTeam}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{ticket.event}</p>

              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{ticket.venue}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{ticket.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{ticket.time}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-foreground">{ticket.price}</span>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{ticket.spots} spots left</span>
                  </div>
                </div>
                <Button size="sm" className="rounded-full px-5">
                  Get Ticket
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {sorted.length === 0 && (
          <div className="py-16 text-center">
            <Ticket className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
