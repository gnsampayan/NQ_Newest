import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #2B2B2B;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;

const ModalText = styled.p`
    color: white;
    margin-bottom: 20px;
`;

const ModalButton = styled.button`
    background: #A259FF;
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #8e49e6;
    }
`;

const LoginPromptModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalText>You must be logged in to add items to wishlist.</ModalText>
                <ModalButton onClick={onClose}>OK</ModalButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default LoginPromptModal;
