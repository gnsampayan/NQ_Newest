import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Shipments from "./Shipments";
import ContractorServices from "./ContractorServices";
import ServicesSection from "../../components/Widgets/ServicesWidget";
import ToolRentals from "./ToolRentals";
import InstallationServices from "./InstallationServices";
import ServicesImage from "../../assets/images/collage_image_showcase.png";
import HeroWidget from "../../components/Widgets/HeroWidget";
import Footer from "../../components/Widgets/FooterWidget";
import { fetchUsernameFromDatabase } from "../../utils/utilityFunctions";

const Container = styled.div<{ margin: string }>`
    display: flex;
    flex-direction: column;
    padding: 20px 60px;
    min-height: calc(100vh - 100px);
    color: white;
    background-color: #1A1A1A;
    margin-left: ${(props) => props.margin};
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
const Welcome = styled.h3`
    color: white;
    /* H3 - Work Sans */
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 45.6px */
    text-transform: capitalize;

    margin-top: 20px;
    margin-bottom: -60px;
`
interface Props {
    $margin: string;
}

const ServicesPage = ({ $margin }: Props) => {
    const { serviceType } = useParams<{ serviceType: string }>();

    const [activeServiceTab, setActiveServiceTab] = useState<string>('Select a service');

    const [username, setUsername] = useState<string | null>(null);

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
                    <Welcome>
                        Welcome {username},
                    </Welcome>
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
            case 'Shipments':
                return <Shipments />;
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

    useEffect(() => {
        const getUsername = async () => {
            const name = await fetchUsernameFromDatabase();
            if (name) {
                setUsername(name);
            } else {
                setUsername(null);
            }
        };

        getUsername();
    }, []);

    return (
        <Container margin={$margin}>
            <Wrap>
                {renderServiceSection()}
            </Wrap>
        </Container>
    );
};

export default ServicesPage;
