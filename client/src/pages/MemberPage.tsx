import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import apiConfig from "../api-config";
import Button from "../components/Buttons/Button";
import { IoMdAdd } from "react-icons/io";
import { MdViewInAr, MdGroups, MdOutlineFeedback } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaPersonCirclePlus, FaTruck } from "react-icons/fa6";
import { GiCrane } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import { PiToolboxDuotone } from "react-icons/pi";
import { LuLampWallUp } from "react-icons/lu";
import { HiOutlineWrench } from "react-icons/hi2";


const Wrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`
const Frame = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1050px;
`
const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;

  /* H3 - Work Sans */
  font-family: "Work Sans";
  font-size: 38px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 45.6px */
  text-transform: capitalize;
`
const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  min-height: calc(100vh - 306px);
  `;
 const Box = styled.div`
  padding: 20px;
  border-radius: 20px;
  width: auto;
  color: white;
  background: #3B3B3B;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  &:hover {
    outline: 2px solid white;
  }
`
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  `
const BoxTitle = styled.h5`
  color: white;
  
  /* H5 - Work Sans */
  font-family: "Work Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 30.8px */
  text-transform: capitalize;
`
const Description = styled.p`
  color: white;
  max-width: 450px;
  /* Base (Body) - Space Mono */
  font-family: "Space Mono";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
`
const Label = styled.p`
  color: #858584;
  margin-bottom: 10px;
  /* Caption - Space Mono */
  font-family: "Space Mono";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 13.2px */
`
const UserType = styled.h5`
  color: var(--White, #FFF);
  margin-bottom: 20px;
  margin-top: 0px;
  /* Base(Body) - Work Sans */
  font-family: "Work Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  text-transform: capitalize;
`

const MemberPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userType, setUserType] = useState<string | null>(null);

  const handleCreateItemClick = () => {
    navigate("/item-creation");
  };

  const handleViewStockClick = () => {
    navigate("/view-stock");
  };

  // Get User Type -- move to utilityFunctions
	useEffect(() => {
		const fetchUserType = async () => {
		  try {
			const response = await fetch(`${apiConfig.API_URL}/users/me`, {
			  headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			  }
			});
			if (response.ok) {
			  const data = await response.json();
			  setUserType(data.user_type);
			} else {
			  console.error('Failed to fetch user type:', response.statusText);
			}
		  } catch (error) {
			console.error('Error fetching user type:', error);
		  }
		};
	
		fetchUserType();
	  }, []);

    const handleButtonClick = (buttonName: string) => {
      console.log(`button ${buttonName} is clicked`);
    }
  return (
    <Wrapper>
      <Frame>
        <Title>User Area </Title>
        <Label>User Type</Label>
        <UserType>{userType}</UserType>
        {token && (userType === "admin") && 
          <>
          <BoxContainer>
            <Box>
              <BoxTitle>White Label Configuration</BoxTitle>
              <Description>Customize the look and feel of your website to align with your brand. Adjust colors, fonts, logos, and other styling elements to create a cohesive and personalized online presence that reflects your business identity.</Description>
              <Button asset={CiEdit} title={"Edit Style"} onClick={() => handleButtonClick}/>
            </Box>
            <Box>
              <BoxTitle>Inventory Management</BoxTitle>
              <Description>Manage your product inventory by adding new items for sale, updating pricing, stock levels, and promotional status. Customize product details, including tags, images, names, and descriptions.</Description>
              <Buttons>
                <Button asset={IoMdAdd} title={"Create Item"} onClick={handleCreateItemClick}/>
                <Button asset={MdViewInAr} title={"Manage Items"} onClick={handleViewStockClick}/>
              </Buttons>
            </Box>
            <Box>
              <BoxTitle>Delivery Settings</BoxTitle>
              <Description>List construction materials for reccuring deliveries, oversee your drivers' schedule, rate, and routes.</Description>
              <Buttons>
                <Button asset={GiCrane} title={"Manage Construction Materials"} onClick={() => handleButtonClick}/>
                <Button asset={FaTruck} title={"Manage Drivers"} onClick={() => handleButtonClick}/>
                <Button asset={IoCalendarOutline} title={"View Schedule"} onClick={() => handleButtonClick}/>
              </Buttons>
            </Box>
            <Box>
              <BoxTitle>Contractor Operations</BoxTitle>
              <Description>Manage your contractor workforce by adding new professionals, overseeing their roles, schedules, and performance.</Description>
              <Buttons>
                <Button asset={FaPersonCirclePlus} title={"Add a Contractor"} onClick={() => handleButtonClick}/>
                <Button asset={MdGroups} title={"View Team"} onClick={() => handleButtonClick}/>
              </Buttons>
            </Box>
            <Box>
              <BoxTitle>Rental Equipment Management</BoxTitle>
              <Description>Keep your rental inventory up to date by adding new equipment, editing existing listings, and managing the availability of tools and machinery for customer rentals.</Description>
              <Buttons>
                <Button asset={LiaToolsSolid} title={"Add Rental Equipment"} onClick={() => handleButtonClick}/>
                <Button asset={PiToolboxDuotone} title={"Edit Rental Inventory"} onClick={() => handleButtonClick}/>
              </Buttons>
            </Box>
            <Box>
              <BoxTitle>Service Installation Management</BoxTitle>
              <Description>Offer a variety of installation services to your customers. Manage and edit all existing installation services.</Description>
              <Buttons>
                <Button asset={HiOutlineWrench} title={"Offer New Installation Service"} onClick={() => handleButtonClick}/>
                <Button asset={LuLampWallUp} title={"Manage Installation Services"} onClick={() => handleButtonClick}/>
              </Buttons>
            </Box>
          </BoxContainer>
        </>
        }
        {token && (userType === "super") && 
          <>
            <BoxContainer>
              <Box>
                <BoxTitle>My Schedule</BoxTitle>
                <Description>Stay organized by viewing your work schedule, easily request time off, and submit anonymous or non-anonymous feedback to management. Keep track of your work-life balance all in one place.</Description>
                <Buttons>
                  <Button asset={IoCalendarOutline} title={"View Schedule"} onClick={() => handleButtonClick}/>
                  <Button asset={MdOutlineFeedback} title={"Submit Feedback"} onClick={() => handleButtonClick}/>
                </Buttons>
              </Box>
              <Box>
                <BoxTitle>Inventory Management</BoxTitle>
                <Description>Manage your product inventory by adding new items for sale, updating pricing, stock levels, and promotional status. Customize product details, including tags, images, names, and descriptions.</Description>
                <Buttons>
                  <Button asset={IoMdAdd} title={"Create Item"} onClick={handleCreateItemClick}/>
                  <Button asset={MdViewInAr} title={"Manage Items"} onClick={handleViewStockClick}/>
                </Buttons>
              </Box>
            </BoxContainer>
          </>
        }
      </Frame>
    </Wrapper>
  )
}

export default MemberPage;
  
  
  
  