"use client";

import React from "react";
import Brand from "@/components/Brand/Brand";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 p-8 text-center text-stone-400 text-xs">
      <div className="flex justify-center mb-3">
        <Brand variant="dark" size="sm" />
      </div>

      <p className="opacity-70">
        © {new Date().getFullYear()} • Cardápio Digital Inteligente
      </p>

      {/* Link discreto para admin conforme solicitado */}
      <button
        onClick={() => (window.location.hash = "admin")}
        className="mt-2 opacity-50 hover:opacity-100 text-stone-400 transition-colors"
      >
        Área do Dono
      </button>
    </footer>
  );
};

export default Footer;
