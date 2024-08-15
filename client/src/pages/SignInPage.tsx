import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../api-config";
import Footer from "../components/Widgets/FooterWidget";
import SignInImage from "../assets/images/hardware_store_entrance.png";

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
const ImageHolder = styled.div<{imageUrl : string}>`
	flex: 1 0 0;
	align-self: stretch;
	background: url(${props => props.imageUrl}) lightgray 50% / cover no-repeat;
`
const LoginForm = styled.div`
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
const SignInSubmit = styled.button`
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

const SignIn: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [userType, setUserType] = useState<string | null>(null);
	const navigate = useNavigate();


	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const encodedUsername = encodeURIComponent(username);
        	const encodedPassword = encodeURIComponent(password);

			const response = await fetch(
				`${apiConfig.API_URL}/users?username=${encodedUsername}&password=${encodedPassword}`,
				{
					method: 'GET',
					headers: {
						'Accept': 'application/json',
					},
				}
			);

			const data = await response.json();

			if (data.token) {
				localStorage.setItem('token', data.token);
				// Fetch user type after getting the token
				const userResponse = await fetch(`${apiConfig.API_URL}/users/me`, {
					headers: {
						'Authorization': `Bearer ${data.token}`
					}
				});
				if (userResponse.ok) {
					const userData = await userResponse.json();
					const type = userData.user_type;
					setUserType(userData.user_type);

					if (type === "admin" || "super") {
						navigate("/members"); 
						window.location.reload();
					} else {
						navigate("/shop");
						window.location.reload();
					}
				} else {
					console.error('Failed to fetch user type:', userResponse.statusText);
				}
			} else {
				console.error("Invalid credentials");
				setMessage('Invalid credentials');
			}
		} catch (error) {
			console.error("An error occurred:", error);
			setMessage('An error occurred. Please try again.');
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			if (userType === "admin" || "super") {
				navigate("/members"); 
			} else {
				navigate("/shop")
			}
		}
	}, [navigate]);

	return (
		<>
			<head>
				<title>Sign In - Your Site Name</title>
				<meta name="description" content="Sign in to access our products and services." />
				<meta name="keywords" content="sign in, login, products, services" />
			</head>
			<Wrapper>
				<Frame>
					<ImageHolder imageUrl={SignInImage} />
					<LoginForm>
						<HeadlineAndSubheadParent>
							<HeadlineAndSubhead>
								<Headline>
									<H2>Sign In</H2>
								</Headline>
								<Subhead>
									<P>Welcome! Enter Your Credentials And Start Browsing Our Products And Services</P>
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
									maxLength={15}
									required
								/>
								<Input
									type="password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									aria-label="Password"
									maxLength={30}
									required
								/>
							</TypeForms>
							<SignInSubmit type="submit">Sign In</SignInSubmit>
							<PSmall>
								Not a member? 
								<RegisterBtn type="button" onClick={() => navigate('/sign-up')}>Register</RegisterBtn>
							</PSmall>
						</Form>
					</LoginForm>
				</Frame>
				<Footer />
			</Wrapper>
		</>
	);
};

export default SignIn;
