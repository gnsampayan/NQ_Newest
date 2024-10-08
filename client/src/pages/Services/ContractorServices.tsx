import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import HeroWidget from "../../components/Widgets/HeroWidget";
import ContractorImage from "../../assets/images/contractor_working_in_a_jobsite.png";
import Footer from "../../components/Widgets/FooterWidget";
import Button from "../../components/Buttons/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import ButtonCounter from "../../components/Buttons/ButtonCounter";

const Section = styled.div`
    margin-bottom: 40px;
`;

const ContractorCard = styled.div<{ isInactive?: boolean }>`
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

const ContractorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const ContractorText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    display: flex;
`;

const ContractorRole = styled(ContractorText)`
    flex: 1;
    text-align: left;
`;

const ContractorWorkLength = styled(ContractorText)`
    flex: 1;
    text-align: left;
`;

const ContractorRate = styled(ContractorText)`
    flex: 1;
    text-align: right;
`;

const ContractorActions = styled.div`
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

const ContractorIcon = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const ContractorIndex = styled.div`
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

interface Contractor {
    id: number;
    name: string;
    role: string;
    workLengthInDays: string;
    image: string;
    rate: number;
    status: string;
}

const ContractorList = ({ contractors, onOptions }: { contractors: Contractor[], onOptions: (id: number) => void }) => {
    return (
        <Section>
            <TableHeader>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>Name</HeaderItem>
                <HeaderItem>Role</HeaderItem>
                <HeaderItem>Work Length</HeaderItem>
                <HeaderItem>Rate</HeaderItem>
            </TableHeader>
            {contractors.map((contractor, index) => (
                <ContractorCard key={contractor.id} isInactive={contractor.status === "inactive"}>
                    <ContractorInfo>
                        <ContractorIndex>{index + 1}</ContractorIndex>
                        <ContractorIcon src={contractor.image} alt="Avatar" />
                        <ContractorText>{contractor.name}</ContractorText>
                    </ContractorInfo>
                    <ContractorRole>{contractor.role}</ContractorRole>
                    <ContractorWorkLength>{contractor.workLengthInDays} days</ContractorWorkLength>
                    <ContractorRate>${contractor.rate}/day</ContractorRate>
                    <ContractorActions>
                        <Options onClick={() => onOptions(contractor.id)}>
                            <BsThreeDotsVertical style={{ transform: 'translateY(-3px)' }} />
                        </Options>
                    </ContractorActions>
                </ContractorCard>
            ))}
        </Section>
    );
};

const ContractorServices = () => {
    const token = localStorage.getItem('token');
    const [contractors , setContractors] = useState<Contractor[]>([]);
    const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterTitle, setFilterTitle] = useState("All");

    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = [
            { id: 1, name: "John Doe", role: "Electrician", workLengthInDays: "30", image: "https://via.placeholder.com/150", rate: 50, status: "inactive" },
            { id: 2, name: "Jane Smith", role: "Plumber", workLengthInDays: "45", image: "https://via.placeholder.com/150", rate: 60, status: "active" },
            { id: 3, name: "Mike Johnson", role: "Carpenter", workLengthInDays: "20", image: "https://via.placeholder.com/150", rate: 40, status: "active" },
            { id: 4, name: "Emily Davis", role: "Painter", workLengthInDays: "25", image: "https://via.placeholder.com/150", rate: 55, status: "active" },
            { id: 5, name: "David Brown", role: "Mason", workLengthInDays: "35", image: "https://via.placeholder.com/150", rate: 65, status: "inactive" },
            { id: 6, name: "Linda Wilson", role: "Roofer", workLengthInDays: "15", image: "https://via.placeholder.com/150", rate: 70, status: "inactive" },
            { id: 7, name: "James Moore", role: "Welder", workLengthInDays: "50", image: "https://via.placeholder.com/150", rate: 80, status: "active" }
        ];
        const sortedData = data.sort((a, b) => (a.status === "active" && b.status !== "active" ? -1 : 1));
        setContractors(sortedData);
        setFilteredContractors(sortedData);
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for contractor", id);
    };

    const handleFilterClick = (filter: string) => {
        setFilterTitle(filter);
        setIsDropdownVisible(false);

        let filtered = [...contractors];

        switch (filter) {
            case "All":
                filtered = contractors;
                break;
            case "Status Active":
                filtered = contractors.filter(c => c.status === "active");
                break;
            case "Status Inactive":
                filtered = contractors.filter(c => c.status === "inactive");
                break;
            case "Rate Going Up":
                filtered.sort((a, b) => a.rate - b.rate);
                break;
            case "Rate Going Down":
                filtered.sort((a, b) => b.rate - a.rate);
                break;
            case "Work Length Going Up":
                filtered.sort((a, b) => parseInt(a.workLengthInDays) - parseInt(b.workLengthInDays));
                break;
            case "Work Length Going Down":
                filtered.sort((a, b) => parseInt(b.workLengthInDays) - parseInt(a.workLengthInDays));
                break;
            case "Role A-Z":
                filtered.sort((a, b) => a.role.localeCompare(b.role));
                break;
            case "Role Z-A":
                filtered.sort((a, b) => b.role.localeCompare(a.role));
                break;
            case "Name A-Z":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Name Z-A":
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                filtered = contractors; // Default to all contractors
        }

        setFilteredContractors(filtered);
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
            "Rate Going Up",
            "Rate Going Down",
            "Work Length Going Up",
            "Work Length Going Down",
            "Role A-Z",
            "Role Z-A",
            "Name A-Z",
            "Name Z-A",
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
        headline: 'Expert Contractor Services',
        subhead: `Transform your project vision into reality with our skilled 
        contractor services. Whether it's residential, commercial, or 
        industrial, our experienced professionals deliver quality workmanship 
        and exceptional results.`,
        btnTitle: 'Sign In',
        url: "/sign-in",
        image: ContractorImage
    };

    return (
        <>
            <ServiceSection>
                {token ?  
                    <>
                    <Button title={"Hire Contractors"} onClick={() => {}} />
                        <Wrap>
                            <h1>Contractor Services</h1>
                            <ButtonRef ref={buttonRef}>
                                <ButtonCounter
                                    title={filterTitle}
                                    type="default"
                                    totalVisItemsCards={filteredContractors.length}
                                    onClick={toggleDropdown}
                                />
                            </ButtonRef>
                            <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
                                {renderFilterOptions()}
                            </Dropdown>
                        </Wrap>
                        <ContractorList contractors={filteredContractors} onOptions={handleOptions} />
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

export default ContractorServices;
