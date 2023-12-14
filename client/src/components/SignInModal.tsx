import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    color: #333; /* Darker text for better readability */
    background-color: #f4f4f4; /* Light background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
    font-family: 'Arial', sans-serif;
	margin-top: 80px;

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label {
        margin-bottom: 5px;
    }

    input[type='text'],
    input[type='password'] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
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


interface SignInProps {
	membership: boolean;
	setMembership: React.Dispatch<React.SetStateAction<boolean>>;
  }
  

const SignIn: React.FC<SignInProps> = ({ membership, setMembership }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Here you would typically send the form data to a server
		try {
			// Make a GET request to check if the username and password are valid
			const response = await fetch(
				`http://localhost:8081/api/users?username=${username}&password=${password}`
			);

			const data = await response.json();

			if (data.status === "ok") {
				setMembership(true);
				console.log("sign in sucessful")
				localStorage.setItem('membership', JSON.stringify(true));
				console.log('membership stored in local storage');
				navigate("/member"); // Replace "/dashboard" with the desired path for the new page
			} else {
				// Handle invalid credentials
				console.error("Invalid credentials");
			}
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	useEffect(() => {
		console.log("useEffect triggered: ", membership); // log the current state
		localStorage.setItem('membership', JSON.stringify(membership));
		if (membership) {
			console.log("Sign in successful");
			navigate("/member"); 
			
		}
	  }, [membership]);

	return (
		<Wrapper>
			<Title>Member Login</Title>
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
