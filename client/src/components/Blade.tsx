import styled from "styled-components";
import SearchBar from "./SearchBar";
import 'typeface-work-sans';


const BladeContents = styled.div<Props>`
    position: fixed;
    top: 76px;
    z-index: 2;
    background-color: white;
    border-right: 1px solid black;
    width: 400px;
    height: calc(100vh - 76px);
    display: ${props => (props.$isVisible ? 'block' : 'none')};
    padding-bottom: 40px;
    overflow-y: scroll;
`;

const Text = styled.h5`
    color: #2B2B2B;
    font-family: 'Work Sans', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.375rem;
    margin-left: 40px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
        color: #a259ff;
        font-weight: 400;
    }
`;
const Promo = styled(Text)`
  font-weight: 400;
  &:hover {
    font-weight: 600;
  }
`;
const TitleTxt = styled.h3`
    color: #2B2B2B;
    font-family: 'Work Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 40px 0px 20px 40px;
`;

interface Props {
    $isVisible: boolean;
  }

const Blade = ({ $isVisible } : Props) => {
    return <BladeContents $isVisible={$isVisible} >
        {$isVisible && 
            <>
                <SearchBar/>
                <section>
                    <Promo>In Stock</Promo>
                    <Promo>Featured</Promo>
                    <Promo>On Sale</Promo>
                    <Promo>Popular</Promo>
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