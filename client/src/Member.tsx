import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;
  background-color: #f2f2f2;
  padding: 20px;
  padding-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h2`
  color: black;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 20px;
`
const ActionButton = styled.button`
  padding: 10px 20px;
  color: black;
  background-color: white;
  border: solid 1px black;
  border-radius: 100vw;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 20px;
  &:hover {
    background-color: rgba(162, 89, 255, 0.4);
  }
`
const SignOutButton = styled(ActionButton)`
  border: solid 2px red;
  margin-top: 40px;
  &:hover {
    background-color: rgba(255, 0, 0, 0.4);
  }
`
 const Box = styled.div`
  background-color: white;
  padding: 20px 20px 0px 20px;
  border-radius: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: black;
`

const BoxTitle = styled.h4`
  margin-bottom: 20px;
`

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Member: React.FC = () => {
  const navigate = useNavigate();

  const SignOut = () => {
    localStorage.removeItem('token');
    navigate("/sign-in");
  };

  const handleCreateItemClick = () => {
    console.log('clicked create an item');
    navigate("/item-creation");
  };

  const handleViewStockClick = () => {
    console.log('clicked view stock');
    navigate("/view-stock");
  };

  return (
    <Wrapper>
      <Title>memberType Area</Title>
      <BoxContainer>
        <Box>
          <BoxTitle>White Label Configuration</BoxTitle>
          <ActionButton>Edit</ActionButton>
        </Box>
        <Box>
          <BoxTitle>Shop Options</BoxTitle>
          <ActionButton onClick={handleCreateItemClick}>Add New Item</ActionButton>
          <ActionButton onClick={handleViewStockClick}>View All Items</ActionButton>
        </Box>
        <Box>
          <h3>Deliveries</h3>
          <p>Fast and reliable product delivery service.</p>
          <ActionButton>View</ActionButton>
        </Box>
        <Box>
          <h3>Contractor Services</h3>
          <p>Professional services for your construction needs.</p>
          <ActionButton>View</ActionButton>
        </Box>
        <Box>
          <h3>Tool Rentals</h3>
          <p>A wide range of tools available for rent.</p>
          <ActionButton>View</ActionButton>
        </Box>
        <Box>
          <h3>Installation Services</h3>
          <p>Expert installation services for various products.</p>
          <ActionButton>View</ActionButton>
        </Box>
      </BoxContainer>
      <SignOutButton onClick={SignOut}>Sign Out</SignOutButton>
    </Wrapper>
  )
}

export default Member;
  
  
  
  