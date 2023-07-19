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

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		// Here you would typically send the form data to a server
		console.log(`Username: ${username}, Password: ${password}`);
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
