import { Plus, Image, BarChart3, Hash, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const FloatingPostButton = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const { user } = useAuth();

  const handlePost = async () => {
    if (!text.trim() || !user) return;
    setPosting(true);
    const { error } = await supabase.from("bants").insert({ user_id: user.id, content: text.trim() });
    setPosting(false);
    if (error) {
      toast.error("Failed to post", { description: error.message });
      return;
    }
    setText("");
    setOpen(false);
    toast.success("Bant posted");
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full gradient-pitch shadow-glow transition-transform hover:scale-105 active:scale-95"
      >
        <Plus className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Composer Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg animate-slide-up rounded-t-2xl border border-border bg-card p-4 sm:rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={handlePost}
                disabled={!text.trim() || posting}
                className="rounded-full gradient-pitch px-4 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                {posting ? "Posting..." : "Post Bant"}
              </button>
            </div>

            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full gradient-pitch" />
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's your football take?"
                className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                rows={4}
                autoFocus
              />
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
              <button className="text-primary hover:text-pitch-glow"><Image className="h-5 w-5" /></button>
              <button className="text-primary hover:text-pitch-glow"><BarChart3 className="h-5 w-5" /></button>
              <button className="text-primary hover:text-pitch-glow"><Hash className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingPostButton;
