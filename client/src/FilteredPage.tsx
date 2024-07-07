import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ShopSectionTemplate from "./components/Shop/ShopSectionTemplate";
import { ItemType } from "./context/Types";
import { sectionText } from "./components/Shop/sectionText";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const FilteredPage = () => {
	const location = useLocation();
	const { filteredItems } = (location.state as { filteredItems: ItemType[] }) || { filteredItems: [] };

    // Function to find the section based on tags
	const findSectionByTags = (items: ItemType[]) => {
		// Assuming the first item's tags are representative of the section
		const tags = items[0]?.tags || [];
		return sectionText.find(section => 
			tags.some(tag => section.subtitle === tag)
		) || { title: 'Unknown Section', subtitle: 'Unknown' };
	};

	// Find the section for the filtered items
	const section = findSectionByTags(filteredItems);

	return (
        <Wrapper>
            {/* Render ShopSectionTemplate with filtered items */}
            <ShopSectionTemplate 
                title={section.title}
                subtitle={section.subtitle}
                itemImage={filteredItems.map((item: ItemType) => `data:image/jpeg;base64,${item.image}`)}
                itemDescription={filteredItems.map((item: ItemType) => item.description)}
                amount={filteredItems.map((item: ItemType) => item.price)}
                name={filteredItems.map((item: ItemType) => item.title)}
                onClick={(itemName: string) => { console.log('onClick is Clicked' + itemName)}}
				showSeeAllButton={false}
				stackedLayout={true}
				enableWrap={true}
            />
        </Wrapper>
    );
};

export default FilteredPage;
