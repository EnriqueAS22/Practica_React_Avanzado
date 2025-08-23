export type Tag = "work" | "mobile" | "motor" | "lifestyle";

export interface Advert {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  tags: Tag[];
  photo?: string;
}

export type Filters = {
  name: string;
  priceRange: [number, number];
  sale: "all" | "true" | "false";
  selectedTags: Tag[];
};
