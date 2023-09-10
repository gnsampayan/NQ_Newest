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

	const navigate = useNavigate();
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch("http://localhost:8081/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_name: username,
					user_password: password,
					user_email: email,
					user_type: "normal",
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
