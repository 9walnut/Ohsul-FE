import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuBar = () => {
  return (
    <MenuBarLayout>
      <MenuBarBox>
        <FavoriteLayout>
          <NavLink to="/mypage/favorite">
            {" "}
            {/* Favorite 페이지로 이동 */}
            <FavoriteImg>
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/common_favorite.png"
                }
                alt="Favorite"
              />
            </FavoriteImg>
          </NavLink>
          <FavoriteBar />
        </FavoriteLayout>
        <MyReviewLayout>
          <NavLink to="/mypage/myreview">
            {" "}
            {/* MyReview 페이지로 이동 */}
            <MyReviewImg>
              <img
                src={
                  process.env.PUBLIC_URL + "assets/images/common_favorite.png"
                }
                alt="My Review"
              />
            </MyReviewImg>
          </NavLink>
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
`;
const FavoriteBar = styled.div`
  width: 156px;
  height: 3px;

  background: #4d607b;
  border-radius: 20px;
`;

const FavoriteImg = styled.div`
  img {
    width: 16px;
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
`;
const MyReviewBar = styled.div`
  width: 156px;
  height: 3px;

  background: #4d607b;
  border-radius: 20px;
`;

const MyReviewImg = styled.div`
  img {
    width: 16px;
    height: 22px;
    object-fit: contain;
  }
`;
