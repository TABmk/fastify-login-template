/**
 * vk.com auth
 */

module.exports = function (fastify, opts, done) {

  let name = 'vk';

  fastify.register(fastify.oauth, {
    name,
    scope: ['email'],
    credentials: {
      client: {
        id: process.env[`${name}_APP_ID`],
        secret: process.env[`${name}_APP_SECRET`]
      },
      auth: fastify.auth_config[name]
    },
    startRedirectPath: `/login/${name}`,
    callbackUri: `http://localhost:${process.env.PORT}/login/callback`
  });

  done();
}

// prevent encapsulation and router handling by autoload
module.exports[Symbol.for('skip-override')] = true;
module.exports.prefixOverride = '';
