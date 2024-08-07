import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Deliveries from "./Deliveries";
import ContractorServices from "./ContractorServices";
import ServicesSection from "../../components/Widgets/ServicesWidget";
import ToolRentals from "./ToolRentals";
import InstallationServices from "./InstallationServices";
import ServicesImage from "../../assets/images/collage_image_showcase.png";
import HeroWidget from "../../components/Widgets/HeroWidget";
import Footer from "../../components/Widgets/FooterWidget";

const Container = styled.div<{ margin: string }>`
    display: flex;
    flex-direction: column;
    padding: 20px 60px;
    min-height: calc(100vh - 100px);
    color: white;
    background-color: #1A1A1A;
    margin-left: ${(props) => props.margin};
`;

const TabsContainer = styled.div`
    width: 100%;
    justify-content: center;
    display: inline-flex;
    padding: 0px 20px 60px 20px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
    all: unset;
    display: flex;
    height: 60px;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    background: none;
    color: ${(props) => (props.isActive ? 'white' : '#858584')};
    text-align: center;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
    cursor: pointer;
    position: relative;

    &:hover::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${(props) => (props.isActive ? '#858584' : '#3B3B3B')};
    }
`;

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Parent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 100px;
`
interface Props {
    $margin: string;
}

const ServicesPage = ({ $margin }: Props) => {
    const { serviceType } = useParams<{ serviceType: string }>();
    const navigate = useNavigate();

    const [activeServiceTab, setActiveServiceTab] = useState<string>('Select a service');

    useEffect(() => {
        if (serviceType) {
            const serviceName = serviceType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            setActiveServiceTab(serviceName);
        } else {
            setActiveServiceTab('Select a service');
        }
    }, [serviceType]);

    const heroContents = {
        headline: 'Comprehensive Service Solutions',
        subhead: `Discover our wide range of professional services tailored to meet 
        all your needs. From fast and reliable deliveries to expert contractor work, 
        convenient tool rentals, and precise installation services, we offer 
        everything to support your projects efficiently and effectively.`,
        btnTitle: 'Become a Member',
        url: "/sign-in",
        image: ServicesImage
    }
    const renderDefault = () => {
        const token = localStorage.getItem('token');
        return (
            <Parent>
                {token ?
                    <>
                        Welcome userName, Please Select from our services
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
                <ServicesSection />
                <Footer />
            </Parent>
        );
    }

    const renderServiceSection = () => {
        switch (activeServiceTab) {
            case 'Deliveries':
                return <Deliveries />;
            case 'Contractor Services':
                return <ContractorServices />;
            case 'Tool Rentals':
                return <ToolRentals />;
            case 'Installation Services':
                return <InstallationServices />;
            default:
                return renderDefault();
        }
    };

    return (
        <Container margin={$margin}>
            <TabsContainer>
                {['Deliveries', 'Contractor Services', 'Tool Rentals', 'Installation Services'].map(service => (
                    <TabButton
                        key={service}
                        isActive={activeServiceTab === service}
                        onClick={() => {
                            setActiveServiceTab(service);
                            navigate(`/services/${service.toLowerCase().replace(' ', '-')}`);
                        }}
                    >
                        {service}
                    </TabButton>
                ))}
            </TabsContainer>
            <Wrap>
                {renderServiceSection()}
            </Wrap>
        </Container>
    );
};

export default ServicesPage;
