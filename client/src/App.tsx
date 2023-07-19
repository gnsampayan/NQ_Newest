import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import NavModule from "./NavModule";
import HomePage from "./HomePage";
import FeaturedPage from "./FeaturedPage";
import NewItemsPage from "./NewItemsPage";
import Store from "./Store";
import Business from "./Business";
import ContactUs from "./ContactUs";
import SignIn from "./SignInModal";
import SignUp from "./SignUp";

const Wrapper = styled.div`
	margin-top: 80px;
	background-color: #2b2b2b;
	padding-bottom: 100px;
	min-height: calc(100vh - 80px);
`;

function App() {
	return (
		<BrowserRouter>
			<Wrapper>
				<NavModule />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/featured" element={<FeaturedPage />} />
					<Route path="/new" element={<NewItemsPage />} />
					<Route path="/store" element={<Store />} />
					<Route path="/business" element={<Business />} />
					<Route path="/contact-us" element={<ContactUs />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</Wrapper>
		</BrowserRouter>
	);
}

export default App;
