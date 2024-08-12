import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import MainLogo from "../assets/images/NQ-temp-logo.png";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { BsCart3 } from "react-icons/bs";
import { useCart } from '../context/CartContext';

const NavBox = styled.nav`
	background-color: #221F27;
	height: 100px;
	position: fixed;
	top: 0;
	padding: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	z-index: 999;

	user-select: none; /* Standard syntax */
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For IE and Edge */
`;

const NavMenu = styled.ul`
	list-style: none;
	color: white;
	margin-bottom: 0;
	display: inline-flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
`;

const NavItem = styled.button`
	all: unset;
	width: auto;
	cursor: pointer;
	
	display: flex;
	height: 46px;
	padding: 0px 20px;
	justify-content: center;
	align-items: center;
	gap: 12px;
	
	color: #FFF;
	text-align: center;
	font-family: "Work Sans";
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 140%; /* 22.4px */

	white-space: nowrap; /* Prevents text from wrapping */
`;

const SignInItem = styled(NavItem)`
	background: #A259FF;
	border-radius: 20px;
	display: flex;
	height: 60px;
	padding: 0px 30px 0px 30px;
	justify-content: center;
	align-items: center;
	gap: 12px;
	&:hover {
		background-color: rgba(162, 89, 255, 0.4);
	}
`;
const MemberItem = styled(SignInItem)`
	background: red;
`;
const PersonIcon = styled.span`
	display: block;
`;
const WaterMarkParent = styled.div`
	margin-left: 20px;
	display: flex;
	width: 100%;
	align-items: center;
`;
const WaterMark = styled.div`
	color: white;
	cursor: pointer;
`;
const WordMarkMain = styled.h1`
	font-size: 1em;
	font-weight: 600;
	margin-bottom: 0px;
	width: 100%;
	min-width: 130px;
`;
const WordMarkSecondary = styled.h1`
	font-size: 0.8em;
	font-weight: 400;
	margin-bottom: 0px;
	width: 100%;
`;
const MainIcon = styled.img`
	width: 120px;
	padding: 0;
	margin-right: 10px;
	cursor: pointer;
`;
const StyledPersonIcon = styled(BsFillPersonFill)`
	all: unset;
	fill: white;
	width: 20px;
	transform: translateY(2px);
`;
const CartBtn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	margin: 0px 20px 0px 20px;
	padding: 0px 20px 0px 20px;
	cursor: pointer;
`;
const BsCart = styled(BsCart3)`
	height: 30px;
	width: 30px; 
`;
const Number = styled.div`
    color: #FFF;

    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
	margin-left: 6px;
`
const Frame = styled.div`
    display: flex;
    padding: 5px 10px;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background:  #858584;
`

interface HeaderProps {
	ontoggleBladeVis: () => void;
	onToggleCartVis: () => void;
	cartBtnRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ ontoggleBladeVis, onToggleCartVis, cartBtnRef } : HeaderProps) => {
	const { cartCount } = useCart();
	const navItems = [
		{ name: "Shop", path: "/shop" },
		{ name: "Services", path: "/services" },
		{ name: "Contact Us", path: "/contact-us" },
		{ name: "Members", path: "/sign-in" },
	];
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const Counter = (number: number) => {
        return (
            <Frame>{number}</Frame>
        )
    }

	return (
		<NavBox>
			<Hamburger ontoggleBladeVis={ontoggleBladeVis} />
			<WaterMarkParent onClick={() => {
				navigate("/");
				}}>
				<MainIcon
					src={MainLogo}
					alt="NQ logo of a minimal store front icon"
				/>
				<WaterMark>
					<WordMarkMain>NQ Hardware</WordMarkMain>
					<WordMarkSecondary>& General Enterprise</WordMarkSecondary>
				</WaterMark>
			</WaterMarkParent>
			<NavMenu>
				{navItems.map((item) => {
					let ItemComponent;

					// Conditionally assign ItemComponent based on membership and item name
					if (item.name === "Members") {
					  	ItemComponent = token ? MemberItem : SignInItem;
					} else {
					  	ItemComponent = NavItem;
					}
					return (
						<ItemComponent
							key={item.name}
							onClick={() => {
								console.log(`${item.name} clicked`);
								navigate(item.path);
							}}
						>
							{item.name === "Members" && (
								<PersonIcon>
									<StyledPersonIcon />
								</PersonIcon>
							)}
							{ item.name === "Members" && token ? "{userName}" : item.name}
						</ItemComponent>
					);
				})}
			</NavMenu>
			<CartBtn ref={cartBtnRef} onClick={onToggleCartVis}>
				<BsCart />
				<Number>{Counter(cartCount)}</Number>
			</CartBtn>
		</NavBox>
	);
};

export default Header;
