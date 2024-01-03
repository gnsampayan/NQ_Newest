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
  &:hover {
    background-color: rgba(255, 0, 0, 0.4);
  }
`

const Member: React.FC = () => {
  const navigate = useNavigate();

  const SignOut = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  const handleCreateItemClick = () => {
    console.log('clicked create an item');
    navigate("/item-creation");
  };

  const handleViewStockClick = () => {
    console.log('clicked view stock');
    navigate("/view-stock");
  }

  return (
    <Wrapper>
      <Title>Member Area</Title>
      <ActionButton onClick={handleCreateItemClick}>Create an Item</ActionButton>
      <ActionButton onClick={handleViewStockClick}>View Stock</ActionButton>
      <SignOutButton onClick={SignOut}>Sign Out</SignOutButton>
    </Wrapper>
  )
}

export default Member;
  
  
  
  