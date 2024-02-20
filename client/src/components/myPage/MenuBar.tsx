import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type ComponentType = "favorite" | "myreview";

//setSelectedPage는 콜백함수! 이런 경우 보통 type으로 Dispatch를 사용한다.
//useState를 통한 세터함수로 업데이트하는거기 떄문에 React.SetStateAction 이다.
//그리고 state의 타입을 지정해준다.
interface MenuBarProps {
  setSelectedPage: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const MenuBar: React.FC<MenuBarProps> = ({ setSelectedPage }) => {
  return (
    <MenuBarLayout>
      <MenuBarBox>
        <FavoriteLayout onClick={() => setSelectedPage("favorite")}>
          <FavoriteImg>
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/images/mypage_favorite_active.png"
              }
              alt="Favorite"
            />
          </FavoriteImg>
          <FavoriteBar />
        </FavoriteLayout>
        <MyReviewLayout onClick={() => setSelectedPage("myreview")}>
          <MyReviewImg>
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/images/mypage_myreview_active.png"
              }
              alt="My Review"
            />
          </MyReviewImg>
          <MyReviewBar />
        </MyReviewLayout>
      </MenuBarBox>
    </MenuBarLayout>
  );
};

export default MenuBar;

const MenuBarLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0px;
  gap: 10px;

  position: absolute;
  width: 390px;
  height: 45px;
  top: 271px;
`;
const MenuBarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;

  width: 326px;
  height: 35px;
`;
const FavoriteLayout = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 3px;
  width: 326px;
  height: 33px;
  cursor: pointer;
`;
const FavoriteBar = styled.div`
  width: 156px;
  height: 3px;

  background: ${({ theme }) => theme.colors.iconBlue};
  border-radius: 20px;
`;

const FavoriteImg = styled.div`
  img {
    width: 15px;
    height: 22px;
    object-fit: contain;
  }
`;
const MyReviewLayout = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 3px;
  width: 326px;
  height: 33px;
  cursor: pointer;
`;
const MyReviewBar = styled.div`
  width: 156px;
  height: 3px;

  background: ${({ theme }) => theme.colors.iconBlue};
  border-radius: 20px;
`;

const MyReviewImg = styled.div`
  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`;
