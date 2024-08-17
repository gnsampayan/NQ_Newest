import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ButtonCounter from "./ButtonCounter";

const Dropdown = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  background-color: rgba(43, 43, 43, 1);
  border: 2px solid #858584;
  border-radius: 20px;
  width: auto;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  z-index: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  gap: 10px;

  &:hover {
    border-color: white;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;
const Option = styled.h5`
    width: auto;
    display: flex;
    flex-direction: row;
    color: white;
    text-align: start;
    font-family: "Work Sans";
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
`;
const ButtonRef = styled.div`
  position: relative;
`;

interface FilterButtonWithDropDownProps {
    onFilterChange: (dropdown: string) => void;
    totalVisibleItems: number;
  }
  const FilterButtonWithDropDown: React.FC<FilterButtonWithDropDownProps> = ({ onFilterChange, totalVisibleItems }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [buttonTitle, setButtonTitle] = useState("All");
    

    const handleOptionClick = (option: string) => {
        setButtonTitle(option);
        onFilterChange(option); // Notify parent component about the dropdown change
        setIsDropdownVisible(false);
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
    <ButtonContainer>
        <ButtonRef ref={buttonRef}>
            <ButtonCounter
                onClick={toggleDropdown}
                title={buttonTitle}
                type="default"
                totalVisItemsCards={totalVisibleItems} // Show count of visible items
            />
        </ButtonRef>
        <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
            {renderOptions()}
        </Dropdown>
    </ButtonContainer>
  )
}

export default FilterButtonWithDropDown