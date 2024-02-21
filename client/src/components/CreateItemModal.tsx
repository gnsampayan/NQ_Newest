import styled from "styled-components";
import ItemCreation from "../ItemCreation"

const Wrapper = styled.div<WrapperProps>`
    border: 1px solid black;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
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
    finishedCreatingItems: () => void;
}

const CreateItemModal = ({ $isVisible, onClose, finishedCreatingItems } : Props ) => { 

    const hideModal = () => {
        onClose();
        finishedCreatingItems();
        console.log('clicked hide modal');
    }

  return (
    <>
    <Overlay $isVisible={$isVisible} onClick={hideModal}/>
    <Wrapper $isVisible={$isVisible}>
        <ItemCreation isEditing={false}></ItemCreation>
    </Wrapper>
    </>
  )
}

export default CreateItemModal