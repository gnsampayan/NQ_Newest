import styled from "styled-components";


const BladeContents = styled.div<Props>`
    position: absolute;
    background-color: rgba(230, 211, 255, 0.8);
    width: 400px;
    height: calc(100vh - 80px);
    display: ${props => (props.isVisible ? 'block' : 'none')};
`;

interface Props {
    isVisible: boolean;
  }

const Blade = ({ isVisible } : Props) => {
    return <BladeContents isVisible={isVisible}>{isVisible ? "Blade Visible" : "Blade Hidden"}</BladeContents>;
}

export default Blade