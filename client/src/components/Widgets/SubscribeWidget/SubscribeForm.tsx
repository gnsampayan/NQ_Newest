import styled from "styled-components";
import { BsEnvelope } from "react-icons/bs";

const Form = styled.div`
    display: flex;
    height: 60px;
    padding: 16px 0px 16px 20px;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    border-radius: 20px;
    background: var(--Text, #FFF);
`
const P = styled.p`
    flex: 1 0 0;

    color: var(--Background, #2B2B2B);

    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    margin-top: 16px;
`
const Button = styled.button`
    display: flex;
    height: 60px;
    padding: 0px 50px;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;

    border-radius: 20px;
    background: var(--Call-to-Action, #A259FF);

    border: none;
`
const Icon = styled(BsEnvelope)`
    width: 20px;
    height: 20px;
    color: white;
`
const P2 = styled.p`
    color: #FFF;
    text-align: center;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
    margin-top: 16px;
`
const SubscribeForm = () => {
  return (
    <>
        <Form>
            <P>Enter your email here</P>
            <Button>
                <Icon />
                <P2>Subscribe</P2>
            </Button>
        </Form>
    </>
  )
}

export default SubscribeForm