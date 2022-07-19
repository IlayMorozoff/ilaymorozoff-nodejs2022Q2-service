FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && mv node_modules ../
# RUN npm install --production --silent && mv node_modules ../
COPY . .
COPY .env.example .env
EXPOSE ${PORT}
CMD ["npm", "run","start:dev"]