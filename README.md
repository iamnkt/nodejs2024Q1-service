# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/iamnkt/nodejs2024Q1-service.git
```

## Create .env file
rename .env.example to .env in root folder 

## Installing NPM modules

```
npm install
```

## Running application

```
docker compose up
```

If you are running PostgreSQL server locally on port 5432, try to change HOST_PORT value in .env file to another value, e.g., 5345
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Vulnerabilities scanning

To scan application image for the vulnerabilities

```
npm run scan:app
```

To scan database image for the vulnerabilities

```
npm run scan:db
```

## DockerHub repo with the application image

[link](https://hub.docker.com/r/iamnkt/app_image)

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
