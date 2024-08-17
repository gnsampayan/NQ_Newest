export interface ItemType {
    quantity: number;
    description: string;
    id: number;
    image: string;
    title: string;
    price: number;
    rating: number;
    tags: string[];
    saleBool: number; // boolean , 0 or 1
    saleRate: number;
    saleTimed: number; // boolean , 0 or 1
    saleEnd: string;
  }

export interface CartItemType {
    id: number;
    description: string;
    image: string;
    title: string;
    price: number;
    buyQuantity: number;
    totalInStock: number;
}