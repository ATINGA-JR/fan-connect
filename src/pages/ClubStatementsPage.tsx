import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockStatements = [
  { club: "Manchester United", badge: "🔴", title: "Club Statement on New Ownership Structure", time: "1h ago", excerpt: "Manchester United confirms the completion of the ownership restructuring process effective immediately..." },
  { club: "Liverpool F.C.", badge: "🔴", title: "Anfield Road Stand Expansion Complete", time: "3h ago", excerpt: "We are delighted to confirm the expanded Anfield Road Stand is now fully operational with a capacity increase to 61,000..." },
  { club: "Juventus", badge: "⚪⚫", title: "Official: New Head Coach Appointment", time: "5h ago", excerpt: "Juventus Football Club announces the appointment of the new first-team head coach on a three-year contract..." },
  { club: "Bayern Munich", badge: "🔴⚪", title: "Statement Regarding Player Welfare Policy", time: "8h ago", excerpt: "FC Bayern München has adopted a comprehensive player welfare programme in partnership with leading medical institutions..." },
];

const ClubStatementsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Building2 className="h-5 w-5 text-primary" />
          <h1 className="text-base font-bold text-foreground">Club Statements</h1>
        </div>
      </header>

      <div>
        {mockStatements.map((s, i) => (
          <div key={i} className="border-b border-border px-4 py-4 transition-colors hover:bg-secondary/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">{s.badge}</span>
              <span className="text-sm font-semibold text-foreground">{s.club}</span>
              <span className="text-xs text-muted-foreground">· {s.time}</span>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">{s.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.excerpt}</p>
            <button className="mt-2 text-xs font-medium text-primary hover:underline">Read full statement →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubStatementsPage;
