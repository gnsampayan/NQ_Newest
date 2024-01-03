import styled from 'styled-components';
import React, { useState, useEffect } from 'react';


interface Item {
  id: number;
  title: string;
  image: string; // Base64 string
  quantity: number;
  price: number;
  description: string;
  // Add more item properties as needed
}


const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  color: black;
`;

const ItemCard = styled.div`
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  margin-top: 10px;
`;

const StockList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Item[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchItems();
  }, []);

  return (
    <Grid>
      {items.map(item => (
        <ItemCard key={item.id}>
          <ItemImage src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
          <ItemInfo>
            <h3>{item.title}</h3>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            <p>Quantity: {item.quantity}</p>
          </ItemInfo>
        </ItemCard>
      ))}
    </Grid>
  );
};

export default StockList;

