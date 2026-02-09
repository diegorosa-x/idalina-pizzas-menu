'use client';

import React from 'react';
import { Category } from '@/types';

interface AdminCategoryNavProps {
  categories: Category[];
  activeCategory: Category;
  onChange: (cat: Category) => void;
}

const AdminCategoryNav: React.FC<AdminCategoryNavProps> = ({
  categories,
  activeCategory,
  onChange,
}) => {
  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-100 overflow-x-auto no-scrollbar flex items-center px-4 h-14">
      <div className="max-w-4xl mx-auto w-full flex space-x-6">
        {categories.map((cat) => (
          <button
            key={String(cat)}
            onClick={() => onChange(cat)}
            className={`whitespace-nowrap text-sm font-semibold transition-all duration-200 py-2 border-b-2 ${
              activeCategory === cat
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-stone-400'
            }`}
          >
            {String(cat)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AdminCategoryNav;
