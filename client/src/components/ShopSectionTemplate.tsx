import { useState, useEffect, useRef } from "react";
import ShopItem from "./ShopItem";
import styled from "styled-components";
import { BsEye } from "react-icons/bs";

const ItemGroup = styled.div<{ enableWrap: boolean }>`
	display: flex;
	gap: 30px;
	justify-content: start;
	padding: 0px 60px 0px 60px;
	overflow-x: auto;
	flex-wrap: ${({ enableWrap }) => enableWrap ? 'wrap' : 'nowrap'};
	// Ensure the children (ShopItem) do not shrink and maintain their size
    & > * {
        flex-shrink: 0;
    }
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
	stackedLayout?: boolean;
	enableWrap?: boolean;
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
	stackedLayout = false,
	enableWrap,
}: Props) => {
	
	const Container = styled.div`
	display: ${stackedLayout ? 'flex' : 'block'};
	flex-direction: column;
	align-items: center;
	width: 100%;
	`;
	const itemGroupRef = useRef<HTMLDivElement>(null);


	return (
		<Container>
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

			<ItemGroup enableWrap={enableWrap ?? false} ref={itemGroupRef}>
				{itemImage.map((item: string, index: number) => (
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
		</Container>
	);
};

export default ShopSectionTemplate;
