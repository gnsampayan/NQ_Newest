import styled from "styled-components";

const styleConfig = {
    default: {
        color: "#858584",
        hoverColor: "white"
    },
    variant: {
        color: "#3B3B3B",
        hoverColor: "#858584"
    }
}
const Frame = styled.div<{ type: ButtonTypes }>`
    display: flex;
    padding: 5px 10px;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background:  ${(props) => styleConfig[props.type].color};
`
const Btn = styled.button<{ type: ButtonTypes }>`
        display: flex;
        height: 60px;
        padding: 0px 50px;
        justify-content: center;
        align-items: center;
        gap: 12px;

        border-radius: 20px;
        border: 2px solid;
        background: none;
        border-color: ${(props) => styleConfig[props.type].color};

        color: white;
        text-align: center;
        font-family: "Work Sans";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 140%; /* 22.4px */

        background-color: none;

        &:hover {
            border-color: ${(props) => styleConfig[props.type].hoverColor};
            & > ${Frame} {
                background-color: ${(props) => styleConfig[props.type].hoverColor};
                color: #2B2B2B;
            }
        }
        
`;
const Title = styled.div`
    color: white;
    text-align: center;
    font-family: "Work Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 38px; /* 211.111% */
    letter-spacing: 1.8px;
    text-transform: uppercase;
`
const Number = styled.div`
    color: #FFF;

    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
interface Props {
    title: string;
    type: ButtonTypes;
    totalVisItemsCards: number;
    onClick: () => void;
}

type ButtonTypes = "default" | "variant";

const ButtonCounter = ({ title, type, totalVisItemsCards, onClick } : Props) => {
    const Counter = (number: number) => {
        return (
            <Frame type={type}>{number}</Frame>
        )
    }
        return (
            <>
                <Btn onClick={onClick} type={type}>
                        <Title>{title}</Title>
                        <Number>{Counter(totalVisItemsCards)}</Number>
                </Btn>
            </>
        )
}

export default ButtonCounter