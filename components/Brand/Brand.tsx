"use client";

import React from "react";
import Image from "next/image";
import { RESTAURANT_NAME } from "@/config/constants";
import { BrandProps, BrandSize } from "./type";

const imageSizeMap: Record<BrandSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

const Brand: React.FC<BrandProps> = ({ variant = "light", size = "md" }) => {
  const px = imageSizeMap[size];

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/assets/img/logo.jpeg"
        alt={RESTAURANT_NAME}
        width={px}
        height={px}
        className="rounded-full"
        priority
      />
      <span
        className={`font-bold tracking-tight ${
          variant === "light" ? "text-white" : "text-stone-800"
        }`}
      >
        {RESTAURANT_NAME}
      </span>
    </div>
  );
};

export default Brand;
