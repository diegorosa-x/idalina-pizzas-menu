"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AdminHeaderProps } from "../types/MenuItem.type";

const AdminHeader: React.FC<AdminHeaderProps> = ({
  hasActivePromotions,
  onCreate,
}) => {
  const router = useRouter();

  return (
    <header className="bg-white px-6 pt-6 pb-4 border-b border-stone-100">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Painel Administrativo
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Gerencie seus produtos e promoções.
          </p>

          {hasActivePromotions && (
            <p className="text-red-600 text-[10px] font-bold uppercase mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              Promoções ativas no cardápio
            </p>
          )}
        </div>

        <div className="flex flex-row gap-2">
          <button
            onClick={onCreate}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold
             hover:bg-green-700 active:scale-95 transition-all"
          >
            + Novo item
          </button>

          <button
            onClick={() => router.replace("/")}
            className="mt-4 bg-stone-900  text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            Ver Cardápio
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
