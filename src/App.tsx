import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "./components/BottomNav";
import FloatingPostButton from "./components/FloatingPostButton";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import ScoresPage from "./pages/ScoresPage";
import FantasyPage from "./pages/FantasyPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mx-auto max-w-lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/scores" element={<ScoresPage />} />
            <Route path="/fantasy" element={<FantasyPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingPostButton />
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
