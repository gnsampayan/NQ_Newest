import { useEffect, useState, useRef } from "react";
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
    flex: 0 0 1;
    text-align: right;
`;

const DeliverySubscription = styled(DeliveryText)<{ subscribed: boolean }>`
    flex: 0 0 1;
    text-align: left;
    margin-right: 20px;
    color: #8B42E6;
    background-color: white;
    padding: 6px 12px;
    border-radius: 20px;
    display: ${(props) => props.subscribed ? 'block' : 'none'};
`;

const DeliveryStatus = styled(DeliveryText)`
    flex: 0 0 1;
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
    width: 100%;
    position: relative;
`;

const Dropdown = styled.div<{ isVisible: boolean }>`
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: rgba(43, 43, 43, 1);
    border: 2px solid #858584;
    border-radius: 20px;
    width: auto;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    z-index: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 10px;
    &:hover {
        border-color: white;
    }
`;

const Option = styled.h5`
    color: white;
    text-align: center;
    font-family: "Work Sans";
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
`;

const ButtonRef = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
`;

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
    const handleSubscription = (text: string) => {
        const formattedText = text.toLocaleLowerCase();
        return formattedText !== 'none';
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
    );
};

const Deliveries = () => {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterTitle, setFilterTitle] = useState("All");

    const token = localStorage.getItem('token');
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = [
            { id: 1, date: "08/05/2024", deliveryStatus: "Out for Delivery", order: "Milwaukee® M18 FUEL™ Circular Saw", avatar: Cement, subscription: "Weekly", status: true },
            { id: 2, date: "08/05/2024", deliveryStatus: "Out for Delivery", order: "2 in. x 6 in. x 8 ft. 2 Prime Kiln-Dried Southern Yellow Pine Dimensional Lumber", avatar: Cement, subscription: "Monthly", status: true },
            { id: 3, date: "08/05/2024", deliveryStatus: "Out for Delivery", order: "Cement - 50kg x 10 units", avatar: Cement, subscription: "None", status: true },
            { id: 4, date: "08/05/2024", deliveryStatus: "In Transit", order: "Gemelina Lumber - 2x4 x 100 units", avatar: Cement, subscription: "Weekly", status: true },
            { id: 5, date: "08/05/2024", deliveryStatus: "Delivered", order: "Sand - 3 m³", avatar: Cement, subscription: "None", status: false },
            { id: 6, date: "07/21/2024", deliveryStatus: "Delivered", order: "Gravel - 20 m³", avatar: Cement, subscription: "Monthly", status: true },
            { id: 7, date: "06/28/2024", deliveryStatus: "Delivered", order: "Dirt - 60 m³", avatar: Cement, subscription: "None", status: false },
        ];
        const sortedData = data.sort((a, b) => (a.status === true && b.status === false ? -1 : 1));
        setDeliveries(sortedData);
        setFilteredDeliveries(sortedData);
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for delivery", id);
    };

    const handleFilterClick = (filter: string) => {
        setFilterTitle(filter);
        setIsDropdownVisible(false);

        let filtered = [...deliveries];

        if (filter === "All") {
            filtered = deliveries;
        } else if (filter === "Active Status") {
            filtered = deliveries.filter(d => d.status === true);
        } else if (filter === "Inactive Status") {
            filtered = deliveries.filter(d => d.status === false);
        } else if (filter === "Subscribed") {
            filtered = deliveries.filter(d => d.subscription.toLowerCase() !== "none");
        } else if (filter === "Date Going Up") {
            filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (filter === "Date Going Down") {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (filter === "Delivered") {
            filtered = deliveries.filter(d => d.deliveryStatus === "Delivered");
        } else if (filter === "In Transit") {
            filtered = deliveries.filter(d => d.deliveryStatus === "In Transit");
        } else if (filter === "Out For Delivery") {
            filtered = deliveries.filter(d => d.deliveryStatus === "Out for Delivery");
        } else {
            filtered = deliveries; // Default to all deliveries
        }

        setFilteredDeliveries(filtered);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                buttonRef.current &&
                !buttonRef.current.contains(target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(target)
            ) {
                setIsDropdownVisible(false);
            }
        };

        if (isDropdownVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownVisible]);

    const renderFilterOptions = () => {
        const options = [
            "All",
            "Active Status",
            "Inactive Status",
            "Subscribed",
            "Date Going Up",
            "Date Going Down",
            "Delivered",
            "In Transit",
            "Out For Delivery",
        ];

        return options
            .filter(option => option !== filterTitle)
            .map(option => (
                <Option key={option} onClick={() => handleFilterClick(option)}>
                    {option}
                </Option>
            ));
    };

    return (
        <>
            <ServiceSection>
                {token ? 
                <>
                    <Button title={"Add Recurring Delivery"} onClick={() => {}} />
                    <Wrap>
                        <h1>Deliveries</h1>
                        <ButtonRef ref={buttonRef}>
                            <ButtonCounter
                                title={filterTitle}
                                type="default"
                                totalVisItemsCards={filteredDeliveries.length}
                                onClick={toggleDropdown}
                            />
                        </ButtonRef>
                        <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
                            {renderFilterOptions()}
                        </Dropdown>
                    </Wrap>
                    <DeliveryList deliveries={filteredDeliveries} onOptions={handleOptions} />
                </> 
                : 
                <>
                    <HeroWidget 
                        headline="Reliable and Fast Deliveries"
                        subhead="Experience prompt and dependable delivery services tailored to meet your needs. From small parcels to large shipments, we ensure your items are delivered safely and on time, every time."
                        btnTitle="Become a Member" 
                        urlDestination="/sign-in" 
                        heroImage={DeliverImage}
                    />
                </>
                }
            </ServiceSection>
            <Footer />
        </>
    );
};

export default Deliveries;
