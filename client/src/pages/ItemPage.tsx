import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Button from "../components/Buttons/Button";
import { BsCartPlus, BsFillStarFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { ItemType } from "../context/Types";
import apiConfig from "../api-config";
import { useEffect, useState } from "react";
import AddToCartConfirmation from "../components/Widgets/Elements/AddToCartConfirmation";
import { addItemToCart } from "../utils/utilityFunctions";
import Footer from "../components/Widgets/FooterWidget";

const Page = styled.div`
    color: white;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    flex-direction: column;
`;
const Image = styled.div<{ image: string }>`
    width: 1280px;
    height: 560px;
    background: url(${props => props.image}) lightgray center / contain  no-repeat;
    position: relative;
    margin-top: 10px;
`
const Frame = styled.div`
    display: flex;
    width: 1050px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    margin-top: 20px;
    margin-bottom: 100px;
`
const ItemInfoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 150px;
    align-self: stretch;
`
const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    flex: 1 0 0;
`
const HeadingAndSubhead = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const Heading = styled.h4`
    align-self: stretch;
    color: var(--White, #FFF);
    /* H4 - Space Mono */
    font-family: "Space Mono";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 39.2px */
    text-transform: capitalize;
`
const Subhead = styled.p`
    align-self: stretch;
    color: var(--caption-label-text, #858584);

    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const AdditionalInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    align-self: stretch;
`
const CreatedBy = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const Label = styled.h5`
    align-self: stretch;
    color: #858584;

    /* H5 - Space Mono */
    font-family: "Space Mono";
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 20px;
`
const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const Body = styled.p`
    align-self: stretch;
    color: var(--White, #FFF);
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
`
const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const Tags = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`
const TagsFrame = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
`
const LikeBtnContainer = styled.div`
    position: absolute;
    z-index: 99;
    bottom: 20px;
    right: 20px;
`
const SaleTimer = styled.div`
    display: flex;
    width: auto;
    padding: 30px;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    border-radius: 20px;
    background: var(--Background---Secondary, #3B3B3B);
`
const P = styled.p`
    align-self: stretch;
    color: white;
    font-family: "Space Mono";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
`;
const Timer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    margin-bottom: 10px;
`;
const Hours = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    flex: 1 0 0;
`;
const Minutes = styled(Hours)`
    color: white;
`;
const Seconds = styled(Hours)`
    color: white;
`;
const H4 = styled.h4`
    color: white;
    font-family: "Space Mono";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    text-transform: capitalize;
`;
const H3 = styled.h3`
    align-self: stretch;
    color: var(--Text, #FFF);
    font-family: "Space Mono";
    font-size: 38px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    text-transform: capitalize;
`;
const P2 = styled(P)`
    align-self: stretch;
`;
const StarRating = styled(Subhead)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    color: white;
`
const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  transform: translateY(-2px);
`;
const Star = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  overflow: hidden;
  color: #ffff9f;
`
const StarIcon = styled(BsFillStarFill)<{ widthPercent?: number }>`
  width: 20px;  /* Set a fixed width */
  height: 20px;  /* Set a fixed height */
  clip-path: ${({ widthPercent }) => 
    widthPercent ? `inset(0 ${100 - widthPercent}% 0 0);` : 'none'};
  position: absolute;
  top: 0;
  left: 0;
`;
const SalePrice = styled(Subhead)<{ saleBool: boolean }>`
    align-self: stretch;
    color: #5aff73;
    display: ${(props) => props.saleBool ? "block" : "none"};
    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const Discount = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
`
const Price = styled(Subhead)<{ saleBool : boolean }>`
    align-self: stretch;
    text-decoration: ${(props) => props.saleBool ? "line-through" : "none"};
    color: ${(props) => props.saleBool ? "#a85144" : "#5aff73"};

    font-family: "Space Mono";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`;

const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const fractionalPart = rating - fullStars; // Fractional part of the rating
    const fractionalStarWidth = fractionalPart * 100; // Convert fractional part to percentage
  
    return (
      <StarsContainer>
        {/* Render full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
            <Star key={index}>
              <StarIcon />
            </Star>
        ))}
        {/* Render partial star if there is a fractional part */}
        {fractionalPart > 0 && 
            <Star>
                <StarIcon widthPercent={fractionalStarWidth} />
            </Star>
        }
      </StarsContainer>
    );
  };

const ItemPage = () => {
    const location = useLocation();
    const { image, itemName } = location.state as {
        image: string;
        itemName: string;
    };
    const [confirmationItem, setConfirmationItem] = useState<ItemType | null>(null);
    const [item, setItem] = useState<ItemType | null>(null);
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${apiConfig.API_URL}/items`);
                const data = await response.json();
                const foundItem = data.find((item: ItemType) => item.title.toLowerCase() === itemName.toLowerCase());
                
                // Map the back-end properties to front-end properties
                if (foundItem) {
                    const mappedItem: ItemType = {
                        ...foundItem,
                        saleBool: foundItem.sale_bool,
                        saleRate: foundItem.sale_rate,
                        saleEnd: foundItem.sale_end,   
                        
                    };
                    setItem(mappedItem);
                } else {
                    setItem(null);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [itemName]);
    

    useEffect(() => {
        if (item && item.saleBool) {
            const saleEndTime = new Date(item.saleEnd).getTime();
            startCountdown(saleEndTime);
        }
    }, [item]);

    const startCountdown = (targetTime: number) => {
        const updateTimer = () => {
            const currentTime = new Date().getTime();  // Get current time in UTC
            const remainingTime = targetTime - currentTime;
    
            if (remainingTime <= 0) {
                clearInterval(interval);
                setTime({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const totalHours = Math.floor(remainingTime / (1000 * 60 * 60));
                const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
                const secs = Math.floor((remainingTime / 1000) % 60);
                setTime({ hours: totalHours, minutes: mins, seconds: secs });
            }
        };
    
        const interval = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call to set the timer immediately
    
        return () => clearInterval(interval);
    };

    const handleAddToCartClick = async (newItem: ItemType) => {
        await addItemToCart(newItem, setConfirmationItem);
    };

    if (!item) {
        return <p>Loading item details...</p>;
    }

    const salePrice = item.saleBool ? (item.price * item.saleRate).toFixed(2) : null;

    return (
        <Page>
            <Image image={`data:image/jpeg;base64,${image}`}>
                <LikeBtnContainer>
                    <Button 
                        asset={FaRegHeart} 
                        title={""}
                        bgColor="white"
                        padding="0px 20px"
                        onClick={() => console.log('added to wishlist')}
                    />
                </LikeBtnContainer>
            </Image>
            <Frame>
                <ItemInfoContainer>
                    <ItemInfo>
                        <HeadingAndSubhead>
                            <Heading>{itemName}</Heading>
                            <StarRating>
                                {item.rating == null ? "not yet rated" : (
                                    <>
                                    {item.rating}
                                    <RatingStars rating={item.rating} />
                                    </>
                                )}
                            </StarRating>
                            <Discount>
                                <Price saleBool={(item.saleBool === 1) ? true : false}>${item.price}</Price>
                                <SalePrice saleBool={(item.saleBool === 1) ? true : false}>
                                    ${salePrice}
                                </SalePrice>
                            </Discount>
                        </HeadingAndSubhead>
                        <AdditionalInfo>
                            <CreatedBy>
                                <Label>Created By</Label>
                                <Brand>Put Brand Here</Brand>
                            </CreatedBy>
                            <Description>
                                <Label>Description</Label>
                                <Body style={{ whiteSpace: 'pre-wrap' }}>
                                    {item.description}
                                </Body>
                            </Description>
                            <Details>
                                <Label>Details</Label>
                                <div>detail one blahblahblah</div>
                                <div>detail two blahblahblah</div>
                            </Details>
                            <Tags>
                                <Label>Tags</Label>
                                <TagsFrame>{item.tags.join(', ')}</TagsFrame>
                            </Tags>
                        </AdditionalInfo>
                    </ItemInfo>
                    {(item.saleBool === 1) ? 
                        <SaleTimer>
                            <P>Sale ends in:</P>
                            <Timer>
                                <Hours>
                                    <H3>{time.hours}</H3>
                                    <P2>Hours</P2>
                                </Hours>
                                <H4>:</H4>
                                <Minutes>
                                    <H3>{time.minutes}</H3>
                                    <P2>Minutes</P2>
                                </Minutes>
                                <H4>:</H4>
                                <Seconds>
                                    <H3>{time.seconds}</H3>
                                    <P2>Seconds</P2>
                                </Seconds>
                            </Timer>
                            <Button 
                                asset={BsCartPlus} 
                                title={"Add to Cart"} 
                                onClick={() => handleAddToCartClick(item)} // add addToCart function here
                                bgColor="#A259FF"
                                bgHoverColor="white"
                                fillColor="white"
                                fillHoverColor="#A259FF"
                                borderHoverColor="white"
                                textHoverColor="#A259FF"
                            />
                        </SaleTimer>
                        :
                        <Button 
                                asset={BsCartPlus} 
                                title={"Add to Cart"} 
                                onClick={() => handleAddToCartClick(item)} // add addToCart function here
                                bgColor="#A259FF"
                                bgHoverColor="white"
                                fillColor="white"
                                fillHoverColor="#A259FF"
                                borderHoverColor="white"
                                textHoverColor="#A259FF"
                            />
                    }
                </ItemInfoContainer>
            </Frame>
            <Footer />
            {confirmationItem && (
                <AddToCartConfirmation 
                    item={confirmationItem} 
                    onClose={() => setConfirmationItem(null)}
                />
            )}
        </Page>
    );
};

export default ItemPage;
