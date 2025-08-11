FROM node:22.16.0-alpine AS base
# set working directory
WORKDIR /usr/src/app

# --------- DEVELOPMENT stage
FROM base AS dev
# copy the source code into container
COPY . .
# install the dependencies
RUN npm install
# run in development mode with hot reload
CMD ["npx", "tsx", "watch", "--env-file=.env.local", "./src/app.ts"]


# --------- BUILD stage
FROM base AS build
# copy the source code into container
COPY . .
# install the dependencies
RUN npm install
# compile the code and rewire paths
RUN npx tsc && npx tsc-alias

# --------- PRODUCTION stage
FROM base AS prod
# copy the compiled app & package.json & env file
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json package.json
COPY --from=build /usr/src/app/package-lock.json package-lock.json
COPY .env .env
# install dependencies (without dev ones)
RUN npm ci --omit=dev
# run the compiled app
CMD [ "node", "--env-file=.env", "dist/app.js" ]
