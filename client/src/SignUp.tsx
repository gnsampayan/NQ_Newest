import styled from "styled-components";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	color: white;
`;

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
				`http://localhost:8081/users?email=${email}`
			);
			const checkData = await checkResponse.json();

			if (checkData.status === "ok") {
				console.error("User already exists.");
				return;
			}

			// If not, create a new user
			const response = await fetch("http://localhost:8081/users", {
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
			</form>
		</Wrapper>
	);
};

export default SignUp;
