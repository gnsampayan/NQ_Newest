import styled from "styled-components";
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";
import { useNavigate } from "react-router";

const styleConfig = {
    standard: {
        height: "260px",
        width: "260px",
        imageHeight: "200px",
        textWidth: "calc(100% - 32px)",
        textHeight: "80px",
        padding: "20px 20px 0px 20px",
        alignItems: "flex-end",
        display: "none",
        InfoPadding: "none",
        infoHeight: "40px",
        imageBorderRadius: "10px",
        flexDirection: "row",
        transform: "translateY(6px)",
        nameFontSize: "18px",
        gaps: {
            cardGap: "20px",
            infoGap: "0px",
        }
    },
    large: {
        height: "469px",
        width: "330px",
        imageHeight: "310px",
        textWidth: "auto",
        textHeight: "180px",
        padding: "none",
        alignItems: "flex-start",
        display: "flex",
        InfoPadding: "20px 30px 25px 30px",
        infoHeight: "120px",
        imageBorderRadius: "20px 20px 0px 0px",
        flexDirection: "column",
        transform: "none",
        nameFontSize: "22px",
        gaps: {
            cardGap: "none",
            infoGap: "25px",
        }
    },
};

const Card = styled.div<{ boxSize: BoxSize }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;
    
    border-radius: 20px;
    background: #3B3B3B;
    cursor: pointer;
    
    min-height: ${(props) => styleConfig[props.boxSize].height};
    min-width: ${(props) => styleConfig[props.boxSize].width};
    padding: ${(props) => styleConfig[props.boxSize].padding};
    gap: ${(props) => styleConfig[props.boxSize].gaps.cardGap};

    &:hover {
        outline: 2px solid white;
    }
`;
const ImageContainer = styled.div<{ boxSize: BoxSize }>`
    display: block;
    width: 100%;
    height: ${(props) => styleConfig[props.boxSize].imageHeight};
    
    border-radius: 20px 20px 0px 0px;
    cursor: pointer;
    
    align-items: ${(props) => styleConfig[props.boxSize].alignItems};
`;
const CardInfo = styled.div<{ boxSize: BoxSize }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    
    color: white;
    
    padding: ${(props) => styleConfig[props.boxSize].InfoPadding};
    gap: ${(props) => styleConfig[props.boxSize].gaps.infoGap};
    width: auto;
    position: relative;
    flex-grow: 1;
`;
const Image = styled.div<{ image: string, boxSize: BoxSize }>`
    flex: 1 0 0;
    align-self: stretch;
    width: 100%;
    height: 100%;
    border-radius: ${(props) => styleConfig[props.boxSize].imageBorderRadius};
    background: url(${props => props.image}) lightgray 50% / cover no-repeat;
`;
const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    align-self: stretch;
    flex-grow: 1;
    width: 100%;
`;
const H5 = styled.h5<{ boxSize: BoxSize }>`
    align-self: stretch;
    width: ${(props) => styleConfig[props.boxSize].textWidth};
    overflow: hidden;
    height: auto;
    max-height: ${(props) => styleConfig[props.boxSize].textHeight};

    color: var(--White, #FFF);

    font-family: "Work Sans";
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
    cursor: pointer;
    
    font-size: ${(props) => styleConfig[props.boxSize].nameFontSize};
`;
const CartPlusIcon = styled(BsCartPlus)`
    fill: #A259FF;
`;
const Button = styled.div<{ boxSize: BoxSize }>`
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
    cursor: pointer;
    
    height: 40px;
    width: 180px;
    padding: 10px 10px;
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
    
    display: ${(props) => styleConfig[props.boxSize].display};
`;
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
`;
const AdditionalInfo = styled.div`
    display: flex;
    align-items: flex-start;
    align-self: stretch;

`;
const Price = styled.div<{ boxSize: BoxSize }>`
    display: flex;
    padding-right: 21px;
    align-items: flex-start;
    flex: 1 0 0;
    cursor: default;
    gap: 8px;
    
    flex-direction: ${(props) => styleConfig[props.boxSize].flexDirection};
`;
const Rating = styled.div<{ boxSize: BoxSize }>`
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    flex: 1 0 0;
    cursor: default;
    gap: 8px;
    
    display: ${(props) => styleConfig[props.boxSize].display};
`;
const Caption = styled.p<{ boxSize: BoxSize }>`
    align-self: stretch;

    color: #858584;

    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%; /* 13.2px */
    
    transform: ${(props) => styleConfig[props.boxSize].transform};
`;
const Caption2 = styled(Caption)`
    text-align: right;
`;
const Base = styled.p`
    align-self: stretch;

    color: white;

    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`;
const Base2 = styled(Base)`
    text-align: right;
`;
const AddToCartAndAdditionalInfo = styled.div<{ boxSize: BoxSize }>`
    width: 100%;
    margin-top: auto; /* Push this div to the bottom */
    height: ${(props) => styleConfig[props.boxSize].infoHeight};
    display: flex;
    flex-direction: column;
`;
interface Props {
    image: string;
    itemName: string;
    addToCart: () => void;
    price: number;
    rating: number;
    boxSize: BoxSize;
}
type BoxSize = 'standard' | 'large';

const ItemCard = ({ image, itemName, addToCart, price, rating, boxSize } : Props) => {
    const navigate = useNavigate();

    const handleItemClick = () => {
        const encodedItemName = encodeURIComponent(itemName);
        navigate(`/item/${encodedItemName}`, { state: { image, itemName, price, rating } });
    };
    const handleAddToCartClick = (event: React.MouseEvent) => {
        event.stopPropagation();  // This prevents the parent Card's onClick from being triggered
        addToCart();
    };
  return (
    <>
        <Card boxSize={boxSize} onClick={handleItemClick}>
            <ImageContainer 
                boxSize={boxSize}
                onClick={handleItemClick}
            >
                <Image image={image} boxSize={boxSize}/>
            </ImageContainer>
            <CardInfo boxSize={boxSize}>
                <MainInfo>
                    <H5 boxSize={boxSize} onClick={handleItemClick}>{itemName}</H5>
                </MainInfo>
                <AddToCartAndAdditionalInfo boxSize={boxSize}>
                    <AdditionalInfo>
                        <Price boxSize={boxSize}>
                            <Caption boxSize={boxSize}>Price</Caption>
                            <Base>${price}</Base>
                        </Price>
                        <Rating boxSize={boxSize}>
                            <Caption2 boxSize={boxSize}>Rating</Caption2>
                            <Base2>{rating}
                                <BsFillStarFill style={{transform: 'translateY(-3px)', marginLeft: '10px'}}/>
                            </Base2>
                        </Rating>
                    </AdditionalInfo>
                    <Button boxSize={boxSize}>
                        <CartPlusIcon/>
                        <Btn onClick={handleAddToCartClick}>Add to cart</Btn>
                    </Button>
                </AddToCartAndAdditionalInfo>
            </CardInfo>
        </Card>
    </>
  )
}

export default ItemCard;
