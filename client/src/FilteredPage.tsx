import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ShopSectionTemplate from "./components/ShopSectionTemplate";
import { ItemType } from "./context/Types";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const FilteredPage = () => {
	const location = useLocation();
	const { filteredItems } = (location.state as { filteredItems: ItemType[] }) || { filteredItems: [] };


	return (
        <Wrapper>
            {/* Render ShopSectionTemplate with filtered items */}
            <ShopSectionTemplate 
                title={"Filtered Items"}
                subtitle={"Add subtitle"}
                itemImage={filteredItems.map((item: ItemType) => `data:image/jpeg;base64,${item.image}`)}
                itemDescription={filteredItems.map((item: ItemType) => item.description)}
                amount={filteredItems.map((item: ItemType) => item.price)}
                name={filteredItems.map((item: ItemType) => item.title)}
                onClick={(itemName: string) => { console.log('onClick is Clicked' + itemName)}}
				showSeeAllButton={false}
            />
        </Wrapper>
    );
};

export default FilteredPage;
