import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import ButtonCounter from "../components/Buttons/ButtonCounter";
import Footer from "../components/Widgets/FooterWidget";

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;
const Section = styled.div`
    margin-bottom: 40px;
`;

const OrderCard = styled.div<{ isInactive: boolean }>`
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

const OrderInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const OrderText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    display: flex;
`;

const DeliveryDate = styled(OrderText)`
    flex: 0 0 1;
    text-align: right;
`;

const OrderStatus = styled(OrderText)`
    flex: 0 0 1;
    text-align: right;
    padding-left: 20px;
`;

const OrderActions = styled.div`
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

const OrdersSection = styled.div`
    padding: 20px;
    width: 100%;
    max-width: 1050px;
    margin-bottom: 200px;
`;

const OrderIcon = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const OrderIndex = styled.div`
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
    color: white;
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

interface Order {
    id: number;
    date: string;
    orderStatus: string;
    order: string;
    avatar: string;
    status: boolean;
}

const OrderList = ({ orders, onOptions }: { orders: Order[], onOptions: (id: number) => void }) => {
    return (
        <Section>
            <TableHeader>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>Order</HeaderItem>
                <HeaderItem>Delivery Date</HeaderItem>
                <HeaderItem>Status</HeaderItem>
            </TableHeader>
            {orders.map((order, index) => (
                <OrderCard key={order.id} isInactive={order.status === false && order.orderStatus === "Completed"}>
                    <OrderInfo>
                        <OrderIndex>{index + 1}</OrderIndex>
                        <OrderIcon src={order.avatar} alt="Avatar" />
                        <OrderText>{order.order}</OrderText>
                    </OrderInfo>
                    <DeliveryDate>{order.date}</DeliveryDate>
                    <OrderStatus>{order.orderStatus}</OrderStatus>
                    <OrderActions>
                        <Options onClick={() => onOptions(order.id)}>
                            <BsThreeDotsVertical style={{ transform: 'translateY(-3px)' }} />
                        </Options>
                    </OrderActions>
                </OrderCard>
            ))}
        </Section>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterTitle, setFilterTitle] = useState("All");

    const token = localStorage.getItem('token');
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const OrderImage = "https://via.placeholder.com/150";
    useEffect(() => {
        const data = [
            { id: 1, date: "08/05/2024", orderStatus: "Processing", order: "Milwaukee® M18 FUEL™ Circular Saw", avatar: OrderImage, status: true },
            { id: 2, date: "08/05/2024", orderStatus: "Shipped", order: "2 in. x 6 in. x 8 ft. 2 Prime Kiln-Dried Southern Yellow Pine Dimensional Lumber", avatar: OrderImage, status: true },
            { id: 3, date: "08/05/2024", orderStatus: "Delivered", order: "Cement - 50kg x 10 units", avatar: OrderImage, status: true },
            { id: 4, date: "08/05/2024", orderStatus: "In Transit", order: "Gemelina Lumber - 2x4 x 100 units", avatar: OrderImage, status: true },
            { id: 5, date: "08/05/2024", orderStatus: "Completed", order: "Sand - 3 m³", avatar: OrderImage, status: false },
            { id: 6, date: "07/21/2024", orderStatus: "Completed", order: "Gravel - 20 m³", avatar: OrderImage, status: true },
            { id: 7, date: "06/28/2024", orderStatus: "Completed", order: "Dirt - 60 m³", avatar: OrderImage, status: false },
        ];
        const sortedData = data.sort((a, b) => (a.status === true && b.status === false ? -1 : 1));
        setOrders(sortedData);
        setFilteredOrders(sortedData);
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for order", id);
    };

    const handleFilterClick = (filter: string) => {
        setFilterTitle(filter);
        setIsDropdownVisible(false);

        let filtered = [...orders];

        if (filter === "All") {
            filtered = orders;
        } else if (filter === "Active Status") {
            filtered = orders.filter(o => o.status === true);
        } else if (filter === "Inactive Status") {
            filtered = orders.filter(o => o.status === false);
        } else if (filter === "Date Going Up") {
            filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (filter === "Date Going Down") {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (filter === "Completed") {
            filtered = orders.filter(o => o.orderStatus === "Completed");
        } else if (filter === "In Transit") {
            filtered = orders.filter(o => o.orderStatus === "In Transit");
        } else if (filter === "Processing") {
            filtered = orders.filter(o => o.orderStatus === "Processing");
        } else {
            filtered = orders; // Default to all orders
        }

        setFilteredOrders(filtered);
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
            "Date Going Up",
            "Date Going Down",
            "Completed",
            "In Transit",
            "Processing",
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
        <Wrapper>
            <OrdersSection>
                {token ? 
                <>
                    <Wrap>
                        <h1>Orders</h1>
                        <ButtonRef ref={buttonRef}>
                            <ButtonCounter
                                title={filterTitle}
                                type="default"
                                totalVisItemsCards={filteredOrders.length}
                                onClick={toggleDropdown}
                            />
                        </ButtonRef>
                        <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
                            {renderFilterOptions()}
                        </Dropdown>
                    </Wrap>
                    <OrderList orders={filteredOrders} onOptions={handleOptions} />
                </> 
                : 
                <>
                   <h1>You must be Logged in to view orders</h1>
                </>
                }
            </OrdersSection>
            <Footer />
        </Wrapper>
    );
};

export default Orders;
