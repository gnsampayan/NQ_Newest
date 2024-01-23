import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import HomePage from "./HomePage";
import FeaturedPage from "./FeaturedPage";
import NewItemsPage from "./NewItemsPage";
import Shop from "./Shop";
import ContactUs from "./ContactUs";
import SignIn from "./components/SignInModal";
import SignUp from "./components/SignUp";
import Member from './Member';
import Blade from './components/Blade';
import Page from './Page';
import TestContents from './components/TestContents';
import Services from './Services';
import ItemCreation from './ItemCreation';
import StockList from './StockList';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
	background-color: rgb(255, 255, 255);
	min-height: calc(100vh - 80px);
  width: 100%;
  margin-top: 80px;
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
      <Blade isVisible={vis} />
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage margin={margin} />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/new" element={<NewItemsPage />} />
          <Route path="/store" element={<Shop margin={margin} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/page" element={<Page sectionElement={TestContents()} />} />
          <Route path="/item-creation" element={<ItemCreation isEditing={false}  />} />
          <Route path="/member" element={<Member />} />
          <Route path="/view-stock" element={<StockList />} />
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
