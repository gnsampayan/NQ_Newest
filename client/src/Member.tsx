import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`
const ActionButton = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #3b3b3b;
  border: solid 2px #a259ff;
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



interface MemberProps {
  setMembership: React.Dispatch<React.SetStateAction<boolean>>;
}

const Member: React.FC<MemberProps> = ({ setMembership }) => {
  const navigate = useNavigate();

  const SignOut = () => {
    setMembership(false);
    navigate("/");
    localStorage.setItem('membership', JSON.stringify(false));
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
  
  
  
  