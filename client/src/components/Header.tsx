import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import storeFront from "../assets/Storefront.svg";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useEffect, useState } from "react";

const NavBox = styled.nav<NavBoxProps>`
	background-color: #ffffff;
	height: auto;
	position: fixed;
	top: 0;
	padding: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	z-index: 999;
	border-bottom: 1px solid black;
	transition: transform 0.3s ease-in-out;
	transform: ${({ isHidden }) => (isHidden ? 'translateY(-100%)' : 'translateY(0)')};
`;

const NavMenu = styled.ul`
	list-style: none;
	color: black;
	display: flex;
	justify-content: center;
	margin-bottom: 0;
`;

const NavItem = styled.button`
	all: unset;
	padding-left: 12px;
	padding-right: 12px;
	padding-top: 6px;
	padding-bottom: 10px;
	font-size: 1em;
	width: 140px;
	display: flex;
	justify-content: center;
	cursor: pointer;

	@media (max-width: 600px) {
		width: 110px;
		font-size: 0.8em;
	}

	@media (min-width: 601px) and (max-width: 1200px) {
		width: 120px;
		font-size: 0.9em;
	}

	@media (min-width: 1201px) {
		width: 140px;
		font-size: 1em;
	}
`;

const SignInItem = styled(NavItem)`
	background: #dbdbdb;
	border-radius: 20px;
	border: 1px solid black;
	&:hover {
		background-color: rgba(162, 89, 255, 0.4);
	}
`;
const MemberItem = styled(NavItem)`
	background: red;
	border-radius: 20px;
`;
const PersonIcon = styled.span`
	margin-right: 10px;

	@media (max-width: 600px) {
		margin-right: 6px;
	}

	@media (min-width: 601px) and (max-width: 1200px) {
		margin-right: 8px;
	}

	@media (min-width: 1201px) {
		margin-right: 10px;
	}
`;
const WaterMarkParent = styled.div`
	margin-left: 20px;
	display: flex;
	width: 100%;
	align-items: center;
	
`;
const WaterMark = styled.div`
	color: black;
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
	fill: black;
	transform: translateY(2px);
`;

interface HeaderProps {
	ontoggleBladeVis: () => void;
}
interface NavBoxProps {
	isHidden: boolean;
}

const Header: React.FC<HeaderProps> = ({ ontoggleBladeVis } : HeaderProps) => {
	const navItems = [
		{ name: "Shop", path: "/store" },
		{ name: "Services", path: "/services" },
		{ name: "Contact Us", path: "/contact-us" },
		{ name: "Sign in", path: "/sign-in" },
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
		<NavBox isHidden={isHeaderHidden}>
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
					if (item.name === "Sign in") {
					  	ItemComponent = token ? MemberItem : SignInItem;
					} else {
					  	ItemComponent = NavItem;
					}
					return (
						<ItemComponent
							key={item.name}
							onClick={() => {
								if (item.name === "Shop") {
									console.log(`you clicked store`);
									navigate(item.path);
								} else {
									console.log(`${item.name} clicked`);
									navigate(item.path);
								}
								
							}}
						>
							{item.name === "Sign in" && !token && ( // Only show icon if not a member
								<PersonIcon>
									<StyledPersonIcon />
								</PersonIcon>
							)}
							{ item.name === "Sign in" && token ? "Member" : item.name}
						</ItemComponent>
					);
				})}
			</NavMenu>
		</NavBox>
	);
};

export default Header;
