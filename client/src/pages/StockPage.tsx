import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import EditItemModal from '../components/EditItemModal';
import CreateItemModal from '../components/CreateItemModal';
import { ItemType } from '../context/Types';
import apiConfig from '../api-config';
import Button from '../components/Buttons/Button';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  color: black;
  padding-bottom: 100px;
  `;
const ItemCard = styled.div`
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  color: white;
  background: #3B3B3B;
  position: relative;
`;
const ItemCardUnique = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;
const ItemImage = styled.img`
  width: 60px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
  `;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;
const DeleteItem = styled.button`
  all: unset;
  position: absolute;
  background: #2B2B2B;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #A259FF;
  &:hover {
    background: red;
    color: white;
  }
`
const CreateModalButton = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  z-index: 99;
  &:hover {
    opacity: 100%;
  }
`
const Description = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0px;
  position: relative;
  margin-top: 0px;
  margin-bottom: 0px;
`
const Label = styled.p`
  color: white;
  /* Caption - Space Mono */
  font-family: "Space Mono";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 13.2px */
  margin-bottom: 8px;
`
const Body = styled.p`
  color: white;
  background: #2B2B2B;
  padding: 2px 4px;
  border-radius: 3px;
  max-height: 60px;
  overflow: hidden;
  position: static;
  /* Base(Body) - Work Sans */
  font-family: "Work Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
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
      const response = await fetch(`${apiConfig.API_URL}/items`);
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
      const response = await fetch(`${apiConfig.API_URL}/items/${itemId}`, {
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
        asset={IoMdAdd} 
        title={'Create Item'} 
        onClick={openCreateModal}
        />
    </CreateModalButton>
    <Grid>
      {items.map(item => (
        <ItemCard key={item.id}>
          <ItemInfo>
            <Description>
              <Label>Image</Label>
              <ItemImage src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
            </Description>
            <Description>
              <Label>Title</Label>
              <Body>{item.title}</Body>
            </Description>
            <Description>
              <Label>Price</Label>
              <Body>{item.price}</Body>
            </Description>
            <Description>
              <Label>Description</Label>
              <Body>{item.description}</Body>
            </Description>
            <Description>
              <Label>Tags</Label>
              <Body>{item.tags && item.tags.length > 0 ? item.tags.join(', ') : 'none'}</Body>
            </Description>
            <Description>
              <Label>Quantity In Stock</Label>
              <Body>{item.quantity}</Body>
            </Description>
          </ItemInfo>
          <DeleteItem onClick={() => handleItemDelete(item.id)}><RiDeleteBin5Line/></DeleteItem>
          <Button 
            // borderColor={'#3B3B3B'}
            // borderHoverColor={'#3B3B3B'}
            height='40px'
            width='100px'
            asset={CiEdit} 
            title={'Edit'} 
            onClick={() => openModal(item.id)}
          />
        </ItemCard>
      ))}
      <ItemCardUnique>
        <CreateModalButton>
          <Button 
            asset={IoMdAdd} 
            title={'Create Item'} 
            onClick={openCreateModal}
            />
        </CreateModalButton>
      </ItemCardUnique>
    </Grid>
  </>
  );
};

export default StockPage;

