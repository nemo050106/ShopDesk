import { ReactNode } from "react";

export interface Product {
  _id: string; // MongoDB id, not a number
  name: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  image: string;
  createdAt: string;
}

export type SortField = "name" | "price" | "createdAt";
export type SortDirection = "asc" | "desc";

export interface InventorySummary {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  totalStockValue: number;
}


export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: "primary" | "danger" | "outline";
}