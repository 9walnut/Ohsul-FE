import styled from "styled-components";
import { Link } from "react-router-dom";

export const MyInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  gap: 4px;

  position: absolute;

  width: 382px;
  height: 125px;

  top: 100px;
`;

export const MsgBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 351px;
  height: 60px;
`;
export const Msg1 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 351px;
  height: 25px;

  font-family: "Yeongdeok Sea";
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

  width: 149px;
  height: 24px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 10px;
  color: #6f6f6f;
`;
