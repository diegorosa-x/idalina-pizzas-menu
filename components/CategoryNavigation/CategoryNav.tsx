'use client';

import React from 'react';
import { Category } from '@/types';

interface CategoryNavProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories = Object.values(Category);

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-100 overflow-x-auto no-scrollbar">
      <div className="flex items-center px-4 h-14 space-x-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`whitespace-nowrap text-sm font-semibold transition-all duration-200 py-2 border-b-2 ${
              activeCategory === cat
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-stone-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNav;
