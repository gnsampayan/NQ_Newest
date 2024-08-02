import styled from "styled-components";
import { BsEye } from "react-icons/bs";
import LargeCarousel from "./LargeCarousel";
import Button from "../../Buttons/Button";

const H3 = styled.h3`
    align-self: stretch;
    color: white;
    /* H3 - Work Sans */
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 45.6px */
    text-transform: capitalize;
`
const P = styled.p`
    align-self: stretch;
    color: white;
    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
	padding: 40px 60px 0px 60px;
	margin: 0px 0px 40px 0px;
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
	itemDescription?: Array<string>;
	amount: Array<number>;
	name: Array<string>;
	onClick: (itemName: string) => void;
	enableWrap?: boolean;
}

const GenericRow = ({
	title,
	subtitle,
	goToPage,
	showSeeAllButton = true, // Default to true
	stackedLayout = false,
	itemImage,
	amount,
	name,
    onClick,
    enableWrap,
}: Props) => {

		const handleClick = () => {
			if (goToPage) {
				goToPage();
			}
		};
		return (
			<Container $stackedLayout={stackedLayout}>
				<SectionHeader>
					<div>
						<H3>{title}</H3>
						<P>{subtitle}</P>
					</div>
					{showSeeAllButton && (
						<Button 
							asset={BsEye} 
							title={"See All"} 
							onClick={handleClick}
							fillHoverColor={"white"}
							/>
					)}
				</SectionHeader>
				<LargeCarousel 
					itemImage={itemImage}
					amount={amount} 
					name={name} 
					onClick={onClick}
					enableWrap={enableWrap}
					/>
				
			</Container>
		);
};

export default GenericRow;
