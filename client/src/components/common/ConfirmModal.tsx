import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "../../types/Common";
import WideButton from "./WideButton";

const ConfirmModal: React.FC<Modal> = ({ message, isClose }) => {
  const [modal, setModal] = useState(true);

  const handlerCancel = () => {
    console.log("취소요");
    setModal(false);
    return false;
  };

  const handlerCheck = () => {
    console.log("확인요");
    setModal(false);
    return true;
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
          <BtnWrapper>
            <CheckBtn isCheck={false} onClick={handlerCancel}>
              취소
            </CheckBtn>
            <CheckBtn isCheck={true} onClick={handlerCheck}>
              확인
            </CheckBtn>
          </BtnWrapper>
        </ModalLayout>
      )}
    </>
  );
};
interface BtnProps {
  isCheck: boolean;
}

const ModalLayout = styled.div`
  width: 80%;
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
    cursor: pointer;
  }
`;

const MessageBox = styled.div`
  padding: 20px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const CheckBtn = styled.button<BtnProps>`
  width: 45%;
  background: ${({ isCheck, theme }) =>
    isCheck ? theme.colors.btnBlue : "none"};
  border-radius: 10px;
  border-color: ${({ isCheck, theme }) =>
    isCheck ? theme.colors.btnBlue : "none"};
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: ${({ isCheck, theme }) =>
    isCheck ? theme.colors.lightFont : theme.colors.blueFont};

  // const CancelBtn = styled.button
`;
//   background: none;
//   border-radius: 10px;
//   border-color: ${({ theme }) => theme.colors.btnBlue};
//   outline: none;
//   cursor: pointer;
//   font-family: ${({ theme }) => theme.fonts.ydFont};
//   font-style: normal;
//   font-weight: 400;
//   font-size: 18px;
//   line-height: 27px;
//   text-align: center;
//   color: ${({ theme }) => theme.colors.blueFont};
// `;

export default ConfirmModal;
