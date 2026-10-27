import { Product } from "@/lib/types";
import { isProduct } from "@/lib/product-utils";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${baseUrl}/api/products`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid products data");
  }

  return data.filter(isProduct);
};