import { ArrowLeft, Settings, MapPin, Calendar, LinkIcon, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Cover */}
      <div className="relative h-32 gradient-pitch">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 rounded-full bg-background/60 p-1.5 backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Avatar + Edit */}
      <div className="relative px-4">
        <div className="-mt-12 flex items-end justify-between">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">FF</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mb-1 gap-1.5">
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Button>
        </div>

        {/* Name */}
        <div className="mt-3">
          <h1 className="text-lg font-bold text-foreground">Football Fan</h1>
          <p className="text-sm text-muted-foreground">@kickoff_user</p>
        </div>

        {/* Bio */}
        <p className="mt-2 text-sm text-foreground">
          Die-hard football enthusiast ⚽ | Tactics nerd | Fantasy league champion 🏆
        </p>

        {/* Meta */}
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Lagos, Nigeria</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined March 2025</span>
          <span className="flex items-center gap-1"><LinkIcon className="h-3.5 w-3.5" /> kickoff.fan/user</span>
        </div>

        {/* Stats */}
        <div className="mt-3 flex gap-4 text-sm">
          <span><strong className="text-foreground">128</strong> <span className="text-muted-foreground">Following</span></span>
          <span><strong className="text-foreground">1.2K</strong> <span className="text-muted-foreground">Followers</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-border">
        {["Bants", "Replies", "Media", "Likes"].map((tab, i) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              i === 0 ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground text-sm">Your bants will appear here.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
