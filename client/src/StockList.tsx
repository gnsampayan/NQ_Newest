import React from 'react';
import styled from 'styled-components';

// Placeholder image URL (you can replace this with a real image URL)
const placeholderImage = 'https://via.placeholder.com/150';

interface Item {
  id: number;
  name: string;
  image: string;
  quantity: number;
  // Add more item properties as needed
}

// Sample placeholder items
const items: Item[] = [
  { id: 1, name: 'Hammer', image: placeholderImage, quantity: 15 },
  { id: 2, name: 'Screwdriver', image: placeholderImage, quantity: 20 },
  { id: 3, name: 'Wrench', image: placeholderImage, quantity: 10 },
  // Add more items as needed
];

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  color: white;
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
  return (
    <Grid>
      {items.map(item => (
        <ItemCard key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemInfo>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            {/* Add more item details here */}
          </ItemInfo>
        </ItemCard>
      ))}
    </Grid>
  );
};

export default StockList;

