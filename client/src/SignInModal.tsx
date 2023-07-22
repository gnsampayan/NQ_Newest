import styled from "styled-components";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
	color: white;
`;

const SignIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Here you would typically send the form data to a server
		try {
			// Make a GET request to check if the username and password are valid
			const response = await fetch(
				`http://localhost:8081/users?user_name=${username}&user_password=${password}`
			);

			const data = await response.json();

			if (data.status === "ok") {
				// Credentials are valid, navigate to the new page
				console.log("Sign in successful");
				navigate("/"); // Replace "/dashboard" with the desired path for the new page
			} else {
				// Handle invalid credentials
				console.error("Invalid credentials");
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<Wrapper>
			<form onSubmit={handleSubmit}>
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
				<input type="submit" value="Sign in" />
				<p>
					Not a user?{" "}
					<button onClick={() => navigate("/sign-up")}>Register</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default SignIn;
