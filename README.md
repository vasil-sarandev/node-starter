# Minimal Node Express Starter Kit

## Introduction

This is my personal starter kit for Node-Express-Typescript-Docker Apps in 2025.

- Node
- Express
- Docker
- ESLint
- Prettier
- Vitest
- JsonWebToken (JWT)

## Project Features and Setup

- Layered Architecture (controller, service, repository, model, ...etc)
- JWT-based authentication with an authentication middleware
- Nested Routers
- Component-centric folder structure
- Middlewares (logger, error, auth)
- Docker Container Images setup for production builds and local development
- .env file secrets

## Getting started

### Prerequisites

- **Docker / Docker Desktop**

This project is containerized for both local and production environments with Docker to provide portability and seamless running on different systems. Make sure you have Docker Installed.

### Development / Prod Containers Notes

- **Development Container** - The Development Container includes a Mongo service that uses a volume to persist data and connects to it by default.
- **Prod Container** - The Production Container doesn't include a Mongo service (naturally), so if you want to run the production build, make sure you have installed Mongo locally and have it running and exposed to the default port.

### Running the app

```
npm install
npm run dev
```

You can now access the app at `localhost:3000` in Postman or your browser.

## Roadmap

1. Add sample tests [TODO]

## Contributing

### Prerequisites

Make sure the ESLint extension in installed in your Code Edtior of choice so you can see the errors.

## Tests

`npm run test`

## Build for product and run

`npm run build`
`npm run`
