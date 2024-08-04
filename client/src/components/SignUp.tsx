import styled from "styled-components";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../api-config";

const Wrapper = styled.div`
    color: #333; // Changing text color for better readability
    background-color: #f4f4f4; // Light background color
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 40px auto;
    font-family: 'Arial', sans-serif;

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label {
        margin-bottom: 5px;
        display: block;
    }

    input[type='text'],
    input[type='password'],
    input[type='email'] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        width: 100%;
    }

    input[type='submit'] {
        background-color: #0056b3;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    input[type='submit']:hover {
        background-color: #003d82;
    }

	button {
        background: none;
        border: none;
        color: #0056b3;
        cursor: pointer;
        padding: 0;
        font-size: 16px;
    }
`;

const Title = styled.h2`
	text-align: center;
  margin-bottom: 20px;
`


const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const type = "normal"; // temporary - move to config

	const navigate = useNavigate();
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			// First, check if the user already exists
			const checkResponse = await fetch(
				`${apiConfig.API_URL}/users?email=${email}`
			);
			const checkData = await checkResponse.json();

			if (checkData.status === "ok") {
				console.error("User already exists.");
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
					type: type,
				}),
			});
			const data = await response.json();

			if (data.status === "ok") {
				// Sign up successful, handle response here or redirect to a new page
				console.log("Sign up successful");
				navigate("/sign-in");
			} else {
				// Handle error here
				console.error("Error occurred while signing up:", data.message);
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<Wrapper>
			<Title>Join Us Today!</Title>
			<form onSubmit={handleSubmit}>
				<label>
					Email:
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" value="Submit" />
				<p>
					Already a member?{" "}
					<button onClick={() => navigate("/sign-in")}>Sign in</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default SignUp;
