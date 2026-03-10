import { MessageSquare, Heart, Share, Bookmark } from "lucide-react";
import { useState } from "react";

/* Simple goalpost icon – a rectangular frame */
const GoalpostIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="2" y="3" width="12" height="9" rx="0.5" />
    <line x1="2" y1="12" x2="2" y2="15" />
    <line x1="14" y1="12" x2="14" y2="15" />
  </svg>
);

interface BantCardProps {
  name: string;
  username: string;
  time: string;
  content: string;
  tags?: string[];
  replies: number;
  rebants: number;
  likes: number;
  avatarColor?: string;
}

const BantCard = ({ name, username, time, content, tags, replies, rebants, likes, avatarColor = "gradient-pitch" }: BantCardProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="border-b border-border px-4 py-3 transition-colors hover:bg-secondary/30">
      <div className="flex gap-3">
        <div className={`h-10 w-10 shrink-0 rounded-full ${avatarColor}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">{name}</span>
            <span className="text-sm text-muted-foreground">@{username}</span>
            <span className="text-sm text-muted-foreground">· {time}</span>
          </div>

          <p className="mt-1 text-sm leading-relaxed text-foreground">{content}</p>

          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-2.5 flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{replies}</span>
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-pitch-glow">
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{rebants}</span>
            </button>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition-colors ${liked ? "text-live" : "text-muted-foreground hover:text-live"}`}
            >
              <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
              <span className="text-xs">{likeCount}</span>
            </button>
            <button className="text-muted-foreground transition-colors hover:text-primary">
              <Share className="h-4 w-4" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`ml-auto transition-colors ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BantCard;
