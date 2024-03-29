import styled from "styled-components";
import { Link } from "react-router-dom";

export const MyPageLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 78px;
`;

export const MyInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 4px;
  width: 100%;
  height: 125px;
`;

export const MsgBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60px;
`;

export const Msg1 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 25px;

  font-family: ${({ theme }) => theme.fonts.ydFont};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
`;

export const Msg2 = styled(Msg1)`
  font-size: 17px;
  color: #4d607b;
`;

export const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 18px;

  width: 50%;
  height: 24px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 10px;
  color: #6f6f6f;
`;
export const LogoutBtn = styled.button`
  text-decoration: none;
  font-size: 10px;
  color: #6f6f6f;
  background: none;
  border: none;
  cursor: pointer;
`;
