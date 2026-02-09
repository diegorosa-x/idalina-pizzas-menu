export type BrandSize = "sm" | "md" | "lg";
export type BrandVariant = "light" | "dark";

export interface BrandProps {
  variant?: BrandVariant;
  size?: BrandSize;
}