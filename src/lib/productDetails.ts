import { Product } from "@/lib/types";
import { isProduct } from "@/lib/product-utils";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const getProductById = async ({ id }: { id: string }): Promise<Product | null> => {
  const res = await fetch(`${baseUrl}/api/products/${id}`);

  // Product doesn't exist: return null so the page can show a 404
  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const data: unknown = await res.json();

  // Makes sure the API data really matches the Product type
  if (!isProduct(data)) {
    throw new Error("Invalid product data");
  }

  return data;
};

export default getProductById;