export interface ItemType {
    quantity: number;
    description: string;
    id: number;
    image: string;
    title: string;
    price: number;
    rating: number;
    tags: string[];
    saleBool: number;
    saleRate: number;
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