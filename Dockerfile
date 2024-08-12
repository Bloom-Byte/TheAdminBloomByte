FROM node:lts-alpine3.19
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm","run", "dev", "--", "--host", "0.0.0.0" ]
