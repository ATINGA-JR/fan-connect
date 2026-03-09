import { ArrowLeft, Newspaper, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockArticles = [
  { title: "Transfer Window: Top 10 Deals That Could Happen This Summer", outlet: "Goal.com", author: "Fabrizio Romano", time: "25m ago", tag: "Transfers" },
  { title: "Tactical Analysis: How Arteta's 3-2-5 Is Changing Modern Football", outlet: "The Athletic", author: "Michael Cox", time: "1h ago", tag: "Tactics" },
  { title: "Champions League QF Draw — What Each Club Wants", outlet: "ESPN FC", author: "Mark Ogden", time: "2h ago", tag: "UCL" },
  { title: "Exclusive: Inside PSG's Dressing Room After El Clásico Win", outlet: "L'Equipe", author: "Julien Laurens", time: "4h ago", tag: "Feature" },
  { title: "Premier League Title Race: Statistical Breakdown", outlet: "Sky Sports", author: "Adam Bate", time: "6h ago", tag: "Analysis" },
];

const NewsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Newspaper className="h-5 w-5 text-primary" />
          <h1 className="text-base font-bold text-foreground">News & Articles</h1>
        </div>
      </header>

      <div>
        {mockArticles.map((article, i) => (
          <div key={i} className="border-b border-border px-4 py-4 transition-colors hover:bg-secondary/50">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{article.tag}</span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {article.time}
              </span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">{article.title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {article.author} · <span className="text-foreground/70">{article.outlet}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
