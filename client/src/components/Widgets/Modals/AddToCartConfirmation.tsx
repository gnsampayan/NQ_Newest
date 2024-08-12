import styled from "styled-components";
import { ItemType } from "../../../context/Types";
import { useEffect } from "react";
import ItemCard from "../../Cards/ItemCard";

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
const AddToCartConfirmation = ({
  item,
  onClose,
  delete: isDeleted = false,  // Default to false
}: {
  item: ItemType;
  onClose: () => void;
  delete?: boolean;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      window.location.reload(); // Refresh the page
    }, 500); // Auto-close after 0.5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    onClose();
    window.location.reload(); // Refresh the page
  };
  return (
    <Frame onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> 
        <H2>{isDeleted ? "Deleted From Cart" : "Added To Cart"}</H2>
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
      </ModalContent>
    </Frame>
  );
};

export default AddToCartConfirmation;
