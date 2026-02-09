"use client";

import React from "react";
import { PROMO_BANNER_TEXT } from "@/config/constants";
import Brand from "../Brand/Brand";

const Header: React.FC = () => {
  return (
    <header
      className="relative h-64 w-full flex flex-col justify-end p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('/assets/img/banner.png')",
      }}
    >
      <div className="z-10 text-white">
        <Brand variant="light" size="lg" />

        <p className="text-sm text-stone-200 mt-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Aberto agora • Entrega em 30–45 min
        </p>

        <div className="flex gap-2 mt-3">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
            Delivery Grátis*
          </span>
          <span className="bg-yellow-500 text-stone-900 text-[10px] font-bold px-2 py-1 rounded uppercase">
            {PROMO_BANNER_TEXT}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
