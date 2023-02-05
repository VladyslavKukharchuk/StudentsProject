#FROM node:16.17.0-bullseye-slim
#
#WORKDIR /usr/src/app
#
##COPY package*.json ./
#COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
## ".env", "./"
##COPY ./src ./src
##COPY . .
##COPY ./src .
#
#RUN npm install
##RUN npm run migrate:up
#
#COPY . .
#
##CMD npm run build
##RUN npm run migrate:up
##
##CMD npm run dev
#CMD ["npm", "run", "dev"]
##CMD ["node", "app.js"]