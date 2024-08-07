import styled from "styled-components";
import InstallationServicesImage from "../../assets/images/professional_technician.png";
import HeroWidget from "../../components/Widgets/HeroWidget";
import Footer from "../../components/Widgets/FooterWidget";

const ServiceSection = styled.div`
    padding: 20px;
    width: 100%;
    max-width: 1050px;
    margin-bottom: 200px;
`;
const InstallationServices = () => {
    const token = localStorage.getItem('token');

    const heroContents = {
        headline: 'Professional Installation Services',
        subhead: `Ensure seamless and accurate installations with our expert services. 
        From home improvements to commercial setups, our experienced team guarantees 
        precision, safety, and satisfaction for all your installation needs.`,
        btnTitle: 'Become a Member',
        url: "/sign-in",
        image: InstallationServicesImage
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

export default InstallationServices