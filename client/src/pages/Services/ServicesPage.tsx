import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div<{ margin: string }>`
    display: flex;
    flex-direction: column;
    padding: 20px 60px;
    min-height: calc(100vh - 100px);
    color: white;
    background-color: #1A1A1A;
    margin-left: ${(props) => props.margin};
`;

const Section = styled.div`
    margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
    color: white;
    font-family: "Work Sans";
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const DeliveryCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: #2B2B2B;
    margin-bottom: 10px;
`;

const DeliveryInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const DeliveryText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
`;

const DeliveryActions = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #A259FF;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #8B42E6;
    }
`;

const SearchBar = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #A259FF;
    margin-bottom: 20px;
    width: 100%;
    font-family: "Work Sans";
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

const Number = styled.div<{ isActive: boolean }>`
    color: #FFF;
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    display: flex;
    padding: 5px 10px;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: ${(props) => (props.isActive ? '#858584' : '#3B3B3B')};
`;

const ServiceSection = styled.div`
    background-color: rgba(59, 59, 59, 0.5);
    padding: 20px;
    border-radius: 20px;
`;

interface Props {
    $margin: string;
}

interface Delivery {
    id: number;
    date: string;
    status: string;
}

const DeliveryList = ({ deliveries, onCancel, onReschedule }: { deliveries: Delivery[], onCancel: (id: number) => void, onReschedule: (id: number) => void }) => (
    deliveries.map((delivery) => (
        <DeliveryCard key={delivery.id}>
            <DeliveryInfo>
                <DeliveryText>{delivery.date}</DeliveryText>
                <DeliveryText>{delivery.status}</DeliveryText>
            </DeliveryInfo>
            <DeliveryActions>
                <Button onClick={() => onCancel(delivery.id)}>Cancel</Button>
                <Button onClick={() => onReschedule(delivery.id)}>Reschedule</Button>
            </DeliveryActions>
        </DeliveryCard>
    ))
);

const ServicesPage = ({ $margin }: Props) => {
    const location = useLocation();
    const { serviceName } = location.state as { serviceName: string } || { serviceName: '' };

    const [currentDeliveries, setCurrentDeliveries] = useState<Delivery[]>([]);
    const [upcomingDeliveries, setUpcomingDeliveries] = useState<Delivery[]>([]);
    const [pastDeliveries, setPastDeliveries] = useState<Delivery[]>([]);
    const [activeTab, setActiveTab] = useState<'Current' | 'Upcoming' | 'Past'>('Current');
    const [activeServiceTab, setActiveServiceTab] = useState<string>(serviceName);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        setActiveServiceTab(serviceName);
    }, [serviceName]);

    useEffect(() => {
        const fetchDeliveries = async () => {
            // Replace with your API call
            const response = await fetch("/api/deliveries");
            const data = await response.json();
            setCurrentDeliveries(data.current);
            setUpcomingDeliveries(data.upcoming);
            setPastDeliveries(data.past);
        };

        fetchDeliveries();
    }, []);

    const handleCancel = (id: number) => {
        console.log(`Cancel delivery with ID: ${id}`);
    };

    const handleReschedule = (id: number) => {
        console.log(`Reschedule delivery with ID: ${id}`);
    };

    const getFilteredDeliveries = (deliveries: Delivery[]) =>
        deliveries.filter(delivery =>
            delivery.date.includes(searchTerm) || delivery.status.includes(searchTerm)
        );

    const renderTabContent = (deliveries: Delivery[], tabName: string) => (
        <>
            <SectionTitle>{tabName} Deliveries</SectionTitle>
            {deliveries.length > 0 ? (
                <DeliveryList deliveries={deliveries} onCancel={handleCancel} onReschedule={handleReschedule} />
            ) : (
                <DeliveryText>No {tabName.toLowerCase()} deliveries found</DeliveryText>
            )}
        </>
    );

    const renderServiceSection = () => {
        if (activeServiceTab === 'Deliveries') {
            // change to be more dynamic and connected to DB
            const tabs = [
                { name: 'Current', count: currentDeliveries.length, deliveries: currentDeliveries },
                { name: 'Upcoming', count: upcomingDeliveries.length, deliveries: upcomingDeliveries },
                { name: 'Past', count: pastDeliveries.length, deliveries: pastDeliveries }
            ];

            return (
                <ServiceSection>
                    <h1>{activeServiceTab}</h1>
                    <TabsContainer>
                        {tabs.map((tab) => (
                            <TabButton key={tab.name} isActive={activeTab === tab.name} onClick={() => setActiveTab(tab.name as typeof activeTab)}>
                                {tab.name}
                                <Number isActive={activeTab === tab.name}>{tab.count}</Number>
                            </TabButton>
                        ))}
                    </TabsContainer>
                    <SearchBar
                        type="text"
                        placeholder={`Search ${activeServiceTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Section>
                        {renderTabContent(getFilteredDeliveries(tabs.find(tab => tab.name === activeTab)?.deliveries || []), activeTab)}
                    </Section>
                </ServiceSection>
            );
        } else {
            // change to be more dynamic and connected to DB
            const tabs = [
                { name: 'Current', count: currentDeliveries.length, deliveries: currentDeliveries },
                { name: 'Upcoming', count: upcomingDeliveries.length, deliveries: upcomingDeliveries },
                { name: 'Past', count: pastDeliveries.length, deliveries: pastDeliveries }
            ];
            return (
                <ServiceSection>
                    <h1>{activeServiceTab}</h1>
                    <TabsContainer>
                        {tabs.map((tab) => (
                            <TabButton key={tab.name} isActive={activeTab === tab.name} onClick={() => setActiveTab(tab.name as typeof activeTab)}>
                                {tab.name}
                                <Number isActive={activeTab === tab.name}>{tab.count}</Number>
                            </TabButton>
                        ))}
                    </TabsContainer>
                    <SearchBar
                        type="text"
                        placeholder={`Search ${activeServiceTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Section>
                        {renderTabContent(getFilteredDeliveries(tabs.find(tab => tab.name === activeTab)?.deliveries || []), activeTab)}
                    </Section>
                </ServiceSection>
            );
        }
    };
    return (
        <Container margin={$margin}>
            <TabsContainer>
                {['Deliveries', 'Contractor Services', 'Tool Rentals', 'Installation Services'].map(service => (
                    <TabButton key={service} isActive={activeServiceTab === service} onClick={() => setActiveServiceTab(service)}>
                        {service}
                    </TabButton>
                ))}
            </TabsContainer>
            {renderServiceSection()}
        </Container>
    );
};

export default ServicesPage;
