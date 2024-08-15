import styled from "styled-components";
import ItemCreation from "../pages/CreateItemPage"
import ReactDOM from "react-dom";
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
    width: 100%;
    max-width: 1050px;
    background: #2B2B2B;
    padding: 20px;
    border-radius: 20px;
    max-height: calc(100vh - 140px);
    overflow: hidden;
    overflow-y: auto;
    padding-top: 60px;
`
const Overlay = styled.div<OverlayProps>`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100vw;
    height: calc(100vh + 100px);
    top: 0px;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
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
}

const CreateItemModal = ({ $isVisible, onClose } : Props ) => { 

    const hideModal = () => {
        onClose();
        console.log('clicked hide modal');
    }

    const modalContent = (
        <Wrapper>
            <Overlay $isVisible={$isVisible} onClick={hideModal}/>
            <Frame $isVisible={$isVisible}>
                {$isVisible && 
                    <Close onClick={hideModal}><IoMdClose/></Close>
                }
                <ItemCreation isEditing={false}></ItemCreation>
            </Frame>
        </Wrapper>
    );

  // Only render the portal if the modal is visible          
  return $isVisible ? ReactDOM.createPortal(
      modalContent,
      document.getElementById('create-modal-root')!  // Portal target
    ) : null;
}

export default CreateItemModal