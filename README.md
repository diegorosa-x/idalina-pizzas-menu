# 🍕 Idalina Pizzas – Cardápio Digital Inteligente

Cardápio digital moderno para pizzarias, com **painel administrativo completo**, controle de produtos, promoções e integração com WhatsApp.  
Projeto construído com **Next.js + Supabase**, focado em simplicidade, performance e experiência mobile.

---

## ✨ Funcionalidades

### 🧾 Cardápio Público
- Listagem de produtos por **categoria**
- Produtos ativos/inativos
- Preço promocional com valor riscado
- Destaque de promoções
- Integração com **WhatsApp** para envio do pedido
- Layout responsivo (mobile-first)

### 🔐 Painel Administrativo
- Acesso via rota `/admin`
- Autenticação simples por token
- Navegação por categorias (igual ao cardápio público)
- **CRUD completo de itens do cardápio**:
  - Criar novo item
  - Editar nome, descrição, imagem e preços
  - Ativar / desativar item
  - Ativar / desativar promoção
  - Preço promocional com controle automático
- Menu de ações com **3 pontinhos (⋮)** por item
- Indicador visual de promoções ativas
- Reset de dados (preparado para seed)

---

## 🧠 Stack Utilizada

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **Supabase (PostgreSQL + API)**
- **WhatsApp API (link direto)**
- **Vercel-ready**

---

## 📂 Estrutura do Projeto

```text
idalina-pizzas-menu/
├─ app/
│  ├─ page.tsx              # Cardápio público
│  ├─ admin/
│  │  └─ page.tsx           # Painel administrativo
│  ├─ api/
│  │  └─ menu/
│  │     └─ route.ts        # API CRUD do cardápio (Supabase)
│  ├─ layout.tsx
│  └─ globals.css
│
├─ components/
│  ├─ Admin/
│  │  ├─ AdminPanel.tsx           # Orquestra estado do admin
│  │  ├─ AdminHeader.tsx          # Header do painel
│  │  ├─ AdminCategoryNav.tsx     # Navegação por categoria
│  │  ├─ AdminProductCard.tsx     # Card do item
│  │  ├─ AdminProductEditor.tsx   # Editor do item
│  │  ├─ AdminActionsMenu.tsx     # Menu ⋮ de ações
│  │  └─ AdminResetButton.tsx
│  │
│  ├─ Header/
│  ├─ Footer/
│  ├─ Brand/
│  ├─ CategoryNavigation/
│  ├─ ProductCard/
│  ├─ WhatsAppButton/
│  └─ GeminiRecommender/
│
├─ services/
│  └─ MenuService.ts        # Comunicação com API / Supabase
│
├─ lib/
│  └─ supabaseServer.ts     # Cliente Supabase (server)
│
├─ types/
│  └─ index.ts              # Tipagens globais
│
├─ public/
│  └─ assets/
│
├─ .env.local               # Variáveis de ambiente (não versionar)
├─ README.md
└─ package.json

```

---

## 🚀 Rodando o Projeto
```bash
npm install
npm run dev
```