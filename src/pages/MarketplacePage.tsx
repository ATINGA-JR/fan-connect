import { useState } from "react";
import { ArrowLeft, Search, ShoppingBag, ShoppingCart, Plus, Minus, X, CreditCard, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  vendor: string;
  price: number;
  priceLabel: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  { id: 1, name: "Custom Arsenal Home Jersey 24/25", vendor: "KitKing", price: 89, priceLabel: "$89", image: "⚽", category: "Jerseys" },
  { id: 2, name: "Vintage AC Milan Scarf", vendor: "RetroFooty", price: 35, priceLabel: "$35", image: "🧣", category: "Accessories" },
  { id: 3, name: "Match Day Photography", vendor: "SnapGoal Studios", price: 150, priceLabel: "From $150", image: "📸", category: "Services" },
  { id: 4, name: "Signed Messi Print", vendor: "FootballArts", price: 220, priceLabel: "$220", image: "🖼️", category: "Collectibles" },
  { id: 5, name: "Coaching Session (1hr)", vendor: "ProCoach FC", price: 60, priceLabel: "$60", image: "🏋️", category: "Services" },
  { id: 6, name: "Champions League Ball Replica", vendor: "BallVault", price: 45, priceLabel: "$45", image: "⚽", category: "Equipment" },
  { id: 7, name: "Real Madrid Away Kit 24/25", vendor: "KitKing", price: 95, priceLabel: "$95", image: "⚽", category: "Jerseys" },
  { id: 8, name: "Fan Banner Custom Print", vendor: "UltrasPrint", price: 40, priceLabel: "$40", image: "🏁", category: "Accessories" },
];

const categories = ["All", "Jerseys", "Accessories", "Services", "Collectibles", "Equipment"];

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({ title: "Added to cart", description: `${product.name} added` });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filtered = mockProducts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.vendor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCheckout = () => {
    setCheckoutOpen(false);
    setCart([]);
    toast({ title: "Order placed! 🎉", description: "Your FanBoot order has been confirmed." });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">FanBoot</h1>
          </div>

          {/* Cart button */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="relative text-muted-foreground hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="flex w-80 flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Cart ({cartCount})
                </SheetTitle>
              </SheetHeader>

              {cart.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-3 overflow-y-auto py-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary text-xl">
                          {item.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-1">{item.name}</p>
                          <p className="text-[11px] text-muted-foreground">{item.vendor}</p>
                          <div className="mt-1.5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-medium text-foreground">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground">${item.price * item.quantity}</span>
                              <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />
                  <div className="space-y-3 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full gap-2" onClick={() => setCheckoutOpen(true)}>
                      <CreditCard className="h-4 w-4" /> Checkout
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vendors, merch, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {filtered.map((product) => (
          <div key={product.id} className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
            <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-secondary text-3xl">
              {product.image}
            </div>
            <p className="text-xs font-medium text-foreground line-clamp-2">{product.name}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{product.vendor}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-primary">{product.priceLabel}</span>
              <Badge variant="secondary" className="text-[10px]">{product.category}</Badge>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 w-full gap-1 text-xs"
              onClick={() => addToCart(product)}
            >
              <Plus className="h-3 w-3" /> Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No products found</p>
        </div>
      )}

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>Complete your FanBoot order</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Order summary */}
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Order Summary</p>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1">
                  <span className="text-xs text-foreground">{item.name} × {item.quantity}</span>
                  <span className="text-xs font-medium text-foreground">${item.price * item.quantity}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-sm font-bold text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment form */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Card Number</Label>
                <Input placeholder="4242 4242 4242 4242" className="text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Expiry</Label>
                  <Input placeholder="MM/YY" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">CVC</Label>
                  <Input placeholder="123" className="text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Shipping Address</Label>
                <Input placeholder="Enter your address" className="text-sm" />
              </div>
            </div>

            <Button className="w-full gap-2" onClick={handleCheckout}>
              <CreditCard className="h-4 w-4" /> Pay ${cartTotal.toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketplacePage;
