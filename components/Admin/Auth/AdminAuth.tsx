'use client';

import React, { useState } from 'react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      onAuthenticated();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900 z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          🔒
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Área do Dono</h2>
        <p className="text-stone-500 text-sm mb-6">Digite seu PIN de acesso</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            maxLength={4}
            value={pin}
            onChange={(e) => {
              setError(false);
              setPin(e.target.value.replace(/\D/g, ''));
            }}
            className={`w-full text-center text-3xl tracking-[1em] font-bold py-3 border-b-2 outline-none transition-colors ${
              error ? 'border-red-500 text-red-500' : 'border-stone-200 focus:border-red-600'
            }`}
            placeholder="****"
          />
          {error && <p className="text-red-500 text-xs mt-2">PIN incorreto. Tente novamente.</p>}
          <button
            type="submit"
            className="w-full mt-8 bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors"
          >
            Entrar no Painel
          </button>
        </form>

        <button
          onClick={() => (window.location.hash = '')}
          className="mt-4 text-stone-400 text-xs underline"
        >
          Voltar para o Cardápio
        </button>
      </div>
    </div>
  );
};

export default AdminAuth;
