import styled from "styled-components";
import { useEffect, useState } from "react";
import { ItemType } from "../../../context/Types";
import apiConfig from "../../../api-config";
import ItemCard from "../../Cards/ItemCard";
import FilteringColumnWidget from "../../Widgets/FilteringColumnWidget";
import FilterButtonWithDropDown from "../../Buttons/FilterButtonWithDropDown";

const Spread = styled.div`
  width: 100%;
  height: 100%;
`;
const Items = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
`;
const Floor = styled.div`
	width: 100%;
	display: flex;
`
const FilterButtonContainer = styled.div`
  margin-right: 60px;
`
const GenericSpread = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
  const [dropdownOption, setDropdownOption] = useState<string>("All");

  

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
  
    // Filter by tags
    if (tags.length > 0) {
      filtered = filtered.filter(item =>
        tags.every(tag =>
          item.tags.some(itemTag => itemTag.toLowerCase() === tag.toLowerCase())
        )
      );
    }
  
    // Filter by price range
    if (priceRange) {
      filtered = filtered.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    }
  
    // Filter and sort by dropdown option
    if (dropdown === "Lowest Price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (dropdown === "Highest Price") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (dropdown === "Biggest Discounts") {
      filtered = filtered
        .filter(item => item.saleRate !== undefined && item.saleRate !== null) // Filter out items without a saleRate
        .sort((a, b) => a.saleRate! - b.saleRate!); // Sort items by saleRate in ascending order (lowest saleRate first)
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

  const handleDropdownChange = (dropdown: string) => {
    setDropdownOption(dropdown);
    applyFilters(selectedTags, selectedPriceRange, dropdown);
  };
  
  return (
    <Floor>
      <FilteringColumnWidget onFilterChange={handleFilterChange} />
      <Spread>
        <FilterButtonContainer>
          <FilterButtonWithDropDown
            onFilterChange={handleDropdownChange}
            totalVisibleItems={filteredItems.length}
          />
        </FilterButtonContainer>
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