import React from "react";
import styled from "styled-components";

const DefaultCenterModal = ({
  title,
  subTitle,
  children,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Header>
          <h3>{title}</h3>
          {onClose && <CloseButton onClick={onClose}>×</CloseButton>}
        </Header>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <Body>{children}</Body>
        {(onConfirm || onClose) && (
          <Footer>
            {onClose && <Button onClick={onClose}>{cancelText}</Button>}
            {onConfirm && <Button primary onClick={onConfirm}>{confirmText}</Button>}
          </Footer>
        )}
      </Modal>
    </Overlay>
  );
};

/* Styled Components */

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 22px;
  cursor: pointer;
`;

const SubTitle = styled.p`
  color: #666;
  margin: 10px 20px;
`;

const Body = styled.div`
  padding: 10px 20px;
  overflow-y: auto;
  flex: 1; /* take remaining space */
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 20px;
  border-top: 1px solid #eee;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: ${({ primary }) => (primary ? "#0070f3" : "#ccc")};
  color: ${({ primary }) => (primary ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default DefaultCenterModal;
