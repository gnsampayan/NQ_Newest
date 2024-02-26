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
	color: black;
	font-size: 2.3em;
	margin-bottom: 10px;
`;
const Subtitle = styled.h2`
	color: black;
	font-size: 1.8rem;
	font-weight: 600;
	color: rgb(0, 0, 0, 0.5);
	text-transform: uppercase;
`;
const SeeAllButton = styled.button`
	all: unset;
	font-size: 0.9em;
	color: black;
	border: solid 1px black;
	border-radius: 100vw;
	font-weight: 600;
	height: 50px;
	width: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #dbdbdb;
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
	fill: black;
	margin-right: 10px;
	width: 18px;
`;

interface Props {
	title: string;
	subtitle: string;
	itemImage: Array<string>;
	itemDescription: Array<string>;
	amount: Array<string>;
	name: Array<string>;
	goToPage?: () => void;
	onClick: (itemName: string) => void;
	showSeeAllButton?: boolean;
}

const ShopSectionTemplate = ({
	title,
	subtitle,
	itemImage,
	itemDescription,
	amount,
	name,
	goToPage,
	onClick,
	showSeeAllButton = true, // Default to true
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
	}, [itemImage]);
	return (
		<>
			<SectionHeader>
				<div>
					<Title>{title}</Title>
					<Subtitle>{subtitle}</Subtitle>
				</div>
				{showSeeAllButton && (
					<SeeAllButton onClick={goToPage}>
						<EyeIcon />
						See All
					</SeeAllButton>
				)}
			</SectionHeader>

			<ItemGroup>
				{visibleItems.map((item: string, index: number) => (
					<ShopItem
						key={item}
						itemImage={item}
						itemName={name[index]}
						itemDescription={itemDescription[index]}
						price={amount[index]}
						itemOnClick={() => onClick(name[index])}
					/>
				))}
			</ItemGroup>
		</>
	);
};

export default ShopSectionTemplate;
