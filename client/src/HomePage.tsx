import "bootstrap/dist/css/bootstrap.min.css";
import DeviceDetector from "./DeviceDetector";
import styled, { css } from "styled-components";

const Wrapper = styled.div<HomePageProps>`
  position: relative;
  margin-left: ${props => props.margin};
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
`;

const Section = styled.div`
  ${commonSectionStyles}
  flex-basis: calc(33% - 20px);
  height: 200px;
  line-height: 200px;
  margin: 10px;

  &:hover {
    border: solid 2px #a259ff;
    background-color: #555;
    cursor: pointer;
  }
`;

const ServicesSection = styled(Section)`
  flex-basis: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Service = styled.div`
  flex-basis: calc(25% - 20px);
  height: 150px;
  margin: 10px;
  line-height: 150px;
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
`;

interface HomePageProps {
  margin: string;
}

const HomePage: React.FC<HomePageProps> = ({ margin }) => {
  return (
    <>
      <Header>Hardware Store - Everything You Need</Header>
      <Wrapper margin={margin}>
        <DeviceDetector />
        <SectionContainer>
          <Section>Featured Products</Section>
          <Section>New Arrivals</Section>
          <Section>Special Offers</Section>
          <Section>DIY Tips & Tricks</Section>
          <Section>Customer Stories</Section>
        </SectionContainer>
        <ProductGrid>
          <ProductCard>Product 1</ProductCard>
          <ProductCard>Product 2</ProductCard>
          <ProductCard>Product 3</ProductCard>
          <ProductCard>Product 4</ProductCard>
          <ProductCard>Product 5</ProductCard>
          <ProductCard>Product 6</ProductCard>
        </ProductGrid>
        <ServicesSection>
          <Service>Deliveries</Service>
          <Service>Contractor Services</Service>
          <Service>Tool Rentals</Service>
          <Service>Installation Services</Service>
        </ServicesSection>
        <NewsletterSection>Subscribe to Our Newsletter</NewsletterSection>
      </Wrapper>
      <Footer>© 2023 Hardware Store. All rights reserved.</Footer>
    </>
  );
};

export default HomePage;

