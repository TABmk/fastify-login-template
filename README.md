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



| Route | Description                    |
| ------------- | ------------------------------ |
| `/`      | Main page just prints `req.session`       |
| `*`   | 404 redirect to `/`  |
| `/logout`   | Destroys current session |
| `/onlyLogin`   | If user authenticated -- returns hello greetings, if not -- prints error with 401 status code |
| `/login/callback`   | Callback handler sets `session.authenticated` to true and fill `session.user` with user's info, if auth not failed, ofc |
|`/loging/vk` | Example vk.com auth handle `/login/vk` and then point it to `/login/callback`. Also do not forget add:`module.exports[Symbol.for('skip-override')] = true;` and `module.exports.prefixOverride = '';` to prevent encapsulation and route handling by autoload (oauth will set routes by itself) |
