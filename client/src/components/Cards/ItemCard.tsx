import styled from "styled-components"
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";

const Card = styled.div`
    display: flex;
    height: 469px;
    width: 330px;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;

    border-radius: 20px;
    background: #3B3B3B;
`
const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;

    border-radius: 20px 20px 0px 0px;
    cursor: pointer;
`
const Image = styled.div<{ image: string }>`
    flex: 1 0 0;
    align-self: stretch;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    background: url(${props => props.image}) lightgray 50% / cover no-repeat;
`;
const CardInfo = styled.div`
    display: flex;
    padding: 20px 30px 25px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    align-self: stretch;

    color: white;
`
const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    align-self: stretch;
`
const H5 = styled.h5`
    align-self: stretch;

    color: var(--White, #FFF);

    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
    cursor: pointer;
`
const CartPlusIcon = styled(BsCartPlus)`
    fill: #A259FF;
`
const Button = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
    cursor: pointer;

    height: 40px;
    width: 200px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    border-radius: 20px;
    border: 2px solid #A259FF;

    &:hover {
        background: #A259FF;

        ${CartPlusIcon} {
            fill: white;
        }
    }
`
const Btn = styled.button`
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
`
const AdditionalInfo = styled.div`
    display: flex;
    align-items: flex-start;
    align-self: stretch;
`
const Price = styled.div`
    display: flex;
    padding-right: 21px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    cursor: default;
`
const Rating = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 8px;
    flex: 1 0 0;
    cursor: default;
`
const Caption = styled.p`
    align-self: stretch;

    color: #858584;

    /* Caption - Space Mono */
    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
`
const Caption2 = styled(Caption)`
    text-align: right;
`
const Base = styled.p`
    align-self: stretch;

    color: white;

    /* Base (Body) - Space Mono */
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const Base2 = styled(Base)`
    text-align: right;
`

interface Props {
    image: string;
    itemName: string;
    addToCart: () => void;
    price: number;
    rating: number;
}
const ItemCard = ({ image, itemName, addToCart, price, rating } : Props) => {
  return (
    <>
        <Card>
            <ImageContainer>
                <Image image={image}/>
            </ImageContainer>
            <CardInfo>
                <MainInfo>
                    <H5>{itemName}</H5>
                    <Button>
                        <CartPlusIcon/>
                        <Btn onClick={addToCart}>Add to cart</Btn>
                    </Button>
                </MainInfo>
                <AdditionalInfo>
                    <Price>
                        <Caption>Price</Caption>
                        <Base>${price}</Base>
                    </Price>
                    <Rating>
                        <Caption2>Rating</Caption2>
                        <Base2>{rating}4.5
                            <BsFillStarFill style={{transform: 'translateY(-3px)', marginLeft: '10px'}}/>
                        </Base2>
                    </Rating>
                </AdditionalInfo>
            </CardInfo>
        </Card>
    </>
  )
}

export default ItemCard