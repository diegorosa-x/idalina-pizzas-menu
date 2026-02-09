// app/api/menu/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { MenuItemRow, TABLE } from "@/components/Admin/types/MenuItem.type";
import { Product } from "@/types";

function toProduct(row: MenuItemRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    category: row.category, // se seu Category for enum/string union, dá pra tipar melhor depois
    image: row.image,
    promotion: !!row.promotion,
    popular: !!row.popular,
    isActive: !!row.is_active,
  };
}

function toRow(p: Product): MenuItemRow {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    original_price: p.originalPrice ?? null,
    category: p.category,
    image: p.image,
    promotion: !!p.promotion,
    popular: !!p.popular,
    is_active: !!p.isActive,
    updated_at: new Date().toISOString(),
  };
}

export async function GET() {
  const { data, error } = await supabaseServer
    .from(TABLE)
    .select("*")
    .order("category", { ascending: true });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []) as MenuItemRow[];
  return NextResponse.json({ items: rows.map(toProduct) });
}

export async function PUT(req: Request) {
  const token = req.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_API_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const items = body?.items;

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const products = items as Product[];
  const rows = products.map(toRow);

  const { error } = await supabaseServer
    .from(TABLE)
    .upsert(rows, { onConflict: "id" });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
