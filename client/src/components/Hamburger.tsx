import { RxHamburgerMenu } from 'react-icons/rx';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px 0px 20px;
	padding: 0px 20px 0px 20px;
`

interface Props {
  ontoggleBladeVis: () => void;
}

const Hamburger = ( { ontoggleBladeVis } : Props ) => {

  return (
    <Wrapper onClick={ontoggleBladeVis}>
      <RxHamburgerMenu color='white' style={{ width: '30px', height: '30px' }}/>
    </Wrapper>
  );
};

export default Hamburger;

