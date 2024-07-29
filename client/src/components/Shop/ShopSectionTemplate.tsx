import styled from "styled-components";
import { BsEye } from "react-icons/bs";
import LargeItemGroup from "./itemgroup/LargeItemGroup";


const Title = styled.h1`
	color: white;
	font-size: 2.3em;
	margin-bottom: 10px;
`;
const Subtitle = styled.h2`
	color: white;
	/* Body Text- Work Sans */
	font-family: "Work Sans";
	font-style: normal;
	font-weight: 400;
	line-height: 160%; /* 35.2px */
	text-transform: capitalize;
	font-size: 1.8rem;
	font-weight: 600;
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
	padding: 40px 0px 0px 60px;
	margin: 0px 0px 40px 0px;
`;
const EyeIcon = styled(BsEye)`
	all: unset;
	fill: black;
	margin-right: 10px;
	width: 18px;
`;
const Container = styled.div<{ $stackedLayout: boolean }>`
	display: ${props => (props.$stackedLayout ? 'flex' : 'block')};
	flex-direction: column;
	align-items: center;
	width: 100%;
`;


interface Props {
	title: string;
	subtitle: string;
	goToPage?: () => void;
	showSeeAllButton?: boolean;
	stackedLayout?: boolean;
	itemImage: Array<string>;
	itemDescription: Array<string>;
	amount: Array<string>;
	name: Array<string>;
	onClick: (itemName: string) => void;
	enableWrap?: boolean;
}

const ShopSectionTemplate = ({
	title,
	subtitle,
	goToPage,
	showSeeAllButton = true, // Default to true
	stackedLayout = false,
	itemImage,
	itemDescription,
	amount,
	name,
    onClick,
    enableWrap,
}: Props) => {

	return (
		<Container $stackedLayout={stackedLayout}>
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
			<LargeItemGroup 
				itemImage={itemImage} 
				itemDescription={itemDescription} 
				amount={amount} 
				name={name} 
				onClick={onClick}
				enableWrap={enableWrap}
				/>
			
		</Container>
	);
};

export default ShopSectionTemplate;
