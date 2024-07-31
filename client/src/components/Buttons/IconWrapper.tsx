import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

interface IconWrapperProps {
    icon: IconType;
    fillColor?: string;
    fillHoverColor?: string;
}

const StyledIcon = styled.div<{ fillColor?: string; fillHoverColor?: string }>`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ fillColor }) => fillColor || '#A259FF'};
    transition: color 0.3s ease;

    &:hover {
        color: ${({ fillHoverColor }) => fillHoverColor || 'white'};
    }
`;

const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon, fillColor }) => {
    return (
        <StyledIcon fillColor={fillColor} className="icon-wrapper">
            <Icon />
        </StyledIcon>
    );
};

export default IconWrapper;
