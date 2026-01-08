import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import FlashDeals from "./pages/FlashDeals";
import Clearance from "./pages/Clearance";
import TopSellers from "./pages/TopSellers";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import Category from "./pages/Category";
import DealsPage from "./pages/DealsPage";
import InfoPage from "./pages/InfoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RedirectLegacyProductUrl = () => {
  const { handle } = useParams<{ handle?: string }>();
  return <Navigate to={handle ? `/product/${handle}` : "/"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Product routes */}
            <Route path="/product/:handle" element={<ProductDetail />} />

            {/* Shopify-style URLs (from admin/preview links) */}
            <Route path="/products/:handle" element={<RedirectLegacyProductUrl />} />

            {/* Shopify preview URLs sometimes copied from the admin */}
            <Route path="/online_store_preview" element={<Navigate to="/" replace />} />

            <Route path="/flash-deals" element={<FlashDeals />} />
            <Route path="/clearance" element={<Clearance />} />
            <Route path="/top-sellers" element={<TopSellers />} />
            <Route path="/hot-selling" element={<TopSellers />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category" element={<Category />} />
            <Route path="/deals/:dealType" element={<DealsPage />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
