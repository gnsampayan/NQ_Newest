import styled from "styled-components";
import HeroWidget from "../../components/Widgets/HeroWidget";
import ToolRentalImage from "../../assets/images/Tool_Rentals.png";
import Footer from "../../components/Widgets/FooterWidget";

const ServiceSection = styled.div`
    padding: 20px;
    width: 100%;
    max-width: 1050px;
    margin-bottom: 200px;
`;

const ToolRentals = () => {
    const token = localStorage.getItem('token');

    const heroContents = {
        headline: 'Convenient and Affordable Tool Rentals',
        subhead: `Access a wide range of high-quality tools without the hassle 
        of ownership. From power tools to specialized equipment, our rental 
        services provide everything you need to get the job done efficiently 
        and cost-effectively`,
        btnTitle: 'Become a Member',
        url: "/sign-in",
        image: ToolRentalImage
    }
    return (
        <>
            <ServiceSection>
                { token ? 
                    <>
                        Services visible
                    </> 
                    : 
                    <HeroWidget 
                            headline={heroContents.headline}
                            subhead={heroContents.subhead}
                            btnTitle={heroContents.btnTitle} 
                            urlDestination={heroContents.url} 
                            heroImage={heroContents.image}
                         />
                }
            </ServiceSection>
            <Footer />
        </>
    )
}

export default ToolRentals