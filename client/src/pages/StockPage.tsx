import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import EditItemModal from '../components/EditItemModal';
import CreateItemModal from '../components/CreateItemModal';
import { ItemType } from '../context/Types';
import config from '../config';
import Button from '../components/Buttons/Button';
import { IoCreateOutline } from "react-icons/io5";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  color: black;
  padding-bottom: 100px;
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

const DeleteItem = styled.button`
  //add delte style button here
  `
const EditItem = styled.button`
  //edit styles button here
  `
const CreateModalButton = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  opacity: 60%;
  &:hover {
    opacity: 100%;
  }
`

interface Item {
  id: number;
  title: string;
  image: string; // Base64 string
  quantity: number;
  price: number;
  description: string;
  tags: string[];
  // Add more item properties as needed
}


const StockPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  
  const fetchItems = async () => {
    try {
      const response = await fetch(`${config.API_URL}/items`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Item[] = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, [items]);

  const handleItemDelete = async (itemId: number) => {
    console.log("Deleting item with ID:", itemId);

    try {
      const response = await fetch(`${config.API_URL}/items/${itemId}`, {
        method: 'DELETE',
        // If your API requires headers (like Content-Type, Authorization), add them here
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
      // Updating the state to remove the deleted item
      setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  }

  const [vis, setVis] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentItemData, setCurrentItemData] = useState<ItemType | null>(null);

  const openModal = (itemId: number) => {
    setEditingItemId(itemId);
    setVis(true);
    const itemData = items.find(item => item.id === itemId);
  
    if (itemData) {
      let itemDataForState: ItemType = {
        ...itemData,
        price: itemData.price,
        rating: 0
      };
      setCurrentItemData(itemDataForState);
    } else {
      setCurrentItemData(null);
    }
  
    console.log('Edit modal clicked, for item: ' + itemId);
  };

  const [createModalVis, setCreateModalVis] = useState(false);
  const openCreateModal = () => {
    setCreateModalVis(true);
  }

  return (
    <>
    <EditItemModal 
      $isVisible={vis} 
      onClose={() => setVis(false)} 
      editingItemId={editingItemId}
      itemData={currentItemData} 
      isEditMode={editingItemId !== null}
      onItemUpdated={fetchItems}
    />
    <CreateItemModal
      $isVisible={createModalVis}
      onClose={() => setCreateModalVis(false)}
    />
    <CreateModalButton>
      <Button 
        asset={IoCreateOutline } 
        title={'Create New'} 
        onClick={openCreateModal} 
        bgColor='white'
        bgHoverColor='#A259FF'
        textColor='#A259FF'
        textHoverColor='white'
        borderColor='white'
        borderHoverColor='#A259FF'
        />
    </CreateModalButton>
    <Grid>
      {items.map(item => (
        <ItemCard key={item.id}>
          <ItemImage src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
          <ItemInfo>
            <h3>{item.title}</h3>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            <p>Tags: {item.tags && item.tags.length > 0 ? item.tags.join(', ') : 'none'}</p>
            <p>Quantity: {item.quantity}</p>
          </ItemInfo>
          <DeleteItem onClick={() => handleItemDelete(item.id)}>Delete</DeleteItem>
          <EditItem onClick={() => openModal(item.id)}>Edit</EditItem>
        </ItemCard>
      ))}
    </Grid>
  </>
  );
};

export default StockPage;

