import { ItemType, CartItemType } from '../context/Types';
import apiConfig from '../api-config';


// Utility function to add an item to the cart
export const addItemToCart = async (
  newItem: ItemType,
  setConfirmationItem: (item: ItemType) => void
): Promise<void> => {
  console.log('Adding this item to cart:', newItem.id);

  const token = localStorage.getItem('token');
  
  if (token) {
    // User is authenticated, proceed with API request
    try {
      const response = await fetch(`${apiConfig.API_URL}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: [{ id: newItem.id }] })  // Only send the item id
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        setConfirmationItem(newItem); // Trigger confirmation with ItemType
      } else {
        const errorText = await response.text();
        console.error(`Failed to add item to cart: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  } else {
    // No token, handle guest cart using local storage
    let guestCart: CartItemType[] = JSON.parse(localStorage.getItem('guestCart') || '[]');
    
    // Check if the item already exists in the cart
    const existingItemIndex = guestCart.findIndex((item) => item.id === newItem.id);
    if (existingItemIndex > -1) {
      // If the item already exists, update the quantity
      guestCart[existingItemIndex].buyQuantity += 1;
    } else {
      // If the item does not exist, add it to the cart as CartItemType
      const cartItem: CartItemType = {
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        image: newItem.image,
        price: newItem.price,
        buyQuantity: 1,
        totalInStock: newItem.quantity,
      };
      guestCart.push(cartItem);
    }
    
    localStorage.setItem('guestCart', JSON.stringify(guestCart));
    
    console.log('Item added to guest cart:', newItem.id);

    setConfirmationItem(newItem); // Trigger confirmation with ItemType
  }
};



// ChunkArray function
export const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};


// Grab Username from DB after login
export async function fetchUsernameFromDatabase(): Promise<string | null> {
  const token = localStorage.getItem('token');
  if (!token) {
      return null;
  }

  try {
      const response = await fetch(`${apiConfig.API_URL}/users/me`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          console.error("Failed to fetch username:", response.statusText);
          return null;
      }

      const data = await response.json();
      return data.username;
  } catch (error) {
      console.error("Error fetching username from database:", error);
      return null;
  }
}


