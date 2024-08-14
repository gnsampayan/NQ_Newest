import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import MainLogo from "../assets/images/NQ-temp-logo.png";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { BsCart3, BsChevronDown  } from "react-icons/bs";
import { useCart } from '../context/CartContext';
import { fetchUsernameFromDatabase } from "../utils/utilityFunctions";
import { useEffect, useRef, useState } from "react";
import Button from "./Buttons/Button";

const NavBox = styled.nav`
	background-color: #221F27;
	height: 100px;
	position: fixed;
	top: 0;
	padding: 20px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	z-index: 9999;

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
	position: relative;
`;

const NavItem = styled.button`
	all: unset;
	width: auto;
	position: relative;
	cursor: default;
	
	display: flex;
	padding: 0px 20px;
	flex-direction: column;
	justify-content: start;
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
	&:hover {
		color: #A259FF;
	}
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
const CartBtn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	margin: 0px 20px 0px 20px;
	padding: 0px 20px 0px 20px;
	cursor: pointer;
	&:hover {
		color: #A259FF;
	}
`;
const BsCart = styled(BsCart3)`
	height: 30px;
	width: 30px; 
`;
const Number = styled.div<{ vis: boolean }>`
    color: #FFF;

    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
	margin-left: 6px;

	display: ${(props) => props.vis ? "block" : "none"};
`
const Frame = styled.div`
    display: flex;
    padding: 5px 10px;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background:  #858584;
`
const DDFrame = styled.div`
	position: absolute;
	z-index: 999;
	background: #221F27;
	color: white;
	padding: 40px 20px 20px 20px;
	border-radius: 0px 0px 20px 20px;
	display: flex;
	flex-direction: column;
	gap: 0px;
	top: 100%;
	cursor: default;
`
const DDNav = styled.h6`
	color: #FFF;
	text-align: center;
	font-family: "Work Sans";
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 140%; /* 22.4px */
	cursor: pointer;
	&:hover {
		color: #A259FF;
	}
	padding: 10px 20px;
	border-radius: 20px;
`
const Label = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	cursor: pointer;
`

interface HeaderProps {
	ontoggleBladeVis: () => void;
	onToggleCartVis: () => void;
	cartBtnRef: React.RefObject<HTMLDivElement>;
	counterVis: boolean;
}

const Header: React.FC<HeaderProps> = ({ ontoggleBladeVis, onToggleCartVis, cartBtnRef, counterVis } : HeaderProps) => {
	const { cartCount } = useCart();
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [username, setUsername] = useState<string | null>(null);
	const [userOptionsVis, setUserOptionsVis] = useState(false);
	const [servicesOptionsVis, setServicesOptionsVis] = useState(false);
	const userButtonRef = useRef<HTMLButtonElement>(null);
	const servicesButtonRef = useRef<HTMLButtonElement>(null);
	const userDropdownRef = useRef<HTMLDivElement>(null);
	const servicesDropdownRef = useRef<HTMLDivElement>(null);

	const Counter = (number: number) => {
        return (
            <Frame>{number}</Frame>
        )
    }

	useEffect(() => {
        const getUsername = async () => {
            const name = await fetchUsernameFromDatabase();
            if (name) {
                setUsername(name);
            } else {
                setUsername(null);
            }
        };

        getUsername();
    }, []);

	const toggleUserDropdown = () => {
		setUserOptionsVis(prevVis => !prevVis);
		setServicesOptionsVis(false);
	};
	const toggleServicesDropdown = () => {
		setServicesOptionsVis(prevVis => !prevVis);
		setUserOptionsVis(false);
	};

	// Close dropdown if clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// For user dropdown
			if (
				userButtonRef.current && 
				!userButtonRef.current.contains(target) &&
				userDropdownRef.current && 
				!userDropdownRef.current.contains(target)
			) {
				setUserOptionsVis(false);
			}

			// For services dropdown
			if (
				servicesButtonRef.current && 
				!servicesButtonRef.current.contains(target) &&
				servicesDropdownRef.current && 
				!servicesDropdownRef.current.contains(target)
			) {
				setServicesOptionsVis(false);
			}
		};
		if (userOptionsVis || servicesOptionsVis) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [userOptionsVis, servicesOptionsVis]);

	  const handleSignInAndOut = () => {
		localStorage.removeItem('token');
		navigate("/sign-in");
	  };

	  const UserDropdown = () => {
		return (
			<DDFrame ref={userDropdownRef}>
				{token ? 
					<>
						<DDNav onClick={() => navigate('/sign-in')}>Members Area</DDNav>
						<DDNav>My Profile</DDNav>
						<DDNav>Account Settings</DDNav>
						<DDNav>My Wishlist</DDNav>
						<DDNav onClick={handleSignInAndOut}>Sign Out</DDNav>
					</> 
					: 
					<>
						<DDNav onClick={handleSignInAndOut}>Sign In</DDNav>
					</>
				}
				
			</DDFrame>
		)
	}
	const ServicesDropdown = () => {
		return (
			<DDFrame ref={servicesDropdownRef}>
				<DDNav onClick={() => navigate('/services/deliveries')}>Deliveries</DDNav>
				<DDNav onClick={() => navigate('/services/contractor-services')}>Contractor Services</DDNav>
				<DDNav onClick={() => navigate('/services/tool-rentals')}>Tool Rentals</DDNav>
				<DDNav onClick={() => navigate('/services/installation-services')}>Installation Services</DDNav>
			</DDFrame>
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
				<NavItem onClick={() => navigate('/shop')}>
					<Label>
						Shop
					</Label>
				</NavItem>
				<NavItem 
					//onClick={() => navigate('/services')}
					ref={servicesButtonRef} 
					onClick={toggleServicesDropdown}
				>
					<Label>
						Services
						<BsChevronDown  />
					</Label>
					{servicesOptionsVis && <ServicesDropdown />}
				</NavItem>
				<NavItem onClick={() => navigate('/contact-us')}>
					<Label>
						Contact Us
					</Label>
				</NavItem>
				<NavItem ref={userButtonRef} onClick={toggleUserDropdown}>
					<Button 
						asset={BsFillPersonFill}
						title={token ? `${username}` : "Members"} 
						onClick={() => {}}
					/>
					{userOptionsVis && <UserDropdown />}
				</NavItem>
			</NavMenu>
			<CartBtn ref={cartBtnRef} onClick={onToggleCartVis}>
				<BsCart />
				<Number vis={counterVis}>{Counter(cartCount)}</Number>
			</CartBtn>
		</NavBox>
	);
};

export default Header;
