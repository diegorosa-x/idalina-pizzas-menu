import { Category, Product } from "@/types";

export const RESTAURANT_NAME = "Idalina Pizzas";
export const WHATSAPP_NUMBER = "5519994268106";
export const PROMO_BANNER_TEXT = "🔥 Promoção de Inauguração!";

export const PIZZA_DATA: Product[] = [
  {
    id: "s1",
    name: "Mussarela",
    description: "Molho, Mussarela e Tomate.",
    price: 39.9,
    originalPrice: 49.9,
    category: Category.SIMPLE,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "s2",
    name: "Frango",
    description: "Molho, Mussarela e Frango.",
    price: 39.9,
    originalPrice: 49.9,
    category: Category.SIMPLE,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "s3",
    name: "Calabresa",
    description: "Molho, Mussarela, Calabresa e Cebola.",
    price: 39.9,
    originalPrice: 49.9,
    category: Category.SIMPLE,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "s4",
    name: "Margherita",
    description: "Molho, Mussarela, Tomate e Manjericão.",
    price: 39.9,
    originalPrice: 49.9,
    category: Category.SIMPLE,
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "s5",
    name: "Três Queijos",
    description: "Molho, Mussarela, Parmesão e Requeijão.",
    price: 39.9,
    originalPrice: 49.9,
    category: Category.SIMPLE,
    image:
      "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },

  // PIZZAS ESPECIAIS (PREÇO PROMOCIONAL R$ 49,90)
  {
    id: "e1",
    name: "Frango com Requeijão",
    description: "Molho, Mussarela, Frango e Requeijão.",
    price: 49.9,
    originalPrice: 59.9,
    category: Category.SPECIAL,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "e2",
    name: "Calabresa Especial",
    description: "Molho, Mussarela, Calabresa e Requeijão.",
    price: 49.9,
    originalPrice: 59.9,
    category: Category.SPECIAL,
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "e3",
    name: "Bacon com Milho",
    description: "Molho, Mussarela, Bacon e Milho.",
    price: 49.9,
    originalPrice: 59.9,
    category: Category.SPECIAL,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "e4",
    name: "Portuguesa",
    description: "Molho, Mussarela, Presunto, Milho, Cebola e Ovo.",
    price: 49.9,
    originalPrice: 59.9,
    category: Category.SPECIAL,
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
  },
  {
    id: "e5",
    name: "Da Casa (Fricassê)",
    description:
      "Molho, Mussarela, Frango, Requeijão, Bacon, Creme de Leite e Batata Palha.",
    price: 49.9,
    originalPrice: 59.9,
    category: Category.SPECIAL,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80",
    promotion: true,
    isActive: true,
    popular: true,
  },

  // ADICIONAIS
  {
    id: "a1",
    name: "Borda: Requeijão",
    description: "Borda recheada com Requeijão cremoso de alta qualidade.",
    price: 12.0,
    category: Category.ADDITIONAL,
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=400&q=80",
    isActive: true,
  },
  {
    id: "a2",
    name: "Borda: Cheddar",
    description: "Borda recheada com Cheddar legítimo.",
    price: 12.0,
    category: Category.ADDITIONAL,
    image:
      "https://images.unsplash.com/photo-1552539618-7eec9b4d1796?auto=format&fit=crop&w=400&q=80",
    isActive: true,
  },
  {
    id: "a3",
    name: "Adicional: Bacon",
    description: "Porção extra de bacon crocante.",
    price: 10.0,
    category: Category.ADDITIONAL,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80",
    isActive: true,
  },
  {
    id: "a4",
    name: "Adicional: Calabresa",
    description: "Porção extra de calabresa fatiada.",
    price: 10.0,
    category: Category.ADDITIONAL,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
    isActive: true,
  },

  // BEBIDAS E COMBOS (MANTIDOS PARA ESTRUTURA)
  {
    id: "d1",
    name: "Coca-Cola 2L",
    description: "Geladinha, pronta para acompanhar sua pizza.",
    price: 12.0,
    category: Category.DRINK,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80",
    isActive: true,
  },
];
