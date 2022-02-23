#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#

FROM node:lts-alpine3.14 AS builder

ENV APP_HOME=/usr/src/gateway/

RUN mkdir -p $APP_HOME

# Create app directory
WORKDIR $APP_HOME

# Copy files to directory
COPY package.json yarn.lock $APP_HOME

# Install app dependencies
RUN yarn install --frozen-lockfile

COPY . $APP_HOME

EXPOSE 9000

CMD [ "yarn", "docker" ]

