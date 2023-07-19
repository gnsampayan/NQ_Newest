import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import styled from "styled-components";
import { BsEye } from "react-icons/bs";

const ItemGroup = styled.div`
	display: flex;
	gap: 30px;
	justify-content: center;
	padding: 0px 60px 0px 60px;
`;
const Title = styled.h1`
	color: white;
	font-size: 2.3em;
	margin-bottom: 10px;
`;
const Subtitle = styled.h2`
	color: white;
	font-size: 1.3em;
	font-weight: 300;
`;
const SeeAllButton = styled.button`
	all: unset;
	font-size: 0.9em;
	color: white;
	border: solid 2px #a259ff;
	border-radius: 100vw;
	font-weight: 600;
	height: 50px;
	width: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: rgba(162, 89, 255, 0.4);
	}
`;
const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
	padding: 100px 60px 20px 60px;
	margin: 0px 0px 60px 0px;
`;
const EyeIcon = styled(BsEye)`
	all: unset;
	fill: #a259ff;
	margin-right: 10px;
	width: 18px;
`;

interface Props {
	title: string;
	subtitle: string;
	itemImage: Array<string>;
	description: string;
	amount: number;
	name: Array<string>;
	goToPage: () => void;
}

const ShopSection = ({
	title,
	subtitle,
	itemImage,
	description,
	amount,
	name,
	goToPage,
}: Props) => {
	const [visibleItems, setVisibleItems] = useState(itemImage);
	useEffect(() => {
		const handleResize = () => {
			const breakpoints = [
				{ width: 710, itemImage: 1 },
				{ width: 1100, itemImage: 2 },
				{ width: 1400, itemImage: 3 },
				{ width: 1680, itemImage: 4 },
				{ width: 2300, itemImage: 5 },
			];
			const width = window.innerWidth;
			const breakpoint = breakpoints.find((bp) => width < bp.width);
			setVisibleItems(
				breakpoint ? itemImage.slice(0, breakpoint.itemImage) : itemImage
			);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<>
			<SectionHeader>
				<div>
					<Title>{title}</Title>
					<Subtitle>{subtitle}</Subtitle>
				</div>
				<SeeAllButton onClick={goToPage}>
					<EyeIcon />
					See All
				</SeeAllButton>
			</SectionHeader>

			<ItemGroup>
				{visibleItems.map((item: string, index: number) => (
					<ShopItem
						key={item}
						itemImage={item}
						itemName={name[index]}
						itemDescription={description}
						price={amount}
					/>
				))}
			</ItemGroup>
		</>
	);
};

export default ShopSection;
