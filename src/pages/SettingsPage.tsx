import { useState } from "react";
import { ArrowLeft, User, Shield, Bell, Eye, Lock, Globe, Palette, LogOut, ChevronRight, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";

type SettingsSection = "main" | "account" | "privacy" | "notifications" | "display";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [section, setSection] = useState<SettingsSection>("main");

  // Privacy toggles
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowDMs, setAllowDMs] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  // Notification toggles
  const [pushNotifs, setPushNotifs] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [communityNotifs, setCommunityNotifs] = useState(true);
  const [marketplaceNotifs, setMarketplaceNotifs] = useState(false);
  const [emailDigest, setEmailDigest] = useState(false);

  const goBack = () => {
    if (section === "main") navigate(-1);
    else setSection("main");
  };

  const sectionTitle: Record<SettingsSection, string> = {
    main: "Settings & Privacy",
    account: "Account",
    privacy: "Privacy",
    notifications: "Notifications",
    display: "Display",
  };

  const SettingRow = ({
    icon: Icon,
    label,
    description,
    onClick,
    trailing,
  }: {
    icon: React.ElementType;
    label: string;
    description?: string;
    onClick?: () => void;
    trailing?: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary"
    >
      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {trailing || <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </button>
  );

  const ToggleRow = ({
    label,
    description,
    checked,
    onCheckedChange,
  }: {
    label: string;
    description?: string;
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={goBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">{sectionTitle[section]}</h1>
        </div>
      </header>

      {/* Main menu */}
      {section === "main" && (
        <div className="py-2">
          <SettingRow icon={User} label="Account" description="Username, email, password" onClick={() => setSection("account")} />
          <SettingRow icon={Shield} label="Privacy" description="Control who sees your activity" onClick={() => setSection("privacy")} />
          <SettingRow icon={Bell} label="Notifications" description="Match alerts, community updates" onClick={() => setSection("notifications")} />
          <SettingRow icon={Palette} label="Display" description="Theme and appearance" onClick={() => setSection("display")} />

          <Separator className="my-2" />

          <SettingRow icon={Globe} label="Language" description="English" trailing={<span className="text-xs text-muted-foreground">English</span>} />

          <Separator className="my-2" />

          <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary">
            <LogOut className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">Log Out</span>
          </button>
        </div>
      )}

      {/* Account section */}
      {section === "account" && (
        <div className="py-2">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Football Fan</p>
                <p className="text-xs text-muted-foreground">@kickoff_user</p>
              </div>
            </div>
          </div>
          <Separator />
          <SettingRow icon={User} label="Edit Profile" description="Name, bio, avatar" trailing={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
          <SettingRow icon={Lock} label="Change Password" trailing={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
          <SettingRow icon={Globe} label="Email" description="fan@kickoff.com" trailing={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />

          <Separator className="my-2" />
          <div className="px-4 py-3">
            <p className="text-xs text-muted-foreground">Account created March 2026</p>
          </div>
        </div>
      )}

      {/* Privacy section */}
      {section === "privacy" && (
        <div className="py-2">
          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Account Privacy</p>
          <ToggleRow label="Private Account" description="Only approved followers can see your bants" checked={privateAccount} onCheckedChange={setPrivateAccount} />
          <ToggleRow label="Show Online Status" description="Let others see when you're active" checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />

          <Separator className="my-2" />

          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Interactions</p>
          <ToggleRow label="Allow Direct Messages" description="Let anyone send you messages" checked={allowDMs} onCheckedChange={setAllowDMs} />
          <ToggleRow label="Show Activity Status" description="Display what you're watching or reading" checked={showActivity} onCheckedChange={setShowActivity} />

          <Separator className="my-2" />

          <SettingRow icon={Eye} label="Blocked Accounts" description="Manage blocked users" trailing={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
          <SettingRow icon={Shield} label="Muted Keywords" description="Hide bants with certain words" trailing={<ChevronRight className="h-4 w-4 text-muted-foreground" />} />
        </div>
      )}

      {/* Notifications section */}
      {section === "notifications" && (
        <div className="py-2">
          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Push Notifications</p>
          <ToggleRow label="Push Notifications" description="Receive notifications on your device" checked={pushNotifs} onCheckedChange={setPushNotifs} />

          <Separator className="my-2" />

          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Alerts</p>
          <ToggleRow label="Match Alerts" description="Goals, red cards, full time results" checked={matchAlerts} onCheckedChange={setMatchAlerts} />
          <ToggleRow label="Community Updates" description="Activity in your joined communities" checked={communityNotifs} onCheckedChange={setCommunityNotifs} />
          <ToggleRow label="FanBoot Orders" description="Order updates and vendor messages" checked={marketplaceNotifs} onCheckedChange={setMarketplaceNotifs} />

          <Separator className="my-2" />

          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
          <ToggleRow label="Weekly Digest" description="Summary of your week on KickOff" checked={emailDigest} onCheckedChange={setEmailDigest} />
        </div>
      )}

      {/* Display section */}
      {section === "display" && (
        <div className="py-2">
          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Theme</p>
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between px-4 py-3.5 transition-colors hover:bg-secondary"
          >
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium text-foreground">Appearance</p>
                <p className="text-[11px] text-muted-foreground">{theme === "dark" ? "Dark mode" : "Light mode"}</p>
              </div>
            </div>
            <div className="flex h-8 items-center rounded-full bg-secondary px-3">
              <span className="text-xs font-medium text-foreground">{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</span>
            </div>
          </button>
        </div>
      )}

      <div className="px-4 py-6">
        <button
          onClick={async () => { await signOut(); navigate("/login"); }}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/5 py-3 text-sm font-semibold text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
