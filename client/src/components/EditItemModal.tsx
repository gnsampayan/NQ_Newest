import styled from "styled-components"

const Wrapper = styled.div<WrapperProps>`
    border: 1px solid black;
    display: ${props => (props.isVisible ? 'block' : 'none')};
`

interface WrapperProps {
    isVisible: boolean;
}

interface Props {
    isVisible: boolean;
    onClose: () => void;
    editingItemId: number | null;
}

const EditItemModal = ({ isVisible, onClose, editingItemId } : Props) => {

    const hideModal = () => {
        onClose();
        console.log('clicked hide modal');
    }

  return (
    <Wrapper isVisible={isVisible}>
        {isVisible && 
            <>
                <div>I am the Modal and I am visible</div>
                <div>Item: {editingItemId}</div>
                <button onClick={hideModal}>click to close</button>
            </> 
        }

    </Wrapper>
  )
}

export default EditItemModal