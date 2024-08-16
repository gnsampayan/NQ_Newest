import { FaTrashAlt } from "react-icons/fa";
import ItemCard from "../components/Cards/ItemCard";
import { ItemType } from "../context/Types";
import apiConfig from "../api-config";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
`;

const Frame = styled.div`
    width: auto;
    padding: 20px;
`;

const Header = styled.h3`
    color: var(--White, #FFF);
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    text-transform: capitalize;
`;

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
`;

const ItemContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 330px;
`;

const DeleteButton = styled.button`
    all: unset;
    position: absolute;
    top: 10px;
    right: 10px;
    background: #2B2B2B;
    padding: 6px 10px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    &:hover {
        color: red;
        outline: 1px solid red;
    }
`;

const ConfirmationModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #2B2B2B;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
`;

const ModalItemContent = styled.p`
    color: white;
    margin-bottom: 20px;
    max-width: 300px;
    height: 100%;
    overflow: hidden;
    padding: 0px 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const ModalButton = styled.button`
    background: #A259FF;
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #8e49e6;
    }
`;
const Caption = styled.p`
    color: var(--White, #FFF);
    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const ConfirmationButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState<ItemType[]>([]);
    const [itemToDelete, setItemToDelete] = useState<ItemType | null>(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Fetch the wishlist
                    const wishlistResponse = await fetch(`${apiConfig.API_URL}/wishlists`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!wishlistResponse.ok) {
                        console.error("Failed to fetch wishlist items.");
                        return;
                    }

                    const wishlistData = await wishlistResponse.json();
                    const itemIds = wishlistData.itemIdsArray;

                    // Fetch all items
                    const itemsResponse = await fetch(`${apiConfig.API_URL}/items`);
                    if (!itemsResponse.ok) {
                        console.error("Failed to fetch items.");
                        return;
                    }

                    const itemsData: ItemType[] = await itemsResponse.json();

                    // Filter and match wishlist items
                    const matchedItems = itemsData.filter(item => itemIds.includes(item.id));
                    setWishlistItems(matchedItems);
                } catch (error) {
                    console.error("Error fetching wishlist items:", error);
                }
            } else {
                console.error("User not authenticated.");
            }
        };

        fetchWishlistItems();
    }, []);

    const confirmDelete = (item: ItemType) => {
        setItemToDelete(item);
    };

    const handleDeleteFromWishlist = async () => {
        if (!itemToDelete) return;

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(`${apiConfig.API_URL}/wishlists/${itemToDelete.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Remove the item from the state
                    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== itemToDelete.id));
                    setItemToDelete(null);
                } else {
                    console.error("Failed to delete item from wishlist.");
                }
            } catch (error) {
                console.error("Error deleting item from wishlist:", error);
            }
        } else {
            console.error("User not authenticated.");
        }
    };

    const handleCloseModal = () => {
        setItemToDelete(null);
    };

    return (
        <Wrapper>
            <Frame>
                <Header>My Wishlist</Header>
                <Items>
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((item) => (
                            <ItemContainer key={item.id}>
                                <ItemCard
                                    image={item.image}
                                    itemName={item.title}
                                    addToCart={() => {}} // Implement if needed
                                    price={item.price}
                                    rating={item.rating}
                                    boxSize={"large"}
                                    saleBool={item.saleBool}
                                    saleRate={item.saleRate}
                                />
                                <DeleteButton onClick={() => confirmDelete(item)}>
                                    <FaTrashAlt style={{transform: "translateY(-3px)"}} />
                                </DeleteButton>
                            </ItemContainer>
                        ))
                    ) : (
                        <p>Your wishlist is empty.</p>
                    )}
                </Items>
            </Frame>

            {itemToDelete && (
                <ConfirmationModal>
                    <ModalContent>
                            <ModalItemContent>
                                <Caption>Remove from wishlist?</Caption>
                                <ItemCard
                                        image={itemToDelete.image}
                                        itemName={itemToDelete.title}
                                        addToCart={() => {}} // Implement if needed
                                        price={itemToDelete.price}
                                        rating={itemToDelete.rating}
                                        boxSize={"standard"}
                                        saleBool={itemToDelete.saleBool}
                                        saleRate={itemToDelete.saleRate}
                                    />
                            </ModalItemContent>
                            <ConfirmationButtons>
                                <ModalButton onClick={handleDeleteFromWishlist}>Yes, Delete</ModalButton>
                                <ModalButton onClick={handleCloseModal}>Cancel</ModalButton>
                            </ConfirmationButtons>
                    </ModalContent>
                </ConfirmationModal>
            )}
        </Wrapper>
    );
};

export default WishlistPage;
