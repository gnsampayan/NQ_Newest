import styled from "styled-components";
import ItemCreation from "../pages/ItemCreation"
import ReactDOM from "react-dom";

const Wrapper = styled.div<WrapperProps>`
    border: 1px solid black;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
    position: fixed;
    background-color: white;
    width: 600px;
    margin-left: calc(50vw - 300px);
    margin-top: 20px;
    height: calc(100vh - 40px);
    overflow-y: scroll;
    overflow-x: hidden;
`
const Overlay = styled.div<OverlayProps>`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100vw;
    height: calc(100% + 68px);
    top: -68px;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
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
        <>
            <Overlay $isVisible={$isVisible} onClick={hideModal}/>
            <Wrapper $isVisible={$isVisible}>
                {$isVisible && 
                    <button onClick={hideModal}>click to close</button>
                }
                <ItemCreation isEditing={false}></ItemCreation>
            </Wrapper>
        </>
    );

  // Only render the portal if the modal is visible          
  return $isVisible ? ReactDOM.createPortal(
      modalContent,
      document.getElementById('create-modal-root')!  // Portal target
    ) : null;
}

export default CreateItemModal