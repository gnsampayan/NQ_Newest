import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import InstallationServicesImage from "../../assets/images/professional_technician.png";
import HeroWidget from "../../components/Widgets/HeroWidget";
import Footer from "../../components/Widgets/FooterWidget";
import Button from "../../components/Buttons/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import ButtonCounter from "../../components/Buttons/ButtonCounter";

const Section = styled.div`
    margin-bottom: 40px;
`;

const InstallationCard = styled.div<{ isCompleted?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    background: #2B2B2B;
    margin-bottom: 20px;
    color: white;
    width: 100%;
    opacity: ${({ isCompleted }) => (isCompleted ? 0.3 : 1)};
`;

const InstallationInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const InstallationText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    display: flex;
`;

const InstallationService = styled(InstallationText)`
    flex: 1;
    text-align: left;
`;

const InstallationDate = styled(InstallationText)`
    flex: 1;
    text-align: left;
`;

const InstallerName = styled(InstallationText)`
    flex: 1;
    text-align: left;
`;

const InstallationFee = styled(InstallationText)`
    flex: 1;
    text-align: right;
`;

const InstallationActions = styled.div`
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

const InstallationIndex = styled.div`
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

    &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) {
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

interface Installation {
    id: number;
    service: string;
    installationDate: string;
    installerName: string;
    fee: number;
    status: boolean;
}

const InstallationList = ({ installations, onOptions }: { installations: Installation[], onOptions: (id: number) => void }) => {
    return (
        <Section>
            <TableHeader>
                <HeaderItem>#</HeaderItem>
                <HeaderItem>Service</HeaderItem>
                <HeaderItem>Installation Date</HeaderItem>
                <HeaderItem>Installer Name</HeaderItem>
                <HeaderItem>Fee</HeaderItem>
            </TableHeader>
            {installations.map((installation, index) => (
                <InstallationCard key={installation.id} isCompleted={!installation.status}>
                    <InstallationInfo>
                        <InstallationIndex>{index + 1}</InstallationIndex>
                        <InstallationService>{installation.service}</InstallationService>
                    </InstallationInfo>
                    <InstallationDate>{installation.installationDate}</InstallationDate>
                    <InstallerName>{installation.installerName}</InstallerName>
                    <InstallationFee>${installation.fee}</InstallationFee>
                    <InstallationActions>
                        <Options onClick={() => onOptions(installation.id)}>
                            <BsThreeDotsVertical style={{ transform: 'translateY(-3px)' }} />
                        </Options>
                    </InstallationActions>
                </InstallationCard>
            ))}
        </Section>
    );
};

const InstallationServices = () => {
    const token = localStorage.getItem('token');
    const [installations, setInstallations] = useState<Installation[]>([]);
    const [filteredInstallations, setFilteredInstallations] = useState<Installation[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filterTitle, setFilterTitle] = useState("All");

    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = [
            { id: 1, service: "TV Installation", installationDate: "2023-08-01", installerName: "John Doe", fee: 100, status: true },
            { id: 2, service: "Lighting Installation", installationDate: "2023-08-02", installerName: "Jane Smith", fee: 150, status: false },
            { id: 3, service: "Ceiling Installation", installationDate: "2023-08-03", installerName: "Mike Johnson", fee: 200, status: true },
            { id: 4, service: "AC Installation", installationDate: "2023-08-04", installerName: "Emily Davis", fee: 250, status: true },
            { id: 5, service: "Heater Installation", installationDate: "2023-08-05", installerName: "David Brown", fee: 300, status: false },
            { id: 6, service: "Water Filter Installation", installationDate: "2023-08-06", installerName: "Linda Wilson", fee: 350, status: true },
            { id: 7, service: "Security System Installation", installationDate: "2023-08-07", installerName: "James Moore", fee: 400, status: false }
        ];
        const sortedData = data.sort((a, b) => (a.status === true && b.status === false ? -1 : 1));
        setInstallations(sortedData);
        setFilteredInstallations(sortedData);
    }, []);

    const handleOptions = (id: number) => {
        console.log("Options for installation", id);
    };

    const handleFilterClick = (filter: string) => {
        setFilterTitle(filter);
        setIsDropdownVisible(false);

        let filtered = [...installations];

        switch (filter) {
            case "All":
                filtered = installations;
                break;
            case "Service A-Z":
                filtered.sort((a, b) => a.service.localeCompare(b.service));
                break;
            case "Service Z-A":
                filtered.sort((a, b) => b.service.localeCompare(a.service));
                break;
            case "Installation Date Going Up":
                filtered.sort((a, b) => new Date(a.installationDate).getTime() - new Date(b.installationDate).getTime());
                break;
            case "Installation Date Going Down":
                filtered.sort((a, b) => new Date(b.installationDate).getTime() - new Date(a.installationDate).getTime());
                break;
            case "Installer Name A-Z":
                filtered.sort((a, b) => a.installerName.localeCompare(b.installerName));
                break;
            case "Installer Name Z-A":
                filtered.sort((a, b) => b.installerName.localeCompare(a.installerName));
                break;
            case "Fee Going Up":
                filtered.sort((a, b) => a.fee - b.fee);
                break;
            case "Fee Going Down":
                filtered.sort((a, b) => b.fee - a.fee);
                break;
            case "Status Active":
                filtered = installations.filter(installation => installation.status === true);
                break;
            case "Status Inactive":
                filtered = installations.filter(installation => installation.status === false);
                break;
            default:
                filtered = installations;
        }

        setFilteredInstallations(filtered);
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
            "Service A-Z",
            "Service Z-A",
            "Installation Date Going Up",
            "Installation Date Going Down",
            "Installer Name A-Z",
            "Installer Name Z-A",
            "Fee Going Up",
            "Fee Going Down",
            "Status Active",
            "Status Inactive",
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
        headline: 'Professional Installation Services',
        subhead: `Ensure seamless and accurate installations with our expert services. 
        From home improvements to commercial setups, our experienced team guarantees 
        precision, safety, and satisfaction for all your installation needs.`,
        btnTitle: 'Sign In',
        url: "/sign-in",
        image: InstallationServicesImage
    };

    return (
        <>
            <ServiceSection>
                {token ?  
                    <>
                        <Button title={"Book Installation"} onClick={() => {}} />
                        <Wrap>
                            <h1>Installation Services</h1>
                            <ButtonRef ref={buttonRef}>
                                <ButtonCounter
                                    title={filterTitle}
                                    type="default"
                                    totalVisItemsCards={filteredInstallations.length}
                                    onClick={toggleDropdown}
                                />
                            </ButtonRef>
                            <Dropdown ref={dropdownRef} isVisible={isDropdownVisible}>
                                {renderFilterOptions()}
                            </Dropdown>
                        </Wrap>
                        <InstallationList installations={filteredInstallations} onOptions={handleOptions} />
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

export default InstallationServices;
