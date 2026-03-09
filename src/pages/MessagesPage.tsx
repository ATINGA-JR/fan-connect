import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockConversations = [
  { name: "Carlos M.", username: "@carlos_ftbl", lastMessage: "Did you see that goal? 🤯", time: "2m", unread: 3 },
  { name: "Sarah K.", username: "@sarah_goat", lastMessage: "Agreed, Vinícius is unreal", time: "15m", unread: 0 },
  { name: "Manchester United Fans", username: "Group · 24 members", lastMessage: "James: We need a new manager", time: "1h", unread: 12 },
  { name: "Amina B.", username: "@amina_blues", lastMessage: "Palmer masterclass 🔥", time: "3h", unread: 0 },
];

const MessagesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Messages</h1>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div>
        {mockConversations.map((conv, i) => (
          <button key={i} className="flex w-full items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-secondary/30">
            <div className="h-12 w-12 shrink-0 rounded-full gradient-pitch" />
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="truncate text-sm font-semibold text-foreground">{conv.name}</span>
                <span className="text-xs text-muted-foreground">{conv.time}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground mt-0.5">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full gradient-pitch text-[10px] font-bold text-primary-foreground">
                {conv.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
