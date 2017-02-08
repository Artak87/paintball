FROM node:7-alpine

EXPOSE 8080 8443

RUN apk update && \
    apk add git && \
    git config --global user.email "backup-bot" && \
    git config --global user.name "backup-bot" &&\
    crontab -l | { cat; echo '* * * * * cd /usr/src/app/data && git add --all && git commit -am "$(date)" && git push'; } | crontab -

ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]


