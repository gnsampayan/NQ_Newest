import { RxHamburgerMenu } from 'react-icons/rx';

interface HamburgerProps {
  vis: boolean;
  setVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hamburger: React.FC<HamburgerProps> = ({ vis, setVis }) => {
  const handleHamburger = () => {
    console.log('hamburger clicked');
    setVis(!vis);
  };

  return (
    <div onClick={handleHamburger}>
      <RxHamburgerMenu color='white' />
    </div>
  );
};

export default Hamburger;

