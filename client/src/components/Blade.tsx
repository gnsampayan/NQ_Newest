import styled from "styled-components";
import SearchBar from "./SearchBar";


const BladeContents = styled.div<Props>`
    position: absolute;
    background-color: #D9D9D9;
    width: 400px;
    height: calc(100vh - 80px);
    display: ${props => (props.isVisible ? 'block' : 'none')};
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
                    <h5>In Stock</h5>
                    <h5>Featured</h5>
                    <h5>On Sale</h5>
                    <h5>Popular</h5>
                </section>
                <h3>CATEGORIES</h3>
                <section>
                    <h5>Electronics</h5>
                    <h5>Hardware</h5>
                    <h5>Plumbing</h5>
                    <h5>Tools</h5>
                    <h5>Carpentry</h5>
                    <h5>Masonry</h5>
                    <h5>Ladders</h5>
                    <h5>Wire</h5>
                </section>
            </>
        }
    </BladeContents>;
}

export default Blade