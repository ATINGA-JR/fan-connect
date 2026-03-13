import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard";

const tabs = ["Matches", "Tables", "Stats"] as const;
const matchFilters = ["Live", "Today", "Upcoming", "Finished"] as const;

const competitions = ["All", "Premier League", "La Liga", "Champions League", "Serie A", "Bundesliga", "Ligue 1"] as const;

const mockMatches = [
  // Premier League
  { homeTeam: "Liverpool", awayTeam: "Man City", homeScore: 1, awayScore: 1, time: "34'", competition: "Premier League", status: "live" as const },
  { homeTeam: "Arsenal", awayTeam: "Chelsea", time: "20:00", competition: "Premier League", status: "upcoming" as const },
  { homeTeam: "Tottenham", awayTeam: "Newcastle", homeScore: 2, awayScore: 0, time: "FT", competition: "Premier League", status: "finished" as const },
  { homeTeam: "Man United", awayTeam: "Aston Villa", time: "17:30", competition: "Premier League", status: "upcoming" as const },
  // La Liga
  { homeTeam: "Real Madrid", awayTeam: "FC Barcelona", homeScore: 2, awayScore: 1, time: "67'", competition: "La Liga", status: "live" as const },
  { homeTeam: "Atletico Madrid", awayTeam: "Sevilla", time: "21:00", competition: "La Liga", status: "upcoming" as const },
  { homeTeam: "Real Sociedad", awayTeam: "Villarreal", homeScore: 1, awayScore: 1, time: "FT", competition: "La Liga", status: "finished" as const },
  // Champions League
  { homeTeam: "PSG", awayTeam: "Bayern Munich", time: "21:00", competition: "Champions League", status: "upcoming" as const },
  { homeTeam: "Real Madrid", awayTeam: "Man City", time: "21:00", competition: "Champions League", status: "upcoming" as const },
  { homeTeam: "Inter Milan", awayTeam: "Atletico Madrid", homeScore: 1, awayScore: 0, time: "FT", competition: "Champions League", status: "finished" as const },
  // Serie A
  { homeTeam: "Inter Milan", awayTeam: "AC Milan", homeScore: 3, awayScore: 1, time: "FT", competition: "Serie A", status: "finished" as const },
  { homeTeam: "Juventus", awayTeam: "Napoli", homeScore: 0, awayScore: 0, time: "12'", competition: "Serie A", status: "live" as const },
  { homeTeam: "Roma", awayTeam: "Lazio", time: "20:45", competition: "Serie A", status: "upcoming" as const },
  // Bundesliga
  { homeTeam: "Dortmund", awayTeam: "RB Leipzig", homeScore: 2, awayScore: 2, time: "FT", competition: "Bundesliga", status: "finished" as const },
  { homeTeam: "Bayern Munich", awayTeam: "Leverkusen", time: "18:30", competition: "Bundesliga", status: "upcoming" as const },
  // Ligue 1
  { homeTeam: "PSG", awayTeam: "Marseille", homeScore: 2, awayScore: 0, time: "55'", competition: "Ligue 1", status: "live" as const },
  { homeTeam: "Lyon", awayTeam: "Monaco", time: "21:00", competition: "Ligue 1", status: "upcoming" as const },
];

const standings = [
  { pos: 1, team: "Arsenal", p: 30, gd: "+42", pts: 71 },
  { pos: 2, team: "Man City", p: 30, gd: "+38", pts: 68 },
  { pos: 3, team: "Liverpool", p: 30, gd: "+35", pts: 67 },
  { pos: 4, team: "Aston Villa", p: 30, gd: "+18", pts: 60 },
  { pos: 5, team: "Tottenham", p: 30, gd: "+12", pts: 56 },
];

const ScoresPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Matches");
  const [matchFilter, setMatchFilter] = useState<typeof matchFilters[number]>("Live");
  const [selectedCompetition, setSelectedCompetition] = useState<typeof competitions[number]>("All");

  const filteredMatches = mockMatches.filter((m) => {
    const statusMatch =
      matchFilter === "Live" ? m.status === "live" :
      matchFilter === "Upcoming" ? m.status === "upcoming" :
      matchFilter === "Finished" ? m.status === "finished" : true;
    const compMatch = selectedCompetition === "All" || m.competition === selectedCompetition;
    return statusMatch && compMatch;
  });

  // Group matches by competition
  const groupedMatches = filteredMatches.reduce<Record<string, typeof filteredMatches>>((acc, match) => {
    if (!acc[match.competition]) acc[match.competition] = [];
    acc[match.competition].push(match);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Scores</h1>
        </div>

        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === "Matches" && (
        <div className="p-4">
          {/* Filters */}
          <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {matchFilters.map((f) => (
              <button
                key={f}
                onClick={() => setMatchFilter(f)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  matchFilter === f
                    ? "gradient-pitch text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match, i) => <MatchCard key={i} {...match} />)
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">No matches in this category</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "Tables" && (
        <div className="p-4">
          <h2 className="mb-3 text-sm font-semibold text-primary">Premier League</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">#</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Team</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">P</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">GD</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row) => (
                  <tr key={row.pos} className="border-b border-border last:border-0">
                    <td className="px-3 py-2.5 text-foreground font-medium">{row.pos}</td>
                    <td className="px-3 py-2.5 text-foreground font-medium">{row.team}</td>
                    <td className="px-3 py-2.5 text-center text-muted-foreground">{row.p}</td>
                    <td className="px-3 py-2.5 text-center text-muted-foreground">{row.gd}</td>
                    <td className="px-3 py-2.5 text-center font-bold text-primary">{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Stats" && (
        <div className="p-4">
          <h2 className="mb-3 text-sm font-semibold text-primary">Top Scorers — Premier League</h2>
          <div className="grid gap-2">
            {[
              { name: "Erling Haaland", team: "Man City", goals: 22 },
              { name: "Mohamed Salah", team: "Liverpool", goals: 18 },
              { name: "Alexander Isak", team: "Newcastle", goals: 16 },
              { name: "Bukayo Saka", team: "Arsenal", goals: 14 },
              { name: "Ollie Watkins", team: "Aston Villa", goals: 13 },
            ].map((player, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.team}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">{player.goals}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoresPage;
