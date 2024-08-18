import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import HeroWidget from "../../components/Widgets/HeroWidget";
import ToolRentalImage from "../../assets/images/Tool_Rentals.png";
import Footer from "../../components/Widgets/FooterWidget";
import Button from "../../components/Buttons/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import ButtonCounter from "../../components/Buttons/ButtonCounter";

const Section = styled.div`
    margin-bottom: 40px;
`;

const ToolCard = styled.div<{ isRented?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    background: #2B2B2B;
    margin-bottom: 20px;
    color: white;
    width: 100%;
    opacity: ${({ isRented }) => (isRented ? 0.3 : 1)};
    gap: 20px;
`;

const ToolInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const ToolText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    display: flex;
`;

const ToolName = styled(ToolText)`
    flex: 1;
    text-align: left;
`;

const ToolCategory = styled(ToolText)`
    flex: 1;
    text-align: left;
`;

const ToolDuration = styled(ToolText)`
    flex: 1;
    text-align: left;
`;

const ToolRate = styled(ToolText)`
    flex: 1;
    text-align: right;
`;

const ToolActions = styled.div`
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

const ToolIcon = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const ToolIndex = styled.div`
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

    &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(8) {
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

interface Tool {
    id: number;
    name: string;
    category: string;
    image: string;
    rate: number;
    status: boolean;
    durationInDays: number;
    startDate: string;
    endDate: string;
    daysRemaining: number;
}

const ToolList = ({ tools, onOptions }: { tools: Tool[], onOptions: (id: number) => void }) => {
    return (
        <Section>
            <TableHeader>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>Name</HeaderItem>
                <HeaderItem>Category</HeaderItem>
                <HeaderItem>Duration</HeaderItem>
                <HeaderItem>Rate</HeaderItem>
                <HeaderItem>Start Date</HeaderItem>
                <HeaderItem>End Date</HeaderItem>
                <HeaderItem>Days Remaining</HeaderItem>
            </TableHeader>
            {tools.map((tool, index) => (
                <ToolCard key={tool.id} isRented={!tool.status}>
                    <ToolInfo>
                        <ToolIndex>{index + 1}</ToolIndex>
                        <ToolIcon src={tool.image} alt="Avatar" />
                        <ToolName>{tool.name}</ToolName>
                    </ToolInfo>
                    <ToolCategory>{tool.category}</ToolCategory>
                    <ToolDuration>{tool.durationInDays} days</ToolDuration>
                    <ToolRate>${tool.rate}/day</ToolRate>
                    <ToolText>{tool.startDate}</ToolText>
                    <ToolText>{tool.endDate}</ToolText>
                    <ToolText>{tool.daysRemaining} days</ToolText>
                    <ToolActions>
                        <Options onClick={() => onOptions(tool.id)}>
                            <BsThreeDotsVertical style={{ transform: 'translateY(-3px)' }} />
                        </Options>
                    </ToolActions>
                </ToolCard>
            ))}
        </Section>
    );
};

const ToolRentals = () => {
    const token = localStorage.getItem('token');
    const [tools, setTools] = useState<Tool[]>([]);
    const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterTitle, setFilterTitle] = useState("All");

    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = [
            { id: 1, name: "Hammer Drill", category: "Power Tools", image: "https://via.placeholder.com/150", rate: 15, status: true, durationInDays: 5, startDate: "2023-08-01", endDate: "2023-08-06", daysRemaining: 3 },
            { id: 2, name: "Circular Saw", category: "Power Tools", image: "https://via.placeholder.com/150", rate: 20, status: false, durationInDays: 3, startDate: "2023-08-02", endDate: "2023-08-05", daysRemaining: 0 },
            { id: 3, name: "Ladder", category: "General Tools", image: "https://via.placeholder.com/150", rate: 10, status: true, durationInDays: 7, startDate: "2023-08-01", endDate: "2023-08-08", daysRemaining: 4 },
            { id: 4, name: "Welding Machine", category: "Specialized Tools", image: "https://via.placeholder.com/150", rate: 25, status: true, durationInDays: 10, startDate: "2023-08-01", endDate: "2023-08-11", daysRemaining: 7 },
            { id: 5, name: "Angle Grinder", category: "Power Tools", image: "https://via.placeholder.com/150", rate: 18, status: false, durationInDays: 2, startDate: "2023-08-03", endDate: "2023-08-05", daysRemaining: 0 },
            { id: 6, name: "Concrete Mixer", category: "Heavy Equipment", image: "https://via.placeholder.com/150", rate: 50, status: true, durationInDays: 8, startDate: "2023-08-01", endDate: "2023-08-09", daysRemaining: 5 },
            { id: 7, name: "Jackhammer", category: "Heavy Equipment", image: "https://via.placeholder.com/150", rate: 60, status: false, durationInDays: 4, startDate: "2023-08-02", endDate: "2023-08-06", daysRemaining: 0 }
        ];
        const sortedData = data.sort((a, b) => (a.status === true && b.status === false ? -1 : 1));
        setTools(sortedData);
        setFilteredTools(sortedData);
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for tool", id);
    };

    const handleFilterClick = (filter: string) => {
        setFilterTitle(filter);
        setIsDropdownVisible(false);

        let filtered = [...tools];

        switch (filter) {
            case "All":
                filtered = tools;
                break;
            case "Status Active":
                filtered = tools.filter(tool => tool.status === true);
                break;
            case "Status Inactive":
                filtered = tools.filter(tool => tool.status === false);
                break;
            case "Tool Name A-Z":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Tool Name Z-A":
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Rate Going Up":
                filtered.sort((a, b) => a.rate - b.rate);
                break;
            case "Rate Going Down":
                filtered.sort((a, b) => b.rate - a.rate);
                break;
            case "Category A-Z":
                filtered.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case "Category Z-A":
                filtered.sort((a, b) => b.category.localeCompare(a.category));
                break;
            case "Duration Going Up":
                filtered.sort((a, b) => a.durationInDays - b.durationInDays);
                break;
            case "Duration Going Down":
                filtered.sort((a, b) => b.durationInDays - a.durationInDays);
                break;
            case "Start Date Going Up":
                filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                break;
            case "Start Date Going Down":
                filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                break;
            case "End Date Going Up":
                filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
                break;
            case "End Date Going Down":
                filtered.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
                break;
            case "Days Remaining Going Up":
                filtered.sort((a, b) => a.daysRemaining - b.daysRemaining);
                break;
            case "Days Remaining Going Down":
                filtered.sort((a, b) => b.daysRemaining - a.daysRemaining);
                break;
            default:
                filtered = tools; // Default to all tools
        }

        setFilteredTools(filtered);
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
            "Status Active",
            "Status Inactive",
            "Tool Name A-Z",
            "Tool Name Z-A",
            "Rate Going Up",
            "Rate Going Down",
            "Category A-Z",
            "Category Z-A",
            "Duration Going Up",
            "Duration Going Down",
            "Start Date Going Up",
            "Start Date Going Down",
            "End Date Going Up",
            "End Date Going Down",
            "Days Remaining Going Up",
            "Days Remaining Going Down",
        ];

        return options
            .filter(option => option !== filterTitle)
            .map(option => (
                <Option key={option} onClick={() => handleFilterClick(option)}>
                    {option}
                </Option>
            ));
    };

    const heroContents = {
        headline: 'Convenient and Affordable Tool Rentals',
        subhead: `Access a wide range of high-quality tools without the hassle 
        of ownership. From power tools to specialized equipment, our rental 
        services provide everything you need to get the job done efficiently 
        and cost-effectively.`,
        btnTitle: 'Sign In',
        url: "/sign-in",
        image: ToolRentalImage
    };

    return (
        <>
            <ServiceSection>
                {token ?  
                    <>
                        <Button title={"Rent Tools"} onClick={() => {}} />
                        <Wrap>
                            <h1>Tool Rentals</h1>
                            <ButtonRef ref={buttonRef}>
                                <ButtonCounter
                                    title={filterTitle}
                                    type="default"
                                    totalVisItemsCards={filteredTools.length}
                                    onClick={toggleDropdown}
                                />
                            </ButtonRef>
                            <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
                                {renderFilterOptions()}
                            </Dropdown>
                        </Wrap>
                        <ToolList tools={filteredTools} onOptions={handleOptions} />
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
    );
};

export default ToolRentals;
