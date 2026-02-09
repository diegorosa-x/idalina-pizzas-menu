'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type ActionItem = {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
};

interface AdminActionsMenuProps {
  align?: 'left' | 'right';
  items: ActionItem[];
}

const AdminActionsMenu: React.FC<AdminActionsMenuProps> = ({ items, align = 'right' }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => items.filter(Boolean), [items]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-2.5 rounded-xl border border-stone-100 text-stone-500 hover:bg-stone-50 active:scale-95 transition"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Ações"
      >
        {/* 3 pontinhos */}
        <span className="text-lg leading-none">⋯</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={`absolute z-50 mt-2 min-w-[180px] rounded-2xl border border-stone-100 bg-white shadow-xl overflow-hidden ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {filtered.map((it, idx) => (
            <button
              key={idx}
              role="menuitem"
              type="button"
              disabled={it.disabled}
              onClick={() => {
                if (it.disabled) return;
                setOpen(false);
                it.onClick();
              }}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition ${
                it.disabled
                  ? 'text-stone-300 cursor-not-allowed'
                  : it.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminActionsMenu;
