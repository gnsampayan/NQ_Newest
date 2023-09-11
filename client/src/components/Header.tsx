import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import storeFront from "../assets/Storefront.svg";
import { useNavigate } from "react-router-dom";

const NavBox = styled.nav`
	background-color: #221f27;
	height: auto;
	position: fixed;
	top: 0;
	padding: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	z-index: 999;
`;

const NavMenu = styled.ul`
	list-style: none;
	color: white;
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
	background: #a259ff;
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
	cursor: pointer;
`;
const WaterMark = styled.div`
	color: white;
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
`;
const StyledPersonIcon = styled(BsFillPersonFill)`
	all: unset;
	fill: white;
	transform: translateY(2px);
`;

interface Props {
	showBlade: () => void;
	hideBlade: () => void;
}

const NavModule = ({ showBlade, hideBlade } : Props) => {
	const navItems = [
		{ name: "Store", path: "/store" },
		{ name: "Business", path: "/business" },
		{ name: "Contact Us", path: "/contact-us" },
		{ name: "Sign in", path: "/sign-in" },
	];
	const navigate = useNavigate();
	return (
		<NavBox>
			<WaterMarkParent onClick={() => {
				hideBlade();
				navigate("/");
				}}>
				<MainIcon
					src={storeFront}
					alt="NQ logo of a minimal store front icon"
				/>
				<WaterMark>
					<WordMarkMain>HQ Hardware</WordMarkMain>
					<WordMarkSecondary>& General Enterprise</WordMarkSecondary>
				</WaterMark>
			</WaterMarkParent>
			<NavMenu>
				{navItems.map((item) => {
					const ItemComponent = item.name === "Sign in" ? SignInItem : NavItem;
					return (
						<ItemComponent
							key={item.name}
							onClick={() => {
								if (item.name === "Store") {
									console.log(`you clicked store`);
									navigate(item.path);
									showBlade();
								} else {
									console.log(`${item.name} clicked`);
									navigate(item.path);
									hideBlade();
								}
								
							}}
						>
							{item.name === "Sign in" && (
								<PersonIcon>
									<StyledPersonIcon />
								</PersonIcon>
							)}
							{item.name}
						</ItemComponent>
					);
				})}
			</NavMenu>
		</NavBox>
	);
};

export default NavModule;
