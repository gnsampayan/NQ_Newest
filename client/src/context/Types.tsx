export interface ItemType {
    id: number;
    title: string;
    description: string;
    price: string;
    tags: string[];
    quantity: number;
    image?: Blob | string;
    // Add any additional fields that your items may have
    // For example, if items have an image property:
    // image?: string;
  }
  