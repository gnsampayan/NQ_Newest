import { useNavigate } from "react-router-dom";

interface MemberProps {
    setMembership: React.Dispatch<React.SetStateAction<boolean>>;
  }
const  Member: React.FC<MemberProps> = ({ setMembership }) => {
    const navigate = useNavigate();
    const SignOut = () => {
      // Setting membership to false when the user clicks "Sign Out"
      setMembership(false);
      navigate("/");
      // Also remove or update the membership state in localStorage
      localStorage.setItem('membership', JSON.stringify(false));
    }
  
    return (
      <>
        <div style={{color: "white"}}>Member Area</div>
        <button onClick={SignOut}>Sign Out</button>
      </>
    )
  }
  
  export default Member;
  
  
  
  