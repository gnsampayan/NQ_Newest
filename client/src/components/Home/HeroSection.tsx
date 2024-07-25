import styled from 'styled-components';
import HeroImage from "../../assets/images/ToolsAndMaterials.png";
import { useNavigate } from 'react-router';

const HeroSectionFrame = styled.div`
  display: flex;
  width: 1050px;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
`;
const HeroTextAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex: 1 0 0;
`
const HeadlineAndSubhead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`
const Headline = styled.h1`
  display: flex;
  width: 510px;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;

  color: white;
  /* H1 - Work Sans */
  font-family: "Work Sans";
  font-size: 67px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 73.7px */
  text-transform: capitalize;
`
const Subhead = styled.h3`
  align-self: stretch;

  color: white;
  font-family: "Work Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 35.2px */
`
const Button = styled.button`
  display: flex;
  height: 60px;
  padding: 0px 50px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 20px 0px 20px 0px;

  border-radius: 20px;
  background: #A259FF;

  border: none;
  color: white;
  text-align: center;
  font-family: "Work Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
`
const AdditionalInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`
const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  color: white;
`
const GroupLabel1 = styled.h4`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  align-self: stretch;
  color: white;
  /* H4 - Space Mono */
  font-family: "Space Mono";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 39.2px */
  text-transform: capitalize;
`
const GroupLabel2 = styled.p`
  align-self: stretch;
  color: white;
  font-family: "Work Sans";
  font-size: 23.99px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 38.384px */
  text-transform: capitalize;
`
const Centering = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`
const HighlightedImage = styled.div`
  display: flex;
  width: 510px;
  height: 510px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin-top: -110px;
`
const Image = styled.img`
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 20px 20px 0px 0px;
`
const Frame = styled.div`
  display: flex;
  height: 109px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0px 0px 20px 20px;
  background: var(--Background---Secondary, #3B3B3B);
`
const H5 = styled.h5`
  align-self: stretch;
  color: white;
  /* H5 - Work Sans */
  font-family: "Work Sans";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 30.8px */
  text-transform: capitalize;
  margin-top: 20px;
`
const P = styled.p`
  align-self: stretch;
  color: white;
  /* Base(Body) - Work Sans */
  font-family: "Work Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  margin-top: -10px;
`

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <>
        <HeroSectionFrame>
          <HeroTextAndButtons>
            <HeadlineAndSubhead>
              <Headline>Discover Materials & Tools</Headline>
              <Subhead>
                Explore the wide array of materials and tools we offer. 
                From high-quality lumber to the latest power tools, we have 
                everything you need for both DIY enthusiasts and professional 
                craftsmen. Our selection ensures durability and efficiency, 
                allowing you to bring your vision to life.
              </Subhead>
              <Button onClick={() => {navigate('/shop');}}>Go to Shop</Button>
              <AdditionalInfo>
                <Group>
                  <GroupLabel1>100k+</GroupLabel1>
                  <GroupLabel2>Total Items</GroupLabel2>
                </Group>
                <Group>
                  <GroupLabel1>20k+</GroupLabel1>
                  <GroupLabel2>In Stock</GroupLabel2>
                </Group>
                <Group>
                  <GroupLabel1>100+</GroupLabel1>
                  <GroupLabel2>On Sale</GroupLabel2>
                </Group>
              </AdditionalInfo>
            </HeadlineAndSubhead>
          </HeroTextAndButtons>
          <Centering>
            <HighlightedImage>
              <Image src={HeroImage}></Image>
              <Frame>
                <H5>Title Here</H5>
                <P>Description Here or Category</P>
              </Frame>
            </HighlightedImage>
          </Centering>
        </HeroSectionFrame>
    </>
  )
}

export default HeroSection