'use client';

import React, { useMemo, useState } from 'react';
import { Category, Product } from '@/types';
import AdminHeader from './AdminHeader';
import AdminCategoryNav from './AdminCategoryNav';
import AdminProductEditor from './AdminProductEditor';
import AdminProductCard from './AdminProductCard';
import AdminResetButton from './AdminResetButton';

interface AdminPanelProps {
  products: Product[];
  onUpdate: (newProducts: Product[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>(Category.SIMPLE);

  const categories = useMemo(() => Object.values(Category), []);
  const hasActivePromotions = useMemo(() => products.some((p) => p.isActive && !!p.promotion), [products]);

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
    updateById(id, {
      promotion: nextPromotion,
      originalPrice: nextPromotion ? found.originalPrice : undefined,
    });
  };

  // ✅ CRIAR NOVO SABOR
  const handleCreateNew = () => {
    const id = crypto?.randomUUID?.() ?? String(Date.now());

    const newItem: Product = {
      id,
      name: 'Novo sabor',
      description: 'Descreva o sabor...',
      price: 0,
      originalPrice: undefined,
      category: activeCategory,
      image: '/assets/img/banner.png', // placeholder (troque depois)
      promotion: false,
      popular: false,
      isActive: true,
    };

    onUpdate([newItem, ...products]);
    setEditingId(id);
  };

  // ✅ REMOVER
  const handleDelete = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;

    if (!window.confirm(`Remover "${p.name}"? Essa ação não pode ser desfeita.`)) return;

    const updated = products.filter((x) => x.id !== id);
    onUpdate(updated);
    if (editingId === id) setEditingId(null);
  };

  const handleResetToServer = async () => {
    alert(
      'Reset ainda não implementado no backend.\n\nSugestão: crie um endpoint /api/menu/reset para restaurar os dados padrão no Supabase.'
    );
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <AdminHeader hasActivePromotions={hasActivePromotions} onCreate={handleCreateNew} />

      <AdminCategoryNav categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />

      <main className="max-w-4xl mx-auto p-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold text-stone-800">{String(activeCategory)}</h2>
          <span className="text-xs font-normal text-stone-400">{filteredProducts.length} itens</span>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((p) => {
            const isEditing = editingId === p.id;

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                  p.isActive ? 'border-stone-100' : 'border-red-100 bg-red-50/10'
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
                    onDelete={() => handleDelete(p.id)}
                  />
                )}
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-300 text-sm italic">Nenhum item nesta categoria.</p>

              <button
                onClick={handleCreateNew}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700"
              >
                + Novo sabor
              </button>
            </div>
          )}
        </div>

        <AdminResetButton onReset={handleResetToServer} />
      </main>
    </div>
  );
};

export default AdminPanel;
