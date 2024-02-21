import axios from "axios";

const http = process.env.REACT_APP_BACKEND_URL;
const https = process.env.REACT_APP_DEPLOY_URL;

// 유저 로그인
export const postUserLogin = async (userId: string, userPw: string) => {
  const response = await axios.post(`${http}/api/login`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

// 유저 회원가입
export const postSignUp = async () => {
  const response = await axios.post(`${http}/api/register`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
