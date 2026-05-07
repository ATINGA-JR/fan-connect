import { MessageSquare, Heart, Share, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const GoalpostIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="2" y="3" width="12" height="9" rx="0.5" />
    <line x1="2" y1="12" x2="2" y2="15" />
    <line x1="14" y1="12" x2="14" y2="15" />
  </svg>
);

interface BantCardProps {
  id?: string;
  name: string;
  username: string;
  time: string;
  content: string;
  tags?: string[];
  replies?: number;
  rebants?: number;
  likes?: number;
  avatarColor?: string;
  avatarUrl?: string | null;
}

const BantCard = ({ id, name, username, time, content, tags, avatarColor = "gradient-pitch", avatarUrl }: BantCardProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [rebanted, setRebanted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [rebantCount, setRebantCount] = useState(0);
  const [replyCount, setReplyCount] = useState(0);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refresh = async () => {
    if (!id) return;
    const [{ count: lc }, { count: rc }, { count: repC }] = await Promise.all([
      supabase.from("bant_likes").select("user_id", { head: true, count: "exact" }).eq("bant_id", id),
      supabase.from("bant_rebants").select("user_id", { head: true, count: "exact" }).eq("bant_id", id),
      supabase.from("bants").select("id", { head: true, count: "exact" }).eq("parent_id", id),
    ]);
    setLikeCount(lc ?? 0);
    setRebantCount(rc ?? 0);
    setReplyCount(repC ?? 0);
    if (user) {
      const [{ data: l }, { data: r }] = await Promise.all([
        supabase.from("bant_likes").select("user_id").eq("bant_id", id).eq("user_id", user.id).maybeSingle(),
        supabase.from("bant_rebants").select("user_id").eq("bant_id", id).eq("user_id", user.id).maybeSingle(),
      ]);
      setLiked(!!l);
      setRebanted(!!r);
    }
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [id, user?.id]);

  const handleLike = async () => {
    if (!user || !id) { toast.error("Please log in"); return; }
    if (liked) {
      setLiked(false); setLikeCount((c) => c - 1);
      await supabase.from("bant_likes").delete().eq("bant_id", id).eq("user_id", user.id);
    } else {
      setLiked(true); setLikeCount((c) => c + 1);
      await supabase.from("bant_likes").insert({ bant_id: id, user_id: user.id });
    }
  };

  const handleRebant = async () => {
    if (!user || !id) { toast.error("Please log in"); return; }
    if (rebanted) {
      setRebanted(false); setRebantCount((c) => c - 1);
      await supabase.from("bant_rebants").delete().eq("bant_id", id).eq("user_id", user.id);
    } else {
      setRebanted(true); setRebantCount((c) => c + 1);
      await supabase.from("bant_rebants").insert({ bant_id: id, user_id: user.id });
      toast.success("Rebanted");
    }
  };

  const handleReply = async () => {
    if (!user || !id || !replyText.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("bants").insert({ user_id: user.id, content: replyText.trim(), parent_id: id });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setReplyText(""); setReplyOpen(false); setReplyCount((c) => c + 1);
    toast.success("Reply posted");
  };

  return (
    <article className="border-b border-border px-4 py-3 transition-colors hover:bg-secondary/30">
      <div className="flex gap-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
        ) : (
          <div className={`h-10 w-10 shrink-0 rounded-full ${avatarColor}`} />
        )}
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
            <button onClick={() => setReplyOpen(true)} className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{replyCount}</span>
            </button>
            <button
              onClick={handleRebant}
              className={`flex items-center gap-1.5 transition-colors ${rebanted ? "text-pitch-glow" : "text-muted-foreground hover:text-pitch-glow"}`}
            >
              <GoalpostIcon className="h-4 w-4" />
              <span className="text-xs">{rebantCount}</span>
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

      <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to @{username}</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground line-clamp-2">{content}</p>
          <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Post your reply" rows={4} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyOpen(false)} disabled={submitting}>Cancel</Button>
            <Button onClick={handleReply} disabled={submitting || !replyText.trim()} className="gradient-pitch text-primary-foreground">
              {submitting ? "Posting..." : "Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
};

export default BantCard;
