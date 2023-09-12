import styled from "styled-components";
import SearchBar from "./SearchBar";
import 'typeface-work-sans';


const BladeContents = styled.div<Props>`
    position: absolute;
    background-color: #D9D9D9;
    width: 400px;
    height: calc(100vh - 80px);
    display: ${props => (props.isVisible ? 'block' : 'none')};
`;
const Text = styled.h5`
    color: #2B2B2B;
    font-family: 'Work Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 1.375rem;
    margin-left: 40px;
    margin-bottom: 20px;
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
                    <Text>In Stock</Text>
                    <Text>Featured</Text>
                    <Text>On Sale</Text>
                    <Text>Popular</Text>
                </section>
                <h3>CATEGORIES</h3>
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