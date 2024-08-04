import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ItemType } from "../../context/Types";
import { useEffect, useState } from "react";
import apiConfig from "../../api-config";

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;

    border-radius: 20px;
    background: #3B3B3B;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 0 2px white;
    }
`
const PhotoAndIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;

    border-radius: 20px;
    background: #3B3B3B;
`
const ImageParent = styled.div`
    display: flex;
    width: 240px;
    height: 240px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0px 0px;
    object-fit: cover;
`
const CategoryIcon = styled.div`
    display: flex;
    width: 240px;
    height: 240px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 20px 20px 0px 0px;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(7.5px);

    position: absolute;
`
const Icon = styled.div`
    width: 100px;
    height: 100px;
    flex-shrink: 0;
`
const CollectionName = styled.div`
    display: flex;
    padding: 20px 30px 25px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    align-self: stretch;
`
const H5 = styled.h5`
    align-self: stretch;

    color: var(--White, #FFF);

    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
    
    transform: translateY(5px);
`
interface Props {
    image: string;
    categoryName: string;
    icon: IconType;
}
const CategoriesCard = ({ image, categoryName, icon: IconComponent } : Props) => {
    const navigate = useNavigate();
    const heading = categoryName;
    const subhead = "Shop by Category";
    const [items, setItems] = useState<ItemType[]>([]);
    const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${apiConfig.API_URL}/items`);
                const data = await response.json();
                const itemsWithTags = data.map((item: ItemType) => ({
                    ...item,
                    tags: item.tags || [], // Ensure each item has a 'tags' field initialized as an array
                }));
                setItems(itemsWithTags);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);
    useEffect(() => {
        if (items.length > 0 && categoryName) {
            const filtered = items.filter(item => item.tags.includes(categoryName));
            setFilteredItems(filtered);
        }
    }, [items, categoryName]);
    const relevantItems: ItemType[] = filteredItems;
    const handleOnClick = () => {
        const encodedItemName = encodeURIComponent(categoryName);
        navigate(`/category/${encodedItemName}`, { state: { relevantItems, heading, subhead } });
    }
  return (
    <>
        <Card onClick={handleOnClick}>
            <PhotoAndIcon>
                <ImageParent>
                    <Image src={image} alt={categoryName} />
                    <CategoryIcon>
                        <Icon>
                            <IconComponent size="3x" color="white" />
                        </Icon>
                    </CategoryIcon>
                </ImageParent>
            </PhotoAndIcon>
            <CollectionName>
                <H5>{categoryName}</H5>
            </CollectionName>
        </Card>
    </>
  )
}

export default CategoriesCard