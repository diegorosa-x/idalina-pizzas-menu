import { PIZZA_DATA } from '@/config/constants';
import { Product } from '@/types';

const STORAGE_KEY = 'bella_pizza_menu_data';

export const MenuService = {
  getMenu(): Product[] {
    if (typeof window === 'undefined') return PIZZA_DATA; // SSR safety

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as Product[];
      } catch (e) {
        console.error('Erro ao carregar dados do menu.', e);
        return PIZZA_DATA;
      }
    }
    return PIZZA_DATA;
  },

  saveMenu(data: Product[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  resetMenu(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  },
};
