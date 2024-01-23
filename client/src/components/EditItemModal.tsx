import styled from "styled-components"
import ItemCreation from "../ItemCreation";

const Wrapper = styled.div<WrapperProps>`
    border: 1px solid black;
    display: ${props => (props.isVisible ? 'block' : 'none')};
    position: absolute;
    background-color: white;
    width: 600px;
    margin-left: calc(50vw - 300px);
    margin-top: 0px;
    height: calc(100vh - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
`
const Overlay = styled.div<OverlayProps>`
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: ${props => (props.isVisible ? 'block' : 'none')};
`

interface WrapperProps {
    isVisible: boolean;
}
interface OverlayProps {
    isVisible: boolean;
}

interface ItemType {
    id: number;
    title: string;
    description: string;
    price: string;
    tags: string[];
    quantity: number;
}

interface Props {
    isVisible: boolean;
    onClose: () => void;
    editingItemId: number | null;
    itemData?: ItemType | null;
    isEditMode: boolean;
}

const EditItemModal = ({ isVisible, onClose, editingItemId, itemData, isEditMode } : Props) => {

    const hideModal = () => {
        onClose();
        console.log('clicked hide modal');
    }

  return (
    <>
        <Overlay isVisible={isVisible}/>
        <Wrapper isVisible={isVisible}>
            {isVisible && 
                <>
                    <div>Item: {editingItemId}</div>
                    <button onClick={hideModal}>click to close</button>
                </> 
            }
            <ItemCreation
                isEditing={isEditMode}
                itemData={itemData || undefined}
            />
        </Wrapper>
    </>
  )
}

export default EditItemModal