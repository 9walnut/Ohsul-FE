import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../types/Common";
import WideButton from "./WideButton";

const CommonModal: React.FC<Modal> = ({ message, isClose, onConfirm }) => {
  const [modal, setModal] = useState(true);

  useEffect(() => {
    setModal(true);
  }, [message]);

  // console.log(message, "메시지");

  const handleClick = () => {
    setModal(false);
    onConfirm && onConfirm();
  };
  return (
    <>
      {modal && (
        <ModalLayout>
          {isClose && (
            <CloseBtn>
              <img
                src="/assets/images/btn_close.png"
                onClick={() => setModal(false)}
              />
            </CloseBtn>
          )}
          <MessageBox>{message}</MessageBox>
          <WideButton onClick={handleClick}>확인</WideButton>
        </ModalLayout>
      )}
    </>
  );
};

const ModalLayout = styled.div`
  width: 80%;
  position: absolute;
  top: 20%;
  background-color: #fcfaf9;
  border: 1px solid #4d607b;
  padding: 4px 10px 15px 10px;
  border-radius: 15px;
  z-index: 10;
`;

const CloseBtn = styled.div`
  position: relative;
  img {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;

const MessageBox = styled.div`
  padding: 20px;
  font-size: 14px;
  line-height: 16px;
`;

export default CommonModal;
