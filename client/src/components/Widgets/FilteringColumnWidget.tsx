import styled from "styled-components";
import { useState } from "react";

const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  color: white;
  height: 100%;
  margin-top: 80px;
  margin-left: 20px;
  border-radius: 20px;
  background: #3B3B3B;
`;

const H5 = styled.h4`
  /* H5 - Work Sans */
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 30.8px */
  text-transform: capitalize;
  color: #858584;
`;

const Caption = styled.p`
  /* Caption - Space Mono */
  font-family: "Space Mono";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 13.2px */
  color: #858584;
`;

const Body = styled.p<{ isSelected: boolean }>`
  cursor: pointer;
  /* H5 - Work Sans */
  font-family: "Work Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  margin-left: 20px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  border-radius: 20px;
  background: ${({ isSelected }) => (isSelected ? "#A259FF" : "none")};
  &:hover {
    background: white;
    color: #A259FF;
  }
`;

interface FilteringColumnWidgetProps {
  onFilterChange: (selectedTags: string[], priceRange?: [number, number] | null) => void;
}

const FilteringColumnWidget: React.FC<FilteringColumnWidgetProps> = ({ onFilterChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);

  const toolTypes = ["Wireless", "Wired", "Manual"];
  const materials = ["Concrete", "Plywood", "Lumber", "Metals", "Insulation"];
  const brands = ["Dewalt", "Milwaukee", "Bosch", "Makita"];
  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: "$1 - $10", range: [1, 10] },
    { label: "$11 - $50", range: [11, 50] },
    { label: "$51 - $100", range: [51, 100] },
    { label: "$101 - above", range: [101, Infinity] }
  ];
  const discounts = ["Clearance", "Daily Deals", "On Sale", "Open Box"];

  
  const handleBodyClick = (tag: string) => {
    let updatedTags = [...selectedTags];
  
    const priceRange = priceRanges.find(pr => pr.label === tag);
    if (priceRange) {
      if (
        selectedPriceRange?.[0] === priceRange.range[0] &&
        selectedPriceRange?.[1] === priceRange.range[1]
      ) {
        // Deselect the price range if it's already selected
        setSelectedPriceRange(null);
        onFilterChange(updatedTags, null);
      } else {
        // Select the new price range immediately
        setSelectedPriceRange(priceRange.range);
        onFilterChange(updatedTags, priceRange.range);
      }
      return; // Exit early since priceRange handling is complete
    }
  
    // Handle category selection and deselection
    const isTagSelected = updatedTags.includes(tag);
  
    if (toolTypes.includes(tag)) {
      updatedTags = isTagSelected
        ? updatedTags.filter(t => t !== tag)
        : [...updatedTags.filter(t => !toolTypes.includes(t)), tag];
    } else if (materials.includes(tag)) {
      updatedTags = isTagSelected
        ? updatedTags.filter(t => t !== tag)
        : [...updatedTags.filter(t => !materials.includes(t)), tag];
    } else if (brands.includes(tag)) {
      updatedTags = isTagSelected
        ? updatedTags.filter(t => t !== tag)
        : [...updatedTags.filter(t => !brands.includes(t)), tag];
    } else if (discounts.includes(tag)) {
      updatedTags = isTagSelected
        ? updatedTags.filter(t => t !== tag)
        : [...updatedTags.filter(t => !discounts.includes(t)), tag];
    } else {
      // Handle general tag selection
      updatedTags = isTagSelected
        ? updatedTags.filter(t => t !== tag)
        : [...updatedTags, tag];
    }
  
    setSelectedTags(updatedTags);
    onFilterChange(updatedTags, selectedPriceRange);
  };
  
  
  
  

  const renderBodyItems = (items: string[], selectedTags: string[]) =>
    items.map(item => (
      <Body key={item} isSelected={selectedTags.includes(item)} onClick={() => handleBodyClick(item)}>
        {item}
      </Body>
    ));

  const renderPriceItems = (prices: { label: string; range: [number, number] }[]) =>
    prices.map(price => (
      <Body
        key={price.label}
        isSelected={
          selectedPriceRange?.[0] === price.range[0] && selectedPriceRange?.[1] === price.range[1]
        }
        onClick={() => handleBodyClick(price.label)}
      >
        {price.label}
      </Body>
    ));

  return (
    <FilterColumn>
      <H5>Type</H5>
      <ul>
        <Caption>Tools</Caption>
        {renderBodyItems(toolTypes, selectedTags)}
        <Caption>Materials</Caption>
        {renderBodyItems(materials, selectedTags)}
      </ul>
      <H5>Brands</H5>
      {renderBodyItems(brands, selectedTags)}
      <H5>Price</H5>
      {renderPriceItems(priceRanges)}
      <H5>Discount</H5>
      {renderBodyItems(discounts, selectedTags)}
    </FilterColumn>
  );
};

export default FilteringColumnWidget;
