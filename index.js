const fastify = require('fastify')(process.env.MODE === 'dev' ? { logger: { level: 'trace' } } : {});

// decorate oauth to use it in files like fastify.oauth
fastify.decorate('oauth', require('fastify-oauth2'));

// decorate oauth to use it in files like fastify.oauth
fastify.decorate('auth_config', require('./auth'));

// register checkAuth middleware wich you can use in preHandler
// to check if user has session 'preHandler : fastify.checkAuth'
fastify.register(require('./middlewares/checkAuth'))

// register cookies and sessions modules
fastify.register(require('fastify-cookie'));
fastify.register(require('fastify-session'), {
  cookieName: 'sessionId',
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false },
  expires: 1800000
});

// register all routes as well as oauth strategies
// because they'll create routes by itself
// and i think it's logical handle 'em in routes folder
fastify.register(require('fastify-autoload'), {
  dir: require('path').join(__dirname, 'routes')
});

// listen fastify web server
fastify.listen(process.env.PORT, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
