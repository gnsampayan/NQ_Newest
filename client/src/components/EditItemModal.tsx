import styled from "styled-components"
import ItemCreation from "../pages/CreateItemPage";
import ReactDOM from "react-dom";
import { ItemType } from "../context/Types";
import { IoMdClose } from "react-icons/io";

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    padding-top: 120px;
    padding-bottom: 20px;
`
const Frame = styled.div<WrapperProps>`
    display: ${props => (props.$isVisible ? 'block' : 'none')};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: 1050px;
    background: #2B2B2B;
    padding: 20px;
    border-radius: 20px;
    overflow: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 140px);
`
const Overlay = styled.div<OverlayProps>`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100vw;
    height: calc(100vh + 100px);
    top: 0px;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
`
const Description = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0px;
  position: relative;
  margin-top: 0px;
  margin-bottom: 0px;
`
const Label = styled.p`
  color: white;
  /* Caption - Space Mono */
  font-family: "Space Mono";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 13.2px */
  margin-bottom: 8px;
`
const Body = styled.p`
  color: white;
  background: #2B2B2B;
  padding: 2px 4px;
  border-radius: 3px;
  max-height: 60px;
  overflow: hidden;
  position: static;
  /* Base(Body) - Work Sans */
  font-family: "Work Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
`
const Close = styled.button`
    all: unset;
    position: absolute;
    background: #2B2B2B;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    color: white;
    &:hover {
        background: white;
        color: black;
    }
`

interface WrapperProps {
    $isVisible: boolean;
}
interface OverlayProps {
    $isVisible: boolean;
}

interface Props {
    $isVisible: boolean;
    onClose: () => void;
    editingItemId: number | null;
    itemData?: ItemType | null;
    isEditMode: boolean;
    onItemUpdated: () => void;
}

const EditItemModal = ({ $isVisible, onClose, editingItemId, itemData, isEditMode, onItemUpdated } : Props) => {

    const hideModal = () => {
        onClose();
    }

    const handleItemUpdate = () => {
        onItemUpdated();
        onClose();
    };

    const modalContent = (
        <Wrapper>
            <Overlay $isVisible={$isVisible} onClick={hideModal}/>
            <Frame $isVisible={$isVisible}>
                {$isVisible && 
                    <>
                        <Description>
                            <Label>Item Id</Label>
                            <Body>{editingItemId}</Body>
                        </Description>
                        <Close onClick={hideModal}><IoMdClose/></Close>
                    </> 
                }
                <ItemCreation
                    isEditing={isEditMode}
                    itemData={itemData || undefined}
                    onSuccessfulUpdate={handleItemUpdate}
                />
            </Frame>
        </Wrapper>
    );
    // Only render the portal if the modal is visible          
    return $isVisible ? ReactDOM.createPortal(
        modalContent,
        document.getElementById('edit-modal-root')!  // Portal target
      ) : null;
}

export default EditItemModal