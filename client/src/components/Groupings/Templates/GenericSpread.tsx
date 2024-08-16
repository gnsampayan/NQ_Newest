import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { ItemType } from "../../../context/Types";
import apiConfig from "../../../api-config";
import ItemCard from "../../Cards/ItemCard";
import ButtonCounter from "../../Buttons/ButtonCounter";
import FilteringColumnWidget from "../../Widgets/FilteringColumnWidget";

const Spread = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 60px;
  position: relative;
`;

const Dropdown = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  right: 60px;
  background-color: rgba(43, 43, 43, 1);
  border: 2px solid #858584;
  border-radius: 20px;
  width: auto;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  z-index: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;

  &:hover {
    border-color: white;
  }
`;

const Option = styled.h5`
  color: white;
  text-align: center;
  font-family: "Work Sans";
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
`;

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
`;

const ButtonRef = styled.div`
  position: relative;
`;
const Floor = styled.div`
	width: 100%;
	display: flex;
`


const GenericSpread = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
  const [dropdownOption, setDropdownOption] = useState<string>("All");

  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${apiConfig.API_URL}/items`);
        const data = await response.json();
        const itemsWithTags = data.map((item: ItemType) => ({
          ...item,
          tags: item.tags || [],
        }));
        setItems(itemsWithTags);
        setFilteredItems(itemsWithTags); // Initially display all items
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const applyFilters = (tags: string[], priceRange: [number, number] | null, dropdown: string) => {
    let filtered = [...items];

    if (tags.length > 0) {
      filtered = filtered.filter(item =>
        tags.every(tag =>
          item.tags.some(itemTag => itemTag.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    if (priceRange) {
      filtered = filtered.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    }

    if (dropdown === "Lowest Price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (dropdown === "Highest Price") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (dropdown !== "All") {
      filtered = filtered.filter(item =>
        item.tags.some(tag => tag.toLowerCase() === dropdown.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleFilterChange = (newSelectedTags: string[], newPriceRange?: [number, number] | null) => {
    const updatedPriceRange = newPriceRange || null;
    setSelectedTags(newSelectedTags);
    setSelectedPriceRange(updatedPriceRange);
    applyFilters(newSelectedTags, updatedPriceRange, dropdownOption);
  };

  const handleOptionClick = (option: string) => {
    setButtonTitle(option);
    setDropdownOption(option);
    setIsDropdownVisible(false);
    applyFilters(selectedTags, selectedPriceRange, option);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const renderOptions = () => {
    const options = [
      "All",
      "Featured",
      "Lowest Price",
      "Highest Price",
      "Best Deals",
      "Best Sellers",
      "Best Rating",
      "Most Reviews",
      "Biggest Discounts",
    ];

    return options
      .filter((option) => option !== buttonTitle)
      .map((option) => (
        <Option key={option} onClick={() => handleOptionClick(option)}>
          {option}
        </Option>
      ));
  };

  return (
    <Floor>
      <FilteringColumnWidget onFilterChange={handleFilterChange} />
      <Spread>
        <ButtonContainer>
          <ButtonRef ref={buttonRef}>
            <ButtonCounter
              onClick={toggleDropdown}
              title={buttonTitle}
              type="default"
              totalVisItemsCards={filteredItems.length} // Show count of visible items
            />
          </ButtonRef>
          <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
            {renderOptions()}
          </Dropdown>
        </ButtonContainer>
        <Items>
          {filteredItems.map((item, index) => (
            <ItemCard
              key={index}
              image={item.image}
              itemName={item.title}
              addToCart={() => { } }
              price={item.price}
              rating={0}
              boxSize="standard" 
              saleBool={item.saleBool} 
              saleRate={item.saleRate}          
            />
          ))}
        </Items>
      </Spread>
    </Floor>
  );
};

export default GenericSpread;