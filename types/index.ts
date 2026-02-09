export enum Category {
  SIMPLE = 'Pizzas Simples',
  SPECIAL = 'Pizzas Especiais',
  ADDITIONAL = 'Adicionais',
  COMBO = 'Combos',
  DRINK = 'Bebidas',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Para mostrar o preço riscado com promoções
  category: Category;
  image: string;
  promotion?: boolean;
  popular?: boolean;
  isActive: boolean; // Para o dono ativar/desativar itens
}

export interface CartItem extends Product {
  quantity: number;
}
