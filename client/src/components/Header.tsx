import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import storeFront from "../assets/Storefront.svg";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";

const NavBox = styled.nav<NavBoxProps>`
	background-color: #221F27;
	height: 100px;
	position: fixed;
	top: 0;
	padding: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	z-index: 999;
	transition: transform 0.3s ease-in-out;
	transform: ${({ $isHidden }) => ($isHidden ? 'translateY(-100%)' : 'translateY(0)')};
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
	width: 34px;
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
const Cart = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	margin: 0px 20px 0px 20px;
	padding: 0px 20px 0px 20px;
`;
const BsCart = styled(BsCart3)`
	height: 30px;
	width: 30px; 
	cursor: pointer;
`;

interface HeaderProps {
	ontoggleBladeVis: () => void;
}
interface NavBoxProps {
	$isHidden: boolean;
}

const Header: React.FC<HeaderProps> = ({ ontoggleBladeVis } : HeaderProps) => {
	const navItems = [
		{ name: "Shop", path: "/shop" },
		{ name: "Services", path: "/services" },
		{ name: "Contact Us", path: "/contact-us" },
		{ name: "Members", path: "/sign-in" },
	];
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const [isHeaderHidden, setIsHeaderHidden] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		setIsHeaderHidden(currentScrollY > lastScrollY);
		setLastScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true});

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	return (
		<NavBox $isHidden={isHeaderHidden}>
			<Hamburger ontoggleBladeVis={ontoggleBladeVis} />
			<WaterMarkParent onClick={() => {
				navigate("/");
				}}>
				<MainIcon
					src={storeFront}
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
			<Cart>
				<BsCart />
			</Cart>
		</NavBox>
	);
};

export default Header;
