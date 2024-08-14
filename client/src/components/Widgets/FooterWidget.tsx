import styled from "styled-components";
import { BsDiscord, BsYoutube, BsTwitterX, BsInstagram  } from "react-icons/bs";
import SubscribeForm from "./SubscribeWidget/SubscribeForm";
import { useNavigate } from "react-router";
import storeFront from "../../assets/Storefront.svg"

const Group = styled.div`
    width: 1049.414px;
    height: 273px;
    flex-shrink: 0;
    margin-bottom: 50px;
`
const FooterInfo = styled.div`
    display: inline-flex;
    justify-content: space-between;
    align-items: flex-start;
`
const Info = styled.div`
    display: flex;
    width: 327.414px;
    padding-right: 84px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`
const Logo = styled.div`
    width: 243.414px;
    height: 32px;

    color: white;
`
const Additional = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const P1 = styled.p`
    width: 238px;

    color: #CCC;

    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const Community = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
`
const P2 = styled.p`
    width: 238px;
    height: 18px;

    color: #CCC;

    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const Icons = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 40px;
    cursor: pointer;
`
const Explore = styled.div`
    display: flex;
    width: 240px;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    `
const H5 = styled.h5`
    color: #FFF;
    
    /* H5 - Space Mono */
    font-family: "Space Mono";
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
    `
const Pages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`
const P3 = styled.p`
    color: #CCC;
    cursor: pointer;
    
    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    &:hover {
        color: #A259FF;
    }
`
const Subscribe = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
`
const Frame = styled.div`
    display: flex;
    width: 1049.414px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const SubscribeFormAndInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const P4 = styled.p`
    width: 330px;

    color: #CCC;

    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const Divider = styled.div`
    width: 1049.414px;
    height: 1px;
    background: #858584;
`
const P5 = styled.p`
    align-self: stretch;

    color: #CCC;

    /* Caption - Work Sans */
    font-family: "Work Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
`
const WaterMarkParent = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;
const MainIcon = styled.img`
	width: 34px;
	padding: 0;
	margin-right: 10px;
	cursor: pointer;
`;
const WaterMark = styled.div`
	color: white;
	cursor: pointer;
`;
const WordMarkMain = styled.h1`
	font-size: 1em;
	font-weight: 600;
	margin-bottom: 0px;
	width: 100%;
	min-width: 130px;
`;
const WordMarkSecondary = styled.h1`
	font-size: 0.8em;
	font-weight: 400;
	margin-bottom: 0px;
	width: 100%;
`;
const Footer = () => {
    const navigate = useNavigate();
  return (
    <>
        <Group>
            <FooterInfo>
                <Info>
                    <Logo>
                    <WaterMarkParent onClick={() => {
                        navigate("/");
                        }}>
                        <MainIcon
                            src={storeFront}
                            alt="NQ logo of a minimal store front icon"
                        />
                        <WaterMark>
                            <WordMarkMain>NQ Hardware</WordMarkMain>
                            <WordMarkSecondary>& General Enterprise</WordMarkSecondary>
                        </WaterMark>
                    </WaterMarkParent>
                    </Logo>
                    <Additional>
                        <P1>additional info here. write something about the company</P1>
                        <Community>
                            <P2>Join our community</P2>
                            <Icons>
                                <BsDiscord color="#CCC" style={{width: '32px', height: '32px'}}/>
                                <BsYoutube  color="#CCC" style={{width: '32px', height: '32px'}}/>
                                <BsTwitterX color="#CCC" style={{width: '26px', height: '32px'}}/>
                                <BsInstagram color="#CCC" style={{width: '26px', height: '32px'}}/>
                            </Icons>
                        </Community>
                    </Additional>
                </Info>
                <Explore>
                    <H5>Explore</H5>
                    <Pages>
                        <P3 onClick={() => navigate("/shop")}>Shop</P3>
                        <P3 onClick={() => navigate("/services")}>Services</P3>
                        <P3 onClick={() => navigate("/contact-us")}>Contact Us</P3>
                    </Pages>
                </Explore>
                <Subscribe>
                    <H5>Join Our Weekly Digest</H5>
                    <SubscribeFormAndInfo>
                        <P4>Get Exclusive Promotions & Updates Straight To Your Inbox.</P4>
                        <SubscribeForm />
                    </SubscribeFormAndInfo>
                </Subscribe>
            </FooterInfo>
            <Frame>
                <Divider />
                <P5>NQ Hardware is a registered entity. All rights reserved</P5>
            </Frame>
        </Group>
    </>
  )
}

export default Footer