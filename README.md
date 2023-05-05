# Royal Game of Ur

A digital implementation of the ancient [Royal Game of Ur](https://en.wikipedia.org/wiki/Royal_Game_of_Ur).

### Getting Started

Set up `ENV_VARS`:

```shell
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Start app in development mode:

```shell
nvm use # uses supported Node version for this project
npm install
npm start
```

### Production Build

Set up `ENV_VARS`:

```shell
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Build app in production mode:

```shell
nvm use # uses supported Node version for this project
npm install
npm run build
```

Run app in production:

```shell
# Install PM2 globally to manage the server process
npm add -g pm2
pm2 start --name app server/build/index.js
```
