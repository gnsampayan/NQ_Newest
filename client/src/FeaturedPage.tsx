import styled from "styled-components";
import { useEffect, useState } from "react";

import AllItemsView from "./AllItemsView";

// import featuredItems from "./featuredItems.json";

interface UserData {
	item_id: number;
	image: string;
	name: string;
	description: string;
	price: number;
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const FeaturedPage = () => {
	const [userData, setUserData] = useState<UserData[]>([]);

	useEffect(() => {
		fetch("http://localhost:8081/data")
			.then((response) => response.json() as Promise<UserData[]>)
			.then((data) => {
				setUserData(data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);
	return (
		<>
			<Wrapper>
				<AllItemsView itemsList={userData} />
			</Wrapper>
			{console.log(userData)}
		</>
	);
};

export default FeaturedPage;
