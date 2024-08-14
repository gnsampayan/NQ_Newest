import styled from "styled-components";
import CartItemsList from "../components/Groupings/Templates/CartItemsList";
import ProfilePicture from "../assets/images/profile_picture_of_a_person.png";
import { FaCcMastercard, FaCcVisa, FaCcDiscover, FaCcPaypal  } from "react-icons/fa";
import Button from "../components/Buttons/Button";
import { useCart } from "../context/CartContext";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 100px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Frame = styled.div`
    display: flex;
    width: auto;
    flex-direction: row;
    gap: 20px;
    background: #3B3B3B;
    padding: 20px;
    border-radius: 20px;
`;
const List = styled.div`
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
`
const Payment = styled.div`
    display: flex;
    background: #2B2B2B;
    border-radius: 20px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const TitleAndImage = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    min-width: 400px;
    align-items: center;
`
const H5 = styled.h5`
    color: var(--White, #FFF);
    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const CardIcons = styled.div`
    display: flex;
    flex-direction: column;
`
const Caption = styled.p`
    color: var(--White, #FFF);
    /* Caption - Space Mono */
    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
`
const Icons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-top: -10px;
`
const MasterCardIcon = styled(FaCcMastercard)`
    width: auto;
    height: 60px;
    fill: white;
`
const VisaIcon = styled(FaCcVisa)`
    width: auto;
    height: 60px;
    fill: white;
`
const DiscoverIcon = styled(FaCcDiscover)`
    width: auto;
    height: 60px;
    fill: white;
`
const PayPalIcon = styled(FaCcPaypal)`
    width: auto;
    height: 60px;
    fill: white;
`
const SeeMore = styled.button`
    all: unset;
    border: 2px solid white;
    height: 44px;
    width: auto;
    border-radius: 6px;
    color: white;
    padding: 0px 10px;

    /* Caption - Work Sans */
    font-family: "Work Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
`
const LabelAndInput = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`
const Input = styled.input`
    width: 100%;
    padding-left: 4px;
`
const TwoInOneRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`
const Line = styled.div`
    width: 100%;
    border-top: 1px solid white;
`
const Summary = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const RowInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`
const HeadingAndSubhead = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0px;
`

const CheckOut = () => {
    const { cartItems, cartCount  } = useCart();
     // Constants for tax and shipping
     // Constants for tax and shipping
    const TAX = 4;
    const SHIPPING = 6;

    // Calculate subtotal by summing up the item prices in the cart
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.buyQuantity, 0);

    // Calculate total by adding subtotal, tax, and shipping
    const total = subtotal + TAX + SHIPPING;

    const grammar = () => {
        return cartCount === 1 ? "item" : "items";
    };

    return (
        <Wrapper>
            <Frame>
                <List>
                    <HeadingAndSubhead>
                        <H5>Shopping Cart</H5>
                        <Caption>You have {cartCount} {grammar()} in your cart</Caption>
                    </HeadingAndSubhead>
                    <CartItemsList maxHeight={"auto"} />
                </List>
                <Payment>
                    <TitleAndImage>
                        <H5>Payment Details</H5>
                        <Image src={ProfilePicture}/>
                    </TitleAndImage>
                    <CardIcons>
                        <Caption>Card Type</Caption>
                        <Icons>
                            <MasterCardIcon />
                            <VisaIcon />
                            <DiscoverIcon />
                            <PayPalIcon />
                            <SeeMore>See All</SeeMore>
                        </Icons>
                    </CardIcons>
                    <LabelAndInput>
                        <Caption>Name on card</Caption>
                        <Input 
                            placeholder="Name"
                        />
                    </LabelAndInput>
                    <LabelAndInput>
                        <Caption>Card number</Caption>
                        <Input 
                            placeholder="1111 2222 3333 4444"
                        />
                    </LabelAndInput>
                    <TwoInOneRow>
                        <LabelAndInput>
                            <Caption>Expiration date</Caption>
                            <Input 
                                placeholder="mm/yy"
                            />
                        </LabelAndInput>
                        <LabelAndInput>
                            <Caption>CVV</Caption>
                            <Input 
                                placeholder="123"
                            />
                        </LabelAndInput>
                    </TwoInOneRow>
                    <Line />
                    <Summary>
                        <RowInfo>
                            <Caption>Subtotal</Caption>
                            <Caption>${subtotal.toFixed(2)}</Caption>
                        </RowInfo>
                        <RowInfo>
                            <Caption>Tax</Caption>
                            <Caption>${TAX}</Caption>
                        </RowInfo>
                        <RowInfo>
                            <Caption>Shipping</Caption>
                            <Caption>${SHIPPING}</Caption>
                        </RowInfo>
                        <RowInfo>
                            <Caption>Total</Caption>
                            <Caption>${total.toFixed(2)}</Caption>
                        </RowInfo>
                    </Summary>
                    <Button
                            title={"Checkout"}
                            onClick={() => {}}
                            bgColor={"white"}
                            fillColor={"#A259FF"}
                            bgHoverColor={"#A259FF"}
                            fillHoverColor={"white"}
                            textHoverColor={"white"}
                            textColor={"#A259FF"}
                        />
                </Payment>
            </Frame>
        </Wrapper>
    );
};

export default CheckOut;
