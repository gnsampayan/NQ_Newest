import styled from "styled-components";
import { useRef, useState } from "react";
import ShopItem from "../shop-items/ShopItem";

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Group = styled.div<{ $enableWrap: boolean }>`
  display: flex;
  gap: 30px;
  justify-content: start;
  padding: 0px 60px 0px 60px;
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
`;

const RightButton = styled(Button)`
  right: 0;
  z-index: 999;
`;

interface Props {
  itemImage: Array<string>;
  itemDescription: Array<string>;
  amount: Array<string>;
  name: Array<string>;
  onClick: (itemName: string) => void;
  enableWrap?: boolean;
}

const LargeItemGroup = ({
  itemImage,
  itemDescription,
  amount,
  name,
  onClick,
  enableWrap,
}: Props) => {
  const itemGroupRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

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

  return (
    <CarouselWrapper>
      <LeftButton onClick={scrollLeftHandler}>{"<"}</LeftButton>
      <Group
        $enableWrap={enableWrap ?? false}
        ref={itemGroupRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {itemImage.map((item: string, index: number) => (
          <ShopItem
            key={item}
            itemImage={item}
            itemName={name[index]}
            itemDescription={itemDescription[index]}
            price={amount[index]}
            itemOnClick={() => onClick(name[index])}
            boxSize={"large"}
            cartVis={true}
          />
        ))}
      </Group>
      <RightButton onClick={scrollRightHandler}>{">"}</RightButton>
    </CarouselWrapper>
  );
};

export default LargeItemGroup;
