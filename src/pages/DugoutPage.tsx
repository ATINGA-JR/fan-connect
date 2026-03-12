import { ArrowLeft, Mic, Users, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const liveSpaces = [
  { id: 1, title: "Pre-match: Arsenal vs Chelsea", host: "TacticsFC", listeners: 342, live: true },
  { id: 2, title: "Transfer Deadline Day Watch", host: "KickoffHQ", listeners: 1200, live: true },
];

const scheduled = [
  { id: 3, title: "UCL Quarter-Final Preview", host: "ChampionsChat", time: "Today, 8:00 PM", interested: 89 },
  { id: 4, title: "Fantasy GW30 Strategy", host: "FPL_Kings", time: "Tomorrow, 6:00 PM", interested: 156 },
];

const DugoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground">The Dugout</h1>
          <p className="text-xs text-muted-foreground">Live audio spaces for football fans</p>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {/* Create space CTA */}
        <Button className="w-full gap-2">
          <Plus className="h-4 w-4" /> Start a Space
        </Button>

        {/* Live Now */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" /> Live Now
          </h2>
          <div className="space-y-3">
            {liveSpaces.map((space) => (
              <Card key={space.id} className="border-primary/30 bg-card p-4">
                <p className="font-semibold text-foreground text-sm">{space.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Hosted by {space.host}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {space.listeners.toLocaleString()} listening
                  </span>
                  <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                    <Mic className="h-3.5 w-3.5" /> Join
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Scheduled */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" /> Upcoming
          </h2>
          <div className="space-y-3">
            {scheduled.map((space) => (
              <Card key={space.id} className="bg-card p-4">
                <p className="font-semibold text-foreground text-sm">{space.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Hosted by {space.host} · {space.time}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{space.interested} interested</span>
                  <Button size="sm" variant="outline" className="text-xs">Remind Me</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DugoutPage;
