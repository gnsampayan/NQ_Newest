import styled from "styled-components";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../api-config";
import Footer from "../components/Widgets/FooterWidget";
import SignUpImage from "../assets/images/hardware_store_aisle.png";

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
const SignUpForm = styled.div`
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
const SignUpSubmit = styled.button`
    all: unset;
    display: flex;
    height: 46px;
    padding: 0px 50px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    border-radius: 20px;
    background:  #A259FF;
    color: white;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    text-transform: capitalize;
    cursor: pointer;
`
const PSmall = styled.p`
    color: white;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const RegisterBtn = styled.button`
    all: unset;
    margin-left: 10px;
    color: #A259FF;
    cursor: pointer;
`
const MessageContainer = styled.div`
    all: unset;
    position: relative;
    height: 0px;
    width: 100%;
    margin-top: -40px;
`
const Message = styled.p<{ isVisible: boolean }>`
    position: absolute;
    top: 0;

    color: red;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
    display: ${(props) => props.isVisible ? 'block' : 'none'};
`

const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            // First, check if the user already exists
            const checkResponse = await fetch(`${apiConfig.API_URL}/users/check?email=${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!checkResponse.ok) {
                throw new Error('Failed to check user existence');
            }
            const checkData = await checkResponse.json();

            if (checkData.exists) {
                console.error("User already exists.");
                setMessage("User already exists.");
                return;
            }

            // If not, create a new user
            const response = await fetch(`${apiConfig.API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: username,
                    password: password,
                    email: email,
                    type: "normal", // temporary - move to config
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
            const data = await response.json();

            if (data.status === "ok") {
                // Sign up successful, handle response here or redirect to a new page
                console.log("Sign up successful");
                navigate("/sign-in");
            } else {
                // Handle error here
                console.error("Error occurred while signing up:", data.message);
                setMessage(data.message || "Error occurred while signing up");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <head>
                <title>Sign Up - Your Site Name</title>
                <meta name="description" content="Sign up to join our community and access our products and services." />
                <meta name="keywords" content="sign up, register, join, products, services" />
            </head>
            <Wrapper>
                <Frame>
                    <ImageHolder imageUrl={SignUpImage} />
                    <SignUpForm>
                        <HeadlineAndSubheadParent>
                            <HeadlineAndSubhead>
                                <Headline>
                                    <H2>Join Us Today!</H2>
                                </Headline>
                                <Subhead>
                                    <P>Create an account to start browsing our products and services.</P>
                                </Subhead>
                            </HeadlineAndSubhead>
                        </HeadlineAndSubheadParent>
                        <MessageContainer>
                            <Message isVisible={message.length > 0}>{message}</Message>
                        </MessageContainer>
                        <Form onSubmit={handleSubmit}>
                            <TypeForms>
                                <Input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    aria-label="Username"
                                    required
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    aria-label="Email"
                                    required
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    aria-label="Password"
                                    required
                                />
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    aria-label="Confirm Password"
                                    required
                                />
                            </TypeForms>
                            <SignUpSubmit type="submit">Sign Up</SignUpSubmit>
                            <PSmall>
                                Already a member? 
                                <RegisterBtn type="button" onClick={() => navigate('/sign-in')}>Sign in</RegisterBtn>
                            </PSmall>
                        </Form>
                    </SignUpForm>
                </Frame>
                <Footer />
            </Wrapper>
        </>
    );
};

export default SignUp;
