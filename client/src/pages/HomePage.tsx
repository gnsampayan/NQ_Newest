import "bootstrap/dist/css/bootstrap.min.css";
import DeviceDetector from "../components/Widgets/DeviceDetector";
import styled  from "styled-components";
import HeroSection from "../components/Widgets/HeroWidget";
import DiscoverMore from "../components/Widgets/DiscoverMoreWidget";
import ItemHighlight from "../components/Widgets/HighlightWidget/ItemHighlight";
import ServicesSection from "../components/Widgets/ServicesWidget";
import SubscribeWidget from "../components/Widgets/SubscribeWidget/SubscribeWidget";
import NewsletterGuy from "../assets/images/Newsletter_guy.png";
import Footer from "../components/Widgets/FooterWidget";
import CategoriesSection from "../components/Widgets/CategoriesWidget";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import HeroImage from "../assets/images/ToolsAndMaterials.png";

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


  const contents = {
    headline: "Discover Materials & Tools",
    subhead: `Explore the wide array of materials and tools we offer. 
                From high-quality lumber to the latest power tools, we have 
                everything you need for both DIY enthusiasts and professional 
                craftsmen. Our selection ensures durability and efficiency, 
                allowing you to bring your vision to life.`,
    btnAsset: BsFillRocketTakeoffFill,
    btnTitle: 'Go to Shop',
    urlDestination: '/shop',
  }
  
  return (
    <>
      <Header>Anything You Need, We Have It!</Header>
      <Wrapper $margin={$margin}>
        <HeroSection 
          headline={contents.headline} 
          subhead={contents.subhead} 
          btnAsset={contents.btnAsset}
          btnTitle={contents.btnTitle} 
          urlDestination={contents.urlDestination}
          heroImage={HeroImage}
        />
        <CategoriesSection />
        <DiscoverMore />
        <SubscribeWidget img={NewsletterGuy} />
        <ItemHighlight />
        <ServicesSection />
        <Footer />
      </Wrapper>
      <DeviceDetector />
    </>
  );
};

export default HomePage;
