import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroWidget from "../../components/Widgets/HeroWidget";
import ContractorImage from "../../assets/images/contractor_working_in_a_jobsite.png";
import Footer from "../../components/Widgets/FooterWidget";

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

const ContractorCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: #2B2B2B;
    margin-bottom: 10px;
`;

const ContractorInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContractorText = styled.p`
    color: white;
    font-family: "Work Sans";
    margin: 0;
`;

const ContractorActions = styled.div`
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
    padding: 20px;
    width: 100%;
    max-width: 1050px;
    margin-bottom: 200px;
`;

const FormContainer = styled.div<{ isExpanded: boolean }>`
    background: #2B2B2B;
    padding: ${(props) => (props.isExpanded ? '20px' : '0px')};
    border-radius: 10px;
    margin-top: 20px;
    max-height: ${(props) => (props.isExpanded ? 'none' : '0px')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
`;

const FormTitle = styled.h3<{ isExpanded: boolean }>`
    color: white;
    font-family: "Work Sans";
    font-size: 20px;
    font-weight: 600;
    margin-bottom: ${(props) => (props.isExpanded ? '20px' : '0')};
`;

const Form = styled.form<{ isExpanded: boolean }>`
    display: ${(props) => (props.isExpanded ? 'flex' : 'none')};
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    color: white;
    font-family: "Work Sans";
    font-size: 16px;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #A259FF;
    font-family: "Work Sans";
    font-size: 16px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #A259FF;
    font-family: "Work Sans";
    font-size: 16px;
`;

const Select = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #A259FF;
    font-family: "Work Sans";
    font-size: 16px;
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    width: 200px;
    border: none;
    height: 60px;
    border-radius: 20px;
    background-color: #A259FF;
    color: white;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #8B42E6;
    }
`;

const SubmitButton = styled.button`
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

interface Contractor {
    id: number;
    name: string;
    status: string;
}

const ContractorList = ({ contractors, onCancel, onReschedule }: { contractors: Contractor[], onCancel: (id: number) => void, onReschedule: (id: number) => void }) => (
    contractors.map((contractor) => (
        <ContractorCard key={contractor.id}>
            <ContractorInfo>
                <ContractorText>{contractor.name}</ContractorText>
                <ContractorText>{contractor.status}</ContractorText>
            </ContractorInfo>
            <ContractorActions>
                <Button onClick={() => onCancel(contractor.id)}>Cancel</Button>
                <Button onClick={() => onReschedule(contractor.id)}>Reschedule</Button>
            </ContractorActions>
        </ContractorCard>
    ))
);

const ContractorServices = () => {
    const [currentContractors, setCurrentContractors] = useState<Contractor[]>([]);
    const [upcomingContractors, setUpcomingContractors] = useState<Contractor[]>([]);
    const [pastContractors, setPastContractors] = useState<Contractor[]>([]);
    const [activeTab, setActiveTab] = useState<'Current' | 'Upcoming' | 'Past'>('Current');
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFormExpanded, setIsFormExpanded] = useState<boolean>(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchContractors = async () => {
            // Replace with your API call
            const response = await fetch("/api/contractors");
            const data = await response.json();
            setCurrentContractors(data.current);
            setUpcomingContractors(data.upcoming);
            setPastContractors(data.past);
        };

        fetchContractors();
    }, []);

    const handleCancel = (id: number) => {
        console.log(`Cancel contractor with ID: ${id}`);
    };

    const handleReschedule = (id: number) => {
        console.log(`Reschedule contractor with ID: ${id}`);
    };

    const getFilteredContractors = (contractors: Contractor[]) =>
        contractors.filter(contractor =>
            contractor.name.includes(searchTerm) || contractor.status.includes(searchTerm)
        );

    const renderTabContent = (contractors: Contractor[], tabName: string) => (
        <>
            <SectionTitle>{tabName} Contractors</SectionTitle>
            {contractors.length > 0 ? (
                <ContractorList contractors={contractors} onCancel={handleCancel} onReschedule={handleReschedule} />
            ) : (
                <ContractorText>No {tabName.toLowerCase()} contractors found</ContractorText>
            )}
        </>
    );

    const tabs = [
        { name: 'Current', count: currentContractors.length, contractors: currentContractors },
        { name: 'Upcoming', count: upcomingContractors.length, contractors: upcomingContractors },
        { name: 'Past', count: pastContractors.length, contractors: pastContractors }
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted");
    };

    const toggleForm = () => {
        setIsFormExpanded(!isFormExpanded);
    };

    const heroContents = {
        headline: 'Expert Contractor Services',
        subhead: `Transform your project vision into reality with our skilled 
        contractor services. Whether it's residential, commercial, or 
        industrial, our experienced professionals deliver quality workmanship 
        and exceptional results.`,
        btnTitle: 'Become a Member',
        url: "/sign-in",
        image: ContractorImage
    }

    return (
        
        <>
            <ServiceSection>
                { token ?  
                    <>
                        <h1>Contractor Services</h1>
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
                            placeholder="Search contractors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Section>
                            {renderTabContent(getFilteredContractors(tabs.find(tab => tab.name === activeTab)?.contractors || []), activeTab)}
                        </Section>
                        <ToggleButton onClick={toggleForm}>
                            {isFormExpanded ? 'Hide Request Form' : 'Show Request Form'}
                        </ToggleButton>
                        <FormContainer isExpanded={isFormExpanded}>
                            <FormTitle isExpanded={isFormExpanded}>Request a Contractor</FormTitle>
                            <Form onSubmit={handleSubmit} isExpanded={isFormExpanded}>
                                <Label htmlFor="contractorType">Contractor Type</Label>
                                <Select id="contractorType" name="contractorType" required>
                                    <option value="">Select a type</option>
                                    <option value="Electrician">Electrician</option>
                                    <option value="Plumber">Plumber</option>
                                    <option value="Carpenter">Carpenter</option>
                                    <option value="Painter">Painter</option>
                                    <option value="General Contractor">General Contractor</option>
                                </Select>

                                <Label htmlFor="jobDescription">Job Description</Label>
                                <TextArea id="jobDescription" name="jobDescription" rows={4} required />

                                <Label htmlFor="jobLocation">Job Location</Label>
                                <Input id="jobLocation" name="jobLocation" type="text" required />

                                <Label htmlFor="userName">Your Name</Label>
                                <Input id="userName" name="userName" type="text" required />

                                <Label htmlFor="userEmail">Your Email</Label>
                                <Input id="userEmail" name="userEmail" type="email" required />

                                <Label htmlFor="startDate">Target Start Date</Label>
                                <Input id="startDate" name="startDate" type="date" required />

                                <Label htmlFor="endDate">Target Completion Date</Label>
                                <Input id="endDate" name="endDate" type="date" required />

                                <SubmitButton type="submit">Submit Request</SubmitButton>
                            </Form>
                        </FormContainer>
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
