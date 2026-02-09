"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Category, Product, CartItem } from "@/types";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CategoryNav from "@/components/CategoryNavigation/CategoryNav";
import ProductCard from "@/components/ProductCard/ProductCard";
import GeminiRecommender from "@/components/GeminiRecommender/GeminiRecommender";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

import AdminAuth from "@/components/Admin/Auth/AdminAuth";
import AdminPanel from "@/components/Admin/AdminPanel/AdminPanel";

import { MenuService } from "@/services/MenuService";

const AppClient: React.FC = () => {
  // Routing state
  const [currentView, setCurrentView] = useState<"menu" | "admin">("menu");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Data state
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>(
    Category.SIMPLE,
  );
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load menu + hash routing
  useEffect(() => {
    (async () => {
      const items = await MenuService.getMenu();
      setMenuItems(items);
    })();

    const handleHashChange = () => {
      setCurrentView(window.location.hash === "#admin" ? "admin" : "menu");
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleUpdateMenu = async (newItems: Product[]) => {
    setMenuItems(newItems); // atualiza UI imediatamente (UX boa)

    try {
      await MenuService.saveMenu(newItems);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar alterações no servidor");
    }
  };

  const filteredProducts = useMemo(() => {
    return menuItems.filter((p) => p.category === activeCategory && p.isActive);
  }, [activeCategory, menuItems]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  // View: Admin
  if (currentView === "admin") {
    if (!isAdminAuthenticated) {
      return (
        <AdminAuth onAuthenticated={() => setIsAdminAuthenticated(true)} />
      );
    }
    return <AdminPanel products={menuItems} onUpdate={handleUpdateMenu} />;
  }

  // View: Public Menu (layout intacto)
  return (
    <div className="min-h-screen pb-32">
      <Header />

      <GeminiRecommender onSelect={handleAddToCart} />

      <div className="mt-8">
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="p-4 flex flex-col gap-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-stone-800 mt-2 mb-1 px-1">
            {activeCategory}
          </h2>

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-400 text-sm">
                Nenhum produto encontrado nesta categoria no momento.
              </p>
            </div>
          )}
        </div>

        <Footer />
      </div>

      <WhatsAppButton cart={cart} />
    </div>
  );
};

export default AppClient;
