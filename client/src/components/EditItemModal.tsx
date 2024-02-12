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
    height: calc(100% + 68px);
    top: -68px;
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
    onItemUpdated: () => void;
}

const EditItemModal = ({ isVisible, onClose, editingItemId, itemData, isEditMode, onItemUpdated } : Props) => {

    const hideModal = () => {
        onClose();
        console.log('clicked hide modal');
    }

    const handleItemUpdate = () => {
        onItemUpdated();
        onClose(); // You might also want to close the modal after updating
    };

  return (
    <>
        <Overlay isVisible={isVisible} onClick={hideModal}/>
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
                onSuccessfulUpdate={handleItemUpdate} // Passing the new callback
            />
        </Wrapper>
    </>
  )
}

export default EditItemModal