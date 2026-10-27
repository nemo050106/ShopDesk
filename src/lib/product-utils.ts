import {
  InventorySummary,
  Product,
  SortDirection,
  SortField,
} from "@/lib/types";

// 1. Search by name or category
export const searchProducts = (products: Product[], query: string) => {
  const searchItem = query.trim().toLowerCase();
  if (!searchItem) return products;

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchItem) ||
      product.category.toLowerCase().includes(searchItem),
  );
};

// 2. Filter by category (exact match, "all" returns everything)
export const filterByCategory = (products: Product[], category: string) => {
  const selected = category.trim().toLowerCase();
  if (selected === "all" || selected === "") return products;

  return products.filter(
    (product) => product.category.trim().toLowerCase() === selected,
  );
};

// Build the category dropdown from real data instead of a hardcoded list
export const getCategories = (products: Product[]): string[] => [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))).sort(),
];

// 3. Sort (returns a new array, never mutates the original)
export const sortProducts = (
  products: Product[],
  field: SortField,
  direction: SortDirection,
) => {
  const sorted = [...products];
  const modifier = direction === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    switch (field) {
      case "name":
        return a.name.localeCompare(b.name) * modifier;
      case "price":
        return (a.price - b.price) * modifier;
      case "createdAt":
        return (
          (new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()) *
          modifier
        );
      default:
        return 0;
    }
  });

  return sorted;
};

// 4. Inventory summary
export const getInventorySummary = (products: Product[]): InventorySummary =>
  products.reduce<InventorySummary>(
    (summary, product) => {
      summary.totalProducts += 1;
      if (product.isActive) summary.activeProducts += 1;
      if (product.stock <= 0) summary.outOfStock += 1;
      summary.totalStockValue += product.price * product.stock;
      return summary;
    },
    { totalProducts: 0, activeProducts: 0, outOfStock: 0, totalStockValue: 0 },
  );

// 5. Currency formatting
export const formatPrice = (
  amount: number,
  currency = "USD",
  locale = "en-US",
) => new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);

// 6. Runtime check that API data really is a Product
export const isProduct = (value: unknown): value is Product => {
  if (typeof value !== "object" || value === null) return false;

  const product = value as Record<string, unknown>;

  return (
    typeof product._id === "string" &&
    typeof product.name === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number" &&
    typeof product.stock === "number" &&
    typeof product.isActive === "boolean" &&
    typeof product.image === "string" &&
    typeof product.createdAt === "string"
  );
};