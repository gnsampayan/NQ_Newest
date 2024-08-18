import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ItemType } from "../context/Types";
import ItemCard from "../components/Cards/ItemCard";
import AddToCartConfirmation from "../components/Widgets/Elements/AddToCartConfirmation";
import { useEffect, useState } from "react";
import { addItemToCart } from "../utils/utilityFunctions";
import FilterButtonWithDropDown from "../components/Buttons/FilterButtonWithDropDown";
import apiConfig from "../api-config";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 60px;
  min-height: calc(100vh - 100px);
`;

const SectionHeadlineAndButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: auto;
`;

const SectionHeadline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const H3 = styled.h3`
  align-self: stretch;
  color: white;
  font-family: "Work Sans";
  font-size: 38px;
  font-weight: 600;
  line-height: 120%;
  text-transform: capitalize;
`;

const P = styled.p`
  align-self: stretch;
  color: white;
  font-family: "Work Sans";
  font-size: 22px;
  font-weight: 400;
  line-height: 160%;
  text-transform: capitalize;
`;

const ItemCardsCollection = styled.div`
  display: flex;
  gap: 30px;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

const NoItems = styled.div`
  font-size: 18px;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

const ItemFrame = styled.div`
  max-width: 330px;
  display: flex;
`;

const FilterButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: ${({ active }) => (active ? "#3B3B3B" : "none")};
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  ${({ disabled }) =>
    disabled &&
    `
    background: none;
    cursor: not-allowed;
  `}
  &:hover {
    background: ${({ disabled }) => (disabled ? "none" : "white")};
    color: #A259FF;
  }
`;

const FilteredPage = () => {
  const location = useLocation();
  const { relevantItems, heading, subhead, filterName } = (location.state as {
    relevantItems: ItemType[];
    heading: string;
    subhead: string;
    filterName: string;
  }) || { relevantItems: [], heading: "", subhead: "", filterName: "" };

  const [allItems, setAllItems] = useState<ItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);
  const [dropdownOption, setDropdownOption] = useState<string>("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items to display per page

  useEffect(() => {
    const initializeItems = async () => {
      if (relevantItems && relevantItems.length > 0) {
        setAllItems(relevantItems);
      } else {
        try {
          console.log(`Fetching items with tag: ${filterName}`);
          const response = await fetch(`${apiConfig.API_URL}/items?tag=${filterName}`);
          const data = await response.json();
          console.log("Fetched items:", data);
          setAllItems(data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      }
    };

    initializeItems();
  }, [relevantItems, filterName]);

  // Apply filters when dropdownOption or allItems changes
  useEffect(() => {
    applyFilters(dropdownOption);
  }, [dropdownOption, allItems]);

  const applyFilters = (dropdown: string) => {
    if (!allItems) return;
    let filtered = [...allItems];

    if (dropdown === "Lowest Price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (dropdown === "Highest Price") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (dropdown === "Biggest Discounts") {
      filtered = filtered
        .filter(
          (item) => item.saleRate !== undefined && item.saleRate !== null
        ) // Filter out items without a saleRate
        .sort((a, b) => a.saleRate! - b.saleRate!); // Sort items by saleRate in ascending order (lowest saleRate first)
    } else if (dropdown !== "All") {
      filtered = filtered.filter((item) =>
        item.tags.some((tag) => tag.toLowerCase() === dropdown.toLowerCase())
      );
    }
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDropdownChange = (dropdown: string) => {
    console.log("Dropdown changed to:", dropdown);
    setDropdownOption(dropdown);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCartClick = async (newItem: ItemType) => {
    await addItemToCart(newItem, setConfirmationItem);
  };

  return (
    <>
      <Container>
        <SectionHeadlineAndButton>
          <SectionHeadline>
            <H3>{heading}</H3>
            <P>{subhead}</P>
          </SectionHeadline>
        </SectionHeadlineAndButton>
        <FilterButtonContainer>
          <FilterButtonWithDropDown
            onFilterChange={handleDropdownChange}
            totalVisibleItems={filteredItems.length}
          />
        </FilterButtonContainer>
        <ItemCardsCollection>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((i) => (
              <ItemFrame key={i.id}>
                <ItemCard
                  image={i.image}
                  itemName={i.title}
                  addToCart={() => handleAddToCartClick(i)}
                  price={i.price}
                  rating={i.rating}
                  boxSize={"large"}
                  saleBool={i.saleBool}
                  saleRate={i.saleRate}
                />
              </ItemFrame>
            ))
          ) : (
            <NoItems>No items</NoItems>
          )}
        </ItemCardsCollection>
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
      </Container>
      {confirmationItem && (
        <AddToCartConfirmation
          item={confirmationItem}
          onClose={() => setConfirmationItem(null)} // Close the confirmation modal
        />
      )}
    </>
  );
};

export default FilteredPage;
