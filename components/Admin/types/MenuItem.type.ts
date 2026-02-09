import { Category } from "@/types";

export const TABLE = "menu_items";

// Tipo do formato que vem do Supabase (snake_case)
export type MenuItemRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: Category;
  image: string;
  promotion: boolean | null;
  popular: boolean | null;
  is_active: boolean | null;
  updated_at?: string | null;
};

export interface AdminHeaderProps {
  hasActivePromotions: boolean;
  onCreate: () => void;
}