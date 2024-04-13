import "bootstrap/dist/css/bootstrap.min.css";
import DeviceDetector from "./DeviceDetector";
import styled, { css } from "styled-components";

import FeaturedImg from "./assets/items/homepage_img1.webp";
import NewArrival from "./assets/items/homepage_img2.webp";
import SpecialOffers from "./assets/items/homepage_img3.webp";
import DIYTnt from "./assets/items/homepage_img4.webp";
import CustomerStories from './assets/items/homepage_img5.webp';

import Product1 from "./assets/items/allen_keys.png";
import Product2 from "./assets/items/battery.png";
import Product3 from "./assets/items/circuit_breaker.png";
import Product4 from "./assets/items/hammer.png";
import Product5 from "./assets/items/hollow-block.png";
import Product6 from "./assets/items/capacitor.png";

import Pano from "./assets/items/homepage_pano.webp";

const Wrapper = styled.div<HomePageProps>`
  position: relative;
  margin-left: ${props => props.$margin};
  margin-right: auto;
  margin-bottom: 100px;
  z-index: 20;
`;

const Header = styled.header`
  background-color: #123456;
  color: white;
  padding: 10px 0;
  text-align: center;
  font-size: 24px;
`;

const Footer = styled.footer`
  background-color: #123456;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const commonSectionStyles = css`
  background-color: #3b3b3b;
  margin-bottom: 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
  position: relative;
`;

const Title = styled.h1`
  color: white;
  position: absolute;
`

const Section = styled.div`
  ${commonSectionStyles}
  flex-basis: calc(33% - 20px);
  height: 200px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border: solid 2px #a259ff;
    background-color: #a259ff;
    cursor: pointer;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    opacity: 70%;
  }
`;


const ServicesSection = styled(Section)`
  flex-basis: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url(${Pano});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(4px);
`;

const Service = styled.h3`
  flex-basis: calc(25% - 20px);
  height: 150px;
  margin: 10px;
  line-height: 150px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.8); // Optional: for better visibility over blur
  &:hover {
    cursor: pointer;
  }
`;

const NewsletterSection = styled(Section)`
  flex-basis: 100%;
  height: 100px;
  line-height: 100px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const ProductCard = styled.div`
  ${commonSectionStyles}
  height: 300px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border: solid 2px #a259ff;
    background-color: #a259ff;
    cursor: pointer;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    opacity: 70%;
  }
`;

interface HomePageProps {
  $margin: string;
}

const HomePage: React.FC<HomePageProps> = ({ $margin }) => {

  const sectionData = [
    { title: "Featured Products", imageUrl: FeaturedImg },
    { title: "New Arrivals", imageUrl: NewArrival },
    { title: "Special Offers", imageUrl: SpecialOffers },
    { title: "DIY Tips & Tricks", imageUrl: DIYTnt },
    { title: "Customer Stories", imageUrl: CustomerStories },
  ];
  const productData = [
    { title: "Allen Keys", imageUrl: Product1 },
    { title: "Batteries", imageUrl: Product2 },
    { title: "Circuit Breakers", imageUrl: Product3 },
    { title: "Hammers", imageUrl: Product4 },
    { title: "Hollow Blocks", imageUrl: Product5 },
    { title: "Capacitors", imageUrl: Product6 },
  ];

  return (
    <>
      <Header>Hardware Store - Everything You Need</Header>
      <Wrapper $margin={$margin}>
        <DeviceDetector />
        <SectionContainer>
          {sectionData.map((item, index) => (
            <Section key={index}>
              <img src={item.imageUrl} alt={item.title} />
              <Title>{item.title}</Title>
            </Section>
          ))}
        </SectionContainer>
        <ProductGrid>
          {productData.map((item, index) => (
            <ProductCard key={index}>
              <img src={item.imageUrl} alt={item.title} />
              <Title>{item.title}</Title>
            </ProductCard>
          ))}
        </ProductGrid>
        <ServicesSection>
          <Service>Deliveries</Service>
          <Service>Contractor Services</Service>
          <Service>Tool Rentals</Service>
          <Service>Installation Services</Service>
        </ServicesSection>
        <NewsletterSection >Subscribe to Our Newsletter</NewsletterSection>
      </Wrapper>
      <Footer>© 2023 Hardware Store. All rights reserved.</Footer>
    </>
  );
};

export default HomePage;

