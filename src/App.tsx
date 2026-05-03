import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import BottomNav from "./components/BottomNav";
import FloatingPostButton from "./components/FloatingPostButton";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="mx-auto max-w-lg">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/scores" element={<ScoresPage />} />
              <Route path="/fantasy" element={<FantasyPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/club-statements" element={<ClubStatementsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/hub" element={<DugoutPage />} />
              <Route path="/communities" element={<CommunityPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              
              <Route path="/creator" element={<CreatorStudioPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingPostButton />
            <BottomNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
