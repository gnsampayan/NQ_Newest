import styled from "styled-components";
import { ItemType } from "../../../context/Types";
import { useEffect } from "react";
import Button from "../../Buttons/Button";
import ItemCard from "../../Cards/ItemCard";
import { useNavigate } from "react-router";

const Frame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
`;

const ModalContent = styled.div`
    background: #2B2B2B;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    display: flex;
    gap: 20px;
    flex-direction: column;
    width: auto;
`;

const H2 = styled.h2`
    color: white;
`;
const ItemCardContainer = styled.div`
    position: relative;
    max-width: 300px;
`
const AddToCartConfirmation = ({ item, onClose }: { item: ItemType, onClose: () => void }) => {
    const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(onClose, 10000); // Auto-close after 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Frame onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> 
        <H2>Added To Cart</H2>
        <ItemCardContainer>
            <ItemCard 
                image={item.image} 
                itemName={item.title} 
                addToCart={() => {}} 
                price={item.price} 
                rating={item.rating} 
                boxSize={"standard"} />
        </ItemCardContainer>
        <Button title={"Go to Checkout"} onClick={() => navigate('/check-out')} />
        <Button title={"Close"} onClick={onClose} />
      </ModalContent>
    </Frame>
  );
};

export default AddToCartConfirmation;
