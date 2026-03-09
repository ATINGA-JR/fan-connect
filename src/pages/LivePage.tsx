import { ArrowLeft, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockRooms = [
  { title: "Was the penalty fair in Liverpool vs Chelsea?", host: "James T.", listeners: 342, live: true },
  { title: "Champions League predictions — Quarter Finals", host: "Maria G.", listeners: 1204, live: true },
  { title: "Transfer deadline day special", host: "KickOff Official", listeners: 0, live: false, time: "Today, 19:00" },
  { title: "Ballon d'Or debate — who deserves it?", host: "Carlos M.", listeners: 0, live: false, time: "Tomorrow, 18:00" },
];

const LivePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Live Spaces</h1>
        </div>
      </header>

      <div className="p-4 grid gap-3">
        {mockRooms.map((room, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{room.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Hosted by {room.host}</p>
              </div>
              {room.live && (
                <span className="flex items-center gap-1.5 rounded-full bg-live/10 px-2 py-0.5 text-xs font-semibold text-live">
                  <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-live" />
                  LIVE
                </span>
              )}
            </div>
            {room.live ? (
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">{room.listeners.toLocaleString()} listening</span>
                <button className="rounded-full gradient-pitch px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                  Join
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">{room.time}</span>
                <button className="rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
                  Remind me
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePage;
