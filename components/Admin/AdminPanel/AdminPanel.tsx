"use client";

import React, { useMemo, useState } from "react";
import { Category, Product } from "@/types";
import AdminHeader from "./AdminHeader";
import AdminCategoryNav from "./AdminCategoryNav";
import AdminProductEditor from "./AdminProductEditor";
import AdminProductCard from "./AdminProductCard";
import AdminResetButton from "./AdminResetButton";

interface AdminPanelProps {
  products: Product[];
  onUpdate: (newProducts: Product[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>(
    Category.SIMPLE,
  );

  const categories = useMemo(() => Object.values(Category), []);

  const hasActivePromotions = useMemo(
    () => products.some((p) => p.isActive && !!p.promotion),
    [products],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const updateById = (id: string, patch: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
    onUpdate(updated);
  };

  const toggleActive = (id: string) => {
    const found = products.find((p) => p.id === id);
    if (!found) return;
    updateById(id, { isActive: !found.isActive });
  };

  const togglePromotion = (id: string) => {
    const found = products.find((p) => p.id === id);
    if (!found) return;

    const nextPromotion = !found.promotion;

    // Se desativar promoção, limpa originalPrice.
    updateById(id, {
      promotion: nextPromotion,
      originalPrice: nextPromotion ? found.originalPrice : undefined,
    });
  };

  const handleResetToServer = async () => {
    // Sem resetMenu no serviço: apenas recarrega do servidor chamando a API via MenuService.
    // Mantemos esse componente genérico: o reset real (seed) pode ser feito depois via endpoint.
    // Aqui só avisa pra você implementar quando quiser.
    alert(
      "Reset ainda não implementado no backend.\n\nSugestão: crie um endpoint /api/menu/reset para restaurar PIZZA_DATA no Supabase.",
    );
  };

  const duplicateProduct = (p: Product) => {
    const newId = crypto.randomUUID();
    const copy: Product = {
      ...p,
      id: newId,
      name: `${p.name} (Novo)`,
      isActive: true,
    };
    onUpdate([copy, ...products]);
    setEditingId(newId); // já abre no editor
  };

  const deleteProduct = (id: string) => {
    if (!window.confirm("Deseja excluir este item?")) return;
    onUpdate(products.filter((x) => x.id !== id));
  };

  const handleCreateNew = () => {
    const newItem: Product = {
      id: crypto.randomUUID(),
      name: "Novo item",
      description: "",
      price: 0,
      category: activeCategory,
      image: "/assets/img/banner.png", // ou placeholder
      isActive: true,
      promotion: false,
      popular: false,
    };

    onUpdate([...products, newItem]);
    setEditingId(newItem.id);
  };
  

  return (
    <div className="bg-stone-50 min-h-screen">
      <AdminHeader
        hasActivePromotions={hasActivePromotions}
        onCreate={handleCreateNew}
      />

      <AdminCategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <main className="max-w-4xl mx-auto p-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold text-stone-800">
            {String(activeCategory)}
          </h2>
          <span className="text-xs font-normal text-stone-400">
            {filteredProducts.length} itens
          </span>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((p) => {
            const isEditing = editingId === p.id;

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                  p.isActive
                    ? "border-stone-100"
                    : "border-red-100 bg-red-50/10"
                }`}
              >
                {isEditing ? (
                  <AdminProductEditor
                    product={p}
                    onClose={() => setEditingId(null)}
                    onPatch={(patch) => updateById(p.id, patch)}
                    onTogglePromotion={() => togglePromotion(p.id)}
                  />
                ) : (
                  <AdminProductCard
                    product={p}
                    onToggleActive={() => toggleActive(p.id)}
                    onEdit={() => setEditingId(p.id)}
                    onDuplicate={() => duplicateProduct(p)}
                    onDelete={() => deleteProduct(p.id)}
                  />
                )}
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-300 text-sm italic">
                Nenhum item nesta categoria.
              </p>
            </div>
          )}
        </div>

        <AdminResetButton onReset={handleResetToServer} />
      </main>
    </div>
  );
};

export default AdminPanel;
