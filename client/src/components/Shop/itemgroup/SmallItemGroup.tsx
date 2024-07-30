import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import ItemCard from "../../Cards/ItemCard";

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Group = styled.div<{ $enableWrap: boolean }>`
  display: flex;
  gap: 30px;
  justify-content: start;
  padding: 0px 60px 0px 60px;
  overflow: hidden;
  flex-wrap: ${({ $enableWrap }) => ($enableWrap ? "wrap" : "nowrap")};
  cursor: grab;

  & > * {
    flex-shrink: 0;
  }

  height: 100%;
  width: 100%;
  user-select: none; // Prevent text selection

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
  amount: Array<number>;
  name: Array<string>;
  onClick: (itemName: string) => void;
  enableWrap?: boolean;
}

const SmallItemGroup = ({
  itemImage,
  amount,
  name,
  enableWrap,
}: Props) => {
  const itemGroupRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const scrollLeft = () => {
    if (itemGroupRef.current) {
      itemGroupRef.current.scrollBy({
        left: -220,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (itemGroupRef.current) {
      itemGroupRef.current.scrollBy({
        left: 220,
        behavior: "smooth",
      });
    }
  };

  const startAutoScroll = () => {
    // Ensure no other interval is running
    if (intervalIdRef.current) return;

    intervalIdRef.current = setInterval(() => {
      if (itemGroupRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = itemGroupRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 120;

        if (isAtEnd) {
          itemGroupRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          itemGroupRef.current.scrollBy({
            left: 220,
            behavior: "smooth",
          });
        }
      }
    }, 3000); // 3 seconds
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null; // Clear the reference
      }
    };
  }, []);

  const stopAutoScroll = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null; // Clear the reference
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (itemGroupRef.current) {
      setIsDragging(true);
      setStartX(e.pageX);
      setScrollStart(itemGroupRef.current.scrollLeft);
      itemGroupRef.current.style.cursor = "grabbing"; // Change cursor to grabbing
      e.preventDefault(); // Prevent default behavior
      stopAutoScroll(); // Stop auto-scrolling
    }
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (itemGroupRef.current) {
        itemGroupRef.current.style.cursor = "grab"; // Reset cursor to grab
      }
      startAutoScroll(); // Restart auto-scrolling
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (itemGroupRef.current) {
      itemGroupRef.current.style.cursor = "grab"; // Reset cursor to grab
    }
    startAutoScroll(); // Restart auto-scrolling
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
      <LeftButton onClick={scrollLeft}>{"<"}</LeftButton>
      <Group
        $enableWrap={enableWrap ?? false}
        ref={itemGroupRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {itemImage.map((item: string, index: number) => (
          <ItemCard 
            image={item}
            itemName={name[index]}
            addToCart={() => { } }
            price={amount[index]}
            rating={0} 
            boxSize={"standard"} />
        ))}
      </Group>
      <RightButton onClick={scrollRight}>{">"}</RightButton>
    </CarouselWrapper>
  );
};

export default SmallItemGroup;
