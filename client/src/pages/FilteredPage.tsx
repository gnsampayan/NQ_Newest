import styled from "styled-components"
import { useLocation } from "react-router-dom";
import { ItemType } from "../context/Types";
import ItemCard from "../components/Cards/ItemCard";
import AddToCartConfirmation from "../components/Widgets/Elements/AddToCartConfirmation";
import { useState } from "react";
import { addItemToCart } from "../utils/utilityFunctions";

const Container = styled.div`
	display: flex;
	justify-content: center;
    flex-direction: column;
    padding: 60px;
    min-height: calc(100vh - 100px);
`;

const SectionHeadlineAndButton = styled.div`
    display: inline-flex;
    align-items: flex-end;
    gap: 100px;
    width: 100%;
    margin-bottom: 50px;
`
const SectionHeadline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
`
const H3 = styled.h3`
    align-self: stretch;
    color: white;
    /* H3 - Work Sans */
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 45.6px */
    text-transform: capitalize;
`
const P = styled.p`
    align-self: stretch;
    color: white;
    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const ItemCardsCollection = styled.div`
    display: flex;
    gap: 30px;
    height: auto;
    flex-wrap: wrap;
`
const NoItems = styled.div`
  font-size: 18px;
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

const FilteredPage = () => {
    const location = useLocation();
    const { relevantItems, heading, subhead } = (location.state as { 
        relevantItems: ItemType[], 
        heading: string, 
        subhead: string 
    }) || { relevantItems: [] };
    const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);

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
                <ItemCardsCollection>
                    {relevantItems && relevantItems.length > 0 ? (
                        relevantItems.map(i => (
                            <ItemCard
                                key={i.id}
                                image={i.image}
                                itemName={i.title}
                                addToCart={() => handleAddToCartClick(i)} // add addToCart function here
                                price={i.price}
                                rating={i.rating}
                                boxSize={"large"} 
                                saleBool={i.saleBool} 
                                saleRate={i.saleRate}
                            />
                        ))
                        ) : (
                        <NoItems>No items</NoItems>
                    )}
                </ItemCardsCollection>
            </Container>
            {confirmationItem && (
                <AddToCartConfirmation 
                    item={confirmationItem} 
                    onClose={() => setConfirmationItem(null)} // Close the confirmation modal
                />
            )}
        </>
    )
}

export default FilteredPage