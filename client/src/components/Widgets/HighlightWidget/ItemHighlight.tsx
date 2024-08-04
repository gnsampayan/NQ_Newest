import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from 'axios';
import apiConfig from "../../../api-config";
import HighlightedItemConfig from "./highlightedItemConfig";
import { BsEye } from "react-icons/bs";

const Highlight = styled.div<{ image: string }>`
    display: flex;
    width: 1440px;
    flex-direction: column;
    align-items: center;
    background: url(${props => props.image}) lightgray 50% / cover no-repeat;
`;
const ItemInfo = styled.div`
    display: flex;
    padding: 360px 195px 60px 195px;
    justify-content: center;
    align-items: flex-end;
    align-self: stretch;
    background: linear-gradient(180deg, rgba(162, 89, 255, 0.00) 0%, #A259FF 100%);
`;
const Frame = styled.div`
    display: flex;
    width: 1050px;
    align-items: flex-end;
`;
const ItemPriceNameAndButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    flex: 1 0 0;
`;
const SalePrice = styled.div`
    display: flex;
    padding: 10px 20px;
    align-items: center;
    gap: 12px;
    color: white;
    font-family: "Work Sans";
    font-size: 31px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%;
    text-transform: capitalize;

    border-radius: 20px;
    background: #3B3B3B;
`;
const H2 = styled.h2`
    align-self: stretch;
    color: #FFF;
    font-family: "Work Sans";
    font-size: 51px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%;
    text-transform: capitalize;
`;
const EyeIcon = styled(BsEye)`
    all: unset;
    fill: black;
    margin-right: 10px;
    width: 18px;
`;
const Button = styled.button`
	display: flex;
    height: 60px;
    padding: 0px 50px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    border-radius: 20px;
    border: 2px solid white;

    color: black;
    text-align: center;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */

    background-color: white;
    background: white;

    &:hover {
        background: rgba(0, 0, 0, 0.5);
        color: white;

        ${EyeIcon} {
            fill: #FFF;
        }
    }
`;
const SaleTimer = styled.div`
    display: flex;
    width: 295px;
    padding: 30px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 20px;
    background: rgba(59, 59, 59, 0.50);
    backdrop-filter: blur(5px);
`;
const P = styled.p`
    align-self: stretch;
    color: white;
    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
`;
const Timer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`;
const Hours = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    flex: 1 0 0;
`;
const Minutes = styled(Hours)`
    color: white;
`;
const Seconds = styled(Hours)`
    color: white;
`;
const H4 = styled.h4`
    color: white;
    font-family: "Space Mono";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    text-transform: capitalize;
`;
const H3 = styled.h3`
    align-self: stretch;
    color: var(--Text, #FFF);
    font-family: "Space Mono";
    font-size: 38px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    text-transform: capitalize;
`;
const P2 = styled(P)`
    align-self: stretch;
`;

interface Props {
    image: string;
    name: string;
    price: number;
}

const ItemHighlight: React.FC<Props> = ({ image, name, price }) => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchEndTime = async () => {
            try {
                const response = await axios.get(`${apiConfig.API_URL}/sales/${HighlightedItemConfig.item}`);
                const saleEndTime = new Date(response.data.saleDuration).getTime();
                startCountdown(saleEndTime);
            } catch (error) {
                console.error('Error fetching sale end time:', error);
            }
        };

        const startCountdown = (targetTime: number) => {
            const updateTimer = () => {
                const currentTime = new Date().getTime();  // Get current time in UTC
                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    clearInterval(interval);
                    setTime({ hours: 0, minutes: 0, seconds: 0 });
                } else {
                    const totalHours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
                    const secs = Math.floor((remainingTime / 1000) % 60);
                    setTime({ hours: totalHours, minutes: mins, seconds: secs });
                }
            };

            const interval = setInterval(updateTimer, 1000);
            updateTimer(); // Initial call to set the timer immediately

            return () => clearInterval(interval);
        };

        fetchEndTime();
    }, []);

    return (
        <Highlight image={image}>
            <ItemInfo>
                <Frame>
                    <ItemPriceNameAndButton>
                        <SalePrice>${price}</SalePrice>
                        <H2>{name}</H2>
                        <Button>
                            <EyeIcon />
                            <div>See item</div>
                        </Button>
                    </ItemPriceNameAndButton>
                    <SaleTimer>
                        <P>Sale ends in:</P>
                        <Timer>
                            <Hours>
                                <H3>{time.hours}</H3>
                                <P2>Hours</P2>
                            </Hours>
                            <H4>:</H4>
                            <Minutes>
                                <H3>{time.minutes}</H3>
                                <P2>Minutes</P2>
                            </Minutes>
                            <H4>:</H4>
                            <Seconds>
                                <H3>{time.seconds}</H3>
                                <P2>Seconds</P2>
                            </Seconds>
                        </Timer>
                    </SaleTimer>
                </Frame>
            </ItemInfo>
        </Highlight>
    );
};

export default ItemHighlight;
