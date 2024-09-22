import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
`;
const FilterButtonContainer = styled.div`
  margin-right: 60px;
`;
const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ active?: boolean, disabled?: boolean }>`
  background: ${({ active }) => (active ? "#3B3B3B" : "none")};
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  ${({ disabled }) => disabled && `
    background: none;
    cursor: not-allowed;
  `}
  &:hover {
    background: ${({ disabled }) => (disabled ? "none" : "white")};
    color: #A259FF;
  }
`;

const GenericSpread = () => {
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
  const [dropdownOption, setDropdownOption] = useState<string>("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items to display per page

  // Fetch items using useQuery
  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const response = await fetch(`${apiConfig.API_URL}/items`);

      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.statusText}`);
      }

      const data = await response.json();

      return data.map((item: ItemType) => ({
        ...item,
        tags: item.tags || [],
      }));
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  const applyFilters = (
    tags: string[],
    priceRange: [number, number] | null,
    dropdown: string
  ) => {
    let filtered = [...items];

    // Filter by tags
    if (tags.length > 0) {
      filtered = filtered.filter((item) =>
        tags.every((tag) =>
          item.tags.some((itemTag: string) => itemTag.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    // Filter by price range
    if (priceRange) {
      filtered = filtered.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );
    }

    // Filter and sort by dropdown option
    if (dropdown === "Lowest Price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (dropdown === "Highest Price") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (dropdown === "Biggest Discounts") {
      filtered = filtered
        .filter((item) => item.saleRate !== undefined && item.saleRate !== null)
        .sort((a, b) => a.saleRate! - b.saleRate!);
    } else if (dropdown !== "All") {
      filtered = filtered.filter((item) =>
        item.tags.some((tag: string) => tag.toLowerCase() === dropdown.toLowerCase())
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  };

  const handleFilterChange = (
    newSelectedTags: string[],
    newPriceRange?: [number, number] | null
  ) => {
    const updatedPriceRange = newPriceRange || null;
    setSelectedTags(newSelectedTags);
    setSelectedPriceRange(updatedPriceRange);
    applyFilters(newSelectedTags, updatedPriceRange, dropdownOption);
  };

  const handleDropdownChange = (dropdown: string) => {
    setDropdownOption(dropdown);
    applyFilters(selectedTags, selectedPriceRange, dropdown);
  };

  // Apply filters whenever items change
  useEffect(() => {
    if (items.length > 0) {
      applyFilters(selectedTags, selectedPriceRange, dropdownOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {isLoading ? (
          <p>Loading items...</p>
        ) : isError ? (
          <p>Error fetching items.</p>
        ) : (
          <>
            <Items>
              {paginatedItems.map((item, index) => (
                <ItemCard
                  key={index}
                  image={item.image}
                  itemName={item.title}
                  addToCart={() => { }}
                  price={item.price}
                  rating={0}
                  boxSize="standard"
                  saleBool={item.saleBool}
                  saleRate={item.saleRate}
                />
              ))}
            </Items>
            <PaginationControls>
              <PaginationButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </PaginationButton>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationButton
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              ))}
              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </PaginationButton>
            </PaginationControls>
          </>
        )}
      </Spread>
    </Floor>
  );
};

export default GenericSpread;
