import styled from "styled-components";
import SearchBar from "./SearchBar";
import 'typeface-work-sans';


const BladeContents = styled.div<Props>`
    position: absolute;
    background-color: #D9D9D9;
    width: 400px;
    height: auto;
    display: ${props => (props.isVisible ? 'block' : 'none')};
    padding-bottom: 40px;
`;
const Text = styled.h5`
    color: #2B2B2B;
    font-family: 'Work Sans', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.375rem;
    margin-left: 40px;
    margin-bottom: 20px;
`;
const BoldText = styled(Text)`
  font-weight: 600;
`;
const TitleTxt = styled.h3`
    color: #2B2B2B;
    font-family: 'Work Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 40px 0px 20px 40px;
`;

interface Props {
    isVisible: boolean;
  }

const Blade = ({ isVisible } : Props) => {
    return <BladeContents isVisible={isVisible}>
        {isVisible && 
            <>
                <SearchBar/>
                <section>
                    <BoldText>In Stock</BoldText>
                    <BoldText>Featured</BoldText>
                    <BoldText>On Sale</BoldText>
                    <BoldText>Popular</BoldText>
                </section>
                <TitleTxt>CATEGORIES</TitleTxt>
                <section>
                    <Text>Electronics</Text>
                    <Text>Hardware</Text>
                    <Text>Plumbing</Text>
                    <Text>Tools</Text>
                    <Text>Carpentry</Text>
                    <Text>Masonry</Text>
                    <Text>Ladders</Text>
                    <Text>Wire</Text>
                </section>
            </>
        }
    </BladeContents>;
}

export default Blade