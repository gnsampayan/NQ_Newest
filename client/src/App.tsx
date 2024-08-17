import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Member from './pages/MemberPage';
import Blade from './components/Widgets/Elements/Blade';
import ItemCreation from './pages/CreateItemPage';
import StockPage from './pages/StockPage';
import FilteredPage from './pages/FilteredPage';
import ItemPage from './pages/ItemPage';
import ServicesPage from './pages/Services/ServicesPage';
import ShoppingCart from './components/Widgets/Elements/ShoppingCart';
import CheckOut from './pages/CheckOut';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AccountSettingsPage from './pages/AccountSettings';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  background: #2B2B2B;
	height: auto;
  width: 100%;
  padding-top: 100px;
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function MainApp() {
  const [ margin, setMargin ] = useState('auto');
  const [vis , setVis] = useState(false);
  const [cartVis, setCartVis] = useState(false);
  const cartBtnRef = useRef<HTMLDivElement>(null);
  
  const toggleBladeVis = () => {
    setVis(prevVis => !prevVis);
    setMargin((prevMargin) => (prevMargin === 'auto' ? '400px' : 'auto'));
  };

  const toggleCartVis = () => {
    setCartVis(prevVis => !prevVis);
  }


  return (
    
    <>
      <Header ontoggleBladeVis={toggleBladeVis} onToggleCartVis={toggleCartVis} cartBtnRef={cartBtnRef} counterVis={cartVis} />
      <Blade $isVisible={vis} />
      <ShoppingCart isVisible={cartVis} toggleCartVis={toggleCartVis} cartBtnRef={cartBtnRef} />
      <Wrapper>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage $margin={margin} />} />
          <Route path="/filtered" element={<FilteredPage />} />
          <Route path="/shop/:filterName" element={<FilteredPage />} />
          <Route path="/trending" element={<FilteredPage />} />
          <Route path="/shop" element={<Shop $margin={margin} />} />
          <Route path="/services" element={<ServicesPage $margin={margin} />} />
          <Route path="/services/:serviceType" element={<ServicesPage $margin={margin} />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/item-creation" element={<ItemCreation isEditing={false}  />} />
          <Route path="/members" element={<Member />} />
          <Route path="/view-stock" element={<StockPage />} />
          <Route path="/item/:itemName" element={<ItemPage />} />
          <Route path="/category/:categoryName" element={<FilteredPage />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountSettingsPage />} />
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
