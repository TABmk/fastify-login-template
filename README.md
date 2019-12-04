## Skeleton app for fastify with oauth and sessions.

Autoload routes from `/routes` folder with [fastify-autoload](https://github.com/fastify/fastify-autoload)
As well as [fastify-oauth2](https://github.com/fastify/fastify-oauth2)'s strategies in `/routes/login` folder.

------------


Also there is one middleware to check if user authenticated -- `checkAuth`

It decorated in `index.js` and can be used anywhere like a preHandler:

```
  fastify.route({
    method: 'GET',
    url: '/test',
    preHandler : fastify.checkAuth,
    handler
  });
```
It will return `{error : 'Auth required'}` with `401` code if no active session found, otherwise -- start your handler. Check `/routes/onlyLogin.js` for example.

------------


In `auth.json` you can put configuration for your strategy.

------------

Project includes environment variables. You can set 'em as you want. If you use docker compose, just set them like this in your docker-compose.yml:
```
version: "X.X"
services:
  app:
    ...
    environment:
      YOUR  : 'environment'
      VARIABLES : 'here'
    ...
```

Or you can use [.env module](https://www.npmjs.com/package/dotenv) to put variables in file.
1) Install dotenv
2) Include it in top of your index file with `require('dotenv').config();`
3) Create `.env` file and put variables like this:
```
MODE=dev
PORT=8080
vk_APP_ID=123
...
```

## Here are variables from this project

| Variable | Description                    |
| ------------- | ------------------------------ |
| `MODE`      | If set to `dev`, then fastify will log on `trace` level |
| `PORT`      | Port for starting fastify web server on |
| `SESSION_SECRET` | [Secret](https://www.npmjs.com/package/fastify-session#secret-required) option for [fastify-session](https://www.npmjs.com/package/fastify-session) module. (more info on first link) |
| `vk_APP_ID` | Optional data for vk.com log in. See more in [/routes/login/vk.js](https://github.com/TABmk/fastify-login-template/blob/master/routes/login/vk.js#L14) |
| `vk_APP_SECRET` | Optional data for vk.com log in. See more in [/routes/login/vk.js](https://github.com/TABmk/fastify-login-template/blob/master/routes/login/vk.js#L15) |

* vk_* variables are for vk.com auth, you can change in to another site, that support oauth2 and edit variable names. Also, [fastify-oauth2](https://github.com/fastify/fastify-oauth2) includes some [presets for oauth](https://github.com/fastify/fastify-oauth2#preset-configurations). Otherwise you'll need to configure `auth` option besides `client` options.
------------

| Route | Description                    |
| ------------- | ------------------------------ |
| `/`      | Main page just prints `req.session`       |
| `*`   | 404 redirect to `/`  |
| `/logout`   | Destroys current session |
| `/onlyLogin`   | If user authenticated -- returns hello greetings, if not -- prints error with 401 status code |
| `/login/callback`   | Callback handler sets `session.authenticated` to true and fill `session.user` with user's info, if auth not failed, ofc |
|`/login/vk` | Example vk.com auth handle `/login/vk` and then point it to `/login/callback`. Also do not forget add:`module.exports[Symbol.for('skip-override')] = true;` and `module.exports.prefixOverride = '';` to prevent encapsulation and route handling by autoload (oauth will set routes by itself) |
