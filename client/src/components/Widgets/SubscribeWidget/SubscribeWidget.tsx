import styled from "styled-components";
import SubscribeForm from "./SubscribeForm";

const Widget = styled.div`
    display: flex;
    width: 1050px;
    padding: 60px;
    align-items: center;
    gap: 80px;

    border-radius: 20px;
    background: #3B3B3B;
`
const Photo = styled.img<{image : string}>`
    height: 310px;
    flex: 1 0 0;

    border-radius: 20px;
    background: url(${props => props.image}) lightgray 50% / cover no-repeat;
`
const Frame = styled.div`
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
    gap: 10px;
    align-self: stretch;
`
const H3 = styled.h3`
    align-self: stretch;

    color: var(--White, #FFF);

    /* H3 - Work Sans */
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 45.6px */
    text-transform: capitalize;
`
const P = styled.p`
    align-self: stretch;

    color: var(--White, #FFF);

    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
interface Props {
    img: string;
}

const SubscribeWidget = ({ img }: Props) => {
  return (
    <>
        <Widget>
            <Photo image={img}></Photo>
            <Frame>
                <HeadlineAndSubhead>
                    <H3>Join Our Weekly Digest</H3>
                    <P>Get Exclusive Promotions & Updates Straight To Your Inbox.</P>
                </HeadlineAndSubhead>
                <SubscribeForm />
            </Frame>
        </Widget>
    </>
  )
}

export default SubscribeWidget