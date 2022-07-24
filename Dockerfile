FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && mv node_modules ../
COPY . .
COPY .env.example .env
EXPOSE ${PORT}
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start:dev"]