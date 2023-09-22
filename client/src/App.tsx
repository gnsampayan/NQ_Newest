import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Member from './Member';
import Blade from './components/Blade';

const Wrapper = styled.div`
	margin-top: 80px;
	background-color: #2b2b2b;
	padding-bottom: 100px;
	min-height: calc(100vh - 80px);
`;

function MainApp() {
  const [vis , setVis] = useState(false);
  const [membership, setMembership] = useState(() => {
    const savedMembership = localStorage.getItem('membership');
    return savedMembership ? JSON.parse(savedMembership) : false;
  });

  return (
    <Wrapper>
      <NavModule membership={membership} vis={vis} setVis={setVis} />
      <Blade isVisible={vis}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/featured" element={<FeaturedPage />} />
        <Route path="/new" element={<NewItemsPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn setMembership={setMembership} membership={membership}/>} />
        <Route path="/sign-up" element={<SignUp />} />
		<Route path="/member" element={<Member setMembership={setMembership}/>} />
      </Routes>
    </Wrapper>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
