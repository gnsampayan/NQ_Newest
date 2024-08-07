import styled from 'styled-components';
import Button from '../Buttons/Button';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';


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
const AdditionalInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  margin-top: 20px;
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
  background: #3B3B3B;
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
interface Props {
  headline: string;
  subhead: string;
  btnAsset?: IconType;
  btnTitle: string;
  urlDestination: string;
  heroImage: string;
}
const HeroWidget = ({ headline, subhead, btnAsset: defaultAsset = BsFillRocketTakeoffFill, btnTitle, urlDestination, heroImage } : Props) => {
  const navigate = useNavigate();
  return (
    <>
        <HeroSectionFrame>
          <HeroTextAndButtons>
            <HeadlineAndSubhead>
              <Headline>{headline}</Headline>
              <Subhead>
                {subhead}
              </Subhead>
              <Button 
                asset={defaultAsset} 
                title={btnTitle} 
                onClick={() => {navigate(urlDestination);}} 
                bgColor={'#A259FF'}
                fillColor={'white'}
                fillHoverColor={'#A259FF'}
                bgHoverColor={'white'}
                borderHoverColor={'white'}
                textHoverColor={'#A259FF'}
                />
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
              <Image src={heroImage}></Image>
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

export default HeroWidget