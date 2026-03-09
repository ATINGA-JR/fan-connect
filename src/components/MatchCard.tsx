interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  competition: string;
  status: "live" | "upcoming" | "finished";
}

const MatchCard = ({ homeTeam, awayTeam, homeScore, awayScore, time, competition, status }: MatchCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary/30">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">{competition}</span>
        {status === "live" && (
          <span className="flex items-center gap-1.5 rounded-full bg-live/10 px-2 py-0.5 text-xs font-semibold text-live">
            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse-live" />
            LIVE
          </span>
        )}
        {status === "upcoming" && (
          <span className="text-xs text-muted-foreground">{time}</span>
        )}
        {status === "finished" && (
          <span className="text-xs text-muted-foreground">FT</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{homeTeam}</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{awayTeam}</p>
        </div>

        {(homeScore !== undefined && awayScore !== undefined) && (
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">{homeScore}</p>
            <p className="mt-1 text-sm font-bold text-foreground">{awayScore}</p>
          </div>
        )}
      </div>

      {status === "live" && (
        <div className="mt-3 text-xs font-medium text-primary">{time}</div>
      )}
    </div>
  );
};

export default MatchCard;
