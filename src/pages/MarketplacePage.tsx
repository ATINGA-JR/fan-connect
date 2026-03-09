import { ArrowLeft, Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockProducts = [
  { name: "Custom Arsenal Home Jersey 24/25", vendor: "KitKing", price: "$89", image: "⚽", category: "Jerseys" },
  { name: "Vintage AC Milan Scarf", vendor: "RetroFooty", price: "$35", image: "🧣", category: "Accessories" },
  { name: "Match Day Photography", vendor: "SnapGoal Studios", price: "From $150", image: "📸", category: "Services" },
  { name: "Signed Messi Print", vendor: "FootballArts", price: "$220", image: "🖼️", category: "Collectibles" },
  { name: "Coaching Session (1hr)", vendor: "ProCoach FC", price: "$60", image: "🏋️", category: "Services" },
  { name: "Champions League Ball Replica", vendor: "BallVault", price: "$45", image: "⚽", category: "Equipment" },
];

const MarketplacePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h1 className="text-base font-bold text-foreground">Marketplace</h1>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search vendors, merch, services..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 p-4">
        {mockProducts.map((product, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
            <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-secondary text-3xl">
              {product.image}
            </div>
            <p className="text-xs font-medium text-foreground line-clamp-2">{product.name}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{product.vendor}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-primary">{product.price}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{product.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
