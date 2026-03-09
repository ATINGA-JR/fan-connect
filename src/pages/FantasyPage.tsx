import { ArrowLeft, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockTeam = [
  { name: "Mohamed Salah", pos: "FWD", pts: 142, isCaptain: true },
  { name: "Erling Haaland", pos: "FWD", pts: 134 },
  { name: "Bukayo Saka", pos: "MID", pts: 128 },
  { name: "Martin Ødegaard", pos: "MID", pts: 112 },
  { name: "Bruno Fernandes", pos: "MID", pts: 105 },
  { name: "William Saliba", pos: "DEF", pts: 98 },
  { name: "Virgil van Dijk", pos: "DEF", pts: 91 },
];

const FantasyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Fantasy Football</h1>
        </div>
      </header>

      {/* Dashboard */}
      <div className="p-4">
        <div className="rounded-lg border border-border bg-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">My Team</h2>
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">1,247</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">68</p>
              <p className="text-xs text-muted-foreground">GW Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12.4K</p>
              <p className="text-xs text-muted-foreground">Global Rank</p>
            </div>
          </div>
        </div>

        <h3 className="mb-3 text-sm font-semibold text-primary">Squad</h3>
        <div className="grid gap-2">
          {mockTeam.map((player, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  {player.pos}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {player.name}
                    {player.isCaptain && <span className="ml-1.5 text-xs text-primary">(C)</span>}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{player.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FantasyPage;
