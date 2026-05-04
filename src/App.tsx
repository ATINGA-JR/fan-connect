import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav";
import FloatingPostButton from "./components/FloatingPostButton";
import { useAuth } from "@/hooks/use-auth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import ScoresPage from "./pages/ScoresPage";
import FantasyPage from "./pages/FantasyPage";
import MessagesPage from "./pages/MessagesPage";
import MarketplacePage from "./pages/MarketplacePage";
import NewsPage from "./pages/NewsPage";
import ClubStatementsPage from "./pages/ClubStatementsPage";
import ProfilePage from "./pages/ProfilePage";
import DugoutPage from "./pages/DugoutPage";
import CommunityPage from "./pages/CommunityPage";
import BookmarksPage from "./pages/BookmarksPage";
import CreatorStudioPage from "./pages/CreatorStudioPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: JSX.Element }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const AppShell = () => {
  const { session, loading } = useAuth();
  const showChrome = !!session && !loading;
  return (
    <div className="mx-auto max-w-lg">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<Protected><HomePage /></Protected>} />
        <Route path="/live" element={<Protected><LivePage /></Protected>} />
        <Route path="/scores" element={<Protected><ScoresPage /></Protected>} />
        <Route path="/fantasy" element={<Protected><FantasyPage /></Protected>} />
        <Route path="/messages" element={<Protected><MessagesPage /></Protected>} />
        <Route path="/marketplace" element={<Protected><MarketplacePage /></Protected>} />
        <Route path="/news" element={<Protected><NewsPage /></Protected>} />
        <Route path="/club-statements" element={<Protected><ClubStatementsPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/hub" element={<Protected><DugoutPage /></Protected>} />
        <Route path="/communities" element={<Protected><CommunityPage /></Protected>} />
        <Route path="/bookmarks" element={<Protected><BookmarksPage /></Protected>} />
        <Route path="/creator" element={<Protected><CreatorStudioPage /></Protected>} />
        <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showChrome && <FloatingPostButton />}
      {showChrome && <BottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
