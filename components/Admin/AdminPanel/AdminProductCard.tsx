"use client";

import React from "react";
import { Product } from "@/types";
import AdminActionsMenu from "./AdminActionsMenu";
import Image from "next/image";

interface AdminProductCardProps {
  product: Product;
  onToggleActive: () => void;
  onEdit: () => void;

  // CRUD (opcional)
  onDuplicate?: () => void;
  onDelete?: () => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product: p,
  onToggleActive,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const items = [
    { label: p.isActive ? "Desativar" : "Ativar", onClick: onToggleActive },
    { label: "Editar", onClick: onEdit },
    ...(onDuplicate
      ? [{ label: "Criar baseado neste (duplicar)", onClick: onDuplicate }]
      : []),
    ...(onDelete
      ? [{ label: "Excluir", onClick: onDelete, danger: true }]
      : []),
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 flex-shrink-0">
        {/* pode trocar por next/image depois, mas sem quebrar nada */}
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-cover rounded-xl"
          sizes="64px"
        />{" "}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
              p.isActive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {p.isActive ? "Ativo" : "Pausado"}
          </span>

          {p.promotion && (
            <span className="text-[8px] bg-yellow-100 text-yellow-700 font-bold px-1.5 py-0.5 rounded uppercase">
              Em Promoção
            </span>
          )}
        </div>

        <h3 className="font-bold text-stone-900 text-sm leading-tight">
          {p.name}
        </h3>
        <p className="text-stone-500 text-[10px] line-clamp-1 mt-0.5">
          {p.description}
        </p>

        <div className="mt-1 flex items-baseline gap-2 font-mono text-xs">
          <span className="font-bold text-stone-800">
            R$ {p.price.toFixed(2)}
          </span>
          {typeof p.originalPrice === "number" && (
            <span className="text-stone-300 line-through text-[10px]">
              R$ {p.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Ações: menu 3 pontinhos */}
      <AdminActionsMenu items={items} align="right" />
    </div>
  );
};

export default AdminProductCard;
