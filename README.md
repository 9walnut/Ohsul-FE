# 오늘의 술

아무데나 말고, 내가 가고 싶은 술집만 골라드릴게요.<br />
<br />

## 🗓️ 프로젝트 기간

2024.2.15 ~ 2024.2.29

## 📌 배포 주소

https://ohsul.site/
<br />

## 📌 BE 저장소

https://github.com/9walnut/Ohsul-BE

## 📌 주요 기능

1. 회원

2. 비회원

  <br />

## 👥 팀원 소개

<div align=center >

| 프로필                                                                                                                           | 이름                                      | 역할 | 역할 내용                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/cbffbe1f-68de-4974-9ba3-1cc76519ead8" width="150" height="150" />  | [권구호](https://github.com/9walnut)      | BE   | CI / CD 구축, https 보안 서버 구축, <br /> 로그인(session) / 회원가입 / 마이페이지 / 내 주변 술집 API 구현                    |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/620a9128-de56-4b96-8775-9a37372ab9f1"  width="150" height="150" /> | [이예찬](https://github.com/yeeeeechan)   | BE   | DB 설계, 메인페이지 / 즐겨찾기 / 리뷰 API 구현 <br/> S3 이미지 업로드 기능 구현                                               |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/81420a4b-c1ca-48ec-a57a-45b8f5224bdd" width="150" height="150" />  | [양현정](https://github.com/hyeoonjeoong) | FE   | 기획/문서 작성 <br /> 페이지네이션, 반응형 디자인 적용                                                                        |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/bc0aa2ec-89f0-411a-a538-6de87c1fca4d" width="150" height="150" />  | [정우성](https://github.com/dntjd129)     | FE   | 메인 공통 반응형 컴포넌트 (Navbar, Footer, Carousel), <br /> 회원 전용 기능 전반(장바구니/주문하기/결제하기/상품 페이지) 구현 |

</div>

<br />

## 📌 시작 가이드

```
$ git clone https://github.com/9walnut/Ohsul-BE.git
```

### Back-end

```
$ ./gradlew.bat build
$ cd build/libs
$ java -jar ohsul-be-3.1.5-SNAPSHOT.jav
```

<br />

<details>
<summary>
    
## 📌 화면 구성

</summary>

<div align=center >

|                                                회원/비회원 서비스                                                |
| :--------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/4beeb8e0-1ca9-47d4-b5c6-55c2d8e77baf" width="750"> |
|                                                  홈페이지 메인                                                   |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/a2e1eb43-0e3c-40a0-bcae-33211b4f3cd7" width="750"> |
|                                                  로그인 페이지                                                   |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/b0a3bcae-ce62-42a3-b795-4e95d07e483a" width="750"> |
|                                                    회원 가입                                                     |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/167cc85c-f8ce-45c6-b8c3-c71730510d1c" width="750"> |
|                                                  회원 정보 수정                                                  |

---

|                                                  관리자 서비스                                                   |
| :--------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/01365fa8-feca-4fa8-b0e3-7fa3ed7beff5" width="750"> |
|                                                어드민 페이지 메인                                                |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/8ccc1488-4329-4aa8-9d5f-9edbf8d87e2c" width="750"> |
|                                                    상품 등록                                                     |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/d1e718cb-9ae1-4b3f-848f-2d0f04faf3b8" width="750"> |
|                                                    회원 관리                                                     |
| <img src="https://github.com/9walnut/TheWave/assets/144768130/516f2529-1961-4f50-82ea-e186b18095ad" width="750"> |
|                                                  거래 내역 관리                                                  |

</details>

</div>

<br /><br />

## 📌 프로젝트 구성

<div align=center>

</div>

<div align=center>

|                                           **팀 노션**                                            |
| :----------------------------------------------------------------------------------------------: |
| [TheWave_Notion](https://generated-teal-d69.notion.site/b28de37f75384e72916a0f82303f92d9?pvs=74) |

</div>
<br />
<div align=center> 
  
| **개체-관계 모델(ERD)** |
| :----------: |
| <img src='https://github.com/9walnut/Ohsul-BE/assets/100561986/5e668294-a134-4ea7-9b07-88251098d3b2' width="800" /> |

|                                                   **시스템 구성**                                                   |
| :-----------------------------------------------------------------------------------------------------------------: |
| <img src='https://github.com/9walnut/Ohsul-BE/assets/100561986/d30cf1fc-b5db-4b8e-9747-742e183044b1' width="800" /> |

## 🛠️ 기술 스택

### Front-end

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> 
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black" /> 
<img src="https://img.shields.io/badge/nginx-BA2BD2?style=for-the-badge&logo=nginx&logoColor=black" /> 
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=black" /> 
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black" />
<br />

### Back-end

<img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" /> 
<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" /> 
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white" /> 
<img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white" /> 
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" /> 
<br />

### DevOps Tools

<img src="https://img.shields.io/badge/githubactions-0288FF?style=for-the-badge&logo=githubactions&logoColor=white"> 
<img src="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<br />

<details>
<summary>
  
## 📌 커밋 컨벤션

</summary>

| Emoji | Code                          | 기능     | Description              |
| ----- | ----------------------------- | -------- | ------------------------ |
| ✨    | `:sparkles:`                  | Feat     | 새 기능                  |
| ♻️    | `:recycle:`                   | Refactor | 코드 리팩토링            |
| 🔧    | `:wrench:`                    | Chore    | 리소스 수정/삭제         |
| 🐛    | `:bug:`                       | Fix      | 버그 수정                |
| 📝    | `:memo:`                      | Docs     | 문서 추가/수정           |
| 💄    | `:lipstick:`                  | Style    | UI/스타일 파일 추가/수정 |
| 🎉    | `:tada:`                      | Init     | 프로젝트 시작 / Init     |
| ✅    | `:white_check_mark:`          | Test     | 테스트 추가/수정         |
| ⏪    | `:rewind:`                    | Rewind   | 변경 사항 되돌리기       |
| 🔀    | `:twisted_rightwards_arrows:` | Merge    | 브랜치 합병              |
| 🗃     | `:card_file_box:`             | DB       | 데이터베이스 관련 수정   |
| 💡    | `:bulb:`                      | Comment  | 주석 추가/수정           |
| 🚀    | `:rocket:`                    | Deploy   | 배포                     |

</details>
