import { useEffect, useState } from "react";
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

    useEffect(() => {
        // Temporary data
        const data = [
            { id: 1, name: "Hammer Drill", category: "Power Tools", image: "https://via.placeholder.com/150", rate: 15, status: true, durationInDays: 5, startDate: "2023-08-01", endDate: "2023-08-06", daysRemaining: 3 },
            { id: 2, name: "Circular Saw", category: "Power Tools", image: "https://via.placeholder.com/150", rate: 20, status: false, durationInDays: 3, startDate: "2023-08-02", endDate: "2023-08-05", daysRemaining: 0 },
            { id: 3, name: "Ladder", category: "General Tools", image: "https://via.placeholder.com/150", rate: 10, status: true, durationInDays: 7, startDate: "2023-08-01", endDate: "2023-08-08", daysRemaining: 4 },
            { id: 4, name: "Welding Machine", category: "Specialized Tools", image: "https://via.placeholder.com/150", rate: 25, status: true, durationInDays: 10, startDate: "2023-08-01", endDate: "2023-08-11", daysRemaining: 7 },
            { id: 5, name: "Angle Grinder", category: "Power Tools", image: "https://via.placeholder.com/150", rate: 18, status: false, durationInDays: 2, startDate: "2023-08-03", endDate: "2023-08-05", daysRemaining: 0 },
            { id: 6, name: "Concrete Mixer", category: "Heavy Equipment", image: "https://via.placeholder.com/150", rate: 50, status: true, durationInDays: 8, startDate: "2023-08-01", endDate: "2023-08-09", daysRemaining: 5 },
            { id: 7, name: "Jackhammer", category: "Heavy Equipment", image: "https://via.placeholder.com/150", rate: 60, status: false, durationInDays: 4, startDate: "2023-08-02", endDate: "2023-08-06", daysRemaining: 0 }
        ];
        // Sort tools so that available ones are on top
        const sortedData = data.sort((a, b) => (a.status === true && b.status === false ? -1 : 1));
        setTools(sortedData);
        // Uncomment the below code when using real API
        // const fetchTools = async () => {
        //     const response = await fetch("/api/tools");
        //     const data = await response.json();
        //     setTools(data);
        // };
        // fetchTools();
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for tool", id);
    };

    const handleFilter = () => {
        console.log('filter Tool clicked');
    };

    const heroContents = {
        headline: 'Convenient and Affordable Tool Rentals',
        subhead: `Access a wide range of high-quality tools without the hassle 
        of ownership. From power tools to specialized equipment, our rental 
        services provide everything you need to get the job done efficiently 
        and cost-effectively.`,
        btnTitle: 'Become a Member',
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
                            <ButtonCounter title={"All"} type={"default"} totalVisItemsCards={0} onClick={handleFilter} />
                        </Wrap>
                        <ToolList tools={tools} onOptions={handleOptions} />
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
