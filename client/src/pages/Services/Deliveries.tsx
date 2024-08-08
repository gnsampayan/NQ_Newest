import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import Cement from "../../assets/items/cement.png";
import ButtonCounter from "../../components/Buttons/ButtonCounter";
import HeroWidget from "../../components/Widgets/HeroWidget";
import DeliverImage from "../../assets/images/Reliable_and_Fast_Deliveries.png";
import Footer from "../../components/Widgets/FooterWidget";
import Button from "../../components/Buttons/Button";

const Section = styled.div`
    margin-bottom: 40px;
`;

const DeliveryCard = styled.div<{ isInactive: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    background: #2B2B2B;
    margin-bottom: 20px;
    color: white;
    width: 100%;
    opacity: ${({ isInactive }) => (isInactive ? 0.3 : 1)};
`;

const DeliveryInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const DeliveryText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    display: flex;
`;

const DeliveryDate = styled(DeliveryText)`
    flex: 0 0 1; /* Adjust this value to fit your design */
    text-align: right;
`;

const DeliverySubscription = styled(DeliveryText)<{ subscribed: boolean }>`
    flex: 0 0 1; /* Adjust this value to fit your design */
    text-align: left;
    margin-right: 20px;
    color: #8B42E6;
    background-color: white;
    padding: 6px 12px;
    border-radius: 20px;
    display: ${(props) => props.subscribed ? 'block' : 'none'};
`;

const DeliveryStatus = styled(DeliveryText)`
    flex: 0 0 1; /* Adjust this value to fit your design */
    text-align: right;
    padding-left: 20px;
`;

const DeliveryActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 10px;
`;

const Options = styled.button`
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    background: none;
`;

const ServiceSection = styled.div`
    padding: 20px;
    width: 100%;
    max-width: 1050px;
    margin-bottom: 200px;
`;

const DeliveryIcon = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const DeliveryIndex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #444;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-family: "Work Sans";
    font-size: 14px;
    font-weight: 600;
`;

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-radius: 20px;
    border: 1px solid #3B3B3B;
    background: none;
    color: #858584;
    font-family: "Work Sans";
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const HeaderItem = styled.div`
    flex: 1;
    text-align: left;

    &:nth-child(1) {
        max-width: 30px;
    }

    &:nth-child(2) {
        flex: 3;
    }

    &:nth-child(3), &:nth-child(4), &:nth-child(5) {
        flex: 1;
    }
`;
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 40px;
`

interface Delivery {
    id: number;
    date: string;
    deliveryStatus: string;
    order: string;
    avatar: string;
    subscription: string;
    status: boolean;
}

const DeliveryList = ({ deliveries, onOptions }: { deliveries: Delivery[], onOptions: (id: number) => void }) => {
    const handleSubscription = (text : string) => {
        const formattedText = text.toLocaleLowerCase();
        if (formattedText === 'none') {
            return false;
        } else {
            return true;
        };
    };
    return (
        <Section>
            <TableHeader>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>Order</HeaderItem>
                <HeaderItem>Subscription</HeaderItem>
                <HeaderItem>Arrival</HeaderItem>
                <HeaderItem>Status</HeaderItem>
            </TableHeader>
            {deliveries.map((delivery, index) => (
                <DeliveryCard key={delivery.id} isInactive={delivery.status === false && delivery.deliveryStatus === "Delivered"}>
                    <DeliveryInfo>
                        <DeliveryIndex>{index + 1}</DeliveryIndex>
                        <DeliveryIcon src={delivery.avatar} alt="Avatar" />
                        <DeliveryText>{delivery.order}</DeliveryText>
                    </DeliveryInfo>
                    <DeliverySubscription subscribed={handleSubscription(delivery.subscription)}>{delivery.subscription}</DeliverySubscription>
                    <DeliveryDate>{delivery.date}</DeliveryDate>
                    <DeliveryStatus>{delivery.deliveryStatus}</DeliveryStatus>
                    <DeliveryActions>
                        <Options onClick={() => onOptions(delivery.id)}>
                            <BsThreeDotsVertical style={{ transform: 'translateY(-3px)' }} />
                        </Options>
                    </DeliveryActions>
                </DeliveryCard>
            ))}
        </Section>
    )
};


const Deliveries = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Temporary data
        const data = [
            { id: 1, date: "08/05/2024", deliveryStatus: "Out for Delivery", order: "Milwaukee® M18 FUEL™ Circular Saw", avatar: Cement, subscription: "Weekly", status: true },
            { id: 2, date: "08/05/2024", deliveryStatus: "Out for Delivery", order: "2 in. x 6 in. x 8 ft. 2 Prime Kiln-Dried Southern Yellow Pine Dimensional Lumber", avatar: Cement, subscription: "Monthly", status: true },
            { id: 3, date: "08/05/2024", deliveryStatus: "Out for Delivery", order: "Cement - 50kg x 10 units", avatar: Cement, subscription: "None", status: false },
            { id: 4, date: "08/05/2024", deliveryStatus: "In Transit", order: "Gemelina Lumber - 2x4 x 100 units", avatar: Cement, subscription: "Weekly", status: true },
            { id: 5, date: "08/05/2024", deliveryStatus: "Delivered", order: "Sand - 3 m³", avatar: Cement, subscription: "None", status: false },
            { id: 6, date: "07/21/2024", deliveryStatus: "Delivered", order: "Gravel - 20 m³", avatar: Cement, subscription: "Monthly", status: true },
            { id: 7, date: "06/28/2024", deliveryStatus: "Delivered", order: "Dirt - 60 m³", avatar: Cement, subscription: "None", status: false },
        ];
        const sortedData = data.sort((a, b) => (a.status === true && b.status === false ? -1 : 1));
        setDeliveries(sortedData);
        // Uncomment the below code when using real API
        // const fetchDeliveries = async () => {
        //     const response = await fetch("/api/deliveries");
        //     const data = await response.json();
        //     setDeliveries(data);
        // };
        // fetchDeliveries();
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for delivery", id);
    };
    const handleFilter = () => {
        console.log('filter Delivery clicked');
    };
    const heroContents = {
        headline: 'Reliable and Fast Deliveries',
        subhead: `Experience prompt and dependable delivery services 
        tailored to meet your needs. From small parcels to large 
        shipments, we ensure your items are delivered safely and on 
        time, every time.`,
        btnTitle: 'Become a Member',
        url: "/sign-in",
        image: DeliverImage
    }
    return (
        <>
            <ServiceSection>
                {token ? 
                <>
                <Button title={"Add Recurring Delivery"} onClick={() => {}} />
                    <Wrap>
                        <h1>Deliveries</h1>
                        <ButtonCounter title={"All"} type={"default"} totalVisItemsCards={deliveries.length} onClick={handleFilter}></ButtonCounter>
                    </Wrap>
                    <DeliveryList deliveries={deliveries} onOptions={handleOptions} />
                </> 
                : 
                <>
                    <HeroWidget 
                        headline={heroContents.headline}
                        subhead={heroContents.subhead}
                        btnTitle={heroContents.btnTitle} 
                        urlDestination={heroContents.url} 
                        heroImage={heroContents.image}
                    />
                </>
                }
            </ServiceSection>
            <Footer />
        </>
    );
};

export default Deliveries;
