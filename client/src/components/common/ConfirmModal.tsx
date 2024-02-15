import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "../../types/Common";
import WideButton from "./WideButton";

const ConfirmModal: React.FC<Modal> = ({ message, isClose }) => {
  const [modal, setModal] = useState(true);
  console.log(message, "메시지");
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
          <BtnWrapper>
            <CancelBtn>취소</CancelBtn>
            <CheckBtn>확인</CheckBtn>
          </BtnWrapper>
        </ModalLayout>
      )}
    </>
  );
};

const ModalLayout = styled.div`
  width: 80vw;
  position: absolute;
  top: 40%;
  background-color: #fcfaf9;
  border: 1px solid #4d607b;
  padding: 4px 10px 15px 10px;
  border-radius: 15px;
`;

const CloseBtn = styled.div`
  position: relative;
  img {
    position: absolute;
    right: 0;
  }
`;

const MessageBox = styled.div`
  padding: 20px;
`;

const BtnWrapper = styled.div`
  width: 90vw;
`;

const CheckBtn = styled.button`
  background: ${({ theme }) => theme.colors.btnBlue};
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
`;

const CancelBtn = styled.button`
  background: none;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.btnBlue};
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: ${({ theme }) => theme.colors.blueFont};
`;

export default ConfirmModal;
