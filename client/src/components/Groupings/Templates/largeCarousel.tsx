import styled from "styled-components";
import { useRef, useState } from "react";
import ItemCard from "../../Cards/ItemCard";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { ItemType } from "../../../context/Types";
import AddToCartConfirmation from "../../Widgets/Modals/AddToCartConfirmation";
import { addItemToCart } from "../../../utils/utilityFunctions";

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Group = styled.div<{ $enableWrap: boolean }>`
  display: flex;
  gap: 30px;
  justify-content: start;
  padding: 10px 60px 10px 60px;
  overflow-x: auto;
  flex-wrap: ${({ $enableWrap }) => ($enableWrap ? "wrap" : "nowrap")};
  cursor: grab;

  & > * {
    flex-shrink: 0;
  }

  user-select: none; // Prevent text selection

  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for better UI
  }

  & img {
    pointer-events: none; // Prevent dragging images
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const LeftButton = styled(Button)`
  left: 0;
  z-index: 999;
  border-radius: 0px 30px 30px 0px;
  opacity: 0.1;
  &:hover {
    opacity: 1;
  }
`;

const RightButton = styled(Button)`
  right: 0;
  z-index: 999;
  border-radius: 30px 0px 0px 30px;
  opacity: 0.1;
  &:hover {
    opacity: 1;
  }
`;
const ArrowLeftIcon = styled(BsArrowLeftCircle)`
  width: 40px;
  height: 40px;
`
const ArrowRightIcon = styled(BsArrowRightCircle)`
  width: 40px;
  height: 40px;
`

interface Props {
  items: ItemType[];
}

const LargeCarousel = ({
  items
}: Props) => {
  const itemGroupRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);

  const scrollLeftHandler = () => {
    if (itemGroupRef.current) {
      itemGroupRef.current.scrollBy({
        left: -220,
        behavior: "smooth",
      });
    }
  };

  const scrollRightHandler = () => {
    if (itemGroupRef.current) {
      itemGroupRef.current.scrollBy({
        left: 220,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (itemGroupRef.current) {
      setIsDragging(true);
      setStartX(e.pageX);
      setScrollStart(itemGroupRef.current.scrollLeft);
      itemGroupRef.current.style.cursor = "grabbing"; // Change cursor to grabbing
      e.preventDefault(); // Prevent default behavior
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    if (itemGroupRef.current) {
      itemGroupRef.current.style.cursor = "grab"; // Reset cursor to grab
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (itemGroupRef.current) {
      itemGroupRef.current.style.cursor = "grab"; // Reset cursor to grab
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (itemGroupRef.current) {
      const x = e.pageX;
      const walk = x - startX;
      itemGroupRef.current.scrollLeft = scrollStart - walk;
    }
  };
  
  const handleAddToCartClick = async (newItem: ItemType) => {
    await addItemToCart(newItem, setConfirmationItem);
};



  return (
    <>
      <CarouselWrapper>
        <LeftButton onClick={scrollLeftHandler}>
          <ArrowLeftIcon/>
        </LeftButton>
        <Group
          $enableWrap={false}
          ref={itemGroupRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {items.map((item: ItemType, index: number) => (
            <ItemCard 
              key={index}
              image={item.image} 
              itemName={item.title} 
              addToCart={() => handleAddToCartClick(item)}
              price={item.price} 
              rating={item.rating || 0} 
              boxSize={"large"} />
          ))}
        </Group>
        <RightButton onClick={scrollRightHandler}>
          <ArrowRightIcon />
        </RightButton>
      </CarouselWrapper>
      {confirmationItem && (
        <AddToCartConfirmation 
            item={confirmationItem} 
            onClose={() => setConfirmationItem(null)} // Close the confirmation modal
        />
      )}
    </>
  );
};

export default LargeCarousel;
