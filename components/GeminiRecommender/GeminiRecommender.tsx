'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { PIZZA_DATA } from '@/config/constants';

interface GeminiRecommenderProps {
  onSelect: (product: Product) => void;
}

const GeminiRecommender: React.FC<GeminiRecommenderProps> = ({ onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation(null);

    try {
      // Envia só o texto do cardápio pro backend (seguro)
      const menuText = PIZZA_DATA.map((p) => `${p.name}: ${p.description}`).join('\n');

      const res = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuText }),
      });

      if (!res.ok) throw new Error('Falha ao obter recomendação');

      const data = (await res.json()) as { text: string };

      const text = data.text || 'Sugiro a Margherita, é uma das mais pedidas!';
      setRecommendation(text);

      // Match simples pelo nome (mesma lógica “basic fuzzy”)
      const found =
        PIZZA_DATA.find((p) => text.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])) ??
        PIZZA_DATA[0];

      setSelectedProduct(found);
    } catch (err) {
      console.error(err);
      setRecommendation('Sugiro nossa Margherita para hoje!');
      setSelectedProduct(PIZZA_DATA[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 mt-6 p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border border-red-100 shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-stone-800 font-bold text-sm">✨ Dúvida no pedido?</h4>
        <button
          onClick={getRecommendation}
          disabled={loading}
          className="bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider disabled:opacity-60"
        >
          {loading ? 'Pensando...' : 'Pedir Sugestão AI'}
        </button>
      </div>

      {recommendation && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <p className="text-stone-700 text-xs italic leading-relaxed">“{recommendation}”</p>

          {selectedProduct && (
            <button
              onClick={() => onSelect(selectedProduct)}
              className="mt-3 w-full bg-white border border-red-200 text-xs py-2 rounded-xl font-bold hover:bg-red-50 transition-colors text-red-600"
            >
              Adicionar {selectedProduct.name}
            </button>
          )}
        </div>
      )}

      {!recommendation && !loading && (
        <p className="text-stone-500 text-[10px]">
          Deixe nossa inteligência artificial ajudar você a escolher a melhor combinação!
        </p>
      )}
    </div>
  );
};

export default GeminiRecommender;
