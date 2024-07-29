import styled from "styled-components";
import ServicesSection from "./components/Home/ServicesSection";
import Footer from "./components/Home/Footer";

const Wrapper = styled.div<Props>`
  position: relative;
  margin-left: ${props => props.$margin};
  margin-right: auto;
  z-index: 20;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding-top: 40px;
`;
interface Props {
  $margin: string;
}
const Services: React.FC<Props> = ({ $margin }) => {
  return (
    <>
      <Wrapper $margin={$margin}>
        <ServicesSection />
        <Footer />
      </Wrapper>
    </>
  )
};

export default Services;
