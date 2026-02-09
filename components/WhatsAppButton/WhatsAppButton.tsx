'use client';

import React from 'react';
import { WHATSAPP_NUMBER } from '@/config/constants';
import { CartItem } from '@/types';

interface WhatsAppButtonProps {
  cart: CartItem[];
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ cart }) => {
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio! Adicione algumas delícias primeiro.');
      return;
    }

    const message = encodeURIComponent(
      'Olá! Gostaria de fazer um pedido:\n\n' +
        cart
          .map(
            (item) =>
              `${item.quantity}x ${item.name} (${(item.price * item.quantity).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })})`
          )
          .join('\n') +
        `\n\nTotal: ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` +
        '\n\nPor favor, confirme meu pedido!'
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  // Se não tiver itens, mostra botão flutuante “quero ver o cardápio”
  if (cart.length === 0) {
    const msg = encodeURIComponent('Olá! Gostaria de ver o cardápio.');
    return (
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90"
        aria-label="Falar no WhatsApp"
      >
        {/* Ícone WhatsApp (svg) */}
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.48A11.92 11.92 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.59 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.44-8.42Zm-8.47 18.3h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 1 1 8.37 4.61Zm5.42-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.5 1.69.64.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>
    );
  }

  // Se tiver itens, mostra barra fixa “Finalizar”
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 z-50 flex justify-center">
      <button
        onClick={handleOrder}
        className="w-full max-w-md bg-green-600 text-white py-4 rounded-2xl flex items-center justify-between px-6 font-bold shadow-xl shadow-green-200 hover:bg-green-700 active:scale-[.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="bg-white text-green-600 px-2 py-1 rounded-lg text-xs">{itemCount}</span>
          <span>Finalizar Pedido</span>
        </div>
        <span>
          {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
