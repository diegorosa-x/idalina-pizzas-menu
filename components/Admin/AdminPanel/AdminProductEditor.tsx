'use client';

import React from 'react';
import { Product } from '@/types';

interface AdminProductEditorProps {
  product: Product;
  onClose: () => void;
  onPatch: (patch: Partial<Product>) => void;
  onTogglePromotion: () => void;
}

const AdminProductEditor: React.FC<AdminProductEditorProps> = ({
  product,
  onClose,
  onPatch,
  onTogglePromotion,
}) => {
  const p = product;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-bold text-stone-400 block mb-1 uppercase">
            Nome do Item
          </label>
          <input
            type="text"
            defaultValue={p.name}
            onBlur={(e) => onPatch({ name: e.target.value })}
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
              onChange={onTogglePromotion}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
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
          onBlur={(e) => onPatch({ description: e.target.value })}
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
            onBlur={(e) => {
              const val = parseFloat(e.target.value);
              if (!Number.isNaN(val)) onPatch({ price: val });
            }}
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
            defaultValue={p.originalPrice ?? ''}
            onBlur={(e) => {
              const val = parseFloat(e.target.value);
              onPatch({ originalPrice: Number.isNaN(val) ? undefined : val });
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
          onClick={onClose}
          className="text-[10px] font-bold text-stone-400 px-4 py-2 uppercase tracking-wider"
        >
          Fechar Edição
        </button>
      </div>
    </div>
  );
};

export default AdminProductEditor;
