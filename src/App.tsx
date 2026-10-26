import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AppHeader } from './components/common/AppHeader';
import { AppFooter } from './components/common/AppFooter';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { AIAssistantModal } from './components/home/AIAssistantModal';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { StorePage } from './pages/StorePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { logApiState } from './services/api/config';

export function App() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  useEffect(() => {
    logApiState();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-bayaak-navy antialiased selection:bg-amber-400 selection:text-bayaak-navy-dark">
            {/* Shared Luxury Navigation Header */}
            <AppHeader onOpenAIAssistant={() => setIsAIAssistantOpen(true)} />

            {/* Main Application Routes */}
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={<HomePage onOpenAIAssistant={() => setIsAIAssistantOpen(true)} />}
                />
                <Route path="/categories/:categorySlug" element={<CategoryPage />} />
                <Route path="/stores/:storeSlug" element={<StorePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Shared Luxury Footer */}
            <AppFooter />

            {/* Global Slide-out Shopping Cart Drawer */}
            <CartDrawer />

            {/* Interactive Demo Checkout Modal */}
            <CheckoutModal />

            {/* AI Assistant Modal */}
            <AIAssistantModal
              isOpen={isAIAssistantOpen}
              onClose={() => setIsAIAssistantOpen(false)}
            />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
