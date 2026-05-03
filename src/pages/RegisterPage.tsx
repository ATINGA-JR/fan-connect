import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GoogleButton from "@/components/GoogleButton";
import kickoffLogo from "@/assets/kickoff-logo.png";

const countries = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "England",
  "Spain", "Germany", "France", "Brazil", "Argentina", "USA",
  "Mexico", "Japan", "India", "Saudi Arabia", "Australia", "Italy",
  "Portugal", "Netherlands",
];

const leagues = [
  "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1",
  "UEFA Champions League", "UEFA Europa League", "MLS",
  "Eredivisie", "Liga MX", "Saudi Pro League", "NPFL",
];

const clubs = [
  "Manchester United", "Manchester City", "Liverpool", "Arsenal", "Chelsea",
  "Real Madrid", "FC Barcelona", "Atletico Madrid", "Bayern Munich",
  "Borussia Dortmund", "Paris Saint-Germain", "Juventus", "AC Milan",
  "Inter Milan", "Napoli",
];

const players = [
  "Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappé", "Erling Haaland",
  "Vinícius Jr.", "Jude Bellingham", "Mohamed Salah", "Kevin De Bruyne",
  "Bukayo Saka", "Lamine Yamal", "Rodri", "Cole Palmer",
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 1 fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");

  // Step 2 fields
  const [favoriteLeague, setFavoriteLeague] = useState("");
  const [otherLeagues, setOtherLeagues] = useState<string[]>([]);
  const [favoriteClub, setFavoriteClub] = useState("");
  const [otherClubs, setOtherClubs] = useState<string[]>([]);
  const [favoritePlayer, setFavoritePlayer] = useState("");
  const [otherPlayers, setOtherPlayers] = useState<string[]>([]);

  const toggleMulti = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => {
    if (!email || !fullName || !username || !password || !confirmPassword || !dob || !country) return;
    if (password !== confirmPassword) return;
    setStep(2);
  };

  const handleFinish = async () => {
    if (!favoriteLeague || !favoriteClub || !favoritePlayer) {
      toast.error("Please complete your football interests");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          username,
          display_name: fullName,
          full_name: fullName,
          phone,
          country,
          date_of_birth: dob,
          favorite_league: favoriteLeague,
          favorite_club: favoriteClub,
          favorite_player: favoritePlayer,
          other_leagues: otherLeagues,
          other_clubs: otherClubs,
          other_players: otherPlayers,
        },
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error("Sign up failed", { description: error.message });
      return;
    }
    toast.success("Welcome to KickOff!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <img src={kickoffLogo} alt="KickOff" className="h-8 mb-2" />
        <h1 className="text-xl font-bold text-foreground">
          {step === 1 ? "Create Account" : "Football Interests"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 1 ? "Join the pitch" : "Tell us what you love"}
        </p>
        {/* Step indicator */}
        <div className="flex gap-2 mt-4">
          <div className={`h-1 w-16 rounded-full ${step >= 1 ? "gradient-pitch" : "bg-secondary"}`} />
          <div className={`h-1 w-16 rounded-full ${step >= 2 ? "gradient-pitch" : "bg-secondary"}`} />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <Input id="phone" type="tel" placeholder="+234..." value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username *</Label>
              <Input id="username" placeholder="@kickoff_fan" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="text-foreground" />
            </div>
            <div className="space-y-1.5">
              <Label>Country *</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full border-input bg-background">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleNext} className="w-full gradient-pitch text-primary-foreground font-semibold mt-4">
              Next → Football Interests
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
            </div>

            <GoogleButton label="Sign up with Google" />

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-primary hover:underline">Log in</button>
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Favorite League */}
            <div className="space-y-1.5">
              <Label>Favorite League *</Label>
              <Select value={favoriteLeague} onValueChange={setFavoriteLeague}>
                <SelectTrigger className="w-full border-input bg-background">
                  <SelectValue placeholder="Select league" />
                </SelectTrigger>
                <SelectContent>
                  {leagues.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Other Leagues */}
            <div className="space-y-1.5">
              <Label>Other Leagues Followed <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <div className="flex flex-wrap gap-2">
                {leagues.filter((l) => l !== favoriteLeague).map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleMulti(l, otherLeagues, setOtherLeagues)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      otherLeagues.includes(l)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Club */}
            <div className="space-y-1.5">
              <Label>Favorite Club *</Label>
              <Select value={favoriteClub} onValueChange={setFavoriteClub}>
                <SelectTrigger className="w-full border-input bg-background">
                  <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Other Clubs */}
            <div className="space-y-1.5">
              <Label>Other Clubs Followed <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <div className="flex flex-wrap gap-2">
                {clubs.filter((c) => c !== favoriteClub).map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleMulti(c, otherClubs, setOtherClubs)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      otherClubs.includes(c)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Player */}
            <div className="space-y-1.5">
              <Label>Favorite Player *</Label>
              <Select value={favoritePlayer} onValueChange={setFavoritePlayer}>
                <SelectTrigger className="w-full border-input bg-background">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Other Players */}
            <div className="space-y-1.5">
              <Label>Other Players Followed <span className="text-muted-foreground text-xs">(Optional)</span></Label>
              <div className="flex flex-wrap gap-2">
                {players.filter((p) => p !== favoritePlayer).map((p) => (
                  <button
                    key={p}
                    onClick={() => toggleMulti(p, otherPlayers, setOtherPlayers)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      otherPlayers.includes(p)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={submitting}>
                Back
              </Button>
              <Button onClick={handleFinish} disabled={submitting} className="flex-1 gradient-pitch text-primary-foreground font-semibold">
                {submitting ? "Creating..." : "Finish → Home"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
