'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Category, Product } from '@/types';
import { MenuService } from '@/services/MenuService';


interface AdminPanelProps {
  products: Product[];
  onUpdate: (newProducts: Product[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onUpdate }) => {
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>(Category.SIMPLE);

  const categories = Object.values(Category);

  const hasActivePromotions = useMemo(() => {
    return products.some((p) => p.isActive && p.promotion);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const toggleActive = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    onUpdate(updated);
  };

  const handleSaveItem = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    onUpdate(updated);
  };

  const togglePromotion = (id: string, currentStatus: boolean) => {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            promotion: !currentStatus,
            originalPrice: !currentStatus ? p.originalPrice : undefined,
          }
        : p
    );
    onUpdate(updated);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Admin Header */}
      <header className="bg-white px-6 pt-6 pb-4 border-b border-stone-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Painel Administrativo</h1>
            <p className="text-stone-500 text-xs mt-1">Gerencie seus produtos e promoções.</p>

            {hasActivePromotions && (
              <p className="text-red-600 text-[10px] font-bold uppercase mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                Promoções ativas no cardápio
              </p>
            )}
          </div>

          <button
            onClick={() => router.replace('/')}
            className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            Ver Cardápio
          </button>
        </div>
      </header>

      {/* Admin Category Nav - Sticky like public view */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-100 overflow-x-auto no-scrollbar flex items-center px-4 h-14 space-x-6">
        <div className="max-w-4xl mx-auto w-full flex space-x-6">
          {categories.map((cat) => (
            <button
              key={String(cat)}
              onClick={() => setActiveCategory(cat as Category)}
              className={`whitespace-nowrap text-sm font-semibold transition-all duration-200 py-2 border-b-2 ${
                activeCategory === cat
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-stone-400'
              }`}
            >
              {String(cat)}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 pt-6 pb-24">
        <h2 className="text-xl font-bold text-stone-800 mb-6 px-1 flex items-center justify-between">
          {String(activeCategory)}
          <span className="text-xs font-normal text-stone-400">
            {filteredProducts.length} itens
          </span>
        </h2>

        <div className="space-y-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                p.isActive ? 'border-stone-100' : 'border-red-100 bg-red-50/10'
              }`}
            >
              {editingId === p.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-stone-400 block mb-1 uppercase">
                        Nome do Item
                      </label>
                      <input
                        type="text"
                        defaultValue={p.name}
                        onBlur={(e) => handleSaveItem(p.id, { name: e.target.value })}
                        className="w-full text-sm font-bold border-b border-stone-200 py-1 focus:border-red-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-stone-400 block mb-1 uppercase">
                        Promoção
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input
                          type="checkbox"
                          checked={!!p.promotion}
                          onChange={() => togglePromotion(p.id, !!p.promotion)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        <span className="ml-3 text-xs font-bold text-stone-600">
                          {p.promotion ? 'Sim' : 'Não'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-400 block mb-1 uppercase">
                      Descrição
                    </label>
                    <textarea
                      defaultValue={p.description}
                      onBlur={(e) => handleSaveItem(p.id, { description: e.target.value })}
                      className="w-full text-xs text-stone-600 border rounded-xl p-3 focus:border-red-600 outline-none"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-stone-400 block mb-1 uppercase">
                        Preço Venda (R$)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={p.price}
                        onBlur={(e) =>
                          handleSaveItem(p.id, { price: parseFloat(e.target.value) })
                        }
                        className="w-full text-sm border-b border-stone-200 py-1 focus:border-red-600 outline-none font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label
                        className={`text-[10px] font-bold block mb-1 uppercase ${
                          p.promotion ? 'text-stone-400' : 'text-stone-200'
                        }`}
                      >
                        Preço Riscado (R$)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        disabled={!p.promotion}
                        defaultValue={p.originalPrice || ''}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value);
                          handleSaveItem(p.id, {
                            originalPrice: Number.isNaN(val) ? undefined : val,
                          });
                        }}
                        className={`w-full text-sm border-b py-1 focus:border-red-600 outline-none font-mono ${
                          !p.promotion ? 'border-transparent text-transparent' : 'border-stone-200'
                        }`}
                        placeholder={p.promotion ? 'Ex: 49.90' : ''}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-[10px] font-bold text-stone-400 px-4 py-2 uppercase tracking-wider"
                    >
                      Fechar Edição
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src={p.image} className="w-full h-full object-cover rounded-xl" alt={p.name} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          p.isActive
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {p.isActive ? 'Ativo' : 'Pausado'}
                      </span>

                      {p.promotion && (
                        <span className="text-[8px] bg-yellow-100 text-yellow-700 font-bold px-1.5 py-0.5 rounded uppercase">
                          Em Promoção
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-stone-900 text-sm leading-tight">{p.name}</h3>
                    <p className="text-stone-500 text-[10px] line-clamp-1 mt-0.5">{p.description}</p>

                    <div className="mt-1 flex items-baseline gap-2 font-mono text-xs">
                      <span className="font-bold text-stone-800">R$ {p.price.toFixed(2)}</span>
                      {p.originalPrice && (
                        <span className="text-stone-300 line-through text-[10px]">
                          R$ {p.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleActive(p.id)}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        p.isActive
                          ? 'border-stone-100 text-stone-300 hover:text-red-500'
                          : 'border-green-100 text-green-600 bg-green-50'
                      }`}
                      title={p.isActive ? 'Desativar' : 'Ativar'}
                    >
                      {p.isActive ? '⏸' : '▶'}
                    </button>

                    <button
                      onClick={() => setEditingId(p.id)}
                      className="p-2.5 rounded-xl border border-stone-100 text-stone-400 hover:bg-stone-50"
                      title="Editar"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-300 text-sm italic">Nenhum item nesta categoria.</p>
            </div>
          )}
        </div>

        <div className="mt-16 p-8 border-t border-stone-100 text-center">
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Deseja restaurar os dados originais do sistema? Isso apagará suas edições permanentemente.'
                )
              ) {
                MenuService.resetMenu();
              }
            }}
            className="text-stone-300 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            Restaurar Padrões de Fábrica
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
