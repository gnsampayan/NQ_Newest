import "bootstrap/dist/css/bootstrap.min.css";
import DeviceDetector from "./DeviceDetector";
import styled  from "styled-components";
import HeroSection from "./components/Home/HeroSection";
import DiscoverMore from "./components/Home/DiscoverMore";


const Wrapper = styled.div<HomePageProps>`
  position: relative;
  margin-left: ${props => props.$margin};
  margin-right: auto;
  z-index: 20;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`;

const Header = styled.header`
  color: white;
  text-align: center;
  /* H3 - Space Mono */
  font-family: "Space Mono";
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 45.6px */
  text-transform: capitalize;
  margin-top: 40px;
`;

interface HomePageProps {
  $margin: string;
}

const HomePage: React.FC<HomePageProps> = ({ $margin }) => {

  return (
    <>
      <Header>Anything You Need, We Have It!</Header>
      <Wrapper $margin={$margin}>
        <HeroSection />
        <DiscoverMore />
      </Wrapper>
      <DeviceDetector />
    </>
  );
};

export default HomePage;

