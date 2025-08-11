FROM node:22.16.0-alpine AS base
# set working directory
WORKDIR /usr/src/app

# --------- PREPARE stage
FROM base AS prepare
# copy the files
COPY . .
# install the dependencies
RUN npm install

# --------- DEVELOPMENT stage
FROM base AS dev
# copy pruned app source and node_modules from the prepare stage
COPY --from=prepare /usr/src/app ./
# run in development mode with hot reload
CMD ["npx", "tsx", "watch", "--env-file=.env.local", "./src/app.ts"]

# --------- PRODUCTION stage
FROM base AS prod
# copy pruned app source and node_modules from the prepare stage
COPY --from=prepare /usr/src/app ./
# compile the code and rewire paths
RUN npx tsc && npx tsc-alias
# run the compiled app
CMD [ "node", "--env-file=.env", "dist/app.js" ]
