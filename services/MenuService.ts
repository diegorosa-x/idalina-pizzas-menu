// services/MenuService.ts
import { Product } from '@/types';

export const MenuService = {
  async getMenu(): Promise<Product[]> {
    const res = await fetch('/api/menu', { cache: 'no-store' });
    const json = await res.json();
    return json.items ?? [];
  },

  async saveMenu(items: Product[]): Promise<void> {
    const res = await fetch('/api/menu', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
      },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Erro ao salvar');
    }
  },
};
