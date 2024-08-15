import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  background: red;
  color: white;
`;

const CancelButton = styled(Button)`
  background: gray;
  color: white;
`;


interface Props {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

const DeleteConfirmationStep = ({ message, onConfirm, onCancel } : Props) => {
    return (
        <ModalOverlay>
          <ModalContent>
            <p>{message}</p>
            <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </ModalContent>
        </ModalOverlay>
      );
    };

export default DeleteConfirmationStep