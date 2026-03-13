import { useState } from "react";
import { ArrowLeft, Plus, Video, Mic, FileText, Eye, Heart, MessageCircle, Share2, TrendingUp, BarChart3, Clock, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const mockContent = [
  {
    id: 1,
    type: "video",
    title: "Arsenal's Tactical Shift Under Arteta — Full Breakdown",
    status: "published",
    date: "Mar 10, 2026",
    views: 4520,
    likes: 312,
    comments: 45,
    shares: 28,
  },
  {
    id: 2,
    type: "podcast",
    title: "Transfer Window Deep Dive — Who's Moving This Summer?",
    status: "published",
    date: "Mar 8, 2026",
    views: 2180,
    likes: 198,
    comments: 67,
    shares: 41,
  },
  {
    id: 3,
    type: "article",
    title: "Why The Bundesliga Produces Better Young Talent",
    status: "draft",
    date: "Mar 12, 2026",
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: 4,
    type: "video",
    title: "Top 10 Goals of the Month — February 2026",
    status: "published",
    date: "Mar 2, 2026",
    views: 12800,
    likes: 890,
    comments: 123,
    shares: 256,
  },
  {
    id: 5,
    type: "podcast",
    title: "Matchday Preview — Gameweek 28 Predictions",
    status: "scheduled",
    date: "Mar 14, 2026",
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  },
];

const tools = [
  { icon: Video, label: "Record Video", desc: "Capture and upload match reactions or analysis" },
  { icon: Mic, label: "Record Podcast", desc: "Start an audio episode for your channel" },
  { icon: FileText, label: "Write Article", desc: "Publish takes, previews, or opinion pieces" },
  { icon: Settings2, label: "Channel Settings", desc: "Manage your creator profile and preferences" },
];

const typeIcon = (type: string) => {
  if (type === "video") return <Video className="h-4 w-4 text-primary" />;
  if (type === "podcast") return <Mic className="h-4 w-4 text-primary" />;
  return <FileText className="h-4 w-4 text-primary" />;
};

const statusBadge = (status: string) => {
  if (status === "published")
    return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0 text-[10px]">Published</Badge>;
  if (status === "draft")
    return <Badge variant="secondary" className="text-[10px]">Draft</Badge>;
  return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0 text-[10px]">Scheduled</Badge>;
};

const CreatorStudioPage = () => {
  const navigate = useNavigate();

  const published = mockContent.filter((c) => c.status === "published");
  const totalViews = published.reduce((s, c) => s + c.views, 0);
  const totalLikes = published.reduce((s, c) => s + c.likes, 0);
  const totalComments = published.reduce((s, c) => s + c.comments, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Creator Studio</h1>
          </div>
          <Button size="sm" className="gap-1.5 rounded-full">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mx-4 mt-3 w-[calc(100%-2rem)] grid grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {/* Dashboard / Insights */}
        <TabsContent value="dashboard" className="p-4 space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center border-border">
              <Eye className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-lg font-bold text-foreground">{totalViews.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Total Views</p>
            </Card>
            <Card className="p-3 text-center border-border">
              <Heart className="mx-auto h-5 w-5 text-destructive" />
              <p className="mt-1 text-lg font-bold text-foreground">{totalLikes.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Total Likes</p>
            </Card>
            <Card className="p-3 text-center border-border">
              <MessageCircle className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-lg font-bold text-foreground">{totalComments.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Comments</p>
            </Card>
          </div>

          {/* Performance card */}
          <Card className="border-border p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Performance Summary</h3>
            </div>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Engagement rate</span>
                <span className="text-sm font-semibold text-foreground">8.4%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "68%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Avg. watch time</span>
                <span className="text-sm font-semibold text-foreground">4m 32s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">New subscribers (7d)</span>
                <span className="text-sm font-semibold text-primary">+127</span>
              </div>
            </div>
          </Card>

          {/* Top content */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Top Performing
            </h3>
            {published
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((item) => (
                <Card key={item.id} className="mb-2 flex items-center gap-3 border-border p-3">
                  {typeIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {item.views.toLocaleString()} views · {item.likes} likes
                    </p>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Content list */}
        <TabsContent value="content" className="p-4 space-y-3">
          {mockContent.map((item) => (
            <Card key={item.id} className="border-border p-4">
              <div className="flex items-start gap-3">
                {typeIcon(item.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {statusBadge(item.status)}
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                  {item.status === "published" && (
                    <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {item.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" /> {item.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" /> {item.shares}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Tools */}
        <TabsContent value="tools" className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            Everything you need to create and manage your content.
          </p>
          {tools.map((tool) => (
            <Card
              key={tool.label}
              className="flex cursor-pointer items-center gap-4 border-border p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <tool.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{tool.label}</p>
                <p className="text-[11px] text-muted-foreground">{tool.desc}</p>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorStudioPage;
