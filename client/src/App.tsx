import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import ContactUs from "./pages/ContactUs";
import SignIn from "./components/SignInModal";
import SignUp from "./components/SignUp";
import Member from './pages/MemberPage';
import Blade from './components/Blade';
import Services from './pages/Services';
import ItemCreation from './pages/ItemCreation';
import StockPage from './pages/StockPage';
import FilteredPage from './pages/FilteredPage';
import ItemPage from './pages/ItemPage';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
	background-color: #2B2B2B;
	height: auto;
  width: 100%;
  padding-top: 100px;
`;

function MainApp() {
  const [vis , setVis] = useState(false);
  

  const [ margin, setMargin ] = useState('auto');
  const toggleBladeVis = () => {
    setVis(prevVis => !prevVis);
    setMargin((prevMargin) => (prevMargin === 'auto' ? '400px' : 'auto'));
  };

  return (
    
    <>
      <Header ontoggleBladeVis={toggleBladeVis}/>
      <Blade $isVisible={vis} />
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage $margin={margin} />} />
          <Route path="/filtered" element={<FilteredPage />} />
          <Route path="/trending" element={<FilteredPage />} />
          <Route path="/shop" element={<Shop $margin={margin} />} />
          <Route path="/services" element={<Services $margin={margin} />} />
          <Route path="/contact-us" element={<ContactUs $margin={margin} />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/item-creation" element={<ItemCreation isEditing={false}  />} />
          <Route path="/member" element={<Member />} />
          <Route path="/view-stock" element={<StockPage />} />
          <Route path="/:id" element={<ItemPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Wrapper>
    </>
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
