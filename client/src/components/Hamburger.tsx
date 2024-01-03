import { RxHamburgerMenu } from 'react-icons/rx';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
`

interface Props {
  ontoggleBladeVis: () => void;
}

const Hamburger = ( { ontoggleBladeVis } : Props ) => {

  return (
    <Wrapper onClick={ontoggleBladeVis}>
      <RxHamburgerMenu color='black' />
    </Wrapper>
  );
};

export default Hamburger;

