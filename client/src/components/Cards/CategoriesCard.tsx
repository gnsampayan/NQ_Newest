import { IconType } from "react-icons/lib";
import styled from "styled-components";

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;

    border-radius: 20px;
    background: #3B3B3B;
`
const PhotoAndIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;

    border-radius: 20px;
    background: #3B3B3B;
`
const ImageParent = styled.div`
    display: flex;
    width: 240px;
    height: 240px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0px 0px;
    object-fit: cover;
`
const CategoryIcon = styled.div`
    display: flex;
    width: 240px;
    height: 240px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 20px 20px 0px 0px;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(7.5px);

    position: absolute;
`
const Icon = styled.div`
    width: 100px;
    height: 100px;
    flex-shrink: 0;
`
const CollectionName = styled.div`
    display: flex;
    padding: 20px 30px 25px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
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
    
    transform: translateY(5px);
`
interface Props {
    image: string;
    categoryName: string;
    icon: IconType;
}
const CategoriesCard = ({ image, categoryName, icon: IconComponent } : Props) => {
  return (
    <>
        <Card>
            <PhotoAndIcon>
                <ImageParent>
                    <Image src={image} alt={categoryName} />
                    <CategoryIcon>
                        <Icon>
                            <IconComponent size="3x" color="white" />
                        </Icon>
                    </CategoryIcon>
                </ImageParent>
            </PhotoAndIcon>
            <CollectionName>
                <H5>{categoryName}</H5>
            </CollectionName>
        </Card>
    </>
  )
}

export default CategoriesCard