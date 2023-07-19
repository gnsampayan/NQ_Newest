import styled from "styled-components";

import AllItemsView from "./AllItemsView";

import featuredItems from "./featuredItems.json";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const FeaturedPage = () => {
	return (
		<>
			<Wrapper>
				<AllItemsView itemsList={featuredItems} />
			</Wrapper>
		</>
	);
};

export default FeaturedPage;
