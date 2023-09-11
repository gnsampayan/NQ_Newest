import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import NavModule from "./components/Header";
import HomePage from "./HomePage";
import FeaturedPage from "./FeaturedPage";
import NewItemsPage from "./NewItemsPage";
import Store from "./Store";
import Business from "./Business";
import ContactUs from "./ContactUs";
import SignIn from "./components/SignInModal";
import SignUp from "./components/SignUp";
import Blade from "./components/Blade";
import { useState, useEffect } from 'react';

const Wrapper = styled.div`
	margin-top: 80px;
	background-color: #2b2b2b;
	padding-bottom: 100px;
	min-height: calc(100vh - 80px);
`;

function App() {
	const [vis, setVis] = useState(() => {
		// Retrieve the initial value from localStorage if it exists
		const savedVis = localStorage.getItem('vis');
		return savedVis ? JSON.parse(savedVis) : false;
	});
	useEffect(() => {
		// Update localStorage whenever vis changes
		localStorage.setItem('vis', JSON.stringify(vis));
	}, [vis]);
	return (
		<BrowserRouter>
			<Wrapper>
				<NavModule showBlade={() => {setVis(true)}} hideBlade={() => {setVis(false)}}/>
				<Blade isVisible={vis}/>
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
