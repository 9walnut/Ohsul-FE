FROM node:lts as build

ARG REACT_APP_KAKAOMAP_KEY

WORKDIR /app

COPY package.json ./

RUN npm i
RUN npm list react-scripts || npm install react-scripts --save

COPY . .

RUN REACT_APP_KAKAOMAP_KEY=$REACT_APP_KAKAOMAP_KEY npm run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf/conf.d /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html

COPY conf/conf.d/default.conf /etc/nginx/nginx.conf

EXPOSE 80 443

# nginx 실행
CMD [ "nginx", "-g", "daemon off;" ]
