'use client';

import React from 'react';
import { RESTAURANT_NAME } from '@/config/constants';

interface BrandProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
};

const Brand: React.FC<BrandProps> = ({
  variant = 'light',
  size = 'md',
}) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/assets/img/logo.jpeg"
        alt={RESTAURANT_NAME}
        className={`${sizeMap[size]} w-auto rounded-full`}
      />

      <span
        className={`font-bold tracking-tight ${
          variant === 'light' ? 'text-white' : 'text-stone-800'
        }`}
      >
        {RESTAURANT_NAME}
      </span>
    </div>
  );
};

export default Brand;
