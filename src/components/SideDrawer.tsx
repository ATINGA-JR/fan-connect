import { X, User, Bookmark, List, Radio, Ticket, Settings, HelpCircle, Users, Mic, ShoppingBag, Newspaper, Building2, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Profile", icon: User, path: "/profile" },
  { label: "The Dugout", icon: Mic, path: "/hub" },
  { label: "Communities", icon: Users, path: "/communities" },
  { label: "Bookmarks", icon: Bookmark, path: "/bookmarks" },
  { label: "Creator Studio", icon: Radio, path: "/creator" },
  { label: "Tickets", icon: Ticket, path: "/tickets" },
];

const newSections = [
  { label: "FanBoot", icon: ShoppingBag, path: "/marketplace", desc: "Vendors & merch" },
  { label: "News & Articles", icon: Newspaper, path: "/news", desc: "Journos & outlets" },
  { label: "Club Statements", icon: Building2, path: "/club-statements", desc: "Official updates" },
];

const systemItems = [
  { label: "Settings & Privacy", icon: Settings, path: "/settings" },
  { label: "Help Center", icon: HelpCircle, path: "/help" },
];

const SideDrawer = ({ open, onClose }: SideDrawerProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-border bg-card transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full gradient-pitch" />
              <div>
                <p className="text-sm font-semibold text-foreground">Football Fan</p>
                <p className="text-xs text-muted-foreground">@kickoff_user</p>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-4 border-b border-border px-4 py-3">
            <span className="text-sm">
              <strong className="text-foreground">128</strong>{" "}
              <span className="text-muted-foreground">Following</span>
            </span>
            <span className="text-sm">
              <strong className="text-foreground">1.2K</strong>{" "}
              <span className="text-muted-foreground">Followers</span>
            </span>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto py-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { onClose(); navigate(item.path); }}
                className="flex w-full items-center gap-4 px-4 py-3 text-foreground transition-colors hover:bg-secondary"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}

            <div className="my-2 border-t border-border" />

            {/* New sections: FanBoot, News, Club Statements */}
            <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </p>
            {newSections.map((item) => (
              <button
                key={item.label}
                onClick={() => { onClose(); navigate(item.path); }}
                className="flex w-full items-center gap-4 px-4 py-3 text-foreground transition-colors hover:bg-secondary"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <span className="text-sm font-medium">{item.label}</span>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
              </button>
            ))}

            <div className="my-2 border-t border-border" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-4 px-4 py-3 text-foreground transition-colors hover:bg-secondary"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-muted-foreground" /> : <Moon className="h-5 w-5 text-muted-foreground" />}
              <span className="text-sm font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <div className="my-2 border-t border-border" />

            {systemItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { onClose(); navigate(item.path); }}
                className="flex w-full items-center gap-4 px-4 py-3 text-foreground transition-colors hover:bg-secondary"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
