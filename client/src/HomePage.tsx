import "bootstrap/dist/css/bootstrap.min.css";
import DeviceDetector from "./DeviceDetector";
import styled  from "styled-components";
import HeroSection from "./components/Home/HeroSection";
import DiscoverMore from "./components/Home/DiscoverMore";
import ItemHighlight from "./components/Home/ItemHighlight";
import { useEffect, useState } from "react";
import config from "./config";
import HighlightedItemConfig from "./components/Home/configHome";
import ServicesSection from "./components/Home/ServicesSection";
import SubscribeWidget from "./components/Home/SubscribeWidget/SubscribeWidget";
import NewsletterGur from "./assets/images/Newsletter_guy.png";
import Footer from "./components/Home/Footer";
import CategoriesSection from "./components/Home/CategoriesSection";

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
interface Item {
  title: string;
  image: string;
  price: number;
}

const HomePage: React.FC<HomePageProps> = ({ $margin }) => {

  const [highlightedItem, setHighlightedItem] = useState<Item | null>(null);
  const { item } = HighlightedItemConfig;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${config.API_URL}/items`);
        const data: Item[] = await response.json();
        const highlighted = data.find((i: Item) => i.title.includes(item));
        setHighlightedItem(highlighted || null);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [item]);

  return (
    <>
      <Header>Anything You Need, We Have It!</Header>
      <Wrapper $margin={$margin}>
        <HeroSection />
        <CategoriesSection />
        <DiscoverMore />
        <SubscribeWidget img={NewsletterGur} />
        {highlightedItem && <ItemHighlight 
          image={`data:image/jpeg;base64,${highlightedItem.image}`}
          name={highlightedItem.title}
          price={highlightedItem.price}
          />} 
        <ServicesSection />
        <Footer />
      </Wrapper>
      <DeviceDetector />
    </>
  );
};

export default HomePage;

