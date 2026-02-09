'use client';

import React from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex gap-4 transition-transform active:scale-[0.98]">
      {/* Infos */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {product.promotion && (
              <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase">
                Oferta
              </span>
            )}

            {product.popular && (
              <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded uppercase">
                Favorito
              </span>
            )}
          </div>

          <h3 className="font-bold text-stone-900 text-base leading-tight">
            {product.name}
          </h3>

          <p className="text-stone-500 text-xs mt-1 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            {typeof product.originalPrice === 'number' && (
              <span className="text-[10px] text-stone-400 line-through">
                {product.originalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            )}

            <span className="text-lg font-bold text-stone-900">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-md hover:bg-red-700 transition-colors"
            aria-label={`Adicionar ${product.name}`}
          >
            +
          </button>
        </div>
      </div>

      {/* Imagem */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ProductCard;
