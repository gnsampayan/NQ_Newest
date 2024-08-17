import styled from "styled-components";
import { FormEvent, useState } from "react";
import Footer from "../components/Widgets/FooterWidget";
import ContactUsImage from "../assets/images/office_setting.png";
import MapUrl from "../assets/images/map.png";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
`
const Frame = styled.div`
    display: flex;
    width: 1280px;
    align-items: center;
    gap: 60px;
    border: 2px solid #3B3B3B;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 50px;
`;
const ImageHolder = styled.div<{ imageUrl: string }>`
    flex: 1 0 0;
    align-self: stretch;
    background: url(${props => props.imageUrl}) lightgray 50% / cover no-repeat;
`
const ContactForm = styled.div`
    display: flex;
    padding: 80px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex: 1 0 0;
`
const HeadlineAndSubheadParent = styled.div`
    display: flex;
    width: 460px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
`
const HeadlineAndSubhead = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
`
const Headline = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const H2 = styled.h2`
    flex: 1 0 0;
    color: var(--White, #FFF);
    font-family: "Work Sans";
    font-size: 51px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 56.1px */
    text-transform: capitalize;
`
const Subhead = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const P = styled.p`
    align-self: stretch;
    color: var(--White, #FFF);
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const Form = styled.form`
    display: flex;
    width: 330px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`
const TypeForms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    align-self: stretch;
`
const Input = styled.input`
    display: flex;
    height: 46px;
    padding: 16px 20px;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    border-radius: 20px;
    border: 1px solid #858584;
    background: #FFF;
`
const TextArea = styled.textarea`
    display: flex;
    height: 100px;
    padding: 16px 20px;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    border-radius: 20px;
    border: 1px solid #858584;
    background: #FFF;
    resize: vertical;
`
const SubmitButton = styled.button`
    all: unset;
    display: flex;
    height: 46px;
    padding: 0px 50px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    border-radius: 20px;
    background: #A259FF;
    color: white;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    text-transform: capitalize;
    cursor: pointer;
`
const SectionHeadline = styled.div`
	display: flex;
	width: 1050px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`
const H3 = styled.h3`
	align-self: stretch;

	color: white;

	/* H3 - Work Sans */
	font-family: "Work Sans";
	font-size: 38px;
	font-style: normal;
	font-weight: 600;
	line-height: 120%; /* 45.6px */
	text-transform: capitalize;
`
const ContactInformation = styled.div`
    display: flex;
    flex-direction: column;
`
const Label = styled.p`
    color: #858584;
    /* Caption - Space Mono */
    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
`
const Body = styled.p`
    color: var(--White, #FFF);
    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
`
const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 1050px;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    background: #3B3B3B;
    padding: 20px;
    border-radius: 20px;
    justify-content: flex-start;
    gap: 60px;
    align-items: center;
`
const Map = styled.img`
    width: 525px;
    height: 300px;
    border-radius: 10px;
`

const ContactUs: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <>
            <head>
                <title>Contact Us - NQ Hardware and General Enterprise</title>
                <meta name="description" content="Contact us for any inquiries or support. We're here to help!" />
                <meta name="keywords" content="contact, support, inquiries" />
            </head>
            <Wrapper>
                <Frame>
                    <ImageHolder imageUrl={ContactUsImage} />
                    <ContactForm>
                        <HeadlineAndSubheadParent>
                            <HeadlineAndSubhead>
                                <Headline>
                                    <H2>Contact us</H2>
                                </Headline>
                                <Subhead>
                                    <P>We're here to help! Fill out the form below and we'll get back to you as soon as possible.</P>
                                </Subhead>
                            </HeadlineAndSubhead>
                        </HeadlineAndSubheadParent>
                        <Form onSubmit={handleSubmit}>
                            <TypeForms>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    aria-label="Your Name"
                                    required
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                    aria-label="Your Email"
                                    required
                                />
                                <TextArea
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your Message"
                                    aria-label="Your Message"
                                    required
                                />
                            </TypeForms>
                            <SubmitButton type="submit">Send Message</SubmitButton>
                        </Form>
                    </ContactForm>
                </Frame>
                <InfoSection>
                    <SectionHeadline>
                        <H3>More information</H3>
                        <P>Have a question or need assistance? Feel free to send us a message, give us a call, or visit our location—we're here to help!</P>
                    </SectionHeadline>
                    <Container>
                        <Map src={MapUrl}/>
                        <ContactInformation>
                            <Details>
                                <Label>Address</Label>
                                <Body>123 Elm Street, Suite 456, Springfield, IL 62701</Body>
                            </Details>
                            <Details>
                                <Label>Phone</Label>
                                <Body>{"(555) 123-4567"}</Body>
                            </Details>
                            <Details>
                                <Label>Support</Label>
                                <Body>{"support@nqhardware.com"}</Body>
                            </Details>
                            <Details>
                                <Label>Billing Inquiries</Label>
                                <Body>{"billing@nqhardware.com"}</Body>
                            </Details>
                        </ContactInformation>
                    </Container>
                </InfoSection>
                <Footer />
            </Wrapper>
        </>
    );
};

export default ContactUs;
