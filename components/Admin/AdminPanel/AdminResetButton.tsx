'use client';

import React from 'react';

interface AdminResetButtonProps {
  onReset: () => void;
}

const AdminResetButton: React.FC<AdminResetButtonProps> = ({ onReset }) => {
  return (
    <div className="mt-16 p-8 border-t border-stone-100 text-center">
      <button
        onClick={() => {
          if (
            window.confirm(
              'Deseja restaurar os dados originais do sistema? Isso apagará suas edições permanentemente.'
            )
          ) {
            onReset();
          }
        }}
        className="text-stone-300 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
      >
        Restaurar Padrões de Fábrica
      </button>
    </div>
  );
};

export default AdminResetButton;
