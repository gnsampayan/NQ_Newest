import { useNavigate } from "react-router";
import styled from "styled-components";
import 'typeface-work-sans';


const BladeContents = styled.div<Props>`
    position: fixed;
    top: 0;
    z-index: 2;
    background: #221F27;
    width: 400px;
    height: 100vh;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
    padding-top: 120px;
    padding-bottom: 20px;
    overflow-y: auto;
`;

const ButtonText = styled.h5`
    color: white;
    margin-left: 40px;
    cursor: pointer;
    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    &:hover {
        color: #a259ff;
    }
`;

const PromoButton = styled.h5`
    margin-left: 40px;
    color: white;
    cursor: pointer;
    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
    &:hover {
        color: #a259ff;
    }
`;

const TitleTxt = styled.h3`
    color: #858584;
    margin: 40px 0px 20px 40px;
    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`;

const IndentedSection = styled.div`
    margin-left: 40px;
`;

interface Props {
    $isVisible: boolean;
  }

const Blade = ({ $isVisible } : Props) => {
    const navigate = useNavigate();

    const handleNavigateToShop = (filterName: string) => {
        navigate(`/shop/${filterName}`, { state: { filterName } });
        location.reload();
    };

    const handleNavigateToService = (serviceType: string) => {
        navigate(`/services/${serviceType}`);
    };

    return (
        <BladeContents $isVisible={$isVisible}>
            {$isVisible && (
                <>
                    <section>
                        <PromoButton onClick={() => handleNavigateToShop("Featured Finds")}>Featured</PromoButton>
                        <PromoButton onClick={() => handleNavigateToShop("Trending")}>Trending</PromoButton>
                        <PromoButton onClick={() => handleNavigateToShop("Best Sellers")}>Best Sellers</PromoButton>
                        <PromoButton onClick={() => handleNavigateToShop("On Sale")}>On Sale</PromoButton>
                        <PromoButton onClick={() => handleNavigateToShop("Most Reviews")}>Most Reviews</PromoButton>
                    </section>
                    <TitleTxt>Categories</TitleTxt>
                    <IndentedSection>
                        <ButtonText onClick={() => handleNavigateToShop("Electrical")}>Electrical</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Metals")}>Metals</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Plumbing")}>Plumbing</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Tools")}>Tools</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Lumber")}>Lumber</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Masonry")}>Masonry</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Fixtures")}>Fixtures</ButtonText>
                        <ButtonText onClick={() => handleNavigateToShop("Insulation")}>Insulation</ButtonText>
                    </IndentedSection>
                    <TitleTxt>Services</TitleTxt>
                    <IndentedSection>
                        <ButtonText onClick={() => handleNavigateToService("shipments")}>Shipments</ButtonText>
                        <ButtonText onClick={() => handleNavigateToService("contractor-services")}>Contractor Services</ButtonText>
                        <ButtonText onClick={() => handleNavigateToService("tool-rentals")}>Tool Rentals</ButtonText>
                        <ButtonText onClick={() => handleNavigateToService("installation-services")}>Installation Services</ButtonText>
                    </IndentedSection>
                </>
            )}
        </BladeContents>
    );
};

export default Blade;