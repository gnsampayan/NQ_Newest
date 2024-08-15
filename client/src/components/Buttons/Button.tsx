import styled from "styled-components";
import IconWrapper from "./IconWrapper";
import { IconType } from 'react-icons';
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const Btn = styled.button<{ 
    borderColor?: string, 
    bgColor?: string, 
    bgHoverColor?: string, 
    fillHoverColor?: string,
    borderHoverColor?: string,
    textColor?: string,
    textHoverColor?: string,
    height?: string,
    width?: string,
}>`
        display: flex;
        height: ${({ height }) => height || '60px'};
        width: ${({ width }) => width || 'auto'};
        padding: 0px 50px;
        justify-content: center;
        align-items: center;
        gap: 12px;

        border-radius: 20px;
        border: 2px solid;
        border-color: ${({ borderColor }) => borderColor || '#A259FF'};

        color: ${({ textColor }) => textColor || 'white'};
        text-align: center;
        font-family: "Work Sans";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 140%; /* 22.4px */

        background-color: none;
        background: ${({ bgColor }) => bgColor || 'none'};

        &:hover {
            background: ${({ bgHoverColor }) => bgHoverColor || '#A259FF'};
            border-color: ${({ borderHoverColor }) => borderHoverColor || '#A259FF'};
            color: ${({ textHoverColor }) => textHoverColor || 'white'};
            .icon-wrapper {
                color: ${({ fillHoverColor }) => fillHoverColor || 'white'};
            }
        }
`;

interface Props {
    asset?: IconType;
    title: string;
    borderColor?: string;
    borderHoverColor?: string;
    bgColor?: string;
    bgHoverColor?: string;
    fillHoverColor?: string;
    fillColor?: string;
    textHoverColor?: string,
    textColor?: string,
    onClick: () => void;
    height?: string,
    width?: string,
}

const Button = ({ 
    title, 
    asset: IconAsset = BsFillRocketTakeoffFill, 
    borderColor, 
    borderHoverColor,
    bgColor, 
    bgHoverColor, 
    fillHoverColor, 
    fillColor,
    textColor,
    textHoverColor,
    onClick,
    height,
    width
} : Props) => {
        return (
            <>
                <Btn 
                    borderColor={borderColor} 
                    borderHoverColor={borderHoverColor}
                    bgColor={bgColor} 
                    bgHoverColor={bgHoverColor} 
                    onClick={onClick}
                    fillHoverColor={fillHoverColor}
                    textHoverColor={textHoverColor}
                    textColor={textColor}
                    height={height}
                    width={width}
                    >
                        <IconWrapper icon={IconAsset} fillColor={fillColor} fillHoverColor={fillHoverColor}/>
                        {title}
                </Btn>
            </>
        )
}

export default Button