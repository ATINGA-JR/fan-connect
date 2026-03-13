import { ArrowLeft, Bookmark, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BantCard from "@/components/BantCard";

const bookmarkedBants = [
  {
    name: "Carlos M.",
    username: "carlos_ftbl",
    time: "2d",
    content: "Arsenal F.C. need a striker before next season. The creativity is there but the finishing has been awful lately. Who should they sign? 🤔",
    tags: ["Arsenal", "Premier League"],
    replies: 12,
    rebants: 34,
    likes: 89,
  },
  {
    name: "Pedro L.",
    username: "pedro_fcb",
    time: "3d",
    content: "Lamine Yamal at 18 doing things most players can't do at 28. Barcelona's academy continues to produce greatness. La Masia forever. 🔴🔵",
    tags: ["Barcelona", "La Liga"],
    replies: 67,
    rebants: 230,
    likes: 1024,
  },
  {
    name: "Amina B.",
    username: "amina_blues",
    time: "5d",
    content: "Chelsea's midfield rebuild is actually working. The way they controlled possession against Spurs was impressive. Palmer is a generational talent.",
    tags: ["Chelsea", "Premier League"],
    replies: 23,
    rebants: 56,
    likes: 198,
  },
];

const BookmarksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Bookmarks</h1>
            <p className="text-xs text-muted-foreground">{bookmarkedBants.length} saved bants</p>
          </div>
        </div>
      </header>

      {bookmarkedBants.length > 0 ? (
        <div>
          {bookmarkedBants.map((bant, i) => (
            <BantCard key={i} {...bant} />
          ))}
        </div>
      ) : (
        <div className="px-4 py-16 text-center">
          <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium text-foreground">No bookmarks yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Save bants to read later</p>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
